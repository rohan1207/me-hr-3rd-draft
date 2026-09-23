"use client";

import { Link } from "@/components/compat/router";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Reveal, { RevealItem, RevealStagger } from "../../ui/Reveal";
import { aboutContent, serviceModels } from "../../../data/content";

export default function AboutModels() {
 const reduce = useReducedMotion();
 const { models } = aboutContent;

 return (
 <section className="bg-white py-9 sm:py-12 lg:py-14">
 <div className="container-mehr page-gutter sm:px-3 md:px-4 lg:px-5">
 <div className="flex flex-col gap-3 text-center lg:flex-row lg:items-end lg:justify-between lg:text-left">
 <Reveal className="max-w-xl">
 <p className="eyebrow">{models.eyebrow}</p>
 <h2 className="mx-auto mt-3 font-sans text-[clamp(1.45rem,6.2vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-mehr-ink lg:mx-0">
 {models.title}
 </h2>
 </Reveal>
 <Reveal delay={0.08} className="mx-auto max-w-md lg:mx-0">
 <p className="text-sm leading-relaxed text-mehr-mist">{models.body}</p>
 </Reveal>
 </div>

 <RevealStagger className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3 lg:gap-4" stagger={0.08}>
 {serviceModels.map((model, i) => (
 <RevealItem key={model.id}>
 <motion.div whileHover={reduce ? undefined : { y: -5 }} className="h-full">
 <Link
 to={model.path}
 className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-mehr-deep/10 bg-mehr-panel p-4 transition hover:border-mehr-deep/25 hover:bg-white hover:shadow-float sm:rounded-[1.65rem] sm:p-6"
 >
 <div className="flex items-center justify-between">
 <span className="font-sans text-[11px] font-semibold tabular-nums text-mehr-deep">
 {String(i + 1).padStart(2, "0")}
 </span>
 <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-mehr-deep text-white transition group-hover:scale-105 group-active:scale-95">
 <ArrowUpRight size={16} />
 </span>
 </div>
 <h3 className="mt-8 font-sans text-xl font-semibold tracking-[-0.02em] text-mehr-ink">
 {model.title}
 </h3>
 <p className="mt-2 flex-1 text-[13px] leading-relaxed text-mehr-mist sm:text-sm">
 {model.desc}
 </p>
 <p className="mt-5 text-[12px] font-semibold text-mehr-deep">{model.cta}</p>
 </Link>
 </motion.div>
 </RevealItem>
 ))}
 </RevealStagger>
 </div>
 </section>
 );
}
