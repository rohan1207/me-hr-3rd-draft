"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, MapPin, Users } from "lucide-react";
import { caseStudies, caseStudiesContent, seo, ctas } from "../data/content";
import { photoAt } from "../data/images";
import PageSEO from "../components/ui/PageSEO";
import CTABanner from "../components/ui/CTABanner";
import SpecularButton from "../components/ui/SpecularButton";
import Reveal, { RevealItem, RevealStagger } from "../components/ui/Reveal";

const ease = [0.22, 1, 0.36, 1];

function truncate(text, n = 100) {
  if (!text) return "";
  if (text.length <= n) return text;
  return `${text.slice(0, n).trim()}…`;
}

function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-white text-mehr-ink">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-mesh-teal opacity-60"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_0%_0%,rgba(20,196,173,0.12),transparent_55%),radial-gradient(ellipse_45%_40%_at_100%_80%,rgba(11,95,88,0.08),transparent_50%)]"
      />

      <div className="container-mehr page-gutter relative z-10 py-10 sm:px-3 sm:py-12 md:px-4 lg:px-5 lg:py-14">
        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease }}
          >
            <p className="text-[12px] font-medium text-mehr-mist">
              Home <span className="mx-1.5 text-mehr-muted">/</span>
              <span className="font-semibold text-mehr-deep">Case Studies</span>
            </p>
            <p className="eyebrow mt-4">Impact stories</p>
            <h1 className="mt-3 max-w-[16ch] font-sans text-[clamp(2rem,4.4vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-mehr-ink">
              {caseStudiesContent.hero.title}
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-mehr-mist sm:text-[15px]">
              {caseStudiesContent.hero.body}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <SpecularButton to="/contact" variant="brand" size="md">
                {ctas.discussChallenge}
                <ArrowUpRight size={14} />
              </SpecularButton>
              <SpecularButton to="/case-studies#stories" variant="light" size="md">
                Browse stories
              </SpecularButton>
            </div>

            <div className="mt-9 flex flex-wrap gap-6 border-t border-mehr-deep/10 pt-6 sm:gap-10">
              {[
                { v: String(caseStudies.length), l: "Case studies" },
                {
                  v: `${new Set(caseStudies.map((c) => c.industry).filter(Boolean)).size}+`,
                  l: "Industries",
                },
                { v: "C→I→O", l: "Impact frame" },
              ].map((s) => (
                <div key={s.l}>
                  <p className="font-sans text-2xl font-semibold tracking-[-0.03em] text-mehr-deep">
                    {s.v}
                  </p>
                  <p className="mt-0.5 text-[12px] text-mehr-mist">{s.l}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="grid grid-cols-2 gap-3"
          >
            <div className="overflow-hidden rounded-[1.35rem] shadow-soft sm:rounded-[1.5rem]">
              <img
                src={photoAt(1)}
                alt=""
                className="aspect-[4/5] h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-3">
              <div className="overflow-hidden rounded-[1.35rem] shadow-soft sm:rounded-[1.5rem]">
                <img
                  src={photoAt(0)}
                  alt=""
                  className="aspect-[5/4] w-full object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col justify-end rounded-[1.35rem] bg-mehr-deep p-4 text-white shadow-soft sm:rounded-[1.5rem] sm:p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/70">
                  What changed
                </p>
                <p className="mt-2 font-sans text-sm font-semibold leading-snug">
                  Clearer people processes. Stronger business outcomes.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FeaturedCase({ cs, image }) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      whileHover={reduce ? undefined : { y: -2 }}
      className="overflow-hidden rounded-[1.6rem] bg-white shadow-float sm:rounded-[1.85rem]"
    >
      <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative min-h-[220px] lg:min-h-full">
          <img
            src={image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-mehr-ink/50 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-mehr-ink/10" />
          <div className="absolute left-4 top-4 sm:left-5 sm:top-5">
            <span className="rounded-full bg-mehr-deep px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
              Featured
            </span>
          </div>
        </div>

        <div className="flex flex-col p-5 sm:p-7 lg:p-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-mehr-deep">
            {cs.industry}
          </p>
          <h2 className="mt-2 max-w-[22ch] font-sans text-[clamp(1.25rem,2.4vw,1.75rem)] font-semibold leading-snug tracking-[-0.03em] text-mehr-ink">
            {cs.title}
          </h2>
          {(cs.workforce || cs.scope) && (
            <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-mehr-mist">
              {cs.workforce && (
                <span className="inline-flex items-center gap-1.5">
                  <Users size={12} className="text-mehr-deep" />
                  {cs.workforce}
                </span>
              )}
              {cs.scope && (
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={12} className="text-mehr-deep" />
                  {cs.scope}
                </span>
              )}
            </p>
          )}

          <div className="mt-5 grid gap-2.5 sm:grid-cols-3">
            {[
              { label: "Challenge", text: cs.challenge },
              { label: "Intervention", text: cs.intervention },
              { label: "Outcome", text: cs.outcome, hot: true },
            ]
              .filter((b) => b.text)
              .map((b) => (
                <div
                  key={b.label}
                  className={`rounded-[1.1rem] p-3.5 ${
                    b.hot ? "bg-mehr-deep text-white" : "bg-mehr-panel"
                  }`}
                >
                  <p
                    className={`text-[10px] font-semibold uppercase tracking-[0.12em] ${
                      b.hot ? "text-white/65" : "text-mehr-deep"
                    }`}
                  >
                    {b.label}
                  </p>
                  <p
                    className={`mt-1.5 text-[12px] leading-relaxed ${
                      b.hot ? "text-white/90" : "text-mehr-mist"
                    }`}
                  >
                    {truncate(b.text, 90)}
                  </p>
                </div>
              ))}
          </div>

          <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-6">
            <div className="flex flex-wrap gap-1.5">
              {cs.tags?.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-mehr-panel px-2.5 py-1 text-[10px] font-semibold text-mehr-mist"
                >
                  {tag}
                </span>
              ))}
            </div>
            <SpecularButton to="/contact" variant="brand" size="sm">
              {caseStudiesContent.readCta}
              <ArrowUpRight size={13} />
            </SpecularButton>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function StoryCard({ cs, image, index }) {
  const reduce = useReducedMotion();
  const hasOutcome = Boolean(cs.outcome);

  return (
    <motion.article
      whileHover={reduce ? undefined : { y: -4 }}
      transition={{ type: "spring", stiffness: 380, damping: 28 }}
      className="group flex h-full flex-col overflow-hidden rounded-[1.45rem] bg-white shadow-soft ring-1 ring-mehr-deep/8 sm:rounded-[1.6rem]"
    >
      <div className="relative h-40 overflow-hidden sm:h-44">
        <img
          src={image}
          alt=""
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-mehr-ink/45 via-transparent to-transparent" />
        <span className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg bg-white/95 font-sans text-[11px] font-semibold tabular-nums text-mehr-deep shadow-soft">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="absolute bottom-3 left-3 right-3 truncate text-[11px] font-semibold uppercase tracking-[0.12em] text-white">
          {cs.industry || "Case study"}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="font-sans text-[15px] font-semibold leading-snug tracking-[-0.02em] text-mehr-ink sm:text-base">
          {cs.title}
        </h3>

        {hasOutcome ? (
          <div className="mt-3 rounded-[1rem] bg-mehr-panel/80 p-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-mehr-deep">
              Outcome
            </p>
            <p className="mt-1 text-[12px] leading-relaxed text-mehr-mist">
              {truncate(cs.outcome, 105)}
            </p>
          </div>
        ) : (
          <p className="mt-3 text-[13px] leading-relaxed text-mehr-mist">
            {truncate(cs.challenge, 110)}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between gap-2 pt-4">
          <div className="flex flex-wrap gap-1">
            {cs.tags?.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-mehr-panel px-2 py-0.5 text-[10px] font-medium text-mehr-mist"
              >
                {tag}
              </span>
            ))}
          </div>
          <SpecularButton to="/contact" variant="brand" size="sm">
            Details
            <ArrowUpRight size={12} />
          </SpecularButton>
        </div>
      </div>
    </motion.article>
  );
}

function Stories() {
  const industries = [
    ...new Set(caseStudies.map((c) => c.industry).filter(Boolean)),
  ];
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? caseStudies
      : caseStudies.filter((c) => c.industry === active);

  const featured =
    filtered.find((c) => c.challenge && c.intervention && c.outcome) ||
    filtered[0];
  const rest = filtered.filter((c) => c.id !== featured?.id);
  const featuredIdx = caseStudies.findIndex((c) => c.id === featured?.id);

  return (
    <section id="stories" className="scroll-mt-28 bg-mehr-panel section-pad">
      <div className="container-mehr page-gutter sm:px-3 md:px-4 lg:px-5">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <Reveal className="max-w-xl">
            <p className="eyebrow">Case library</p>
            <h2 className="mt-2 font-sans text-[clamp(1.7rem,3.4vw,2.55rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-mehr-ink">
              {caseStudiesContent.listTitle}
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="flex flex-wrap gap-2">
              {["All", ...industries].map((label) => {
                const on = active === label;
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setActive(label)}
                    className={`rounded-full px-3.5 py-1.5 text-[12px] font-semibold transition ${
                      on
                        ? "bg-mehr-deep text-white shadow-soft"
                        : "bg-white/80 text-mehr-mist ring-1 ring-mehr-deep/10 hover:text-mehr-ink"
                    }`}
                  >
                    {label === "All" ? "All industries" : label}
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>

        {featured && (
          <Reveal className="mt-8 lg:mt-10">
            <FeaturedCase cs={featured} image={photoAt(Math.max(0, featuredIdx))} />
          </Reveal>
        )}

        {rest.length > 0 && (
          <RevealStagger
            className="mt-5 grid gap-4 sm:grid-cols-2 lg:mt-6 lg:grid-cols-3 lg:gap-5"
            stagger={0.07}
          >
            {rest.map((cs, i) => {
              const idx = caseStudies.findIndex((c) => c.id === cs.id);
              return (
                <RevealItem key={cs.id}>
                  <StoryCard
                    cs={cs}
                    image={photoAt(idx >= 0 ? idx + 1 : i + 1)}
                    index={i}
                  />
                </RevealItem>
              );
            })}
          </RevealStagger>
        )}
      </div>
    </section>
  );
}

function MethodStrip() {
  const steps = [
    {
      title: "Diagnose",
      desc: "Understand the organisation, workforce reality and the gap holding growth back.",
    },
    {
      title: "Intervene",
      desc: "Design practical HR actions — process, leadership, culture or systems — that teams can run.",
    },
    {
      title: "Measure",
      desc: "Track engagement, clarity, utilisation or brand outcomes so impact stays visible.",
    },
  ];

  return (
    <section className="surface-white surface-wash relative section-pad text-mehr-ink">
      <div className="container-mehr page-gutter relative z-10 sm:px-3 md:px-4 lg:px-5">
        <Reveal>
          <p className="eyebrow">How we frame impact</p>
          <h2 className="mt-2 max-w-[18ch] font-sans text-[clamp(1.55rem,3vw,2.25rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-mehr-ink">
            Every story follows the same clarity.
          </h2>
        </Reveal>
        <RevealStagger
          className="mt-8 grid gap-3 sm:grid-cols-3 sm:gap-4"
          stagger={0.08}
        >
          {steps.map((step, i) => (
            <RevealItem key={step.title}>
              <div className="h-full rounded-[1.35rem] border border-mehr-deep/10 bg-mehr-panel/70 p-5 shadow-soft sm:rounded-[1.5rem] sm:p-6">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-mehr-deep font-sans text-[11px] font-semibold tabular-nums text-white">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-sans text-lg font-semibold tracking-[-0.02em] text-mehr-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-mehr-mist">
                  {step.desc}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}

export default function CaseStudies() {
  return (
    <>
      <PageSEO {...seo.caseStudies} path="/case-studies" />
      <Hero />
      <Stories />
      <MethodStrip />
      <CTABanner
        eyebrow="Your turn"
        title={caseStudiesContent.exploreMore}
        body={caseStudiesContent.exploreMoreBody}
        cta={ctas.discussChallenge}
      />
    </>
  );
}
