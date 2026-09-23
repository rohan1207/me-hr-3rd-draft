"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";

export default function Accordion({ items }) {
 const [open, setOpen] = useState(0);

 return (
 <div className="divide-y divide-mehr-deep/10 border-y border-mehr-deep/10">
 {items.map((item, i) => {
 const isOpen = open === i;
 return (
 <div key={item.q} className="py-1">
 <button
 type="button"
 onClick={() => setOpen(isOpen ? -1 : i)}
 className="flex w-full items-center justify-between gap-3 py-3.5 text-left transition hover:text-mehr-ink sm:gap-6 sm:py-5"
 >
 <span className="min-w-0 font-sans text-[14px] font-semibold leading-snug tracking-tight text-mehr-ink sm:text-base md:text-lg lg:text-xl">
 {item.q}
 </span>
 <span
 className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-mehr-deep/10 transition sm:h-9 sm:w-9 ${
 isOpen
 ? "rotate-45 border-mehr-deep bg-mehr-deep text-white"
 : "bg-white"
 }`}
 >
 <Plus size={15} className="sm:hidden" />
 <Plus size={16} className="hidden sm:block" />
 </span>
 </button>
 <AnimatePresence initial={false}>
 {isOpen && (
 <motion.div
 initial={{ height: 0, opacity: 0 }}
 animate={{ height: "auto", opacity: 1 }}
 exit={{ height: 0, opacity: 0 }}
 transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
 className="overflow-hidden"
 >
 <p className="pb-4 pr-1 text-[13px] leading-relaxed text-mehr-mist sm:pb-6 sm:pr-12 sm:text-sm md:text-base">
 {item.a}
 </p>
 </motion.div>
 )}
 </AnimatePresence>
 </div>
 );
 })}
 </div>
 );
}
