"use client";

import { useCallback, useEffect, useRef } from "react";
import "./ScrollStack.css";

const clamp = (v, min, max) => (v < min ? min : v > max ? max : v);
// Ease in-out so cards glide in instead of snapping at the end of each step.
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

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
  /** Fraction of viewport height scrolled per card. Higher = slower, less skippy. */
  scrollPerCard = 0.7,
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
    // Floor the step so a normal wheel flick can't jump a whole card.
    const step = Math.max(520, Math.round(window.innerHeight * scrollPerCard));
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

    const arrived = cards.map((_, i) => {
      if (i === 0) return 1;
      // Spend the first ~18% of each segment settling, then ease the card in.
      const raw = clamp((progress - (i - 1) * segment) / segment, 0, 1);
      const t = clamp((raw - 0.05) / 0.9, 0, 1);
      return easeInOut(t);
    });

    cards.forEach((card, i) => {
      const restY = i * itemStackDistance;
      const enterY = pinHeight + 28;
      const y = enterY + (restY - enterY) * arrived[i];

      let depth = 0;
      for (let j = i + 1; j < cards.length; j += 1) depth += arrived[j];

      const scale = Math.max(baseScale, 1 - depth * itemScale);
      const blur = blurAmount ? Math.min(depth * blurAmount, 12) : 0;
      // Fade in over the first stretch of travel so rising cards don't flash.
      const opacity = clamp((enterY - y) / 72, 0, 1);

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
