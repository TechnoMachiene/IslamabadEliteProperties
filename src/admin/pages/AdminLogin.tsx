"use client";

import { useState, useEffect, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Building2, Eye, EyeOff, Lock } from "lucide-react";
import { useAdminAuth } from "@/admin/context/AdminAuthContext";

const AdminLogin = ({ urlMode = false }: { urlMode?: boolean }) => {
  const navigate  = useNavigate();
  const { pass }  = useParams();
  const { login } = useAdminAuth();

  const [password, setPassword] = useState(urlMode ? (pass ?? "") : "");
  const [showPass, setShowPass] = useState(false);
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  const attempt = async (pw: string) => {
    setLoading(true);
    setError("");
    const ok = await login(pw);
    if (ok) {
      navigate("/admin/dashboard", { replace: true });
    } else {
      setError("Incorrect password. Please try again.");
      setLoading(false);
    }
  };

  // URL-based auto-login on mount
  useEffect(() => {
    if (urlMode && pass) attempt(pass);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    attempt(password);
  };

  // While URL-mode is attempting, show a spinner
  if (urlMode && pass && loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="w-7 h-7 rounded-full border-2 border-yellow-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          {/* Brand */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center mb-4 shadow-lg">
              <Building2 className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">IEP Admin</h1>
            <p className="text-sm text-slate-400 mt-1">Property Management Panel</p>
          </div>

          {/* Card */}
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="admin-password" className="block text-xs font-medium text-slate-400 mb-1.5">
                  Admin Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    id="admin-password"
                    name="password"
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(""); }}
                    placeholder="Enter password"
                    autoComplete="current-password"
                    className="w-full h-11 pl-10 pr-10 bg-slate-700 border border-slate-600 rounded-xl text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                    aria-label={showPass ? "Hide password" : "Show password"}
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
              </div>

              <button
                type="submit"
                disabled={loading || !password}
                className="w-full h-11 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-400 text-slate-900 font-semibold text-sm transition-all hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Verifying…" : "Sign In"}
              </button>
            </form>
          </div>

          <p className="text-center text-xs text-slate-600 mt-6">
            Islamabad Elite Properties · Admin Panel
          </p>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
