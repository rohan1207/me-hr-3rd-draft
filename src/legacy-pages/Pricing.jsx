"use client";

import { useState } from "react";
import { Link } from "@/components/compat/router";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, ChevronRight } from "lucide-react";
import {
  pricingModels,
  pricingContent,
  faqSections,
  caseStudies,
  seo,
  ctas,
} from "../data/content";
import PageSEO from "../components/ui/PageSEO";
import SpecularButton from "../components/ui/SpecularButton";
import Accordion from "../components/ui/Accordion";
import Reveal from "../components/ui/Reveal";

const ease = [0.22, 1, 0.36, 1];
const QUOTE = ctas.getAQuote;

function cardFeatures(model) {
  if (model.id === "on-demand" && model.tiers?.length) {
    return model.tiers.map((t) => `${t.label}, ${t.desc}`);
  }
  if (model.id === "retainership") {
    return [
      "Ongoing HR support matched to your workforce and ownership needs",
      "Flexible on-site or off-site delivery",
      "Senior oversight where deeper experience is required",
      "Scoped around organisation size and HR priorities",
    ];
  }
  if (model.id === "strategic") {
    return [
      "Project-based expertise for defined HR challenges",
      "Support for audits, organisation design and performance systems",
      "Clear deliverables based on scope, duration and stakeholders",
    ];
  }
  if (model.id === "pagar") {
    return [
      "Payroll outsourcing that scales with employee strength",
      "Statutory compliance support across locations",
      "Handles payroll complexity and contractor workforce where applicable",
    ];
  }
  if (model.note) return [model.note];
  return [model.desc];
}

const FAQ_PREVIEW = faqSections[0].items.slice(0, 5);

const OUTCOMES = caseStudies
  .filter((c) => c.outcome)
  .slice(0, 4)
  .map((c) => ({
    id: c.id,
    industry: c.industry,
    title: c.title,
    body: c.outcome,
  }));

function PricingHero() {
  const reduce = useReducedMotion();
  const { hero, subtitle } = pricingContent;

  return (
    <section className="relative overflow-hidden bg-white pt-7 pb-5 sm:pt-16 sm:pb-8 lg:pt-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_-10%,rgba(20,196,173,0.14),transparent_55%)]"
      />
      <div className="container-mehr page-gutter relative z-10 sm:px-3 md:px-4 lg:px-5">
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="eyebrow"
          >
            Pricing
          </motion.p>
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06, duration: 0.65, ease }}
            className="mt-2.5 font-sans text-[clamp(1.7rem,7vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.04em] text-mehr-ink sm:mt-3 sm:leading-[1.05]"
          >
            {hero.title}
          </motion.h1>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.55, ease }}
            className="mx-auto mt-3.5 max-w-xl text-[13px] leading-relaxed text-mehr-mist sm:mt-4 sm:text-sm sm:text-[15px]"
          >
            {hero.body}
          </motion.p>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.5, ease }}
            className="mt-4 text-[13px] font-semibold text-mehr-deep sm:mt-5 sm:text-sm"
          >
            {subtitle}
          </motion.p>
        </div>
      </div>
    </section>
  );
}

function PlanCard({ model, index, featured, selected, onSelect }) {
  const reduce = useReducedMotion();
  const features = cardFeatures(model);

  return (
    <motion.article
      layout
      role="button"
      tabIndex={0}
      onClick={() => onSelect(model.id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(model.id);
        }
      }}
      whileHover={reduce ? undefined : { y: -8, scale: 1.015 }}
      whileTap={reduce ? undefined : { scale: 0.985 }}
      transition={{ type: "spring", stiffness: 380, damping: 28 }}
      className={`group relative flex h-full cursor-pointer flex-col rounded-[1.35rem] border p-4 outline-none sm:rounded-[1.75rem] sm:p-6 ${
        selected || featured
          ? "border-mehr-deep/35 bg-white shadow-float ring-2 ring-mehr-deep/20"
          : "border-mehr-deep/8 bg-mehr-panel/55 shadow-soft hover:border-mehr-deep/18 hover:bg-white"
      }`}
    >
      {featured && (
        <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-mehr-deep px-3 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
          Popular
        </span>
      )}

      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-mehr-deep sm:text-[11px]">
            {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-1.5 font-sans text-lg font-semibold tracking-[-0.02em] text-mehr-ink sm:text-xl sm:text-[1.35rem]">
            {model.title}
          </h3>
        </div>
        <motion.span
          className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${
            selected
              ? "border-mehr-deep bg-mehr-deep text-white"
              : "border-mehr-deep/15 bg-white text-mehr-deep"
          }`}
          animate={reduce || !selected ? undefined : { scale: [1, 1.12, 1] }}
          transition={{ duration: 0.35 }}
        >
          <Check size={14} strokeWidth={2.4} />
        </motion.span>
      </div>

      <p className="mt-2.5 text-[13px] leading-relaxed text-mehr-mist sm:mt-3 sm:text-sm">
        {model.desc}
      </p>

      <div className="mt-4 sm:mt-5">
        <Link
          to="/contact"
          onClick={(e) => e.stopPropagation()}
          className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition active:scale-[0.98] ${
            featured || selected
              ? "bg-mehr-deep text-white shadow-float hover:bg-mehr-charcoal"
              : "border border-mehr-deep/15 bg-white text-mehr-ink hover:border-mehr-deep/35"
          }`}
        >
          {QUOTE}
          <ArrowUpRight size={15} />
        </Link>
      </div>

      <div className="mt-5 border-t border-mehr-deep/8 pt-4 sm:mt-6 sm:pt-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-mehr-muted sm:text-[11px]">
          What you get
        </p>
        <ul className="mt-2.5 space-y-2 sm:mt-3 sm:space-y-2.5">
          {features.map((line) => (
            <li
              key={line}
              className="flex gap-2.5 text-[12px] leading-relaxed text-mehr-mist sm:text-[13px]"
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mehr-panel text-mehr-deep">
                <Check size={12} strokeWidth={2.5} />
              </span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>

      {model.path && model.path !== "/contact" && (
        <Link
          to={model.path}
          onClick={(e) => e.stopPropagation()}
          className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-mehr-deep transition hover:gap-2.5 sm:pt-5"
        >
          Learn more
          <ChevronRight size={14} />
        </Link>
      )}
    </motion.article>
  );
}

function OutcomeCard({ item, highlight, reduce }) {
  return (
    <motion.article
      whileHover={reduce ? undefined : { y: -4 }}
      className={`flex h-full flex-col rounded-[1.25rem] border p-4 sm:rounded-[1.5rem] sm:p-6 ${
        highlight
          ? "border-mehr-deep/25 bg-mehr-deep text-white shadow-float"
          : "border-mehr-deep/8 bg-white shadow-soft"
      }`}
    >
      <p
        className={`text-[10px] font-semibold uppercase tracking-[0.12em] sm:text-[11px] ${
          highlight ? "text-white/70" : "text-mehr-deep"
        }`}
      >
        {item.industry}
      </p>
      <p
        className={`mt-2.5 text-[13px] font-semibold leading-snug tracking-tight sm:mt-3 sm:text-sm ${
          highlight ? "text-white" : "text-mehr-ink"
        }`}
      >
        {item.title}
      </p>
      <p
        className={`mt-2.5 text-[13px] leading-relaxed sm:mt-3 sm:text-sm ${
          highlight ? "text-white/80" : "text-mehr-mist"
        }`}
      >
        {item.body}
      </p>
      <Link
        to="/case-studies"
        className={`mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold transition hover:gap-2 sm:pt-5 ${
          highlight ? "text-white" : "text-mehr-deep"
        }`}
      >
        {ctas.readCaseStudy}
        <ArrowUpRight size={14} />
      </Link>
    </motion.article>
  );
}

export default function Pricing() {
  const reduce = useReducedMotion();
  const { finalCta } = pricingContent;
  const [selected, setSelected] = useState("retainership");

  return (
    <>
      <PageSEO {...seo.pricing} path="/pricing" />
      <PricingHero />

      <section className="relative bg-white pb-8 sm:pb-14 lg:pb-16">
        <div className="container-mehr page-gutter sm:px-3 md:px-4 lg:px-5">
          <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 xl:grid-cols-4 [&::-webkit-scrollbar]:hidden">
            {pricingModels.map((model, i) => (
              <div
                key={model.id}
                className="w-[82vw] max-w-[300px] shrink-0 snap-center pt-3 sm:w-auto sm:max-w-none sm:shrink sm:pt-2.5"
              >
                <PlanCard
                  model={model}
                  index={i}
                  featured={model.id === "retainership"}
                  selected={selected === model.id}
                  onSelect={setSelected}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-8 sm:py-14 lg:py-16">
        <div className="container-mehr page-gutter sm:px-3 md:px-4 lg:px-5">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Proof in practice</p>
            <h2 className="mt-2.5 font-sans text-[clamp(1.5rem,6.5vw,2.6rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-mehr-ink sm:mt-3">
              Outcomes from recent engagements
            </h2>
          </Reveal>
          <div className="-mx-4 mt-7 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:mt-10 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4 [&::-webkit-scrollbar]:hidden">
            {OUTCOMES.map((item, i) => (
              <div
                key={item.id}
                className="w-[78vw] max-w-[280px] shrink-0 snap-center sm:w-auto sm:max-w-none sm:shrink"
              >
                <OutcomeCard item={item} highlight={i === 1} reduce={reduce} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mehr-panel/35 py-8 sm:py-14 lg:py-16">
        <div className="container-mehr page-gutter sm:px-3 md:px-4 lg:px-5">
          <div className="grid gap-7 sm:gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
            <Reveal className="text-center lg:text-left">
              <p className="eyebrow">FAQs</p>
              <h2 className="mx-auto mt-2.5 max-w-[14ch] font-sans text-[clamp(1.5rem,6.5vw,2.6rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-mehr-ink sm:mt-3 lg:mx-0">
                Your questions, answered
              </h2>
              <p className="mx-auto mt-3 max-w-md text-[13px] leading-relaxed text-mehr-mist sm:mt-4 sm:text-sm lg:mx-0">
                {faqSections[0].title}. Common questions about working with me-HR.
              </p>
              <Link
                to="/faqs"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border border-mehr-deep/15 bg-white px-5 py-2.5 text-sm font-semibold text-mehr-ink transition hover:border-mehr-deep/30 sm:mt-7 sm:w-auto"
              >
                Read more questions
                <ArrowUpRight size={14} className="text-mehr-deep" />
              </Link>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="rounded-[1.25rem] border border-mehr-deep/8 bg-white px-3.5 shadow-soft sm:rounded-[1.75rem] sm:px-6">
                <Accordion items={FAQ_PREVIEW} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-mehr-ink py-10 sm:py-16 lg:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_70%_40%,rgba(20,196,173,0.28),transparent_55%)]"
        />
        <div className="container-mehr page-gutter relative z-10 sm:px-3 md:px-4 lg:px-5">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-sans text-[clamp(1.5rem,6.5vw,2.85rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-white">
              {finalCta.title}
            </h2>
            <p className="mx-auto mt-3.5 max-w-lg text-[13px] leading-relaxed text-white/70 sm:mt-4 sm:text-sm sm:text-[15px]">
              {finalCta.desc}
            </p>
            <div className="mt-6 flex justify-center sm:mt-8">
              <SpecularButton
                to="/contact"
                variant="brand"
                size="lg"
                className="w-full justify-center sm:w-auto"
              >
                {QUOTE}
                <ArrowUpRight size={16} />
              </SpecularButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
