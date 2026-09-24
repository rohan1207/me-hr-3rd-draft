"use client";

import { Link } from "@/components/compat/router";
import { motion as Motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, MessageSquareText } from "lucide-react";
import FloatingShapes from "./FloatingShapes";
import Reveal from "./Reveal";
import SpecularButton from "./SpecularButton";

const ease = [0.22, 1, 0.36, 1];

function chipLabelsFromTitle(title = "") {
 const stop = new Set([
 "the",
 "a",
 "an",
 "and",
 "or",
 "of",
 "for",
 "to",
 "in",
 "on",
 "your",
 "you",
 "when",
 "need",
 "it",
 "without",
 "all",
 "is",
 "more",
 "than",
 ]);
 const words = title
 .replace(/[.,]/g, "")
 .split(/\s+/)
 .map((w) => w.trim())
 .filter((w) => w.length > 2 && !stop.has(w.toLowerCase()));
 const unique = [...new Set(words)].slice(0, 3);
 if (unique.length >= 2) return unique;
 return ["me-HR", "Pune"].slice(0, Math.max(2, unique.length));
}

function HeroPhoto({ image, alt }) {
 const reduce = useReducedMotion();

 return (
 <div className="relative mx-auto w-full max-w-md lg:ml-auto lg:max-w-none">
 <div
 aria-hidden
 className="absolute -bottom-3 -right-3 h-[88%] w-[92%] rounded-[1.5rem] bg-mehr-deep/15 sm:-bottom-4 sm:-right-4 sm:rounded-[1.75rem]"
 />
 <div className="relative overflow-hidden rounded-[1.5rem] border border-mehr-deep/10 bg-mehr-panel shadow-soft sm:rounded-[1.75rem]">
 <div className="aspect-[16/10] w-full max-h-[240px] sm:aspect-[5/4] sm:max-h-[320px] lg:max-h-[340px]">
 <Motion.img
 src={image}
 alt={alt || ""}
 className="h-full w-full object-cover"
 animate={reduce ? undefined : { scale: [1, 1.035, 1] }}
 transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
 />
 </div>
 </div>
 <div
 aria-hidden
 className="pointer-events-none absolute -left-2 top-6 h-14 w-14 rounded-full border-[3px] border-mehr-teal/30 sm:h-16 sm:w-16"
 />
 </div>
 );
}

function HeroDecor({ title, chips: chipsProp }) {
 const reduce = useReducedMotion();
 const chips = chipsProp?.length ? chipsProp : chipLabelsFromTitle(title);

 return (
 <div className="relative mx-auto flex min-h-[200px] w-full max-w-md items-center justify-center overflow-hidden sm:min-h-[280px] lg:ml-auto lg:max-w-none lg:min-h-[300px]">
 <div className="absolute inset-0 overflow-hidden rounded-[1.25rem] border border-mehr-deep/10 bg-mehr-panel sm:rounded-[1.75rem]">
 <div
 aria-hidden
 className="absolute inset-0 opacity-60"
 style={{
 backgroundImage:
 "radial-gradient(ellipse 70% 55% at 30% 25%, rgba(20,196,173,0.18), transparent 55%), radial-gradient(ellipse 50% 40% at 85% 75%, rgba(11,95,88,0.12), transparent 50%)",
 }}
 />
 <div
 aria-hidden
 className="absolute inset-0 opacity-40"
 style={{
 backgroundImage:
 "linear-gradient(rgba(11,95,88,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(11,95,88,0.06) 1px, transparent 1px)",
 backgroundSize: "28px 28px",
 }}
 />
 </div>

 <Motion.div
 aria-hidden
 className="absolute h-36 w-36 rounded-full border border-mehr-deep/15 sm:h-52 sm:w-52"
 animate={reduce ? undefined : { rotate: 360 }}
 transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
 />
 <Motion.div
 aria-hidden
 className="absolute h-24 w-24 rounded-full border border-mehr-teal/25 sm:h-32 sm:w-32"
 animate={reduce ? undefined : { rotate: -360 }}
 transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
 />
 <Motion.div
 aria-hidden
 className="absolute h-14 w-14 rounded-full bg-mehr-deep/10 sm:h-20 sm:w-20"
 animate={reduce ? undefined : { scale: [1, 1.08, 1], opacity: [0.55, 0.9, 0.55] }}
 transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
 />
 <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-[1.2rem] bg-mehr-deep text-white shadow-float sm:h-24 sm:w-24 sm:rounded-[1.35rem]">
 <MessageSquareText size={28} strokeWidth={1.6} className="sm:hidden" />
 <MessageSquareText size={40} strokeWidth={1.6} className="hidden sm:block" />
 </div>

 {chips.map((label, i) => {
 const positions = [
 "left-[6%] top-[16%]",
 "right-[5%] top-[40%]",
 "left-[10%] bottom-[14%]",
 ];
 return (
 <Motion.span
 key={label}
 className={`absolute z-10 max-w-[42%] truncate rounded-full border border-mehr-deep/12 bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-mehr-ink shadow-soft backdrop-blur-sm sm:max-w-none sm:px-3 sm:py-1.5 sm:text-[11px] ${positions[i] || positions[0]}`}
 animate={reduce ? undefined : { y: [0, i % 2 === 0 ? -6 : 6, 0] }}
 transition={{
 duration: 4.5 + i * 0.6,
 repeat: Infinity,
 ease: "easeInOut",
 delay: i * 0.2,
 }}
 >
 {label}
 </Motion.span>
 );
 })}
 </div>
 );
}

export default function PageHero({
 eyebrow,
 title,
 body,
 crumbs = [],
 cta,
 ctaPath = "/contact",
 secondaryCta,
 secondaryPath = "/services",
 image,
 chips,
}) {
 const reduce = useReducedMotion();

 return (
 <section className="relative overflow-hidden border-b border-mehr-deep/8 bg-white pt-6 pb-8 sm:pt-10 sm:pb-16 lg:pt-10 lg:pb-20">
 <div className="absolute inset-0 bg-mesh-teal" />
 <div
 aria-hidden
 className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-mehr-panel/50 to-transparent"
 />
 <FloatingShapes />

 <div className="container-mehr page-gutter relative z-10 sm:px-3 md:px-4 lg:px-5">
 {crumbs.length > 0 && (
 <Reveal>
 <nav className="mb-6 flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-mehr-muted sm:mb-8 lg:justify-start">
 <Link to="/" className="transition hover:text-mehr-ink">
 Home
 </Link>
 {crumbs.map((c) => (
 <span key={c} className="flex items-center gap-2">
 <span className="text-mehr-deep/20">/</span>
 <span className="text-mehr-mist">{c}</span>
 </span>
 ))}
 </nav>
 </Reveal>
 )}

 <div className="grid min-w-0 items-center gap-6 sm:gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 xl:gap-16">
 <div className="min-w-0 text-center lg:text-left">
 {eyebrow && (
 <Reveal>
 <p className="eyebrow mb-3 sm:mb-4">{eyebrow}</p>
 </Reveal>
 )}
 <Reveal delay={0.06}>
 <h1 className="mx-auto max-w-[16ch] break-words font-sans text-[clamp(1.4rem,6.5vw,3.4rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-mehr-ink lg:mx-0">
 {title}
 </h1>
 </Reveal>
 {body && (
 <Reveal delay={0.12}>
 <p className="mx-auto mt-3.5 max-w-xl text-[13px] leading-relaxed text-mehr-mist sm:mt-5 sm:text-[15px] lg:mx-0">
 {body}
 </p>
 </Reveal>
 )}

 {(cta || secondaryCta) && (
 <Reveal
 delay={0.18}
 className="mt-6 flex w-full min-w-0 flex-col items-stretch gap-2.5 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-3 lg:justify-start"
 >
 {cta && (
 <SpecularButton
 to={ctaPath}
 variant="brand"
 size="md"
 className="w-full max-w-full justify-center !text-[13px] sm:w-auto sm:!text-sm"
 >
 {cta}
 <ArrowUpRight size={15} />
 </SpecularButton>
 )}
 {secondaryCta && (
 <Link
 to={secondaryPath}
 className="inline-flex w-full max-w-full items-center justify-center gap-1.5 rounded-full border border-mehr-deep/20 bg-white px-5 py-3 text-sm font-semibold text-mehr-deep transition hover:border-mehr-deep hover:bg-mehr-panel sm:w-auto"
 >
 {secondaryCta}
 </Link>
 )}
 </Reveal>
 )}
 </div>

 <Reveal delay={0.1} className="relative order-last min-w-0 w-full max-w-full overflow-hidden lg:order-none">
 {image ? (
 <HeroPhoto image={image} alt={title} />
 ) : (
 <HeroDecor title={title} chips={chips} />
 )}
 {!reduce && (
 <Motion.div
 aria-hidden
 className="pointer-events-none absolute -bottom-6 left-1/2 h-16 w-40 -translate-x-1/2 rounded-full bg-mehr-deep/10 blur-2xl"
 animate={{ opacity: [0.35, 0.6, 0.35] }}
 transition={{ duration: 5, repeat: Infinity, ease }}
 />
 )}
 </Reveal>
 </div>
 </div>
 </section>
 );
}
