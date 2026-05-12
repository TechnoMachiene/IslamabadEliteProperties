"use client";

import { useEffect, useState } from "react";
import { Phone, MessageCircle, TrendingUp } from "lucide-react";

interface ContactClick {
  id: string;
  contact_type: string;
  property_id: string;
  timestamp: string;
}

interface ClickStats {
  totalClicks: number;
  callClicks: number;
  whatsappClicks: number;
  recentClicks: ContactClick[];
}

const AdminContactStats = () => {
  const [stats, setStats] = useState<ClickStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/contact-stats");
        if (!response.ok) throw new Error("Failed to fetch stats");
        const data = await response.json();
        setStats(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    // Refresh every 30 seconds
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="max-w-6xl p-8">
        <div className="animate-pulse">Loading contact statistics...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl p-8">
        <div className="text-destructive">Error: {error}</div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="max-w-6xl p-8">
        <div className="text-muted-foreground">No data available</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
            <TrendingUp className="w-5 h-5" />
          </div>
          <p className="text-2xl font-bold text-slate-900">{stats.totalClicks}</p>
          <p className="text-xs text-slate-500 mt-0.5">Total Contact Clicks</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center mb-3">
            <MessageCircle className="w-5 h-5" />
          </div>
          <p className="text-2xl font-bold text-slate-900">{stats.whatsappClicks}</p>
          <p className="text-xs text-slate-500 mt-0.5">WhatsApp Clicks</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
            <Phone className="w-5 h-5" />
          </div>
          <p className="text-2xl font-bold text-slate-900">{stats.callClicks}</p>
          <p className="text-xs text-slate-500 mt-0.5">Call Clicks</p>
        </div>
      </div>

      {/* Recent Clicks Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-base font-semibold text-slate-900">Recent Contact Clicks</h2>
        </div>

        {stats.recentClicks.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-sm">No contact clicks yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-left">
                  <th className="px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide">Type</th>
                  <th className="px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide">Property ID</th>
                  <th className="px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {stats.recentClicks.map((click) => (
                  <tr key={click.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {click.contact_type === "whatsapp" ? (
                          <MessageCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <Phone className="w-4 h-4 text-blue-600" />
                        )}
                        <span className="font-medium text-slate-900 capitalize">
                          {click.contact_type}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-slate-600">{click.property_id}</td>
                    <td className="px-4 py-4 text-slate-600 whitespace-nowrap">
                      {new Date(click.timestamp).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminContactStats;
