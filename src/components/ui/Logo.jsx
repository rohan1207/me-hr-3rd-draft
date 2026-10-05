"use client";

import { Link } from "react-router-dom";
import { images } from "../../data/images";

const sizeMap = {
 sm: { full: "h-11 max-w-[14rem] sm:h-12 sm:max-w-[16rem]", mark: "h-11 max-w-[3rem] sm:h-12 sm:max-w-[3.25rem]" },
 md: { full: "h-12 max-w-[16rem] sm:h-14 sm:max-w-[18rem]", mark: "h-12 max-w-[3.25rem] sm:h-14 sm:max-w-[3.5rem]" },
 // Slightly larger than the header band; Navbar allows overflow-visible
 nav: {
  full: "h-[calc(var(--header-height)-0.15rem)] w-auto max-w-[17rem] origin-left scale-[1.28] sm:max-w-[20rem] sm:scale-[1.32] lg:max-w-[23rem] lg:scale-[1.35]",
  mark: "h-[calc(var(--header-height)-0.15rem)] w-auto max-w-[3.75rem] origin-left scale-[1.28] sm:max-w-[4.25rem] sm:scale-[1.32]",
 },
 lg: { full: "h-16 max-w-[20rem] sm:h-[4.5rem] sm:max-w-[24rem]", mark: "h-16 max-w-[4rem] sm:h-[4.5rem] sm:max-w-[4.5rem]" },
 xl: { full: "h-[4.5rem] max-w-[22rem] sm:h-20 sm:max-w-[26rem]", mark: "h-[4.5rem] max-w-[4.5rem] sm:h-20 sm:max-w-[5rem]" },
};

export default function Logo({
 to = "/",
 size = "md",
 light = false,
 withMark = true,
 markOnly = false,
 asLink = true,
 className = "",
}) {
 const s = sizeMap[size] || sizeMap.md;
 const showImage = withMark || markOnly;

 const content = showImage ? (
 <img
 src={images.logo}
 alt="me-HR"
 className={`shrink-0 object-contain object-left ${markOnly ? s.mark : s.full} ${
 light ? "drop-shadow-sm" : ""
 }`}
 />
 ) : (
 <span
 className={`font-sans font-semibold tracking-[-0.04em] ${
 light ? "text-white" : "text-mehr-ink"
 }`}
 >
 me-HR
 </span>
 );

 const classes = `group inline-flex items-center transition ${className}`;

 if (!asLink) {
 return (
 <span className={classes} aria-label="me-HR">
 {content}
 </span>
 );
 }

 return (
 <Link to={to} className={classes} aria-label="Me-HR home">
 {content}
 </Link>
 );
}
