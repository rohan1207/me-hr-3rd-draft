"use client";

import { useEffect, useState } from "react";
import { Link } from "@/components/compat/router";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Heart,
  Lightbulb,
  TrendingUp,
  Users,
} from "lucide-react";
import { careersContent, seo, ctas } from "../data/content";
import PageSEO from "../components/ui/PageSEO";
import CTABanner from "../components/ui/CTABanner";
import Reveal, { RevealItem, RevealStagger } from "../components/ui/Reveal";

const ease = [0.22, 1, 0.36, 1];

const whyIcons = [Lightbulb, TrendingUp, Users, Heart];

const CULTURE_IMG = "/me-hr_team.jpg";

const COLLAGE = [
  { src: "/me-hr_team.jpg", className: "col-span-2 row-span-2" },
  { src: "/sonia_patra.jpeg", className: "col-span-1 row-span-1" },
  { src: "/me-hr_meeting.jpeg", className: "col-span-1 row-span-1" },
  { src: "/team_meet.jpeg", className: "col-span-1 row-span-1" },
  { src: "/img3.jpg", className: "col-span-1 row-span-1" },
  { src: "/patra.jpg", className: "col-span-2 row-span-1" },
];

function CareersHero() {
  const reduce = useReducedMotion();
  const { hero, why } = careersContent;

  return (
    <section className="relative overflow-hidden bg-mehr-panel">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_0%_0%,rgba(20,196,173,0.16),transparent_55%),radial-gradient(ellipse_45%_40%_at_100%_100%,rgba(11,95,88,0.1),transparent_50%)]"
      />

      <div className="container-mehr page-gutter relative z-10 py-10 sm:py-12 md:px-4 lg:px-5 lg:py-16">
        <div className="grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12 xl:gap-14">
          <div>
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[11px] font-semibold uppercase tracking-[0.18em] text-mehr-deep"
            >
              Careers at me-HR
            </motion.p>
            <motion.h1
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06, duration: 0.7, ease }}
              className="mt-4 max-w-[14ch] font-sans text-[clamp(2.1rem,4.8vw,3.6rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-mehr-ink"
            >
              {hero.title}
            </motion.h1>
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.55, ease }}
              className="mt-5 max-w-md text-[15px] leading-relaxed text-mehr-mist sm:text-base"
            >
              {hero.body}
            </motion.p>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.55, ease }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-mehr-deep px-6 py-3 text-sm font-semibold text-white shadow-float transition hover:bg-mehr-charcoal hover:gap-3 active:scale-[0.98]"
              >
                {ctas.viewOpenings}
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/life"
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-3 text-sm font-semibold text-mehr-deep shadow-soft transition hover:bg-mehr-teal-soft"
              >
                Life at me-HR
                <ArrowUpRight size={15} />
              </Link>
            </motion.div>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24, duration: 0.5, ease }}
              className="mt-8 flex flex-wrap gap-2"
            >
              {why.slice(0, 3).map((item) => (
                <span
                  key={item.title}
                  className="rounded-full border border-mehr-deep/10 bg-white/80 px-3.5 py-1.5 text-[12px] font-semibold text-mehr-ink shadow-soft"
                >
                  {item.title}
                </span>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14, duration: 0.7, ease }}
            className="relative"
          >
            <div className="grid h-[340px] grid-cols-4 grid-rows-3 gap-2.5 sm:h-[420px] sm:gap-3 lg:h-[460px]">
              {COLLAGE.map((item, i) => (
                <motion.div
                  key={`${item.src}-${i}`}
                  className={`relative overflow-hidden rounded-[1.15rem] bg-white shadow-soft sm:rounded-[1.35rem] ${item.className}`}
                  animate={
                    reduce ? undefined : { y: [0, i % 2 === 0 ? -5 : 5, 0] }
                  }
                  transition={{
                    duration: 4.5 + i * 0.35,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.15,
                  }}
                >
                  <img
                    src={item.src}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </motion.div>
              ))}
            </div>

            <motion.div
              className="absolute -bottom-3 left-4 right-4 rounded-2xl border border-white/40 bg-white/95 p-4 shadow-float backdrop-blur-sm sm:-bottom-4 sm:left-6 sm:right-auto sm:max-w-xs sm:p-5"
              animate={reduce ? undefined : { y: [0, -6, 0] }}
              transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-mehr-deep">
                Join the team
              </p>
              <p className="mt-1.5 text-sm font-semibold leading-snug text-mehr-ink">
                Practical HR work. Real client exposure. Room to grow.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function WhyCard({ item, Icon, index }) {
  const reduce = useReducedMotion();
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    if (reduce) return undefined;
    const id = window.setInterval(() => setPulse((p) => p + 1), 2600 + index * 350);
    return () => window.clearInterval(id);
  }, [reduce, index]);

  return (
    <motion.article
      whileHover={reduce ? undefined : { y: -4 }}
      className="group flex h-full flex-col rounded-[1.5rem] border border-mehr-deep/8 bg-white p-5 shadow-soft transition hover:border-mehr-deep/18 hover:shadow-float sm:rounded-[1.65rem] sm:p-6"
    >
      <div className="flex items-start justify-between">
        <motion.span
          className="flex h-11 w-11 items-center justify-center rounded-2xl bg-mehr-panel text-mehr-deep transition group-hover:bg-mehr-deep group-hover:text-white"
          animate={reduce ? undefined : { scale: pulse % 2 === 0 ? [1, 1.06, 1] : 1 }}
          transition={{ duration: 0.5 }}
        >
          <Icon size={18} strokeWidth={1.85} />
        </motion.span>
        <span className="font-sans text-[11px] font-semibold tabular-nums text-mehr-muted">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <h3 className="mt-5 font-sans text-lg font-semibold tracking-[-0.02em] text-mehr-ink">
        {item.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-mehr-mist">{item.desc}</p>
    </motion.article>
  );
}

export default function Careers() {
  const { hero, why, experienceTitle, experienceEyebrow } =
    careersContent;

  return (
    <>
      <PageSEO {...seo.careers} path="/careers" />
      <CareersHero />

      <section className="bg-mehr-panel/45 py-12 sm:py-14">
        <div className="container-mehr page-gutter sm:px-3 md:px-4 lg:px-5">
          <div className="grid items-stretch gap-3 overflow-hidden rounded-[1.75rem] border border-mehr-deep/8 bg-white p-3 sm:rounded-[2.25rem] sm:p-3.5 lg:grid-cols-[1.05fr_0.95fr] lg:gap-3.5">
            <Reveal className="flex flex-col justify-center px-3 py-5 sm:px-6 sm:py-8 lg:px-8">
              <p className="eyebrow">Life at me-HR</p>
              <h2 className="mt-3 max-w-[16ch] font-sans text-[clamp(1.55rem,3vw,2.35rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-mehr-ink">
                Work that builds real HR capability.
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-mehr-mist">
                {hero.body}
              </p>
              <div className="mt-6 rounded-2xl border border-mehr-deep/10 bg-mehr-panel/80 p-4 sm:p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-mehr-deep">
                  {why[2].title}
                </p>
                <p className="mt-1.5 text-sm font-semibold leading-snug text-mehr-ink">
                  {why[2].desc}
                </p>
              </div>
              <div className="mt-7">
                <Link
                  to="/life"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-mehr-deep transition hover:gap-3"
                >
                  Explore life at me-HR
                  <ArrowUpRight size={15} />
                </Link>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="relative min-h-[240px] overflow-hidden rounded-[1.35rem] sm:min-h-[300px] sm:rounded-[1.6rem] lg:min-h-[360px]">
              <img
                src={CULTURE_IMG}
                alt="me-HR team collaborating in the office"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-14 lg:py-16">
        <div className="container-mehr page-gutter sm:px-3 md:px-4 lg:px-5">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">{experienceEyebrow}</p>
            <h2 className="mt-3 font-sans text-[clamp(1.7rem,3.5vw,2.6rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-mehr-ink">
              {experienceTitle}
            </h2>
          </Reveal>

          <RevealStagger
            className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5"
            stagger={0.07}
          >
            {why.map((item, i) => (
              <RevealItem key={item.title}>
                <WhyCard item={item} Icon={whyIcons[i]} index={i} />
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      <CTABanner cta={ctas.primary} />
    </>
  );
}
