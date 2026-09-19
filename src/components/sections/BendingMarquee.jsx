"use client";

import { useReducedMotion } from "framer-motion";
import { homeContent } from "../../data/content";
import "./BendingMarquee.css";

function MarqueeTrack({ items, separator }) {
  return (
    <div className="bending-marquee__track" aria-hidden>
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
  // Two copies for a seamless loop; content itself is a varied sequence.
  const loop = [...strip.items, ...strip.items];

  return (
    <section
      className="bending-marquee"
      aria-label={strip.ariaLabel}
    >
      <div className="bending-marquee__blend bending-marquee__blend--top" aria-hidden />
      <div className="bending-marquee__band">
        <div
          className={`bending-marquee__scroller${reduce ? " is-static" : ""}`}
        >
          <MarqueeTrack
            items={reduce ? strip.items : loop}
            separator={strip.separator}
          />
          {!reduce && <MarqueeTrack items={loop} separator={strip.separator} />}
        </div>
      </div>
      <div className="bending-marquee__blend bending-marquee__blend--bottom" aria-hidden />
    </section>
  );
}
