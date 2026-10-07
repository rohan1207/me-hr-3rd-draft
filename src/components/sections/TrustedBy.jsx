"use client";

import { homeContent } from "../../data/content";

/** Extra visual weight for logos that read small at default strip size */
const LOGO_SCALE = {
 "John Deere":
 "scale-[1.34] sm:scale-[1.38] hover:scale-[1.4] sm:hover:scale-[1.44]",
 "Goel Ganga Corporation":
 "scale-[1.44] sm:scale-[1.5] hover:scale-[1.5] sm:hover:scale-[1.56]",
 Suhana: "brightness-0 scale-[1.08] hover:scale-[1.12]",
};

export default function TrustedBy() {
 const { trustedBy } = homeContent;
 const logos = trustedBy.logos;
 // Duplicate for seamless -50% loop
 const sequence = [...logos, ...logos];

 return (
 <section className="surface-white relative overflow-hidden py-6 sm:py-8 md:py-10">
 <div className="page-gutter mx-auto mb-4 flex max-w-[1680px] items-center justify-center sm:mb-5 md:mb-6 sm:px-3 md:px-4 lg:px-5">
 <p className="eyebrow !normal-case !tracking-[0.12em] text-center">
 {trustedBy.eyebrow}
 </p>
 </div>

 <div className="trusted-ribbon relative">
 <div className="trusted-marquee flex w-max">
 <div className="trusted-track flex items-center">
 {sequence.map((logo, i) => (
 <div
 key={`${logo.name}-${i}`}
 className="trusted-logo flex h-12 w-[8.5rem] shrink-0 items-center justify-center px-4 sm:h-16 sm:w-[11rem] sm:px-6 md:h-20 md:w-[13rem] md:px-8 lg:h-24 lg:w-[14.5rem] lg:px-10"
 aria-hidden={i >= logos.length || undefined}
 >
 <img
 src={logo.src}
 alt={i >= logos.length ? "" : logo.name}
 className={`max-h-[82%] max-w-[96%] object-contain opacity-80 transition duration-500 ease-out sm:max-h-[78%] sm:max-w-[94%] sm:opacity-85 hover:opacity-100 ${
 LOGO_SCALE[logo.name] ||
 "scale-[1.08] hover:scale-[1.12]"
 }`}
 loading="eager"
 decoding="async"
 draggable={false}
 />
 </div>
 ))}
 </div>
 </div>
 </div>
 </section>
 );
}
