"use client";

import { motion, useReducedMotion } from "framer-motion";
import { homeContent } from "../../data/content";
import RevealHeadline from "./RevealHeadline";
import HeroLiveCards from "./HeroLiveCards";
import SpecularButton from "./SpecularButton";

const ease = [0.22, 1, 0.36, 1];
const COLLAGE = "/hero-people-collage-bw.png";

export default function Hero() {
  const reduce = useReducedMotion();
  const { hero } = homeContent;

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-white lg:min-h-[min(100svh,920px)]">
      {/* Left half — monochrome people collage */}
      <div className="absolute inset-0 lg:right-1/2 lg:left-0">
        <img
          src={COLLAGE}
          alt=""
          className="h-full w-full object-cover object-[center_20%] grayscale contrast-[1.05]"
        />
        {/* Readability scrim over collage only */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/40 lg:to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/25" />
      </div>

      {/* Right half — plain white (desktop) */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 bg-white lg:block">
        {/* Soft seam so collage meets white cleanly */}
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black/10 to-transparent" />
      </div>

      <div className="relative z-10 flex min-h-[100svh] flex-col lg:min-h-[min(100svh,920px)]">
        <div className="flex items-start justify-between gap-4 px-6 pt-6 sm:px-9 sm:pt-8 lg:px-12 lg:pt-10">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease }}
            className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70 sm:text-[11px]"
          >
            {hero.eyebrow}
          </motion.p>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18, ease }}
            className="max-w-[14rem] text-right text-[10px] font-semibold uppercase leading-relaxed tracking-[0.16em] text-white/70 sm:max-w-none sm:text-[11px] lg:text-mehr-mist"
          >
            {hero.tagline}
          </motion.p>
        </div>

        <div className="grid flex-1 items-end gap-8 px-6 pb-10 pt-10 sm:px-9 sm:pb-12 lg:grid-cols-2 lg:items-center lg:gap-10 lg:px-12 lg:pb-16 lg:pt-6 xl:gap-12 xl:px-16">
          {/* Copy sits on collage half */}
          <div className="relative z-10 max-w-xl pb-1 lg:pb-6">
            <RevealHeadline
              text={hero.headline}
              tone="dark"
              className="max-w-[15ch] font-sans text-[clamp(2.2rem,5.4vw,4.15rem)] font-semibold leading-[1.04] tracking-[-0.04em] drop-shadow-[0_2px_20px_rgba(0,0,0,0.45)]"
            />

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 16, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, delay: 0.72, ease }}
              className="mt-5 max-w-md text-[14px] leading-relaxed text-white/85 sm:mt-6 sm:text-[15px]"
            >
              {hero.subheadline}
            </motion.p>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.9, ease }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <SpecularButton to="/contact" variant="light" size="lg">
                {hero.primaryCta}
              </SpecularButton>
              <SpecularButton
                to="/services"
                variant="dark"
                size="lg"
                tint="#ffffff"
                tintOpacity={0.14}
                blur={8}
                autoAnimate
              >
                {hero.secondaryCta}
              </SpecularButton>
            </motion.div>
          </div>

          {/* Cards on white half — light theme bento */}
          <div className="relative z-[2] w-full rounded-[1.75rem] bg-white/95 p-3 shadow-[0_24px_60px_rgba(0,0,0,0.18)] backdrop-blur-sm sm:rounded-[2rem] sm:p-4 lg:bg-transparent lg:p-0 lg:shadow-none lg:backdrop-blur-none">
            <HeroLiveCards theme="light" />
          </div>
        </div>
      </div>
    </section>
  );
}
