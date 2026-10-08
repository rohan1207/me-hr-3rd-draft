import { SITE, abs } from "./site";

/**
 * Build a Next.js Metadata object.
 * @param {object} opts
 * @param {string} opts.title
 * @param {string} [opts.description]
 * @param {string} [opts.path]
 * @param {boolean} [opts.absolute] - use title.absolute (no template suffix)
 * @param {boolean} [opts.noIndex]
 * @param {string} [opts.ogType] - openGraph type (website | article)
 * @param {object} [opts.openGraph] - extra OG fields
 * @param {string[]} [opts.keywords]
 */
export function buildMetadata({
  title,
  description,
  path = "/",
  absolute = false,
  noIndex = false,
  ogType = "website",
  openGraph: openGraphExtra,
  keywords,
} = {}) {
  const canonicalPath = path.startsWith("/") ? path : `/${path}`;
  const canonical = abs(canonicalPath === "/" ? "/" : canonicalPath);
  const resolvedDescription = description || SITE.description;
  const ogImage = {
    url: SITE.ogImage,
    width: 1200,
    height: 630,
    alt: `${SITE.name}: HR outsourcing in Pune`,
  };

  return {
    title: absolute ? { absolute: title } : title,
    description: resolvedDescription,
    ...(keywords ? { keywords } : {}),
    authors: [{ name: SITE.name, url: SITE.url }],
    creator: SITE.name,
    publisher: SITE.name,
    alternates: {
      canonical: canonicalPath === "/" ? "/" : canonicalPath,
      languages: { "en-IN": canonicalPath === "/" ? "/" : canonicalPath },
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      type: ogType,
      siteName: SITE.name,
      locale: SITE.locale,
      url: canonical,
      title: absolute ? title : undefined,
      description: resolvedDescription,
      images: [ogImage],
      ...openGraphExtra,
    },
    twitter: {
      card: "summary_large_image",
      title: absolute ? title : undefined,
      description: resolvedDescription,
      images: [SITE.ogImage],
    },
  };
}

/** Convenience: metadata from PAGE_SEO entry */
export function pageMetadata(entry) {
  if (!entry) return buildMetadata({ title: SITE.name, absolute: true });
  return buildMetadata({
    title: entry.title,
    description: entry.description,
    path: entry.path,
    absolute: entry.absolute !== false,
  });
}
