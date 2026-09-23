"use client";

import { Link } from "@/components/compat/router";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import SpecularButton from "../../ui/SpecularButton";
import { aboutContent } from "../../../data/content";

const ease = [0.22, 1, 0.36, 1];
const HERO_IMG = "/about/hero-team.png";

export default function AboutHero() {
  const reduce = useReducedMotion();
  const { hero, story } = aboutContent;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const parallax = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 28]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-white pt-4 pb-7 sm:pt-6 sm:pb-10 lg:pt-7 lg:pb-12"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-mesh-teal opacity-60" />

      <div className="container-mehr page-gutter relative z-10 sm:px-3 md:px-4 lg:px-5">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease }}
          className="grid items-end gap-5 text-center lg:grid-cols-[1.15fr_0.85fr] lg:gap-8 lg:text-left"
        >
          <div>
            <p className="text-[11px] font-medium text-mehr-mist sm:text-[12px]">
              Home <span className="mx-1 text-mehr-muted">/</span>
              <span className="font-semibold text-mehr-deep">About</span>
            </p>
            <p className="mt-2.5 text-[11px] text-mehr-muted sm:mt-3 sm:text-[12px]">
              Pune · since 2018
            </p>
            <h1 className="mt-2 font-sans text-[clamp(2.15rem,11vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.045em] sm:text-[clamp(2.6rem,6vw,4.5rem)]">
              <span className="text-mehr-ink">About </span>
              <span className="text-mehr-deep">me-HR</span>
            </h1>
            <p className="mx-auto mt-3.5 max-w-[28ch] font-sans text-[15px] font-semibold leading-snug tracking-[-0.02em] text-mehr-ink sm:mt-4 sm:text-base md:text-lg lg:mx-0">
              {hero.tagline}
            </p>
          </div>

          <div className="flex flex-col gap-3.5 sm:gap-4 lg:items-end lg:pb-1">
            <p className="mx-auto max-w-md text-[13px] leading-relaxed text-mehr-mist sm:text-[14px] md:text-[15px] lg:mx-0 lg:text-right">
              {hero.body[0]}
            </p>
            <div className="flex w-full flex-col items-stretch gap-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-2.5 lg:justify-end">
              <SpecularButton
                to="/contact"
                variant="brand"
                size="sm"
                className="w-full justify-center sm:w-auto"
              >
                {hero.primaryCta}
              </SpecularButton>
              <Link
                to="/services"
                className="inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-mehr-deep/15 bg-mehr-panel px-4 py-2.5 text-[13px] font-semibold text-mehr-ink transition hover:border-mehr-deep/30 hover:bg-white active:scale-[0.98] sm:w-auto sm:py-2"
              >
                Services
                <ArrowUpRight size={14} className="text-mehr-deep" />
              </Link>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease }}
          className="mt-6 sm:mt-7 lg:mt-8"
        >
          <div className="grid items-stretch gap-4 sm:gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-8">
            {/* Phone: image first for visual punch */}
            <div className="relative order-1 min-h-[220px] overflow-hidden rounded-[1.25rem] sm:min-h-[320px] sm:rounded-[1.6rem] lg:order-2 lg:min-h-[380px] lg:rounded-[1.6rem]">
              <motion.img
                style={{ y: parallax }}
                src={HERO_IMG}
                alt="me-HR team collaborating with business leaders"
                className="absolute inset-0 h-full w-full scale-105 object-cover"
              />
            </div>

            <div className="order-2 flex flex-col justify-center text-center lg:order-1 lg:pr-6 lg:text-left">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-mehr-deep sm:text-[11px]">
                {story.eyebrow}
              </p>
              <p className="mx-auto mt-3 max-w-[40ch] font-sans text-[clamp(1.05rem,4.5vw,1.45rem)] font-semibold leading-snug tracking-[-0.02em] text-mehr-ink sm:mt-4 lg:mx-0">
                {hero.body[1]}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
