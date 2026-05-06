import type { Metadata } from "next";
import AdminRoot from "@/admin/AdminRoot";

export const metadata: Metadata = {
  title: "Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return <AdminRoot />;
}
