import { MetadataRoute } from "next";
import { cities } from "@/data/cities";
import { getProperties } from "@/lib/supabase-server";
import { generatePropertySlug } from "@/data/properties";

const SITE_URL = "https://www.islamabadeliteproperties.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const properties = await getProperties();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/properties`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  const cityRoutes: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${SITE_URL}/${city.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const sectorRoutes: MetadataRoute.Sitemap = cities.flatMap((city) =>
    city.sectors.map((sector) => ({
      url: `${SITE_URL}/${city.slug}/${sector.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }))
  );

  const subSectorRoutes: MetadataRoute.Sitemap = cities.flatMap((city) =>
    city.sectors.flatMap((sector) =>
      sector.subSectors.map((sub) => ({
        url: `${SITE_URL}/${city.slug}/${sector.slug}/${sub.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.75,
      }))
    )
  );

  const propertyRoutes: MetadataRoute.Sitemap = properties.map((p) => ({
    url: `${SITE_URL}/property/${generatePropertySlug(p)}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...cityRoutes,
    ...sectorRoutes,
    ...subSectorRoutes,
    ...propertyRoutes,
  ];
}
