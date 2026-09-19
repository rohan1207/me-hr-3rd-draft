"use client";

import Logo from "../ui/Logo";

/** Full-screen gate on phone widths, desktop site stays available from md up. */
export default function MobileBlock() {
 return (
 <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-mehr-fog px-6 md:hidden">
 <div className="w-full max-w-sm text-center">
 <div className="mb-8 flex justify-center">
 <Logo size="lg" />
 </div>
 <p className="eyebrow mb-3">me-HR</p>
 <h1 className="font-sans text-2xl font-semibold leading-snug tracking-tight text-mehr-ink">
 Please view this website on desktop
 </h1>
 <p className="mt-4 text-[15px] leading-relaxed text-mehr-mist">
          We are working on the phone experience. It will be available soon.
 </p>
 </div>
 </div>
 );
}
