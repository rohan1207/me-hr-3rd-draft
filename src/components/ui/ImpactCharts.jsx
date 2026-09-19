"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { homeContent, caseStudies, hrCapabilities } from "../../data/content";

const ease = [0.22, 1, 0.36, 1];

function truncate(text, max = 96) {
 if (!text) return "";
 if (text.length <= max) return text;
 const cut = text.slice(0, max);
 const lastSpace = cut.lastIndexOf(" ");
 return `${cut.slice(0, lastSpace > 40 ? lastSpace : max).trim()}…`;
}

const studiesWithOutcomes = caseStudies.filter((cs) => cs.outcome);

/** Chart 1, Case study outcomes from master */
function OutcomeBars({ active }) {
 const rows = studiesWithOutcomes.slice(0, 4);

 return (
 <div className="flex h-full flex-col">
 <div className="mb-3 sm:mb-4">
 <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/45">
 {homeContent.impact.eyebrow}
 </p>
 <h3 className="mt-1 font-sans text-base font-semibold text-white sm:text-lg">
 {truncate(homeContent.impact.title, 56)}
 </h3>
 </div>

 <div className="flex flex-1 flex-col justify-center gap-3 sm:gap-3.5">
 {rows.map((row, i) => {
 const fill = 55 + ((i * 13) % 35);
 return (
 <div key={row.id}>
 <div className="mb-1 flex items-baseline justify-between gap-2">
 <span className="text-[11px] font-semibold text-white sm:text-xs">
 {truncate(row.title, 52)}
 </span>
 <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wide text-white/45 sm:text-[11px]">
 {row.tags?.[0] || row.industry}
 </span>
 </div>
 <div className="mb-1.5 h-2 overflow-hidden rounded-full bg-white/10">
 <motion.div
 className="h-full rounded-full bg-white"
 initial={{ width: 0 }}
 animate={{ width: active ? `${fill}%` : 0 }}
 transition={{ duration: 0.95, delay: 0.08 + i * 0.1, ease }}
 />
 </div>
 <p className="text-[10px] leading-snug text-white/55 sm:text-[11px]">
 {truncate(row.outcome, 100)}
 </p>
 </div>
 );
 })}
 </div>
 </div>
 );
}

/** Chart 2, Case study challenge → outcome (no invented metrics) */
function CaseStudyBars({ active }) {
 const studies = studiesWithOutcomes.slice(0, 4);
 const featured = studies[1] || studies[0];

 return (
 <div className="flex h-full flex-col">
 <div className="mb-3 flex items-start justify-between gap-2 sm:mb-4">
 <div>
 <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/45">
 {featured?.industry}
 </p>
 <h3 className="mt-1 font-sans text-base font-semibold text-white sm:text-lg">
 {truncate(featured?.title, 56)}
 </h3>
 <p className="mt-1 text-[11px] text-white/55 sm:text-xs">
 {truncate(featured?.outcome, 100)}
 </p>
 </div>
 </div>

 <div className="relative mt-auto flex h-[150px] items-end gap-2 sm:h-[180px] sm:gap-3">
 <div className="pointer-events-none absolute inset-x-0 top-0 flex h-[calc(100%-2.5rem)] flex-col justify-between">
 {[100, 50, 0].map((g) => (
 <div key={g} className="h-px w-full bg-white/10" />
 ))}
 </div>

 {studies.map((m, i) => {
 const height = 48 + ((i * 17) % 40);
 return (
 <div
 key={m.id}
 className="relative z-10 flex h-full flex-1 flex-col items-center justify-end"
 >
 <div className="flex w-full flex-1 items-end justify-center pb-8">
 <motion.div
 className="w-[70%] max-w-[36px] rounded-t-md bg-white sm:max-w-[44px]"
 title={m.outcome}
 initial={{ height: 0 }}
 animate={{ height: active ? `${height}%` : 0 }}
 transition={{ duration: 1.05, delay: 0.12 + i * 0.08, ease }}
 />
 </div>
 <span className="absolute bottom-0 line-clamp-2 max-w-full px-0.5 text-center text-[9px] font-semibold leading-tight text-white/55 sm:text-[10px]">
 {m.tags?.[0] || m.industry}
 </span>
 </div>
 );
 })}
 </div>
 </div>
 );
}

/** Chart 3, HR capability focus from master (equal decorative slices, no fake %) */
function FocusMix({ active }) {
 const slices = hrCapabilities.slice(0, 4).map((cap, i) => ({
 label: cap.title,
 desc: cap.desc,
 color: ["#FFFFFF", "#D1D5DB", "#9CA3AF", "#6B7280"][i],
 }));

 const r = 58;
 const cx = 72;
 const cy = 72;
 const circumference = 2 * Math.PI * r;
 const equal = circumference / slices.length;

 let cumulative = 0;
 const arcs = slices.map((slice) => {
 const item = { ...slice, len: equal, offset: cumulative };
 cumulative += equal;
 return item;
 });

 const [activeSlice, setActiveSlice] = useState(0);

 useEffect(() => {
 if (!active) return undefined;
 const id = setInterval(() => {
 setActiveSlice((i) => (i + 1) % slices.length);
 }, 2200);
 return () => clearInterval(id);
 }, [active, slices.length]);

 const current = slices[activeSlice];

 return (
 <div className="flex h-full flex-col">
 <div className="mb-3 sm:mb-4">
 <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/45">
 {homeContent.capabilities.eyebrow}
 </p>
 <h3 className="mt-1 font-sans text-base font-semibold text-white sm:text-lg">
 {truncate(homeContent.capabilities.title, 64)}
 </h3>
 <p className="mt-1 text-[11px] text-white/55 sm:text-xs">
 {truncate(current?.desc, 100)}
 </p>
 </div>

 <div className="flex flex-1 flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-5">
 <div className="relative shrink-0">
 <svg viewBox="0 0 144 144" className="h-32 w-32 sm:h-36 sm:w-36">
 <circle
 cx={cx}
 cy={cy}
 r={r}
 fill="none"
 stroke="rgba(255,255,255,0.1)"
 strokeWidth="18"
 />
 {arcs.map((arc, i) => (
 <motion.circle
 key={`${arc.label}-${active}`}
 cx={cx}
 cy={cy}
 r={r}
 fill="none"
 stroke={arc.color}
 strokeWidth={activeSlice === i ? 22 : 18}
 strokeDashoffset={-arc.offset}
 transform={`rotate(-90 ${cx} ${cy})`}
 initial={{ strokeDasharray: `0 ${circumference}` }}
 animate={{
 strokeDasharray: active
 ? `${arc.len} ${circumference}`
 : `0 ${circumference}`,
 }}
 transition={{
 duration: 1.2,
 delay: 0.08 * i,
 ease,
 }}
 onHoverStart={() => setActiveSlice(i)}
 style={{ cursor: "pointer" }}
 />
 ))}
 </svg>
 <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-3">
 <p className="max-w-[88px] text-center font-sans text-[11px] font-semibold leading-snug text-white sm:text-xs">
 {current?.label}
 </p>
 </div>
 </div>

 <ul className="w-full space-y-1.5">
 {slices.map((s, i) => (
 <li key={s.label}>
 <button
 type="button"
 onMouseEnter={() => setActiveSlice(i)}
 onFocus={() => setActiveSlice(i)}
 className={`flex w-full items-center justify-between rounded-xl px-2.5 py-1.5 text-left transition ${
 activeSlice === i ? "bg-white/10" : "hover:bg-white/5"
 }`}
 >
 <span className="flex items-center gap-2 text-xs font-semibold text-white sm:text-[13px]">
 <span
 className="h-2 w-2 shrink-0 rounded-full"
 style={{ background: s.color }}
 />
 <span className="line-clamp-1">{s.label}</span>
 </span>
 <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wide text-white/45">
 {String(i + 1).padStart(2, "0")}
 </span>
 </button>
 </li>
 ))}
 </ul>
 </div>
 </div>
 );
}

export default function ImpactCharts() {
 const ref = useRef(null);
 const inView = useInView(ref, { once: true, margin: "-10% 0px" });
 const [token, setToken] = useState(0);
 const [isActive, setIsActive] = useState(false);
 const impact = homeContent.impact;

 useEffect(() => {
 if (inView) setIsActive(true);
 }, [inView]);

 const replay = () => {
 setIsActive(false);
 window.setTimeout(() => {
 setToken((t) => t + 1);
 setIsActive(true);
 }, 40);
 };

 const cards = [
 { Comp: OutcomeBars, id: "outcomes", span: "col-span-1 sm:col-span-1" },
 { Comp: CaseStudyBars, id: "case-studies", span: "col-span-1 sm:col-span-1" },
 { Comp: FocusMix, id: "focus", span: "col-span-1 sm:col-span-2 lg:col-span-1" },
 ];

 return (
 <section className="relative overflow-hidden bg-white py-8 text-mehr-ink sm:py-10 lg:py-12">
 <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_15%_20%,rgba(31,41,55,0.04),transparent_55%)]" />

 <div className="relative z-10 page-gutter mx-auto w-full max-w-[1680px] sm:px-3 md:px-4 lg:px-5" ref={ref}>
 <div className="mb-6 flex flex-col justify-between gap-4 sm:mb-8 lg:flex-row lg:items-end">
 <SectionHeading
 eyebrow={impact.eyebrow}
 title={impact.title}
 body={impact.body}
 />
 <button
 type="button"
 onClick={replay}
 className="inline-flex w-fit items-center rounded-full border border-mehr-deep/20 px-4 py-2 text-xs font-semibold text-mehr-deep transition hover:border-mehr-deep hover:bg-mehr-panel sm:px-5 sm:py-2.5 sm:text-sm"
 >
 Replay animations
 </button>
 </div>

 <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3 lg:gap-4" key={token}>
 {cards.map(({ Comp, id, span }, i) => (
 <motion.div
 key={id}
 initial={{ opacity: 0, y: 28 }}
 animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
 transition={{
 duration: 0.6,
 delay: 0.06 + i * 0.1,
 ease,
 }}
 className={`${span} min-h-[220px] rounded-[1.25rem] bg-mehr-deep p-4 text-white shadow-float sm:min-h-0 sm:rounded-[1.5rem] sm:p-5 lg:rounded-[1.75rem] lg:p-6`}
 >
 <Comp active={isActive} />
 </motion.div>
 ))}
 </div>
 </div>
 </section>
 );
}
