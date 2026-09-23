"use client";

import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "@/components/compat/router";
import { ChevronDown, Menu, X } from "lucide-react";
import { navLinks, ctas, serviceNavLinks } from "../../data/content";
import Logo from "../ui/Logo";
import SpecularButton from "../ui/SpecularButton";

const topLinks = [{ label: "Home", path: "/" }, ...navLinks];

function linkClass(isActive) {
  return `whitespace-nowrap rounded-full px-2.5 py-2 text-[14px] font-semibold tracking-[-0.01em] transition xl:px-3.5 xl:text-[15px] ${
    isActive
      ? "bg-mehr-deep text-white shadow-soft"
      : "text-mehr-ink/80 hover:bg-mehr-teal-soft hover:text-mehr-deep"
  }`;
}

function ServicesDropdown({ active }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const closeTimer = useRef(null);

  const clearClose = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    clearClose();
    closeTimer.current = window.setTimeout(() => setOpen(false), 120);
  };

  useEffect(() => () => clearClose(), []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointer = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => {
        clearClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex items-center gap-1 ${linkClass(active)}`}
      >
        Services
        <ChevronDown
          size={16}
          className={`transition ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute left-0 top-full z-50 mt-1.5 min-w-[15.5rem] rounded-2xl border border-mehr-deep/10 bg-white p-1.5 shadow-float"
          onMouseEnter={clearClose}
          onMouseLeave={scheduleClose}
        >
          {serviceNavLinks.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              role="menuitem"
              end={item.path === "/services"}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block rounded-xl px-3.5 py-2.5 text-[14px] font-semibold transition ${
                  isActive
                    ? "bg-mehr-deep text-white"
                    : "text-mehr-ink hover:bg-mehr-teal-soft hover:text-mehr-deep"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  const servicesActive =
    location.pathname === "/services" ||
    location.pathname.startsWith("/services/") ||
    location.pathname === "/pagar";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b pt-[env(safe-area-inset-top)] transition-colors ${
          scrolled || open
            ? "border-mehr-deep/10 bg-white/95 backdrop-blur-md shadow-[0_8px_24px_rgba(17,17,17,0.04)]"
            : "border-transparent bg-white/90 backdrop-blur-sm"
        }`}
      >
        <div className="page-gutter relative mx-auto flex h-[var(--header-height)] w-full max-w-[1680px] items-center justify-between gap-2 sm:gap-3 sm:px-3 md:px-4 lg:gap-4 lg:px-5">
          <Logo size="nav" className="relative z-50 shrink-0 overflow-visible" />

          <nav
            className="absolute left-1/2 top-1/2 z-40 hidden max-w-[min(100%,calc(100%-18rem))] -translate-x-1/2 -translate-y-1/2 flex-nowrap items-center gap-0.5 lg:flex xl:gap-1"
            aria-label="Primary"
          >
            {topLinks.map((link) => {
              if (link.path === "/services") {
                return (
                  <ServicesDropdown key={link.path} active={servicesActive} />
                );
              }

              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === "/"}
                  className={({ isActive }) => linkClass(isActive)}
                >
                  {link.label}
                </NavLink>
              );
            })}
          </nav>

          <div className="relative z-50 flex items-center gap-2 sm:gap-3">
            <SpecularButton
              to="/contact"
              variant="brand"
              size="sm"
              className="hidden lg:inline-flex"
            >
              {ctas.primary}
            </SpecularButton>

            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="relative z-50 flex h-10 w-10 items-center justify-center rounded-full border border-mehr-deep/10 bg-white text-mehr-ink touch-manipulation lg:hidden"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div
          className="fixed inset-0 z-40 flex flex-col bg-white lg:hidden"
          style={{ paddingTop: "calc(var(--header-height) + env(safe-area-inset-top, 0px))" }}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div
            className="pointer-events-none absolute inset-0 bg-mesh-teal opacity-40"
            aria-hidden
          />

          <nav
            aria-label="Mobile"
            className="relative z-10 flex min-h-0 flex-1 flex-col px-5 pt-4 sm:px-8"
          >
            <ul className="flex flex-1 flex-col gap-1 overflow-y-auto overscroll-contain pb-4">
              {topLinks.map((link) => {
                if (link.path === "/services") {
                  return (
                    <li key={link.path}>
                      <button
                        type="button"
                        aria-expanded={servicesOpen}
                        onClick={() => setServicesOpen((v) => !v)}
                        className={`flex w-full items-center justify-between rounded-2xl px-4 py-4 text-left text-[17px] font-semibold tracking-[-0.01em] transition touch-manipulation ${
                          servicesActive
                            ? "bg-mehr-deep text-white"
                            : "text-mehr-ink active:bg-mehr-teal-soft"
                        }`}
                      >
                        Services
                        <ChevronDown
                          size={18}
                          className={`transition ${servicesOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      {servicesOpen && (
                        <ul className="mt-1 space-y-0.5 rounded-2xl bg-mehr-panel/80 p-2">
                          {serviceNavLinks.map((item) => (
                            <li key={item.path}>
                              <NavLink
                                to={item.path}
                                end={item.path === "/services"}
                                className={({ isActive }) =>
                                  `block rounded-xl px-4 py-3 text-[15px] font-semibold transition ${
                                    isActive
                                      ? "bg-mehr-deep text-white"
                                      : "text-mehr-ink/80 active:bg-white"
                                  }`
                                }
                              >
                                {item.label}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                }

                return (
                  <li key={link.path}>
                    <NavLink
                      to={link.path}
                      end={link.path === "/"}
                      className={({ isActive }) =>
                        `block rounded-2xl px-4 py-4 text-[17px] font-semibold tracking-[-0.01em] transition touch-manipulation ${
                          isActive
                            ? "bg-mehr-deep text-white"
                            : "text-mehr-ink active:bg-mehr-teal-soft"
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </li>
                );
              })}
            </ul>

            <div className="shrink-0 border-t border-mehr-deep/10 bg-white/90 px-0 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4 backdrop-blur-sm">
              <SpecularButton to="/contact" variant="brand" size="lg" fullWidth>
                {ctas.primary}
              </SpecularButton>
              <p className="mt-3 text-center text-[12px] text-mehr-mist">
                HR that works with your business
              </p>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
