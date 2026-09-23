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
    <section className="relative overflow-x-clip bg-white lg:min-h-[min(100svh,920px)] lg:overflow-hidden">
      {/* Collage: full width on phone, left half on desktop */}
      <div className="absolute inset-0 lg:right-1/2 lg:left-0">
        <img
          src={COLLAGE}
          alt=""
          className="h-full w-full object-cover object-[center_18%] grayscale contrast-[1.05] sm:object-[center_20%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/45 lg:to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/35 lg:from-black/50 lg:via-transparent lg:to-black/25" />
      </div>

      {/* Right half white — desktop only */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 bg-white lg:block">
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black/10 to-transparent" />
      </div>

      {/* Content grows with phone height — nothing forced into one viewport */}
      <div className="relative z-10 flex flex-col lg:min-h-[min(100svh,920px)]">
        <div className="flex items-start justify-between gap-3 px-4 pt-4 sm:gap-4 sm:px-8 sm:pt-6 md:px-10 lg:px-12 lg:pt-8 xl:px-16">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease }}
            className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/70 sm:text-[10px] sm:tracking-[0.2em] md:text-[11px]"
          >
            {hero.eyebrow}
          </motion.p>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18, ease }}
            className="max-w-[10.5rem] text-right text-[9px] font-semibold uppercase leading-relaxed tracking-[0.14em] text-white/65 sm:max-w-[14rem] sm:text-[10px] sm:tracking-[0.16em] md:max-w-none md:text-[11px] lg:text-mehr-mist"
          >
            {hero.tagline}
          </motion.p>
        </div>

        <div className="grid flex-1 gap-6 px-4 pb-8 pt-6 sm:gap-8 sm:px-8 sm:pb-10 sm:pt-8 md:gap-9 md:px-10 lg:grid-cols-2 lg:items-center lg:gap-10 lg:px-12 lg:pb-14 lg:pt-4 xl:gap-12 xl:px-16">
          <div className="relative z-10 w-full max-w-xl">
            <RevealHeadline
              text={hero.headline}
              tone="dark"
              className="max-w-[13ch] font-sans text-[clamp(1.7rem,7vw,4.15rem)] font-semibold leading-[1.08] tracking-[-0.04em] drop-shadow-[0_2px_20px_rgba(0,0,0,0.45)] sm:max-w-[15ch] sm:leading-[1.04]"
            />

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 16, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, delay: 0.72, ease }}
              className="mt-3.5 max-w-md text-[13px] leading-relaxed text-white/85 sm:mt-5 sm:text-[14px] md:mt-6 md:text-[15px]"
            >
              {hero.subheadline}
            </motion.p>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.9, ease }}
              className="mt-5 flex w-full flex-col gap-2.5 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-3"
            >
              <SpecularButton
                to="/contact"
                variant="light"
                size="lg"
                className="w-full justify-center sm:w-auto"
              >
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
                className="w-full justify-center sm:w-auto"
              >
                {hero.secondaryCta}
              </SpecularButton>
            </motion.div>
          </div>

          <div className="relative z-[2] w-full rounded-[1.25rem] bg-white p-2 shadow-[0_18px_48px_rgba(0,0,0,0.18)] sm:rounded-[1.75rem] sm:bg-white/95 sm:p-3.5 sm:backdrop-blur-sm md:rounded-[2rem] md:p-4 lg:bg-transparent lg:p-0 lg:shadow-none lg:backdrop-blur-none">
            <HeroLiveCards theme="light" />
          </div>
        </div>
      </div>
    </section>
  );
}
