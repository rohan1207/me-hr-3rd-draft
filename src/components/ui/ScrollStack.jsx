"use client";

import { useCallback, useEffect, useRef } from "react";
import "./ScrollStack.css";

const clamp = (v, min, max) => (v < min ? min : v > max ? max : v);
const easeOut = (t) => 1 - Math.pow(1 - t, 3);

export function ScrollStackItem({ children, itemClassName = "" }) {
  return <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>;
}

/**
 * Scroll-pinned card stack. The section locks in the middle of the viewport
 * while cards rise and stack, then releases — and reverses cleanly on the way up.
 *
 * Driven by window scroll instead of its own Lenis instance, because the app
 * already runs one globally (see SmoothScroll) and nesting them fights the page.
 */
export default function ScrollStack({
  children,
  className = "",
  itemStackDistance = 16,
  itemScale = 0.035,
  baseScale = 0.86,
  blurAmount = 0,
  /** Fraction of viewport height scrolled per card. Keep low to avoid tall blank gaps. */
  scrollPerCard = 0.28,
  /** Distance from viewport top when the stack pins (under the sticky header). */
  pinOffset = 112,
  minWidth = 1024,
  onStackComplete,
}) {
  const trackRef = useRef(null);
  const stageRef = useRef(null);
  const metricsRef = useRef({ enabled: false, pinTop: 0, pinHeight: 0, scrollRange: 0, cards: [] });
  const rafRef = useRef(null);
  const doneRef = useRef(false);

  const reset = useCallback((cards) => {
    cards.forEach((card) => {
      card.style.transform = "";
      card.style.filter = "";
      card.style.opacity = "";
      card.style.pointerEvents = "";
      card.style.zIndex = "";
    });
  }, []);

  const measure = useCallback(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage) return;

    const cards = Array.from(stage.children).filter((el) =>
      el.classList.contains("scroll-stack-card")
    );

    const allowed =
      cards.length > 1 &&
      window.matchMedia(`(min-width: ${minWidth}px)`).matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!allowed) {
      track.dataset.static = "true";
      track.style.height = "";
      track.style.removeProperty("--ss-pin-top");
      track.style.removeProperty("--ss-stage-height");
      reset(cards);
      metricsRef.current = { enabled: false, pinTop: 0, pinHeight: 0, scrollRange: 0, cards };
      return;
    }

    delete track.dataset.static;
    reset(cards);

    const tallest = cards.reduce((h, card) => Math.max(h, card.offsetHeight), 0);
    const pinHeight = tallest + (cards.length - 1) * itemStackDistance;
    const step = Math.round(window.innerHeight * scrollPerCard);
    const scrollRange = (cards.length - 1) * step;
    const pinTop = Math.max(16, pinOffset);

    const previous = metricsRef.current;
    if (previous.pinHeight !== pinHeight || previous.scrollRange !== scrollRange) {
      track.style.setProperty("--ss-stage-height", `${pinHeight}px`);
      track.style.height = `${pinHeight + scrollRange}px`;
    }
    if (previous.pinTop !== pinTop) {
      track.style.setProperty("--ss-pin-top", `${pinTop}px`);
    }

    metricsRef.current = { enabled: true, pinTop, pinHeight, scrollRange, cards };
  }, [itemStackDistance, minWidth, pinOffset, reset, scrollPerCard]);

  const render = useCallback(() => {
    const track = trackRef.current;
    const { enabled, pinTop, pinHeight, scrollRange, cards } = metricsRef.current;
    if (!track || !enabled || !cards.length) return;

    const rect = track.getBoundingClientRect();
    const progress = scrollRange > 0 ? clamp((pinTop - rect.top) / scrollRange, 0, 1) : 0;
    const segment = 1 / (cards.length - 1);

    const arrived = cards.map((_, i) =>
      i === 0 ? 1 : clamp((progress - (i - 1) * segment) / segment, 0, 1)
    );

    cards.forEach((card, i) => {
      const restY = i * itemStackDistance;
      const enterY = pinHeight + 24;
      const y = enterY + (restY - enterY) * easeOut(arrived[i]);

      let depth = 0;
      for (let j = i + 1; j < cards.length; j += 1) depth += arrived[j];

      const scale = Math.max(baseScale, 1 - depth * itemScale);
      const blur = blurAmount ? Math.min(depth * blurAmount, 12) : 0;
      // Cards waiting their turn stay hidden, otherwise they pile up in the
      // empty track below the stack and read as stray duplicates. The fade has
      // to finish within the first few pixels of travel, while the card is still
      // clear of the stack — a translucent card lets the one beneath show through.
      const opacity = clamp((enterY - y) / 40, 0, 1);

      card.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0) scale(${scale.toFixed(3)})`;
      card.style.filter = blur > 0.05 ? `blur(${blur.toFixed(2)}px)` : "";
      card.style.opacity = opacity < 1 ? opacity.toFixed(3) : "";
      card.style.pointerEvents = opacity < 0.05 ? "none" : "";
      card.style.zIndex = String(i + 1);
    });

    if (progress > 0.995 && !doneRef.current) {
      doneRef.current = true;
      onStackComplete?.();
    } else if (progress <= 0.995) {
      doneRef.current = false;
    }
  }, [baseScale, blurAmount, itemScale, itemStackDistance, onStackComplete]);

  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage) return undefined;

    const stop = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };

    const tick = () => {
      render();
      rafRef.current = requestAnimationFrame(tick);
    };

    const start = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(tick);
    };

    measure();
    render();

    // Only animate while the section is anywhere near the viewport.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) start();
        else {
          stop();
          render();
        }
      },
      { rootMargin: "100% 0px" }
    );
    io.observe(track);

    const remeasure = () => {
      measure();
      render();
    };

    const ro = new ResizeObserver(remeasure);
    ro.observe(stage);

    const mq = window.matchMedia(`(min-width: ${minWidth}px)`);
    mq.addEventListener("change", remeasure);
    window.addEventListener("resize", remeasure);
    window.addEventListener("orientationchange", remeasure);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      mq.removeEventListener("change", remeasure);
      window.removeEventListener("resize", remeasure);
      window.removeEventListener("orientationchange", remeasure);
    };
  }, [measure, minWidth, render]);

  return (
    <div ref={trackRef} className={`scroll-stack ${className}`.trim()}>
      <div className="scroll-stack__pin">
        <div ref={stageRef} className="scroll-stack__stage">
          {children}
        </div>
      </div>
    </div>
  );
}
