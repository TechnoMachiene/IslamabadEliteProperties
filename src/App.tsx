import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// ── Global property store — wraps entire app so admin edits
//    are immediately visible on all frontend pages
import { PropertyStoreProvider } from "@/store/PropertyStoreContext";

// Eagerly loaded (above-the-fold critical paths)
import Index      from "./pages/Index";
import Properties from "./pages/Properties";
import NotFound   from "./pages/NotFound";

// Lazy loaded — city/sector/property pages
const CityPage       = lazy(() => import("./pages/CityPage"));
const TwinCitiesPage = lazy(() => import("./pages/TwinCitiesPage"));
const SectorPage     = lazy(() => import("./pages/SectorPage"));
const PropertyPage   = lazy(() => import("./pages/PropertyPage"));

// Admin panel — fully code-split from public bundle
const AdminApp = lazy(() => import("./admin/AdminApp"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <PropertyStoreProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* ── Home ──────────────────────────────────────── */}
                <Route path="/" element={<Index />} />

                {/* ── Admin panel ────────────────────────────────── */}
                <Route path="/admin/*" element={<AdminApp />} />

                {/* ── Twin Cities overview ──────────────────────── */}
                <Route path="/twin-cities" element={<TwinCitiesPage />} />

                {/* ── Global property listing + search ─────────── */}
                <Route path="/properties" element={<Properties />} />

                {/* ── Individual property detail ────────────────── */}
                <Route path="/property/:slug" element={<PropertyPage />} />

                {/* ── ISLAMABAD city routes ─────────────────────── */}
                <Route path="/islamabad"                       element={<CityPage citySlug="islamabad" />} />
                <Route path="/islamabad/:sectorSlug"           element={<SectorPage citySlug="islamabad" />} />
                <Route path="/islamabad/:sectorSlug/:subNum"   element={<SectorPage citySlug="islamabad" />} />

                {/* ── RAWALPINDI city routes ────────────────────── */}
                <Route path="/rawalpindi"                      element={<CityPage citySlug="rawalpindi" />} />
                <Route path="/rawalpindi/:sectorSlug"          element={<SectorPage citySlug="rawalpindi" />} />
                <Route path="/rawalpindi/:sectorSlug/:subNum"  element={<SectorPage citySlug="rawalpindi" />} />

                {/* ── Legacy routes ────────────────────────────── */}
                <Route path="/properties/f-6"         element={<SectorPage citySlug="islamabad" legacySector="F-6" />} />
                <Route path="/properties/f-7"         element={<SectorPage citySlug="islamabad" legacySector="F-7" />} />
                <Route path="/properties/f-8"         element={<SectorPage citySlug="islamabad" legacySector="F-8" />} />
                <Route path="/properties/f-6/:subNum" element={<SectorPage citySlug="islamabad" legacySector="F-6" />} />
                <Route path="/properties/f-7/:subNum" element={<SectorPage citySlug="islamabad" legacySector="F-7" />} />
                <Route path="/properties/f-8/:subNum" element={<SectorPage citySlug="islamabad" legacySector="F-8" />} />
                <Route path="/f6"         element={<SectorPage citySlug="islamabad" legacySector="F-6" />} />
                <Route path="/f7"         element={<SectorPage citySlug="islamabad" legacySector="F-7" />} />
                <Route path="/f8"         element={<SectorPage citySlug="islamabad" legacySector="F-8" />} />
                <Route path="/f6/:subNum" element={<SectorPage citySlug="islamabad" legacySector="F-6" />} />
                <Route path="/f7/:subNum" element={<SectorPage citySlug="islamabad" legacySector="F-7" />} />
                <Route path="/f8/:subNum" element={<SectorPage citySlug="islamabad" legacySector="F-8" />} />

                {/* ── 404 ──────────────────────────────────────── */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </PropertyStoreProvider>
    </QueryClientProvider>
);

export default App;
