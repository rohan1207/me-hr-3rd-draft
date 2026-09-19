"use client";

import { homeContent } from "../../data/content";

function LogoTrack({ logos, ariaHidden = false }) {
 return (
 <div
 className="trusted-track flex w-max items-center gap-12 sm:gap-16 lg:gap-20"
 aria-hidden={ariaHidden || undefined}
 >
 {logos.map((logo, i) => (
 <div
 key={`${logo.name}-${i}`}
 className="trusted-logo flex h-16 w-[11rem] shrink-0 items-center justify-center sm:h-20 sm:w-[13.5rem] lg:h-24 lg:w-[15.5rem]"
 >
 <img
 src={logo.src}
 alt={ariaHidden ? "" : logo.name}
 className="max-h-full max-w-full object-contain transition duration-500 ease-out hover:scale-[1.04]"
 loading="lazy"
 decoding="async"
 draggable={false}
 />
 </div>
 ))}
 </div>
 );
}

export default function TrustedBy() {
 const { trustedBy } = homeContent;
 const logos = trustedBy.logos;

 return (
 <section className="surface-white relative overflow-hidden py-8 sm:py-10">
 <div className="page-gutter mx-auto mb-5 flex max-w-[1680px] items-center justify-center sm:mb-6 sm:px-3 md:px-4 lg:px-5">
 <p className="eyebrow !normal-case !tracking-[0.12em]">{trustedBy.eyebrow}</p>
 </div>

 <div className="trusted-ribbon relative">
 <div className="trusted-marquee flex w-max gap-12 sm:gap-16 lg:gap-20">
 <LogoTrack logos={logos} />
 <LogoTrack logos={logos} ariaHidden />
 </div>
 </div>
 </section>
 );
}
