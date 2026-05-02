-- ─────────────────────────────────────────────────────────────────────────────
-- IEP SUPABASE — Table Schema Setup
-- Paste these SQL commands into Supabase SQL Editor and run them
-- ─────────────────────────────────────────────────────────────────────────────

-- ── 1. CREATE TABLE (if it doesn't exist) ──────────────────────────────────
CREATE TABLE IF NOT EXISTS properties (
  id TEXT PRIMARY KEY,
  city TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  price BIGINT DEFAULT 0,
  price_formatted TEXT DEFAULT '',
  sector TEXT DEFAULT '',
  sub_sector TEXT DEFAULT '',
  area TEXT DEFAULT '0',
  area_unit TEXT DEFAULT 'Marla',
  bedrooms INTEGER DEFAULT 0,
  bathrooms INTEGER DEFAULT 0,
  parking INTEGER DEFAULT 0,
  features TEXT[] DEFAULT '{}',
  images TEXT[] DEFAULT '{}',
  video_url TEXT DEFAULT '',
  is_featured BOOLEAN DEFAULT false,
  type TEXT DEFAULT 'House',
  year_built INTEGER DEFAULT 2024,
  map_lat DECIMAL(10, 7) DEFAULT 33.7194,
  map_lng DECIMAL(10, 7) DEFAULT 73.0551,
  agent_phone TEXT DEFAULT '',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ── 2. ADD MISSING COLUMNS (if not already present) ───────────────────────

-- Add created_at if missing
ALTER TABLE properties ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT NOW();

-- Add updated_at if missing
ALTER TABLE properties ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT NOW();

-- Rename 'featured' column to 'is_featured' if it exists
-- (This handles the error you're getting)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='properties' AND column_name='featured') THEN
    ALTER TABLE properties RENAME COLUMN featured TO is_featured;
  END IF;
END $$;

-- ── 3. SET UP ROW LEVEL SECURITY (RLS) ────────────────────────────────────

-- Enable RLS on the table
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- Allow anyone to READ properties (public read)
CREATE POLICY "Allow public read" ON properties 
  FOR SELECT USING (true);

-- Allow authenticated users to INSERT/UPDATE/DELETE (for admin)
CREATE POLICY "Allow authenticated users to insert" ON properties 
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update" ON properties 
  FOR UPDATE USING (true);

CREATE POLICY "Allow authenticated users to delete" ON properties 
  FOR DELETE USING (true);

-- ── 4. VERIFY TABLE STRUCTURE ─────────────────────────────────────────────

-- Run this to check if all columns exist:
-- SELECT column_name, data_type FROM information_schema.columns 
-- WHERE table_name = 'properties' ORDER BY ordinal_position;

-- ─────────────────────────────────────────────────────────────────────────────
-- NOTES:
-- ─────────────────────────────────────────────────────────────────────────────
-- 1. Copy this entire SQL and paste into Supabase → SQL Editor
-- 2. Click "Run" to execute all commands
-- 3. If you get errors about columns already existing, that's OK - they're just safe guards
-- 4. The RLS policies allow:
--    - Public READ of all properties
--    - Authenticated users can INSERT/UPDATE/DELETE (we'll validate auth in frontend)
-- 5. Make sure your anon key has INSERT/UPDATE/DELETE permissions in Supabase Dashboard
--
-- ─────────────────────────────────────────────────────────────────────────────
-- IF YOU STILL GET ERRORS:
-- ─────────────────────────────────────────────────────────────────────────────
-- 1. Check Supabase Dashboard → Table Editor
-- 2. Click on "properties" table
-- 3. Look at the columns - verify these exist:
--    - id (text)
--    - city (text)
--    - title (text)
--    - price (bigint)
--    - is_featured (boolean)  ← NOT "featured"
--    - images (text array)    ← NOT "image"
--    - And all other columns from the list above
--
-- 4. If a column is wrong type or missing, edit it directly in the UI
-- 5. Restart your dev server: npm run dev
