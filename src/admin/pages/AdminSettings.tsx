import { Database, Key, Shield } from "lucide-react";
import { usePropertyStore } from "@/store/PropertyStoreContext";

const AdminSettings = () => {
  const { properties, isLoading } = usePropertyStore();

  return (
    <>
      <div className="max-w-xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
          <p className="text-sm text-slate-500 mt-1">Platform configuration and system info</p>
        </div>

        {/* ── Database stats ────────────────────────────────────────────── */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
              <Database className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900">Database</h2>
              <p className="text-xs text-slate-500">Supabase — live stats</p>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between py-3 border-t border-slate-100">
              <p className="text-sm font-medium text-slate-700">Total Properties</p>
              <span className="text-xl font-bold text-slate-900">
                {isLoading ? "—" : properties.length}
              </span>
            </div>
            <div className="flex items-center justify-between py-3 border-t border-slate-100">
              <p className="text-sm font-medium text-slate-700">Featured Listings</p>
              <span className="text-xl font-bold text-slate-900">
                {isLoading ? "—" : properties.filter((p) => p.isFeatured).length}
              </span>
            </div>
          </div>
        </section>

        {/* ── Security ─────────────────────────────────────────────────── */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-9 h-9 rounded-xl bg-yellow-50 flex items-center justify-center">
              <Key className="w-4 h-4 text-yellow-600" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900">Admin Password</h2>
              <p className="text-xs text-slate-500">Managed via deployment environment variables</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            The admin password is set via the <code className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-xs">ADMIN_SECRET_KEY</code> environment variable in your Netlify dashboard (Site settings → Environment variables). Changes take effect on the next deployment.
          </p>
        </section>

        {/* ── System info ──────────────────────────────────────────────── */}
        <section className="bg-slate-50 rounded-2xl border border-slate-200 p-5">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-4 h-4 text-slate-400" />
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide">System Info</h3>
          </div>
          <dl className="space-y-1.5 text-sm">
            <div className="flex justify-between">
              <dt className="text-slate-500">Platform</dt>
              <dd className="text-slate-700 font-medium">IEP Twin Cities Real Estate</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Database</dt>
              <dd className="text-slate-700 font-medium">Supabase (PostgreSQL)</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">API Layer</dt>
              <dd className="text-slate-700 font-medium">Netlify Functions</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Auth</dt>
              <dd className="text-slate-700 font-medium">HMAC token · 8-hour session</dd>
            </div>
          </dl>
        </section>
      </div>
    </>
  );
};

export default AdminSettings;
