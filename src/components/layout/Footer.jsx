"use client";

import { useState } from "react";
import { Link } from "@/components/compat/router";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Instagram, Linkedin, Phone } from "lucide-react";
import { contactInfo, footerLinks, footerContent, ctas } from "../../data/content";
import Logo from "../ui/Logo";
import SpecularButton from "../ui/SpecularButton";
import Silk from "../ui/Silk";

const SILK_COLOR = "#0b5f58";
const ease = [0.22, 1, 0.36, 1];

function WhatsAppIcon({ size = 16 }) {
 return (
 <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
 <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
 </svg>
 );
}

export default function Footer() {
 const reduce = useReducedMotion();
 const [email, setEmail] = useState("");
 const [done, setDone] = useState(false);

 const onSubmit = (e) => {
 e.preventDefault();
 if (!email.trim()) return;
 setDone(true);
 setEmail("");
 };

 return (
 <footer className="relative overflow-hidden bg-mehr-ink text-white">
 {/* Hero-like Silk atmosphere */}
 <div className="pointer-events-none absolute inset-0">
 {reduce ? (
 <div className="absolute inset-0" style={{ backgroundColor: SILK_COLOR }} />
 ) : (
 <Silk
 speed={4}
 scale={1.05}
 color={SILK_COLOR}
 noiseIntensity={1.35}
 rotation={0.15}
 />
 )}
 <div className="absolute inset-0 bg-black/35" />
 </div>

 {/* Inset frame, same language as hero */}
 <div
 className="pointer-events-none absolute inset-3 z-[3] rounded-[1.25rem] border border-white/[0.08] sm:inset-4 sm:rounded-[1.5rem] lg:inset-5"
 aria-hidden
 />

 <div className="relative z-10 px-6 pb-8 pt-10 sm:px-9 sm:pb-10 sm:pt-12 lg:px-12 lg:pb-12 lg:pt-14 xl:px-16">
 {/* Top meta row, hero-style */}
 <div className="mb-8 flex items-start justify-between gap-4 sm:mb-10">
 <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/55 sm:text-[11px]">
 me-HR · Pune
 </p>
 <p className="max-w-[14rem] text-right text-[10px] font-semibold uppercase leading-relaxed tracking-[0.16em] text-white/55 sm:max-w-none sm:text-[11px]">
 {footerContent.tagline}
 </p>
 </div>

 <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
 <div>
 <Logo size="lg" light />
 <h2 className="mt-6 max-w-[16ch] font-sans text-[clamp(1.65rem,3.2vw,2.55rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-white drop-shadow-sm">
 {footerContent.ctaLine.replace("| Book Consultation!", "").trim()}
 </h2>
 <p className="mt-3 max-w-md text-sm leading-relaxed text-white/75">
 {contactInfo.addressShort} · {contactInfo.email} · {contactInfo.phone}
 </p>

 <div className="mt-7 flex flex-wrap gap-3">
 <SpecularButton to="/contact" variant="light" size="md">
 {ctas.primary}
 <ArrowUpRight size={15} />
 </SpecularButton>
 <SpecularButton
 to="/services"
 variant="dark"
 size="md"
 tint="#ffffff"
 tintOpacity={0.12}
 blur={8}
 >
 {ctas.exploreServices}
 </SpecularButton>
 </div>
 </div>

 <div className="grid gap-8 sm:grid-cols-2 lg:gap-10">
 <div>
 <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45">
 {footerContent.usefulLinksLabel}
 </p>
 <ul className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2">
 {footerLinks.map((l) => (
 <li key={l.path + l.label}>
 <Link
 to={l.path}
 className="text-sm text-white/70 transition hover:text-white"
 >
 {l.label}
 </Link>
 </li>
 ))}
 </ul>
 </div>

 {/* Nudge newsletter + socials down so the lower-right doesn't read empty */}
 <div className="mt-6 sm:mt-14 lg:mt-20">
 <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45">
 {footerContent.subscribeLabel}
 </p>
 <form onSubmit={onSubmit} className="mt-4 flex min-w-0 gap-2">
 <input
 type="email"
 required
 value={email}
 onChange={(e) => setEmail(e.target.value)}
 placeholder={footerContent.subscribePlaceholder}
 className="min-w-0 flex-1 rounded-full border border-white/15 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40 backdrop-blur-sm transition focus:border-white/35"
 />
 <button
 type="submit"
 className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-mehr-ink transition hover:bg-white/90"
 aria-label={footerContent.subscribeCta}
 >
 <ArrowRight size={16} />
 </button>
 </form>
 {done && (
 <p className="mt-2 text-xs font-medium text-white/70">Thanks for subscribing!</p>
 )}

 <div className="mt-5 flex flex-wrap gap-2">
 {[
 { href: "https://www.linkedin.com/company/me-hr", icon: <Linkedin size={15} />, label: "LinkedIn" },
 { href: "https://www.instagram.com/_me_hr/", icon: <Instagram size={15} />, label: "Instagram" },
 { href: contactInfo.whatsapp, icon: <WhatsAppIcon size={15} />, label: "WhatsApp" },
 { href: contactInfo.phoneHref, icon: <Phone size={15} />, label: "Call" },
 ].map((s) => (
 <a
 key={s.label}
 href={s.href}
 target={s.href.startsWith("http") ? "_blank" : undefined}
 rel={s.href.startsWith("http") ? "noreferrer" : undefined}
 className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/85 backdrop-blur-sm transition hover:border-white/30 hover:bg-white/15"
 >
 {s.icon}
 {s.label}
 </a>
 ))}
 </div>
 </div>
 </div>
 </div>

 <motion.div
 initial={reduce ? false : { opacity: 0 }}
 whileInView={{ opacity: 1 }}
 viewport={{ once: true }}
 transition={{ duration: 0.5, ease }}
 className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/45 sm:mt-12 sm:flex-row sm:items-center sm:justify-between"
 >
 <p>{footerContent.copyright}</p>
 <p>
 Designed &amp; developed by :{" "}
 <span className="font-medium text-white/70">TheSocialKollab</span>
 </p>
 </motion.div>
 </div>
 </footer>
 );
}
