"use client";

import Navbar from "./Navbar";
import Footer from "./Footer";
import SmoothScroll from "./SmoothScroll";
import ScrollToTop from "./ScrollToTop";
import MobileGate from "./MobileGate";
import ContactFab from "../ui/ContactFab";

export default function Layout({ children }) {
  return (
    <SmoothScroll>
      <MobileGate />
      <ScrollToTop />
      <div className="relative hidden min-h-screen bg-mehr-fog pb-[max(0.5rem,env(safe-area-inset-bottom))] lg:block">
        <Navbar />
        <main className="pt-[var(--header-height)]">{children}</main>
        <Footer />
        <ContactFab />
      </div>
    </SmoothScroll>
  );
}
