"use client";

import { Link } from "@/components/compat/router";
import { ArrowUpRight } from "lucide-react";
import { exploreOtherServices, exploreOtherServicesSection } from "../../data/content";
import Reveal, { RevealItem, RevealStagger } from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";

export default function ExploreOtherServices({ excludePath }) {
 const items = excludePath
 ? exploreOtherServices.filter((s) => s.path !== excludePath)
 : exploreOtherServices;

 return (
 <section className="section-pad bg-white">
 <div className="container-mehr page-gutter sm:px-3 md:px-4 lg:px-5">
 <SectionHeading
 eyebrow={exploreOtherServicesSection.eyebrow}
 title={exploreOtherServicesSection.title}
 />
 <RevealStagger className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
 {items.map((item) => (
 <RevealItem key={item.path}>
 <Link
 to={item.path}
 className="group flex h-full flex-col rounded-[1.5rem] border border-mehr-deep/8 bg-mehr-panel/50 p-6 transition hover:-translate-y-1 hover:border-mehr-deep/20 hover:bg-white hover:shadow-soft"
 >
 <h3 className="font-sans text-lg font-semibold text-mehr-ink">{item.title}</h3>
 <p className="mt-2 flex-1 text-sm leading-relaxed text-mehr-mist">{item.desc}</p>
 <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-mehr-deep transition group-hover:text-mehr-ink">
 {item.cta}
 <ArrowUpRight size={15} className="transition group-hover:translate-x-0.5" />
 </span>
 </Link>
 </RevealItem>
 ))}
 </RevealStagger>
 </div>
 </section>
 );
}
