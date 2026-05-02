/**
 * GET    /api/property?id=:id   — fetch one property by ID
 * PUT    /api/property?id=:id   — update a property (admin token required)
 * DELETE /api/property?id=:id   — delete a property (admin token required)
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

  const id = event.queryStringParameters?.id;
  if (!id) return fail("Missing ?id parameter");

  const db = supabase();

  // ── GET: fetch single property ───────────────────────────────────────────
  if (event.httpMethod === "GET") {
    const { data, error } = await db.from("properties").select("*").eq("id", id).single();
    if (error) return fail(error.message, error.code === "PGRST116" ? 404 : 500);
    return ok(rowToProperty(data as Record<string, unknown>));
  }

  // ── PUT: update property (admin only) ───────────────────────────────────
  if (event.httpMethod === "PUT") {
    if (!verifyToken(extractToken(event))) return fail("Unauthorized", 401);

    let body: Record<string, unknown>;
    try { body = JSON.parse(event.body ?? "{}"); } catch { return fail("Invalid JSON"); }

    const row = propertyToRow(body as Parameters<typeof propertyToRow>[0]);
    const { data, error } = await db.from("properties").update(row).eq("id", id).select().single();
    if (error) return fail(error.message, error.code === "PGRST116" ? 404 : 500);
    return ok(rowToProperty(data as Record<string, unknown>));
  }

  // ── DELETE: remove property (admin only) ────────────────────────────────
  if (event.httpMethod === "DELETE") {
    if (!verifyToken(extractToken(event))) return fail("Unauthorized", 401);

    const { error } = await db.from("properties").delete().eq("id", id);
    if (error) return fail(error.message, 500);
    return ok({ deleted: true });
  }

  return fail("Method not allowed", 405);
};
