/**
 * GET  /api/properties          — list all (supports ?city, ?sector, ?sub_sector, ?featured=true)
 * POST /api/properties          — create a new property (admin token required)
 */
import { createClient } from "@supabase/supabase-js";
import type { Handler } from "@netlify/functions";
import { cors, ok, fail, verifyToken, extractToken, rowToProperty, propertyToRow } from "./_shared";

function supabase() {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

export const handler: Handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers: cors, body: "" };

  const db = supabase();

  // ── GET: list properties with optional filters ───────────────────────────
  if (event.httpMethod === "GET") {
    const p = event.queryStringParameters ?? {};
    let q = db.from("properties").select("*");
    if (p.city)               q = q.eq("city", p.city);
    if (p.sector)             q = q.eq("sector", p.sector);
    if (p.sub_sector)         q = q.eq("sub_sector", p.sub_sector);
    if (p.featured === "true") q = q.eq("is_featured", true);
    q = q.order("created_at", { ascending: false });

    const { data, error } = await q;
    if (error) return fail(error.message, 500);
    return ok((data ?? []).map(rowToProperty));
  }

  // ── POST: create property (admin only) ──────────────────────────────────
  if (event.httpMethod === "POST") {
    if (!verifyToken(extractToken(event))) return fail("Unauthorized", 401);

    let body: Record<string, unknown>;
    try { body = JSON.parse(event.body ?? "{}"); } catch { return fail("Invalid JSON"); }

    const row = propertyToRow(body as Parameters<typeof propertyToRow>[0]);
    const { data, error } = await db.from("properties").insert(row).select().single();
    if (error) return fail(error.message);
    return ok(rowToProperty(data as Record<string, unknown>), 201);
  }

  return fail("Method not allowed", 405);
};
