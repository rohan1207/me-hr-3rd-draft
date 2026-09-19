"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, FileSpreadsheet, ShieldCheck } from "lucide-react";
import { homeContent } from "../../data/content";
import Reveal from "../ui/Reveal";
import SpecularButton from "../ui/SpecularButton";

const ease = [0.22, 1, 0.36, 1];

const CYCLE = ["Collect", "Verify", "Process", "Comply", "Report"];
const STATS = ["PF", "ESIC", "PT", "LWF"];

function PagarVisual() {
 const reduce = useReducedMotion();
 const [step, setStep] = useState(0);

 useEffect(() => {
 if (reduce) return undefined;
 const id = window.setInterval(() => setStep((s) => (s + 1) % CYCLE.length), 1600);
 return () => window.clearInterval(id);
 }, [reduce]);

 return (
 <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
 {/* soft backdrop plane */}
 <div
 aria-hidden
 className="absolute -inset-x-2 -inset-y-3 rounded-[1.75rem] bg-gradient-to-br from-mehr-teal-soft via-mehr-panel to-white sm:-inset-x-3 sm:-inset-y-4"
 />

 <div className="relative grid gap-3 sm:grid-cols-[1.1fr_0.9fr]">
 {/* Payslip card */}
 <motion.div
 className="rounded-2xl border border-mehr-deep/10 bg-white p-4 shadow-float sm:p-5"
 animate={reduce ? undefined : { y: [0, -4, 0] }}
 transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
 >
 <div className="flex items-center gap-2.5">
 <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-mehr-deep text-white">
 <FileSpreadsheet size={16} strokeWidth={2} />
 </span>
 <div>
 <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-mehr-muted">
 Payroll run
 </p>
 <p className="font-sans text-sm font-semibold text-mehr-ink">Monthly cycle</p>
 </div>
 </div>

 <div className="mt-4 space-y-2.5">
 {["Attendance", "Deductions", "Payslips"].map((row, i) => (
 <div key={row} className="flex items-center gap-2.5">
 <motion.span
 className="flex h-5 w-5 items-center justify-center rounded-full bg-mehr-teal-soft text-mehr-deep"
 animate={
 reduce
 ? undefined
 : { scale: step % 3 === i ? [1, 1.15, 1] : 1 }
 }
 transition={{ duration: 0.45 }}
 >
 <Check size={11} strokeWidth={2.5} />
 </motion.span>
 <span className="flex-1 text-[12px] font-medium text-mehr-ink">{row}</span>
 <motion.span
 className="h-1.5 flex-1 max-w-[4.5rem] origin-left rounded-full bg-mehr-deep/20"
 animate={
 reduce
 ? undefined
 : { scaleX: [0.45, 1, 0.7, 1] }
 }
 transition={{
 duration: 3.2,
 repeat: Infinity,
 ease: "easeInOut",
 delay: i * 0.25,
 }}
 />
 </div>
 ))}
 </div>

 <div className="mt-4 flex items-center justify-between rounded-xl bg-mehr-panel/80 px-3 py-2.5">
 <span className="text-[11px] font-semibold text-mehr-mist">Status</span>
 <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-mehr-deep">
 <span className="relative flex h-1.5 w-1.5">
 <span className="absolute inset-0 animate-ping rounded-full bg-mehr-teal opacity-60" />
 <span className="relative h-1.5 w-1.5 rounded-full bg-mehr-deep" />
 </span>
 On track
 </span>
 </div>
 </motion.div>

 {/* Compliance stack */}
 <div className="flex flex-col gap-3">
 <motion.div
 className="rounded-2xl border border-mehr-deep/10 bg-white p-4 shadow-soft"
 animate={reduce ? undefined : { y: [0, 5, 0] }}
 transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
 >
 <div className="flex items-center gap-2">
 <ShieldCheck size={15} className="text-mehr-deep" strokeWidth={2} />
 <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-mehr-muted">
 Statutory
 </p>
 </div>
 <div className="mt-3 flex flex-wrap gap-1.5">
 {STATS.map((tag, i) => (
 <motion.span
 key={tag}
 className="rounded-full bg-mehr-teal-soft px-2.5 py-1 text-[10px] font-bold tracking-wide text-mehr-deep"
 animate={
 reduce
 ? undefined
 : { opacity: [0.55, 1, 0.55], y: [0, -2, 0] }
 }
 transition={{
 duration: 2.4,
 repeat: Infinity,
 ease: "easeInOut",
 delay: i * 0.2,
 }}
 >
 {tag}
 </motion.span>
 ))}
 </div>
 </motion.div>

 <div className="flex flex-1 flex-col justify-center rounded-2xl border border-mehr-deep/10 bg-mehr-deep px-4 py-3.5 text-white shadow-float">
 <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/55">
 Cycle
 </p>
 <motion.p
 key={CYCLE[step]}
 initial={reduce ? false : { opacity: 0, y: 8 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.35, ease }}
 className="mt-1 font-sans text-lg font-semibold tracking-tight"
 >
 {CYCLE[step]}
 </motion.p>
 <div className="mt-3 flex gap-1">
 {CYCLE.map((_, i) => (
 <span
 key={i}
 className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
 i === step ? "bg-white" : "bg-white/25"
 }`}
 />
 ))}
 </div>
 </div>
 </div>
 </div>

 {/* Decorative SVG ring */}
 <svg
 aria-hidden
 className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 text-mehr-deep/15 sm:-right-8 sm:-top-8 sm:h-28 sm:w-28"
 viewBox="0 0 100 100"
 fill="none"
 >
 <motion.circle
 cx="50"
 cy="50"
 r="38"
 stroke="currentColor"
 strokeWidth="1.5"
 strokeDasharray="8 10"
 animate={reduce ? undefined : { rotate: 360 }}
 transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
 style={{ transformOrigin: "50% 50%" }}
 />
 </svg>
 </div>
 );
}

export default function PagarPreview() {
 const { pagar } = homeContent;

 return (
 <section className="section-pad relative overflow-hidden bg-mehr-panel">
 <div className="pointer-events-none absolute inset-0 bg-mesh-teal opacity-40" aria-hidden />

 <div className="container-mehr page-gutter relative z-10 sm:px-3 md:px-4 lg:px-5">
 <Reveal>
 <div className="overflow-hidden rounded-[1.75rem] border border-mehr-deep/10 bg-white sm:rounded-[2.25rem]">
 <div className="grid items-center gap-8 px-6 py-8 sm:gap-10 sm:px-10 sm:py-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:px-12 lg:py-12">
 <div>
 <p className="eyebrow mb-3">{pagar.eyebrow}</p>
 <h2 className="max-w-[14ch] font-sans text-[clamp(1.55rem,3.4vw,2.65rem)] font-semibold leading-[1.12] tracking-[-0.03em] text-mehr-ink">
 {pagar.title}
 </h2>
 <p className="mt-4 max-w-md text-sm leading-relaxed text-mehr-mist sm:text-[15px]">
 {pagar.desc}
 </p>
 <div className="mt-7">
 <SpecularButton to="/pagar" variant="brand" size="md">
 {pagar.cta}
 <ArrowUpRight size={15} />
 </SpecularButton>
 </div>
 </div>

 <PagarVisual />
 </div>
 </div>
 </Reveal>
 </div>
 </section>
 );
}
