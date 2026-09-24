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

      <div className="container-mehr page-gutter relative z-10 py-7 sm:px-3 sm:py-12 md:px-4 lg:px-5 lg:py-14">
        <div className="grid items-center gap-6 sm:gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease }}
            className="text-center lg:text-left"
          >
            <p className="text-[11px] font-medium text-mehr-mist sm:text-[12px]">
              Home <span className="mx-1.5 text-mehr-muted">/</span>
              <span className="font-semibold text-mehr-deep">Case Studies</span>
            </p>
            <p className="eyebrow mt-3 sm:mt-4">Impact stories</p>
            <h1 className="mx-auto mt-2.5 max-w-[16ch] font-sans text-[clamp(1.75rem,7vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.04em] text-mehr-ink sm:mt-3 sm:leading-[1.05] lg:mx-0">
              {caseStudiesContent.hero.title}
            </h1>
            <p className="mx-auto mt-3.5 max-w-lg text-[13px] leading-relaxed text-mehr-mist sm:mt-4 sm:text-sm md:text-[15px] lg:mx-0">
              {caseStudiesContent.hero.body}
            </p>
            <div className="mt-5 flex w-full flex-col items-stretch gap-2.5 sm:mt-7 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-3 lg:justify-start">
              <SpecularButton
                to="/contact"
                variant="brand"
                size="md"
                className="w-full justify-center sm:w-auto"
              >
                {ctas.discussChallenge}
                <ArrowUpRight size={14} />
              </SpecularButton>
              <SpecularButton
                to="/case-studies#stories"
                variant="light"
                size="md"
                className="w-full justify-center sm:w-auto"
              >
                Browse stories
              </SpecularButton>
            </div>

            <div className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-3 border-t border-mehr-deep/10 pt-5 sm:mt-9 sm:gap-10 sm:pt-6 lg:justify-start">
              {[
                { v: String(caseStudies.length), l: "Case studies" },
                {
                  v: `${new Set(caseStudies.map((c) => c.industry).filter(Boolean)).size}+`,
                  l: "Industries",
                },
                { v: "C→I→O", l: "Impact frame" },
              ].map((s) => (
                <div key={s.l} className="text-center lg:text-left">
                  <p className="font-sans text-xl font-semibold tracking-[-0.03em] text-mehr-deep sm:text-2xl">
                    {s.v}
                  </p>
                  <p className="mt-0.5 text-[11px] text-mehr-mist sm:text-[12px]">{s.l}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="grid grid-cols-2 gap-2.5 sm:gap-3"
          >
            <div className="overflow-hidden rounded-[1.15rem] shadow-soft sm:rounded-[1.5rem]">
              <img
                src={photoAt(1)}
                alt=""
                className="aspect-[4/5] h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-2.5 sm:gap-3">
              <div className="overflow-hidden rounded-[1.15rem] shadow-soft sm:rounded-[1.5rem]">
                <img
                  src={photoAt(0)}
                  alt=""
                  className="aspect-[5/4] w-full object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col justify-end rounded-[1.15rem] bg-mehr-deep p-3.5 text-white shadow-soft sm:rounded-[1.5rem] sm:p-5">
                <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/70 sm:text-[10px]">
                  What changed
                </p>
                <p className="mt-1.5 font-sans text-[13px] font-semibold leading-snug sm:mt-2 sm:text-sm">
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
      className="overflow-hidden rounded-[1.35rem] bg-white shadow-float sm:rounded-[1.85rem]"
    >
      <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative min-h-[180px] sm:min-h-[220px] lg:min-h-full">
          <img
            src={image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-mehr-ink/50 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-mehr-ink/10" />
          <div className="absolute left-3 top-3 sm:left-5 sm:top-5">
            <span className="rounded-full bg-mehr-deep px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
              Featured
            </span>
          </div>
        </div>

        <div className="flex flex-col p-4 sm:p-7 lg:p-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-mehr-deep sm:text-[11px]">
            {cs.industry}
          </p>
          <h2 className="mt-2 max-w-[22ch] font-sans text-[clamp(1.15rem,4.8vw,1.75rem)] font-semibold leading-snug tracking-[-0.03em] text-mehr-ink">
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

          <div className="mt-4 grid grid-cols-1 gap-2 sm:mt-5 sm:grid-cols-3 sm:gap-2.5">
            {[
              { label: "Challenge", text: cs.challenge },
              { label: "Intervention", text: cs.intervention },
              { label: "Outcome", text: cs.outcome, hot: true },
            ]
              .filter((b) => b.text)
              .map((b) => (
                <div
                  key={b.label}
                  className={`rounded-[1rem] p-3 sm:rounded-[1.1rem] sm:p-3.5 ${
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

          <div className="mt-auto flex flex-col gap-3 pt-5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:pt-6">
            <div className="flex flex-wrap justify-center gap-1.5 sm:justify-start">
              {cs.tags?.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-mehr-panel px-2.5 py-1 text-[10px] font-semibold text-mehr-mist"
                >
                  {tag}
                </span>
              ))}
            </div>
            <SpecularButton
              to="/contact"
              variant="brand"
              size="sm"
              className="w-full justify-center sm:w-auto"
            >
              {caseStudiesContent.readCta}
              <ArrowUpRight size={13} />
            </SpecularButton>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function StoryCard({ cs, image, index, compact = false }) {
  const reduce = useReducedMotion();
  const hasOutcome = Boolean(cs.outcome);

  return (
    <motion.article
      whileHover={reduce ? undefined : { y: -4 }}
      transition={{ type: "spring", stiffness: 380, damping: 28 }}
      className={`group flex h-full flex-col overflow-hidden bg-white shadow-soft ring-1 ring-mehr-deep/8 ${
        compact
          ? "rounded-[1.05rem]"
          : "rounded-[1.25rem] sm:rounded-[1.6rem]"
      }`}
    >
      <div
        className={`relative overflow-hidden ${
          compact ? "aspect-[5/4]" : "h-36 sm:h-44"
        }`}
      >
        <img
          src={image}
          alt=""
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-mehr-ink/45 via-transparent to-transparent" />
        <span
          className={`absolute flex items-center justify-center rounded-lg bg-white/95 font-sans font-semibold tabular-nums text-mehr-deep shadow-soft ${
            compact
              ? "left-2 top-2 h-6 w-6 text-[9px]"
              : "left-3 top-3 h-8 w-8 text-[11px]"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          className={`absolute truncate font-semibold uppercase tracking-[0.12em] text-white ${
            compact
              ? "bottom-2 left-2 right-2 text-[9px]"
              : "bottom-3 left-3 right-3 text-[11px]"
          }`}
        >
          {cs.industry || "Case study"}
        </span>
      </div>

      <div
        className={`flex flex-1 flex-col ${
          compact ? "p-2.5" : "p-3.5 sm:p-5"
        }`}
      >
        <h3
          className={`font-sans font-semibold leading-snug tracking-[-0.02em] text-mehr-ink ${
            compact
              ? "line-clamp-2 text-[12px]"
              : "text-[14px] sm:text-base"
          }`}
        >
          {cs.title}
        </h3>

        {hasOutcome ? (
          <div
            className={`rounded-[0.85rem] bg-mehr-panel/80 ${
              compact ? "mt-1.5 p-2" : "mt-2.5 p-2.5 sm:mt-3 sm:p-3 sm:rounded-[1rem]"
            }`}
          >
            <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-mehr-deep sm:text-[10px]">
              Outcome
            </p>
            <p
              className={`mt-1 leading-relaxed text-mehr-mist ${
                compact ? "line-clamp-2 text-[10px]" : "text-[12px]"
              }`}
            >
              {truncate(cs.outcome, compact ? 70 : 105)}
            </p>
          </div>
        ) : (
          <p
            className={`leading-relaxed text-mehr-mist ${
              compact
                ? "mt-1.5 line-clamp-2 text-[10px]"
                : "mt-2.5 text-[12px] sm:mt-3 sm:text-[13px]"
            }`}
          >
            {truncate(cs.challenge, compact ? 70 : 110)}
          </p>
        )}

        <div
          className={`mt-auto flex flex-col ${
            compact
              ? "gap-1.5 pt-2.5"
              : "gap-2.5 pt-3.5 sm:flex-row sm:items-center sm:justify-between sm:gap-2 sm:pt-4"
          }`}
        >
          {!compact && (
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
          )}
          <SpecularButton
            to="/contact"
            variant="brand"
            size="sm"
            className={
              compact
                ? "w-full justify-center !px-2 !py-1.5 !text-[11px]"
                : "w-full justify-center sm:w-auto"
            }
          >
            Details
            <ArrowUpRight size={compact ? 11 : 12} />
          </SpecularButton>
        </div>
      </div>
    </motion.article>
  );
}

const PHONE_PREVIEW = 6; // 2 cols × 3 rows

function Stories() {
  const industries = [
    ...new Set(caseStudies.map((c) => c.industry).filter(Boolean)),
  ];
  const [active, setActive] = useState("All");
  const [expanded, setExpanded] = useState(false);

  const filtered =
    active === "All"
      ? caseStudies
      : caseStudies.filter((c) => c.industry === active);

  const featured =
    filtered.find((c) => c.challenge && c.intervention && c.outcome) ||
    filtered[0];
  const rest = filtered.filter((c) => c.id !== featured?.id);
  const featuredIdx = caseStudies.findIndex((c) => c.id === featured?.id);

  const visibleRest = expanded ? rest : rest.slice(0, PHONE_PREVIEW);
  const hiddenCount = Math.max(0, rest.length - PHONE_PREVIEW);

  const setFilter = (label) => {
    setActive(label);
    setExpanded(false);
  };

  return (
    <section id="stories" className="scroll-mt-28 bg-mehr-panel section-pad !py-8 sm:!py-12 lg:!py-16">
      <div className="container-mehr page-gutter sm:px-3 md:px-4 lg:px-5">
        <div className="flex flex-col gap-4 sm:gap-5 lg:flex-row lg:items-end lg:justify-between">
          <Reveal className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
            <p className="eyebrow">Case library</p>
            <h2 className="mt-2 font-sans text-[clamp(1.45rem,6.2vw,2.55rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-mehr-ink sm:leading-[1.08]">
              {caseStudiesContent.listTitle}
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0 sm:justify-center lg:justify-end [&::-webkit-scrollbar]:hidden">
              {["All", ...industries].map((label) => {
                const on = active === label;
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setFilter(label)}
                    className={`shrink-0 rounded-full px-3.5 py-1.5 text-[12px] font-semibold transition ${
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
          <Reveal className="mt-6 sm:mt-8 lg:mt-10">
            <FeaturedCase cs={featured} image={photoAt(Math.max(0, featuredIdx))} />
          </Reveal>
        )}

        {rest.length > 0 && (
          <>
            {/* Phone: compact 2-col · sm+: full cards */}
            <div className="mt-4 grid grid-cols-2 gap-2.5 sm:hidden">
              {visibleRest.map((cs, i) => {
                const idx = caseStudies.findIndex((c) => c.id === cs.id);
                return (
                  <StoryCard
                    key={cs.id}
                    cs={cs}
                    image={photoAt(idx >= 0 ? idx + 1 : i + 1)}
                    index={i}
                    compact
                  />
                );
              })}
            </div>

            {hiddenCount > 0 && (
              <div className="mt-4 flex justify-center sm:hidden">
                <button
                  type="button"
                  onClick={() => setExpanded((v) => !v)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-mehr-deep/15 bg-white px-5 py-2.5 text-[13px] font-semibold text-mehr-deep shadow-soft transition hover:border-mehr-deep/30 active:scale-[0.98]"
                >
                  {expanded ? "Show less" : `View more (${hiddenCount})`}
                  <ArrowUpRight
                    size={14}
                    className={`transition ${expanded ? "rotate-90" : ""}`}
                  />
                </button>
              </div>
            )}

            <RevealStagger
              className="mt-5 hidden gap-4 sm:mt-5 sm:grid sm:grid-cols-2 lg:mt-6 lg:grid-cols-3 lg:gap-5"
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
          </>
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
    <section className="surface-white surface-wash relative section-pad !py-8 text-mehr-ink sm:!py-12 lg:!py-16">
      <div className="container-mehr page-gutter relative z-10 sm:px-3 md:px-4 lg:px-5">
        <Reveal className="text-center lg:text-left">
          <p className="eyebrow">How we frame impact</p>
          <h2 className="mx-auto mt-2 max-w-[18ch] font-sans text-[clamp(1.4rem,5.8vw,2.25rem)] font-semibold leading-[1.12] tracking-[-0.03em] text-mehr-ink sm:leading-[1.1] lg:mx-0">
            Every story follows the same clarity.
          </h2>
        </Reveal>

        {/* Phone: snap rail · sm+: 3-col */}
        <div className="-mx-4 mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:mt-8 sm:grid sm:snap-none sm:grid-cols-3 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden">
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={0.06 * i} className="w-[min(78vw,18rem)] shrink-0 snap-center sm:w-auto">
              <div className="h-full rounded-[1.2rem] border border-mehr-deep/10 bg-mehr-panel/70 p-4 shadow-soft sm:rounded-[1.5rem] sm:p-6">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-mehr-deep font-sans text-[11px] font-semibold tabular-nums text-white">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3.5 font-sans text-[16px] font-semibold tracking-[-0.02em] text-mehr-ink sm:mt-4 sm:text-lg">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-mehr-mist sm:mt-2 sm:text-sm">
                  {step.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
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
