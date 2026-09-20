"use client";

import { useRef } from "react";
import { Link } from "@/components/compat/router";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  ChevronRight,
  ClipboardList,
  Lightbulb,
  RefreshCw,
  Search,
  Settings2,
} from "lucide-react";
import { howItWorks, homeContent } from "../../data/content";
import SpecularButton from "../ui/SpecularButton";
import Reveal from "../ui/Reveal";
import ScrollStack, { ScrollStackItem } from "../ui/ScrollStack";
import ProcessGlobe from "./ProcessGlobe";

const ease = [0.22, 1, 0.36, 1];

const section = homeContent.howItWorksSection;
const STEP_ICONS = [Search, Settings2, ClipboardList, Lightbulb, RefreshCw];

function WordReveal({ text, className = "" }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });
  const words = text.split(/\s+/);

  if (reduce) {
    return (
      <h2 ref={ref} className={className}>
        {text}
      </h2>
    );
  }

  return (
    <h2 ref={ref} className={className}>
      {words.map((word, i) => {
        const accent =
          word.toLowerCase().includes("structured") ||
          word.toLowerCase().includes("outsourced");
        return (
          <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom">
            <motion.span
              className={`inline-block ${accent ? "text-mehr-deep" : ""}`}
              initial={{ y: "105%", opacity: 0, filter: "blur(6px)" }}
              animate={inView ? { y: "0%", opacity: 1, filter: "blur(0px)" } : undefined}
              transition={{ duration: 0.7, delay: 0.05 + i * 0.045, ease }}
            >
              {word}
              {i < words.length - 1 ? "\u00A0" : ""}
            </motion.span>
          </span>
        );
      })}
    </h2>
  );
}

export default function HowItWorks() {
  return (
    // overflow-clip (not hidden) keeps the decorative mesh contained without
    // turning this section into a scrollport, which would break sticky pinning.
    <section className="section-pad surface-white !overflow-clip !pb-0 sm:!pb-2 lg:!pb-4">
      <div className="pointer-events-none absolute inset-0 bg-mesh-teal opacity-70" aria-hidden />

      <div className="container-mehr page-gutter relative z-10 sm:px-3 md:px-4 lg:px-5">
        <div className="grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12 xl:gap-16">
          <div className="flex flex-col justify-center">
            <Reveal>
              <p className="eyebrow mb-4">{section.eyebrow}</p>
            </Reveal>
            <WordReveal
              text={section.title}
              className="max-w-[16ch] font-sans text-[clamp(1.7rem,3.8vw,3.1rem)] font-semibold leading-[1.12] tracking-[-0.03em] text-mehr-ink"
            />
            <Reveal delay={0.2}>
              <p className="mt-4 max-w-md text-[14px] leading-relaxed text-mehr-mist sm:text-[15px]">
                {section.body}
              </p>
            </Reveal>

            <Reveal delay={0.25} className="mt-7 flex flex-wrap items-center gap-3">
              <SpecularButton to="/contact" variant="brand" size="md">
                {section.primaryCta}
                <ArrowUpRight size={15} />
              </SpecularButton>
              <Link
                to="/services"
                className="inline-flex items-center gap-1.5 rounded-full border border-mehr-deep/20 bg-white px-5 py-3 text-sm font-semibold text-mehr-deep transition hover:border-mehr-deep hover:bg-mehr-panel"
              >
                {section.secondaryCta}
                <ChevronRight size={16} />
              </Link>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="min-h-[340px] sm:min-h-[400px] lg:min-h-[440px]">
            <ProcessGlobe />
          </Reveal>
        </div>

        {/* Engagement — heading + image pinned left, cards stack on scroll at right */}
        <div className="mt-6 grid gap-6 border-t border-mehr-deep/8 pt-6 sm:mt-8 sm:pt-8 lg:mt-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12 lg:pt-10">
          <Reveal className="lg:sticky lg:top-[7rem] lg:self-start">
            <p className="eyebrow">{section.processEyebrow}</p>
            <h3 className="mt-3 max-w-[20ch] font-sans text-[clamp(1.4rem,2.6vw,2.1rem)] font-semibold leading-[1.15] tracking-[-0.03em] text-mehr-ink">
              {section.processTitle}
            </h3>

            <div className="mt-6 overflow-hidden rounded-[1.35rem] border border-mehr-deep/8 bg-mehr-panel shadow-soft sm:mt-7 sm:rounded-[1.5rem]">
              <img
                src="/about/engagement-path.jpg"
                alt="A calm planning conversation — aligning on the path ahead together"
                className="aspect-[4/3] h-auto max-h-[min(28vh,14rem)] w-full object-cover object-center sm:max-h-[min(32vh,16rem)] lg:max-h-[min(36vh,18rem)]"
                loading="lazy"
                decoding="async"
              />
            </div>
          </Reveal>

          <ScrollStack itemStackDistance={16} itemScale={0.03} scrollPerCard={0.7} pinOffset={200}>
            {howItWorks.map((item, i) => {
              const Icon = STEP_ICONS[i] || Search;
              const dark = i % 2 === 0;
              return (
                <ScrollStackItem key={item.step}>
                  <article
                    className={`flex min-h-[14rem] flex-col rounded-[1.5rem] border p-6 shadow-card sm:min-h-[15rem] sm:rounded-[1.75rem] sm:p-7 ${
                      dark
                        ? "border-mehr-deep bg-mehr-deep text-white"
                        : "border-mehr-deep/10 bg-white text-mehr-ink"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
                          dark
                            ? "bg-white/15 text-white"
                            : "bg-mehr-teal-soft text-mehr-deep"
                        }`}
                      >
                        <Icon size={19} strokeWidth={1.85} />
                      </span>
                      <span
                        className={`font-sans text-[13px] font-semibold tabular-nums ${
                          dark ? "text-white/55" : "text-mehr-muted"
                        }`}
                      >
                        {item.step}
                      </span>
                    </div>

                    <div className="mt-auto pt-7">
                      <h4
                        className={`font-sans text-xl font-semibold tracking-tight sm:text-[1.35rem] ${
                          dark ? "text-white" : "text-mehr-ink"
                        }`}
                      >
                        {item.title}
                      </h4>
                      <p
                        className={`mt-2.5 text-[14px] leading-relaxed sm:text-[15px] ${
                          dark ? "text-white/75" : "text-mehr-mist"
                        }`}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </article>
                </ScrollStackItem>
              );
            })}
          </ScrollStack>
        </div>
      </div>
    </section>
  );
}
