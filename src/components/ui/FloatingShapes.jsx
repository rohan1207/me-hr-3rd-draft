"use client";

import { motion } from "framer-motion";

const tones = {
 teal: "bg-mehr-deep/10 border-mehr-deep/15",
 coral: "bg-mehr-deep/6 border-mehr-deep/10",
 deep: "bg-mehr-deep/8 border-mehr-deep/12",
 white: "bg-white/10 border-white/20",
};

export default function FloatingShapes({ variant = "light", className = "" }) {
 const isDark = variant === "dark";

 return (
 <div
 className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
 aria-hidden
 >
 <motion.div
 className={`absolute -left-16 top-24 h-48 w-48 rounded-full border ${
 isDark ? tones.white : tones.deep
 }`}
 animate={{ y: [0, -18, 0], rotate: [0, 12, 0] }}
 transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
 />
 <motion.div
 className={`absolute right-[8%] top-[18%] h-28 w-28 shape-blob ${
 isDark ? "bg-white/10" : "bg-mehr-deep/8"
 }`}
 animate={{ y: [0, 22, 0], x: [0, -10, 0] }}
 transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
 />
 <motion.div
 className={`absolute bottom-[12%] left-[18%] h-20 w-20 rotate-45 border ${
 isDark ? "border-white/20" : "border-mehr-deep/10"
 }`}
 animate={{ rotate: [45, 65, 45], y: [0, -12, 0] }}
 transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
 />
 <motion.div
 className={`absolute -right-10 bottom-24 h-56 w-56 rounded-full border ${
 isDark ? tones.white : tones.coral
 }`}
 animate={{ scale: [1, 1.06, 1] }}
 transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
 />
 </div>
 );
}
