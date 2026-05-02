import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { AdminAuthProvider } from "@/admin/context/AdminAuthContext";
import AdminGuard from "@/admin/components/AdminGuard";
import AdminLayout from "@/admin/components/AdminLayout";

const AdminLogin        = lazy(() => import("@/admin/pages/AdminLogin"));
const AdminDashboard    = lazy(() => import("@/admin/pages/AdminDashboard"));
const AdminProperties   = lazy(() => import("@/admin/pages/AdminProperties"));
const AdminPropertyForm = lazy(() => import("@/admin/pages/AdminPropertyForm"));
const AdminSettings     = lazy(() => import("@/admin/pages/AdminSettings"));

const AdminLoader = () => (
  <div className="min-h-screen bg-slate-900 flex items-center justify-center">
    <div className="w-7 h-7 rounded-full border-2 border-yellow-500 border-t-transparent animate-spin" />
  </div>
);

/** Wraps a guarded admin page in the sidebar layout. */
const Protected = ({ children }: { children: React.ReactNode }) => (
  <AdminGuard>
    <AdminLayout>{children}</AdminLayout>
  </AdminGuard>
);

const AdminApp = () => (
  <AdminAuthProvider>
    {/* Prevent search engine indexing of every admin page */}
    <Helmet>
      <meta name="robots" content="noindex, nofollow" />
    </Helmet>

    <Suspense fallback={<AdminLoader />}>
      <Routes>
        {/* Public admin routes */}
        <Route path="login"           element={<AdminLogin />} />
        {/* URL-based access: /admin/access/[password] */}
        <Route path="access/:pass"    element={<AdminLogin urlMode />} />

        {/* Protected routes */}
        <Route path="dashboard"       element={<Protected><AdminDashboard /></Protected>} />
        <Route path="properties"      element={<Protected><AdminProperties /></Protected>} />
        <Route path="properties/new"  element={<Protected><AdminPropertyForm /></Protected>} />
        <Route path="properties/edit/:id" element={<Protected><AdminPropertyForm /></Protected>} />
        <Route path="settings"        element={<Protected><AdminSettings /></Protected>} />

        {/* Default: redirect to login or dashboard */}
        <Route index element={<AdminGuard><AdminLayout><AdminDashboard /></AdminLayout></AdminGuard>} />
      </Routes>
    </Suspense>
  </AdminAuthProvider>
);

export default AdminApp;
