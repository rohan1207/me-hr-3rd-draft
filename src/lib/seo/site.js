/** Single source of truth for me-HR SEO / entity facts (Phase 1). */
export const SITE = {
  name: "me-HR",
  legalName: "me-HR",
  url: "https://www.me-hr.com",
  locale: "en_IN",
  language: "en-IN",
  tagline: "Streamline your success",
  description:
    "me-HR offers On-Demand HR, Resident (fractional) HR, Strategic HR Consulting and Payroll Outsourcing for growing businesses in Pune and across India.",
  foundingYear: "2018",
  phone: "+91 8600898604",
  email: "ask@me-hr.com",
  address: {
    streetAddress:
      "1 Floor, Thread Works, 1156 Saifee Lane, MG Road, near 1000 Oaks Restaurant",
    addressLocality: "Pune",
    addressRegion: "Maharashtra",
    postalCode: "411001",
    addressCountry: "IN",
  },
  // TODO(client): get exact lat/long from Google Maps pin, then add geo to schema
  sameAs: [
    "https://www.linkedin.com/company/me-hr",
    "https://www.instagram.com/_me_hr/",
  ],
  founder: {
    name: "Sonia Patra",
    jobTitle: "Founder & Director",
    email: "sonia@me-hr.com",
  },
  // Served by app/opengraph-image.js (Next Metadata file convention)
  ogImage: "/opengraph-image",
  // TODO(client): Twitter / X handle if brand account exists
  twitterHandle: undefined,
};

/** Absolute URL helper */
export function abs(path = "/") {
  return new URL(path, SITE.url).toString();
}

/** @deprecated use SITE.url — kept for existing imports during Phase 1 */
export const SITE_URL = SITE.url;
