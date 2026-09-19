"use client";

import { motion, useReducedMotion } from "framer-motion";
import { homeContent } from "../../data/content";
import RevealHeadline from "./RevealHeadline";
import HeroLiveCards from "./HeroLiveCards";
import Silk from "./Silk";
import SpecularButton from "./SpecularButton";

const ease = [0.22, 1, 0.36, 1];
// Deep teal rather than the brand mid-teal: the shader washes out on bright displays.
const SILK_COLOR = "#0b5f58";

export default function Hero() {
 const reduce = useReducedMotion();
 const { hero } = homeContent;

 return (
 <section className="relative min-h-[100svh] overflow-hidden bg-mehr-ink text-white lg:min-h-[min(100svh,920px)]">
 <div className="pointer-events-none absolute inset-0">
 {reduce ? (
 <div className="absolute inset-0" style={{ backgroundColor: SILK_COLOR }} />
 ) : (
 <Silk
 speed={3}
 scale={1}
 color={SILK_COLOR}
 noiseIntensity={1}
 rotation={0}
 />
 )}
 {/* Layered scrim keeps the backdrop even across bright and dim screens */}
 <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(10,10,10,0.6),rgba(10,10,10,0.2)_45%,rgba(10,10,10,0.44))]" />
 </div>

 <div
 className="pointer-events-none absolute inset-3 z-[3] rounded-[1.25rem] border border-white/[0.08] sm:inset-4 sm:rounded-[1.5rem] lg:inset-5"
 aria-hidden
 />

 <div className="relative z-10 flex min-h-[100svh] flex-col lg:min-h-[min(100svh,920px)]">
 <div className="flex items-start justify-between gap-4 px-6 pt-6 sm:px-9 sm:pt-8 lg:px-12 lg:pt-10">
 <motion.p
 initial={reduce ? false : { opacity: 0, y: -10 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.55, delay: 0.1, ease }}
 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/55 sm:text-[11px] drop-shadow-sm"
 >
 {hero.eyebrow}
 </motion.p>
 <motion.p
 initial={reduce ? false : { opacity: 0, y: -10 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.55, delay: 0.18, ease }}
 className="max-w-[14rem] text-right text-[10px] font-semibold uppercase leading-relaxed tracking-[0.16em] text-white/55 sm:max-w-none sm:text-[11px] drop-shadow-sm"
 >
 {hero.tagline}
 </motion.p>
 </div>

 <div className="grid flex-1 items-end gap-8 px-6 pb-10 pt-10 sm:px-9 sm:pb-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-10 lg:px-12 lg:pb-16 lg:pt-6 xl:px-16">
 <div className="relative z-10 max-w-xl pb-1 lg:pb-6">
 <RevealHeadline
 text={hero.headline}
 tone="dark"
 className="max-w-[15ch] font-sans text-[clamp(2.2rem,5.4vw,4.15rem)] font-semibold leading-[1.04] tracking-[-0.04em] drop-shadow-[0_2px_24px_rgba(0,0,0,0.35)]"
 />

 <motion.p
 initial={reduce ? false : { opacity: 0, y: 16, filter: "blur(6px)" }}
 animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
 transition={{ duration: 0.7, delay: 0.72, ease }}
 className="mt-5 max-w-md text-[14px] leading-relaxed text-white/85 sm:mt-6 sm:text-[15px] drop-shadow-sm"
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
 tintOpacity={0.12}
 blur={8}
 autoAnimate
 >
 {hero.secondaryCta}
 </SpecularButton>
 </motion.div>
 </div>

 <div className="relative z-[2] w-full lg:justify-self-end">
 <HeroLiveCards />
 </div>
 </div>
 </div>
 </section>
 );
}
