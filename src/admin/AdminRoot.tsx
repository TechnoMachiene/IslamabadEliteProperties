"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { BrowserRouter } from "react-router-dom";

const AdminLoader = () => (
  <div className="min-h-screen bg-slate-900 flex items-center justify-center">
    <div className="w-7 h-7 rounded-full border-2 border-yellow-500 border-t-transparent animate-spin" />
  </div>
);

const AdminApp = dynamic(() => import("@/admin/AdminApp"), {
  ssr: false,
  loading: AdminLoader,
});

export default function AdminRoot() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <AdminLoader />;

  return (
    <BrowserRouter basename="/admin">
      <AdminApp />
    </BrowserRouter>
  );
}
