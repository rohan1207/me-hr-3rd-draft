import { mediaContent } from "@/data/content";
import { SITE_URL } from "@/lib/seo";

const STATIC_PATHS = [
  { path: "/", priority: 1 },
  { path: "/about", priority: 0.9 },
  { path: "/services", priority: 0.9 },
  { path: "/services/on-demand-hr", priority: 0.8 },
  { path: "/services/hr-retainership", priority: 0.8 },
  { path: "/services/strategic-consulting", priority: 0.8 },
  { path: "/pagar", priority: 0.8 },
  { path: "/pricing", priority: 0.7 },
  { path: "/case-studies", priority: 0.7 },
  { path: "/life", priority: 0.6 },
  { path: "/careers", priority: 0.6 },
  { path: "/media", priority: 0.6 },
  { path: "/faqs", priority: 0.6 },
  { path: "/contact", priority: 0.8 },
];

export default function sitemap() {
  const lastModified = new Date();

  return [
    ...STATIC_PATHS.map(({ path, priority }) => ({
      url: path === "/" ? SITE_URL : `${SITE_URL}${path}`,
      lastModified,
      changeFrequency: "monthly",
      priority,
    })),
    ...mediaContent.posts.map((post) => ({
      url: `${SITE_URL}/media/${post.id}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    })),
  ];
}
