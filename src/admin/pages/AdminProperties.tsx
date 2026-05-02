import { useState } from "react";
import { Link } from "react-router-dom";
import { Edit2, Plus, Search, Star, Trash2 } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { usePropertyStore } from "@/store/PropertyStoreContext";
import ConfirmModal from "@/admin/components/ConfirmModal";
import { cities } from "@/data/cities";

const ROWS_PER_PAGE = 15;

const AdminProperties = () => {
  const { properties, deleteProperty, isLoading } = usePropertyStore();

  const [query,       setQuery]       = useState("");
  const [cityFilter,  setCityFilter]  = useState("");
  const [typeFilter,  setTypeFilter]  = useState("");
  const [page,        setPage]        = useState(1);
  const [deleteId,    setDeleteId]    = useState<string | null>(null);
  const [deleting,    setDeleting]    = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const filtered = properties.filter((p) => {
    const q = query.toLowerCase();
    return (
      (!q || p.title.toLowerCase().includes(q) || p.subSector.toLowerCase().includes(q) || p.sector.toLowerCase().includes(q)) &&
      (!cityFilter || p.city === cityFilter) &&
      (!typeFilter || p.type === typeFilter)
    );
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / ROWS_PER_PAGE));
  const safePage   = Math.min(page, totalPages);
  const paginated  = filtered.slice((safePage - 1) * ROWS_PER_PAGE, safePage * ROWS_PER_PAGE);

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    setDeleteError("");
    try {
      await deleteProperty(deleteId);
      setDeleteId(null);
    } catch {
      setDeleteError("Failed to delete. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  const propertyTypes = ["House", "Villa", "Apartment", "Penthouse", "Bungalow"];

  return (
    <>
      <Helmet>
        <title>Properties | IEP Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Properties</h1>
            <p className="text-sm text-slate-500 mt-1">
              {isLoading ? "Loading…" : `${properties.length} total · ${filtered.length} shown`}
            </p>
          </div>
          <Link
            to="/admin/properties/new"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-yellow-500 text-slate-900 font-semibold text-sm hover:bg-yellow-400 transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Property
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-5">
          <div className="relative flex-1 min-w-[180px] max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(1); }}
              placeholder="Search title, sector…"
              className="w-full h-9 pl-9 pr-3 rounded-lg border border-slate-200 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
            />
          </div>

          <select
            value={cityFilter}
            onChange={(e) => { setCityFilter(e.target.value); setPage(1); }}
            className="h-9 px-3 rounded-lg border border-slate-200 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
          >
            <option value="">All Cities</option>
            {cities.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
          </select>

          <select
            value={typeFilter}
            onChange={(e) => { setTypeFilter(e.target.value); setPage(1); }}
            className="h-9 px-3 rounded-lg border border-slate-200 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
          >
            <option value="">All Types</option>
            {propertyTypes.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>

          {(query || cityFilter || typeFilter) && (
            <button
              onClick={() => { setQuery(""); setCityFilter(""); setTypeFilter(""); setPage(1); }}
              className="h-9 px-3 rounded-lg border border-red-200 text-red-600 text-sm hover:bg-red-50 transition-colors"
            >
              Clear
            </button>
          )}
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-6 h-6 rounded-full border-2 border-yellow-500 border-t-transparent animate-spin" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[700px]">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-left">
                    <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Property</th>
                    <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">City / Sector</th>
                    <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Price</th>
                    <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Type</th>
                    <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
                    <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {paginated.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-14 text-slate-400">No properties found.</td>
                    </tr>
                  ) : (
                    paginated.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-3">
                            <img
                              src={p.images[0]}
                              alt={p.title}
                              loading="lazy"
                              className="w-11 h-11 rounded-xl object-cover shrink-0 border border-slate-100"
                            />
                            <div className="min-w-0">
                              <p className="font-medium text-slate-900 truncate max-w-[200px]">{p.title}</p>
                              <p className="text-xs text-slate-400">{p.subSector}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3.5 text-slate-600 whitespace-nowrap">
                          <span className="capitalize">{p.city}</span>
                          <span className="text-slate-300 mx-1">/</span>
                          {p.sector}
                        </td>
                        <td className="px-4 py-3.5 font-semibold text-slate-900 whitespace-nowrap">
                          PKR {p.priceFormatted}
                        </td>
                        <td className="px-4 py-3.5">
                          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">{p.type}</span>
                        </td>
                        <td className="px-4 py-3.5">
                          {p.isFeatured ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 text-xs font-medium">
                              <Star className="w-3 h-3 fill-yellow-500" /> Featured
                            </span>
                          ) : (
                            <span className="text-slate-300 text-xs">Standard</span>
                          )}
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-2">
                            <Link
                              to={`/admin/properties/edit/${p.id}`}
                              className="p-1.5 rounded-lg text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                              aria-label="Edit"
                            >
                              <Edit2 className="w-4 h-4" />
                            </Link>
                            <button
                              onClick={() => { setDeleteId(p.id); setDeleteError(""); }}
                              className="p-1.5 rounded-lg text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                              aria-label="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {!isLoading && totalPages > 1 && (
            <div className="flex items-center justify-between px-5 py-3 border-t border-slate-100">
              <p className="text-xs text-slate-500">Page {safePage} of {totalPages}</p>
              <div className="flex gap-2">
                <button
                  disabled={safePage <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="h-8 px-3 rounded-lg border border-slate-200 text-xs text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  disabled={safePage >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="h-8 px-3 rounded-lg border border-slate-200 text-xs text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>

        {deleteError && (
          <p className="mt-3 text-sm text-red-600">{deleteError}</p>
        )}
      </div>

      <ConfirmModal
        open={!!deleteId}
        title="Delete Property"
        message="This action cannot be undone. The property will be permanently removed from the database."
        onConfirm={handleDelete}
        onCancel={() => { setDeleteId(null); setDeleteError(""); }}
        loading={deleting}
      />
    </>
  );
};

export default AdminProperties;
