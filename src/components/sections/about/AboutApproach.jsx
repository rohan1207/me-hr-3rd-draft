"use client";

import { useEffect, useState } from "react";
import { Link } from "@/components/compat/router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  ClipboardList,
  Compass,
  HandCoins,
  Handshake,
  RefreshCw,
  UserRoundCheck,
  Users,
  Wallet,
} from "lucide-react";
import Reveal from "../../ui/Reveal";
import { aboutContent, ctas } from "../../../data/content";

const ease = [0.22, 1, 0.36, 1];
const CYCLE_MS = 4800;

const LISTEN_POINTS = [
  { label: "Workforce", Icon: Users },
  { label: "Priorities", Icon: ClipboardList },
  { label: "Gaps", Icon: Compass },
];

const MODELS = [
  { label: "On-Demand", hint: "As needed", Icon: Handshake },
  { label: "Resident HR", hint: "Embedded", Icon: UserRoundCheck },
  { label: "Strategic", hint: "Advisory", Icon: Compass },
  { label: "Payroll Outsourcing", hint: "Payroll", Icon: Wallet },
];

const GROWTH = [
  { label: "Process", Icon: ClipboardList },
  { label: "People", Icon: Users },
  { label: "Pay", Icon: HandCoins },
];

function UnderstandVisual({ active, reduce }) {
  return (
    <div className="flex h-full flex-col justify-center gap-2 overflow-visible py-0.5">
      {LISTEN_POINTS.map((item, i) => (
        <motion.div
          key={item.label}
          className="flex items-center gap-2.5 rounded-xl bg-white/12 px-2.5 py-2 ring-1 ring-white/10"
          initial={false}
          animate={
            reduce || !active
              ? { opacity: 0.85 }
              : { opacity: [0.55, 1, 0.55] }
          }
          transition={{
            duration: 2.6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.22,
          }}
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center overflow-visible rounded-lg bg-white text-mehr-deep shadow-soft">
            <item.Icon size={15} strokeWidth={2} />
          </span>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold text-white">{item.label}</p>
            <p className="text-[9px] font-medium text-white/55">
              {i === 0 ? "Who you employ" : i === 1 ? "What matters now" : "What's missing"}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function RecommendVisual({ active, reduce }) {
  return (
    <div className="grid h-full grid-cols-2 content-center gap-1.5 overflow-visible py-0.5">
      {MODELS.map((model, i) => (
        <motion.div
          key={model.label}
          className="flex flex-col items-start gap-1 overflow-visible rounded-xl bg-white/12 p-2 ring-1 ring-white/10"
          animate={
            reduce || !active
              ? undefined
              : { opacity: [0.7, 1, 0.7] }
          }
          transition={{
            duration: 2.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.14,
          }}
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center overflow-visible rounded-md bg-white text-mehr-deep">
            <model.Icon size={13} strokeWidth={2} />
          </span>
          <p className="text-[10px] font-semibold leading-tight text-white">{model.label}</p>
          <p className="text-[8px] font-medium uppercase tracking-[0.1em] text-white/50">
            {model.hint}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

function StrengthenVisual({ active, reduce }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 overflow-visible py-1">
      <div className="relative flex h-16 w-16 shrink-0 items-center justify-center sm:h-[4.5rem] sm:w-[4.5rem]">
        <motion.span
          className="absolute inset-0 rounded-full border border-dashed border-white/30"
          animate={reduce || !active ? undefined : { rotate: 360 }}
          transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
        />
        <span className="relative z-10 flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-mehr-deep shadow-float">
          <RefreshCw size={17} strokeWidth={2} />
        </span>
      </div>
      <div className="flex w-full items-center justify-between gap-1.5 px-0.5">
        {GROWTH.map((item, i) => (
          <motion.div
            key={item.label}
            className="flex flex-1 flex-col items-center gap-1 overflow-visible rounded-lg bg-white/12 px-1.5 py-1.5 ring-1 ring-white/10"
            animate={
              reduce || !active
                ? undefined
                : { opacity: [0.55, 1, 0.55] }
            }
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          >
            <item.Icon size={12} strokeWidth={2} className="text-white" />
            <span className="text-[8px] font-semibold uppercase tracking-[0.08em] text-white/70">
              {item.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const VISUALS = [UnderstandVisual, RecommendVisual, StrengthenVisual];
const ACCENTS = [
  "from-[#0b5f58] to-[#084740]",
  "from-[#084740] to-[#0a3d38]",
  "from-[#14c4ad] to-[#0b5f58]",
];

export default function AboutApproach() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const { approach } = aboutContent;

  useEffect(() => {
    if (reduce || paused) return undefined;
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % approach.steps.length);
    }, CYCLE_MS);
    return () => window.clearInterval(id);
  }, [reduce, paused, approach.steps.length]);

  return (
    <section
      id="approach"
      className="scroll-mt-28 surface-panel relative overflow-hidden py-9 sm:py-12 lg:py-14"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_90%_10%,rgba(20,196,173,0.14),transparent_55%),radial-gradient(ellipse_45%_40%_at_5%_90%,rgba(11,95,88,0.08),transparent_50%)]"
      />

      <div className="container-mehr page-gutter relative z-10 sm:px-3 md:px-4 lg:px-5">
        <div className="flex flex-col gap-3 text-center lg:flex-row lg:items-end lg:justify-between lg:gap-8 lg:text-left">
          <Reveal>
            <p className="eyebrow">{approach.eyebrow}</p>
            <h2 className="mx-auto mt-2 max-w-[16ch] font-sans text-[clamp(1.45rem,6.2vw,3rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-mehr-ink lg:mx-0">
              {approach.title}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mx-auto max-w-md text-sm leading-relaxed text-mehr-mist sm:text-[15px] lg:mx-0 lg:text-right">
              A concise operating framework: diagnose first, match the right model,
              then keep strengthening as the business grows.
            </p>
          </Reveal>
        </div>

        <div
          className="mt-5 sm:mt-6"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Progress rail */}
          <div className="mb-3 flex items-center gap-2 sm:mb-4">
            {approach.steps.map((step, i) => (
              <button
                key={step.title}
                type="button"
                aria-label={`Step ${i + 1}: ${step.title}`}
                onClick={() => setActive(i)}
                className="group flex flex-1 flex-col gap-1.5"
              >
                <div className="h-1 overflow-hidden rounded-full bg-mehr-deep/10">
                  {i === active ? (
                    <motion.span
                      key={`rail-${active}-${paused}`}
                      className="block h-full origin-left rounded-full bg-mehr-deep"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{
                        duration: paused || reduce ? 0.25 : CYCLE_MS / 1000,
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
                </div>
                <span
                  className={`text-center text-[11px] font-semibold uppercase tracking-[0.12em] transition sm:text-left ${
                    i === active
                      ? "text-mehr-deep"
                      : "text-mehr-muted group-hover:text-mehr-ink"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                  <span className="hidden sm:inline"> · {step.title}</span>
                </span>
              </button>
            ))}
          </div>

          {/* Stage cards */}
          <Reveal>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {approach.steps.map((step, i) => {
                const on = active === i;
                const Visual = VISUALS[i];
                return (
                  <motion.button
                    key={step.title}
                    type="button"
                    onClick={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    whileHover={reduce ? undefined : { y: -2 }}
                    className={`relative overflow-hidden rounded-[1.35rem] text-left outline-none transition focus-visible:ring-2 focus-visible:ring-mehr-deep/30 sm:rounded-[1.5rem] ${
                      on
                        ? "shadow-float ring-2 ring-mehr-deep/25"
                        : "opacity-90 hover:opacity-100"
                    }`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${ACCENTS[i]}`} />
                    <div className="relative z-10 flex h-full flex-col p-3.5 sm:p-4">
                      <div className="flex shrink-0 items-center justify-between gap-2 pb-2.5">
                        <p className="font-sans text-sm font-semibold text-white sm:text-[15px]">
                          {step.title}
                        </p>
                        <span className="text-[10px] font-semibold tabular-nums tracking-[0.14em] text-white/55">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <div className="min-h-[148px] flex-1 overflow-visible sm:min-h-[160px]">
                        <div className="h-full min-h-[148px] overflow-visible sm:min-h-[160px]">
                          <Visual active={on} reduce={reduce} />
                        </div>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </Reveal>

          {/* Active detail */}
          <Reveal delay={0.06}>
            <div className="mt-3 flex flex-col gap-4 rounded-[1.35rem] bg-white p-5 shadow-soft sm:mt-4 sm:flex-row sm:items-center sm:justify-between sm:rounded-[1.5rem] sm:gap-6 sm:p-6">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={approach.steps[active].title}
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -6 }}
                  transition={{ duration: 0.28, ease }}
                  className="min-w-0 flex-1"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-mehr-deep">
                    Stage {String(active + 1).padStart(2, "0")} ·{" "}
                    {approach.steps[active].title}
                  </p>
                  <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-mehr-mist sm:text-[15px]">
                    {approach.steps[active].desc}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="flex w-full shrink-0 flex-col items-stretch gap-2.5 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
                <Link
                  to="/contact"
                  className="inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-mehr-deep px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-mehr-teal-dark sm:w-auto"
                >
                  {ctas.primary}
                  <ArrowUpRight size={15} />
                </Link>
                <Link
                  to="/services"
                  className="inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-mehr-panel px-5 py-2.5 text-sm font-semibold text-mehr-deep transition hover:bg-mehr-teal-soft sm:w-auto"
                >
                  Explore models
                  <ArrowUpRight size={15} />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
