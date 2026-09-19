"use client";

import { useEffect, useRef, useState } from "react";
import { Link } from "@/components/compat/router";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowUpRight,
  ChevronRight,
  ClipboardList,
  Lightbulb,
  RefreshCw,
  Search,
  Settings2,
} from "lucide-react";
import { howItWorks, homeContent } from "../../data/content";
import SpecularButton from "../ui/SpecularButton";
import Reveal from "../ui/Reveal";
import ProcessGlobe from "./ProcessGlobe";

const ease = [0.22, 1, 0.36, 1];
const CYCLE_MS = 4200;
const TEAL = "#14c4ad";

const section = homeContent.howItWorksSection;
const STEP_ICONS = [Search, Settings2, ClipboardList, Lightbulb, RefreshCw];

function WordReveal({ text, className = "" }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });
  const words = text.split(/\s+/);

  if (reduce) {
    return (
      <h2 ref={ref} className={className}>
        {text}
      </h2>
    );
  }

  return (
    <h2 ref={ref} className={className}>
      {words.map((word, i) => {
        const accent =
          word.toLowerCase().includes("structured") ||
          word.toLowerCase().includes("outsourced");
        return (
          <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom">
            <motion.span
              className={`inline-block ${accent ? "text-mehr-deep" : ""}`}
              initial={{ y: "105%", opacity: 0, filter: "blur(6px)" }}
              animate={inView ? { y: "0%", opacity: 1, filter: "blur(0px)" } : undefined}
              transition={{ duration: 0.7, delay: 0.05 + i * 0.045, ease }}
            >
              {word}
              {i < words.length - 1 ? "\u00A0" : ""}
            </motion.span>
          </span>
        );
      })}
    </h2>
  );
}

function StepConceptCard({ item, index, isOn, onSelect, reduce }) {
  const Icon = STEP_ICONS[index] || Search;

  return (
    <motion.button
      type="button"
      onMouseEnter={onSelect}
      onFocus={onSelect}
      onClick={onSelect}
      animate={
        reduce
          ? undefined
          : {
              y: isOn ? -4 : 0,
              scale: isOn ? 1.02 : 0.98,
            }
      }
      transition={{ duration: 0.35, ease }}
      className={`group relative flex h-full min-h-[150px] w-full flex-col overflow-hidden rounded-2xl p-3 text-left outline-none transition focus-visible:ring-2 focus-visible:ring-mehr-deep/30 sm:min-h-[170px] sm:rounded-[1.25rem] sm:p-3.5 ${
        isOn
          ? "bg-mehr-deep text-white shadow-float"
          : "border border-mehr-deep/10 bg-mehr-panel text-mehr-ink hover:border-mehr-deep/20 hover:bg-white"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <span
          className={`flex h-9 w-9 items-center justify-center rounded-xl ${
            isOn ? "bg-white/15 text-white" : "bg-white text-mehr-deep shadow-soft"
          }`}
        >
          <Icon size={16} strokeWidth={1.85} />
        </span>
        <span
          className={`font-sans text-[11px] font-semibold tabular-nums ${
            isOn ? "text-white/55" : "text-mehr-muted"
          }`}
        >
          {item.step}
        </span>
      </div>

      <p className="mt-auto font-sans text-[12px] font-semibold leading-snug sm:text-[13px]">
        {item.title}
      </p>

      {!reduce && isOn && (
        <motion.span
          className="mt-2 block h-0.5 origin-left rounded-full bg-white/70"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: CYCLE_MS / 1000, ease: "linear" }}
        />
      )}

      <svg
        className="pointer-events-none absolute -right-2 -top-2 h-16 w-16 opacity-[0.12]"
        viewBox="0 0 64 64"
        aria-hidden
      >
        <circle cx="40" cy="24" r="18" fill={isOn ? "#fff" : TEAL} />
      </svg>
    </motion.button>
  );
}

export default function HowItWorks() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const step = howItWorks[active];

  useEffect(() => {
    if (reduce || paused) return undefined;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % howItWorks.length);
    }, CYCLE_MS);
    return () => window.clearInterval(id);
  }, [reduce, paused]);

  return (
    <section className="section-pad surface-white !pb-0 sm:!pb-2 lg:!pb-4">
      <div className="pointer-events-none absolute inset-0 bg-mesh-teal opacity-70" aria-hidden />

      <div className="container-mehr page-gutter relative z-10 sm:px-3 md:px-4 lg:px-5">
        <div className="grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12 xl:gap-16">
          <div className="flex flex-col justify-center">
            <Reveal>
              <p className="eyebrow mb-4">{section.eyebrow}</p>
            </Reveal>
            <WordReveal
              text={section.title}
              className="max-w-[16ch] font-sans text-[clamp(1.7rem,3.8vw,3.1rem)] font-semibold leading-[1.12] tracking-[-0.03em] text-mehr-ink"
            />
            <Reveal delay={0.2}>
              <p className="mt-4 max-w-md text-[14px] leading-relaxed text-mehr-mist sm:text-[15px]">
                {section.body}
              </p>
            </Reveal>

            <Reveal delay={0.25} className="mt-7 flex flex-wrap items-center gap-3">
              <SpecularButton to="/contact" variant="brand" size="md">
                {section.primaryCta}
                <ArrowUpRight size={15} />
              </SpecularButton>
              <Link
                to="/services"
                className="inline-flex items-center gap-1.5 rounded-full border border-mehr-deep/20 bg-white px-5 py-3 text-sm font-semibold text-mehr-deep transition hover:border-mehr-deep hover:bg-mehr-panel"
              >
                {section.secondaryCta}
                <ChevronRight size={16} />
              </Link>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="min-h-[340px] sm:min-h-[400px] lg:min-h-[440px]">
            <ProcessGlobe />
          </Reveal>
        </div>

        <div
          className="mt-8 grid items-stretch gap-8 border-t border-mehr-deep/8 pt-8 sm:mt-10 sm:pt-10 lg:mt-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12 lg:pt-12"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <Reveal className="flex flex-col justify-center">
            <p className="eyebrow">{section.processEyebrow}</p>
            <h3 className="mt-3 max-w-[22ch] font-sans text-xl font-semibold tracking-tight text-mehr-ink sm:text-2xl lg:text-[1.75rem]">
              {section.processTitle}
            </h3>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={step.step}
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="mt-4"
              >
                <p className="max-w-sm text-[13px] leading-relaxed sm:text-[14px]">
                  <span className="font-semibold text-mehr-ink">
                    {step.step} · {step.title}.
                  </span>{" "}
                  <span className="text-mehr-mist">{step.desc}</span>
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-5 flex max-w-xs gap-1.5">
              {howItWorks.map((item, i) => (
                <button
                  key={item.step}
                  type="button"
                  aria-label={`Step ${item.step}`}
                  onClick={() => setActive(i)}
                  className="h-1 flex-1 overflow-hidden rounded-full bg-mehr-deep/10"
                >
                  {i === active ? (
                    <motion.span
                      key={`rail-${active}-${paused}`}
                      className="block h-full origin-left rounded-full bg-mehr-deep"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{
                        duration: paused || reduce ? 0.2 : CYCLE_MS / 1000,
                        ease: paused || reduce ? "easeOut" : "linear",
                      }}
                    />
                  ) : (
                    <span
                      className={`block h-full rounded-full bg-mehr-deep transition-all duration-300 ${
                        i < active ? "w-full" : "w-0"
                      }`}
                    />
                  )}
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08} className="h-full min-h-0">
            <div className="grid h-full min-h-[160px] grid-cols-2 gap-2.5 sm:min-h-[180px] sm:grid-cols-5 sm:gap-3 lg:min-h-0">
              {howItWorks.map((item, i) => (
                <StepConceptCard
                  key={item.step}
                  item={item}
                  index={i}
                  isOn={active === i}
                  reduce={reduce}
                  onSelect={() => {
                    setActive(i);
                    setPaused(true);
                  }}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
