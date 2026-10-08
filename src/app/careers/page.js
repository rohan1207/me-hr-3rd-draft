import Careers from "@/legacy-pages/Careers";
import { pageMetadata, PAGE_SEO } from "@/lib/seo";

export const metadata = pageMetadata(PAGE_SEO.careers);

export default function Page() {
  return <Careers />;
}
