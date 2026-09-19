"use client";

import { useState } from "react";
import { Link } from "@/components/compat/router";
import { motion } from "framer-motion";
import {
 ArrowUpRight,
 ArrowRight,
 Play,
 Shuffle,
 Share2,
 MessageCircle,
 Puzzle,
 BadgeCheck,
 Layers,
 TrendingUp,
 Zap,
 HeartHandshake,
} from "lucide-react";
import { whyChoose, homeContent, ctas, contactInfo } from "../../data/content";
import Reveal, { RevealItem, RevealStagger } from "../ui/Reveal";

const whyIcons = [Puzzle, BadgeCheck, Layers, TrendingUp, Zap, HeartHandshake];

export default function WhyChoose() {
 const [focus, setFocus] = useState(2);
 const section = homeContent.whySection;

 const cycleFocus = () => {
 setFocus((i) => (i + 1) % whyChoose.length);
 };

 const focusItem = whyChoose[focus];
 const FocusIcon = whyIcons[focus];

 return (
 <section className="relative overflow-hidden bg-white py-8 sm:py-10 lg:py-12">
 <div className="page-gutter mx-auto w-full max-w-[1680px] sm:px-3 md:px-4 lg:px-5">
 <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-12">
 <Reveal>
 <span className="inline-flex rounded-full border border-mehr-deep/20 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-mehr-deep">
 {section.eyebrow}
 </span>
 <h2 className="mt-4 max-w-xl font-sans text-[clamp(1.75rem,4vw,3.1rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-mehr-ink">
 {section.title}
 </h2>
 </Reveal>

 <Reveal delay={0.08} className="lg:pb-1">
 <p className="max-w-md text-[14px] leading-relaxed text-mehr-mist sm:text-[15px] lg:ml-auto lg:text-right">
 {section.body}
 </p>
 <div className="mt-5 flex flex-wrap items-center gap-3 lg:justify-end">
 <Link
 to="/contact"
 className="inline-flex items-center gap-2 rounded-full bg-mehr-deep px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-mehr-ink"
 >
 {section.primaryCta}
 <ArrowUpRight size={15} />
 </Link>
 <Link
 to="/about"
 className="inline-flex items-center gap-2 text-sm font-semibold text-mehr-ink transition hover:text-mehr-deep"
 >
 <span className="flex h-9 w-9 items-center justify-center rounded-full border border-mehr-deep/15 bg-white shadow-soft">
 <Play size={12} className="ml-0.5 fill-current" />
 </span>
 {section.secondaryCta}
 </Link>
 </div>
 </Reveal>
 </div>

 <RevealStagger
 className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3 lg:grid-cols-12 lg:grid-rows-2 lg:gap-3.5"
 stagger={0.07}
 >
 <RevealItem className="min-h-[220px] sm:col-span-2 sm:min-h-[280px] lg:col-span-3 lg:row-span-2 lg:min-h-[420px]">
 <Link
 to="/services"
 className="group relative flex h-full min-h-[240px] overflow-hidden rounded-[1.35rem] sm:min-h-[280px] sm:rounded-[1.75rem] lg:min-h-full"
 >
 <img
 src="/me-hr_team.jpg"
 alt={whyChoose[0].title}
 className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
 />
 <div className="absolute inset-0 bg-gradient-to-t from-mehr-ink/80 via-mehr-ink/25 to-transparent" />
 <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-mehr-ink shadow-soft transition group-hover:bg-mehr-panel sm:right-4 sm:top-4">
 <ArrowUpRight size={16} />
 </span>
 <div className="relative mt-auto p-4 sm:p-5">
 <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-white/55">
 01
 </p>
 <h3 className="mt-1 font-sans text-lg font-semibold leading-snug text-white sm:text-xl">
 {whyChoose[0].title}
 </h3>
 <p className="mt-1.5 max-w-[16rem] text-[12px] leading-relaxed text-white/70 sm:text-[13px]">
 {whyChoose[0].desc}
 </p>
 </div>
 </Link>
 </RevealItem>

 <RevealItem className="lg:col-span-3 lg:col-start-4 lg:row-start-1">
 <Link
 to="/about"
 className="group relative flex h-full min-h-[140px] flex-col justify-between overflow-hidden rounded-[1.25rem] bg-mehr-deep p-4 text-white sm:min-h-[160px] sm:rounded-[1.5rem] sm:p-5 lg:min-h-full"
 >
 <div
 className="pointer-events-none absolute inset-x-0 bottom-0 h-16 opacity-30"
 style={{
 backgroundImage:
 "linear-gradient(45deg, transparent 46%, rgba(255,255,255,0.12) 46%, rgba(255,255,255,0.12) 54%, transparent 54%)",
 backgroundSize: "14px 14px",
 }}
 />
 <p className="relative font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-white/45">
 02
 </p>
 <div className="relative flex items-end justify-between gap-3">
 <h3 className="max-w-[11rem] font-sans text-[15px] font-semibold leading-snug sm:text-lg">
 {whyChoose[1].title}
 </h3>
 <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-mehr-deep transition group-hover:scale-105">
 <ArrowUpRight size={14} />
 </span>
 </div>
 </Link>
 </RevealItem>

 <RevealItem className="lg:col-span-2 lg:col-start-7 lg:row-start-1">
 <div className="flex h-full min-h-[140px] flex-col justify-center rounded-[1.25rem] bg-mehr-panel p-4 sm:min-h-[160px] sm:rounded-[1.5rem] sm:p-5 lg:min-h-full">
 <p className="font-sans text-lg font-semibold tracking-tight text-mehr-ink sm:text-xl">
 {whyChoose[2].title}
 </p>
 <p className="mt-2 text-[12px] leading-snug text-mehr-mist sm:text-[13px]">
 {whyChoose[2].desc}
 </p>
 </div>
 </RevealItem>

 <RevealItem className="order-last min-h-[220px] lg:order-none lg:col-span-4 lg:col-start-9 lg:row-span-2 lg:row-start-1 lg:min-h-[420px]">
 <div className="relative h-full min-h-[220px] overflow-hidden rounded-[1.35rem] sm:rounded-[1.75rem] lg:min-h-full">
 <img
 src="/me-hr_meeting.jpeg"
 alt={whyChoose[5].title}
 className="absolute inset-0 h-full w-full object-cover"
 />
 <div className="absolute inset-0 bg-gradient-to-t from-mehr-ink/75 via-mehr-ink/15 to-transparent" />

 <div className="absolute bottom-4 left-4 right-16 z-10 sm:bottom-5 sm:left-5 sm:right-20">
 <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-white/55">
 06
 </p>
 <h3 className="mt-1 font-sans text-lg font-semibold text-white sm:text-xl">
 {whyChoose[5].title}
 </h3>
 <p className="mt-1 max-w-xs text-[12px] leading-relaxed text-white/70 sm:text-[13px]">
 {whyChoose[5].desc}
 </p>
 </div>

 <div className="absolute bottom-4 right-3 z-10 flex flex-col gap-2 sm:bottom-5 sm:right-4">
 <a
 href={contactInfo.emailHref}
 aria-label={contactInfo.email}
 className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-mehr-ink shadow-float transition hover:bg-mehr-panel"
 >
 <MessageCircle size={17} />
 </a>
 <Link
 to="/contact"
 aria-label={ctas.primary}
 className="flex h-11 w-11 items-center justify-center rounded-2xl bg-mehr-deep text-white shadow-float transition hover:bg-mehr-ink"
 >
 <Share2 size={16} />
 </Link>
 </div>
 </div>
 </RevealItem>

 <RevealItem className="lg:col-span-5 lg:col-start-4 lg:row-start-2">
 <div className="flex h-full min-h-[170px] flex-col rounded-[1.25rem] border border-mehr-deep/12 bg-white p-4 sm:min-h-[160px] sm:rounded-[1.5rem] sm:p-5 lg:min-h-full">
 <div className="flex items-center justify-between gap-3">
 <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-mehr-muted">
 {section.eyebrow}
 </p>
 <FocusIcon className="h-4 w-4 text-mehr-deep" strokeWidth={1.75} />
 </div>
 <motion.div
 key={focusItem.title}
 initial={{ opacity: 0, y: 6 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.28 }}
 className="mt-3 flex-1"
 >
 <h3 className="font-sans text-base font-semibold tracking-tight text-mehr-ink sm:text-lg">
 {focusItem.title}
 </h3>
 <p className="mt-1.5 text-[13px] leading-relaxed text-mehr-mist">
 {focusItem.desc}
 </p>
 </motion.div>
 <div className="mt-4 flex items-center justify-between gap-3">
 <button
 type="button"
 onClick={cycleFocus}
 aria-label="Show next reason"
 className="flex h-9 w-9 items-center justify-center rounded-full border border-mehr-deep/12 text-mehr-ink transition hover:bg-mehr-panel"
 >
 <Shuffle size={14} />
 </button>
 <Link
 to="/contact"
 className="inline-flex items-center gap-2 rounded-full bg-mehr-deep px-4 py-2 text-xs font-semibold text-white transition hover:bg-mehr-ink sm:text-sm"
 >
 {ctas.primary}
 <ArrowRight size={13} />
 </Link>
 </div>
 </div>
 </RevealItem>
 </RevealStagger>

 <RevealStagger
 className="mt-2.5 grid grid-cols-1 gap-2.5 sm:mt-3 sm:grid-cols-3 sm:gap-3"
 stagger={0.05}
 >
 {whyChoose.slice(2, 5).map((item, i) => {
 const Icon = whyIcons[i + 2];
 return (
 <RevealItem key={item.title}>
 <button
 type="button"
 onClick={() => setFocus(i + 2)}
 className="group flex w-full items-start gap-3 rounded-[1.25rem] border border-mehr-deep/8 bg-mehr-panel/60 px-4 py-3.5 text-left transition hover:border-mehr-deep/20 hover:bg-white hover:shadow-soft sm:rounded-[1.35rem]"
 >
 <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white text-mehr-deep shadow-soft">
 <Icon className="h-4 w-4" strokeWidth={1.75} />
 </span>
 <span>
 <span className="block font-sans text-sm font-semibold text-mehr-ink">
 {item.title}
 </span>
 <span className="mt-0.5 block text-[12px] leading-snug text-mehr-mist">
 {item.desc}
 </span>
 </span>
 </button>
 </RevealItem>
 );
 })}
 </RevealStagger>
 </div>
 </section>
 );
}
