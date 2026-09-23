"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  BarChart3,
  Building2,
  Calculator,
  CalendarClock,
  ChevronDown,
  ClipboardCheck,
  Compass,
  FileText,
  Network,
  Search,
  ShieldCheck,
  Timer,
  TrendingUp,
  UserPlus,
  Users,
  Wallet,
} from "lucide-react";
import { homeContent } from "../../data/content";
import SectionHeading from "../ui/SectionHeading";
import SpecularButton from "../ui/SpecularButton";
import Reveal from "../ui/Reveal";

const ease = [0.22, 1, 0.36, 1];
const expandTransition = { duration: 0.45, ease };

const META = {
  "on-demand-hr": {
    short: "On-Demand",
    label: "Flexible duration",
    Icon: CalendarClock,
    accent: "from-[#0b5f58] via-[#0b5f58] to-[#07231f]",
    covers: [
      {
        Icon: Timer,
        title: "1 week, 3–7 days or 1–3 months",
        desc: "Book HR bandwidth for exactly as long as the requirement lasts.",
      },
      {
        Icon: UserPlus,
        title: "Hiring & onboarding pushes",
        desc: "Extra hands for recruitment drives, interviews and joining formalities.",
      },
      {
        Icon: FileText,
        title: "HR documentation backlog",
        desc: "Letters, records and payroll inputs cleared without pulling your team in.",
      },
    ],
  },
  "hr-retainership": {
    short: "Resident HR",
    label: "Embedded partnership",
    Icon: Building2,
    accent: "from-[#084740] via-[#0a504b] to-[#06201d]",
    covers: [
      {
        Icon: Users,
        title: "Day-to-day people operations",
        desc: "A dedicated HR person owning attendance, queries and employee lifecycle.",
      },
      {
        Icon: ClipboardCheck,
        title: "Policies & HR processes",
        desc: "Practical frameworks and SOPs built for how your business actually runs.",
      },
      {
        Icon: TrendingUp,
        title: "Performance & engagement",
        desc: "KRAs, review cycles and engagement practices that stay consistent.",
      },
    ],
  },
  "strategic-consulting": {
    short: "Strategic",
    label: "Project expertise",
    Icon: Compass,
    accent: "from-[#0a3d38] via-[#0b4540] to-[#061a18]",
    covers: [
      {
        Icon: Search,
        title: "HR audits & diagnosis",
        desc: "Find what is actually holding people processes back before spending on fixes.",
      },
      {
        Icon: Network,
        title: "Organisation structure",
        desc: "Roles, reporting lines and bands designed for the next stage of growth.",
      },
      {
        Icon: ClipboardCheck,
        title: "Leadership advisory",
        desc: "Senior HR judgement on restructuring, change and difficult people calls.",
      },
    ],
  },
  pagar: {
    short: "Payroll Outsourcing",
    label: "Payroll & compliance",
    Icon: Wallet,
    accent: "from-[#0b5f58] via-[#0a534d] to-[#042f2e]",
    covers: [
      {
        Icon: Calculator,
        title: "Accurate payroll runs",
        desc: "Inputs, calculations, payslips and reimbursements processed on schedule.",
      },
      {
        Icon: ShieldCheck,
        title: "PF, ESIC, PT & LWF",
        desc: "Statutory filings, challans and labour compliance tracked and closed on time.",
      },
      {
        Icon: BarChart3,
        title: "Payroll MIS & reports",
        desc: "Cost, headcount and compliance reporting your management can act on.",
      },
    ],
  },
};

/** Desktop accordion from lg (1024+) — tablets get the stacked list. */
function useIsDesktop(breakpoint = 1024) {
  const [desktop, setDesktop] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth >= breakpoint : false
  );

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${breakpoint}px)`);
    const onChange = () => setDesktop(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [breakpoint]);

  return desktop;
}

function CardBody({ item, meta, num, compact }) {
  const Icon = meta.Icon;

  return (
    <div
      className={
        compact
          ? "px-4 pb-5 pt-0.5 sm:px-5 sm:pb-6"
          : "flex h-full flex-col px-5 py-5 xl:px-8 xl:py-7"
      }
    >
      {!compact && (
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold tabular-nums text-white xl:text-[12px]">
            {num}
          </span>
          <span className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/80 xl:px-3 xl:text-[12px]">
            {meta.label}
          </span>
        </div>
      )}

      <div className={compact ? "" : "flex min-h-0 flex-1 flex-col justify-center pt-4 xl:pt-5"}>
        {!compact && (
          <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-white ring-1 ring-white/20 xl:mb-5 xl:h-14 xl:w-14">
            <Icon size={24} strokeWidth={1.75} className="xl:hidden" />
            <Icon size={26} strokeWidth={1.75} className="hidden xl:block" />
          </span>
        )}

        <h3
          className={`font-sans font-semibold leading-[1.15] tracking-[-0.02em] text-white ${
            compact
              ? "text-[18px] sm:text-[20px]"
              : "text-[20px] lg:text-[24px] xl:text-[28px]"
          }`}
        >
          {item.title}
        </h3>

        <p
          className={`mt-2.5 max-w-[54ch] leading-relaxed text-white/80 ${
            compact ? "text-[13px] sm:text-[14px]" : "text-[13px] lg:text-[14px] xl:text-[15px]"
          }`}
        >
          {item.desc}
        </p>

        <ul
          className={`mt-5 grid gap-3.5 border-t border-white/15 pt-5 sm:gap-4 ${
            compact
              ? "grid-cols-1"
              : "lg:grid-cols-1 xl:grid-cols-3 xl:gap-6"
          }`}
        >
          {meta.covers.map((cover) => (
            <li key={cover.title} className="flex gap-3 xl:flex-col xl:gap-2.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white text-mehr-deep sm:h-9 sm:w-9">
                <cover.Icon size={16} strokeWidth={2} />
              </span>
              <div className="min-w-0">
                <p className="text-[13px] font-semibold leading-snug text-white sm:text-[14px]">
                  {cover.title}
                </p>
                <p className="mt-1 text-[12px] leading-relaxed text-white/70 sm:text-[13px]">
                  {cover.desc}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-5 sm:mt-6">
          <SpecularButton
            to={item.path}
            variant="light"
            size={compact ? "md" : "md"}
            fullWidth={compact}
            className={compact ? "" : "lg:w-auto"}
            onClick={(e) => e.stopPropagation()}
          >
            {`Explore ${item.title}`}
          </SpecularButton>
        </div>
      </div>
    </div>
  );
}

function CardBackdrop({ item, meta, dim = false }) {
  return (
    <>
      <div className={`absolute inset-0 bg-gradient-to-br ${meta.accent}`} />
      {item.image && (
        <img
          src={item.image}
          alt=""
          aria-hidden
          className={`absolute inset-0 h-full w-full object-cover ${
            dim ? "opacity-[0.18]" : "opacity-[0.32]"
          }`}
        />
      )}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_top,rgba(4,25,23,0.92),rgba(4,25,23,0.55)_55%,rgba(4,25,23,0.35))]"
      />
    </>
  );
}

function DesktopCard({ item, index, active, onActivate, reduce }) {
  const isOn = active === index;
  const meta = META[item.id] || META["on-demand-hr"];
  const Icon = meta.Icon;
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.button
      type="button"
      onClick={() => onActivate(index)}
      onMouseEnter={() => onActivate(index)}
      onFocus={() => onActivate(index)}
      aria-expanded={isOn}
      aria-label={item.title}
      initial={false}
      animate={{ flexGrow: isOn ? 6 : 1, flexShrink: 1, flexBasis: "0%" }}
      transition={reduce ? { duration: 0.2 } : expandTransition}
      className="group relative h-full min-h-0 min-w-[5.5rem] overflow-hidden rounded-[1.35rem] text-left outline-none focus-visible:ring-2 focus-visible:ring-white/50 xl:min-w-[6.5rem] xl:rounded-[1.5rem]"
    >
      <CardBackdrop item={item} meta={meta} dim={!isOn} />

      {!isOn && (
        <div className="absolute inset-0 z-10 flex flex-col items-center px-2.5 py-4 xl:px-3 xl:py-5">
          <span className="rounded-full bg-white/15 px-2.5 py-1 text-[12px] font-semibold tabular-nums text-white xl:px-3 xl:text-[14px]">
            {num}
          </span>
          <span className="mt-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 text-white ring-1 ring-white/20 xl:mt-5 xl:h-14 xl:w-14">
            <Icon size={22} strokeWidth={1.85} className="xl:hidden" />
            <Icon size={26} strokeWidth={1.85} className="hidden xl:block" />
          </span>
          <span
            className="mt-4 max-h-[70%] overflow-hidden text-[13px] font-semibold uppercase leading-tight tracking-[0.08em] text-white xl:mt-5 xl:text-[16px]"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            {meta.short}
          </span>
        </div>
      )}

      <AnimatePresence mode="wait">
        {isOn && (
          <motion.div
            key="expanded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease }}
            className="absolute inset-0 z-10"
          >
            <CardBody item={item} meta={meta} num={num} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

function MobileCard({ item, index, active, onActivate, reduce }) {
  const isOn = active === index;
  const meta = META[item.id] || META["on-demand-hr"];
  const Icon = meta.Icon;
  const num = String(index + 1).padStart(2, "0");

  return (
    <div className="relative overflow-hidden rounded-[1.2rem] sm:rounded-[1.35rem]">
      <CardBackdrop item={item} meta={meta} dim={!isOn} />

      <div className="relative z-10">
        <button
          type="button"
          onClick={() => onActivate(isOn ? -1 : index)}
          aria-expanded={isOn}
          className="flex w-full items-center gap-3 px-3.5 py-3.5 text-left outline-none touch-manipulation focus-visible:ring-2 focus-visible:ring-white/50 sm:gap-3.5 sm:px-4 sm:py-4"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white ring-1 ring-white/20 sm:h-12 sm:w-12">
            <Icon size={22} strokeWidth={1.85} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-white/65 sm:text-[12px]">
              {num} · {meta.label}
            </span>
            <span className="mt-0.5 block font-sans text-[16px] font-semibold leading-snug text-white sm:text-[18px] md:text-[19px]">
              {item.title}
            </span>
          </span>
          <ChevronDown
            size={20}
            className={`shrink-0 text-white/70 transition-transform ${isOn ? "rotate-180" : ""}`}
          />
        </button>

        <AnimatePresence initial={false}>
          {isOn && (
            <motion.div
              key="body"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={reduce ? { duration: 0.2 } : expandTransition}
              className="overflow-hidden"
            >
              <CardBody item={item} meta={meta} num={num} compact />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function HowWeHelpExpand() {
  const { howWeHelp } = homeContent;
  const items = howWeHelp.items;
  const [active, setActive] = useState(0);
  const desktop = useIsDesktop();
  const reduce = useReducedMotion();

  return (
    <section className="section-pad surface-panel surface-wash text-mehr-ink">
      <div className="container-mehr page-gutter sm:px-3 md:px-4 lg:px-5">
        <Reveal>
          <SectionHeading eyebrow={howWeHelp.eyebrow} title={howWeHelp.title} />
        </Reveal>

        <Reveal delay={0.1} className="mt-6 sm:mt-8 md:mt-10">
          {desktop ? (
            <div className="flex h-[min(68vh,560px)] min-h-[420px] flex-row gap-2.5 xl:h-[min(72vh,600px)] xl:min-h-[520px] xl:gap-3">
              {items.map((item, i) => (
                <DesktopCard
                  key={item.id}
                  item={item}
                  index={i}
                  active={active}
                  onActivate={setActive}
                  reduce={reduce}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-2.5 sm:gap-3">
              {items.map((item, i) => (
                <MobileCard
                  key={item.id}
                  item={item}
                  index={i}
                  active={active}
                  onActivate={setActive}
                  reduce={reduce}
                />
              ))}
            </div>
          )}
        </Reveal>

        {desktop && (
          <p className="mt-5 text-center text-[12px] text-mehr-mist xl:mt-6 xl:text-[13px]">
            Hover a card to see what each model covers
          </p>
        )}
      </div>
    </section>
  );
}
