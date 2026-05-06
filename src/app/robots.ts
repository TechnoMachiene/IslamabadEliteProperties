import { MetadataRoute } from "next";
import { SITEMAP_URL, SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api"],
      },
    ],
    sitemap: SITEMAP_URL,
    host: SITE_URL,
  };
}
