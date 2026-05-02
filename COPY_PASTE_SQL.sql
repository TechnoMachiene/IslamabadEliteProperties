-- ─────────────────────────────────────────────────────────────────────────────
-- COPY THIS ENTIRE SQL AND PASTE INTO SUPABASE SQL EDITOR
-- ─────────────────────────────────────────────────────────────────────────────
-- Fixes the "Could not find the 'featured' column" error
-- Ensures all columns exist with correct names and types
-- ─────────────────────────────────────────────────────────────────────────────

-- Add all required columns (if they don't exist)
ALTER TABLE properties ADD COLUMN IF NOT EXISTS id TEXT PRIMARY KEY;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS city TEXT DEFAULT '';
ALTER TABLE properties ADD COLUMN IF NOT EXISTS title TEXT DEFAULT '';
ALTER TABLE properties ADD COLUMN IF NOT EXISTS description TEXT DEFAULT '';
ALTER TABLE properties ADD COLUMN IF NOT EXISTS price BIGINT DEFAULT 0;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS price_formatted TEXT DEFAULT '';
ALTER TABLE properties ADD COLUMN IF NOT EXISTS sector TEXT DEFAULT '';
ALTER TABLE properties ADD COLUMN IF NOT EXISTS sub_sector TEXT DEFAULT '';
ALTER TABLE properties ADD COLUMN IF NOT EXISTS area TEXT DEFAULT '0';
ALTER TABLE properties ADD COLUMN IF NOT EXISTS area_unit TEXT DEFAULT 'Marla';
ALTER TABLE properties ADD COLUMN IF NOT EXISTS bedrooms INTEGER DEFAULT 0;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS bathrooms INTEGER DEFAULT 0;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS parking INTEGER DEFAULT 0;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS features TEXT[] DEFAULT '{}';
ALTER TABLE properties ADD COLUMN IF NOT EXISTS images TEXT[] DEFAULT '{}';
ALTER TABLE properties ADD COLUMN IF NOT EXISTS video_url TEXT DEFAULT '';
ALTER TABLE properties ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS type TEXT DEFAULT 'House';
ALTER TABLE properties ADD COLUMN IF NOT EXISTS year_built INTEGER DEFAULT 2024;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS map_lat DECIMAL(10, 7) DEFAULT 33.7194;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS map_lng DECIMAL(10, 7) DEFAULT 73.0551;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS agent_phone TEXT DEFAULT '';
ALTER TABLE properties ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT NOW();
ALTER TABLE properties ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT NOW();

-- FIX: Rename 'featured' column to 'is_featured' if it exists
-- (This fixes the main error you were getting)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name='properties' AND column_name='featured'
  ) THEN
    ALTER TABLE properties RENAME COLUMN featured TO is_featured;
    RAISE NOTICE 'Renamed column featured → is_featured';
  END IF;
END $$;

-- Optional: Enable RLS for security (allows public read, auth users can insert/update/delete)
-- Uncomment these lines if you want RLS enabled:
/*
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read" ON properties 
  FOR SELECT USING (true);

CREATE POLICY "Allow inserts" ON properties 
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow updates" ON properties 
  FOR UPDATE USING (true);

CREATE POLICY "Allow deletes" ON properties 
  FOR DELETE USING (true);
*/

-- ─────────────────────────────────────────────────────────────────────────────
-- SUCCESS! All columns should now exist
-- Run this SELECT to verify:
-- SELECT column_name, data_type FROM information_schema.columns 
--   WHERE table_name = 'properties' ORDER BY ordinal_position;
-- ─────────────────────────────────────────────────────────────────────────────
