import { ImageResponse } from "next/og";
import { SITE } from "@/lib/seo";

export const runtime = "edge";
export const alt = "me-HR: HR outsourcing in Pune";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0b5f58 0%, #14c4ad 55%, #e8f7f4 100%)",
          padding: "56px 64px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.85)",
          }}
        >
          {SITE.name}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              display: "flex",
              fontSize: 56,
              fontWeight: 700,
              lineHeight: 1.15,
              color: "#ffffff",
              maxWidth: 900,
            }}
          >
            HR outsourcing &amp; Resident HR in Pune
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              color: "rgba(255,255,255,0.9)",
              maxWidth: 820,
            }}
          >
            On-Demand HR · Fractional HR · Consulting · Payroll
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 22,
            color: "rgba(255,255,255,0.8)",
          }}
        >
          {SITE.url.replace("https://", "")}
        </div>
      </div>
    ),
    { ...size }
  );
}
