"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Reveal from "../../ui/Reveal";
import { aboutContent } from "../../../data/content";

const ease = [0.22, 1, 0.36, 1];

export default function AboutJourney() {
  const reduce = useReducedMotion();
  const { journey } = aboutContent;
  const trackRef = useRef(null);
  const listRef = useRef(null);
  const inView = useInView(listRef, { once: true, margin: "-12% 0px" });

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start end", "end start"],
  });
  const lineScale = useTransform(scrollYProgress, [0.15, 0.75], [0, 1]);

  return (
    <section className="overflow-hidden bg-mehr-panel/50 py-9 text-mehr-ink sm:py-12 lg:py-14">
      <div className="container-mehr page-gutter sm:px-3 md:px-4 lg:px-5">
        <Reveal className="text-center lg:text-left">
          <p className="eyebrow">{journey.eyebrow}</p>
          <h2 className="mx-auto mt-2.5 max-w-[18ch] font-sans text-[clamp(1.5rem,6.2vw,2.75rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-mehr-ink sm:mt-3 sm:leading-[1.05] lg:mx-0">
            {journey.title}
          </h2>
        </Reveal>

        <div ref={trackRef} className="relative mt-7 sm:mt-10 lg:mt-12">
          <div
            aria-hidden
            className="absolute left-0 right-0 top-[1.15rem] hidden h-px bg-mehr-deep/10 lg:block"
          />
          <motion.div
            aria-hidden
            style={{
              scaleX: inView || reduce ? lineScale : 0,
              transformOrigin: "left center",
            }}
            className="absolute left-0 right-0 top-[1.15rem] hidden h-px bg-mehr-deep lg:block"
          />

          {/* Phone: horizontal snap rail · sm+: 2-col · lg: 4-col timeline */}
          <ol
            ref={listRef}
            className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4 lg:gap-5 [&::-webkit-scrollbar]:hidden"
          >
            {journey.steps.map((step, i) => (
              <motion.li
                key={step.title}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                animate={
                  inView || reduce
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 20 }
                }
                transition={{
                  duration: 0.55,
                  delay: reduce ? 0 : i * 0.1,
                  ease,
                }}
                whileHover={reduce ? undefined : { y: -5 }}
                whileTap={reduce ? undefined : { scale: 0.98 }}
                className="relative w-[min(78vw,18rem)] shrink-0 snap-center rounded-[1.2rem] border border-mehr-deep/10 bg-white p-4 shadow-soft transition hover:border-mehr-deep/20 hover:shadow-float sm:w-auto sm:rounded-[1.5rem] sm:p-5 md:p-6"
              >
                <span className="relative z-10 mb-3 flex h-6 w-6 items-center justify-center rounded-full bg-mehr-deep text-[10px] font-bold text-white sm:mb-4 lg:absolute lg:-top-3 lg:left-6 lg:mb-0">
                  {i + 1}
                </span>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-mehr-deep sm:text-[11px] lg:mt-4">
                  {step.year}
                </p>
                <h3 className="mt-1.5 font-sans text-[16px] font-semibold tracking-[-0.02em] text-mehr-ink sm:mt-2 sm:text-lg">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-[12px] leading-relaxed text-mehr-mist sm:mt-2 sm:text-[13px]">
                  {step.body}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
