# 🎯 Fix Property Creation Error - SQL Setup Guide

## The Problem ❌
You're getting this error:
```
Failed to create property: Could not find the 'featured' column of 'properties' in the schema cache
```

## Root Cause
Your Supabase `properties` table is missing the correct column names. The API code expects these snake_case columns, but they might not exist or have wrong names.

---

## ✅ Solution: Run SQL in Supabase

### Step 1: Open Supabase SQL Editor
1. Go to: https://app.supabase.com
2. Select your project: **hmgmstsjuqfazrhioady**
3. Click **SQL Editor** (left sidebar)
4. Click **New Query**

### Step 2: Copy & Paste This SQL

```sql
-- Ensure all columns exist with correct names
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

-- Handle old 'featured' column name if it exists (rename to is_featured)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns 
             WHERE table_name='properties' AND column_name='featured') THEN
    ALTER TABLE properties RENAME COLUMN featured TO is_featured;
  END IF;
END $$;

-- Add timestamps if missing
ALTER TABLE properties ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT NOW();
ALTER TABLE properties ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT NOW();
```

### Step 3: Execute the Query
1. Click **RUN** button
2. Wait for success message
3. You should see: "✓ Success. No rows returned"

---

## ✅ After SQL Runs

The columns that were added/fixed:
- ✅ `is_featured` (renamed from `featured` if needed)
- ✅ `price_formatted`
- ✅ `sub_sector`
- ✅ `video_url`
- ✅ `year_built`
- ✅ `map_lat` / `map_lng`
- ✅ `agent_phone`
- ✅ `created_at` / `updated_at`

---

## 🧪 Test Property Creation

1. Go to: http://localhost:8082/admin/login
2. Password: `3i2e1p123?`
3. Click **Add Property**
4. Fill in form:
   - **Title**: Test Property 123
   - **Description**: This is a test property
   - **City**: Select Islamabad
   - **Sector**: Select any sector
   - **Price**: 100000000 (1 crore)
   - **Area**: 10 Marla
   - **Image URL**: /images/property-1.webp
5. Click **Save**
6. ✅ Should succeed!

---

## 📝 What Each Column Is For

| Column | Type | Purpose |
|--------|------|---------|
| `id` | TEXT | Unique property ID |
| `title` | TEXT | Property name |
| `description` | TEXT | Full property details |
| `price` | BIGINT | Price in PKR |
| `price_formatted` | TEXT | Display format (e.g., "10 Crore") |
| `city` | TEXT | Islamabad or Rawalpindi |
| `sector` | TEXT | F-6, F-7, F-8, etc |
| `sub_sector` | TEXT | More specific location |
| `area` | TEXT | Size (e.g., "10" Marla) |
| `area_unit` | TEXT | "Marla" or "Kanal" |
| `bedrooms` | INTEGER | Number of bedrooms |
| `bathrooms` | INTEGER | Number of bathrooms |
| `parking` | INTEGER | Number of parking spaces |
| `features` | TEXT[] | Array of features |
| `images` | TEXT[] | Array of image URLs |
| `video_url` | TEXT | YouTube/video link |
| `is_featured` | BOOLEAN | Show in featured section |
| `type` | TEXT | House, Villa, Apartment, etc |
| `year_built` | INTEGER | Construction year |
| `map_lat` | DECIMAL | Latitude for map |
| `map_lng` | DECIMAL | Longitude for map |
| `agent_phone` | TEXT | Contact number |
| `created_at` | TIMESTAMP | When property was added |
| `updated_at` | TIMESTAMP | Last modified time |

---

## ❌ If SQL Fails

Common errors and fixes:

### "Syntax error"
- Make sure you copied the entire SQL block
- Check for any missing semicolons
- Try running one ALTER statement at a time

### "Table does not exist"
- Verify the project is correct (hmgmstsjuqfazrhioady)
- Check that "properties" table exists in Table Editor
- If not, create it from the seed SQL first

### "Column already exists"
- That's OK! The `IF NOT EXISTS` prevents errors
- Just means the column was already there

---

## 🚀 Ready to Go!

After running the SQL:
1. Refresh your browser
2. Login to admin
3. Add a test property
4. Should work perfectly! ✅

---

## 📦 For Production (Vercel Deployment)

The same columns will work on Vercel:
- Code stays the same
- Use same environment variables
- Properties table works exactly as-is

No additional setup needed!

---

## 💬 Questions?

If you still get errors after running SQL:
1. Check browser console (F12) for error message
2. Verify the column names in Supabase Table Editor
3. Make sure anon key is correct in `.env.local`
4. Try restarting dev server: `npm run dev`
