import { SITE } from "@/lib/seo";

/** @returns {import('next').MetadataRoute.Manifest} */
export default function manifest() {
  return {
    name: SITE.name,
    short_name: SITE.name,
    description: SITE.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#14c4ad",
    lang: SITE.language,
    icons: [
      {
        src: "/logo1.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
