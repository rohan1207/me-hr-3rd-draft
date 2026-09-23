"use client";

import { useCallback, useEffect, useRef } from "react";
import "./ScrollStack.css";

const clamp = (v, min, max) => (v < min ? min : v > max ? max : v);
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function readHeaderPx() {
  if (typeof window === "undefined") return 64;
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue("--header-height")
    .trim();
  if (!raw) return 64;
  if (raw.endsWith("rem")) return parseFloat(raw) * 16;
  if (raw.endsWith("px")) return parseFloat(raw);
  const n = parseFloat(raw);
  return Number.isFinite(n) ? n : 64;
}

export function ScrollStackItem({ children, itemClassName = "" }) {
  return <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>;
}

/**
 * Scroll-pinned card stack. Optional `pinHeader` (heading/image) locks together
 * with the cards under the navbar — no blank gap on phone.
 */
export default function ScrollStack({
  children,
  pinHeader = null,
  className = "",
  itemStackDistance = 16,
  itemScale = 0.035,
  baseScale = 0.86,
  blurAmount = 0,
  scrollPerCard = 0.7,
  pinOffset = 112,
  minWidth = 0,
  onStackComplete,
}) {
  const trackRef = useRef(null);
  const pinRef = useRef(null);
  const headerRef = useRef(null);
  const stageRef = useRef(null);
  const metricsRef = useRef({
    enabled: false,
    pinTop: 0,
    pinHeight: 0,
    scrollRange: 0,
    cards: [],
    stackGap: itemStackDistance,
  });
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

    const widthOk =
      minWidth <= 0 || window.matchMedia(`(min-width: ${minWidth}px)`).matches;
    const allowed =
      cards.length > 1 &&
      widthOk &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!allowed) {
      track.dataset.static = "true";
      track.style.height = "";
      track.style.removeProperty("--ss-pin-top");
      track.style.removeProperty("--ss-stage-height");
      track.style.removeProperty("--ss-pin-height");
      reset(cards);
      metricsRef.current = {
        enabled: false,
        pinTop: 0,
        pinHeight: 0,
        scrollRange: 0,
        cards,
        stackGap: itemStackDistance,
      };
      return;
    }

    delete track.dataset.static;
    reset(cards);

    const w = window.innerWidth;
    const phone = w < 640;
    const narrow = w < 1024;
    const navPx = readHeaderPx();
    const vh = window.innerHeight;

    const stackGap = phone
      ? Math.min(itemStackDistance, 10)
      : narrow
        ? Math.min(itemStackDistance, 14)
        : itemStackDistance;

    // Heading/image only lock with cards below lg (stacked layout).
    const headerEl = headerRef.current;
    const headerH = narrow && headerEl ? headerEl.offsetHeight : 0;

    const tallest = cards.reduce((h, card) => Math.max(h, card.offsetHeight), 0);
    const stageHeight =
      Math.max(tallest, phone ? 180 : 240) + (cards.length - 1) * stackGap;
    // Full sticky box = header + card stage (no blank gap between them).
    const pinBoxHeight = headerH + stageHeight;

    // Always pin just under the navbar when header is included — fills the screen.
    let pinTop;
    if (headerH > 0) {
      pinTop = Math.round(navPx + (phone ? 8 : 12));
    } else if (narrow) {
      pinTop = Math.round(navPx + 24);
    } else {
      pinTop = Math.max(16, pinOffset);
    }

    const scrollFrac = phone
      ? Math.max(scrollPerCard, 0.62)
      : narrow
        ? Math.min(scrollPerCard, 0.65)
        : scrollPerCard;
    const stepFloor = phone ? 400 : narrow ? 400 : 520;
    const step = Math.max(stepFloor, Math.round(vh * scrollFrac));
    const scrollRange = (cards.length - 1) * step;

    track.style.setProperty("--ss-stage-height", `${stageHeight}px`);
    track.style.setProperty("--ss-pin-height", `${pinBoxHeight}px`);
    track.style.setProperty("--ss-pin-top", `${pinTop}px`);
    track.style.height = `${pinBoxHeight + scrollRange}px`;

    metricsRef.current = {
      enabled: true,
      pinTop,
      // Card travel uses stage height only (header sits above, fixed in the pin).
      pinHeight: stageHeight,
      scrollRange,
      cards,
      stackGap,
    };
  }, [itemStackDistance, minWidth, pinOffset, reset, scrollPerCard]);

  const render = useCallback(() => {
    const track = trackRef.current;
    const { enabled, pinTop, pinHeight, scrollRange, cards, stackGap } =
      metricsRef.current;
    if (!track || !enabled || !cards.length) return;

    const gap = stackGap ?? itemStackDistance;
    const phone = window.innerWidth < 640;
    const rect = track.getBoundingClientRect();
    const progress =
      scrollRange > 0 ? clamp((pinTop - rect.top) / scrollRange, 0, 1) : 0;
    const segment = 1 / (cards.length - 1);

    const arrived = cards.map((_, i) => {
      if (i === 0) return 1;
      const raw = clamp((progress - (i - 1) * segment) / segment, 0, 1);
      const t = clamp((raw - 0.05) / 0.9, 0, 1);
      return easeInOut(t);
    });

    cards.forEach((card, i) => {
      const restY = i * gap;
      const enterY = pinHeight + (phone ? 20 : 28);
      const y = enterY + (restY - enterY) * arrived[i];

      let depth = 0;
      for (let j = i + 1; j < cards.length; j += 1) depth += arrived[j];

      const scale = Math.max(baseScale, 1 - depth * itemScale);
      const blur = blurAmount ? Math.min(depth * blurAmount, 12) : 0;
      const fadeSpan = phone ? 56 : 72;
      const opacity = clamp((enterY - y) / fadeSpan, 0, 1);

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

    let cancelled = false;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (cancelled) return;
        measure();
        render();
        start();
      });
    });

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) start();
        else {
          stop();
          render();
        }
      },
      { rootMargin: "120% 0px" }
    );
    io.observe(track);

    const remeasure = () => {
      measure();
      render();
    };

    const ro = new ResizeObserver(remeasure);
    ro.observe(stage);
    if (headerRef.current) ro.observe(headerRef.current);
    Array.from(stage.children).forEach((el) => ro.observe(el));

    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    mqReduce.addEventListener("change", remeasure);
    window.addEventListener("resize", remeasure);
    window.addEventListener("orientationchange", remeasure);
    window.addEventListener("scroll", render, { passive: true });

    return () => {
      cancelled = true;
      stop();
      io.disconnect();
      ro.disconnect();
      mqReduce.removeEventListener("change", remeasure);
      window.removeEventListener("resize", remeasure);
      window.removeEventListener("orientationchange", remeasure);
      window.removeEventListener("scroll", render);
    };
  }, [measure, render]);

  return (
    <div ref={trackRef} className={`scroll-stack ${className}`.trim()}>
      <div ref={pinRef} className="scroll-stack__pin">
        {pinHeader ? (
          <div ref={headerRef} className="scroll-stack__header">
            {pinHeader}
          </div>
        ) : (
          <div ref={headerRef} className="scroll-stack__header scroll-stack__header--empty" />
        )}
        <div ref={stageRef} className="scroll-stack__stage">
          {children}
        </div>
      </div>
    </div>
  );
}
