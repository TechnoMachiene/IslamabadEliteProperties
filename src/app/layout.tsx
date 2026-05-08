import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/site";

export { OG_IMAGE, SITE_NAME, SITE_URL };

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Luxury Properties for Sale in Islamabad | F-6, F-7 & F-8",
    template: "%s | Islamabad Elite Properties",
  },
  description:
    "Browse 500+ luxury properties for sale in Islamabad. Premium villas, houses & apartments in F-6, F-7 & F-8. Expert agents, virtual tours & best deals guaranteed.",
  keywords: [
    "properties for sale Islamabad",
    "luxury real estate Islamabad",
    "F-7 houses for sale",
    "luxury villas Islamabad",
    "F-6 properties Islamabad",
    "F-8 apartments Islamabad",
    "buy property Islamabad",
    "Islamabad real estate agency",
    "Bahria Town Rawalpindi",
    "DHA Rawalpindi",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@islamabadelite",
    images: [OG_IMAGE],
  },
  alternates: { canonical: SITE_URL },
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    title: SITE_NAME,
    statusBarStyle: "default",
  },
  other: {
    "geo.region": "PK-IS",
    "geo.placename": "Islamabad",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#C9A84C" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0A" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-PK">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
        <link rel="apple-touch-icon" type="image/png" sizes="180x180" href="/apple-touch-icon.png" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
