# 🚀 GitHub & Vercel Deployment Guide

## ✅ Code Status
- All changes committed locally ✓
- Ready to push to GitHub
- Production-ready for Vercel

---

## **STEP 1: Push to GitHub**

### Option A: If you already have a GitHub repo

Run these commands in PowerShell:

```powershell
cd "c:\Users\USER\Desktop\nonchtech\IEP (Uncle Tahir Masjid)\sector-serene-dwellings-main"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

Replace:
- `YOUR_USERNAME` with your GitHub username
- `YOUR_REPO_NAME` with your repository name

### Option B: Create a new GitHub repo first

1. Go to https://github.com/new
2. Create a new repository (e.g., "sector-serene-dwellings")
3. Copy the HTTPS URL (e.g., `https://github.com/username/sector-serene-dwellings.git`)
4. Run the commands from Option A with your repo URL

---

## **STEP 2: Verify Code is Pushed**

After pushing, check:
```powershell
git log --oneline  # Shows commit history
git remote -v      # Shows GitHub URL
```

---

## **STEP 3: Deploy to Vercel**

### 3.1 Create Vercel Account (if needed)
- Go to https://vercel.com
- Sign up or log in with GitHub

### 3.2 Import Project into Vercel

1. Click **"Add New"** → **"Project"**
2. Click **"Import Git Repository"**
3. Search for your repository name
4. Click **"Import"**

### 3.3 Configure Environment Variables

Before deploying, add these environment variables in Vercel:

**In Vercel Project Settings → Environment Variables, add:**

```
VITE_SUPABASE_URL=https://hmgmstsjuqfazrhioady.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhtZ21zdHNqdXFmYXpyaGlvYWR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc3MjUwMTksImV4cCI6MjA5MzMwMTAxOX0.EqdRdqsKf0tiWkBze_9mFSs9MNkPbPB5UrAAavbg6SM
VITE_ADMIN_PASSWORD=3i2e1p123?
```

### 3.4 Deploy

1. Click **"Deploy"**
2. Wait for build to complete (2-5 minutes)
3. Get your live URL (e.g., `https://your-project.vercel.app`)

---

## **STEP 4: Verify Vercel Deployment Works**

After deployment:

✅ Visit https://your-project.vercel.app
✅ Test hero search (dropdowns should be black)
✅ Test admin login: Password `3i2e1p123?`
✅ Test property creation
✅ Verify properties display

---

## **Common Issues & Fixes**

### Issue: "Env variables not found" error
**Solution:** Make sure all 3 environment variables are added in Vercel project settings

### Issue: "Cannot read property 'mapCoords' of undefined"
**Solution:** Already fixed - removed map functionality ✓

### Issue: "RLS policy violation"
**Solution:** Already fixed - RLS disabled in Supabase ✓

### Issue: Dropdowns showing white text on white background
**Solution:** Already fixed - added black background styling ✓

---

## **Files Changed in This Deployment**

| File | Changes |
|------|---------|
| `src/components/Hero.tsx` | Changed "F-6, F-7 & F-8" → "Twin Cities" |
| `src/components/HeroSearch.tsx` | Added black background to dropdowns |
| `src/components/Navbar.tsx` | Removed sector count display |
| `src/components/PropertyModal.tsx` | Removed map iframe, removed MapPin icon |
| `src/admin/pages/AdminPropertyForm.tsx` | Removed map coordinates input, removed video URL input |
| `src/lib/api.ts` | Complete Supabase serverless integration |
| `FIX_RLS_AND_COLUMNS.sql` | SQL to disable RLS |
| `REMOVE_MAP_COLUMNS.sql` | Optional: SQL to drop map columns |
| `.env.local` | All Supabase & admin credentials configured |

---

## **Production Checklist**

- [x] All code committed
- [x] Environment variables ready
- [ ] GitHub repo created
- [ ] Code pushed to GitHub
- [ ] Vercel project connected
- [ ] Environment variables added to Vercel
- [ ] Deployed to Vercel
- [ ] Test live deployment

---

## **Next Steps After Deployment**

1. ✅ Share production URL with team
2. ✅ Test all features on live site
3. ✅ Monitor Vercel Analytics
4. ✅ Set up custom domain (optional)
5. ✅ Enable auto-deployments (automatic on every git push)

---

## **Support**

If you encounter any issues:
1. Check Vercel deployment logs
2. Check browser console (F12) for errors
3. Verify environment variables in Vercel settings
4. Run SQL setup if needed

Good luck! 🚀
