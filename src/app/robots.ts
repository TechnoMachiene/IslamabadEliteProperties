import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api", "/_next"],
      },
    ],
    sitemap: "https://www.islamabadeliteproperties.com/sitemap.xml",
    host: "https://www.islamabadeliteproperties.com",
  };
}
