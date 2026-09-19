"use client";

import { motion, useReducedMotion } from "framer-motion";
import { homeContent, serviceModels } from "../../data/content";

const orbitMeta = [
 { className: "left-0 top-[2%] sm:top-[4%] lg:-left-1", delay: 0, desc: "Flexible & temporary HR support" },
 { className: "right-0 top-[0%] sm:top-[2%] lg:-right-1", delay: 0.3, desc: "Resident HR partnership" },
 { className: "bottom-[8%] left-0 sm:bottom-[10%] lg:-left-1", delay: 0.6, desc: "HR advisory & audits" },
];

const orbitCards = [
 ...serviceModels.map((m, i) => ({
 id: m.id,
 title: m.title,
 desc: orbitMeta[i].desc,
 className: orbitMeta[i].className,
 delay: orbitMeta[i].delay,
 })),
 {
 id: "pagar",
 title: homeContent.pagar.eyebrow,
 desc: "Payroll & Compliance",
 className: "bottom-[4%] right-0 sm:bottom-[6%] lg:-right-1",
 delay: 0.9,
 },
];

function HubMark({ className = "" }) {
 return (
 <svg viewBox="0 0 40 40" className={className} fill="none" aria-hidden>
 <circle cx="15" cy="14.5" r="3.4" fill="#FFFFFF" />
 <circle cx="25" cy="14.5" r="3.4" fill="#FFFFFF" />
 <path
 d="M8.5 28.5c1.2-5.2 4.4-7.8 6.5-7.8s4.2 1.6 5 3.4c.8-1.8 2.8-3.4 5-3.4s5.3 2.6 6.5 7.8"
 stroke="#FFFFFF"
 strokeWidth="2.4"
 strokeLinecap="round"
 strokeLinejoin="round"
 />
 <circle cx="31.2" cy="9.2" r="3.1" fill="rgba(255,255,255,0.55)" />
 </svg>
 );
}

/** True 3D solid rings, bold, continuous rotateY */
function GlobeWire({ spinning }) {
 const lat = [
 { tilt: 0, opacity: 0.85, width: 3 },
 { tilt: 22, opacity: 0.7, width: 2.75 },
 { tilt: -22, opacity: 0.7, width: 2.75 },
 { tilt: 42, opacity: 0.55, width: 2.5 },
 { tilt: -42, opacity: 0.55, width: 2.5 },
 ];
 const lon = [0, 30, 60, 90, 120, 150];

 const nodes = [
 ["18%", "22%"],
 ["82%", "24%"],
 ["10%", "50%"],
 ["90%", "52%"],
 ["28%", "74%"],
 ["72%", "76%"],
 ["50%", "12%"],
 ["50%", "88%"],
 ];

 return (
 <div
 className="absolute inset-0 flex items-center justify-center"
 style={{ perspective: 1100 }}
 aria-hidden
 >
 <motion.div
 className="relative h-[min(88%,380px)] w-[min(88%,380px)]"
 style={{ transformStyle: "preserve-3d", transform: "rotateX(12deg)" }}
 animate={spinning ? { rotateY: 360 } : undefined}
 transition={spinning ? { duration: 36, repeat: Infinity, ease: "linear" } : undefined}
 >
 <div
 className="absolute inset-[6%] rounded-full"
 style={{
 border: "3px solid rgba(11,95,88,0.55)",
 transformStyle: "preserve-3d",
 boxShadow: "inset 0 0 0 1px rgba(20,196,173,0.12)",
 }}
 />

 {lat.map(({ tilt, opacity, width }) => (
 <div
 key={`lat-${tilt}`}
 className="absolute inset-[6%] rounded-full"
 style={{
 border: `${width}px solid rgba(20,196,173,${opacity})`,
 transform: `rotateX(${tilt}deg)`,
 transformStyle: "preserve-3d",
 }}
 />
 ))}

 {lon.map((yaw, i) => (
 <div
 key={`lon-${yaw}`}
 className="absolute inset-[6%] rounded-full"
 style={{
 border: `${i % 2 === 0 ? 2.75 : 2.5}px solid rgba(11,95,88,${0.5 + (i % 3) * 0.08})`,
 transform: `rotateY(${yaw}deg)`,
 transformStyle: "preserve-3d",
 }}
 />
 ))}

 <div
 className="absolute left-[2%] right-[2%] top-1/2 h-[3px] -translate-y-1/2 rounded-full"
 style={{
 background:
 "linear-gradient(90deg, transparent, #0b5f58 10%, #14c4ad 50%, #0b5f58 90%, transparent)",
 boxShadow: "0 0 14px rgba(20,196,173,0.45)",
 transformStyle: "preserve-3d",
 }}
 />

 {nodes.map(([l, t], i) => (
 <span
 key={`n-${i}`}
 className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-mehr-deep"
 style={{
 left: l,
 top: t,
 boxShadow: "0 0 0 4px rgba(20,196,173,0.22), 0 0 10px rgba(11,95,88,0.4)",
 }}
 />
 ))}
 </motion.div>
 </div>
 );
}

export default function ProcessGlobe() {
 const reduce = useReducedMotion();

 return (
 <div className="relative mx-auto aspect-square w-full max-w-[480px] overflow-visible lg:max-w-none lg:h-full lg:min-h-[420px] lg:aspect-auto">
 <div
 aria-hidden
 className="pointer-events-none absolute left-1/2 top-1/2 h-[76%] w-[76%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(20,196,173,0.2)_0%,rgba(20,196,173,0.06)_42%,transparent_68%)]"
 />

 <GlobeWire spinning={!reduce} />

 <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
 {!reduce && (
 <>
 <motion.span
 aria-hidden
 className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-mehr-teal/40 sm:h-28 sm:w-28"
 animate={{ scale: [1, 1.22, 1], opacity: [0.65, 0.12, 0.65] }}
 transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
 />
 <motion.span
 aria-hidden
 className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-mehr-deep/25 sm:h-40 sm:w-40"
 animate={{ scale: [1, 1.14, 1], opacity: [0.45, 0.08, 0.45] }}
 transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut", delay: 0.55 }}
 />
 </>
 )}
 <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-mehr-deep shadow-[0_14px_40px_-8px_rgba(11,95,88,0.55)] ring-[5px] ring-white sm:h-16 sm:w-16 lg:h-[4.25rem] lg:w-[4.25rem]">
 <HubMark className="h-8 w-8 sm:h-9 sm:w-9" />
 </div>
 </div>

 {orbitCards.map((card) => (
 <motion.div
 key={card.id}
 className={`absolute z-30 max-w-[min(100%,215px)] ${card.className}`}
 initial={reduce ? false : { opacity: 0, y: 10 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.5, delay: 0.1 + card.delay * 0.12, ease: [0.22, 1, 0.36, 1] }}
 >
 <div
 className={`rounded-2xl border border-mehr-deep/10 bg-white px-3 py-2.5 shadow-float sm:px-3.5 sm:py-3 ${
 reduce ? "" : "process-globe-float"
 }`}
 style={reduce ? undefined : { animationDelay: `${card.delay}s` }}
 >
 <p className="font-sans text-[12px] font-semibold text-mehr-ink sm:text-[13px]">
 {card.title}
 </p>
 <p className="mt-0.5 text-[10px] text-mehr-mist sm:text-[11px]">{card.desc}</p>
 </div>
 </motion.div>
 ))}
 </div>
 );
}
