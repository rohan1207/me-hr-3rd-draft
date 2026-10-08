import InsightArticle from "@/legacy-pages/InsightArticle";
import { buildMetadata, pageMetadata, PAGE_SEO, SITE } from "@/lib/seo";
import { mediaContent } from "@/data/content";

export function generateStaticParams() {
  return mediaContent.posts.map((post) => ({ slug: post.id }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = mediaContent.posts.find((p) => p.id === slug);

  if (!post) {
    return pageMetadata({ ...PAGE_SEO.media, absolute: true });
  }

  const path = `/media/${post.id}`;
  const description =
    post.excerpt.length > 157 ? `${post.excerpt.slice(0, 157)}…` : post.excerpt;

  return buildMetadata({
    title: post.title,
    description,
    path,
    absolute: false, // template appends " | me-HR"
    ogType: "article",
    openGraph: {
      type: "article",
      // TODO(client): add datePublished / dateModified on insight posts for article OG
      authors: [SITE.founder.name],
      section: post.category,
    },
  });
}

export default function Page() {
  return <InsightArticle />;
}
