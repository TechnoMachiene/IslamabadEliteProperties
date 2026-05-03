// NOTE: This component is legacy SPA/Vite code and is not used in Next.js App Router.
// The app/ directory uses Next.js metadata API instead.
// import { Helmet } from "react-helmet-async";

export const SITE_URL = "https://islamabadelite.pk";
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
 * Centralised SEO head manager.
 * Renders exactly one of each meta tag per page.
 * Pass JSON-LD <script> blocks as children.
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
  const resolvedAlt = ogImageAlt || title;

  return (
    <Helmet>
      {/* ── Primary ── */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={robots} />
      <meta name="publisher" content={SITE_NAME} />
      <link rel="canonical" href={canonical} />

      {/* ── Open Graph ── */}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={resolvedAlt} />
      <meta property="og:locale" content="en_PK" />
      <meta property="article:publisher" content={FB_PAGE} />

      {/* ── Twitter Card ── */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={resolvedAlt} />

      {/* ── Page-specific JSON-LD ── */}
      {children}
    </Helmet>
  );
};

export default SEO;
