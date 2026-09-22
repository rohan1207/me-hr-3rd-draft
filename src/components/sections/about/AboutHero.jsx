"use client";

import { Link } from "@/components/compat/router";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import {
  ArrowUpRight,
  Building2,
  CalendarDays,
  Layers3,
  RefreshCw,
  Route,
  Users,
} from "lucide-react";
import SpecularButton from "../../ui/SpecularButton";
import { aboutContent } from "../../../data/content";

const ease = [0.22, 1, 0.36, 1];
const HERO_IMG = "/about/hero-team.png";

const HIGHLIGHT_META = [
  { Icon: CalendarDays, hint: "Building structured workplaces since day one" },
  { Icon: Building2, hint: "Serving growing businesses from Maharashtra" },
  { Icon: Route, hint: "From hire to exit — one connected HR system" },
  { Icon: Layers3, hint: "On-Demand, Resident, Consulting & Payroll" },
];

const LIFECYCLE = [
  { label: "Hire", Icon: Users },
  { label: "Build", Icon: Layers3 },
  { label: "Grow", Icon: RefreshCw },
  { label: "Lead", Icon: Route },
];

export default function AboutHero() {
  const reduce = useReducedMotion();
  const { hero, story, approach } = aboutContent;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const parallax = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 28]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-white pt-5 pb-8 sm:pt-6 sm:pb-10 lg:pt-7 lg:pb-12"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-mesh-teal opacity-60" />

      <div className="container-mehr page-gutter relative z-10 sm:px-3 md:px-4 lg:px-5">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease }}
          className="grid items-end gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8"
        >
          <div>
            <p className="text-[12px] font-medium text-mehr-mist">
              Home <span className="mx-1 text-mehr-muted">/</span>
              <span className="font-semibold text-mehr-deep">About</span>
            </p>
            <p className="mt-3 text-[12px] text-mehr-muted">Pune · since 2018</p>
            <h1 className="mt-2 font-sans text-[clamp(2.6rem,6vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.045em]">
              <span className="text-mehr-ink">About </span>
              <span className="text-mehr-deep">me-HR</span>
            </h1>
            <p className="mt-4 max-w-[28ch] font-sans text-base font-semibold leading-snug tracking-[-0.02em] text-mehr-ink sm:text-lg">
              {hero.tagline}
            </p>
          </div>

          <div className="flex flex-col gap-4 lg:items-end lg:pb-1">
            <p className="max-w-md text-[14px] leading-relaxed text-mehr-mist sm:text-[15px] lg:text-right">
              {hero.body[0]}
            </p>
            <div className="flex flex-wrap items-center gap-2.5 lg:justify-end">
              <SpecularButton to="/contact" variant="brand" size="sm">
                {hero.primaryCta}
              </SpecularButton>
              <Link
                to="/services"
                className="inline-flex items-center gap-1.5 rounded-full border border-mehr-deep/15 bg-mehr-panel px-4 py-2 text-[13px] font-semibold text-mehr-ink transition hover:border-mehr-deep/30 hover:bg-white active:scale-[0.98]"
              >
                Services
                <ArrowUpRight size={14} className="text-mehr-deep" />
              </Link>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease }}
          className="mt-6 sm:mt-7 lg:mt-8"
        >
          <div className="grid items-stretch gap-2.5 sm:gap-3 lg:grid-cols-2">
            {/* One hero image only */}
            <div className="relative min-h-[240px] overflow-hidden rounded-[1.35rem] sm:min-h-[280px] sm:rounded-[1.6rem] lg:min-h-0">
              <motion.img
                style={{ y: parallax }}
                src={HERO_IMG}
                alt="me-HR team collaborating with business leaders"
                className="absolute inset-0 h-full w-full scale-105 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-mehr-teal">
                  Who we are
                </p>
                <p className="mt-1 max-w-sm font-sans text-[15px] font-semibold leading-snug text-white sm:text-base">
                  {hero.body[1]}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 grid-rows-2 gap-2.5 sm:gap-3">
              <motion.div
                whileHover={reduce ? undefined : { y: -3 }}
                className="flex flex-col justify-between rounded-[1.25rem] border border-mehr-deep/10 bg-mehr-panel p-4 sm:rounded-[1.4rem] sm:p-5"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-mehr-deep">
                  Founded
                </p>
                <div>
                  <p className="font-sans text-3xl font-semibold tracking-[-0.04em] text-mehr-ink sm:text-4xl">
                    {story.highlights[0].value}
                  </p>
                  <p className="mt-1.5 text-[13px] font-medium leading-snug text-mehr-mist">
                    Building structured workplaces
                  </p>
                </div>
              </motion.div>

              <motion.div
                whileHover={reduce ? undefined : { y: -3 }}
                className="flex flex-col justify-center rounded-[1.25rem] bg-mehr-deep p-4 text-white sm:rounded-[1.4rem] sm:p-5"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70">
                  Approach
                </p>
                <p className="mt-2 font-sans text-[15px] font-semibold leading-snug tracking-[-0.02em] sm:text-base">
                  {approach.title}
                </p>
              </motion.div>

              {/* End-to-end — filled with lifecycle graphic, not empty avatars */}
              <motion.div
                whileHover={reduce ? undefined : { y: -3 }}
                className="col-span-2 flex flex-col justify-between rounded-[1.25rem] border border-mehr-deep/10 bg-white p-4 shadow-soft sm:rounded-[1.4rem] sm:p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-mehr-deep">
                      End-to-end
                    </p>
                    <p className="mt-1 font-sans text-lg font-semibold tracking-[-0.02em] text-mehr-ink sm:text-xl">
                      Full HR lifecycle
                    </p>
                  </div>
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-mehr-teal-soft text-mehr-deep">
                    <Route size={17} strokeWidth={1.9} />
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-4 gap-2">
                  {LIFECYCLE.map((item, i) => (
                    <div
                      key={item.label}
                      className="relative flex flex-col items-center rounded-xl bg-mehr-panel px-2 py-2.5 text-center"
                    >
                      {i < LIFECYCLE.length - 1 && (
                        <span
                          aria-hidden
                          className="absolute -right-1 top-1/2 hidden h-px w-2 -translate-y-1/2 bg-mehr-deep/25 sm:block"
                        />
                      )}
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-mehr-deep shadow-soft">
                        <item.Icon size={14} strokeWidth={2} />
                      </span>
                      <span className="mt-1.5 text-[11px] font-semibold text-mehr-ink">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-[13px] leading-relaxed text-mehr-mist">
                  Hiring, policies, performance, engagement and exits — connected as one system.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Highlight strip — larger, clearer supporting lines */}
          <div className="mt-2.5 grid grid-cols-2 gap-2.5 sm:mt-3 sm:grid-cols-4 sm:gap-3">
            {story.highlights.map((item, i) => {
              const meta = HIGHLIGHT_META[i];
              const Icon = meta.Icon;
              return (
                <motion.div
                  key={item.label}
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.05, duration: 0.45, ease }}
                  whileHover={reduce ? undefined : { y: -2 }}
                  className="rounded-[1.15rem] border border-mehr-deep/8 bg-mehr-panel px-3.5 py-3.5 sm:rounded-[1.25rem] sm:px-4 sm:py-4"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-mehr-deep shadow-soft">
                    <Icon size={15} strokeWidth={1.9} />
                  </span>
                  <p className="mt-3 font-sans text-lg font-semibold tracking-[-0.02em] text-mehr-ink sm:text-xl">
                    {item.value}
                  </p>
                  <p className="mt-1 text-[12px] font-semibold uppercase tracking-[0.08em] text-mehr-deep">
                    {item.label}
                  </p>
                  <p className="mt-1.5 text-[13px] leading-snug text-mehr-mist">
                    {meta.hint}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
