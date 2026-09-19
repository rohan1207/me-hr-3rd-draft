"use client";

import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "@/components/compat/router";
import { ChevronDown, Menu, X } from "lucide-react";
import { navLinks, ctas, serviceNavLinks } from "../../data/content";
import Logo from "../ui/Logo";
import SpecularButton from "../ui/SpecularButton";

const topLinks = [{ label: "Home", path: "/" }, ...navLinks];

function linkClass(isActive) {
  return `rounded-full px-3.5 py-2 text-[15px] font-semibold tracking-[-0.01em] transition xl:px-4 xl:text-[16px] ${
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
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors ${
          scrolled || open
            ? "border-mehr-deep/10 bg-white/95 backdrop-blur-md shadow-[0_8px_24px_rgba(17,17,17,0.04)]"
            : "border-transparent bg-white/80 backdrop-blur-sm"
        }`}
      >
        <div className="page-gutter relative mx-auto flex h-[var(--header-height)] w-full max-w-[1680px] items-center justify-between gap-3 sm:px-3 md:px-4 lg:gap-4 lg:px-5">
          <Logo size="nav" className="relative z-50 shrink-0" />

          <nav
            className="absolute left-1/2 top-1/2 z-40 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-1 lg:flex xl:gap-1.5"
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
              className="hidden sm:inline-flex"
            >
              {ctas.primary}
            </SpecularButton>

            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="relative z-50 flex h-10 w-10 items-center justify-center rounded-full border border-mehr-deep/10 bg-white text-mehr-ink lg:hidden"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-mehr-ink/25"
            onClick={() => setOpen(false)}
          />
          <nav
            aria-label="Mobile"
            className="absolute inset-x-0 top-[var(--header-height)] max-h-[calc(100dvh-var(--header-height))] overflow-y-auto border-b border-mehr-deep/10 bg-white px-4 py-4 shadow-float sm:px-6"
          >
            <ul className="flex flex-col gap-0.5">
              {topLinks.map((link) => {
                if (link.path === "/services") {
                  return (
                    <li key={link.path}>
                      <button
                        type="button"
                        aria-expanded={servicesOpen}
                        onClick={() => setServicesOpen((v) => !v)}
                        className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-[15px] font-semibold transition ${
                          servicesActive
                            ? "bg-mehr-deep text-white"
                            : "text-mehr-ink hover:bg-mehr-teal-soft hover:text-mehr-deep"
                        }`}
                      >
                        Services
                        <ChevronDown
                          size={16}
                          className={`transition ${servicesOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      {servicesOpen && (
                        <ul className="mb-1 mt-0.5 space-y-0.5 border-l border-mehr-deep/15 pl-3 ml-4">
                          {serviceNavLinks.map((item) => (
                            <li key={item.path}>
                              <NavLink
                                to={item.path}
                                end={item.path === "/services"}
                                className={({ isActive }) =>
                                  `block rounded-lg px-3 py-2.5 text-[14px] font-semibold transition ${
                                    isActive
                                      ? "bg-mehr-deep text-white"
                                      : "text-mehr-mist hover:bg-mehr-teal-soft hover:text-mehr-deep"
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
                        `block rounded-xl px-4 py-3 text-[15px] font-semibold transition ${
                          isActive
                            ? "bg-mehr-deep text-white"
                            : "text-mehr-ink hover:bg-mehr-teal-soft hover:text-mehr-deep"
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
            <div className="mt-4 border-t border-mehr-deep/8 pt-4 sm:hidden">
              <SpecularButton to="/contact" variant="brand" size="md" fullWidth>
                {ctas.primary}
              </SpecularButton>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
