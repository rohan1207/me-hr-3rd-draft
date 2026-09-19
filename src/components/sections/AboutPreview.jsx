"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Ear, Handshake, PenLine } from "lucide-react";
import { Link } from "@/components/compat/router";
import { homeContent, ctas } from "../../data/content";
import SpecularButton from "../ui/SpecularButton";
import Reveal from "../ui/Reveal";

const ease = [0.22, 1, 0.36, 1];
const CYCLE_MS = 3200;

const icons = [Ear, PenLine, Handshake];

const IMAGE =
 "/me-hr_team.jpg";

export default function AboutPreview() {
 const reduce = useReducedMotion();
 const [active, setActive] = useState(1);
 const about = homeContent.about;
 const philosophy = homeContent.philosophy;
 const steps = (philosophy?.principles || []).map((p, i) => ({
 ...p,
 Icon: icons[i] || Ear,
 }));

 const lead = (about.body?.[0] || "").split(/(?<=\.)\s+/)[0];

 useEffect(() => {
 if (reduce || steps.length === 0) return undefined;
 const id = window.setInterval(() => {
 setActive((i) => (i + 1) % steps.length);
 }, CYCLE_MS);
 return () => window.clearInterval(id);
 }, [reduce, steps.length]);

 return (
 <section className="relative overflow-hidden bg-white pb-8 pt-8 sm:pb-10 sm:pt-10 lg:pb-12 lg:pt-12">
 <div className="container-mehr page-gutter relative z-10 sm:px-3 md:px-4 lg:px-5">
 {/* Top-aligned split, no tall image above the copy */}
 <div className="relative grid items-start gap-8 lg:grid-cols-[1fr_1fr] lg:gap-10 xl:gap-12">
 <Reveal className="relative z-10 lg:pt-1">
 <p className="eyebrow">{about.eyebrow}</p>
 <h2 className="mt-3 max-w-[13ch] font-sans text-[clamp(1.85rem,3.8vw,3rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-mehr-ink">
 {about.title}
 </h2>
 <p className="mt-4 max-w-md text-[14px] leading-relaxed text-mehr-mist sm:text-[15px]">
 {lead}
 </p>

 <div className="mt-7 flex flex-wrap items-center gap-3">
 <SpecularButton to="/about" variant="brand" size="md">
 {about.cta}
 <ArrowUpRight size={15} />
 </SpecularButton>
 <Link
 to="/services"
 className="inline-flex items-center gap-1.5 px-2 text-sm font-semibold text-mehr-deep transition hover:text-mehr-ink"
 >
 {ctas.exploreServices}
 <ArrowRight size={15} />
 </Link>
 </div>
 </Reveal>

 <Reveal delay={0.08} className="relative">
 <div className="relative mx-auto w-full max-w-lg lg:ml-auto lg:max-w-none">
 <div
 className="relative overflow-hidden bg-mehr-panel"
 style={{
 borderRadius: "1.75rem 1.75rem 1.75rem 42%",
 }}
 >
 <div className="aspect-[16/11] w-full max-h-[300px] sm:max-h-[320px] lg:max-h-[340px]">
 <motion.img
 src={IMAGE}
 alt=""
 className="h-full w-full object-cover"
 animate={reduce ? undefined : { scale: [1, 1.04, 1] }}
 transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
 />
 </div>
 </div>

 {/* Mission badge sits in the bottom-left curve */}
 <motion.div
 className="absolute bottom-[12%] left-0 z-10 sm:bottom-[14%] sm:-left-1"
 animate={reduce ? undefined : { y: [0, -4, 0] }}
 transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
 >
 <div className="flex h-[5.75rem] w-[5.75rem] flex-col items-center justify-center rounded-full border-[4px] border-white bg-mehr-deep px-2.5 text-center text-white shadow-float sm:h-[6.25rem] sm:w-[6.25rem]">
 <p className="text-[8px] font-semibold uppercase tracking-[0.12em] text-white/65 sm:text-[9px]">
 {philosophy.badgeLabel}
 </p>
 <p className="mt-1 font-sans text-[10px] font-semibold leading-snug sm:text-[11px]">
 Structured. Scalable.
 </p>
 </div>
 </motion.div>

 <div
 aria-hidden
 className="pointer-events-none absolute -right-2 top-4 h-16 w-16 rounded-full border-[3px] border-mehr-teal/35 sm:h-20 sm:w-20"
 />
 </div>
 </Reveal>
 </div>

 {/* Approach cards, clear of the image, no overlap */}
 <Reveal delay={0.12} className="relative mt-12 sm:mt-14 lg:mt-16">
 <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
 {steps.map((step, i) => {
 const on = active === i;
 const Icon = step.Icon;
 return (
 <button
 key={step.title}
 type="button"
 onMouseEnter={() => setActive(i)}
 onFocus={() => setActive(i)}
 onClick={() => setActive(i)}
 className={`group rounded-[1.35rem] p-4 text-left transition duration-300 outline-none focus-visible:ring-2 focus-visible:ring-mehr-deep/30 sm:rounded-[1.5rem] sm:p-5 ${
 on
 ? "bg-mehr-deep text-white shadow-float"
 : "border border-mehr-deep/8 bg-mehr-panel text-mehr-ink hover:border-mehr-deep/20 hover:bg-white"
 }`}
 >
 <div className="flex items-start justify-between gap-3">
 <span
 className={`flex h-10 w-10 items-center justify-center rounded-xl transition ${
 on
 ? "bg-white/15 text-white"
 : "bg-white text-mehr-deep shadow-soft"
 }`}
 >
 <Icon size={18} strokeWidth={1.9} />
 </span>
 <span
 className={`font-sans text-[11px] font-semibold tabular-nums ${
 on ? "text-white/50" : "text-mehr-muted"
 }`}
 >
 {String(i + 1).padStart(2, "0")}
 </span>
 </div>
 <p
 className={`mt-3 font-sans text-[15px] font-semibold sm:text-base ${
 on ? "text-white" : "text-mehr-ink"
 }`}
 >
 {step.title}
 </p>
 <p
 className={`mt-1.5 text-[12px] leading-relaxed sm:text-[13px] ${
 on ? "text-white/75" : "text-mehr-mist"
 }`}
 >
 {step.desc}
 </p>
 {on && !reduce && (
 <motion.span
 key={`bar-${active}`}
 className="mt-3 block h-0.5 origin-left rounded-full bg-white/70"
 initial={{ scaleX: 0 }}
 animate={{ scaleX: 1 }}
 transition={{ duration: CYCLE_MS / 1000, ease: "linear" }}
 />
 )}
 </button>
 );
 })}
 </div>
 </Reveal>
 </div>
 </section>
 );
}
