import Contact from "@/legacy-pages/Contact";
import { buildMetadata } from "@/lib/seo";
import { seo } from "@/data/content";

export const metadata = buildMetadata({ ...seo.contact, path: "/contact" });

export default function Page() {
  return <Contact />;
}
