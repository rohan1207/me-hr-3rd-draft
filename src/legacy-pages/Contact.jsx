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

const fieldClass =
  "input-field w-full !rounded-xl !px-3.5 !py-3 text-[15px] sm:!rounded-2xl sm:!px-4 sm:!py-3.5 sm:text-sm";

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

      <section id="enquiry" className="bg-white py-7 sm:py-12 lg:py-16">
        <div className="container-mehr page-gutter sm:px-3 md:px-4 lg:px-5">
          {/* Quick reach — phone only */}
          <div className="mb-5 grid grid-cols-2 gap-2 sm:hidden">
            <a
              href={contactInfo.phoneHref}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-mehr-deep px-3 py-3 text-[13px] font-semibold text-white shadow-float active:scale-[0.98]"
            >
              <Phone size={15} />
              Call
            </a>
            <a
              href={contactInfo.emailHref}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-mehr-deep/15 bg-white px-3 py-3 text-[13px] font-semibold text-mehr-deep shadow-soft active:scale-[0.98]"
            >
              <Mail size={15} />
              Email
            </a>
          </div>

          <div className="grid gap-5 sm:gap-8 lg:grid-cols-[0.95fr_1.15fr] lg:gap-10 xl:gap-14">
            {/* Map + details — after form on phone */}
            <Reveal className="order-2 lg:order-1">
              <div className="overflow-hidden rounded-[1.25rem] border border-mehr-deep/10 bg-mehr-panel/40 sm:rounded-[1.75rem]">
                <div className="relative aspect-[16/11] overflow-hidden sm:aspect-[5/3]">
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
                    className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center gap-2 rounded-xl border border-white/40 bg-white/95 px-3 py-2.5 shadow-soft backdrop-blur-sm transition hover:bg-white sm:bottom-3 sm:left-4 sm:right-auto sm:max-w-xs"
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

                <div className="space-y-2.5 p-3.5 sm:space-y-3 sm:p-5">
                  <h2 className="font-sans text-[15px] font-semibold text-mehr-ink sm:text-lg">
                    Contact Details
                  </h2>
                  <RevealStagger className="space-y-2.5 sm:space-y-3" stagger={0.05}>
                    {channels.map((ch) => (
                      <RevealItem key={ch.label}>
                        <div className="flex gap-3 rounded-[1rem] border border-mehr-deep/8 bg-white p-3 sm:rounded-[1.15rem] sm:p-4">
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
                                className="mt-0.5 block break-words text-[13px] font-medium text-mehr-ink transition hover:text-mehr-deep sm:text-sm"
                              >
                                {ch.value}
                              </a>
                            ) : (
                              <p className="mt-0.5 text-[13px] leading-relaxed text-mehr-mist sm:text-sm">
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

            {/* Form / success — first on phone */}
            <Reveal delay={0.08} className="order-1 lg:order-2">
              {submitted ? (
                <div className="flex h-full flex-col items-center justify-center rounded-[1.25rem] border border-mehr-deep/10 bg-gradient-to-br from-mehr-teal-soft via-white to-mehr-panel p-6 text-center shadow-soft sm:rounded-[1.75rem] sm:p-10 lg:p-12">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-mehr-deep text-white shadow-float sm:h-16 sm:w-16">
                    <CheckCircle2 size={28} strokeWidth={1.75} className="sm:hidden" />
                    <CheckCircle2
                      size={32}
                      strokeWidth={1.75}
                      className="hidden sm:block"
                    />
                  </span>
                  <h3 className="mt-5 font-sans text-[clamp(1.35rem,5.5vw,1.75rem)] font-semibold tracking-tight text-mehr-ink sm:mt-6">
                    {success.title}
                  </h3>
                  <p className="mt-3 max-w-sm text-[13px] leading-relaxed text-mehr-mist sm:text-[15px]">
                    {success.body}
                  </p>
                  <div className="mt-6 flex w-full flex-col items-stretch gap-2.5 sm:mt-8 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center sm:gap-3">
                    <SpecularButton
                      to="/services"
                      variant="brand"
                      size="md"
                      className="w-full justify-center sm:w-auto"
                    >
                      {success.cta}
                      <ArrowUpRight size={15} />
                    </SpecularButton>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="inline-flex w-full items-center justify-center rounded-full border border-mehr-deep/20 bg-white px-5 py-3 text-sm font-semibold text-mehr-deep transition hover:border-mehr-deep hover:bg-mehr-panel sm:w-auto"
                    >
                      {ctas.bookMyConsultation}
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={onSubmit}
                  className="rounded-[1.25rem] border border-mehr-deep/10 bg-white p-4 shadow-float sm:rounded-[1.75rem] sm:p-7 lg:p-8"
                >
                  <p className="mb-3 text-[13px] font-semibold text-mehr-ink sm:mb-4 sm:text-sm">
                    {hero.topicsLabel}
                  </p>

                  {/* Topic chips — horizontal scroll on phone */}
                  <div className="-mx-4 mb-5 flex gap-2 overflow-x-auto px-4 pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:mb-6 sm:flex-wrap sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
                    {consultationTopics.map((topic) => (
                      <button
                        key={topic}
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, topic }))}
                        className={`shrink-0 rounded-full border px-3.5 py-2 text-[12px] font-medium transition active:scale-[0.98] sm:py-1.5 sm:text-xs ${
                          form.topic === topic
                            ? "border-mehr-deep bg-mehr-deep text-white shadow-soft"
                            : "border-mehr-deep/15 bg-mehr-panel/50 text-mehr-mist hover:border-mehr-deep/30 hover:bg-white"
                        }`}
                      >
                        {topic}
                      </button>
                    ))}
                  </div>

                  <div className="grid gap-3.5 sm:grid-cols-2 sm:gap-4">
                    <div>
                      <label className="mb-1.5 block text-[11px] font-semibold text-mehr-ink sm:text-xs">
                        Name
                      </label>
                      <input
                        name="name"
                        required
                        autoComplete="name"
                        value={form.name}
                        onChange={onChange}
                        className={fieldClass}
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-[11px] font-semibold text-mehr-ink sm:text-xs">
                        Company Name
                      </label>
                      <input
                        name="company"
                        required
                        autoComplete="organization"
                        value={form.company}
                        onChange={onChange}
                        className={fieldClass}
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-[11px] font-semibold text-mehr-ink sm:text-xs">
                        Work Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        autoComplete="email"
                        inputMode="email"
                        value={form.email}
                        onChange={onChange}
                        className={fieldClass}
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-[11px] font-semibold text-mehr-ink sm:text-xs">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        autoComplete="tel"
                        inputMode="tel"
                        value={form.phone}
                        onChange={onChange}
                        className={fieldClass}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="mb-1.5 block text-[11px] font-semibold text-mehr-ink sm:text-xs">
                        Employee Strength
                      </label>
                      <select
                        name="strength"
                        required
                        value={form.strength}
                        onChange={onChange}
                        className={fieldClass}
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
                      <label className="mb-1.5 block text-[11px] font-semibold text-mehr-ink sm:text-xs">
                        What can we help you with?
                      </label>
                      <input
                        name="topic"
                        required
                        value={form.topic}
                        onChange={onChange}
                        placeholder="Select a topic above or type here"
                        className={fieldClass}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="mb-1.5 block text-[11px] font-semibold text-mehr-ink sm:text-xs">
                        Briefly tell us about your requirement
                      </label>
                      <textarea
                        name="requirement"
                        required
                        rows={4}
                        value={form.requirement}
                        onChange={onChange}
                        className={`${fieldClass} resize-none`}
                      />
                    </div>
                  </div>

                  <div className="mt-5 flex w-full flex-col items-stretch gap-3 sm:mt-6 sm:flex-row sm:flex-wrap sm:items-center">
                    <SpecularButton
                      type="submit"
                      variant="brand"
                      size="md"
                      fullWidth
                      className="justify-center sm:!w-auto"
                    >
                      {ctas.bookMyConsultation}
                      <Send size={15} />
                    </SpecularButton>
                    <Link
                      to="/services"
                      className="inline-flex w-full items-center justify-center py-2 text-sm font-semibold text-mehr-deep transition hover:underline sm:w-auto sm:justify-start sm:py-0"
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
