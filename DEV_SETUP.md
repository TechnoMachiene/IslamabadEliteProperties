# Development Setup Guide

## Quick Start

### Option 1: Full Development (With Admin Panel & Netlify Functions)
**This is recommended for development:**

```bash
npm install -g netlify-cli
netlify dev
```

This runs:
- Vite dev server (React frontend) on port 8888
- Netlify Functions (backend API) on the same port
- `.env.local` variables are automatically loaded

**Access the app:** http://localhost:8888

### Option 2: Frontend Only (Current Setup)
**If you just want to see the properties:**

```bash
npm run dev
```

This runs:
- Vite dev server on port 8081
- **No Netlify Functions** (API not available)
- Uses fallback static properties from `/src/data/properties.ts`
- Admin panel won't work

**Access the app:** http://localhost:8081

---

## Environment Variables

Your `.env.local` file contains:
- `SUPABASE_URL` - Your Supabase database
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase admin API key
- `ADMIN_SECRET_KEY` - Admin panel password

**Important:** 
- `.env.local` is loaded automatically by both Vite and Netlify
- Don't commit `.env.local` to git (it's in `.gitignore`)
- All server-side keys are only used by Netlify Functions, never sent to browser

---

## What's Fixed

✅ **`.env.local` file created** - Environment variables now loaded
✅ **Better error messages** - Shows "Netlify Functions not found" hint
✅ **Cleaner console** - Removed verbose logging, only real errors shown
✅ **Fallback working** - Static properties display when API is unavailable
✅ **Properties load** - All 35 properties visible on all pages

---

## For Admin Panel

To test admin login locally, you **must** run `netlify dev`:

```bash
netlify dev
```

Then:
1. Go to http://localhost:8888/admin/login
2. Password: `3i2e1p123?` (from `.env.local`)
3. Access admin dashboard to create/edit/delete properties

---

## For Production Deployment

When deploying to Netlify:
1. Set environment variables in Netlify UI (Site settings → Environment variables)
2. Add all 3 variables from `.env.local`
3. Deploy - both frontend and functions will work together
4. Properties will fetch from Supabase, not static fallback
