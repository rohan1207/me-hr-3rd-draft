"use client";

import { Link, NavLink, useLocation } from "@/components/compat/router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Building2,
  Briefcase,
  ChevronDown,
  FolderKanban,
  Home,
  IndianRupee,
  Newspaper,
  Phone,
  Users,
  Wallet,
} from "lucide-react";
import { navLinks, ctas, serviceNavLinks } from "../../data/content";
import { useSidebar } from "../../context/SidebarContext";
import Logo from "../ui/Logo";
import HamburgerIcon from "../ui/HamburgerIcon";

const WIDTH = { expanded: 220, collapsed: 72 };

/** Soft, elegant expansion curve */
const panelTransition = {
  type: "spring",
  stiffness: 260,
  damping: 34,
  mass: 0.85,
};

const labelTransition = {
  duration: 0.28,
  ease: [0.22, 1, 0.36, 1],
};

const iconMap = {
  "/": Home,
  "/about": Building2,
  "/services": Briefcase,
  "/pagar": Wallet,
  "/case-studies": FolderKanban,
  "/media": Newspaper,
  "/careers": Users,
  "/pricing": IndianRupee,
  "/contact": Phone,
};

const sidebarLinks = [{ label: "Home", path: "/" }, ...navLinks];

function isServiceArea(pathname) {
  return (
    pathname === "/services" ||
    pathname.startsWith("/services/") ||
    pathname === "/pagar"
  );
}

export default function Sidebar() {
  const {
    expanded,
    visuallyOpen,
    peekOpen,
    isDesktop,
    toggle,
    close,
    setHoverPeek,
  } = useSidebar();
  const { pathname } = useLocation();
  const showLabels = visuallyOpen;
  const [servicesOpen, setServicesOpen] = useState(() => isServiceArea(pathname));
  const leaveTimer = useRef(null);

  useEffect(() => {
    if (isServiceArea(pathname)) setServicesOpen(true);
  }, [pathname]);

  useEffect(() => {
    return () => {
      if (leaveTimer.current) window.clearTimeout(leaveTimer.current);
    };
  }, []);

  const desktopWidth = visuallyOpen ? WIDTH.expanded : WIDTH.collapsed;
  const mobileOpenWidth =
    typeof window !== "undefined" ? Math.min(220, window.innerWidth * 0.78) : 220;

  const onEnter = () => {
    if (!isDesktop || expanded) return;
    if (leaveTimer.current) {
      window.clearTimeout(leaveTimer.current);
      leaveTimer.current = null;
    }
    setHoverPeek(true);
  };

  const onLeave = () => {
    if (!isDesktop || expanded) return;
    if (leaveTimer.current) window.clearTimeout(leaveTimer.current);
    // Small delay so moving between icons doesn't flicker closed
    leaveTimer.current = window.setTimeout(() => {
      setHoverPeek(false);
      leaveTimer.current = null;
    }, 120);
  };

  return (
    <>
      <AnimatePresence>
        {!isDesktop && !expanded && (
          <motion.button
            type="button"
            aria-label="Open menu"
            onClick={toggle}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={labelTransition}
            className="fixed left-4 top-4 z-[60] flex h-11 w-11 items-center justify-center rounded-full border border-mehr-deep/10 bg-white/95 text-mehr-ink shadow-float backdrop-blur-md"
          >
            <HamburgerIcon open={false} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isDesktop && expanded && (
          <motion.button
            type="button"
            aria-label="Close menu"
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[55] bg-mehr-ink/35 backdrop-blur-[2px] lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={
          isDesktop
            ? {
                width: desktopWidth,
                x: 0,
                opacity: 1,
                boxShadow: peekOpen
                  ? "12px 0 40px rgba(17,17,17,0.08)"
                  : "0 0 0 rgba(17,17,17,0)",
              }
            : expanded
              ? { width: mobileOpenWidth, x: 0, opacity: 1 }
              : { width: mobileOpenWidth, x: -mobileOpenWidth - 24, opacity: 0 }
        }
        transition={panelTransition}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        className={`fixed inset-y-0 left-0 z-[58] flex h-dvh max-h-dvh flex-col overflow-hidden border-r border-mehr-deep/8 bg-white ${
          !isDesktop && !expanded ? "pointer-events-none" : ""
        } ${peekOpen ? "z-[62]" : ""}`}
        data-lenis-prevent
        data-lenis-prevent-wheel
        data-lenis-prevent-touch
      >
        <div
          className={`flex shrink-0 items-center gap-1.5 border-b border-mehr-deep/6 px-2.5 py-3.5 ${
            showLabels ? "justify-between" : "flex-col gap-3"
          }`}
        >
          <AnimatePresence initial={false} mode="wait">
            {showLabels ? (
              <motion.div
                key="logo"
                initial={{ opacity: 0, x: -10, filter: "blur(4px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -8, filter: "blur(4px)" }}
                transition={labelTransition}
                className="min-w-0"
              >
                <Logo size="md" className="!gap-1.5" />
                <p className="mt-0.5 truncate text-[8px] font-semibold uppercase tracking-[0.14em] text-mehr-muted">
                  HR Outsourcing
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="mark"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={labelTransition}
              >
                <Logo size="md" markOnly />
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="button"
            aria-label={visuallyOpen ? "Collapse menu" : "Expand menu"}
            aria-expanded={visuallyOpen}
            onClick={() => {
              // During hover-peek, X should close the peek (not pin open)
              if (peekOpen) {
                setHoverPeek(false);
                return;
              }
              toggle();
            }}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-mehr-ink transition duration-300 hover:bg-mehr-panel"
          >
            <HamburgerIcon open={visuallyOpen} />
          </button>
        </div>

        <nav
          className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain px-2 py-3"
          onWheel={(e) => e.stopPropagation()}
        >
          <ul className="space-y-0.5">
            {sidebarLinks.map((link) => {
              const Icon = iconMap[link.path] || Briefcase;
              const isHome = link.path === "/";
              const isServices = link.path === "/services";

              if (isServices) {
                const areaActive = isServiceArea(pathname);
                return (
                  <li key={link.path}>
                    <div
                      className={`rounded-xl transition-colors duration-300 ${
                        areaActive && !servicesOpen ? "bg-mehr-deep text-white" : ""
                      }`}
                    >
                      <div
                        className={`group relative flex items-center gap-3 rounded-xl py-2.5 text-[15px] font-bold tracking-[-0.01em] transition-colors duration-300 ${
                          areaActive
                            ? servicesOpen
                              ? "bg-mehr-panel text-mehr-ink"
                              : "text-white"
                            : "text-mehr-mist hover:bg-mehr-panel hover:text-mehr-ink"
                        } ${showLabels ? "px-3" : "justify-center px-0"}`}
                      >
                        <NavLink
                          to="/services"
                          title={link.label}
                          onClick={() => {
                            setServicesOpen(true);
                            if (!isDesktop) close();
                          }}
                          className={`flex min-w-0 flex-1 items-center gap-3 ${
                            showLabels ? "" : "justify-center"
                          }`}
                        >
                          <Icon
                            size={20}
                            strokeWidth={2}
                            className={`shrink-0 transition-colors duration-300 ${
                              areaActive && !servicesOpen
                                ? "text-white"
                                : areaActive
                                  ? "text-mehr-deep"
                                  : "text-mehr-muted group-hover:text-mehr-deep"
                            }`}
                          />
                          <AnimatePresence initial={false}>
                            {showLabels && (
                              <motion.span
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -6 }}
                                transition={{ ...labelTransition, delay: 0.04 }}
                                className="overflow-hidden whitespace-nowrap"
                              >
                                {link.label}
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </NavLink>

                        {showLabels && (
                          <motion.button
                            type="button"
                            aria-label={servicesOpen ? "Collapse services" : "Expand services"}
                            aria-expanded={servicesOpen}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={(e) => {
                              e.preventDefault();
                              setServicesOpen((v) => !v);
                            }}
                            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition hover:bg-white/70"
                          >
                            <ChevronDown
                              size={16}
                              className={`transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                                servicesOpen ? "rotate-180" : ""
                              }`}
                            />
                          </motion.button>
                        )}
                      </div>
                    </div>

                    <AnimatePresence initial={false}>
                      {servicesOpen && showLabels && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                          className="mt-0.5 space-y-0.5 overflow-hidden pl-3"
                        >
                          {serviceNavLinks
                            .filter((item) => item.path !== "/services")
                            .map((item) => (
                              <li key={item.path}>
                                <NavLink
                                  to={item.path}
                                  onClick={() => {
                                    if (!isDesktop) close();
                                  }}
                                  className={({ isActive }) =>
                                    `block rounded-lg px-3 py-2 text-[13px] font-semibold transition duration-300 ${
                                      isActive
                                        ? "bg-mehr-deep text-white"
                                        : "text-mehr-mist hover:bg-mehr-panel hover:text-mehr-ink"
                                    }`
                                  }
                                >
                                  {item.label}
                                </NavLink>
                              </li>
                            ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </li>
                );
              }

              return (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    end={isHome}
                    onClick={() => {
                      if (!isDesktop) close();
                    }}
                    title={link.label}
                    className={({ isActive }) =>
                      `group relative flex items-center gap-3 rounded-xl py-2.5 text-[15px] font-bold tracking-[-0.01em] transition-colors duration-300 ${
                        isActive
                          ? "bg-mehr-deep text-white"
                          : "text-mehr-mist hover:bg-mehr-panel hover:text-mehr-ink"
                      } ${showLabels ? "px-3" : "justify-center px-0"}`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Icon
                          size={20}
                          strokeWidth={2}
                          className={`shrink-0 transition-colors duration-300 ${
                            isActive
                              ? "text-white"
                              : "text-mehr-muted group-hover:text-mehr-deep"
                          }`}
                        />
                        <AnimatePresence initial={false}>
                          {showLabels && (
                            <motion.span
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -6 }}
                              transition={{ ...labelTransition, delay: 0.04 }}
                              className="overflow-hidden whitespace-nowrap"
                            >
                              {link.label}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </>
                    )}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={`shrink-0 border-t border-mehr-deep/6 p-2.5 ${showLabels ? "" : "px-2"}`}>
          <Link
            to="/contact"
            onClick={() => {
              if (!isDesktop) close();
            }}
            title={ctas.primary}
            className={`group flex items-center rounded-xl transition duration-300 ${
              showLabels
                ? "gap-2.5 bg-mehr-panel/80 px-2.5 py-2.5 hover:bg-mehr-panel"
                : "justify-center py-2"
            }`}
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-mehr-deep text-white transition duration-300 group-hover:bg-mehr-teal-dark">
              <ArrowRight size={14} />
            </span>
            <AnimatePresence initial={false}>
              {showLabels && (
                <motion.span
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -6 }}
                  transition={{ ...labelTransition, delay: 0.04 }}
                  className="min-w-0 text-[15px] font-bold tracking-[-0.01em] text-mehr-ink"
                >
                  {ctas.primary}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </div>
      </motion.aside>
    </>
  );
}
