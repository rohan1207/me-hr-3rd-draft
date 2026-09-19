"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SpecularButton from "./SpecularButton";
import Reveal from "./Reveal";
import { ctas, homeContent } from "../../data/content";

export default function CTABanner({
  eyebrow = homeContent.finalCta.eyebrow,
  title = homeContent.finalCta.title,
  subtitle,
  body = homeContent.finalCta.desc,
  cta = homeContent.finalCta.cta || ctas.primary,
  ctaPath = "/contact",
}) {
  const reduce = useReducedMotion();

  return (
    <section className="surface-panel relative overflow-hidden px-4 pb-8 pt-5 text-mehr-ink sm:px-3 sm:pb-10 sm:pt-6 md:px-4 lg:px-5 lg:pb-12 lg:pt-8">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_85%_45%,rgba(20,196,173,0.18),transparent_55%),radial-gradient(ellipse_50%_45%_at_8%_80%,rgba(11,95,88,0.07),transparent_50%)]"
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-mehr-teal/15 blur-3xl"
        animate={reduce ? undefined : { scale: [1, 1.15, 1], opacity: [0.4, 0.65, 0.4] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container-mehr page-gutter relative z-10 sm:px-3 md:px-4 lg:px-5">
        <div className="grid items-center gap-5 sm:gap-6 lg:grid-cols-[1.2fr_auto] lg:gap-10">
          <Reveal y={16}>
            {eyebrow && <p className="eyebrow mb-2.5 sm:mb-3">{eyebrow}</p>}
            <h2 className="max-w-[18ch] font-sans text-[clamp(1.55rem,3.4vw,2.65rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-mehr-ink">
              {title}
              {subtitle && (
                <span className="mt-1 block text-mehr-deep sm:mt-1.5">{subtitle}</span>
              )}
            </h2>
            {body && (
              <p className="mt-3 max-w-md text-sm leading-relaxed text-mehr-mist sm:text-[15px]">
                {body}
              </p>
            )}
          </Reveal>

          <Reveal delay={0.08} y={16} className="relative flex items-center lg:justify-end">
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 sm:h-32 sm:w-32 lg:left-auto lg:right-2 lg:translate-x-0"
            >
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-mehr-deep/12"
                animate={reduce ? undefined : { rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-[14%] rounded-full border border-mehr-teal/25"
                animate={reduce ? undefined : { rotate: -360 }}
                transition={{ duration: 52, repeat: Infinity, ease: "linear" }}
              />
            </div>

            <div className="relative z-10">
              <SpecularButton to={ctaPath} variant="brand" size="lg">
                {cta}
                <ArrowUpRight size={16} />
              </SpecularButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
