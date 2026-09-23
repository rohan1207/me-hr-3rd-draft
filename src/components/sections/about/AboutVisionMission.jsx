"use client";

import { Link } from "@/components/compat/router";
import { ArrowUpRight, Compass, HeartHandshake, TrendingUp } from "lucide-react";
import Reveal, { RevealItem, RevealStagger } from "../../ui/Reveal";
import { aboutContent } from "../../../data/content";

const BLOCKS = [
  {
    eyebrow: "Vision",
    Icon: TrendingUp,
    titleKey: "vision",
    getTitle: (c) => c.vision.title,
    getBody: (c) => c.vision.body,
  },
  {
    eyebrow: "Mission",
    Icon: HeartHandshake,
    titleKey: "mission",
    getTitle: (c) => c.mission.body,
    getBody: (c) => c.story.body[1],
    cta: { to: "/contact", label: "Book a Consultation" },
  },
  {
    eyebrow: "How we partner",
    Icon: Compass,
    getTitle: () => "HR that scales with the organisation.",
    getBody: (c) => c.story.body[0],
  },
];

export default function AboutVisionMission() {
  const content = aboutContent;

  return (
    <section className="bg-mehr-panel/50 py-9 sm:py-12 lg:py-14">
      <div className="container-mehr page-gutter sm:px-3 md:px-4 lg:px-5">
        <Reveal className="text-center lg:text-left">
          <p className="eyebrow">Direction</p>
          <h2 className="mx-auto mt-3 max-w-[18ch] font-sans text-[clamp(1.45rem,6.2vw,2.45rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-mehr-ink lg:mx-0">
            What we stand for as an HR partner.
          </h2>
        </Reveal>

        <RevealStagger className="mt-8 grid gap-4 lg:mt-10 lg:grid-cols-3 lg:gap-5" stagger={0.08}>
          {BLOCKS.map((block) => (
            <RevealItem key={block.eyebrow}>
              <article className="flex h-full flex-col rounded-[1.5rem] border border-mehr-deep/10 bg-white p-4 shadow-soft sm:rounded-[1.65rem] sm:p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-mehr-teal-soft text-mehr-deep">
                  <block.Icon size={19} strokeWidth={1.85} />
                </span>
                <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-mehr-deep">
                  {block.eyebrow}
                </p>
                <h3 className="mt-2 font-sans text-[18px] font-semibold leading-snug tracking-[-0.02em] text-mehr-ink sm:text-[19px]">
                  {block.getTitle(content)}
                </h3>
                <p className="mt-3 flex-1 text-[14px] leading-relaxed text-mehr-mist">
                  {block.getBody(content)}
                </p>
                {block.cta && (
                  <Link
                    to={block.cta.to}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-mehr-deep px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-mehr-charcoal active:scale-95 sm:w-fit"
                  >
                    {block.cta.label}
                    <ArrowUpRight size={16} />
                  </Link>
                )}
              </article>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
