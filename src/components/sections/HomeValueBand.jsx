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
      {/* About â€” single composition */}
      <section className="section-pad surface-white surface-wash">
        <div className="container-mehr page-gutter sm:px-3 md:px-4 lg:px-5">
          <Reveal className="relative overflow-hidden rounded-[1.75rem] bg-mehr-panel px-6 py-8 sm:rounded-[2rem] sm:px-8 sm:py-10 lg:px-12 lg:py-12">
            <div
              aria-hidden
              className="pointer-events-none absolute right-4 top-4 sm:right-6 sm:top-6"
            >
              <img
                src="/logo1.png"
                alt=""
                className="h-12 w-auto max-w-[11rem] object-contain object-right opacity-[0.5] sm:h-14 sm:max-w-[13rem] lg:h-16 lg:max-w-[15rem]"
              />
            </div>

            <div className="relative z-10 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-12">
              <div>
                <p className="eyebrow">{about.eyebrow}</p>
                <h2 className="mt-3 max-w-[16ch] font-sans text-[clamp(1.85rem,3.4vw,2.85rem)] font-semibold leading-[1.08] tracking-[-0.04em] text-mehr-ink">
                  {about.title}
                </h2>
                <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-mehr-mist sm:text-[15px]">
                  {lead}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <SpecularButton to="/about" variant="brand" size="md">
                    {about.cta}
                    <ArrowUpRight size={15} />
                  </SpecularButton>
                  <SpecularButton to="/services" variant="light" size="md">
                    {ctas.exploreServices}
                    <ArrowUpRight size={15} />
                  </SpecularButton>
                </div>
              </div>

              <motion.div
                initial={reduce ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease }}
                className="rounded-[1.35rem] border border-mehr-deep/8 bg-white/85 p-5 sm:rounded-[1.5rem] sm:p-6"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-mehr-deep">
                  {philosophy.eyebrow}
                </p>
                <p className="mt-2 font-sans text-lg font-semibold tracking-tight text-mehr-ink sm:text-xl">
                  {philosophy.title}
                </p>
                <p className="mt-2 text-[13px] leading-relaxed text-mehr-mist sm:text-[14px]">
                  We understand your organisation first, then recommend the right
                  service model for where you are today.
                </p>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why â€” full-width horizontal reasons */}
      <section className="relative overflow-hidden bg-mehr-deep py-12 text-white sm:py-14 lg:py-16">
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
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55">
                  {why.eyebrow}
                </p>
                <h2 className="mt-3 max-w-[18ch] font-sans text-[clamp(1.75rem,3.2vw,2.65rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-white">
                  {why.title}
                </h2>
              </div>
              <div className="flex flex-wrap gap-3 lg:shrink-0">
                <SpecularButton to="/contact" variant="light" size="md">
                  {why.primaryCta}
                  <ArrowUpRight size={15} />
                </SpecularButton>
                <SpecularButton to="/about" variant="dark" size="md" tint="#ffffff" tintOpacity={0.12}>
                  {why.secondaryCta}
                  <ArrowUpRight size={15} />
                </SpecularButton>
              </div>
            </div>
          </Reveal>

          <RevealStagger
            className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-3 sm:gap-4 lg:gap-5"
            stagger={0.08}
          >
            {REASONS.map((item, i) => (
              <RevealItem key={item.title}>
                <motion.article
                  whileHover={reduce ? undefined : { y: -3 }}
                  transition={{ type: "spring", stiffness: 380, damping: 28 }}
                  className="flex h-full flex-col rounded-[1.35rem] border border-white/15 bg-white/10 p-5 backdrop-blur-sm sm:rounded-[1.5rem] sm:p-6"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-mehr-deep">
                      <item.Icon size={18} strokeWidth={1.9} />
                    </span>
                    <span className="font-sans text-[12px] font-semibold tabular-nums text-white/45">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-5 font-sans text-[16px] font-semibold tracking-tight text-white sm:text-[17px]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-white/70 sm:text-[14px]">
                    {item.desc}
                  </p>
                </motion.article>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>
    </>
  );
}
