# Supabase Setup for Property CRUD - Fix Required

## Current Status
✅ **Admin authentication is working** - Password-based login works with `npm run dev`
⚠️ **Property creation blocked** - Need correct Supabase anon key

## The Issue
The `.env.local` file has a placeholder for `VITE_SUPABASE_ANON_KEY`. The placeholder key is invalid, which prevents property creation from working.

## How to Fix

### Step 1: Get Your Supabase Anon Key

1. Go to your Supabase Dashboard: https://app.supabase.com
2. Select your project: **hmgmstsjuqfazrhioady**
3. Go to **Project Settings** (bottom left icon)
4. Click on **API** tab
5. Copy the key labeled **"anon public"** (NOT the "service_role" key)

### Step 2: Update .env.local

Replace the `VITE_SUPABASE_ANON_KEY` value in `.env.local` with your copied anon key:

```bash
VITE_SUPABASE_ANON_KEY=your_actual_anon_key_here
```

Example format:
```bash
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InjY...
```

### Step 3: Restart Dev Server

```bash
npm run dev
```

## How It Works (Serverless)

Once you provide the correct anon key:

1. **Admin forms** → sends data to Supabase
2. **Supabase API** → stores in PostgreSQL database
3. **No backend server needed** → Pure serverless with `npm run dev`
4. **Works on Vercel** → Same code deploys to production

## Environment Variables Explained

| Variable | Purpose | Sensitive? |
|----------|---------|-----------|
| `VITE_SUPABASE_URL` | Database endpoint (public) | No |
| `VITE_SUPABASE_ANON_KEY` | Frontend access key (public, limited permissions) | No |
| `VITE_ADMIN_PASSWORD` | Admin panel password (exposed in frontend for dev) | Yes* |
| `SUPABASE_SERVICE_ROLE_KEY` | Full database access (server-side only) | Yes |

*For production: Use Netlify Functions to validate password server-side

## API Methods Available

All calls go directly to Supabase (no Netlify Functions needed):

```
POST   /admin/login           → Validate admin password
GET    /properties            → Fetch all properties
GET    /properties/:id        → Fetch single property
POST   /properties            → Create property (admin only)
PUT    /properties/:id        → Update property (admin only)
DELETE /properties/:id        → Delete property (admin only)
```

## Testing Property Creation

1. Login to admin panel: http://localhost:8082/admin/login
   - Password: `3i2e1p123?`
2. Go to **Add Property**
3. Fill in the form
4. Click **Save**
5. Data saves directly to Supabase PostgreSQL

## For GitHub & Vercel Deployment

- ✅ Commit code to GitHub (no sensitive keys in git)
- ⚠️ Add environment variables to Vercel project settings
- ✅ Deployment works the same (uses Vercel + Supabase)

## Questions?

If property creation still fails after updating the anon key:
1. Check browser console (F12) for error messages
2. Verify the anon key is copied correctly (no extra spaces)
3. Make sure Supabase is connected and properties table exists
