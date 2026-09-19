import { siteName, seo } from "@/data/content";

export const SITE_URL = "https://me-hr.com";

const DEFAULT_KEYWORDS = seo.home.keywords;

/** Build a Next.js Metadata object from the shared SEO content map. */
export function buildMetadata({ title, description, keywords, path = "/", noIndex = false }) {
  const canonical = path === "/" ? SITE_URL : `${SITE_URL}${path}`;
  const resolvedTitle = title || `${siteName} | HR Outsourcing Services in Pune`;

  return {
    title: resolvedTitle,
    description,
    keywords: keywords || DEFAULT_KEYWORDS,
    authors: [{ name: siteName }],
    alternates: { canonical },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, "max-image-preview": "large" },
    openGraph: {
      title: resolvedTitle,
      description,
      url: canonical,
      siteName,
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description,
    },
  };
}

/** Organization + WebSite JSON-LD, rendered once from the root layout. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: siteName,
        url: SITE_URL,
        email: "ask@me-hr.com",
        telephone: "+91-8459328399",
        description: seo.home.description,
        areaServed: "IN",
        address: {
          "@type": "PostalAddress",
          streetAddress: "1 Floor, Thread Works, 1156 Saifee Lane, MG Road",
          addressLocality: "Pune",
          addressRegion: "Maharashtra",
          postalCode: "411001",
          addressCountry: "IN",
        },
      },
      {
        "@type": "WebSite",
        name: siteName,
        url: SITE_URL,
        inLanguage: "en-IN",
      },
    ],
  };
}
