"use client";

import { seo, homeContent } from "../data/content";
import PageSEO from "../components/ui/PageSEO";
import Hero from "../components/ui/Hero";
import HowWeHelpExpand from "../components/sections/HowWeHelpExpand";
import TrustedBy from "../components/sections/TrustedBy";
import HomeValueBand from "../components/sections/HomeValueBand";
import CapabilitiesGrid from "../components/sections/CapabilitiesGrid";
import HowItWorks from "../components/sections/HowItWorks";
import HomeFaq from "../components/sections/HomeFaq";
import CTABanner from "../components/ui/CTABanner";

export default function Home() {
  return (
    <>
      <PageSEO {...seo.home} path="/" />
      <Hero />
      <HowWeHelpExpand />
      <TrustedBy />
      <HomeValueBand />
      <HowItWorks />
      <CapabilitiesGrid
        eyebrow={homeContent.capabilities.eyebrow}
        title={homeContent.capabilities.title}
        includeAudit={false}
      />
      <HomeFaq />
      <CTABanner />
    </>
  );
}
