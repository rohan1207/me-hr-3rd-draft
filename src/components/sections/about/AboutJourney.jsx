"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Reveal from "../../ui/Reveal";
import { aboutContent } from "../../../data/content";

const ease = [0.22, 1, 0.36, 1];
const AUTO_MS = 3000;

function JourneyCard({ step, index, reduce, inView }) {
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 20 }}
      animate={inView || reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: 0.55,
        delay: reduce ? 0 : index * 0.1,
        ease,
      }}
      whileHover={reduce ? undefined : { y: -5 }}
      className="relative h-full rounded-[1.2rem] border border-mehr-deep/10 bg-white p-4 shadow-soft transition hover:border-mehr-deep/20 hover:shadow-float sm:rounded-[1.5rem] sm:p-5 md:p-6"
    >
      <span className="relative z-10 mb-3 flex h-6 w-6 items-center justify-center rounded-full bg-mehr-deep text-[10px] font-bold text-white sm:mb-4 lg:absolute lg:-top-3 lg:left-6 lg:mb-0">
        {index + 1}
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
    </motion.div>
  );
}

export default function AboutJourney() {
  const reduce = useReducedMotion();
  const { journey } = aboutContent;
  const steps = journey.steps;
  const trackRef = useRef(null);
  const scrollerRef = useRef(null);
  const pauseUntil = useRef(0);
  const inView = useInView(trackRef, { once: true, margin: "-12% 0px" });
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start end", "end start"],
  });
  const lineScale = useTransform(scrollYProgress, [0.15, 0.75], [0, 1]);

  const goTo = useCallback(
    (next) => {
      const i = ((next % steps.length) + steps.length) % steps.length;
      setActive(i);
      const scroller = scrollerRef.current;
      if (!scroller) return;
      const card = scroller.children[i];
      if (!card) return;
      scroller.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
    },
    [steps.length]
  );

  const pauseAuto = useCallback(() => {
    pauseUntil.current = Date.now() + AUTO_MS * 2;
  }, []);

  const prev = useCallback(() => {
    pauseAuto();
    goTo(active - 1);
  }, [active, goTo, pauseAuto]);

  const next = useCallback(() => {
    pauseAuto();
    goTo(active + 1);
  }, [active, goTo, pauseAuto]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return undefined;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const left = scroller.scrollLeft;
        const width = scroller.clientWidth || 1;
        const i = Math.round(left / width);
        setActive(Math.max(0, Math.min(steps.length - 1, i)));
      });
    };

    scroller.addEventListener("scroll", onScroll, { passive: true });
    scroller.addEventListener("pointerdown", pauseAuto);
    scroller.addEventListener("touchstart", pauseAuto, { passive: true });
    return () => {
      scroller.removeEventListener("scroll", onScroll);
      scroller.removeEventListener("pointerdown", pauseAuto);
      scroller.removeEventListener("touchstart", pauseAuto);
    };
  }, [pauseAuto, steps.length]);

  useEffect(() => {
    if (reduce) return undefined;

    const mq = window.matchMedia("(max-width: 639px)");
    if (!mq.matches) return undefined;

    const id = window.setInterval(() => {
      if (Date.now() < pauseUntil.current) return;
      if (document.hidden) return;
      setActive((i) => {
        const nextI = (i + 1) % steps.length;
        const scroller = scrollerRef.current;
        if (scroller) {
          const card = scroller.children[nextI];
          if (card) {
            scroller.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
          }
        }
        return nextI;
      });
    }, AUTO_MS);

    return () => window.clearInterval(id);
  }, [reduce, steps.length]);

  return (
    <section className="overflow-hidden bg-mehr-panel/50 py-9 text-mehr-ink sm:py-12 lg:py-14">
      <div className="container-mehr page-gutter sm:px-3 md:px-4 lg:px-5">
        <Reveal>
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1 text-left">
              <p className="eyebrow">{journey.eyebrow}</p>
              <h2 className="mt-2.5 max-w-[18ch] font-sans text-[clamp(1.5rem,6.2vw,2.75rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-mehr-ink sm:mt-3 sm:leading-[1.05]">
                {journey.title}
              </h2>
            </div>

            <div className="flex shrink-0 items-center gap-0.5 pt-0.5 sm:hidden">
              <button
                type="button"
                aria-label="Previous journey step"
                onClick={prev}
                className="flex h-8 w-8 items-center justify-center rounded-full text-mehr-deep/55 transition active:bg-mehr-deep/8 active:text-mehr-deep"
              >
                <ChevronLeft size={18} strokeWidth={1.6} />
              </button>
              <button
                type="button"
                aria-label="Next journey step"
                onClick={next}
                className="flex h-8 w-8 items-center justify-center rounded-full text-mehr-deep/55 transition active:bg-mehr-deep/8 active:text-mehr-deep"
              >
                <ChevronRight size={18} strokeWidth={1.6} />
              </button>
            </div>
          </div>
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

          {/* Phone: full-width one-card carousel */}
          <div
            ref={scrollerRef}
            className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] sm:hidden [&::-webkit-scrollbar]:hidden"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {steps.map((step, i) => (
              <div
                key={step.title}
                className="w-full min-w-full shrink-0 snap-start snap-always px-0"
              >
                <JourneyCard
                  step={step}
                  index={i}
                  reduce={reduce}
                  inView={inView}
                />
              </div>
            ))}
          </div>

          <div
            className="mt-4 flex items-center justify-center gap-1.5 sm:hidden"
            aria-hidden
          >
            {steps.map((step, i) => (
              <button
                key={step.title}
                type="button"
                aria-label={`Go to step ${i + 1}`}
                onClick={() => {
                  pauseAuto();
                  goTo(i);
                }}
                className={`h-1.5 rounded-full transition-all ${
                  active === i ? "w-5 bg-mehr-deep" : "w-1.5 bg-mehr-deep/25"
                }`}
              />
            ))}
          </div>

          {/* sm+: grid */}
          <ol className="hidden gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {steps.map((step, i) => (
              <li key={step.title}>
                <JourneyCard
                  step={step}
                  index={i}
                  reduce={reduce}
                  inView={inView}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
