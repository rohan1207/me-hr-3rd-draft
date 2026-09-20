"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { homeContent } from "../../data/content";
import "./BendingMarquee.css";

function MarqueeTrack({ items, separator, trackRef }) {
  return (
    <div className="bending-marquee__track" ref={trackRef} aria-hidden>
      {items.map((phrase, i) => (
        <span key={`${phrase}-${i}`} className="bending-marquee__item">
          <span className="bending-marquee__phrase">{phrase}</span>
          <span className="bending-marquee__sep" aria-hidden>
            {separator}
          </span>
        </span>
      ))}
    </div>
  );
}

export default function BendingMarquee() {
  const strip = homeContent.marqueeStrip;
  const reduce = useReducedMotion();
  const scrollerRef = useRef(null);
  const trackRef = useRef(null);

  // Pixel-based shift (not %) so the loop seam stays subpixel-stable.
  useEffect(() => {
    if (reduce) return undefined;
    const scroller = scrollerRef.current;
    const track = trackRef.current;
    if (!scroller || !track) return undefined;

    const measure = () => {
      // Round to whole pixels — fractional widths cause a visible hitch at loop.
      const w = Math.ceil(track.getBoundingClientRect().width);
      scroller.style.setProperty("--marquee-shift", `${w}px`);
      // Duration scales with content width so speed stays even.
      const seconds = Math.max(48, Math.round(w / 28));
      scroller.style.setProperty("--marquee-duration", `${seconds}s`);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener("resize", measure);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [reduce, strip.items]);

  return (
    <section className="bending-marquee" aria-label={strip.ariaLabel}>
      <div className="bending-marquee__blend bending-marquee__blend--top" aria-hidden />
      <div className="bending-marquee__band">
        <div
          ref={scrollerRef}
          className={`bending-marquee__scroller${reduce ? " is-static" : ""}`}
        >
          <MarqueeTrack
            items={strip.items}
            separator={strip.separator}
            trackRef={trackRef}
          />
          {!reduce && (
            <MarqueeTrack items={strip.items} separator={strip.separator} />
          )}
        </div>
      </div>
      <div className="bending-marquee__blend bending-marquee__blend--bottom" aria-hidden />
    </section>
  );
}
