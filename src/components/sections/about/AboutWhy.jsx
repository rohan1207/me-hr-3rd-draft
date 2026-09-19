"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
 Briefcase,
 CheckCircle2,
 Layers,
 RefreshCw,
 ShieldCheck,
 Wrench,
} from "lucide-react";
import Reveal from "../../ui/Reveal";
import { aboutContent } from "../../../data/content";

const icons = [Briefcase, ShieldCheck, Wrench, Layers, CheckCircle2, RefreshCw];

const WHY_IMAGE = "/about/why-collab.png";

export default function AboutWhy() {
 const reduce = useReducedMotion();
 const [active, setActive] = useState(0);
 const { whyTitle, whyChoose } = aboutContent;

 return (
 <section id="why" className="scroll-mt-28 bg-white py-10 sm:py-12 lg:py-14">
 <div className="container-mehr page-gutter sm:px-3 md:px-4 lg:px-5">
 <div className="grid items-stretch gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:gap-6">
 <Reveal>
 <div className="relative h-full min-h-[340px] overflow-hidden rounded-[1.75rem] sm:rounded-[2rem]">
 <img src={WHY_IMAGE} alt="" className="absolute inset-0 h-full w-full object-cover" />
 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10" />
 <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
 <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-mehr-teal">
 Why me-HR
 </p>
 <h2 className="mt-3 max-w-[14ch] font-sans text-[clamp(1.5rem,3vw,2.25rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-white">
 {whyTitle}
 </h2>
 </div>
 </div>
 </Reveal>

 <Reveal delay={0.08}>
 <div className="grid gap-2.5 sm:grid-cols-2 sm:gap-3">
 {whyChoose.map((item, i) => {
 const Icon = icons[i] || CheckCircle2;
 const on = active === i;
 return (
 <motion.button
 key={item.title}
 type="button"
 onMouseEnter={() => setActive(i)}
 onFocus={() => setActive(i)}
 onClick={() => setActive(i)}
 whileHover={reduce ? undefined : { y: -3 }}
 whileTap={reduce ? undefined : { scale: 0.98 }}
 className={`rounded-[1.25rem] border p-4 text-left outline-none transition focus-visible:ring-2 focus-visible:ring-mehr-deep/30 sm:rounded-[1.35rem] sm:p-5 ${
 on
 ? "border-mehr-deep bg-mehr-deep text-white shadow-float"
 : "border-mehr-deep/10 bg-mehr-panel text-mehr-ink hover:border-mehr-deep/20 hover:bg-white"
 }`}
 >
 <Icon
 size={18}
 className={on ? "text-white" : "text-mehr-deep"}
 strokeWidth={1.9}
 />
 <p className="mt-3 font-sans text-[13px] font-semibold tracking-[-0.01em] sm:text-sm">
 {item.title}
 </p>
 <AnimatePresence mode="wait">
 {on && (
 <motion.p
 key="desc"
 initial={{ opacity: 0, height: 0 }}
 animate={{ opacity: 1, height: "auto" }}
 exit={{ opacity: 0, height: 0 }}
 className="mt-1.5 overflow-hidden text-[12px] leading-relaxed text-white/75"
 >
 {item.desc}
 </motion.p>
 )}
 </AnimatePresence>
 </motion.button>
 );
 })}
 </div>
 </Reveal>
 </div>
 </div>
 </section>
 );
}
