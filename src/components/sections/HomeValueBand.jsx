"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  BadgeCheck,
  HeartHandshake,
  Puzzle,
} from "lucide-react";
import { homeContent, whyChoose, ctas } from "../../data/content";
import SpecularButton from "../ui/SpecularButton";
import Reveal, { RevealItem, RevealStagger } from "../ui/Reveal";

const ease = [0.22, 1, 0.36, 1];

const REASONS = [
  { ...whyChoose[0], Icon: Puzzle },
  { ...whyChoose[1], Icon: BadgeCheck },
  { ...whyChoose[5], Icon: HeartHandshake },
];

export default function HomeValueBand() {
  const reduce = useReducedMotion();
  const about = homeContent.about;
  const why = homeContent.whySection;
  const philosophy = homeContent.philosophy;
  const lead = (about.body?.[0] || "").split(/(?<=\.)\s+/)[0];

  return (
    <>
      {/* About me-HR */}
      <section className="section-pad surface-white surface-wash">
        <div className="container-mehr page-gutter sm:px-3 md:px-4 lg:px-5">
          <Reveal className="relative overflow-hidden rounded-[1.35rem] bg-mehr-panel p-4 sm:rounded-[1.75rem] sm:p-6 md:rounded-[2rem] md:px-8 md:pb-10 md:pt-10 lg:px-12 lg:py-14">
            {/* Phone: image as its own block above copy (no giant empty padding) */}
            <motion.div
              aria-hidden
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease }}
              className="relative mx-auto mb-5 aspect-[16/10] w-full max-w-md overflow-hidden rounded-[1.15rem] sm:mb-6 sm:aspect-[16/9] sm:rounded-[1.35rem] md:hidden"
            >
              <img
                src="/about/about-preview-circle.png"
                alt=""
                className="h-full w-full object-cover object-[42%_48%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-mehr-panel/50 via-transparent to-transparent" />
            </motion.div>

            {/* md+: arc circle bleeding top-right */}
            <motion.div
              aria-hidden
              initial={reduce ? false : { opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease }}
              className="pointer-events-none absolute -right-24 -top-28 hidden h-[26rem] w-[26rem] md:block lg:-right-20 lg:-top-32 lg:h-[32rem] lg:w-[32rem] xl:-right-16 xl:h-[34rem] xl:w-[34rem]"
            >
              <div className="absolute inset-0 overflow-hidden rounded-full">
                <img
                  src="/about/about-preview-circle.png"
                  alt=""
                  className="h-full w-full object-cover object-[42%_58%]"
                />
                <div className="absolute inset-0 bg-gradient-to-bl from-mehr-deep/10 via-transparent to-mehr-panel/45" />
              </div>
              <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/45" />
            </motion.div>

            <div className="relative z-10 w-full max-w-xl md:max-w-[58%] lg:max-w-[52%]">
              <p className="eyebrow">{about.eyebrow}</p>
              <h2 className="mt-2.5 max-w-[18ch] font-sans text-[clamp(1.55rem,6.5vw,2.85rem)] font-semibold leading-[1.1] tracking-[-0.04em] text-mehr-ink sm:mt-3 sm:max-w-[16ch] sm:leading-[1.08]">
                {about.title}
              </h2>
              <p className="mt-3 text-[13px] leading-relaxed text-mehr-mist sm:mt-4 sm:text-[14px] md:text-[15px]">
                {lead}
              </p>

              <div className="mt-5 border-l-2 border-mehr-deep/25 pl-3.5 sm:mt-7 sm:pl-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-mehr-deep">
                  {philosophy.eyebrow}
                </p>
                <p className="mt-1.5 font-sans text-[15px] font-semibold tracking-tight text-mehr-ink sm:text-[17px] md:text-[19px]">
                  {philosophy.title}
                </p>
                <p className="mt-1.5 text-[12px] leading-relaxed text-mehr-mist sm:text-[13px] md:text-[14px]">
                  We understand your organisation first, then recommend the right
                  service model for where you are today.
                </p>
              </div>

              <div className="mt-6 flex w-full flex-col gap-2.5 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-3">
                <SpecularButton
                  to="/about"
                  variant="brand"
                  size="md"
                  className="w-full justify-center sm:w-auto"
                >
                  {about.cta}
                  <ArrowUpRight size={15} />
                </SpecularButton>
                <SpecularButton
                  to="/services"
                  variant="light"
                  size="md"
                  className="w-full justify-center sm:w-auto"
                >
                  {ctas.exploreServices}
                  <ArrowUpRight size={15} />
                </SpecularButton>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why me-HR */}
      <section className="relative overflow-hidden bg-mehr-deep py-9 text-white sm:py-11 md:py-14 lg:py-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 55% 50% at 10% 20%, rgba(20,196,173,0.35), transparent 55%), radial-gradient(ellipse 45% 40% at 90% 80%, rgba(255,255,255,0.08), transparent 50%)",
          }}
        />

        <div className="container-mehr page-gutter relative z-10 sm:px-3 md:px-4 lg:px-5">
          <Reveal>
            <div className="flex flex-col gap-4 sm:gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/55 sm:text-[11px]">
                  {why.eyebrow}
                </p>
                <h2 className="mt-2 max-w-[20ch] font-sans text-[clamp(1.45rem,6.2vw,2.65rem)] font-semibold leading-[1.12] tracking-[-0.035em] text-white sm:mt-2.5 sm:max-w-[18ch] sm:leading-[1.1]">
                  {why.title}
                </h2>
              </div>
              {/* Phone: full-width stack under title · sm+: inline · lg: beside heading */}
              <div className="hidden w-full flex-col gap-2.5 sm:flex sm:w-auto sm:flex-row sm:flex-wrap sm:gap-3 lg:shrink-0">
                <SpecularButton to="/contact" variant="light" size="md">
                  {why.primaryCta}
                  <ArrowUpRight size={15} />
                </SpecularButton>
                <SpecularButton
                  to="/about"
                  variant="dark"
                  size="md"
                  tint="#ffffff"
                  tintOpacity={0.12}
                >
                  {why.secondaryCta}
                  <ArrowUpRight size={15} />
                </SpecularButton>
              </div>
            </div>
          </Reveal>

          <RevealStagger
            className="mt-6 grid grid-cols-1 gap-2.5 sm:mt-8 sm:gap-3 md:mt-10 md:grid-cols-3 md:gap-4 lg:gap-5"
            stagger={0.08}
          >
            {REASONS.map((item, i) => (
              <RevealItem key={item.title}>
                <motion.article
                  whileHover={reduce ? undefined : { y: -3 }}
                  transition={{ type: "spring", stiffness: 380, damping: 28 }}
                  className="flex h-full gap-3.5 rounded-[1.15rem] border border-white/15 bg-white/10 p-3.5 backdrop-blur-sm sm:flex-col sm:gap-0 sm:rounded-[1.35rem] sm:p-5 md:rounded-[1.5rem] md:p-6"
                >
                  {/* Phone: icon + copy side-by-side · sm+: stacked */}
                  <div className="flex shrink-0 items-start justify-between gap-3 sm:w-full">
                    <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-mehr-deep sm:h-11 sm:w-11">
                      <item.Icon size={17} strokeWidth={1.9} />
                    </span>
                    <span className="hidden font-sans text-[11px] font-semibold tabular-nums text-white/45 sm:inline sm:text-[12px]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1 sm:mt-5">
                    <div className="flex items-start justify-between gap-2 sm:block">
                      <h3 className="font-sans text-[14px] font-semibold leading-snug tracking-tight text-white sm:text-[16px] md:text-[17px]">
                        {item.title}
                      </h3>
                      <span className="shrink-0 font-sans text-[11px] font-semibold tabular-nums text-white/45 sm:hidden">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <p className="mt-1.5 text-[12px] leading-relaxed text-white/70 sm:mt-2 sm:text-[13px] md:text-[14px]">
                      {item.desc}
                    </p>
                  </div>
                </motion.article>
              </RevealItem>
            ))}
          </RevealStagger>

          {/* Phone CTAs after cards */}
          <div className="mt-5 flex w-full flex-col gap-2.5 sm:hidden">
            <SpecularButton
              to="/contact"
              variant="light"
              size="md"
              className="w-full justify-center"
            >
              {why.primaryCta}
              <ArrowUpRight size={15} />
            </SpecularButton>
            <SpecularButton
              to="/about"
              variant="dark"
              size="md"
              tint="#ffffff"
              tintOpacity={0.12}
              className="w-full justify-center"
            >
              {why.secondaryCta}
              <ArrowUpRight size={15} />
            </SpecularButton>
          </div>
        </div>
      </section>
    </>
  );
}
