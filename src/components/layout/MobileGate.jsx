"use client";

import { images } from "../../data/images";

/**
 * Phone / tablet lock — desktop experience only until the mobile site ships.
 * Pure CSS breakpoint (below lg / 1024px) so it works before hydration.
 */
export default function MobileGate() {
  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-mehr-fog px-6 py-10 text-center lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mobile-gate-title"
      aria-describedby="mobile-gate-desc"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-mesh-teal opacity-80"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-mehr-deep/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-mehr-teal/15 blur-3xl"
        aria-hidden
      />

      <div className="relative z-10 flex max-w-[22rem] flex-col items-center">
        <img
          src={images.logo}
          alt="me-HR"
          className="h-14 w-auto object-contain"
        />

        <p className="eyebrow mt-10">Coming soon</p>

        <h1
          id="mobile-gate-title"
          className="mt-3 font-sans text-[1.55rem] font-semibold leading-[1.2] tracking-[-0.03em] text-mehr-ink"
        >
          Phone screen experience is in progress
        </h1>

        <p
          id="mobile-gate-desc"
          className="mt-4 text-[15px] leading-relaxed text-mehr-mist"
        >
          It will be available soon. Please visit us on desktop for the full
          experience.
        </p>

        <div className="mt-8 h-px w-16 bg-mehr-deep/20" aria-hidden />

        <p className="mt-6 text-[13px] font-medium text-mehr-deep">
          Best viewed on a larger screen
        </p>
      </div>
    </div>
  );
}
