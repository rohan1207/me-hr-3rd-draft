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

function readHeaderPx() {
  if (typeof window === "undefined") return 64;
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue("--header-height")
    .trim();
  if (raw.endsWith("rem")) return parseFloat(raw) * 16;
  if (raw.endsWith("px")) return parseFloat(raw);
  const n = parseFloat(raw);
  return Number.isFinite(n) ? n : 64;
}

function InfoCard({ item, Icon, dense = false }) {
  return (
    <article
      className={`flex h-full flex-col rounded-[1.25rem] border border-mehr-deep/10 bg-white shadow-soft sm:rounded-[1.4rem] ${
        dense ? "p-3" : "p-4 sm:p-6"
      }`}
    >
      <span
        className={`flex items-center justify-center rounded-xl bg-mehr-panel text-mehr-deep ${
          dense ? "h-8 w-8" : "h-10 w-10"
        }`}
      >
        <Icon size={dense ? 15 : 18} strokeWidth={1.85} />
      </span>
      <h3
        className={`font-sans font-semibold tracking-[-0.02em] text-mehr-ink ${
          dense
            ? "mt-2 text-[13px] leading-snug"
            : "mt-4 text-base sm:text-lg"
        }`}
      >
        {item.title}
      </h3>
      <p
        className={`leading-relaxed text-mehr-mist ${
          dense
            ? "mt-1 line-clamp-3 text-[11px]"
            : "mt-2 line-clamp-4 text-[13px] sm:text-sm"
        }`}
      >
        {item.desc}
      </p>
      {item.meta && !dense && (
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
        <div
          className={`flex flex-col text-mehr-mist ${
            dense ? "mt-1.5 gap-0.5 text-[10px]" : "mt-3 gap-1.5 text-[12px]"
          }`}
        >
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
                <span className="truncate">{link.label}</span>
              </a>
            ) : (
              <span key={link.label} className="inline-flex items-center gap-1.5">
                {link.icon}
                <span className="truncate">{link.label}</span>
              </span>
            )
          )}
        </div>
      )}
    </article>
  );
}

/** Desktop portrait with name band */
function FounderPortrait({ founder }) {
  return (
    <div className="relative mx-auto flex h-full w-full max-w-md flex-col overflow-hidden rounded-[1.5rem] border border-mehr-deep/10 bg-white shadow-soft sm:rounded-[1.75rem]">
      <div className="relative min-h-[260px] flex-1 sm:min-h-[380px]">
        <img
          src={FOCUS_IMG}
          alt={founder.name}
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
      </div>
      <div className="border-t border-mehr-deep/8 bg-white px-5 py-3.5 text-center sm:px-6 sm:py-5">
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

/** Phone: clear photo, minimal name under it — no card chrome on the image */
function FounderPortraitPhone({ founder }) {
  return (
    <div className="mx-auto w-full max-w-[240px] sm:max-w-[260px]">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.35rem] shadow-soft">
        <img
          src={FOCUS_IMG}
          alt={founder.name}
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
      </div>
      <div className="mt-2.5 text-center">
        <p className="font-sans text-[15px] font-semibold tracking-[-0.02em] text-mehr-ink">
          {founder.name}
        </p>
        <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-mehr-deep">
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
  const cardsRef = useRef(null);
  const portraitRef = useRef(null);
  const hintRef = useRef(null);

  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(min-width: 1024px)").matches
      : true
  );

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => setIsDesktop(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useGSAP(
    () => {
      if (reduce || !pinRef.current) return undefined;

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinRef.current,
            start: () => `top top+=${readHeaderPx()}`,
            end: isDesktop ? "+=170%" : "+=150%",
            pin: true,
            scrub: isDesktop ? 0.7 : 0.9,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        if (isDesktop) {
          gsap.set(leftRef.current, { xPercent: 28 });
          gsap.set(rightRef.current, { xPercent: -28 });
          gsap.set(portraitRef.current, { scale: 0.7, opacity: 0, y: 48 });
          gsap.set(hintRef.current, { opacity: 1 });

          tl.to({}, { duration: 0.25 });
          tl.to(leftRef.current, { xPercent: 0, duration: 0.75, ease: "none" }, 0.25);
          tl.to(rightRef.current, { xPercent: 0, duration: 0.75, ease: "none" }, 0.25);
          tl.to(
            portraitRef.current,
            { scale: 1, opacity: 1, y: 0, duration: 0.75, ease: "none" },
            0.32
          );
          tl.to(hintRef.current, { opacity: 0, duration: 0.25, ease: "none" }, 0.25);
        } else {
          // Vertical only: photo first, then cards rise from below (never over photo)
          const cardNodes = cardsRef.current
            ? Array.from(cardsRef.current.children)
            : [];

          gsap.set(portraitRef.current, { scale: 0.9, opacity: 0, y: 28 });
          gsap.set(cardNodes, { y: 56, opacity: 0 });
          gsap.set(hintRef.current, { opacity: 1 });

          tl.to({}, { duration: 0.15 });
          tl.to(
            portraitRef.current,
            { scale: 1, opacity: 1, y: 0, duration: 0.55, ease: "none" },
            0.15
          );
          tl.to(hintRef.current, { opacity: 0, duration: 0.2, ease: "none" }, 0.2);
          tl.to(
            cardNodes,
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              ease: "none",
              stagger: 0.08,
            },
            0.4
          );
        }
      }, sectionRef);

      requestAnimationFrame(() => ScrollTrigger.refresh());

      return () => ctx.revert();
    },
    { dependencies: [reduce, isDesktop], revertOnUpdate: true }
  );

  const header = (
    <div className="mx-auto max-w-2xl text-center">
      <p className="eyebrow">Meet the founder</p>
      <h2 className="mt-2 font-sans text-[clamp(1.3rem,5.5vw,2.75rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-mehr-ink sm:mt-3">
        Leadership that keeps HR practical and business-aligned
      </h2>
      <p className="mt-2 text-[12px] leading-relaxed text-mehr-mist sm:mt-3 sm:text-sm sm:text-[15px]">
        {mission.body}
      </p>
    </div>
  );

  if (reduce) {
    return (
      <section
        id="founder"
        className="scroll-mt-28 bg-mehr-panel/50 py-9 text-mehr-ink sm:py-14"
      >
        <div className="container-mehr page-gutter sm:px-3 md:px-4 lg:px-5">
          {header}
          <div className="mx-auto mt-8 w-full max-w-sm">
            <FounderPortrait founder={founder} />
          </div>
          <div className="mx-auto mt-6 grid max-w-lg gap-2.5 sm:max-w-none sm:grid-cols-2 sm:gap-3">
            {founderCards.map((item) => (
              <InfoCard key={item.title} item={item} Icon={item.Icon} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Phone: vertical scrub — photo clear, cards rise from below
  if (!isDesktop) {
    return (
      <section
        id="founder"
        ref={sectionRef}
        className="scroll-mt-28 bg-mehr-panel/50 text-mehr-ink"
      >
        <div
          ref={pinRef}
          className="flex min-h-[calc(100svh-var(--header-height))] flex-col justify-start pb-4 pt-2.5 sm:pb-5 sm:pt-3"
        >
          <div className="container-mehr page-gutter sm:px-3 md:px-4">
            {header}

            <div className="mx-auto mt-3 flex max-w-md flex-col sm:mt-4">
              <div
                ref={portraitRef}
                className="relative z-10 will-change-transform"
              >
                <FounderPortraitPhone founder={founder} />
              </div>

              <div
                ref={cardsRef}
                className="relative z-0 mt-3 grid grid-cols-2 gap-2 will-change-transform sm:mt-4 sm:gap-2.5"
              >
                {founderCards.map((item) => (
                  <InfoCard
                    key={item.title}
                    item={item}
                    Icon={item.Icon}
                    dense
                  />
                ))}
              </div>
            </div>

            <p
              ref={hintRef}
              className="mt-3 text-center text-[10px] tracking-wide text-mehr-muted sm:mt-4 sm:text-[11px]"
            >
              Keep scrolling to meet the founder
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Desktop: horizontal pin scrub
  return (
    <section
      id="founder"
      ref={sectionRef}
      className="scroll-mt-28 bg-mehr-panel/50 text-mehr-ink"
    >
      <div ref={pinRef} className="flex min-h-screen flex-col justify-center py-12">
        <div className="container-mehr page-gutter sm:px-3 md:px-4 lg:px-5">
          {header}

          <div className="relative mx-auto mt-10 grid h-[min(66vh,540px)] max-w-6xl grid-cols-[1fr_minmax(240px,0.95fr)_1fr] items-stretch gap-3 xl:gap-4">
            <div
              ref={leftRef}
              className="relative z-20 grid grid-rows-2 gap-3 will-change-transform"
            >
              {founderCards.slice(0, 2).map((item) => (
                <InfoCard key={item.title} item={item} Icon={item.Icon} />
              ))}
            </div>

            <div ref={portraitRef} className="relative z-10 will-change-transform">
              <FounderPortrait founder={founder} />
            </div>

            <div
              ref={rightRef}
              className="relative z-20 grid grid-rows-2 gap-3 will-change-transform"
            >
              {founderCards.slice(2, 4).map((item) => (
                <InfoCard key={item.title} item={item} Icon={item.Icon} />
              ))}
            </div>
          </div>

          <p
            ref={hintRef}
            className="mt-7 text-center text-[11px] tracking-wide text-mehr-muted"
          >
            Keep scrolling to meet the founder
          </p>
        </div>
      </div>
    </section>
  );
}
