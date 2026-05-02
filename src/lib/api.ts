/**
 * Frontend API client using Supabase directly (serverless)
 * All operations connect directly to Supabase PostgreSQL database
 */
import { createClient } from "@supabase/supabase-js";
import type { Property } from "@/data/properties";

// Initialize Supabase client with public anon key (safe for frontend)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "⚠️ Missing Supabase credentials. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local"
  );
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ── Helpers ─────────────────────────────────────────────────────────────────
function adminToken(): string {
  return sessionStorage.getItem("iep_admin_token") ?? "";
}

// Transform Supabase snake_case to camelCase Property type
function transformProperty(row: any): Property {
  return {
    id: row.id || "",
    city: row.city || "",
    title: row.title || "",
    description: row.description || "",
    price: row.price || 0,
    priceFormatted: row.price_formatted || "",
    sector: row.sector || "",
    subSector: row.sub_sector || "",
    area: row.area || "0",
    areaUnit: row.area_unit || "Marla",
    bedrooms: row.bedrooms || 0,
    bathrooms: row.bathrooms || 0,
    parking: row.parking || 0,
    features: row.features || [],
    images: row.images || [],
    videoUrl: row.video_url || "",
    isFeatured: row.is_featured || false,
    type: row.type || "House",
    yearBuilt: row.year_built || new Date().getFullYear(),
    mapCoords: {
      lat: row.map_lat || 33.7194,
      lng: row.map_lng || 73.0551,
    },
    agentPhone: row.agent_phone || "",
  };
}

// ── Public: properties ───────────────────────────────────────────────────────
export const api = {
  properties: {
    // Get all properties
    async list(): Promise<Property[]> {
      try {
        const { data, error } = await supabase
          .from("properties")
          .select("*")
          .order("id", { ascending: false });

        if (error) throw error;
        return (data || []).map(transformProperty);
      } catch (error: any) {
        console.error("Failed to fetch properties:", error.message);
        return [];
      }
    },

    // Get single property
    async get(id: string): Promise<Property | null> {
      try {
        const { data, error } = await supabase
          .from("properties")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        return data ? transformProperty(data) : null;
      } catch (error: any) {
        console.error(`Failed to fetch property ${id}:`, error.message);
        return null;
      }
    },

    // ── Admin: write operations ──────────────────────────────────────────
    // Create property
    async create(data: Omit<Property, "id">): Promise<Property> {
      if (!adminToken()) {
        throw new Error("Not authenticated. Please login to admin panel.");
      }

      try {
        const { data: newProperty, error } = await supabase
          .from("properties")
          .insert({
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            city: data.city,
            title: data.title,
            description: data.description || "",
            price: data.price,
            price_formatted: data.priceFormatted || "",
            sector: data.sector || "",
            sub_sector: data.subSector || "",
            area: data.area || "0",
            area_unit: data.areaUnit || "Marla",
            bedrooms: data.bedrooms || 0,
            bathrooms: data.bathrooms || 0,
            parking: data.parking || 0,
            features: data.features || [],
            images: data.images || [],
            video_url: data.videoUrl || "",
            is_featured: data.isFeatured || false,
            type: data.type || "House",
            year_built: data.yearBuilt || new Date().getFullYear(),
            map_lat: data.mapCoords?.lat || 33.7194,
            map_lng: data.mapCoords?.lng || 73.0551,
            agent_phone: data.agentPhone || "",
          })
          .select()
          .single();

        if (error) throw error;
        console.log("✅ Property created:", newProperty?.id);
        return transformProperty(newProperty);
      } catch (error: any) {
        console.error("Failed to create property:", error.message);
        throw error;
      }
    },

    // Update property
    async update(
      id: string,
      data: Partial<Omit<Property, "id">>
    ): Promise<Property> {
      if (!adminToken()) {
        throw new Error("Not authenticated. Please login to admin panel.");
      }

      try {
        const updates: Record<string, any> = {};
        
        if (data.city !== undefined) updates.city = data.city;
        if (data.title !== undefined) updates.title = data.title;
        if (data.description !== undefined) updates.description = data.description;
        if (data.price !== undefined) updates.price = data.price;
        if (data.priceFormatted !== undefined) updates.price_formatted = data.priceFormatted;
        if (data.sector !== undefined) updates.sector = data.sector;
        if (data.subSector !== undefined) updates.sub_sector = data.subSector;
        if (data.area !== undefined) updates.area = data.area;
        if (data.areaUnit !== undefined) updates.area_unit = data.areaUnit;
        if (data.bedrooms !== undefined) updates.bedrooms = data.bedrooms;
        if (data.bathrooms !== undefined) updates.bathrooms = data.bathrooms;
        if (data.parking !== undefined) updates.parking = data.parking;
        if (data.features !== undefined) updates.features = data.features;
        if (data.images !== undefined) updates.images = data.images;
        if (data.videoUrl !== undefined) updates.video_url = data.videoUrl;
        if (data.isFeatured !== undefined) updates.is_featured = data.isFeatured;
        if (data.type !== undefined) updates.type = data.type;
        if (data.yearBuilt !== undefined) updates.year_built = data.yearBuilt;
        if (data.mapCoords !== undefined) {
          updates.map_lat = data.mapCoords.lat;
          updates.map_lng = data.mapCoords.lng;
        }
        if (data.agentPhone !== undefined) updates.agent_phone = data.agentPhone;

        const { data: updatedProperty, error } = await supabase
          .from("properties")
          .update(updates)
          .eq("id", id)
          .select()
          .single();

        if (error) throw error;
        console.log("✅ Property updated:", id);
        return transformProperty(updatedProperty);
      } catch (error: any) {
        console.error("Failed to update property:", error.message);
        throw error;
      }
    },

    // Delete property
    async delete(id: string): Promise<void> {
      if (!adminToken()) {
        throw new Error("Not authenticated. Please login to admin panel.");
      }

      try {
        const { error } = await supabase.from("properties").delete().eq("id", id);

        if (error) throw error;
        console.log("✅ Property deleted:", id);
      } catch (error: any) {
        console.error("Failed to delete property:", error.message);
        throw error;
      }
    },
  },

  admin: {
    // Local password authentication (works with npm run dev)
    async login(password: string): Promise<{ token: string }> {
      try {
        const expectedPassword = import.meta.env.VITE_ADMIN_PASSWORD || "3i2e1p123?";

        if (password !== expectedPassword) {
          throw new Error("Incorrect password");
        }

        // Create a session token
        const token = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        sessionStorage.setItem("iep_admin_token", token);

        console.log("✅ Admin authenticated");
        return { token };
      } catch (error: any) {
        console.error("Login failed:", error.message);
        throw error;
      }
    },

    // Check if user is authenticated
    isAuthenticated(): boolean {
      return !!sessionStorage.getItem("iep_admin_token");
    },

    // Logout
    logout(): void {
      sessionStorage.removeItem("iep_admin_token");
      console.log("✅ Admin logged out");
    },
  },
};
