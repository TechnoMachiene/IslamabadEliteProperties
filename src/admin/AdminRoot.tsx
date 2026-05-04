"use client";

import dynamic from "next/dynamic";
import { BrowserRouter } from "react-router-dom";

const AdminApp = dynamic(() => import("@/admin/AdminApp"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="w-7 h-7 rounded-full border-2 border-yellow-500 border-t-transparent animate-spin" />
    </div>
  ),
});

export default function AdminRoot() {
  return (
    <BrowserRouter basename="/admin">
      <AdminApp />
    </BrowserRouter>
  );
}
