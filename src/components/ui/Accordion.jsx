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
 className="flex w-full items-center justify-between gap-3 py-4 text-left transition hover:text-mehr-ink sm:gap-6 sm:py-5"
 >
 <span className="min-w-0 font-sans text-base font-semibold tracking-tight text-mehr-ink sm:text-lg md:text-xl">
 {item.q}
 </span>
 <span
 className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-mehr-deep/10 transition ${
 isOpen
 ? "rotate-45 border-mehr-deep bg-mehr-deep text-white"
 : "bg-white"
 }`}
 >
 <Plus size={16} />
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
 <p className="pb-5 pr-2 text-sm leading-relaxed text-mehr-mist sm:pb-6 sm:pr-12 sm:text-base">
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
