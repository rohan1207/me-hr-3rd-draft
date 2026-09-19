"use client";

import { Link } from "@/components/compat/router";
import { images } from "../../data/images";

const sizeMap = {
 sm: { full: "h-11 max-w-[14rem] sm:h-12 sm:max-w-[16rem]", mark: "h-11 max-w-[3rem] sm:h-12 sm:max-w-[3.25rem]" },
 md: { full: "h-12 max-w-[16rem] sm:h-14 sm:max-w-[18rem]", mark: "h-12 max-w-[3.25rem] sm:h-14 sm:max-w-[3.5rem]" },
 // Fills the existing header band without growing --header-height
 nav: {
  full: "h-[calc(var(--header-height)-0.25rem)] w-auto max-w-[15rem] origin-left scale-[1.12] sm:max-w-[17.5rem] lg:max-w-[20rem]",
  mark: "h-[calc(var(--header-height)-0.25rem)] w-auto max-w-[3.5rem] origin-left scale-[1.12] sm:max-w-[4rem]",
 },
 lg: { full: "h-14 max-w-[18rem] sm:h-16 sm:max-w-[22rem]", mark: "h-14 max-w-[3.5rem] sm:h-16 sm:max-w-[4rem]" },
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
