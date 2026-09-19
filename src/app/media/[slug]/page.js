import InsightArticle from "@/legacy-pages/InsightArticle";
import { buildMetadata } from "@/lib/seo";
import { mediaContent, seo } from "@/data/content";

export function generateStaticParams() {
  return mediaContent.posts.map((post) => ({ slug: post.id }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = mediaContent.posts.find((p) => p.id === slug);

  if (!post) return buildMetadata({ ...seo.media, path: "/media", noIndex: true });

  return buildMetadata({
    title: `${post.title} | me-HR Insights`,
    description: post.excerpt,
    keywords: seo.media.keywords,
    path: `/media/${post.id}`,
  });
}

export default function Page() {
  return <InsightArticle />;
}
