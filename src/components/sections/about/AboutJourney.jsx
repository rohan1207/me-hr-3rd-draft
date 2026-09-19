"use client";

import { useRef } from "react";
import {
 motion,
 useInView,
 useReducedMotion,
 useScroll,
 useTransform,
} from "framer-motion";
import Reveal from "../../ui/Reveal";
import { aboutContent } from "../../../data/content";

const ease = [0.22, 1, 0.36, 1];

export default function AboutJourney() {
 const reduce = useReducedMotion();
 const { journey } = aboutContent;
 const trackRef = useRef(null);
 const listRef = useRef(null);
 const inView = useInView(listRef, { once: true, margin: "-12% 0px" });

 const { scrollYProgress } = useScroll({
 target: trackRef,
 offset: ["start end", "end start"],
 });
 const lineScale = useTransform(scrollYProgress, [0.15, 0.75], [0, 1]);

 return (
 <section className="overflow-hidden bg-mehr-panel/50 py-10 text-mehr-ink sm:py-12 lg:py-14">
 <div className="container-mehr page-gutter sm:px-3 md:px-4 lg:px-5">
 <Reveal>
 <p className="eyebrow">{journey.eyebrow}</p>
 <h2 className="mt-3 max-w-[18ch] font-sans text-[clamp(1.75rem,3.8vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-mehr-ink">
 {journey.title}
 </h2>
 </Reveal>

 <div ref={trackRef} className="relative mt-10 lg:mt-12">
 <div
 aria-hidden
 className="absolute left-0 right-0 top-[1.15rem] hidden h-px bg-mehr-deep/10 lg:block"
 />
 <motion.div
 aria-hidden
 style={{ scaleX: inView || reduce ? lineScale : 0, transformOrigin: "left center" }}
 className="absolute left-0 right-0 top-[1.15rem] hidden h-px bg-mehr-deep lg:block"
 />

 <ol ref={listRef} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
 {journey.steps.map((step, i) => (
 <motion.li
 key={step.title}
 initial={reduce ? false : { opacity: 0, x: -48 }}
 animate={
 inView || reduce
 ? { opacity: 1, x: 0 }
 : { opacity: 0, x: -48 }
 }
 transition={{
 duration: 0.65,
 delay: reduce ? 0 : i * 0.14,
 ease,
 }}
 whileHover={reduce ? undefined : { y: -5 }}
 whileTap={reduce ? undefined : { scale: 0.98 }}
 className="relative rounded-[1.35rem] border border-mehr-deep/10 bg-white p-5 shadow-soft transition hover:border-mehr-deep/20 hover:shadow-float sm:rounded-[1.5rem] sm:p-6"
 >
 <span className="relative z-10 mb-4 flex h-6 w-6 items-center justify-center rounded-full bg-mehr-deep text-[10px] font-bold text-white lg:absolute lg:-top-3 lg:left-6 lg:mb-0">
 {i + 1}
 </span>
 <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-mehr-deep lg:mt-4">
 {step.year}
 </p>
 <h3 className="mt-2 font-sans text-lg font-semibold tracking-[-0.02em] text-mehr-ink">
 {step.title}
 </h3>
 <p className="mt-2 text-[13px] leading-relaxed text-mehr-mist">{step.body}</p>
 </motion.li>
 ))}
 </ol>
 </div>
 </div>
 </section>
 );
}
