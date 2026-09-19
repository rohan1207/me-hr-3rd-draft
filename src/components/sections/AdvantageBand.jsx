"use client";

import { useEffect, useState } from "react";
import {
 AnimatePresence,
 motion,
 useReducedMotion,
} from "framer-motion";
import { Ear, Handshake, Sparkles } from "lucide-react";
import { homeContent } from "../../data/content";
import Reveal from "../ui/Reveal";

const ease = [0.22, 1, 0.36, 1];
const CYCLE_MS = 3400;

const iconMap = {
 Understand: Ear,
 Recommend: Sparkles,
 Strengthen: Handshake,
};

/** Distinct image per approach step */
const stepImages = {
 Understand:
 "/me-hr_team.jpg",
 Recommend:
 "/me-hr_meeting.jpeg",
 Strengthen:
 "/team_meet.jpeg",
};

export default function AdvantageBand() {
 const reduce = useReducedMotion();
 const content = homeContent.philosophy;
 const principles = content.principles || [];
 const [active, setActive] = useState(0);
 const [paused, setPaused] = useState(false);
 const current = principles[active] || principles[0];
 const ActiveIcon = iconMap[current?.title] || Sparkles;

 useEffect(() => {
 if (reduce || paused || principles.length === 0) return undefined;
 const id = window.setInterval(() => {
 setActive((i) => (i + 1) % principles.length);
 }, CYCLE_MS);
 return () => window.clearInterval(id);
 }, [reduce, paused, principles.length]);

 return (
 <section className="section-pad relative overflow-hidden bg-mehr-panel/40">
 <div className="container-mehr page-gutter relative z-10 sm:px-3 md:px-4 lg:px-5">
 {/* Header */}
 <Reveal className="max-w-2xl">
 <p className="eyebrow mb-3">{content.eyebrow}</p>
 <h2 className="font-sans text-[clamp(1.7rem,3.6vw,2.85rem)] font-semibold leading-[1.12] tracking-[-0.03em] text-mehr-ink">
 {content.title}
 </h2>
 <p className="mt-4 max-w-xl text-sm leading-relaxed text-mehr-mist sm:text-[15px]">
 {content.body}
 </p>
 </Reveal>

 {/* Interactive approach steps, no image overlap */}
 <div
 className="mt-6 grid gap-3 sm:mt-8 sm:grid-cols-3 sm:gap-4"
 onMouseEnter={() => setPaused(true)}
 onMouseLeave={() => setPaused(false)}
 >
 {principles.map((item, i) => {
 const Icon = iconMap[item.title] || Sparkles;
 const on = active === i;
 return (
 <motion.button
 key={item.title}
 type="button"
 onClick={() => setActive(i)}
 onFocus={() => setActive(i)}
 onMouseEnter={() => setActive(i)}
 layout
 className={`relative overflow-hidden rounded-[1.5rem] p-5 text-left outline-none transition duration-300 focus-visible:ring-2 focus-visible:ring-mehr-deep/30 sm:p-6 ${
 on
 ? "bg-mehr-deep text-white shadow-float"
 : "border border-mehr-deep/8 bg-white text-mehr-ink hover:border-mehr-deep/20"
 }`}
 >
 <div className="flex items-center justify-between gap-3">
 <span
 className={`flex h-11 w-11 items-center justify-center rounded-2xl transition ${
 on
 ? "bg-white/15 text-white"
 : "bg-mehr-teal-soft text-mehr-deep"
 }`}
 >
 <Icon size={18} strokeWidth={1.9} />
 </span>
 <span
 className={`font-sans text-xs font-semibold tabular-nums tracking-wide ${
 on ? "text-white/45" : "text-mehr-muted"
 }`}
 >
 {String(i + 1).padStart(2, "0")}
 </span>
 </div>

 <p
 className={`mt-4 font-sans text-lg font-semibold tracking-tight ${
 on ? "text-white" : "text-mehr-ink"
 }`}
 >
 {item.title}
 </p>

 <AnimatePresence initial={false}>
 {on && (
 <motion.p
 key="desc"
 initial={reduce ? false : { opacity: 0, height: 0 }}
 animate={{ opacity: 1, height: "auto" }}
 exit={{ opacity: 0, height: 0 }}
 transition={{ duration: 0.28, ease }}
 className={`mt-2 overflow-hidden text-[13px] leading-relaxed ${
 on ? "text-white/75" : "text-mehr-mist"
 }`}
 >
 {item.desc}
 </motion.p>
 )}
 </AnimatePresence>

 {on && !reduce && (
 <motion.span
 key={`rail-${active}`}
 className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-white/70"
 initial={{ scaleX: 0 }}
 animate={{ scaleX: 1 }}
 transition={{ duration: CYCLE_MS / 1000, ease: "linear" }}
 />
 )}
 </motion.button>
 );
 })}
 </div>

 {/* Clean split, image with no overlays + mission beside it */}
 <div className="mt-6 grid items-stretch gap-4 sm:mt-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-5">
 <Reveal className="relative min-h-[240px] overflow-hidden sm:min-h-[280px]">
 <div
 className="absolute inset-0 overflow-hidden bg-mehr-panel"
 style={{ borderRadius: "1.75rem 1.75rem 1.75rem 38%" }}
 >
 {/* Crossfade stack, elegant overlapping dissolve */}
 {principles.map((item, i) => {
 const src = stepImages[item.title] || stepImages.Understand;
 const on = active === i;
 return (
 <motion.img
 key={item.title}
 src={src}
 alt=""
 className="absolute inset-0 h-full w-full object-cover"
 initial={false}
 animate={
 reduce
 ? { opacity: on ? 1 : 0, scale: 1 }
 : {
 opacity: on ? 1 : 0,
 scale: on ? 1 : 1.04,
 }
 }
 transition={{
 opacity: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
 scale: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
 }}
 style={{ zIndex: on ? 2 : 1 }}
 />
 );
 })}
 <div
 aria-hidden
 className="pointer-events-none absolute inset-0 z-[3] bg-gradient-to-t from-mehr-ink/20 via-transparent to-transparent"
 />
 </div>

 <AnimatePresence mode="wait">
 <motion.p
 key={active}
 initial={reduce ? false : { opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0, y: -10 }}
 transition={{ duration: 0.4, ease }}
 className="pointer-events-none absolute right-5 top-4 z-[4] font-sans text-[3.5rem] font-semibold leading-none tracking-[-0.06em] text-white/30 sm:right-6 sm:top-5 sm:text-[4.25rem]"
 aria-hidden
 >
 {String(active + 1).padStart(2, "0")}
 </motion.p>
 </AnimatePresence>
 </Reveal> <Reveal delay={0.08}>
 <div className="flex h-full flex-col justify-between rounded-[1.75rem] bg-mehr-deep p-6 text-white sm:p-7 lg:p-8">
 <div>
 <div className="flex items-center gap-3">
 <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/12">
 <ActiveIcon size={20} strokeWidth={1.9} />
 </span>
 <div>
 <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/55">
 {content.badgeLabel}
 </p>
 <p className="mt-0.5 font-sans text-sm font-semibold text-white">
 {content.badgeTitle}
 </p>
 </div>
 </div>

 <p className="mt-6 font-sans text-lg font-semibold leading-snug tracking-tight sm:text-xl">
 {content.badgeBody}
 </p>
 </div>

 <div className="mt-8 border-t border-white/15 pt-5">
 <AnimatePresence mode="wait" initial={false}>
 <motion.div
 key={current?.title}
 initial={reduce ? false : { opacity: 0, y: 6 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0, y: -4 }}
 transition={{ duration: 0.28, ease }}
 >
 <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/50">
 Now
 </p>
 <p className="mt-1 font-sans text-base font-semibold text-white">
 {current?.title}
 </p>
 <p className="mt-1.5 text-[13px] leading-relaxed text-white/70">
 {current?.desc}
 </p>
 </motion.div>
 </AnimatePresence>

 <div className="mt-5 flex gap-1.5">
 {principles.map((_, i) => (
 <button
 key={i}
 type="button"
 aria-label={`Show ${principles[i].title}`}
 onClick={() => setActive(i)}
 className={`h-1.5 rounded-full transition-all duration-300 ${
 active === i ? "w-8 bg-white" : "w-1.5 bg-white/30 hover:bg-white/50"
 }`}
 />
 ))}
 </div>
 </div>
 </div>
 </Reveal>
 </div>
 </div>
 </section>
 );
}
