"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function Reveal({
 children,
 className = "",
 delay = 0,
 y = 36,
 once = true,
}) {
 const ref = useRef(null);
 const inView = useInView(ref, { once, margin: "-8% 0px" });

 return (
 <motion.div
 ref={ref}
 className={className}
 initial="hidden"
 animate={inView ? "visible" : "hidden"}
 variants={{
 hidden: { opacity: 0, y },
 visible: {
 opacity: 1,
 y: 0,
 transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
 },
 }}
 >
 {children}
 </motion.div>
 );
}

export function RevealStagger({ children, className = "", stagger = 0.08 }) {
 const ref = useRef(null);
 const inView = useInView(ref, { once: true, margin: "-6% 0px" });

 return (
 <motion.div
 ref={ref}
 className={className}
 initial="hidden"
 animate={inView ? "visible" : "hidden"}
 variants={{
 hidden: {},
 visible: { transition: { staggerChildren: stagger } },
 }}
 >
 {children}
 </motion.div>
 );
}

export function RevealItem({ children, className = "" }) {
 return (
 <motion.div
 className={className}
 variants={{
 hidden: { opacity: 0, y: 28 },
 visible: {
 opacity: 1,
 y: 0,
 transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
 },
 }}
 >
 {children}
 </motion.div>
 );
}
