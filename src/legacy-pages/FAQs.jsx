"use client";

import { faqSections, faqsContent, seo, ctas } from "../data/content";
import PageSEO from "../components/ui/PageSEO";
import PageHero from "../components/ui/PageHero";
import Accordion from "../components/ui/Accordion";
import CTABanner from "../components/ui/CTABanner";
import Reveal from "../components/ui/Reveal";

export default function FAQs() {
 const { hero, finalCta } = faqsContent;

 return (
 <>
 <PageSEO {...seo.faqs} path="/faqs" />
 <PageHero
 eyebrow="FAQs"
 title={hero.title}
 body={hero.body}
 crumbs={["FAQs"]}
 cta={ctas.primary}
 ctaPath="/contact"
 secondaryCta={ctas.exploreServices}
 secondaryPath="/services"
 />

 <section className="section-pad relative bg-white">
 <div className="container-mehr page-gutter sm:px-3 md:px-4 lg:px-5">
 <div className="grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-12 xl:gap-16">
 {/* Sticky section nav, desktop */}
 <aside className="hidden lg:block">
 <div className="sticky top-28">
 <nav className="flex flex-col gap-1.5" aria-label="FAQ sections">
 {faqSections.map((section, i) => (
 <a
 key={section.id}
 href={`#${section.id}`}
 className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-mehr-mist transition hover:bg-mehr-panel hover:text-mehr-ink"
 >
 <span className="font-sans text-[11px] font-semibold tabular-nums text-mehr-muted group-hover:text-mehr-deep">
 {String(i + 1).padStart(2, "0")}
 </span>
 <span className="leading-snug">{section.title}</span>
 </a>
 ))}
 </nav>
 </div>
 </aside>

 {/* Accordion panels */}
 <div className="min-w-0 space-y-6 sm:space-y-8">
 {/* Mobile section jump */}
 <div className="flex gap-2 overflow-x-auto pb-1 lg:hidden">
 {faqSections.map((section) => (
 <a
 key={`m-${section.id}`}
 href={`#${section.id}`}
 className="shrink-0 rounded-full border border-mehr-deep/12 bg-mehr-panel/60 px-3.5 py-1.5 text-[12px] font-semibold text-mehr-deep transition hover:border-mehr-deep/25 hover:bg-white"
 >
 {section.title}
 </a>
 ))}
 </div>

 {faqSections.map((section, i) => {
 const alt = i % 2 === 1;
 return (
 <Reveal key={section.id} delay={0.04 * i}>
 <div
 id={section.id}
 className={`scroll-mt-28 overflow-hidden rounded-[1.5rem] border border-mehr-deep/8 sm:rounded-[1.75rem] ${
 alt ? "bg-mehr-panel/60" : "bg-white shadow-soft"
 }`}
 >
 <div className="border-b border-mehr-deep/8 px-5 py-5 sm:px-7 sm:py-6">
 <div className="flex items-center gap-3">
 <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-mehr-deep font-sans text-[11px] font-semibold tabular-nums text-white">
 {String(i + 1).padStart(2, "0")}
 </span>
 <h2 className="font-sans text-lg font-semibold tracking-tight text-mehr-ink sm:text-xl">
 {section.title}
 </h2>
 </div>
 </div>
 <div className="px-5 sm:px-7">
 <Accordion items={section.items} />
 </div>
 </div>
 </Reveal>
 );
 })}
 </div>
 </div>
 </div>
 </section>

 <CTABanner
 eyebrow=""
 title={finalCta.title}
 body={finalCta.desc}
 cta={finalCta.cta}
 />
 </>
 );
}
