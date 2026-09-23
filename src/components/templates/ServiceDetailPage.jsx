"use client";

import { useEffect, useState } from "react";
import { motion as Motion, useReducedMotion } from "framer-motion";
import {
 ArrowUpRight,
 BadgeCheck,
 Building2,
 CalendarDays,
 CheckCircle2,
 ClipboardList,
 FileText,
 Layers,
 Quote,
 RefreshCw,
 ShieldCheck,
 Sparkles,
 Target,
 Users,
 Workflow,
} from "lucide-react";
import PageSEO from "../ui/PageSEO";
import PageHero from "../ui/PageHero";
import ExploreOtherServices from "../sections/ExploreOtherServices";
import ServiceNav from "../sections/ServiceNav";
import CTABanner from "../ui/CTABanner";
import SpecularButton from "../ui/SpecularButton";
import Reveal, { RevealItem, RevealStagger } from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";

const CYCLE_MS = 1800;
const ease = [0.22, 1, 0.36, 1];

const HERO_IMAGES = {
 "/services/on-demand-hr":
 "/me-hr_team.jpg",
 "/services/hr-retainership":
 "/resident-hr-hero.png",
 "/services/strategic-consulting":
 "/team_meet.jpeg",
 "/pagar":
 "/payroll-outsourcing-hero.png",
};

const GRID_ICONS = [
 ClipboardList,
 Users,
 FileText,
 Layers,
 Target,
 Workflow,
 ShieldCheck,
 Building2,
 Sparkles,
 BadgeCheck,
 CalendarDays,
 RefreshCw,
];

const cardBase =
 "group h-full rounded-[1.35rem] border border-mehr-deep/8 bg-white p-4 transition duration-300 hover:-translate-y-1 hover:border-mehr-deep/18 hover:shadow-soft sm:rounded-[1.5rem] sm:p-5";

function sectionTone(index) {
 return index % 2 === 0 ? "bg-white" : "bg-mehr-panel/40";
}

function NumberBadge({ n }) {
 return (
 <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-mehr-panel font-sans text-[11px] font-semibold tabular-nums text-mehr-deep shadow-soft transition group-hover:bg-mehr-deep group-hover:text-white">
 {String(n).padStart(2, "0")}
 </span>
 );
}

function IconAccent({ icon }) {
 const IconComp = icon;
 return (
 <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-mehr-panel text-mehr-deep shadow-soft transition group-hover:bg-mehr-deep group-hover:text-white">
 <IconComp size={16} strokeWidth={1.85} />
 </span>
 );
}

function PointChips({ points }) {
 if (!points?.length) return null;
 return (
 <div className="mt-3 flex flex-wrap gap-1.5">
 {points.map((point) => (
 <span
 key={point}
 className="rounded-full border border-mehr-deep/10 bg-mehr-panel/80 px-2.5 py-1 text-[11px] font-medium text-mehr-mist"
 >
 {point}
 </span>
 ))}
 </div>
 );
}

function GridCards({ items, columns = "sm:grid-cols-2 lg:grid-cols-3", showDesc = true }) {
 return (
 <RevealStagger className={`mt-8 grid gap-3.5 ${columns}`} stagger={0.05}>
 {items.map((item, i) => {
 const Icon = GRID_ICONS[i % GRID_ICONS.length];
 return (
 <RevealItem key={item.title || item.step || i}>
 <div className={cardBase}>
 <div className="flex items-start justify-between gap-3">
 <IconAccent icon={Icon} />
 <NumberBadge n={i + 1} />
 </div>
 <h3 className="mt-3.5 font-sans text-[15px] font-semibold leading-snug text-mehr-ink sm:text-base">
 {item.title}
 </h3>
 {showDesc && item.desc && (
 <p className="mt-2 text-[13px] leading-relaxed text-mehr-mist sm:text-sm">
 {item.desc}
 </p>
 )}
 {item.points && <PointChips points={item.points} />}
 {item.support && (
 <div className="mt-3">
 <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-mehr-muted">
 Support can include
 </p>
 <PointChips
 points={item.support
 .split("•")
 .map((s) => s.trim())
 .filter(Boolean)}
 />
 </div>
 )}
 </div>
 </RevealItem>
 );
 })}
 </RevealStagger>
 );
}

function IntroVisual({ page }) {
 const reduce = useReducedMotion();
 const checklist =
 page.tasks?.items?.slice(0, 4).map((i) => i.title) ||
 page.capabilities?.items?.slice(0, 4).map((i) => i.title) ||
 page.expertise?.items?.slice(0, 4).map((i) => i.title) ||
 page.services?.items?.slice(0, 4).map((i) => i.title) ||
 page.steps?.items?.slice(0, 4).map((i) => i.title) ||
 page.cycle?.items?.slice(0, 4).map((i) => i.title) ||
 [];

 const cycleItems =
 page.steps?.items?.slice(0, 4) ||
 page.cycle?.items?.slice(0, 4) ||
 checklist.map((title, i) => ({
 step: String(i + 1).padStart(2, "0"),
 title,
 }));

 const [active, setActive] = useState(0);

 useEffect(() => {
 if (reduce || cycleItems.length === 0) return undefined;
 const id = window.setInterval(() => {
 setActive((i) => (i + 1) % cycleItems.length);
 }, CYCLE_MS);
 return () => window.clearInterval(id);
 }, [reduce, cycleItems.length]);

 return (
 <div className="relative overflow-hidden rounded-[1.5rem] border border-mehr-deep/10 bg-mehr-panel p-4 sm:rounded-[1.75rem] sm:p-6">
 <div
 aria-hidden
 className="pointer-events-none absolute -right-8 -top-8 h-36 w-36 rounded-full bg-mehr-deep/10 blur-2xl"
 />
 <div className="relative flex items-center justify-between gap-3">
 <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-mehr-muted">
 At a glance
 </p>
 <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-mehr-deep shadow-soft">
 <RefreshCw size={14} />
 </span>
 </div>

 <ul className="relative mt-5 space-y-2.5">
 {cycleItems.map((item, i) => {
 const on = active === i;
 return (
 <li key={`${item.step}-${item.title}`}>
 <Motion.div
 className={`flex items-start gap-3 rounded-[1.1rem] border px-3.5 py-3 transition ${
 on
 ? "border-mehr-deep/20 bg-white shadow-soft"
 : "border-transparent bg-white/50"
 }`}
 animate={on && !reduce ? { x: [0, 2, 0] } : undefined}
 transition={{ duration: 0.45, ease }}
 >
 <span
 className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold ${
 on ? "bg-mehr-deep text-white" : "bg-mehr-deep/10 text-mehr-deep"
 }`}
 >
 {item.step || String(i + 1).padStart(2, "0")}
 </span>
 <div className="min-w-0">
 <p
 className={`font-sans text-sm font-semibold leading-snug ${
 on ? "text-mehr-ink" : "text-mehr-mist"
 }`}
 >
 {item.title}
 </p>
 {item.desc && on && (
 <p className="mt-1 text-[12px] leading-relaxed text-mehr-mist line-clamp-2">
 {item.desc}
 </p>
 )}
 </div>
 {on && (
 <CheckCircle2
 size={15}
 className="mt-0.5 ml-auto shrink-0 text-mehr-deep"
 strokeWidth={2}
 />
 )}
 </Motion.div>
 </li>
 );
 })}
 </ul>

 {!reduce && cycleItems.length > 0 && (
 <Motion.span
 key={active}
 className="mt-4 block h-0.5 origin-left rounded-full bg-mehr-deep/40"
 initial={{ scaleX: 0 }}
 animate={{ scaleX: 1 }}
 transition={{ duration: CYCLE_MS / 1000, ease: "linear" }}
 />
 )}
 </div>
 );
}

function ProcessStrip({ items }) {
 const reduce = useReducedMotion();
 const [active, setActive] = useState(0);

 useEffect(() => {
 if (reduce || items.length === 0) return undefined;
 const id = window.setInterval(() => {
 setActive((i) => (i + 1) % items.length);
 }, CYCLE_MS);
 return () => window.clearInterval(id);
 }, [reduce, items.length]);

 return (
 <RevealStagger
 className="mt-8 -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:overflow-visible sm:px-0 md:grid-cols-3 xl:grid-cols-6"
 stagger={0.05}
 >
 {items.map((item, i) => {
 const on = active === i;
 return (
 <RevealItem key={`${item.step}-${item.title}`} className="w-[min(78vw,17rem)] shrink-0 snap-center sm:w-auto sm:shrink sm:snap-align-none">
 <button
 type="button"
 onMouseEnter={() => setActive(i)}
 onFocus={() => setActive(i)}
 onClick={() => setActive(i)}
 className={`group relative flex h-full w-full flex-col rounded-[1.35rem] border p-4 text-left transition duration-300 outline-none focus-visible:ring-2 focus-visible:ring-mehr-deep/30 sm:rounded-[1.5rem] sm:p-5 ${
 on
 ? "border-mehr-deep/25 bg-mehr-deep text-white shadow-float"
 : "border-mehr-deep/8 bg-white text-mehr-ink hover:-translate-y-0.5 hover:border-mehr-deep/18 hover:shadow-soft"
 }`}
 >
 {i < items.length - 1 && (
 <span
 aria-hidden
 className={`pointer-events-none absolute -right-2 top-1/2 z-10 hidden h-px w-4 -translate-y-1/2 xl:block ${
 on ? "bg-white/35" : "bg-mehr-deep/20"
 }`}
 />
 )}
 <span
 className={`font-sans text-[clamp(1.75rem,3vw,2.35rem)] font-semibold tabular-nums leading-none tracking-tight ${
 on ? "text-white/35" : "text-mehr-deep/25"
 }`}
 >
 {item.step || String(i + 1).padStart(2, "0")}
 </span>
 <h3
 className={`mt-3 font-sans text-[15px] font-semibold sm:text-base ${
 on ? "text-white" : "text-mehr-ink"
 }`}
 >
 {item.title}
 </h3>
 <p
 className={`mt-2 text-[13px] leading-relaxed sm:text-sm ${
 on ? "text-white/75" : "text-mehr-mist"
 }`}
 >
 {item.desc}
 </p>
 {on && !reduce && (
 <Motion.span
 key={`bar-${active}`}
 className="mt-4 block h-0.5 origin-left rounded-full bg-white/70"
 initial={{ scaleX: 0 }}
 animate={{ scaleX: 1 }}
 transition={{ duration: CYCLE_MS / 1000, ease: "linear" }}
 />
 )}
 </button>
 </RevealItem>
 );
 })}
 </RevealStagger>
 );
}

export default function ServiceDetailPage({
 seoData,
 page,
 excludePath,
 contactPath = "/contact",
 hero,
}) {
 let sectionIndex = 0;
 const nextTone = () => sectionTone(sectionIndex++);

 const heroImage = HERO_IMAGES[excludePath];
 const crumbLabel = page.hero.title.split(/[.,]/)[0].trim();

 return (
 <>
 <PageSEO {...seoData} />
 <ServiceNav currentPath={excludePath} />
 {hero || (
 <PageHero
 title={page.hero.title}
 body={page.hero.body.join(" ")}
 crumbs={["Services", crumbLabel]}
 cta={page.hero.cta}
 ctaPath={contactPath}
 image={heroImage}
 />
 )}

 {page.intro && (
 <section className={`section-pad ${nextTone()}`}>
 <div className="container-mehr page-gutter sm:px-3 md:px-4 lg:px-5">
 <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
 <Reveal className="text-center lg:text-left">
 <h2 className="mx-auto max-w-[18ch] font-sans text-[clamp(1.45rem,6.2vw,2.35rem)] font-semibold leading-[1.12] tracking-tight text-mehr-ink lg:mx-0">
 {page.intro.title}
 </h2>
 {page.intro.subtitle && (
 <p className="mt-2 text-sm font-semibold text-mehr-deep">
 {page.intro.subtitle}
 </p>
 )}
 {page.intro.body.map((p) => (
 <p
 key={p.slice(0, 40)}
 className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-mehr-mist sm:text-[15px] lg:mx-0"
 >
 {p}
 </p>
 ))}
 {page.hero.cta && (
 <div className="mt-7 flex justify-center lg:justify-start">
 <SpecularButton
 to={contactPath}
 variant="brand"
 size="md"
 className="w-full justify-center sm:w-auto"
 >
 {page.hero.cta}
 <ArrowUpRight size={15} />
 </SpecularButton>
 </div>
 )}
 </Reveal>
 <Reveal delay={0.1}>
 <IntroVisual page={page} />
 </Reveal>
 </div>
 </div>
 </section>
 )}

 {page.tasks && (
 <section className={`section-pad ${nextTone()}`}>
 <div className="container-mehr page-gutter sm:px-3 md:px-4 lg:px-5">
 <SectionHeading title={page.tasks.title} />
 <GridCards items={page.tasks.items} showDesc={false} />
 </div>
 </section>
 )}

 {page.expertise && (
 <section className={`section-pad ${nextTone()}`}>
 <div className="container-mehr page-gutter sm:px-3 md:px-4 lg:px-5">
 <SectionHeading title={page.expertise.title} />
 <GridCards items={page.expertise.items} />
 </div>
 </section>
 )}

 {page.capabilities && (
 <section className={`section-pad ${nextTone()}`}>
 <div className="container-mehr page-gutter sm:px-3 md:px-4 lg:px-5">
 <SectionHeading title={page.capabilities.title} />
 <GridCards items={page.capabilities.items} />
 </div>
 </section>
 )}

 {page.services && (
 <section className={`section-pad ${nextTone()}`}>
 <div className="container-mehr page-gutter sm:px-3 md:px-4 lg:px-5">
 <SectionHeading title={page.services.title} />
 <GridCards
 items={page.services.items}
 columns="sm:grid-cols-2 lg:grid-cols-3"
 />
 </div>
 </section>
 )}

 {page.duration && (
 <section className={`section-pad ${nextTone()}`}>
 <div className="container-mehr page-gutter sm:px-3 md:px-4 lg:px-5">
 <SectionHeading title={page.duration.title} />
 <RevealStagger className="mt-8 grid gap-4 sm:grid-cols-3" stagger={0.07}>
 {page.duration.items.map((item, i) => (
 <RevealItem key={item.label}>
 <div
 className={`relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border p-4 text-center transition duration-300 hover:-translate-y-1 sm:rounded-[1.75rem] sm:p-7 ${
 i === 1
 ? "border-mehr-deep/25 bg-mehr-deep text-white shadow-float"
 : "border-mehr-deep/10 bg-white text-mehr-ink hover:border-mehr-deep/20 hover:shadow-soft"
 }`}
 >
 <p
 className={`font-sans text-[clamp(1.45rem,6.2vw,2.1rem)] font-semibold tracking-tight ${
 i === 1 ? "text-white" : "text-mehr-ink"
 }`}
 >
 {item.label}
 </p>
 <p
 className={`mt-3 text-sm leading-relaxed ${
 i === 1 ? "text-white/80" : "text-mehr-mist"
 }`}
 >
 {item.desc}
 </p>
 <span
 className={`mx-auto mt-5 flex h-9 w-9 items-center justify-center rounded-full ${
 i === 1 ? "bg-white/15 text-white" : "bg-mehr-panel text-mehr-deep"
 }`}
 >
 <CalendarDays size={16} />
 </span>
 </div>
 </RevealItem>
 ))}
 </RevealStagger>
 {page.duration.note && (
 <p className="mt-6 text-center text-xs text-mehr-muted">{page.duration.note}</p>
 )}
 </div>
 </section>
 )}

 {page.scenarios && (
 <section className={`section-pad ${nextTone()}`}>
 <div className="container-mehr page-gutter sm:px-3 md:px-4 lg:px-5">
 <SectionHeading title={page.scenarios.title} />
 <RevealStagger className="mt-8 grid gap-3.5 sm:grid-cols-2" stagger={0.04}>
 {page.scenarios.items.map((item) => (
 <RevealItem key={item}>
 <div className="flex h-full gap-3.5 rounded-[1.35rem] border border-mehr-deep/8 bg-white px-4 py-4 transition duration-300 hover:-translate-y-0.5 hover:border-mehr-deep/18 hover:shadow-soft sm:rounded-[1.5rem] sm:px-5 sm:py-5">
 <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-mehr-panel text-mehr-deep">
 <Quote size={14} strokeWidth={2} />
 </span>
 <p className="text-sm leading-relaxed text-mehr-mist">{item}</p>
 </div>
 </RevealItem>
 ))}
 </RevealStagger>
 </div>
 </section>
 )}

 {page.model && (
 <section className={`section-pad ${nextTone()}`}>
 <div className="container-mehr page-gutter sm:px-3 md:px-4 lg:px-5">
 <SectionHeading eyebrow={page.model.title} title={page.model.subtitle} />
 <GridCards items={page.model.items} columns="sm:grid-cols-2" />
 </div>
 </section>
 )}

 {page.steps && (
 <section className={`section-pad ${nextTone()}`}>
 <div className="container-mehr page-gutter sm:px-3 md:px-4 lg:px-5">
 <SectionHeading
 eyebrow={page.steps.eyebrow}
 title={page.steps.title}
 />
 <ProcessStrip items={page.steps.items} />
 </div>
 </section>
 )}

 {page.cycle && (
 <section className={`section-pad ${nextTone()}`}>
 <div className="container-mehr page-gutter sm:px-3 md:px-4 lg:px-5">
 <SectionHeading eyebrow={page.cycle.title} title={page.cycle.subtitle} />
 <ProcessStrip items={page.cycle.items} />
 </div>
 </section>
 )}

 {page.audiences && (
 <section className={`section-pad ${nextTone()}`}>
 <div className="container-mehr page-gutter sm:px-3 md:px-4 lg:px-5">
 <SectionHeading title={page.audiences.title} />
 <GridCards items={page.audiences.items} columns="sm:grid-cols-2" />
 </div>
 </section>
 )}

 {page.complexity && (
 <section className={`section-pad ${nextTone()}`}>
 <div className="container-mehr page-gutter sm:px-3 md:px-4 lg:px-5">
 <SectionHeading title={page.complexity.title} />
 <GridCards items={page.complexity.items} />
 </div>
 </section>
 )}

 {page.benefits && (
 <section className={`section-pad ${nextTone()}`}>
 <div className="container-mehr page-gutter sm:px-3 md:px-4 lg:px-5">
 <SectionHeading title={page.benefits.title} />
 <GridCards items={page.benefits.items} />
 </div>
 </section>
 )}

 {page.deliverables && (
 <section className={`section-pad ${nextTone()}`}>
 <div className="container-mehr page-gutter sm:px-3 md:px-4 lg:px-5">
 <SectionHeading title={page.deliverables.title} />
 <GridCards items={page.deliverables.items} columns="sm:grid-cols-2" />
 </div>
 </section>
 )}

 {page.disclaimer && (
 <p className="page-gutter container-mehr pb-8 text-center text-xs text-mehr-muted sm:px-3 md:px-4 lg:px-5">
 {page.disclaimer}
 </p>
 )}

 <ExploreOtherServices excludePath={excludePath} />

 {page.finalCta && (
 <CTABanner
 eyebrow=""
 title={page.finalCta.title}
 body={page.finalCta.desc}
 cta={page.finalCta.cta}
 ctaPath={contactPath}
 />
 )}
 </>
 );
}
