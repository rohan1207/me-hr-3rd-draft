import Pagar from "@/legacy-pages/Pagar";
import { pageMetadata, PAGE_SEO } from "@/lib/seo";

export const metadata = pageMetadata(PAGE_SEO.pagar);

export default function Page() {
  return <Pagar />;
}
