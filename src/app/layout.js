import "./globals.css";
import Script from "next/script";
import Layout from "@/components/layout/Layout";
import { organizationJsonLd, SITE, PAGE_SEO } from "@/lib/seo";

const GA_ID = "G-VQYS9NB7V8";

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: PAGE_SEO.home.title,
    template: "%s | me-HR",
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  category: "Human Resources",
  formatDetection: { telephone: true, email: true, address: true },
  alternates: {
    canonical: "/",
    languages: { "en-IN": "/" },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: SITE.locale,
    url: "/",
    title: PAGE_SEO.home.title,
    description: SITE.description,
    images: [
      {
        url: SITE.ogImage,
        width: 1200,
        height: 630,
        alt: "me-HR: HR outsourcing in Pune",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_SEO.home.title,
    description: SITE.description,
    images: [SITE.ogImage],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/logo1.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.png", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#14c4ad",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300..900;1,300..700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd()).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
