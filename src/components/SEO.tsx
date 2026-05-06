// NOTE: This component is legacy SPA/Vite code and is DEPRECATED.
// The app/ directory uses Next.js metadata API (via generateMetadata) instead.
// This component is kept for backward compatibility but no longer renders anything.
// All SEO handling is now done in src/app/ directory with generateMetadata functions.

export const SITE_URL = "https://www.islamabadeliteproperties.com";
export const SITE_NAME = "Islamabad Elite Properties";
export const OG_IMAGE_DEFAULT = `${SITE_URL}/og-image.jpg`;
export const TWITTER_HANDLE = "@islamabadelite";
export const FB_PAGE = "https://www.facebook.com/islamabadeliteproperties";

interface SEOProps {
  /** Page title — keep ≤ 60 chars */
  title: string;
  /** Meta description — target 150–160 chars */
  description: string;
  /** Canonical URL — full absolute URL */
  canonical?: string;
  /** Absolute URL to OG image (1200×630 JPEG) */
  ogImage?: string;
  /** Alt text for OG image */
  ogImageAlt?: string;
  /** OG type — "website" for index/listing pages, "article" for individual listings */
  ogType?: "website" | "article";
  /** Robots directive */
  robots?: string;
  /** Optional keywords meta */
  keywords?: string;
  /** Page-specific JSON-LD <script> elements */
  children?: React.ReactNode;
}

/**
 * DEPRECATED: Legacy SEO component - no longer functional.
 * Use Next.js metadata API (generateMetadata) in the app/ directory instead.
 * This component is kept as a stub to prevent import errors in legacy code.
 */
const SEO = ({
  title,
  description,
  canonical = SITE_URL,
  ogImage = OG_IMAGE_DEFAULT,
  ogImageAlt,
  ogType = "website",
  robots = "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  keywords,
  children,
}: SEOProps) => {
  // This component is deprecated and returns null.
  // All SEO is handled via Next.js generateMetadata in src/app/ routes.
  return null;
};

export default SEO;
