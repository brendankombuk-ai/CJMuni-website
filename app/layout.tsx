import type { Metadata, Viewport } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import { CONTACT, SITE_URL } from "@/data/site";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "CJ MUNI — Connected Capability. Reliable Delivery.",
    template: "%s | CJ MUNI",
  },
  description:
    "CJ MUNI is a Papua New Guinea-focused industrial partner connecting specialist products, technical capability, project execution, marine support and end-to-end supply-chain delivery for demanding projects.",
  keywords: [
    "CJ MUNI",
    "Papua New Guinea",
    "industrial partner",
    "explosives distribution",
    "drill and blast",
    "reagents",
    "supply chain",
    "tug and barge",
    "mining services PNG",
  ],
  authors: [{ name: "CJ MUNI" }],
  openGraph: {
    type: "website",
    locale: "en_PG",
    url: SITE_URL,
    siteName: "CJ MUNI",
    title: "CJ MUNI — Connected Capability. Reliable Delivery.",
    description:
      "One partner connecting products, technical capability, field execution, marine support and supply-chain delivery for demanding projects in Papua New Guinea.",
  },
  twitter: {
    card: "summary_large_image",
    title: "CJ MUNI — Connected Capability. Reliable Delivery.",
    description:
      "A PNG-focused industrial partner. The Power of Partnership.",
  },
  robots: { index: true, follow: true },
};

/**
 * The page is black, so the browser's own chrome should be too — otherwise a
 * phone frames a black site in a white address bar and the overscroll at the
 * top and bottom of a page flashes white.
 */
export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "CJ MUNI",
  slogan: "Connected Capability. Reliable Delivery.",
  description:
    "A Papua New Guinea-focused industrial partner delivering critical products, field services, engineering, marine logistics and end-to-end supply-chain support.",
  email: CONTACT.email,
  telephone: CONTACT.phones,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Portion 2465, Konekaru, Papa Lealea Road",
    addressRegion: "Central Province",
    addressCountry: "PG",
  },
  areaServed: "Papua New Guinea",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable}`}>
      <body className="bg-ink font-sans text-white antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-gold focus:px-4 focus:py-2 focus:font-sans focus:text-sm focus:font-bold focus:text-ink"
        >
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </body>
    </html>
  );
}
