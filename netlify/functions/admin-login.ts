/**
 * POST /api/admin-login
 * Validates the admin password and returns an HMAC-signed session token.
 * The actual ADMIN_SECRET_KEY never leaves the server.
 */
import type { Handler } from "@netlify/functions";
import { cors, ok, fail, createToken } from "./_shared";

export const handler: Handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers: cors, body: "" };
  if (event.httpMethod !== "POST") return fail("Method not allowed", 405);

  let body: { password?: string };
  try { body = JSON.parse(event.body ?? "{}"); } catch { return fail("Invalid JSON"); }

  const { password } = body;
  if (!password) return fail("Password is required");

  const secret = process.env.ADMIN_SECRET_KEY;
  if (!secret) return fail("Server configuration error", 500);

  if (password !== secret) return fail("Incorrect password", 401);

  return ok({ token: createToken() });
};
