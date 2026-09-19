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
const expandTransition = { duration: 0.5, ease };

const META = {
  "on-demand-hr": {
    short: "On-Demand",
    label: "Flexible duration",
    Icon: CalendarClock,
    accent: "from-[#0b5f58] via-[#0b5f58] to-[#07231f]",
    covers: [
      {
        Icon: Timer,
        title: "1 day, 1 week or 1 month",
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
    short: "Payroll Consultancy",
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

function useIsMobile(breakpoint = 768) {
  const [mobile, setMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const onChange = () => setMobile(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [breakpoint]);

  return mobile;
}

/** Shared expanded content â€” readable type, real substance instead of filler space. */
function CardBody({ item, meta, num, compact }) {
  const Icon = meta.Icon;

  return (
    <div className={compact ? "px-4 pb-5 pt-1" : "flex h-full flex-col px-6 py-6 lg:px-8 lg:py-7"}>
      {!compact && (
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-white/15 px-3 py-1 text-[12px] font-semibold tabular-nums text-white">
            {num}
          </span>
          <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.1em] text-white/80">
            {meta.label}
          </span>
        </div>
      )}

      <div
        className={
          compact ? "" : "flex min-h-0 flex-1 flex-col justify-center pt-5"
        }
      >
        {!compact && (
          <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white ring-1 ring-white/20">
            <Icon size={26} strokeWidth={1.75} />
          </span>
        )}

        <h3 className="font-sans text-[21px] font-semibold leading-[1.15] tracking-[-0.02em] text-white sm:text-[24px] lg:text-[28px]">
          {item.title}
        </h3>

        <p className="mt-3 max-w-[54ch] text-[14px] leading-relaxed text-white/80 sm:text-[15px]">
          {item.desc}
        </p>

        <ul className="mt-6 grid gap-4 border-t border-white/15 pt-6 sm:gap-4 lg:grid-cols-3 lg:gap-7">
          {meta.covers.map((cover) => (
            <li key={cover.title} className="flex gap-3 lg:flex-col lg:gap-2.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-mehr-deep">
                <cover.Icon size={17} strokeWidth={2} />
              </span>
              <div className="min-w-0">
                <p className="text-[14px] font-semibold leading-snug text-white">
                  {cover.title}
                </p>
                <p className="mt-1 text-[13px] leading-relaxed text-white/70">
                  {cover.desc}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6 sm:mt-7">
          <SpecularButton
            to={item.path}
            variant="light"
            size="md"
            fullWidth={compact}
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

/** Desktop: horizontal accordion that grows the active panel. */
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
      className="group relative h-full min-h-0 min-w-[6.5rem] overflow-hidden rounded-[1.5rem] text-left outline-none focus-visible:ring-2 focus-visible:ring-white/50"
    >
      <CardBackdrop item={item} meta={meta} dim={!isOn} />

      {!isOn && (
        <div className="absolute inset-0 z-10 flex flex-col items-center px-3 py-5">
          <span className="rounded-full bg-white/15 px-3 py-1 text-[14px] font-semibold tabular-nums text-white">
            {num}
          </span>
          <span className="mt-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white ring-1 ring-white/20">
            <Icon size={26} strokeWidth={1.85} />
          </span>
          <span
            className="mt-5 max-h-[72%] overflow-hidden text-[15px] font-semibold uppercase leading-tight tracking-[0.08em] text-white sm:text-[16px]"
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

/** Mobile: stacked list that grows to fit its content, so nothing is clipped. */
function MobileCard({ item, index, active, onActivate, reduce }) {
  const isOn = active === index;
  const meta = META[item.id] || META["on-demand-hr"];
  const Icon = meta.Icon;
  const num = String(index + 1).padStart(2, "0");

  return (
    <div className="relative overflow-hidden rounded-[1.35rem]">
      <CardBackdrop item={item} meta={meta} dim={!isOn} />

      <div className="relative z-10">
        <button
          type="button"
          onClick={() => onActivate(isOn ? -1 : index)}
          aria-expanded={isOn}
          className="flex w-full items-center gap-3 px-4 py-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-white/50"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white ring-1 ring-white/20">
            <Icon size={23} strokeWidth={1.85} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[13px] font-semibold uppercase tracking-[0.12em] text-white/65">
              {num} Â· {meta.label}
            </span>
            <span className="mt-0.5 block font-sans text-[19px] font-semibold leading-snug text-white">
              {item.title}
            </span>
          </span>
          <ChevronDown
            size={22}
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
  const mobile = useIsMobile();
  const reduce = useReducedMotion();

  return (
    <section className="section-pad surface-panel surface-wash text-mehr-ink">
      <div className="container-mehr page-gutter sm:px-3 md:px-4 lg:px-5">
        <Reveal>
          <SectionHeading eyebrow={howWeHelp.eyebrow} title={howWeHelp.title} />
        </Reveal>

        <Reveal delay={0.1} className="mt-8 sm:mt-10">
          {mobile ? (
            <div className="flex flex-col gap-3">
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
          ) : (
            <div className="flex h-[min(72vh,600px)] min-h-[540px] flex-row gap-3">
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
          )}
        </Reveal>

        {!mobile && (
          <p className="mt-6 text-center text-[13px] text-mehr-mist">
            Hover a card to see what each model covers
          </p>
        )}
      </div>
    </section>
  );
}
