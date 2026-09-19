import FAQs from "@/legacy-pages/FAQs";
import { buildMetadata } from "@/lib/seo";
import { seo } from "@/data/content";

export const metadata = buildMetadata({ ...seo.faqs, path: "/faqs" });

export default function Page() {
  return <FAQs />;
}
