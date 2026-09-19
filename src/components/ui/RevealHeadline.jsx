"use client";

import { motion, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

/**
 * Cinematic word reveal, Soft Words / Cinematic hybrid from ScrollRevealText ideas.
 * tone: "light" (black on pale) | "dark" (white on deep)
 */
export default function RevealHeadline({
 text,
 as: Tag = "h1",
 className = "",
 accentFromEnd = 3,
 tone = "light",
}) {
 const reduce = useReducedMotion();
 const cleaned = text.replace(/\.$/, "");
 const words = cleaned.split(/\s+/);
 const accentFrom = Math.max(words.length - accentFromEnd, Math.floor(words.length * 0.55));
 const leadCls = tone === "dark" ? "text-white" : "text-mehr-ink";
 const accentCls = tone === "dark" ? "text-white/50" : "text-mehr-deep/55";

 if (reduce) {
 const lead = words.slice(0, accentFrom).join(" ");
 const accent = words.slice(accentFrom).join(" ");
 return (
 <Tag className={className}>
 <span className={leadCls}>{lead}</span>{" "}
 <span className={accentCls}>{accent}.</span>
 </Tag>
 );
 }

 return (
 <Tag className={className}>
 {words.map((word, i) => {
 const isAccent = i >= accentFrom;
 return (
 <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom">
 <motion.span
 className={`inline-block ${isAccent ? accentCls : leadCls}`}
 initial={{ y: "110%", opacity: 0, filter: "blur(8px)" }}
 animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
 transition={{
 duration: 0.85,
 delay: 0.12 + i * 0.055,
 ease,
 }}
 >
 {word}
 {i === words.length - 1 ? "." : "\u00A0"}
 </motion.span>
 </span>
 );
 })}
 </Tag>
 );
}
