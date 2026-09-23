"use client";

import Navbar from "./Navbar";
import Footer from "./Footer";
import SmoothScroll from "./SmoothScroll";
import ScrollToTop from "./ScrollToTop";
import ContactFab from "../ui/ContactFab";

export default function Layout({ children }) {
  return (
    <SmoothScroll>
      <ScrollToTop />
      <div className="relative min-h-screen bg-mehr-fog pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        <Navbar />
        <main className="pt-[calc(var(--header-height)+env(safe-area-inset-top,0px))]">{children}</main>
        <Footer />
        <ContactFab />
      </div>
    </SmoothScroll>
  );
}
