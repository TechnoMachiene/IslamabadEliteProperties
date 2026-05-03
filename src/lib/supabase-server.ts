import { createClient } from "@supabase/supabase-js";
import { properties as staticProperties, type Property } from "@/data/properties";
import { generatePropertySlug } from "@/data/properties";

function transformRow(row: Record<string, unknown>): Property {
  const images: string[] =
    Array.isArray(row.images)
      ? row.images
      : row.imageUrl
      ? [row.imageUrl as string]
      : ["/images/property-1.webp"];

  const price = Number(row.price) || 0;
  const crore = price / 10_000_000;
  const priceFormatted =
    (row.price_formatted as string) ||
    (row.priceFormatted as string) ||
    (crore >= 1 ? `${crore % 1 === 0 ? crore : crore.toFixed(1)} Crore` : `${(price / 100_000).toFixed(0)} Lakh`);

  return {
    id: String(row.id ?? ""),
    city: (row.city as string) || "",
    title: (row.title as string) || "",
    description: (row.description as string) || "",
    price,
    priceFormatted,
    sector: (row.sector as string) || "",
    subSector: (row.subSector as string) || (row.sub_sector as string) || "",
    area: String(row.area ?? "0"),
    areaUnit: ((row.area_unit as string) || (row.areaUnit as string) || "Marla") as "Marla" | "Kanal",
    bedrooms: Number(row.bedrooms) || 0,
    bathrooms: Number(row.bathrooms) || 0,
    parking: Number(row.parking) || 0,
    features: Array.isArray(row.features) ? row.features : [],
    images,
    videoUrl: (row.video_url as string) || (row.videoUrl as string) || "",
    isFeatured: Boolean(row.is_featured ?? row.isFeatured),
    type: ((row.type as string) || "House") as Property["type"],
    yearBuilt: Number(row.year_built ?? row.yearBuilt) || new Date().getFullYear(),
    mapCoords: {
      lat: Number(row.map_lat ?? (row.mapCoords as Record<string, unknown>)?.lat ?? 33.7194),
      lng: Number(row.map_lng ?? (row.mapCoords as Record<string, unknown>)?.lng ?? 73.0551),
    },
    agentPhone: (row.agent_phone as string) || (row.agentPhone as string) || "",
  };
}

function getClient() {
  const url =
    process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "";
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function getProperties(): Promise<Property[]> {
  const supabase = getClient();
  if (!supabase) return staticProperties;
  try {
    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .order("id", { ascending: false });
    if (error || !Array.isArray(data)) return staticProperties;
    return data.map(transformRow);
  } catch {
    return staticProperties;
  }
}

export async function getPropertiesByCity(city: string): Promise<Property[]> {
  const all = await getProperties();
  return all.filter((p) => p.city === city);
}

export async function getPropertiesBySector(
  city: string,
  sector: string
): Promise<Property[]> {
  const all = await getProperties();
  return all.filter((p) => p.city === city && p.sector === sector);
}

export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  const all = await getProperties();
  return all.find((p) => generatePropertySlug(p) === slug) ?? null;
}
