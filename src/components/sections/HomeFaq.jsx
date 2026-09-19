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
        <div className="grid items-start gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12 xl:gap-16">
          <Reveal className="lg:sticky lg:top-28">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-mehr-deep text-white shadow-soft">
              <MessageCircleQuestion size={20} strokeWidth={1.85} />
            </span>
            <p className="eyebrow mt-5">FAQs</p>
            <h2 className="mt-3 max-w-[14ch] font-sans text-[clamp(1.75rem,3.6vw,2.75rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-mehr-ink">
              Questions businesses ask before they start.
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-mehr-mist sm:text-[15px]">
              Clear answers on HR outsourcing, how we engage, and when
              flexible support makes sense for growing teams.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <SpecularButton to="/faqs" variant="brand" size="md">
                View all FAQs
                <ArrowUpRight size={14} />
              </SpecularButton>
              <SpecularButton to="/contact" variant="light" size="md">
                {ctas.primary}
              </SpecularButton>
            </div>

            <p className="mt-6 text-[13px] text-mehr-muted">
              Still unsure?{" "}
              <Link
                to="/contact"
                className="font-semibold text-mehr-deep underline-offset-2 hover:underline"
              >
                Talk to us
              </Link>{" "}
              — we’ll help you pick the right model.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="overflow-hidden rounded-[1.5rem] border border-mehr-deep/10 bg-mehr-panel/50 px-4 shadow-soft sm:rounded-[1.75rem] sm:px-6 lg:px-7">
              <div className="border-b border-mehr-deep/10 py-4 sm:py-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-mehr-deep">
                  {faqSections[0].title}
                </p>
                <p className="mt-1 text-sm text-mehr-mist">
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
