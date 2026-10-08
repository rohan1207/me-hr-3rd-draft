import { mediaContent, caseStudies } from "@/data/content";
import { abs, SITE } from "@/lib/seo";

const STATIC_ROUTES = [
  ["/", 1.0, "weekly"],
  ["/about", 0.8, "monthly"],
  ["/services", 0.9, "monthly"],
  ["/services/on-demand-hr", 0.9, "monthly"],
  ["/services/hr-retainership", 0.9, "monthly"],
  ["/services/strategic-consulting", 0.9, "monthly"],
  ["/pagar", 0.9, "monthly"],
  ["/pricing", 0.8, "monthly"],
  ["/case-studies", 0.7, "monthly"],
  ["/media", 0.8, "weekly"],
  ["/life", 0.5, "monthly"],
  ["/careers", 0.7, "weekly"],
  ["/contact", 0.8, "yearly"],
  ["/faqs", 0.6, "monthly"],
  ["/privacy-policy", 0.2, "yearly"],
  ["/terms-and-conditions", 0.2, "yearly"],
];

export default function sitemap() {
  const lastModified = new Date();

  return [
    ...STATIC_ROUTES.map(([path, priority, changeFrequency]) => ({
      url: abs(path),
      lastModified,
      changeFrequency,
      priority,
    })),
    ...mediaContent.posts.map((post) => ({
      url: abs(`/media/${post.id}`),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    })),
    ...caseStudies.map((study) => ({
      url: abs(`/case-studies/${study.id}`),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.55,
    })),
  ];
}

// Ensure SITE.url stays the sitemap host (Phase 2 will rename routes)
void SITE;
