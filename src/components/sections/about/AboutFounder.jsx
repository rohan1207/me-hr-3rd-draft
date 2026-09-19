"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";
import {
 Briefcase,
 Linkedin,
 Mail,
 MapPin,
 Sparkles,
 Target,
} from "lucide-react";
import { aboutContent } from "../../../data/content";

gsap.registerPlugin(ScrollTrigger);

const FOCUS_IMG = "/sonia_patra.jpeg";

function InfoCard({ item, Icon }) {
 return (
 <article className="flex h-full flex-col rounded-[1.25rem] border border-mehr-deep/10 bg-white p-5 shadow-soft sm:rounded-[1.4rem] sm:p-6">
 <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-mehr-panel text-mehr-deep">
 <Icon size={18} strokeWidth={1.85} />
 </span>
 <h3 className="mt-4 font-sans text-base font-semibold tracking-[-0.02em] text-mehr-ink sm:text-lg">
 {item.title}
 </h3>
 <p className="mt-2 line-clamp-4 text-[13px] leading-relaxed text-mehr-mist sm:text-sm">{item.desc}</p>
 {item.meta && (
 <div className="mt-3 flex flex-wrap gap-1.5">
 {item.meta.map((tag) => (
 <span
 key={tag}
 className="rounded-full bg-mehr-panel px-2.5 py-1 text-[10px] font-medium text-mehr-deep"
 >
 {tag}
 </span>
 ))}
 </div>
 )}
 {item.links && (
 <div className="mt-3 flex flex-col gap-1.5 text-[12px] text-mehr-mist">
 {item.links.map((link) =>
 link.href ? (
 <a
 key={link.label}
 href={link.href}
 target={link.href.startsWith("http") ? "_blank" : undefined}
 rel={link.href.startsWith("http") ? "noreferrer" : undefined}
 className="inline-flex items-center gap-1.5 transition hover:text-mehr-deep"
 >
 {link.icon}
 {link.label}
 </a>
 ) : (
 <span key={link.label} className="inline-flex items-center gap-1.5">
 {link.icon}
 {link.label}
 </span>
 )
 )}
 </div>
 )}
 </article>
 );
}

function FounderPortrait({ founder }) {
 return (
 <div className="relative mx-auto flex h-full w-full max-w-md flex-col overflow-hidden rounded-[1.5rem] border border-mehr-deep/10 bg-white shadow-soft sm:rounded-[1.75rem]">
 <div className="relative min-h-[320px] flex-1 sm:min-h-[380px]">
 <img
 src={FOCUS_IMG}
 alt={founder.name}
 className="absolute inset-0 h-full w-full object-cover object-top"
 />
 </div>
 <div className="border-t border-mehr-deep/8 bg-white px-5 py-4 text-center sm:px-6 sm:py-5">
 <p className="font-sans text-xl font-semibold tracking-[-0.02em] text-mehr-ink sm:text-2xl">
 {founder.name}
 </p>
 <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-mehr-deep">
 {founder.role}
 </p>
 </div>
 </div>
 );
}

function buildFounderCards(founder) {
 return [
 {
 title: "Founder & Director",
 desc: founder.intro,
 Icon: Sparkles,
 },
 {
 title: "Two decades in HR",
 desc: founder.bio[0],
 Icon: Briefcase,
 },
 {
 title: "Focus areas",
 desc: founder.bio[1],
 meta: founder.focus.slice(0, 3),
 Icon: Target,
 },
 {
 title: "Based in Pune",
 desc: "Connect with Sonia for leadership conversations, partnerships and HR engagement discussions.",
 Icon: MapPin,
 links: [
 {
 label: founder.location,
 icon: <MapPin size={13} className="text-mehr-deep" />,
 },
 {
 label: founder.email,
 href: `mailto:${founder.email}`,
 icon: <Mail size={13} className="text-mehr-deep" />,
 },
 {
 label: "LinkedIn",
 href: "https://www.linkedin.com/in/sonia-patra-a5605115b",
 icon: <Linkedin size={13} className="text-mehr-deep" />,
 },
 ],
 },
 ];
}

export default function AboutFounder() {
 const reduce = useReducedMotion();
 const { founder, mission } = aboutContent;
 const founderCards = buildFounderCards(founder);

 const sectionRef = useRef(null);
 const pinRef = useRef(null);
 const leftRef = useRef(null);
 const rightRef = useRef(null);
 const portraitRef = useRef(null);
 const hintRef = useRef(null);

 const [isDesktop, setIsDesktop] = useState(() =>
 typeof window !== "undefined" ? window.matchMedia("(min-width: 1024px)").matches : true
 );

 useEffect(() => {
 const mq = window.matchMedia("(min-width: 1024px)");
 const onChange = () => setIsDesktop(mq.matches);
 mq.addEventListener("change", onChange);
 return () => mq.removeEventListener("change", onChange);
 }, []);

 useGSAP(
 () => {
 if (reduce || !isDesktop || !pinRef.current) return undefined;

 const ctx = gsap.context(() => {
 gsap.set(leftRef.current, { xPercent: 28 });
 gsap.set(rightRef.current, { xPercent: -28 });
 gsap.set(portraitRef.current, { scale: 0.7, opacity: 0, y: 48 });
 gsap.set(hintRef.current, { opacity: 1 });

 const tl = gsap.timeline({
 scrollTrigger: {
 trigger: pinRef.current,
 start: "top top",
 end: "+=170%",
 pin: true,
 scrub: 0.7,
 anticipatePin: 1,
 invalidateOnRefresh: true,
 },
 });

 tl.to({}, { duration: 0.25 });
 tl.to(leftRef.current, { xPercent: 0, duration: 0.75, ease: "none" }, 0.25);
 tl.to(rightRef.current, { xPercent: 0, duration: 0.75, ease: "none" }, 0.25);
 tl.to(
 portraitRef.current,
 { scale: 1, opacity: 1, y: 0, duration: 0.75, ease: "none" },
 0.32
 );
 tl.to(hintRef.current, { opacity: 0, duration: 0.25, ease: "none" }, 0.25);
 }, sectionRef);

 requestAnimationFrame(() => ScrollTrigger.refresh());

 return () => ctx.revert();
 },
 { dependencies: [reduce, isDesktop], revertOnUpdate: true }
 );

 const header = (
 <div className="mx-auto max-w-2xl text-center">
 <p className="eyebrow">Meet the founder</p>
 <h2 className="mt-3 font-sans text-[clamp(1.8rem,3.6vw,2.75rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-mehr-ink">
 Leadership that keeps HR practical and business-aligned
 </h2>
 <p className="mt-3 text-sm leading-relaxed text-mehr-mist sm:text-[15px]">
 {mission.body}
 </p>
 </div>
 );

 if (reduce || !isDesktop) {
 return (
 <section id="founder" className="scroll-mt-28 bg-mehr-panel/50 py-12 text-mehr-ink sm:py-14">
 <div className="container-mehr page-gutter sm:px-3 md:px-4 lg:px-5">
 {header}
 <div className="mx-auto mt-8 aspect-[3/4] max-w-sm">
 <FounderPortrait founder={founder} />
 </div>
 <div className="mx-auto mt-6 grid max-w-lg gap-3 sm:max-w-none sm:grid-cols-2">
 {founderCards.map((item) => (
 <InfoCard key={item.title} item={item} Icon={item.Icon} />
 ))}
 </div>
 {/* {valuesBlock} */}
 </div>
 </section>
 );
 }

 return (
 <section id="founder" ref={sectionRef} className="scroll-mt-28 bg-mehr-panel/50 text-mehr-ink">
 <div ref={pinRef} className="flex min-h-screen flex-col justify-center py-12">
 <div className="container-mehr page-gutter sm:px-3 md:px-4 lg:px-5">
 {header}

 <div className="relative mx-auto mt-10 grid h-[min(66vh,540px)] max-w-6xl grid-cols-[1fr_minmax(240px,0.95fr)_1fr] items-stretch gap-3 xl:gap-4">
 <div ref={leftRef} className="relative z-20 grid grid-rows-2 gap-3 will-change-transform">
 {founderCards.slice(0, 2).map((item) => (
 <InfoCard key={item.title} item={item} Icon={item.Icon} />
 ))}
 </div>

 <div ref={portraitRef} className="relative z-10 will-change-transform">
 <FounderPortrait founder={founder} />
 </div>

 <div ref={rightRef} className="relative z-20 grid grid-rows-2 gap-3 will-change-transform">
 {founderCards.slice(2, 4).map((item) => (
 <InfoCard key={item.title} item={item} Icon={item.Icon} />
 ))}
 </div>
 </div>

 <p ref={hintRef} className="mt-7 text-center text-[11px] tracking-wide text-mehr-muted">
 Keep scrolling to meet the founder
 </p>
 </div>
 </div>

 {/* Values grid commented out
 <div className="container-mehr page-gutter pb-12 sm:px-3 md:px-4 lg:px-5 lg:pb-14">
 {valuesBlock}
 </div>
 */}
 </section>
 );
}
