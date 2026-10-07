"use client";

import { Link } from "@/components/compat/router";
import { seo, contactInfo, ctas } from "../data/content";
import PageSEO from "../components/ui/PageSEO";
import PageHero from "../components/ui/PageHero";
import Reveal from "../components/ui/Reveal";

const SECTIONS = [
 {
 title: "Who we are",
 body: [
 "me-HR provides HR outsourcing, On-Demand HR, Resident HR, Strategic HR Consulting and Payroll Outsourcing services. This privacy policy explains how we collect, use and protect personal information when you visit our website or contact us.",
 ],
 },
 {
 title: "Information we collect",
 body: [
 "We may collect information you share with us, such as your name, email address, phone number, company name, employee strength and the details of your HR requirement when you fill a form, apply for a role, subscribe to updates or contact us.",
 "We may also collect limited technical information automatically, such as browser type, device type and pages visited, to help us understand how the website is used and improve performance.",
 ],
 },
 {
 title: "How we use your information",
 body: [
 "We use personal information to respond to enquiries, provide requested services, process job applications, send updates you have opted into, improve our website and maintain the security of our systems.",
 "We do not sell your personal information.",
 ],
 },
 {
 title: "Sharing of information",
 body: [
 "We may share information with trusted service providers who help us operate our website, communications or business systems, only as needed for those purposes.",
 "We may also disclose information if required by law, regulation or a valid legal process.",
 ],
 },
 {
 title: "Data retention and security",
 body: [
 "We retain personal information only for as long as needed for the purposes described in this policy, or as required by applicable law.",
 "We take reasonable technical and organisational measures to protect personal information against unauthorised access, loss or misuse.",
 ],
 },
 {
 title: "Your choices",
 body: [
 "You may request access to, correction of, or deletion of personal information we hold about you, subject to applicable law. You may also unsubscribe from marketing emails at any time using the link in those emails or by contacting us.",
 ],
 },
 {
 title: "Third-party links",
 body: [
 "Our website may contain links to third-party sites. We are not responsible for the privacy practices or content of those sites.",
 ],
 },
 {
 title: "Updates to this policy",
 body: [
 "We may update this privacy policy from time to time. The revised version will be posted on this page with an updated effective date.",
 ],
 },
 {
 title: "Contact us",
 body: [
 `If you have questions about this privacy policy or your personal information, contact us at ${contactInfo.email} or ${contactInfo.phone}.`,
 contactInfo.address,
 ],
 },
];

export default function PrivacyPolicy() {
 return (
 <>
 <PageSEO {...seo.privacy} path="/privacy-policy" />
 <PageHero
 eyebrow="Legal"
 title="Privacy policy"
 body="How me-HR collects, uses and protects personal information."
 crumbs={["Privacy policy"]}
 cta={ctas.primary}
 ctaPath="/contact"
 />

 <section className="bg-white py-8 sm:py-12 lg:py-16">
 <div className="container-mehr page-gutter sm:px-3 md:px-4 lg:px-5">
 <Reveal>
 <p className="text-[13px] text-mehr-mist sm:text-sm">
 Effective date: 1 October 2024
 </p>
 </Reveal>

 <div className="mx-auto mt-7 max-w-3xl space-y-8 sm:mt-10 sm:space-y-10">
 {SECTIONS.map((section, i) => (
 <Reveal key={section.title} delay={Math.min(i * 0.03, 0.2)}>
 <h2 className="font-sans text-[clamp(1.15rem,4vw,1.4rem)] font-semibold tracking-[-0.02em] text-mehr-ink">
 {section.title}
 </h2>
 <div className="mt-3 space-y-3">
 {section.body.map((para) => (
 <p
 key={para.slice(0, 48)}
 className="text-[14px] leading-[1.7] text-mehr-mist sm:text-[15px]"
 >
 {para}
 </p>
 ))}
 </div>
 </Reveal>
 ))}
 </div>

 <Reveal className="mx-auto mt-10 max-w-3xl border-t border-mehr-deep/10 pt-6 sm:mt-12">
 <p className="text-[13px] text-mehr-mist">
 Looking for our service terms?{" "}
 <Link
 to="/terms-and-conditions"
 className="font-semibold text-mehr-deep transition hover:text-mehr-ink"
 >
 Read terms and conditions
 </Link>
 .
 </p>
 </Reveal>
 </div>
 </section>
 </>
 );
}
