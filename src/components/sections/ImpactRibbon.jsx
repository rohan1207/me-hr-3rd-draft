"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { homeContent } from "../../data/content";

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

const TONE = {
  deep: "text-mehr-deep",
  teal: "text-mehr-teal",
  charcoal: "text-mehr-charcoal",
  slate: "text-mehr-slate",
};

function CountUp({ value, suffix = "", duration = 1600, active, reduce }) {
  const [display, setDisplay] = useState(reduce ? value : 0);

  useEffect(() => {
    if (reduce) {
      setDisplay(value);
      return undefined;
    }
    if (!active) {
      setDisplay(0);
      return undefined;
    }

    let frame = 0;
    const start = performance.now();

    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      setDisplay(Math.round(easeOutCubic(t) * value));
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, duration, reduce, value]);

  return (
    <span className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

export default function ImpactRibbon() {
  const strip = homeContent.impactStrip;
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-18% 0px" });

  return (
    <section className="relative overflow-hidden bg-mehr-panel/60 py-14 sm:py-16 lg:py-20">
      <div
        className="pointer-events-none absolute inset-0 bg-mesh-teal opacity-50"
        aria-hidden
      />

      <div
        ref={ref}
        className="container-mehr page-gutter relative z-10 sm:px-3 md:px-4 lg:px-5"
      >
        <motion.h2
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-[18ch] text-center font-sans text-[clamp(1.65rem,3.4vw,2.65rem)] font-semibold leading-[1.12] tracking-[-0.035em] text-mehr-ink"
        >
          {strip.title}
          <span className="ml-0.5 inline-block text-mehr-deep" aria-hidden>
            .
          </span>
        </motion.h2>

        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 sm:mt-12 sm:gap-x-8 lg:mt-14 lg:grid-cols-4 lg:gap-8">
          {strip.items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={reduce ? false : { opacity: 0, y: 22 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{
                duration: 0.55,
                delay: reduce ? 0 : 0.08 + i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-col items-center text-center"
            >
              <p
                className={`font-sans text-[clamp(2.4rem,5.5vw,3.75rem)] font-semibold leading-none tracking-[-0.04em] ${
                  TONE[item.tone] || TONE.deep
                }`}
              >
                <CountUp
                  value={item.value}
                  suffix={item.suffix}
                  active={inView}
                  reduce={reduce}
                  duration={1400 + i * 120}
                />
              </p>
              <p className="mt-3 max-w-[14ch] text-[13px] font-medium leading-snug text-mehr-mist sm:text-[14px]">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
