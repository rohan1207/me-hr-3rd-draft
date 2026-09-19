"use client";

import { useEffect, useState } from "react";
import { Link } from "@/components/compat/router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
 ArrowUpRight,
 Check,
 FileSpreadsheet,
 ShieldCheck,
 Wallet,
} from "lucide-react";
import SpecularButton from "../../ui/SpecularButton";
import { ctas } from "../../../data/content";
import { pagarPage } from "../../../data/servicePages";

const ease = [0.22, 1, 0.36, 1];
const CYCLE = ["Collect", "Verify", "Process", "Comply", "Reconcile", "Report"];
const STATS = ["PF", "ESIC", "PT", "LWF"];

const SCENE = "/team_meet.jpeg";

function LivePayrollPanel({ reduce }) {
 const [step, setStep] = useState(0);

 useEffect(() => {
 if (reduce) return undefined;
 const id = window.setInterval(() => setStep((s) => (s + 1) % CYCLE.length), 1700);
 return () => window.clearInterval(id);
 }, [reduce]);

 return (
 <div className="relative h-full">
 <div className="absolute inset-0 overflow-hidden rounded-[1.75rem] sm:rounded-[2rem]">
 <motion.img
 src={SCENE}
 alt=""
 className="h-full w-full object-cover"
 animate={reduce ? undefined : { scale: [1, 1.05, 1] }}
 transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
 />
 <div className="absolute inset-0 bg-gradient-to-t from-mehr-ink/75 via-mehr-ink/25 to-mehr-deep/20" />
 </div>

 <div className="relative z-10 flex h-full min-h-[420px] flex-col justify-end gap-3 p-4 sm:min-h-[480px] sm:p-5 lg:p-6">
 <motion.div
 className="rounded-2xl border border-white/15 bg-white/95 p-4 shadow-float backdrop-blur-md sm:p-5"
 animate={reduce ? undefined : { y: [0, -5, 0] }}
 transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
 >
 <div className="flex items-center gap-3">
 <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-mehr-deep text-white">
 <FileSpreadsheet size={17} strokeWidth={2} />
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
 animate={reduce ? undefined : { scale: step % 3 === i ? [1, 1.18, 1] : 1 }}
 transition={{ duration: 0.4 }}
 >
 <Check size={11} strokeWidth={2.5} />
 </motion.span>
 <span className="flex-1 text-[12px] font-medium text-mehr-ink">{row}</span>
 <motion.span
 className="h-1.5 max-w-[4.5rem] flex-1 origin-left rounded-full bg-mehr-deep/20"
 animate={reduce ? undefined : { scaleX: [0.4, 1, 0.65, 1] }}
 transition={{
 duration: 3,
 repeat: Infinity,
 ease: "easeInOut",
 delay: i * 0.2,
 }}
 />
 </div>
 ))}
 </div>
 </motion.div>

 <div className="grid grid-cols-2 gap-3">
 <motion.div
 className="rounded-2xl border border-white/15 bg-white/95 p-4 shadow-float backdrop-blur-md"
 animate={reduce ? undefined : { y: [0, 4, 0] }}
 transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
 >
 <div className="flex items-center gap-2">
 <ShieldCheck size={15} className="text-mehr-deep" />
 <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-mehr-muted">
 Statutory
 </p>
 </div>
 <div className="mt-3 flex flex-wrap gap-1.5">
 {STATS.map((tag, i) => (
 <motion.span
 key={tag}
 className="rounded-full bg-mehr-panel px-2.5 py-1 text-[11px] font-semibold text-mehr-deep"
 animate={reduce ? undefined : { opacity: [0.55, 1, 0.55] }}
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

 <div className="flex flex-col justify-center rounded-2xl bg-mehr-deep p-4 text-white shadow-float">
 <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/55">
 Cycle
 </p>
 <AnimatePresence mode="wait">
 <motion.p
 key={CYCLE[step]}
 initial={reduce ? false : { opacity: 0, y: 8 }}
 animate={{ opacity: 1, y: 0 }}
 exit={reduce ? undefined : { opacity: 0, y: -6 }}
 transition={{ duration: 0.3, ease }}
 className="mt-1 font-sans text-lg font-semibold tracking-tight"
 >
 {CYCLE[step]}
 </motion.p>
 </AnimatePresence>
 <div className="mt-3 flex gap-1">
 {CYCLE.map((_, i) => (
 <span
 key={CYCLE[i]}
 className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
 i === step ? "bg-white" : "bg-white/25"
 }`}
 />
 ))}
 </div>
 </div>
 </div>
 </div>
 </div>
 );
}

export default function PagarHero() {
 const reduce = useReducedMotion();
 const { hero } = pagarPage;

 return (
 <section className="relative overflow-hidden bg-white pt-6 pb-10 sm:pt-8 sm:pb-12 lg:pt-10 lg:pb-14">
 <div aria-hidden className="pointer-events-none absolute inset-0 bg-mesh-teal opacity-55" />
 <motion.div
 aria-hidden
 className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-mehr-teal/15 blur-3xl"
 animate={reduce ? undefined : { scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
 transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
 />

 <div className="container-mehr page-gutter relative z-10 sm:px-3 md:px-4 lg:px-5">
 <div className="grid items-stretch gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 xl:gap-12">
 <motion.div
 initial={reduce ? false : { opacity: 0, y: 22 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.7, ease }}
 className="flex flex-col justify-center"
 >
 <p className="text-[12px] font-medium text-mehr-mist">
 Home <span className="mx-1 text-mehr-muted">/</span>
 Services <span className="mx-1 text-mehr-muted">/</span>
 <span className="font-semibold text-mehr-deep">Pagar</span>
 </p>

 <div className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-mehr-deep/12 bg-mehr-panel px-3 py-1.5">
 <Wallet size={14} className="text-mehr-deep" />
 <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-mehr-deep">
 me-HR Pagar
 </span>
 </div>

 <h1 className="mt-4 max-w-[14ch] font-sans text-[clamp(2.1rem,4.8vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-mehr-ink">
 Payroll &amp; Compliance.{" "}
 <span className="text-mehr-deep">Simplified.</span>
 </h1>

 <p className="mt-4 max-w-lg text-sm leading-relaxed text-mehr-mist sm:text-[15px]">
 {hero.body[0]}
 </p>
 <p className="mt-3 max-w-lg text-[13px] leading-relaxed text-mehr-muted sm:text-sm">
 {hero.body[1]}
 </p>

 <div className="mt-7 flex flex-wrap items-center gap-3">
 <SpecularButton to="/contact" variant="brand">
 {hero.cta || ctas.talkToPayroll}
 </SpecularButton>
 <Link
 to="/pricing"
 className="inline-flex items-center gap-1.5 rounded-full border border-mehr-deep/15 bg-white px-4 py-2.5 text-sm font-semibold text-mehr-ink transition hover:border-mehr-deep/30 hover:bg-mehr-panel active:scale-[0.98]"
 >
 {ctas.payrollQuote}
 <ArrowUpRight size={14} className="text-mehr-deep" />
 </Link>
 </div>

 <div className="mt-8 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
 {["Payroll", "PF / ESIC", "Labour", "MIS"].map((label, i) => (
 <motion.div
 key={label}
 initial={reduce ? false : { opacity: 0, y: 12 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.25 + i * 0.06, duration: 0.45, ease }}
 whileHover={reduce ? undefined : { y: -2 }}
 className="rounded-2xl border border-mehr-deep/8 bg-mehr-panel/80 px-3 py-2.5"
 >
 <p className="font-sans text-[12px] font-semibold text-mehr-deep sm:text-[13px]">
 {label}
 </p>
 </motion.div>
 ))}
 </div>
 </motion.div>

 <motion.div
 initial={reduce ? false : { opacity: 0, y: 28, scale: 0.98 }}
 animate={{ opacity: 1, y: 0, scale: 1 }}
 transition={{ duration: 0.75, delay: 0.12, ease }}
 >
 <LivePayrollPanel reduce={reduce} />
 </motion.div>
 </div>
 </div>
 </section>
 );
}
