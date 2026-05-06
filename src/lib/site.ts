export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.islamabadeliteproperties.com"
).replace(/\/+$/, "");

export const SITE_NAME = "Islamabad Elite Properties";
export const OG_IMAGE = `${SITE_URL}/og-image.jpg`;
export const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;
