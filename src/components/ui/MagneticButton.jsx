"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Link } from "@/components/compat/router";

export default function MagneticButton({
 children,
 className = "",
 to,
 href,
 onClick,
 strength = 0.28,
 type = "button",
}) {
 const ref = useRef(null);
 const x = useMotionValue(0);
 const y = useMotionValue(0);
 const springX = useSpring(x, { stiffness: 240, damping: 18 });
 const springY = useSpring(y, { stiffness: 240, damping: 18 });

 const onMove = (e) => {
 const el = ref.current;
 if (!el) return;
 const rect = el.getBoundingClientRect();
 x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
 y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
 };

 const onLeave = () => {
 x.set(0);
 y.set(0);
 };

 const motionProps = {
 ref,
 style: { x: springX, y: springY },
 onMouseMove: onMove,
 onMouseLeave: onLeave,
 className,
 onClick,
 };

 if (to) {
 return (
 <motion.div style={{ display: "inline-flex", x: springX, y: springY }}>
 <Link
 ref={ref}
 to={to}
 className={className}
 onMouseMove={onMove}
 onMouseLeave={onLeave}
 onClick={onClick}
 >
 {children}
 </Link>
 </motion.div>
 );
 }

 if (href) {
 return (
 <motion.a
 {...motionProps}
 href={href}
 target={href.startsWith("http") ? "_blank" : undefined}
 rel={href.startsWith("http") ? "noreferrer" : undefined}
 >
 {children}
 </motion.a>
 );
 }

 return (
 <motion.button type={type} {...motionProps}>
 {children}
 </motion.button>
 );
}
