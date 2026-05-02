-- ─────────────────────────────────────────────────────────────────────────────
-- REMOVE MAP AND VIDEO COLUMNS FROM PROPERTIES TABLE
-- Removes unused map_lat, map_lng, and video_url columns after removing map UI
-- ─────────────────────────────────────────────────────────────────────────────

-- Drop the video_url column (no longer used in UI)
ALTER TABLE properties DROP COLUMN IF EXISTS video_url;

-- Drop the map coordinate columns (no longer used in UI)
ALTER TABLE properties DROP COLUMN IF EXISTS map_lat;
ALTER TABLE properties DROP COLUMN IF EXISTS map_lng;

-- ─────────────────────────────────────────────────────────────────────────────
-- SUCCESS! Map and video columns have been removed from the properties table
-- You can now:
-- 1. Create properties without providing map coordinates
-- 2. Create properties without providing video URLs
-- 
-- Verify with: SELECT column_name FROM information_schema.columns 
--   WHERE table_name = 'properties' ORDER BY ordinal_position;
-- ─────────────────────────────────────────────────────────────────────────────
