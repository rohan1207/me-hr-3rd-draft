"use client";

import { aboutContent, seo } from "../data/content";
import PageSEO from "../components/ui/PageSEO";
import CTABanner from "../components/ui/CTABanner";
import TrustedBy from "../components/sections/TrustedBy";
import AboutHero from "../components/sections/about/AboutHero";
import AboutStory from "../components/sections/about/AboutStory";
import AboutApproach from "../components/sections/about/AboutApproach";
import AboutVisionMission from "../components/sections/about/AboutVisionMission";
import AboutFounder from "../components/sections/about/AboutFounder";
import AboutTeam from "../components/sections/about/AboutTeam";
import AboutJourney from "../components/sections/about/AboutJourney";
import AboutWhy from "../components/sections/about/AboutWhy";
import AboutModels from "../components/sections/about/AboutModels";
import AboutTestimonials from "../components/sections/about/AboutTestimonials";

export default function About() {
 return (
 <>
 <PageSEO {...seo.about} path="/about" />
 <AboutHero />
 <TrustedBy />
 <AboutJourney />
 <AboutStory />
 <AboutApproach />
 <AboutVisionMission />
 <AboutFounder />
 <AboutTeam />
 <AboutWhy />
 <AboutModels />
 <AboutTestimonials />
 <CTABanner
 eyebrow="Ready to partner"
 title="Let's build HR that grows with your business."
 body={aboutContent.mission.body}
 />
 </>
 );
}
