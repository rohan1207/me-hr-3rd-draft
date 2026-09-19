"use client";

import { NavLink } from "@/components/compat/router";
import { serviceNavLinks } from "../../data/content";

/**
 * Compact service switcher for detail pages.
 * Sticks under the top navbar while scrolling.
 */
export default function ServiceNav({ currentPath }) {
  return (
    <>
      <div className="h-12 shrink-0 sm:h-[3.25rem]" aria-hidden />

      <nav
        aria-label="Service pages"
        className="fixed left-0 right-0 top-[var(--header-height)] z-40 border-b border-mehr-deep/8 bg-white/95 shadow-[0_8px_24px_rgba(17,17,17,0.04)] backdrop-blur-md"
      >
        <div className="container-mehr page-gutter sm:px-3 md:px-4 lg:px-5">
          <div className="flex h-12 items-center gap-1 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] sm:h-[3.25rem] [&::-webkit-scrollbar]:hidden">
            {serviceNavLinks.map((link) => {
              const active = link.path === currentPath;
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === "/services"}
                  className={`shrink-0 rounded-full px-3.5 py-2 text-[12px] font-semibold transition sm:text-[13px] ${
                    active
                      ? "bg-mehr-deep text-white shadow-soft"
                      : "bg-mehr-panel/80 text-mehr-mist hover:bg-mehr-panel hover:text-mehr-ink"
                  }`}
                >
                  <span className="sm:hidden">{link.short}</span>
                  <span className="hidden sm:inline">{link.label}</span>
                </NavLink>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
}
