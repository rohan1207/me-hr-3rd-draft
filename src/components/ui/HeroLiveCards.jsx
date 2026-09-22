"use client";

import { useEffect, useState } from "react";
import { Link } from "@/components/compat/router";
import { motion, useReducedMotion } from "framer-motion";
import { homeContent, serviceModels } from "../../data/content";

const ease = [0.22, 1, 0.36, 1];
const TEAL = "#14c4ad";

const models = homeContent.howWeHelp?.items?.length
 ? homeContent.howWeHelp.items
 : serviceModels;

const ON_DEMAND_VALUES = ["1W", "3-7D", "1-3M"];
const APPROACH_STEPS = homeContent.philosophy.principles.map((_, i) =>
 String(i + 1).padStart(2, "0")
);

const BARS = [
 { idle: 38, hover: 52 },
 { idle: 55, hover: 68 },
 { idle: 42, hover: 58 },
 { idle: 70, hover: 84 },
 { idle: 48, hover: 62 },
 { idle: 78, hover: 92 },
 { idle: 62, hover: 76 },
];

const LINE_POINTS = [
 [0, 72],
 [16, 58],
 [32, 64],
 [48, 42],
 [64, 48],
 [80, 28],
 [100, 18],
];

function linePath(boost = 0) {
 return LINE_POINTS.map(([x, y], i) => {
 const ny = Math.max(8, y - boost * (0.4 + i * 0.08));
 return `${i === 0 ? "M" : "L"} ${x} ${ny}`;
 }).join(" ");
}

function shortSubtitle(desc, max = 72) {
 if (!desc) return "";
 if (desc.length <= max) return desc;
 const cut = desc.slice(0, max);
 const lastSpace = cut.lastIndexOf(" ");
 return `${cut.slice(0, lastSpace > 40 ? lastSpace : max).trim()}…`;
}

function GlassCard({
  children,
  className = "",
  delay = 0,
  reduce,
  hovered,
  onHover,
  to,
  label,
}) {
  const sharedClass = `group relative overflow-hidden rounded-[1.35rem] border border-white/12 bg-white/[0.07] shadow-[0_20px_50px_rgba(0,0,0,0.35)] backdrop-blur-md outline-none transition-[border-color,box-shadow,transform] duration-300 focus-visible:ring-2 focus-visible:ring-white/30 sm:rounded-[1.5rem] ${
    hovered ? "border-white/25 shadow-[0_28px_60px_rgba(0,0,0,0.45)]" : ""
  } ${to ? "cursor-pointer hover:border-white/30" : ""} ${className}`;

  const inner = (
    <>
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background: `radial-gradient(120% 80% at 20% 0%, ${TEAL}22, transparent 55%)`,
        }}
        aria-hidden
      />
      <div className="relative z-[1] flex h-full flex-col p-3.5 sm:p-4">{children}</div>
    </>
  );

  if (to) {
    return (
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 28, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.75, delay, ease }}
        className="h-full w-full"
      >
        <Link
          to={to}
          aria-label={label || "View service"}
          onMouseEnter={() => onHover(true)}
          onMouseLeave={() => onHover(false)}
          onFocus={() => onHover(true)}
          onBlur={() => onHover(false)}
          className={`block h-full ${sharedClass}`}
        >
          {inner}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 28, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.75, delay, ease }}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      onFocus={() => onHover(true)}
      onBlur={() => onHover(false)}
      tabIndex={0}
      className={sharedClass}
    >
      {inner}
    </motion.div>
  );
}

function CardLabel({ eyebrow, title, value, suffix = "" }) {
 return (
 <div className="mb-3 flex items-start justify-between gap-2">
 <div>
 <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/45 sm:text-[10px]">
 {eyebrow}
 </p>
 <p className="mt-1 font-sans text-[13px] font-semibold text-white sm:text-sm">{title}</p>
 </div>
 <p className="font-sans text-lg font-semibold tabular-nums tracking-tight text-white sm:text-xl">
 {value}
 <span className="text-sm text-white/55">{suffix}</span>
 </p>
 </div>
 );
}

function HiringBars({ active, reduce }) {
 return (
 <div className="mt-auto flex h-[4.75rem] items-end justify-between gap-1 px-0.5 sm:h-[5.25rem] sm:gap-1.5">
 {BARS.map((bar, i) => {
 const h = active ? bar.hover : bar.idle;
 return (
 <motion.div
 key={i}
 className="relative w-full overflow-hidden rounded-full"
 style={{ background: "rgba(255,255,255,0.08)" }}
 animate={
 reduce
 ? { height: `${h}%` }
 : {
 height: [`${bar.idle - 6}%`, `${h}%`, `${bar.idle - 4}%`, `${h}%`],
 }
 }
 transition={
 reduce
 ? { duration: 0.45, ease }
 : {
 duration: active ? 2.2 : 3.6 + i * 0.18,
 repeat: Infinity,
 ease: "easeInOut",
 delay: i * 0.12,
 }
 }
 >
 <div
 className="absolute inset-0 rounded-full"
 style={{
 background: `linear-gradient(180deg, ${TEAL} 0%, ${TEAL}88 55%, rgba(255,255,255,0.25) 100%)`,
 }}
 />
 </motion.div>
 );
 })}
 </div>
 );
}

function RetentionRing({ active, reduce, centerValue, centerLabel }) {
 const r = 42;
 const c = 2 * Math.PI * r;
 const pct = active ? 0.94 : 0.86;
 const offset = c * (1 - pct);

 return (
 <div className="relative mx-auto mt-auto flex aspect-square w-[58%] max-w-[6.5rem] items-center justify-center sm:max-w-[7.25rem]">
 <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
 <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="7" />
 <motion.circle
 cx="50"
 cy="50"
 r={r}
 fill="none"
 stroke={TEAL}
 strokeWidth="7"
 strokeLinecap="round"
 strokeDasharray={c}
 animate={
 reduce
 ? { strokeDashoffset: offset }
 : {
 strokeDashoffset: [c * 0.22, offset, c * 0.18, offset],
 }
 }
 transition={
 reduce
 ? { duration: 0.5 }
 : { duration: active ? 2.4 : 4.2, repeat: Infinity, ease: "easeInOut" }
 }
 />
 </svg>
 <div className="absolute inset-0 flex flex-col items-center justify-center px-2 text-center">
 <motion.span
 className="font-sans text-xl font-semibold tabular-nums text-white sm:text-2xl"
 animate={reduce ? undefined : { scale: active ? [1, 1.04, 1] : [1, 1.02, 1] }}
 transition={{ duration: active ? 1.6 : 3.2, repeat: Infinity, ease: "easeInOut" }}
 >
 {centerValue}
 </motion.span>
 <span className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-white/40">
 {centerLabel}
 </span>
 </div>
 {!reduce && (
 <motion.div
 className="pointer-events-none absolute inset-0"
 animate={{ rotate: 360 }}
 transition={{ duration: active ? 4 : 8, repeat: Infinity, ease: "linear" }}
 aria-hidden
 >
 <span
 className="absolute left-1/2 top-[8%] h-2 w-2 -translate-x-1/2 rounded-full"
 style={{ background: TEAL, boxShadow: `0 0 12px ${TEAL}` }}
 />
 </motion.div>
 )}
 </div>
 );
}

function EngagementLine({ active, reduce, stepLabels }) {
 const boost = active ? 10 : 0;
 const d = linePath(boost);
 const area = `${d} L 100 100 L 0 100 Z`;
 const labels = stepLabels?.length ? stepLabels : APPROACH_STEPS;

 return (
 <div className="relative mt-auto h-[4.75rem] w-full sm:h-[5.25rem]">
 <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full overflow-visible">
 <defs>
 <linearGradient id="heroLineFill" x1="0" y1="0" x2="0" y2="1">
 <stop offset="0%" stopColor={TEAL} stopOpacity="0.45" />
 <stop offset="100%" stopColor={TEAL} stopOpacity="0" />
 </linearGradient>
 </defs>
 <motion.path
 d={area}
 fill="url(#heroLineFill)"
 animate={reduce ? undefined : { opacity: [0.55, 0.85, 0.55] }}
 transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
 />
 <motion.path
 d={d}
 fill="none"
 stroke={TEAL}
 strokeWidth="2.2"
 strokeLinecap="round"
 strokeLinejoin="round"
 vectorEffect="non-scaling-stroke"
 initial={false}
 animate={{ d }}
 transition={{ duration: 0.55, ease }}
 />
 {!reduce &&
 LINE_POINTS.map(([x, y], i) => (
 <motion.circle
 key={i}
 cx={x}
 cy={Math.max(8, y - boost * (0.4 + i * 0.08))}
 r={active && i === LINE_POINTS.length - 1 ? 2.8 : 1.8}
 fill="#fff"
 animate={{
 opacity: [0.4, 1, 0.4],
 cy: Math.max(8, y - boost * (0.4 + i * 0.08)),
 }}
 transition={{
 opacity: { duration: 2 + i * 0.2, repeat: Infinity, ease: "easeInOut" },
 cy: { duration: 0.55, ease },
 }}
 />
 ))}
 </svg>
 <div
 className="absolute bottom-1 left-0 right-0 flex justify-between px-0.5 text-[8px] font-semibold uppercase tracking-wider text-white/35"
 aria-hidden
 >
 {labels.slice(0, 4).map((label) => (
 <span key={label}>{label}</span>
 ))}
 </div>
 </div>
 );
}

const PAGAR_STATS = ["PF", "ESIC", "PT", "LWF"];
const PAGAR_ROWS = ["Attendance", "Payroll", "Compliance"];
const CARD_H = "h-full min-h-[13.5rem] sm:min-h-[14.5rem] lg:min-h-[15.5rem]";

function PayrollPulse({ active, reduce, stepLabel }) {
 return (
 <div className="mt-auto flex flex-col gap-2">
 <div className="flex gap-1.5">
 {PAGAR_STATS.map((stat, i) => (
 <motion.span
 key={stat}
 className="flex-1 rounded-lg border border-white/10 bg-white/[0.06] py-1.5 text-center text-[9px] font-semibold uppercase tracking-wider text-white/70 sm:text-[10px]"
 animate={
 reduce
 ? undefined
 : {
 borderColor:
 active && i === stepLabel
 ? ["rgba(255,255,255,0.1)", "rgba(20,196,173,0.55)", "rgba(255,255,255,0.1)"]
 : "rgba(255,255,255,0.1)",
 backgroundColor:
 active && i === stepLabel
 ? ["rgba(255,255,255,0.06)", "rgba(20,196,173,0.2)", "rgba(255,255,255,0.06)"]
 : "rgba(255,255,255,0.06)",
 }
 }
 transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
 >
 {stat}
 </motion.span>
 ))}
 </div>
 <div className="space-y-1.5">
 {PAGAR_ROWS.map((row, i) => (
 <div key={row} className="flex items-center gap-2">
 <motion.span
 className="h-1.5 flex-1 origin-left rounded-full bg-white/15"
 animate={
 reduce
 ? undefined
 : { scaleX: active ? [0.45, 1, 0.7, 1] : [0.55, 0.85, 0.55] }
 }
 transition={{
 duration: active ? 2.2 : 3.4,
 repeat: Infinity,
 ease: "easeInOut",
 delay: i * 0.2,
 }}
 style={{ background: `linear-gradient(90deg, ${TEAL}, rgba(255,255,255,0.25))` }}
 />
 <span className="w-[4.5rem] shrink-0 text-right text-[9px] font-medium text-white/40">
 {row}
 </span>
 </div>
 ))}
 </div>
 </div>
 );
}

function useCycle(items, intervalMs, enabled) {
 const [index, setIndex] = useState(0);

 useEffect(() => {
 if (!enabled || items.length < 2) return undefined;
 const id = window.setInterval(() => {
 setIndex((i) => (i + 1) % items.length);
 }, intervalMs);
 return () => window.clearInterval(id);
 }, [enabled, items, intervalMs]);

 return { value: items[index] ?? items[0], index };
}

function floatAnim(reduce, delay = 0) {
 if (reduce) return undefined;
 return {
 y: [0, -6, 0],
 transition: { duration: 5.6 + delay, repeat: Infinity, ease: "easeInOut", delay },
 };
}

export default function HeroLiveCards() {
 const reduce = useReducedMotion();
 const [hover, setHover] = useState(null);

 const onDemand = models[0];
 const retainership = models[1];
 const strategic = models[2];
 const pagar = models[3] ?? {
 title: "Payroll Outsourcing",
 desc: "Payroll outsourcing and statutory compliance for growing businesses.",
 path: "/pagar",
 };

 const { value: durationValue } = useCycle(
 ON_DEMAND_VALUES,
 hover === 0 ? 900 : 1800,
 !reduce
 );
 const { value: approachStep } = useCycle(
 APPROACH_STEPS,
 hover === 2 ? 1000 : 2200,
 !reduce
 );
 const { index: pagarStat } = useCycle(PAGAR_STATS, hover === 3 ? 900 : 1800, !reduce);
 const approachLabels = homeContent.philosophy.principles.map((p) => p.title);

 const cards = [
 {
 key: "on-demand",
 delay: 0.2,
 floatDelay: 0,
 model: onDemand,
 path: onDemand.path || "/services/on-demand-hr",
 value: reduce ? ON_DEMAND_VALUES[0] : durationValue,
 body: `${ON_DEMAND_VALUES.join(" · ")}. ${shortSubtitle(onDemand.desc, 42)}`,
 visual: <HiringBars active={hover === 0} reduce={reduce} />,
 },
 {
 key: "retainership",
 delay: 0.28,
 floatDelay: 0.35,
 model: retainership,
 path: retainership.path || "/services/hr-retainership",
 value: "HR",
 body: shortSubtitle(retainership.desc, 52),
 visual: (
 <RetentionRing
 active={hover === 1}
 reduce={reduce}
 centerValue="HR"
 centerLabel={homeContent.philosophy.principles[0]?.title ?? "Partner"}
 />
 ),
 },
 {
 key: "strategic",
 delay: 0.36,
 floatDelay: 0.55,
 model: strategic,
 path: strategic.path || "/services/strategic-consulting",
 value: reduce ? APPROACH_STEPS[0] : approachStep,
 body: shortSubtitle(strategic.desc, 52),
 visual: (
 <EngagementLine
 active={hover === 2}
 reduce={reduce}
 stepLabels={approachLabels}
 />
 ),
 },
 {
 key: "pagar",
 delay: 0.44,
 floatDelay: 0.75,
 model: pagar,
 path: pagar.path || "/pagar",
 value: reduce ? PAGAR_STATS[0] : PAGAR_STATS[pagarStat],
 body: shortSubtitle(pagar.desc, 52),
 visual: <PayrollPulse active={hover === 3} reduce={reduce} stepLabel={pagarStat} />,
 },
 ];

 return (
 <div className="relative mx-auto w-full max-w-lg lg:mx-0 lg:max-w-none">
 <div
 className="pointer-events-none absolute -inset-6 rounded-[2.5rem] opacity-70 blur-3xl sm:-inset-8"
 style={{ background: `radial-gradient(circle at 60% 40%, ${TEAL}33, transparent 65%)` }}
 aria-hidden
 />

 <div className="relative grid grid-cols-2 grid-rows-2 gap-2.5 sm:gap-3 lg:gap-3.5 [grid-auto-rows:1fr]">
 {cards.map((card, i) => (
 <motion.div
 key={card.key}
 animate={floatAnim(reduce, card.floatDelay)}
 className="flex min-h-0"
 >
 <GlassCard
 delay={card.delay}
 reduce={reduce}
 hovered={hover === i}
 onHover={(v) => setHover(v ? i : null)}
 to={card.path}
 label={`Explore ${card.model.title}`}
 className={`w-full ${CARD_H}`}
 >
 <CardLabel
 eyebrow={homeContent.howWeHelp.eyebrow}
 title={card.model.title}
 value={card.value}
 />
 <p className="mb-2 line-clamp-2 text-[10px] leading-snug text-white/45">
 {card.body}
 </p>
 {card.visual}
 </GlassCard>
 </motion.div>
 ))}
 </div>
 </div>
 );
}
