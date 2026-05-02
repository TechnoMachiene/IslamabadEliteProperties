import { Link } from "react-router-dom";
import { BarChart3, Building2, Plus, Star, TrendingUp } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { usePropertyStore } from "@/store/PropertyStoreContext";
import { cities } from "@/data/cities";

const AdminDashboard = () => {
  const { properties } = usePropertyStore();

  const featured    = properties.filter((p) => p.isFeatured);
  const recentProps = [...properties]
    .sort((a, b) => (b.id > a.id ? 1 : -1))
    .slice(0, 5);

  const stats = [
    { icon: Building2,  label: "Total Properties", value: properties.length,  color: "bg-blue-50 text-blue-600" },
    { icon: Star,       label: "Featured",          value: featured.length,    color: "bg-yellow-50 text-yellow-600" },
    { icon: TrendingUp, label: "Cities",            value: cities.length,      color: "bg-green-50 text-green-600" },
    { icon: BarChart3,  label: "Sectors",           value: cities.reduce((a, c) => a + c.sectors.length, 0), color: "bg-purple-50 text-purple-600" },
  ];

  return (
    <>
      <Helmet>
        <title>Dashboard | IEP Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-sm text-slate-500 mt-1">Overview of your real estate platform</p>
          </div>
          <Link
            to="/admin/properties/new"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-yellow-500 text-slate-900 font-semibold text-sm hover:bg-yellow-400 transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Property
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center mb-3`}>
                <s.icon className="w-5 h-5" />
              </div>
              <p className="text-2xl font-bold text-slate-900">{s.value}</p>
              <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Recent properties */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <h2 className="text-base font-semibold text-slate-900">Recent Properties</h2>
            <Link to="/admin/properties" className="text-xs text-yellow-600 font-medium hover:text-yellow-700">
              View all →
            </Link>
          </div>

          {recentProps.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-sm">No properties yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 text-left">
                    <th className="px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide">Property</th>
                    <th className="px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide">City / Sector</th>
                    <th className="px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide">Price</th>
                    <th className="px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide">Type</th>
                    <th className="px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide">Featured</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentProps.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.images[0]}
                            alt={p.title}
                            className="w-10 h-10 rounded-lg object-cover shrink-0"
                          />
                          <div>
                            <p className="font-medium text-slate-900 truncate max-w-[180px]">{p.title}</p>
                            <p className="text-xs text-slate-500">{p.subSector}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-slate-600 whitespace-nowrap">
                        {p.city.charAt(0).toUpperCase() + p.city.slice(1)} / {p.sector}
                      </td>
                      <td className="px-4 py-4 font-medium text-slate-900 whitespace-nowrap">
                        PKR {p.priceFormatted}
                      </td>
                      <td className="px-4 py-4 text-slate-600">{p.type}</td>
                      <td className="px-4 py-4">
                        {p.isFeatured ? (
                          <span className="px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 text-xs font-medium">Featured</span>
                        ) : (
                          <span className="text-slate-400 text-xs">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
