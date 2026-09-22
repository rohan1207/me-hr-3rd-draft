"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ClipboardList,
  Compass,
  HeartHandshake,
  TrendingUp,
  UserPlus,
  Wallet,
} from "lucide-react";
import Reveal, { RevealItem, RevealStagger } from "../../ui/Reveal";
import { aboutContent } from "../../../data/content";

const GROUP_ICONS = {
  "Talent Acquisition": UserPlus,
  "HR Operations": ClipboardList,
  "Payroll & Compliance": Wallet,
  "Payroll Outsourcing": Wallet,
  "Engagement & Culture": HeartHandshake,
  "Performance & Growth": TrendingUp,
  "Strategic Advisory": Compass,
};

export default function AboutTeam() {
  const reduce = useReducedMotion();
  const { team } = aboutContent;

  return (
    <section id="team" className="scroll-mt-28 bg-white py-10 sm:py-12 lg:py-14">
      <div className="container-mehr page-gutter sm:px-3 md:px-4 lg:px-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <Reveal className="max-w-xl">
            <p className="eyebrow">Practice areas</p>
            <h2 className="mt-3 font-sans text-[clamp(1.75rem,3.8vw,2.85rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-mehr-ink">
              {team.title}
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="max-w-md sm:pb-1">
            <p className="text-sm leading-relaxed text-mehr-mist">{team.body}</p>
          </Reveal>
        </div>

        <RevealStagger
          className="mt-8 grid gap-3 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3 lg:gap-4"
          stagger={0.05}
        >
          {team.groups.map((group, i) => {
            const Icon = GROUP_ICONS[group.title] || ClipboardList;
            return (
              <RevealItem key={group.title}>
                <motion.article
                  whileHover={reduce ? undefined : { y: -3 }}
                  className="group flex h-full flex-col rounded-[1.35rem] border border-mehr-deep/10 bg-white p-5 shadow-soft transition hover:border-mehr-deep/18 hover:shadow-float sm:rounded-[1.5rem] sm:p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-mehr-teal-soft text-mehr-deep transition group-hover:bg-mehr-deep group-hover:text-white">
                      <Icon size={20} strokeWidth={1.85} />
                    </span>
                    <span className="font-sans text-[11px] font-semibold tabular-nums tracking-[0.12em] text-mehr-deep">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="mt-4 font-sans text-lg font-semibold tracking-[-0.02em] text-mehr-ink">
                    {group.title}
                  </h3>
                  <p className="mt-2 flex-1 text-[13px] leading-relaxed text-mehr-mist sm:text-sm">
                    {group.desc}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {group.focus.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-mehr-panel px-2.5 py-1 text-[11px] font-medium text-mehr-deep"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.article>
              </RevealItem>
            );
          })}
        </RevealStagger>
      </div>
    </section>
  );
}
