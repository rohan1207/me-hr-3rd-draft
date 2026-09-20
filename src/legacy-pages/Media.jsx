"use client";

import { useMemo, useState } from "react";
import { Link } from "@/components/compat/router";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Clock3, Search } from "lucide-react";
import {
  mediaContent,
  caseStudies,
  caseStudiesContent,
  seo,
  footerContent,
} from "../data/content";
import PageSEO from "../components/ui/PageSEO";
import Reveal, { RevealItem, RevealStagger } from "../components/ui/Reveal";

const ease = [0.22, 1, 0.36, 1];

const POST_IMAGES = {
  "structured-hr": "/insights/structured-hr.png",
  "fractional-hr": "/insights/resident-hr.png",
  "engagement-culture": "/insights/engagement.png",
  "payroll-compliance": "/insights/payroll.png",
  "performance-systems": "/insights/performance.png",
  "on-demand-hr": "/insights/on-demand.png",
  "workplace-moments": "/insights/workplace-moments.png",
  "hr-lifecycle": "/insights/lifecycle.png",
};

const CASE_IMAGES = ["/insights/on-demand.png", "/insights/lifecycle.png"];

function postImage(idOrIndex) {
  if (typeof idOrIndex === "number") {
    const values = Object.values(POST_IMAGES);
    return values[idOrIndex % values.length];
  }
  return POST_IMAGES[idOrIndex] || POST_IMAGES["structured-hr"];
}

function InsightCard({ post, large = false, reduce }) {
  return (
    <Link
      to={`/media/${post.id}`}
      className={`group flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-mehr-deep/8 bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:border-mehr-deep/18 hover:shadow-float sm:rounded-[1.5rem] ${
        large ? "lg:flex-row" : ""
      }`}
    >
      <div
        className={`overflow-hidden ${
          large
            ? "aspect-[16/10] w-full lg:aspect-auto lg:min-h-full lg:w-[48%]"
            : "aspect-[16/10] w-full"
        }`}
      >
        <motion.img
          src={postImage(post.id)}
          alt=""
          whileHover={reduce ? undefined : { scale: 1.04 }}
          transition={{ duration: 0.5 }}
          className="h-full w-full object-cover"
        />
      </div>
      <div className={`flex flex-1 flex-col p-5 sm:p-6 ${large ? "lg:justify-center lg:p-8" : ""}`}>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-mehr-panel px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-mehr-deep">
            {post.category}
          </span>
          {post.readTime && (
            <span className="inline-flex items-center gap-1 text-[11px] text-mehr-muted">
              <Clock3 size={12} />
              {post.readTime}
            </span>
          )}
        </div>
        <h3
          className={`mt-3 font-sans font-semibold leading-snug tracking-[-0.02em] text-mehr-ink ${
            large ? "text-[clamp(1.35rem,2.4vw,1.85rem)]" : "text-[15px] sm:text-base"
          }`}
        >
          {post.title}
        </h3>
        <p
          className={`mt-2 text-[13px] leading-relaxed text-mehr-mist sm:text-sm ${
            large ? "line-clamp-3" : "line-clamp-2"
          }`}
        >
          {post.excerpt}
        </p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-mehr-deep transition group-hover:gap-2.5">
          Read full insight
          <ArrowUpRight size={15} />
        </span>
      </div>
    </Link>
  );
}

export default function Media() {
  const reduce = useReducedMotion();
  const { hero, posts, sections, categories } = mediaContent;
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      const matchesCategory =
        activeCategory === "All" || p.category === activeCategory;
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [posts, query, activeCategory]);

  const featuredCases = caseStudies.slice(0, 2);
  const categoryFilters = ["All", ...categories.map((c) => c.title)];

  return (
    <>
      <PageSEO {...seo.media} path="/media" />

      {/* Hero */}
      <section className="relative overflow-hidden bg-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-mesh-teal opacity-40"
        />
        <div className="container-mehr page-gutter relative z-10 py-10 text-center sm:py-12 md:px-4 lg:px-5 lg:py-14">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[11px] font-semibold uppercase tracking-[0.18em] text-mehr-deep"
          >
            {hero.eyebrow}
          </motion.p>
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.65, ease }}
            className="mx-auto mt-4 max-w-3xl font-sans text-[clamp(2rem,4.8vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-mehr-ink"
          >
            {hero.title}
          </motion.h1>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.55, ease }}
            className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-mehr-mist sm:text-[15px]"
          >
            {hero.body}
          </motion.p>

          <motion.form
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16, duration: 0.55, ease }}
            className="mx-auto mt-8 flex w-full max-w-xl overflow-hidden rounded-full border border-mehr-deep/10 bg-white shadow-soft"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="flex flex-1 items-center gap-2.5 px-5">
              <Search size={16} className="shrink-0 text-mehr-muted" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={hero.searchPlaceholder}
                className="w-full border-0 bg-transparent py-3.5 text-sm text-mehr-ink outline-none placeholder:text-mehr-muted"
                aria-label="Search insights"
              />
            </div>
            <button
              type="submit"
              className="bg-mehr-deep px-6 text-sm font-semibold text-white transition hover:bg-mehr-charcoal"
            >
              Search
            </button>
          </motion.form>
        </div>
      </section>

      {/* All insights */}
      <section className="bg-white py-10 sm:py-12 lg:py-14">
        <div className="container-mehr page-gutter sm:px-3 md:px-4 lg:px-5">
          <Reveal>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-mehr-deep">
                  Library
                </p>
                <h2 className="mt-2 font-sans text-[clamp(1.55rem,3vw,2.2rem)] font-semibold tracking-[-0.03em] text-mehr-ink">
                  All insights
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {categoryFilters.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`rounded-full px-3.5 py-1.5 text-[12px] font-semibold transition ${
                      activeCategory === cat
                        ? "bg-mehr-deep text-white"
                        : "bg-mehr-panel text-mehr-mist hover:text-mehr-deep"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          {filtered.length > 0 ? (
            <RevealStagger
              className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
              stagger={0.05}
            >
              {filtered.map((post) => (
                <RevealItem key={post.id}>
                  <InsightCard post={post} reduce={reduce} />
                </RevealItem>
              ))}
            </RevealStagger>
          ) : (
            <p className="mt-10 text-center text-sm text-mehr-mist">
              No insights match your search. Try another keyword or category.
            </p>
          )}
        </div>
      </section>

      {/* Case studies */}
      <section className="bg-mehr-panel/35 py-10 sm:py-12 lg:py-14">
        <div className="container-mehr page-gutter sm:px-3 md:px-4 lg:px-5">
          <Reveal>
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-mehr-deep">
                  In practice
                </p>
                <h2 className="mt-2 font-sans text-[clamp(1.55rem,3vw,2.2rem)] font-semibold tracking-[-0.03em] text-mehr-ink">
                  {sections.caseStudies}
                </h2>
              </div>
              <Link
                to="/case-studies"
                className="inline-flex items-center gap-1 text-sm font-semibold text-mehr-deep"
              >
                {caseStudiesContent.viewAllCta}
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </Reveal>

          <RevealStagger className="mt-7 grid gap-4 lg:grid-cols-2 lg:gap-5" stagger={0.08}>
            {featuredCases.map((cs, i) => (
              <RevealItem key={cs.id}>
                <Link
                  to="/case-studies"
                  className="group grid overflow-hidden rounded-[1.35rem] border border-mehr-deep/8 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-float sm:grid-cols-2 sm:rounded-[1.5rem]"
                >
                  <div className="relative min-h-[160px]">
                    <img
                      src={CASE_IMAGES[i % CASE_IMAGES.length]}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col justify-center p-5 sm:p-6">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-mehr-deep">
                      {cs.industry || "Case study"}
                    </span>
                    <h3 className="mt-2 font-sans text-base font-semibold leading-snug text-mehr-ink sm:text-lg">
                      {cs.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-[13px] leading-relaxed text-mehr-mist">
                      {cs.challenge}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-mehr-deep">
                      {caseStudiesContent.readCta}
                      <ArrowUpRight size={14} />
                    </span>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* Subscribe */}
      <section className="bg-white py-12 sm:py-14">
        <div className="container-mehr page-gutter sm:px-3 md:px-4 lg:px-5">
          <div className="overflow-hidden rounded-[1.75rem] bg-mehr-panel px-6 py-10 sm:rounded-[2rem] sm:px-10 sm:py-12 lg:px-14">
            <div className="mx-auto max-w-xl text-center">
              <Reveal>
                <h2 className="font-sans text-[clamp(1.5rem,3vw,2.2rem)] font-semibold leading-[1.12] tracking-[-0.03em] text-mehr-ink">
                  {sections.subscribeTitle}
                </h2>
                <p className="mt-3 text-sm text-mehr-mist">{sections.subscribeBody}</p>
                <form
                  className="mx-auto mt-7 flex max-w-md overflow-hidden rounded-full border border-mehr-deep/10 bg-white shadow-soft"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    type="email"
                    placeholder={sections.subscribePlaceholder}
                    className="w-full border-0 bg-transparent px-5 py-3.5 text-sm text-mehr-ink outline-none placeholder:text-mehr-muted"
                    aria-label="Email"
                  />
                  <button
                    type="submit"
                    className="shrink-0 bg-mehr-deep px-5 text-sm font-semibold text-white transition hover:bg-mehr-charcoal"
                  >
                    {sections.subscribeCta}
                  </button>
                </form>
                <p className="mt-3 text-[12px] text-mehr-muted">
                  {footerContent.subscribeLabel}
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
