"use client";

import { Link } from "@/components/compat/router";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Building2,
  CalendarClock,
  Compass,
  Wallet,
} from "lucide-react";
import SpecularButton from "../../ui/SpecularButton";
import {
  ctas,
  homeContent,
  servicesContent,
} from "../../../data/content";

const ease = [0.22, 1, 0.36, 1];

const HERO_IMAGE = "/services-hero.png";

const MODEL_META = {
  "on-demand-hr": { Icon: CalendarClock, hint: "Flexible duration support" },
  "hr-retainership": { Icon: Building2, hint: "Embedded day-to-day ownership" },
  "strategic-consulting": { Icon: Compass, hint: "Senior advisory projects" },
  pagar: { Icon: Wallet, hint: "Payroll & compliance" },
};

const models = homeContent.howWeHelp.items.map((item) => ({
  ...item,
  ...(MODEL_META[item.id] || MODEL_META["on-demand-hr"]),
}));

export default function ServicesHero() {
  const reduce = useReducedMotion();
  const { hero } = servicesContent;

  return (
    <section className="relative overflow-hidden border-b border-mehr-deep/8 bg-white pt-6 pb-8 sm:pt-12 sm:pb-16 lg:pt-14 lg:pb-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-mesh-teal opacity-50" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-mehr-panel/40 to-transparent"
      />

      <div className="container-mehr page-gutter relative z-10 sm:px-3 md:px-4 lg:px-5">
        <div className="grid items-center gap-7 sm:gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 xl:gap-16">
          {/* Text column */}
          <div className="min-w-0 text-center lg:text-left">
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
              className="eyebrow mb-3 sm:mb-4"
            >
              Our Services
            </motion.p>

            <motion.h1
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.05, ease }}
              className="mx-auto max-w-[18ch] font-sans text-[clamp(1.65rem,6.5vw,3.4rem)] font-semibold leading-[1.1] tracking-[-0.04em] text-mehr-ink sm:leading-[1.08] lg:mx-0"
            >
              {hero.title}
            </motion.h1>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12, ease }}
              className="mx-auto mt-3.5 max-w-xl text-[13px] leading-relaxed text-mehr-mist sm:mt-5 sm:text-[15px] md:text-base lg:mx-0"
            >
              {hero.body}
            </motion.p>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2, ease }}
              className="mt-6 flex w-full flex-col items-stretch gap-2.5 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-3 lg:justify-start"
            >
              <SpecularButton
                to="/contact"
                variant="brand"
                size="md"
                className="w-full justify-center sm:w-auto"
              >
                {ctas.primary}
                <ArrowUpRight size={15} />
              </SpecularButton>
              <Link
                to="/pricing"
                className="inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-mehr-deep/20 bg-white px-5 py-3 text-sm font-semibold text-mehr-deep transition hover:border-mehr-deep hover:bg-mehr-panel sm:w-auto"
              >
                View engagement models
              </Link>
            </motion.div>

            {/* Phone: image sits between CTAs and model chips */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22, ease }}
              className="relative mx-auto mt-7 w-full max-w-md lg:hidden"
            >
              <div
                aria-hidden
                className="absolute -bottom-2 -right-2 h-[90%] w-[94%] rounded-[1.25rem] bg-mehr-deep/12"
              />
              <div className="relative overflow-hidden rounded-[1.25rem] border border-mehr-deep/10 bg-mehr-panel shadow-soft">
                <div className="aspect-[16/10] w-full">
                  <img
                    src={HERO_IMAGE}
                    alt="me-HR consultant discussing HR engagement options with business leaders"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-mehr-ink/70 via-mehr-ink/25 to-transparent px-4 pb-4 pt-12">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/70">
                    Engagement models
                  </p>
                  <p className="mt-1 max-w-[22ch] font-sans text-[14px] font-semibold leading-snug text-white">
                    Matched to how your leadership needs to operate
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Service model chips */}
            <motion.ul
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.28, ease }}
              className="mt-7 grid gap-2 sm:mt-10 sm:grid-cols-2 sm:gap-2.5"
            >
              {models.map((model) => (
                <li key={model.id}>
                  <Link
                    to={model.path}
                    className="group flex items-center gap-3 rounded-2xl border border-mehr-deep/10 bg-white/80 px-3 py-2.5 text-left shadow-soft backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-mehr-deep/20 hover:shadow-card sm:px-3.5 sm:py-3"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-mehr-teal-soft text-mehr-deep transition group-hover:bg-mehr-deep group-hover:text-white sm:h-10 sm:w-10">
                      <model.Icon size={17} strokeWidth={1.9} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-sans text-[13px] font-semibold text-mehr-ink sm:text-[14px]">
                        {model.title}
                      </span>
                      <span className="mt-0.5 block truncate text-[11px] text-mehr-mist sm:text-[12px]">
                        {model.hint}
                      </span>
                    </span>
                    <ArrowUpRight
                      size={15}
                      className="shrink-0 text-mehr-muted transition group-hover:text-mehr-deep"
                    />
                  </Link>
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Desktop visual */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="relative mx-auto hidden w-full max-w-lg lg:ml-auto lg:block lg:max-w-none"
          >
            <div
              aria-hidden
              className="absolute -bottom-3 -right-3 h-[90%] w-[94%] rounded-[1.5rem] bg-mehr-deep/12 sm:-bottom-4 sm:-right-4 sm:rounded-[1.85rem]"
            />
            <div className="relative overflow-hidden rounded-[1.5rem] border border-mehr-deep/10 bg-mehr-panel shadow-soft sm:rounded-[1.85rem]">
              <div className="aspect-[4/3] w-full sm:aspect-[5/4]">
                <img
                  src={HERO_IMAGE}
                  alt="me-HR consultant discussing HR engagement options with business leaders"
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-mehr-ink/70 via-mehr-ink/25 to-transparent px-5 pb-5 pt-16">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70">
                  Engagement models
                </p>
                <p className="mt-1 max-w-[22ch] font-sans text-[15px] font-semibold leading-snug text-white sm:text-base">
                  Matched to how your leadership needs to operate
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
