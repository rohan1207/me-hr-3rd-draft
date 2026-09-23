"use client";

import { motion, useReducedMotion } from "framer-motion";
import Reveal, { RevealItem, RevealStagger } from "../../ui/Reveal";
import { aboutContent } from "../../../data/content";

const ease = [0.22, 1, 0.36, 1];
const PHOTO = "/about/story-meet.png";

export default function AboutStory() {
  const reduce = useReducedMotion();
  const { story, hero } = aboutContent;

  return (
    <section id="story" className="scroll-mt-28 surface-white py-9 sm:py-12 lg:py-14">
      <div className="container-mehr page-gutter sm:px-3 md:px-4 lg:px-5">
        <div className="grid items-stretch gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12 xl:gap-16">
          {/* Visual — real workplace context */}
          <Reveal className="relative min-h-[220px] overflow-hidden rounded-[1.5rem] sm:min-h-[340px] sm:rounded-[1.75rem] lg:min-h-full">
            <motion.img
              src={PHOTO}
              alt="me-HR team in discussion"
              className="absolute inset-0 h-full w-full object-cover"
              initial={reduce ? false : { scale: 1.06 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-mehr-ink/55 via-mehr-ink/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-mehr-teal">
                Since {story.highlights[0].value}
              </p>
              <p className="mt-1.5 max-w-[22ch] font-sans text-lg font-semibold leading-snug tracking-[-0.02em] text-white sm:text-xl">
                Practical HR, built beside the business.
              </p>
            </div>
          </Reveal>

          {/* Story */}
          <div className="flex flex-col justify-center text-center lg:text-left">
            <Reveal>
              <p className="eyebrow">{story.eyebrow}</p>
              <h2 className="mx-auto mt-3 max-w-[20ch] font-sans text-[clamp(1.45rem,6.2vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-mehr-ink lg:mx-0">
                {story.title}
              </h2>
              <div className="mx-auto mt-5 max-w-xl space-y-3.5 lg:mx-0">
                {story.body.map((para) => (
                  <p
                    key={para}
                    className="text-[13px] leading-relaxed text-mehr-mist sm:text-[15px]"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <blockquote className="mx-auto mt-8 max-w-xl border-t-[3px] border-mehr-deep pt-5 sm:border-l-[3px] sm:border-t-0 sm:pl-6 sm:pt-0 lg:mx-0">
                <p className="font-sans text-[15px] font-semibold leading-snug tracking-[-0.02em] text-mehr-ink sm:text-lg">
                  {hero.body[1]}
                </p>
              </blockquote>
            </Reveal>
          </div>
        </div>

        {/* Facts rail — one strip, no card clutter */}
        <RevealStagger
          className="mt-10 overflow-hidden rounded-[1.35rem] bg-mehr-panel sm:mt-12 sm:rounded-[1.6rem] lg:mt-14"
          stagger={0.06}
        >
          <div className="grid divide-y divide-mehr-deep/10 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
            {story.highlights.map((item, i) => (
              <RevealItem key={item.label}>
                <motion.div
                  whileHover={
                    reduce ? undefined : { backgroundColor: "rgba(255,255,255,0.55)" }
                  }
                  transition={{ duration: 0.25 }}
                  className={`px-4 py-4 sm:px-6 sm:py-7 ${
                    i % 2 === 1 ? "sm:border-l sm:border-mehr-deep/10" : ""
                  } ${i >= 2 ? "sm:border-t sm:border-mehr-deep/10 lg:border-t-0" : ""} ${
                    i > 0 ? "lg:border-l lg:border-mehr-deep/10" : ""
                  }`}
                >
                  <motion.p
                    className="font-sans text-[clamp(1.65rem,2.8vw,2.15rem)] font-semibold tracking-[-0.04em] text-mehr-deep"
                    initial={reduce ? false : { opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.45,
                      delay: 0.08 + i * 0.05,
                      ease,
                    }}
                  >
                    {item.value}
                  </motion.p>
                  <p className="mt-1 text-[12px] font-medium uppercase tracking-[0.12em] text-mehr-mist">
                    {item.label}
                  </p>
                </motion.div>
              </RevealItem>
            ))}
          </div>
        </RevealStagger>
      </div>
    </section>
  );
}
