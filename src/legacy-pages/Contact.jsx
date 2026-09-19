"use client";

import { useState } from "react";
import { Link } from "@/components/compat/router";
import { Mail, MapPin, Phone, Send, CheckCircle2, ArrowUpRight } from "lucide-react";
import {
 contactInfo,
 consultationTopics,
 employeeStrengthOptions,
 contactContent,
 seo,
 ctas,
} from "../data/content";
import PageSEO from "../components/ui/PageSEO";
import PageHero from "../components/ui/PageHero";
import SpecularButton from "../components/ui/SpecularButton";
import Reveal, { RevealItem, RevealStagger } from "../components/ui/Reveal";
import CTABanner from "../components/ui/CTABanner";

const initial = {
 name: "",
 company: "",
 email: "",
 phone: "",
 strength: "",
 topic: "",
 requirement: "",
};

const channels = [
 { icon: MapPin, label: "Address", value: contactInfo.address },
 { icon: Mail, label: "Email", value: contactInfo.email, href: contactInfo.emailHref },
 { icon: Phone, label: "Phone No.", value: contactInfo.phone, href: contactInfo.phoneHref },
];

const MAP_EMBED =
 "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.399977589914!2d73.8768043749626!3d18.510818782580877!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c1153c09e42f%3A0xda3a74690481a9e0!2sThread%20Works!5e0!3m2!1sen!2sin!4v1788695883990!5m2!1sen!2sin";

const MAP_LINK = "https://maps.app.goo.gl/oRmBa7ijcqATh3NV6";

export default function Contact() {
 const [form, setForm] = useState(initial);
 const [submitted, setSubmitted] = useState(false);
 const { hero, success } = contactContent;

 const onChange = (e) => {
 const { name, value } = e.target;
 setForm((f) => ({ ...f, [name]: value }));
 };

 const onSubmit = (e) => {
 e.preventDefault();
 setSubmitted(true);
 setForm(initial);
 };

 return (
 <>
 <PageSEO {...seo.contact} />
 <PageHero
 eyebrow={hero.title}
 title={hero.subtitle}
 body={hero.body}
 crumbs={["Contact"]}
 cta={ctas.bookMyConsultation}
 ctaPath="/contact#enquiry"
 secondaryCta={ctas.exploreServices}
 secondaryPath="/services"
 chips={["On-Demand", "Resident HR", "Consulting"]}
 />

 <section id="enquiry" className="section-pad bg-white">
 <div className="container-mehr page-gutter sm:px-3 md:px-4 lg:px-5">
 <div className="grid gap-8 lg:grid-cols-[0.95fr_1.15fr] lg:gap-10 xl:gap-14">
 {/* Contact details + map-like panel */}
 <Reveal>
 <div className="overflow-hidden rounded-[1.5rem] border border-mehr-deep/10 bg-mehr-panel/40 sm:rounded-[1.75rem]">
 <div className="relative aspect-[16/10] overflow-hidden sm:aspect-[5/3]">
 <iframe
 title="me-HR office, Thread Works, MG Road, Pune"
 src={MAP_EMBED}
 className="absolute inset-0 h-full w-full border-0"
 allowFullScreen
 loading="lazy"
 referrerPolicy="strict-origin-when-cross-origin"
 />
 <a
 href={MAP_LINK}
 target="_blank"
 rel="noopener noreferrer"
 className="absolute bottom-3 left-3 right-3 flex items-center gap-2 rounded-xl border border-white/40 bg-white/95 px-3 py-2.5 shadow-soft backdrop-blur-sm transition hover:bg-white sm:left-4 sm:right-auto sm:max-w-xs"
 >
 <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-mehr-deep text-white">
 <MapPin size={15} />
 </span>
 <span className="min-w-0 text-left">
 <span className="block text-[10px] font-semibold uppercase tracking-[0.12em] text-mehr-deep">
 Open in Maps
 </span>
 <span className="mt-0.5 block truncate text-xs font-semibold text-mehr-ink">
 {contactInfo.addressShort}
 </span>
 </span>
 </a>
 </div>

 <div className="space-y-3 p-4 sm:p-5">
 <h2 className="font-sans text-lg font-semibold text-mehr-ink">Contact Details</h2>
 <RevealStagger className="space-y-3" stagger={0.05}>
 {channels.map((ch) => (
 <RevealItem key={ch.label}>
 <div className="flex gap-3 rounded-[1.15rem] border border-mehr-deep/8 bg-white p-3.5 sm:p-4">
 <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-mehr-teal-soft text-mehr-deep">
 <ch.icon size={16} />
 </span>
 <div className="min-w-0">
 <p className="text-[10px] font-semibold uppercase tracking-wider text-mehr-muted">
 {ch.label}
 </p>
 {ch.href ? (
 <a
 href={ch.href}
 className="mt-0.5 block text-sm font-medium text-mehr-ink transition hover:text-mehr-deep"
 >
 {ch.value}
 </a>
 ) : (
 <p className="mt-0.5 text-sm leading-relaxed text-mehr-mist">
 {ch.value}
 </p>
 )}
 </div>
 </div>
 </RevealItem>
 ))}
 </RevealStagger>
 </div>
 </div>
 </Reveal>

 {/* Form / success */}
 <Reveal delay={0.08}>
 {submitted ? (
 <div className="flex h-full flex-col items-center justify-center rounded-[1.5rem] border border-mehr-deep/10 bg-gradient-to-br from-mehr-teal-soft via-white to-mehr-panel p-8 text-center shadow-soft sm:rounded-[1.75rem] sm:p-10 lg:p-12">
 <span className="flex h-16 w-16 items-center justify-center rounded-full bg-mehr-deep text-white shadow-float">
 <CheckCircle2 size={32} strokeWidth={1.75} />
 </span>
 <h3 className="mt-6 font-sans text-2xl font-semibold tracking-tight text-mehr-ink">
 {success.title}
 </h3>
 <p className="mt-3 max-w-sm text-sm leading-relaxed text-mehr-mist sm:text-[15px]">
 {success.body}
 </p>
 <div className="mt-8 flex flex-wrap justify-center gap-3">
 <SpecularButton to="/services" variant="brand" size="md">
 {success.cta}
 <ArrowUpRight size={15} />
 </SpecularButton>
 <button
 type="button"
 onClick={() => setSubmitted(false)}
 className="inline-flex items-center rounded-full border border-mehr-deep/20 bg-white px-5 py-3 text-sm font-semibold text-mehr-deep transition hover:border-mehr-deep hover:bg-mehr-panel"
 >
 {ctas.bookMyConsultation}
 </button>
 </div>
 </div>
 ) : (
 <form
 onSubmit={onSubmit}
 className="rounded-[1.5rem] border border-mehr-deep/10 bg-white p-5 shadow-float sm:rounded-[1.75rem] sm:p-7 lg:p-8"
 >
 <p className="mb-4 text-sm font-semibold text-mehr-ink">{hero.topicsLabel}</p>
 <div className="mb-6 flex flex-wrap gap-2">
 {consultationTopics.map((topic) => (
 <button
 key={topic}
 type="button"
 onClick={() => setForm((f) => ({ ...f, topic }))}
 className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition ${
 form.topic === topic
 ? "border-mehr-deep bg-mehr-deep text-white shadow-soft"
 : "border-mehr-deep/15 bg-mehr-panel/50 text-mehr-mist hover:border-mehr-deep/30 hover:bg-white"
 }`}
 >
 {topic}
 </button>
 ))}
 </div>

 <div className="grid gap-4 sm:grid-cols-2">
 <div>
 <label className="mb-1.5 block text-xs font-semibold text-mehr-ink">
 Name
 </label>
 <input
 name="name"
 required
 value={form.name}
 onChange={onChange}
 className="input-field w-full"
 />
 </div>
 <div>
 <label className="mb-1.5 block text-xs font-semibold text-mehr-ink">
 Company Name
 </label>
 <input
 name="company"
 required
 value={form.company}
 onChange={onChange}
 className="input-field w-full"
 />
 </div>
 <div>
 <label className="mb-1.5 block text-xs font-semibold text-mehr-ink">
 Work Email
 </label>
 <input
 type="email"
 name="email"
 required
 value={form.email}
 onChange={onChange}
 className="input-field w-full"
 />
 </div>
 <div>
 <label className="mb-1.5 block text-xs font-semibold text-mehr-ink">
 Phone Number
 </label>
 <input
 type="tel"
 name="phone"
 required
 value={form.phone}
 onChange={onChange}
 className="input-field w-full"
 />
 </div>
 <div className="sm:col-span-2">
 <label className="mb-1.5 block text-xs font-semibold text-mehr-ink">
 Employee Strength
 </label>
 <select
 name="strength"
 required
 value={form.strength}
 onChange={onChange}
 className="input-field w-full"
 >
 <option value="">Select employee strength</option>
 {employeeStrengthOptions.map((opt) => (
 <option key={opt} value={opt}>
 {opt}
 </option>
 ))}
 </select>
 </div>
 <div className="sm:col-span-2">
 <label className="mb-1.5 block text-xs font-semibold text-mehr-ink">
 What can we help you with?
 </label>
 <input
 name="topic"
 required
 value={form.topic}
 onChange={onChange}
 placeholder="Select a topic above or type here"
 className="input-field w-full"
 />
 </div>
 <div className="sm:col-span-2">
 <label className="mb-1.5 block text-xs font-semibold text-mehr-ink">
 Briefly tell us about your requirement
 </label>
 <textarea
 name="requirement"
 required
 rows={4}
 value={form.requirement}
 onChange={onChange}
 className="input-field w-full resize-none"
 />
 </div>
 </div>

 <div className="mt-6 flex flex-wrap items-center gap-3">
 <SpecularButton
 type="submit"
 variant="brand"
 size="md"
 fullWidth
 className="sm:!w-auto"
 >
 {ctas.bookMyConsultation}
 <Send size={15} />
 </SpecularButton>
 <Link
 to="/services"
 className="text-sm font-semibold text-mehr-deep transition hover:underline"
 >
 {ctas.exploreServices}
 </Link>
 </div>
 </form>
 )}
 </Reveal>
 </div>
 </div>
 </section>

 <CTABanner cta={ctas.primary} />
 </>
 );
}
