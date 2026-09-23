"use client";

import { Link } from "@/components/compat/router";
import { ArrowUpRight, MessageCircleQuestion } from "lucide-react";
import { faqSections, ctas } from "../../data/content";
import Accordion from "../ui/Accordion";
import SpecularButton from "../ui/SpecularButton";
import Reveal from "../ui/Reveal";

/** Homepage FAQ preview — high-intent questions from the main outsourcing set. */
const HOME_FAQS = faqSections[0].items.slice(0, 5);

export default function HomeFaq() {
  return (
    <section className="relative overflow-hidden bg-white section-pad">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_0%_0%,rgba(20,196,173,0.1),transparent_55%),radial-gradient(ellipse_45%_40%_at_100%_100%,rgba(11,95,88,0.07),transparent_50%)]"
      />

      <div className="container-mehr page-gutter relative z-10 sm:px-3 md:px-4 lg:px-5">
        <div className="grid items-start gap-7 sm:gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12 xl:gap-16">
          <Reveal className="text-center lg:sticky lg:top-28 lg:text-left">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-mehr-deep text-white shadow-soft sm:h-11 sm:w-11">
              <MessageCircleQuestion size={18} strokeWidth={1.85} className="sm:hidden" />
              <MessageCircleQuestion
                size={20}
                strokeWidth={1.85}
                className="hidden sm:block"
              />
            </span>
            <p className="eyebrow mt-4 sm:mt-5">FAQs</p>
            <h2 className="mx-auto mt-2.5 max-w-[16ch] font-sans text-[clamp(1.5rem,6.2vw,2.75rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-mehr-ink sm:mt-3 sm:max-w-[14ch] sm:leading-[1.06] lg:mx-0">
              Questions businesses ask before they start.
            </h2>
            <p className="mx-auto mt-3.5 max-w-sm text-[13px] leading-relaxed text-mehr-mist sm:mt-4 sm:text-sm md:text-[15px] lg:mx-0">
              Clear answers on HR outsourcing, how we engage, and when flexible
              support makes sense for growing teams.
            </p>

            {/* Phone: full-width stack · sm+: side-by-side centered · lg: left */}
            <div className="mt-6 flex w-full flex-col items-stretch gap-2.5 sm:mt-7 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-3 lg:justify-start">
              <SpecularButton
                to="/faqs"
                variant="brand"
                size="md"
                className="w-full justify-center sm:w-auto"
              >
                View all FAQs
                <ArrowUpRight size={14} />
              </SpecularButton>
              <SpecularButton
                to="/contact"
                variant="light"
                size="md"
                className="w-full justify-center sm:w-auto"
              >
                {ctas.primary}
              </SpecularButton>
            </div>

            <p className="mt-5 text-[12px] text-mehr-muted sm:mt-6 sm:text-[13px]">
              Still unsure?{" "}
              <Link
                to="/contact"
                className="font-semibold text-mehr-deep underline-offset-2 hover:underline"
              >
                Talk to us
              </Link>{" "}
              — we&apos;ll help you pick the right model.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="overflow-hidden rounded-[1.25rem] border border-mehr-deep/10 bg-mehr-panel/50 px-3.5 shadow-soft sm:rounded-[1.5rem] sm:px-5 md:rounded-[1.75rem] md:px-6 lg:px-7">
              <div className="border-b border-mehr-deep/10 py-3.5 sm:py-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-mehr-deep sm:text-[11px]">
                  {faqSections[0].title}
                </p>
                <p className="mt-1 text-[13px] text-mehr-mist sm:text-sm">
                  {HOME_FAQS.length} common questions
                </p>
              </div>
              <Accordion items={HOME_FAQS} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
