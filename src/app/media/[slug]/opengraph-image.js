import { ImageResponse } from "next/og";
import { mediaContent } from "@/data/content";
import { SITE } from "@/lib/seo";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "me-HR Insights";

export default async function Image({ params }) {
  const { slug } = await params;
  const post = mediaContent.posts.find((p) => p.id === slug);
  const title = post?.title || "HR Insights";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(145deg, #0b5f58 0%, #0d7a6f 50%, #14c4ad 100%)",
          padding: "56px 64px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.8)",
          }}
        >
          {SITE.name} · Insights
        </div>
        <div
          style={{
            display: "flex",
            fontSize: title.length > 70 ? 42 : 52,
            fontWeight: 700,
            lineHeight: 1.2,
            color: "#ffffff",
            maxWidth: 980,
          }}
        >
          {title}
        </div>
        <div style={{ display: "flex", fontSize: 22, color: "rgba(255,255,255,0.75)" }}>
          {post?.category || "Thought leadership"}
        </div>
      </div>
    ),
    { ...size }
  );
}
