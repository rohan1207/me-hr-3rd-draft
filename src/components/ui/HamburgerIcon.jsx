"use client";

import { motion } from "framer-motion";

const ease = [0.32, 0.72, 0, 1];

/** Morphs three hamburger lines into a clean X */
export default function HamburgerIcon({ open, className = "" }) {
  return (
    <span className={`relative block h-3.5 w-[18px] ${className}`} aria-hidden>
      <motion.span
        className="absolute left-0 top-0 h-[1.5px] w-full origin-center rounded-full bg-current"
        animate={open ? { y: 6, rotate: 45 } : { y: 0, rotate: 0 }}
        transition={{ duration: 0.55, ease }}
      />
      <motion.span
        className="absolute left-0 top-[6px] h-[1.5px] w-full origin-center rounded-full bg-current"
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.35, ease }}
      />
      <motion.span
        className="absolute left-0 top-[12px] h-[1.5px] w-full origin-center rounded-full bg-current"
        animate={open ? { y: -6, rotate: -45 } : { y: 0, rotate: 0 }}
        transition={{ duration: 0.55, ease }}
      />
    </span>
  );
}
