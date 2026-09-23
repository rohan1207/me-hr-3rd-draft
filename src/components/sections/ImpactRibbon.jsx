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
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });

  return (
    <section className="relative overflow-hidden bg-mehr-panel/60 py-10 sm:py-12 md:py-14 lg:py-16 xl:py-20">
      <div
        className="pointer-events-none absolute inset-0 bg-mesh-teal opacity-50"
        aria-hidden
      />

      <div
        ref={ref}
        className="container-mehr page-gutter relative z-10 sm:px-3 md:px-4 lg:px-5"
      >
        <motion.h2
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-[16ch] text-center font-sans text-[clamp(1.45rem,6.2vw,2.65rem)] font-semibold leading-[1.12] tracking-[-0.035em] text-mehr-ink sm:max-w-[18ch] sm:leading-[1.1]"
        >
          {strip.title}
          <span className="ml-0.5 inline-block text-mehr-deep" aria-hidden>
            .
          </span>
        </motion.h2>

        {/* Phone: 2x2 with hairlines; md+: single 4-up row */}
        <div className="mx-auto mt-7 max-w-5xl sm:mt-9 md:mt-11 lg:mt-12">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {strip.items.map((item, i) => {
              const phoneRight = i % 2 === 0;
              const phoneBottom = i < 2;
              const mdRight = i < 3;

              return (
                <motion.div
                  key={item.label}
                  initial={reduce ? false : { opacity: 0, y: 18 }}
                  animate={inView ? { opacity: 1, y: 0 } : undefined}
                  transition={{
                    duration: 0.5,
                    delay: reduce ? 0 : 0.06 + i * 0.07,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={[
                    "flex flex-col items-center px-3 py-5 text-center sm:px-5 sm:py-6 md:px-4 md:py-2 lg:px-6",
                    phoneRight ? "border-r border-mehr-ink/[0.08]" : "",
                    phoneBottom ? "border-b border-mehr-ink/[0.08]" : "",
                    "md:border-b-0",
                    phoneRight ? "md:border-r-0" : "",
                    mdRight ? "md:border-r md:border-mehr-ink/[0.08]" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <p
                    className={`font-sans text-[clamp(2.15rem,10vw,3.75rem)] font-semibold leading-none tracking-[-0.04em] sm:text-[clamp(2.4rem,6vw,3.75rem)] ${
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
                  <p className="mt-2.5 max-w-[13ch] text-[12px] font-medium leading-snug text-mehr-mist sm:mt-3 sm:max-w-[14ch] sm:text-[13px] md:text-[14px]">
                    {item.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
