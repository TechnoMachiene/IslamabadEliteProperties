/**
 * Shared utilities for all Netlify Functions.
 * Supabase credentials live only here — never shipped to the browser.
 */
import crypto from "node:crypto";
import type { HandlerEvent, HandlerResponse } from "@netlify/functions";
import type { Property } from "../../src/data/properties";

// ── CORS headers ────────────────────────────────────────────────────────────
export const cors: Record<string, string> = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type,Authorization",
};

export const ok = (data: unknown, status = 200): HandlerResponse => ({
  statusCode: status,
  headers: cors,
  body: JSON.stringify(data),
});

export const fail = (message: string, status = 400): HandlerResponse => ({
  statusCode: status,
  headers: cors,
  body: JSON.stringify({ error: message }),
});

// ── Admin token (HMAC-SHA256, 8-hour expiry, stateless) ─────────────────────
export function createToken(): string {
  const expiry = Date.now() + 8 * 3_600_000;
  const key = process.env.ADMIN_SECRET_KEY ?? "";
  const sig = crypto.createHmac("sha256", key).update(String(expiry)).digest("hex");
  return `${expiry}.${sig}`;
}

export function verifyToken(token: string): boolean {
  if (!token) return false;
  const dot = token.indexOf(".");
  if (dot === -1) return false;
  const expiryStr = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expiry = Number(expiryStr);
  if (isNaN(expiry) || Date.now() > expiry) return false;
  const key = process.env.ADMIN_SECRET_KEY ?? "";
  const expected = crypto.createHmac("sha256", key).update(expiryStr).digest("hex");
  try {
    return crypto.timingSafeEqual(Buffer.from(sig, "hex"), Buffer.from(expected, "hex"));
  } catch {
    return false;
  }
}

export function extractToken(event: HandlerEvent): string {
  const auth = event.headers["authorization"] ?? event.headers["Authorization"] ?? "";
  return auth.replace(/^Bearer\s+/i, "").trim();
}

// ── DB row (snake_case) ↔ Property interface (camelCase) ────────────────────
export function rowToProperty(row: Record<string, unknown>): Property {
  return {
    id:             String(row.id),
    city:           String(row.city),
    title:          String(row.title),
    description:    String(row.description),
    price:          Number(row.price),
    priceFormatted: String(row.price_formatted ?? ""),
    sector:         String(row.sector),
    subSector:      String(row.sub_sector ?? ""),
    area:           String(row.area),
    areaUnit:       (row.area_unit as "Marla" | "Kanal") ?? "Marla",
    bedrooms:       Number(row.bedrooms ?? 0),
    bathrooms:      Number(row.bathrooms ?? 0),
    parking:        Number(row.parking ?? 0),
    features:       Array.isArray(row.features) ? (row.features as string[]) : [],
    images:         Array.isArray(row.images) ? (row.images as string[]) : [],
    videoUrl:       String(row.video_url ?? ""),
    isFeatured:     Boolean(row.is_featured),
    type:           (row.type as Property["type"]) ?? "House",
    yearBuilt:      Number(row.year_built ?? 2020),
    mapCoords:      { lat: Number(row.map_lat ?? 33.7194), lng: Number(row.map_lng ?? 73.0551) },
    agentPhone:     String(row.agent_phone ?? ""),
  };
}

export function propertyToRow(p: Partial<Property>): Record<string, unknown> {
  return {
    city:            p.city,
    title:           p.title,
    description:     p.description,
    price:           p.price,
    price_formatted: p.priceFormatted,
    sector:          p.sector,
    sub_sector:      p.subSector,
    area:            p.area,
    area_unit:       p.areaUnit,
    bedrooms:        p.bedrooms,
    bathrooms:       p.bathrooms,
    parking:         p.parking,
    features:        p.features,
    images:          p.images,
    video_url:       p.videoUrl,
    is_featured:     p.isFeatured,
    type:            p.type,
    year_built:      p.yearBuilt,
    map_lat:         p.mapCoords?.lat,
    map_lng:         p.mapCoords?.lng,
    agent_phone:     p.agentPhone,
  };
}
