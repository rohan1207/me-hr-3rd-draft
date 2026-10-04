"use client";

import { Link } from "@/components/compat/router";
import { seo, contactInfo, ctas, siteName } from "../data/content";
import PageSEO from "../components/ui/PageSEO";
import PageHero from "../components/ui/PageHero";
import Reveal from "../components/ui/Reveal";

const SECTIONS = [
  {
    title: "Agreement to terms",
    body: [
      `These terms and conditions govern your use of the ${siteName} website and any enquiry or engagement you make through it. By using this website, you agree to these terms. If you do not agree, please do not use the site.`,
    ],
  },
  {
    title: "About our services",
    body: [
      "me-HR offers HR-related services including On-Demand HR, Resident HR, Strategic HR Consulting and Payroll Outsourcing. Information on this website is for general guidance and does not create a client engagement until a separate commercial agreement is confirmed.",
    ],
  },
  {
    title: "Use of the website",
    body: [
      "You agree to use this website lawfully and not to attempt to disrupt, scrape or misuse the site or its content. We may update, suspend or withdraw any part of the website without notice.",
    ],
  },
  {
    title: "Enquiries and applications",
    body: [
      "When you submit an enquiry, consultation request or job application, you confirm that the information you provide is accurate to the best of your knowledge. Submitting a form does not guarantee a response timeline, engagement or employment offer.",
    ],
  },
  {
    title: "Intellectual property",
    body: [
      "All content on this website, including text, branding, layout and graphics, belongs to me-HR or its licensors unless otherwise stated. You may not copy, reproduce or distribute website content for commercial use without our prior written consent.",
    ],
  },
  {
    title: "No professional advice warranty",
    body: [
      "Website content is provided for general information only and should not be treated as legal, tax, accounting or employment advice for your specific situation. Formal advice is provided only under an agreed service engagement.",
    ],
  },
  {
    title: "Limitation of liability",
    body: [
      "To the fullest extent permitted by law, me-HR is not liable for any indirect, incidental or consequential loss arising from your use of this website or reliance on its content. Nothing in these terms limits liability that cannot be limited under applicable law.",
    ],
  },
  {
    title: "Third-party links",
    body: [
      "Links to third-party websites are provided for convenience. We do not control or endorse those sites and are not responsible for their content or practices.",
    ],
  },
  {
    title: "Changes to these terms",
    body: [
      "We may revise these terms from time to time. Continued use of the website after changes are posted means you accept the updated terms.",
    ],
  },
  {
    title: "Governing law",
    body: [
      "These terms are governed by the laws of India. Courts in Pune, Maharashtra shall have jurisdiction, subject to applicable law.",
    ],
  },
  {
    title: "Contact",
    body: [
      `For questions about these terms, contact us at ${contactInfo.email} or ${contactInfo.phone}.`,
      contactInfo.address,
    ],
  },
];

export default function TermsAndConditions() {
  return (
    <>
      <PageSEO {...seo.terms} path="/terms-and-conditions" />
      <PageHero
        eyebrow="Legal"
        title="Terms and conditions"
        body="The terms that apply when you use the me-HR website or contact us through it."
        crumbs={["Terms and conditions"]}
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
              Want to know how we handle personal data?{" "}
              <Link
                to="/privacy-policy"
                className="font-semibold text-mehr-deep transition hover:text-mehr-ink"
              >
                Read our privacy policy
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
