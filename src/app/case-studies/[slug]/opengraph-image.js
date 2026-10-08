import { ImageResponse } from "next/og";
import { caseStudies } from "@/data/content";
import { SITE } from "@/lib/seo";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "me-HR Case Study";

export default async function Image({ params }) {
  const { slug } = await params;
  const study = caseStudies.find((c) => c.id === slug);
  const title = study?.title || "HR Case Study";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(145deg, #111827 0%, #0b5f58 60%, #14c4ad 100%)",
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
          {SITE.name} · Case study
        </div>
        <div
          style={{
            display: "flex",
            fontSize: title.length > 70 ? 40 : 50,
            fontWeight: 700,
            lineHeight: 1.2,
            color: "#ffffff",
            maxWidth: 980,
          }}
        >
          {title}
        </div>
        <div style={{ display: "flex", fontSize: 22, color: "rgba(255,255,255,0.75)" }}>
          Proof in practice
        </div>
      </div>
    ),
    { ...size }
  );
}
