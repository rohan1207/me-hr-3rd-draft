"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
 BarChart3,
 BookOpen,
 ClipboardList,
 FileText,
 Layers,
 LineChart,
 UserPlus,
 Users,
} from "lucide-react";
import { hrCapabilities } from "../../data/content";
import Reveal, { RevealItem, RevealStagger } from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";

const ease = [0.22, 1, 0.36, 1];

const meta = {
 recruitment: { Icon: UserPlus, Visual: RecruitLive },
 policies: { Icon: FileText, Visual: PolicyLive },
 performance: { Icon: BarChart3, Visual: PerformanceLive },
 lifecycle: { Icon: Users, Visual: LifecycleLive },
 learning: { Icon: BookOpen, Visual: LearningLive },
 engagement: { Icon: Users, Visual: EngagementLive },
 hrms: { Icon: Layers, Visual: HrmsLive },
 analytics: { Icon: LineChart, Visual: AnalyticsLive },
 audit: { Icon: ClipboardList, Visual: AuditLive },
};

/** Candidates enter the pipeline, one settles as hired */
function RecruitLive({ hovered, reduce }) {
 return (
 <div className="relative flex h-[6.5rem] items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-mehr-teal-soft/90 to-white px-3">
 <div className="absolute inset-x-5 top-[58%] h-px bg-mehr-deep/10" aria-hidden />
 {[0, 1, 2].map((i) => {
 const x = 18 + i * 28;
 return (
 <motion.div
 key={i}
 className="absolute flex flex-col items-center"
 style={{ left: `${x}%`, top: "22%" }}
 animate={
 reduce
 ? undefined
 : {
 y: [6, 0, 0, 6],
 opacity: [0.35, 1, 1, 0.45],
 }
 }
 transition={{
 duration: hovered ? 2.4 : 3.8,
 repeat: Infinity,
 ease: "easeInOut",
 delay: i * 0.45,
 }}
 >
 <span
 className={`flex h-9 w-9 items-center justify-center rounded-full border bg-white shadow-soft ${
 i === 1 ? "border-mehr-deep text-mehr-deep" : "border-mehr-deep/10 text-mehr-deep/70"
 }`}
 >
 <UserPlus size={14} strokeWidth={2} />
 </span>
 {i === 1 && (
 <motion.span
 className="mt-1 rounded-full bg-mehr-deep px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wide text-white"
 animate={reduce ? undefined : { opacity: [0.5, 1, 1, 0.5] }}
 transition={{ duration: hovered ? 2.4 : 3.8, repeat: Infinity, ease: "easeInOut" }}
 >
 Join
 </motion.span>
 )}
 </motion.div>
 );
 })}
 </div>
 );
}

/** Policy pages stack and settle into a tidy pack */
function PolicyLive({ hovered, reduce }) {
 return (
 <div className="relative flex h-[6.5rem] items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-mehr-panel to-white">
 {[0, 1, 2].map((i) => (
 <motion.div
 key={i}
 className="absolute w-[3.4rem] overflow-hidden rounded-md border border-mehr-deep/10 bg-white shadow-soft"
 style={{ height: "3.1rem" }}
 animate={
 reduce
 ? { x: (i - 1) * 10, y: (1 - i) * 4, rotate: (i - 1) * 4 }
 : {
 x: [(i - 1) * 18, (i - 1) * 8, (i - 1) * 8],
 y: [(1 - i) * 8, (1 - i) * 3, (1 - i) * 3],
 rotate: [(i - 1) * 8, (i - 1) * 3, (i - 1) * 3],
 }
 }
 transition={{
 duration: hovered ? 2.2 : 3.6,
 repeat: Infinity,
 ease: "easeInOut",
 delay: i * 0.08,
 }}
 >
 <div className="space-y-1 px-2 py-2">
 <div className="h-1 w-[70%] rounded-full bg-mehr-deep/35" />
 <div className="h-1 w-full rounded-full bg-mehr-deep/15" />
 <div className="h-1 w-[55%] rounded-full bg-mehr-deep/15" />
 </div>
 </motion.div>
 ))}
 </div>
 );
}

/** Review scores climb into a clear performance pattern */
function PerformanceLive({ hovered, reduce }) {
 const targets = [36, 52, 44, 70, 58];
 return (
 <div className="relative flex h-[6.5rem] items-end justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-b from-mehr-teal-soft/70 to-white px-5 pb-3.5 pt-3">
 {targets.map((h, i) => (
 <div key={i} className="relative flex h-full w-3 items-end sm:w-3.5">
 <motion.div
 className="w-full rounded-t-[5px] bg-mehr-deep"
 initial={false}
 animate={
 reduce
 ? { height: `${h}%` }
 : {
 height: [`${Math.max(18, h - 22)}%`, `${h}%`, `${h - 6}%`, `${h}%`],
 }
 }
 transition={{
 duration: hovered ? 1.8 : 3.2,
 repeat: Infinity,
 ease: ease,
 delay: i * 0.12,
 }}
 />
 </div>
 ))}
 <motion.div
 aria-hidden
 className="pointer-events-none absolute inset-x-4 top-3 h-px bg-mehr-deep/10"
 animate={reduce ? undefined : { opacity: [0.3, 0.7, 0.3] }}
 transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
 />
 </div>
 );
}

/** Employee moves through join → grow → exit */
function LifecycleLive({ hovered, reduce }) {
 const stages = ["Join", "Grow", "Exit"];
 const [stage, setStage] = useState(0);

 useEffect(() => {
 if (reduce) return undefined;
 const id = window.setInterval(
 () => setStage((s) => (s + 1) % stages.length),
 hovered ? 900 : 1400
 );
 return () => window.clearInterval(id);
 }, [hovered, reduce, stages.length]);

 return (
 <div className="relative flex h-[6.5rem] flex-col items-center justify-center gap-2.5 overflow-hidden rounded-2xl bg-gradient-to-b from-mehr-panel to-white px-4">
 <div className="relative flex w-full max-w-[11rem] items-center justify-between">
 {stages.map((label, i) => (
 <div key={label} className="relative z-10 flex flex-col items-center gap-1">
 <motion.span
 className={`h-2.5 w-2.5 rounded-full ${
 i <= stage ? "bg-mehr-deep" : "bg-mehr-deep/20"
 }`}
 animate={reduce ? undefined : { scale: i === stage ? [1, 1.35, 1] : 1 }}
 transition={{ duration: 0.45, ease }}
 />
 <span
 className={`text-[9px] font-semibold tracking-wide ${
 i === stage ? "text-mehr-deep" : "text-mehr-muted"
 }`}
 >
 {label}
 </span>
 </div>
 ))}
 <div className="absolute left-2 right-2 top-[5px] z-0 h-px bg-mehr-deep/15" aria-hidden />
 <motion.div
 className="absolute left-2 top-[5px] z-0 h-px origin-left bg-mehr-deep"
 animate={{ scaleX: (stage + 1) / stages.length }}
 transition={{ duration: 0.45, ease }}
 style={{ width: "calc(100% - 1rem)" }}
 />
 </div>
 </div>
 );
}

/** Learning progress ring + skill tick */
function LearningLive({ hovered, reduce }) {
 const r = 20;
 const c = 2 * Math.PI * r;
 return (
 <div className="relative flex h-[6.5rem] items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-b from-mehr-teal-soft to-white px-4">
 <div className="relative flex h-14 w-14 items-center justify-center">
 <svg viewBox="0 0 52 52" className="absolute inset-0 h-full w-full -rotate-90">
 <circle cx="26" cy="26" r={r} fill="none" stroke="rgba(11,95,88,0.14)" strokeWidth="3.5" />
 <motion.circle
 cx="26"
 cy="26"
 r={r}
 fill="none"
 stroke="#0b5f58"
 strokeWidth="3.5"
 strokeLinecap="round"
 strokeDasharray={c}
 animate={
 reduce
 ? { strokeDashoffset: c * 0.28 }
 : {
 strokeDashoffset: [c * 0.82, c * 0.22, c * 0.22, c * 0.82],
 }
 }
 transition={{ duration: hovered ? 2.6 : 4.2, repeat: Infinity, ease: "easeInOut" }}
 />
 </svg>
 <BookOpen size={15} className="relative text-mehr-deep" strokeWidth={2} />
 </div>
 <div className="space-y-1.5">
 {["Skill", "Practice", "Apply"].map((label, i) => (
 <motion.div
 key={label}
 className="flex items-center gap-1.5"
 animate={
 reduce
 ? undefined
 : { opacity: [0.35, 1, 1, 0.35], x: [2, 0, 0, 2] }
 }
 transition={{
 duration: hovered ? 2.6 : 4.2,
 repeat: Infinity,
 ease: "easeInOut",
 delay: i * 0.2,
 }}
 >
 <span className="h-1.5 w-1.5 rounded-full bg-mehr-deep" />
 <span className="text-[10px] font-semibold text-mehr-ink">{label}</span>
 </motion.div>
 ))}
 </div>
 </div>
 );
}

/** Recognition / pulse of engagement */
function EngagementLive({ hovered, reduce }) {
 return (
 <div className="relative flex h-[6.5rem] items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-mehr-panel to-white">
 <motion.div
 className="absolute h-16 w-16 rounded-full border border-mehr-deep/15"
 animate={reduce ? undefined : { scale: [1, 1.35, 1], opacity: [0.55, 0.1, 0.55] }}
 transition={{ duration: hovered ? 1.8 : 2.8, repeat: Infinity, ease: "easeInOut" }}
 />
 <motion.div
 className="absolute h-10 w-10 rounded-full border border-mehr-deep/25"
 animate={reduce ? undefined : { scale: [1, 1.25, 1], opacity: [0.7, 0.15, 0.7] }}
 transition={{
 duration: hovered ? 1.8 : 2.8,
 repeat: Infinity,
 ease: "easeInOut",
 delay: 0.2,
 }}
 />
 <motion.div
 className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full bg-mehr-deep text-white shadow-float"
 animate={reduce ? undefined : { scale: [1, 1.06, 1] }}
 transition={{ duration: hovered ? 1.8 : 2.8, repeat: Infinity, ease: "easeInOut" }}
 >
 <Users size={16} strokeWidth={2} />
 </motion.div>
 </div>
 );
}

/** Attendance / records nodes sync across the system */
function HrmsLive({ hovered, reduce }) {
 const [active, setActive] = useState(0);
 useEffect(() => {
 if (reduce) return undefined;
 const id = window.setInterval(
 () => setActive((v) => (v + 1) % 3),
 hovered ? 700 : 1100
 );
 return () => window.clearInterval(id);
 }, [hovered, reduce]);

 const labels = ["Leave", "Attend", "Files"];

 return (
 <div className="relative flex h-[6.5rem] items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-mehr-teal-soft/80 to-white px-3">
 <div className="flex items-end gap-2.5">
 {labels.map((label, i) => {
 const on = active === i;
 return (
 <motion.div
 key={label}
 className="flex flex-col items-center gap-1"
 animate={{ y: on ? -4 : 0 }}
 transition={{ duration: 0.35, ease }}
 >
 <span
 className={`flex h-9 w-9 items-center justify-center rounded-xl border shadow-soft transition-colors ${
 on
 ? "border-mehr-deep bg-mehr-deep text-white"
 : "border-mehr-deep/10 bg-white text-mehr-deep"
 }`}
 >
 <Layers size={14} strokeWidth={2} />
 </span>
 <span
 className={`text-[9px] font-semibold ${
 on ? "text-mehr-deep" : "text-mehr-muted"
 }`}
 >
 {label}
 </span>
 </motion.div>
 );
 })}
 </div>
 </div>
 );
}

/** Insight line draws toward a decision point */
function AnalyticsLive({ hovered, reduce }) {
 return (
 <div className="relative flex h-[6.5rem] items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-mehr-panel to-white px-3">
 <svg viewBox="0 0 120 56" className="h-[3.25rem] w-[88%]" aria-hidden>
 <defs>
 <linearGradient id="cap-spark-fill" x1="0" y1="0" x2="0" y2="1">
 <stop offset="0%" stopColor="#14c4ad" stopOpacity="0.28" />
 <stop offset="100%" stopColor="#14c4ad" stopOpacity="0" />
 </linearGradient>
 </defs>
 <motion.path
 d="M4 42 L28 36 L48 40 L72 22 L96 26 L116 10 L116 56 L4 56 Z"
 fill="url(#cap-spark-fill)"
 animate={reduce ? undefined : { opacity: [0.35, 0.75, 0.35] }}
 transition={{ duration: hovered ? 2 : 3.4, repeat: Infinity, ease: "easeInOut" }}
 />
 <motion.path
 d="M4 42 L28 36 L48 40 L72 22 L96 26 L116 10"
 fill="none"
 stroke="#0b5f58"
 strokeWidth="2.4"
 strokeLinecap="round"
 strokeLinejoin="round"
 animate={
 reduce
 ? undefined
 : { pathLength: [0, 1, 1, 0], opacity: [0.4, 1, 1, 0.4] }
 }
 transition={{ duration: hovered ? 2.8 : 4.2, repeat: Infinity, ease: "easeInOut" }}
 />
 <motion.circle
 cx="116"
 cy="10"
 r="3.2"
 fill="#0b5f58"
 animate={reduce ? undefined : { scale: [1, 1.35, 1] }}
 transition={{ duration: hovered ? 1.4 : 2, repeat: Infinity, ease: "easeInOut" }}
 />
 </svg>
 </div>
 );
}

/** Diagnostic checks complete in sequence */
function AuditLive({ hovered, reduce }) {
 const [done, setDone] = useState(0);
 useEffect(() => {
 if (reduce) return undefined;
 const id = window.setInterval(
 () => setDone((v) => (v + 1) % 4),
 hovered ? 550 : 900
 );
 return () => window.clearInterval(id);
 }, [hovered, reduce]);

 const rows = ["Process", "Gaps", "Risks"];

 return (
 <div className="relative flex h-[6.5rem] flex-col justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-b from-mehr-panel to-white px-4">
 {rows.map((label, i) => {
 const on = i < done;
 return (
 <div key={label} className="flex items-center gap-2.5">
 <motion.span
 className={`flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold ${
 on ? "bg-mehr-deep text-white" : "bg-mehr-deep/12 text-transparent"
 }`}
 animate={reduce ? undefined : { scale: i === done - 1 ? [1, 1.2, 1] : 1 }}
 transition={{ duration: 0.35 }}
 >
 ✓
 </motion.span>
 <span className="text-[10px] font-semibold text-mehr-ink">{label}</span>
 <span className="h-px flex-1 bg-mehr-deep/10" />
 </div>
 );
 })}
 </div>
 );
}

function CapabilityCard({ item, index }) {
 const reduce = useReducedMotion();
 const [hovered, setHovered] = useState(false);
 const cfg = meta[item.id] || meta.policies;
 const Visual = cfg.Visual;
 const Icon = cfg.Icon;

 return (
 <motion.div
 initial={reduce ? false : { opacity: 0, y: 14 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "-6%" }}
 transition={{ duration: 0.45, delay: 0.04 * index, ease }}
 onMouseEnter={() => setHovered(true)}
 onMouseLeave={() => setHovered(false)}
 className="group flex h-full flex-col overflow-hidden rounded-[1.4rem] border border-mehr-deep/8 bg-white p-4 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-mehr-deep/18 hover:shadow-float sm:rounded-[1.6rem] sm:p-5"
 >
 <Visual hovered={hovered} reduce={reduce} />

 <div className="mt-4 flex min-h-0 flex-1 flex-col">
 <div className="flex items-center gap-2.5">
 <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-mehr-teal-soft text-mehr-deep transition group-hover:bg-mehr-deep group-hover:text-white">
 <Icon size={14} strokeWidth={2} />
 </span>
 <span className="font-sans text-[10px] font-semibold tabular-nums tracking-wide text-mehr-muted">
 {String(index + 1).padStart(2, "0")}
 </span>
 </div>
 <h3 className="mt-2.5 font-sans text-[15px] font-semibold leading-snug tracking-tight text-mehr-ink sm:text-base">
 {item.title}
 </h3>
 <p className="mt-1.5 line-clamp-3 text-[13px] leading-relaxed text-mehr-mist sm:text-sm">
 {item.desc}
 </p>
 </div>
 </motion.div>
 );
}

export default function CapabilitiesGrid({ eyebrow, title, includeAudit = true, limit }) {
 const items = includeAudit
 ? hrCapabilities
 : hrCapabilities.filter((c) => c.id !== "audit");
 const display = limit ? items.slice(0, limit) : items;

 const cols = 4;
 const remainder = display.length % cols;
 const mainCount = remainder === 0 ? display.length : display.length - remainder;
 const main = display.slice(0, mainCount);
 const tail = display.slice(mainCount);

 return (
 <section className="section-pad surface-panel surface-wash">
 <div className="container-mehr page-gutter relative z-10 sm:px-3 md:px-4 lg:px-5">
 <SectionHeading eyebrow={eyebrow} title={title} />

 <div className="mt-8">
 <RevealStagger
 className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:gap-5"
 stagger={0.04}
 >
 {main.map((item, i) => (
 <RevealItem key={item.id} className="min-w-0">
 <CapabilityCard item={item} index={i} />
 </RevealItem>
 ))}
 </RevealStagger>

 {tail.length > 0 && (
 <div className="mt-5 flex flex-wrap justify-center gap-5">
 {tail.map((item, i) => (
 <div
 key={item.id}
 className="w-full min-w-0 sm:w-[calc(50%-0.625rem)] lg:w-[calc((100%-3*1.25rem)/4)]"
 >
 <CapabilityCard item={item} index={mainCount + i} />
 </div>
 ))}
 </div>
 )}
 </div>
 </div>
 </section>
 );
}
