"use client";

import Reveal from "./Reveal";

export default function SectionHeading({
 eyebrow,
 title,
 body,
 align = "left",
 light = false,
 className = "",
}) {
 const alignCls =
 align === "center" ? "mx-auto text-center items-center" : "items-start text-left";

 return (
 <Reveal className={`flex max-w-3xl flex-col gap-4 ${alignCls} ${className}`}>
 {eyebrow && (
 <span className={`eyebrow ${light ? "!text-mehr-deep/80" : ""}`}>{eyebrow}</span>
 )}
 <h2 className={`title-section ${light ? "text-mehr-ink" : ""}`}>{title}</h2>
 {body && (
 <p
 className={`body-text ${light ? "!text-mehr-mist" : ""} ${
 align === "center" ? "mx-auto" : ""
 }`}
 >
 {body}
 </p>
 )}
 </Reveal>
 );
}
