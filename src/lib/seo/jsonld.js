import { SITE } from "./site";

/**
 * Organization + WebSite JSON-LD (Phase 1 baseline).
 * Expanded graph (LocalBusiness, @id refs) lands in Phase 3.
 */
export function organizationJsonLd() {
  const orgId = `${SITE.url}/#organization`;
  const siteId = `${SITE.url}/#website`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: SITE.name,
        url: SITE.url,
        email: SITE.email,
        telephone: SITE.phone,
        description: SITE.description,
        slogan: SITE.tagline,
        foundingDate: SITE.foundingYear,
        logo: {
          "@type": "ImageObject",
          url: `${SITE.url}/logo1.png`,
        },
        address: {
          "@type": "PostalAddress",
          ...SITE.address,
        },
        sameAs: SITE.sameAs,
        areaServed: "IN",
        knowsAbout: [
          "HR Outsourcing",
          "On-Demand HR",
          "Resident HR",
          "Fractional HR",
          "Strategic HR Consulting",
          "Payroll Outsourcing",
          "KEKA",
          "HROne",
          "greytHR",
          "HRMS implementation",
        ],
        founder: {
          "@type": "Person",
          name: SITE.founder.name,
          jobTitle: SITE.founder.jobTitle,
          email: SITE.founder.email,
        },
      },
      {
        "@type": "WebSite",
        "@id": siteId,
        url: SITE.url,
        name: SITE.name,
        inLanguage: SITE.language,
        publisher: { "@id": orgId },
      },
    ],
  };
}
