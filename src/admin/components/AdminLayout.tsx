import { useState, type ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  BarChart3,
  Building2,
  Home,
  LogOut,
  Menu,
  Plus,
  Settings,
  X,
} from "lucide-react";
import { useAdminAuth } from "@/admin/context/AdminAuthContext";

const navItems = [
  { to: "/admin/dashboard",        icon: BarChart3,  label: "Dashboard"      },
  { to: "/admin/properties",       icon: Building2,  label: "Properties"     },
  { to: "/admin/properties/new",   icon: Plus,       label: "Add Property"   },
  { to: "/admin/settings",         icon: Settings,   label: "Settings"       },
];

interface Props { children: ReactNode }

const AdminLayout = ({ children }: Props) => {
  const location  = useLocation();
  const navigate  = useNavigate();
  const { logout } = useAdminAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => { logout(); navigate("/admin/login"); };
  const isActive = (to: string) => location.pathname === to || location.pathname.startsWith(to + "/");

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className="px-6 py-5 border-b border-slate-700/60">
        <Link to="/admin/dashboard" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shrink-0">
            <Building2 className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-white leading-none">IEP Admin</p>
            <p className="text-xs text-slate-400 mt-0.5">Property Manager</p>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive(item.to)
                    ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                    : "text-slate-400 hover:bg-slate-700/60 hover:text-slate-200"
                }`}
              >
                <item.icon className="w-4 h-4 shrink-0" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-6 pt-6 border-t border-slate-700/60">
          <Link
            to="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:bg-slate-700/60 hover:text-slate-200 transition-all"
          >
            <Home className="w-4 h-4 shrink-0" />
            View Website
          </Link>
        </div>
      </nav>

      {/* Logout */}
      <div className="px-3 pb-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-56 lg:w-60 shrink-0 bg-slate-900 flex-col">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar drawer */}
      <aside
        className={`fixed top-0 left-0 h-full z-50 w-60 bg-slate-900 flex flex-col transition-transform duration-200 md:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent />
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-14 shrink-0 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-6">
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Open navigation"
          >
            <Menu className="w-5 h-5 text-slate-600" />
          </button>
          <div className="flex items-center gap-2 md:ml-0 ml-2">
            <span className="text-sm font-medium text-slate-500">
              {navItems.find((n) => isActive(n.to))?.label ?? "Admin"}
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-red-600 border border-red-200 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" /> Logout
          </button>
        </header>

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
