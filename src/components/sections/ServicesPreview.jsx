"use client";

import { useEffect, useState } from "react";
import { Link } from "@/components/compat/router";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Building2,
  CalendarRange,
  ClipboardList,
  LineChart,
  Receipt,
  Scale,
  Search,
  Sparkles,
  Zap,
} from "lucide-react";
import Reveal from "../ui/Reveal";
import SpecularButton from "../ui/SpecularButton";
import { homeContent, ctas } from "../../data/content";

const ease = [0.22, 1, 0.36, 1];

/** On-Demand: duration slots cycling 1 WEEK → 3-7 DAYS → 1-3 MONTHS */
function OnDemandLive({ hovered, reduce }) {
  const slots = [
    { label: "1 Week", fill: 34 },
    { label: "3-7 Days", fill: 62 },
    { label: "1-3 Months", fill: 92 },
  ];
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduce) return undefined;
    const id = window.setInterval(
      () => setActive((v) => (v + 1) % slots.length),
      hovered ? 700 : 1400
    );
    return () => window.clearInterval(id);
  }, [hovered, reduce, slots.length]);

  return (
    <div className="relative flex h-[10.5rem] flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-b from-mehr-teal-soft to-white px-3.5 py-3.5 sm:h-[11rem]">
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-mehr-deep text-white shadow-soft">
          <CalendarRange size={15} strokeWidth={2} />
        </span>
        <p className="text-[11px] font-semibold text-mehr-ink">Flexible duration</p>
      </div>

      <div className="space-y-2">
        {slots.map((slot, i) => {
          const on = active === i;
          return (
            <div key={slot.label} className="flex items-center gap-2">
              <span
                className={`w-[4.25rem] shrink-0 text-[10px] font-bold tabular-nums ${
                  on ? "text-mehr-deep" : "text-mehr-muted"
                }`}
              >
                {slot.label}
              </span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-mehr-deep/10">
                <motion.span
                  className="block h-full rounded-full bg-mehr-deep"
                  animate={{ width: on || reduce ? `${slot.fill}%` : "12%" }}
                  transition={{ duration: 0.45, ease }}
                />
              </div>
              {on && (
                <Zap size={12} className="shrink-0 text-mehr-teal" fill="currentColor" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** Resident HR: embedded continuous ownership pulse */
function ResidentLive({ hovered, reduce }) {
  const beats = ["Own", "Execute", "Review", "Strengthen"];
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduce) return undefined;
    const id = window.setInterval(
      () => setActive((v) => (v + 1) % beats.length),
      hovered ? 650 : 1200
    );
    return () => window.clearInterval(id);
  }, [hovered, reduce, beats.length]);

  return (
    <div className="relative flex h-[10.5rem] flex-col items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-mehr-panel to-white px-3 py-3 sm:h-[11rem]">
      <motion.div
        className="absolute h-24 w-24 rounded-full border border-mehr-deep/15"
        animate={reduce ? undefined : { scale: [1, 1.12, 1], opacity: [0.35, 0.7, 0.35] }}
        transition={{ duration: hovered ? 1.6 : 2.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute h-16 w-16 rounded-full border border-dashed border-mehr-deep/25"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: hovered ? 8 : 16, repeat: Infinity, ease: "linear" }}
      />
      <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl bg-mehr-deep text-white shadow-float">
        <Building2 size={18} strokeWidth={1.9} />
      </span>

      <div className="relative z-10 mt-3 flex gap-1">
        {beats.map((label, i) => (
          <span
            key={label}
            className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide transition ${
              active === i
                ? "bg-mehr-deep text-white"
                : "bg-white text-mehr-muted shadow-soft"
            }`}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

/** Strategic: diagnose → design advisory scan */
function StrategicLive({ hovered, reduce }) {
  const stages = [
    { label: "Diagnose", Icon: Search },
    { label: "Design", Icon: LineChart },
    { label: "Advise", Icon: Sparkles },
  ];
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduce) return undefined;
    const id = window.setInterval(
      () => setActive((v) => (v + 1) % stages.length),
      hovered ? 700 : 1300
    );
    return () => window.clearInterval(id);
  }, [hovered, reduce, stages.length]);

  return (
    <div className="relative flex h-[10.5rem] flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-b from-[#e4f6f2] to-white px-3.5 py-3.5 sm:h-[11rem]">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[11px] font-semibold text-mehr-ink">Advisory brief</p>
        <span className="rounded-full bg-mehr-deep/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-mehr-deep">
          Project
        </span>
      </div>

      <div className="relative mt-2 flex-1">
        <svg viewBox="0 0 160 48" className="h-12 w-full" aria-hidden>
          <path
            d="M4 36 C28 36, 36 12, 56 18 S90 44, 110 28 S140 8, 156 16"
            fill="none"
            stroke="rgba(11,95,88,0.2)"
            strokeWidth="2"
          />
          <motion.path
            d="M4 36 C28 36, 36 12, 56 18 S90 44, 110 28 S140 8, 156 16"
            fill="none"
            stroke="#0b5f58"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: reduce ? 1 : [0.15, 1, 0.15] }}
            transition={{ duration: hovered ? 1.8 : 3.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>

      <div className="flex gap-1.5">
        {stages.map((stage, i) => {
          const on = active === i;
          return (
            <motion.div
              key={stage.label}
              animate={reduce ? undefined : { y: on ? -2 : 0 }}
              className={`flex flex-1 items-center justify-center gap-1 rounded-lg px-1.5 py-1.5 text-[10px] font-bold ${
                on ? "bg-mehr-deep text-white" : "bg-white text-mehr-mist shadow-soft"
              }`}
            >
              <stage.Icon size={11} strokeWidth={2.2} />
              {stage.label}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/** Pagar: payroll + statutory cycle */
function PagarLive({ hovered, reduce }) {
  const items = [
    { label: "Payroll", Icon: Receipt },
    { label: "PF / ESIC", Icon: Scale },
    { label: "MIS", Icon: ClipboardList },
  ];
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduce) return undefined;
    const id = window.setInterval(
      () => setActive((v) => (v + 1) % items.length),
      hovered ? 650 : 1100
    );
    return () => window.clearInterval(id);
  }, [hovered, reduce, items.length]);

  return (
    <div className="relative flex h-[10.5rem] flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-b from-mehr-panel to-white px-3.5 py-3.5 sm:h-[11rem]">
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-mehr-deep text-white shadow-soft">
          <Receipt size={15} strokeWidth={2} />
        </span>
        <div>
          <p className="text-[11px] font-semibold text-mehr-ink">Monthly cycle</p>
          <p className="text-[9px] text-mehr-muted">Payroll & compliance</p>
        </div>
      </div>

      <div className="relative mt-2 flex items-center justify-center gap-2">
        {items.map((item, i) => {
          const on = active === i;
          return (
            <motion.div
              key={item.label}
              animate={
                reduce
                  ? undefined
                  : { scale: on ? 1.06 : 0.96, opacity: on ? 1 : 0.55 }
              }
              transition={{ duration: 0.35, ease }}
              className={`flex flex-1 flex-col items-center gap-1 rounded-xl px-1.5 py-2 ${
                on ? "bg-mehr-deep text-white shadow-soft" : "bg-white text-mehr-deep shadow-soft"
              }`}
            >
              <item.Icon size={14} strokeWidth={2} />
              <span className="text-[9px] font-bold">{item.label}</span>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-2 h-1 overflow-hidden rounded-full bg-mehr-deep/10">
        <motion.span
          key={active}
          className="block h-full rounded-full bg-mehr-teal"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{
            duration: hovered || reduce ? 0.4 : 1.05,
            ease: "linear",
          }}
        />
      </div>
    </div>
  );
}

const VISUALS = {
  "on-demand-hr": OnDemandLive,
  "hr-retainership": ResidentLive,
  "strategic-consulting": StrategicLive,
  pagar: PagarLive,
};

const cards = homeContent.howWeHelp.items.map((item) => ({
  id: item.id,
  label: item.title,
  title: item.title,
  desc: item.desc,
  href: item.path,
  cta: item.cta || ctas.explore,
  Visual: VISUALS[item.id] || OnDemandLive,
}));

function LiveServiceCard({ card, index }) {
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const Visual = card.Visual;

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.55, delay: 0.06 * index, ease }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-mehr-deep/8 bg-white p-3.5 shadow-soft transition duration-400 hover:-translate-y-1.5 hover:border-mehr-deep/18 hover:shadow-float sm:rounded-[1.5rem] sm:p-4"
    >
      <div className="mb-3 shrink-0">
        <Visual hovered={hovered} reduce={reduce} />
      </div>

      <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-mehr-muted">
        {card.label}
      </p>
      <h3 className="font-sans text-[15px] font-bold leading-snug tracking-tight text-mehr-ink sm:text-base">
        {card.title}
      </h3>
      <p className="mt-1.5 line-clamp-3 flex-1 text-[12px] leading-relaxed text-mehr-mist sm:text-[13px]">
        {card.desc}
      </p>

      <Link
        to={card.href}
        className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-bold text-mehr-deep transition group-hover:gap-2.5 group-hover:text-mehr-ink"
      >
        {card.cta}
        <ArrowUpRight size={14} />
      </Link>
    </motion.div>
  );
}

export default function ServicesPreview() {
  const preview = homeContent.servicesPreview;

  return (
    <section className="section-pad relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-0 bg-mesh-teal opacity-45" aria-hidden />

      <div className="container-mehr page-gutter relative z-10 sm:px-3 md:px-4 lg:px-5">
        <div className="overflow-hidden rounded-[1.75rem] bg-mehr-panel px-5 py-8 sm:rounded-[2.25rem] sm:px-8 sm:py-10 lg:rounded-[2.5rem] lg:px-10 lg:py-12">
          <div className="mb-8 flex flex-col gap-5 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
            <Reveal className="max-w-xl">
              <p className="eyebrow mb-3">{preview.eyebrow}</p>
              <h2 className="font-sans text-[clamp(1.55rem,3.4vw,2.65rem)] font-semibold leading-[1.12] tracking-[-0.03em] text-mehr-ink">
                {preview.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-mehr-mist sm:text-[15px]">
                {preview.body}
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <SpecularButton to="/contact" variant="brand" size="md">
                {preview.cta || ctas.primary}
                <ArrowUpRight size={15} />
              </SpecularButton>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 items-stretch gap-3.5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:gap-4">
            {cards.map((card, i) => (
              <LiveServiceCard key={card.id} card={card} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
