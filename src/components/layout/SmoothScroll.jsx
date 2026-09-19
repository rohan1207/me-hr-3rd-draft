"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Shared Lenis instance so route changes can scroll to top reliably. */
let lenisInstance = null;

export function scrollToTop(immediate = false) {
 if (lenisInstance) {
 lenisInstance.scrollTo(0, immediate ? { immediate: true } : { duration: 1.05 });
 return;
 }

 window.scrollTo({
 top: 0,
 left: 0,
 behavior: immediate ? "auto" : "smooth",
 });
}

export default function SmoothScroll({ children }) {
 useEffect(() => {
 const lenis = new Lenis({
 duration: 1.15,
 easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
 smoothWheel: true,
 prevent: (node) =>
 Boolean(
 node?.closest?.(
 "[data-lenis-prevent],[data-lenis-prevent-wheel],[data-lenis-prevent-touch]"
 )
 ),
 });

 lenisInstance = lenis;
 lenis.on("scroll", ScrollTrigger.update);

 const raf = (time) => {
 lenis.raf(time);
 requestAnimationFrame(raf);
 };
 requestAnimationFrame(raf);

 document.documentElement.classList.add("lenis", "lenis-smooth");

 return () => {
 document.documentElement.classList.remove("lenis", "lenis-smooth");
 lenisInstance = null;
 lenis.destroy();
 };
 }, []);

 return children;
}
