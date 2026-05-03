"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { sectors } from "@/data/properties";

interface Props {
  visible: boolean;
}

/**
 * Desktop-only sticky search bar that slides in below the navbar
 * once the user scrolls past the hero. Hidden on mobile — the hero
 * search stays in normal flow there.
 */
const StickySearchBar = ({ visible }: Props) => {
  const router = useRouter();
  const [sector, setSector] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    const params = new URLSearchParams();
    if (sector) params.set("sector", sector);
    setTimeout(() => {
      router.push(`/properties?${params.toString()}`);
    }, 80);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="sticky-search"
          initial={{ y: -64, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -64, opacity: 0 }}
          transition={{ type: "spring", damping: 32, stiffness: 320 }}
          // Sits directly below the fixed navbar (h-20 on md)
          className="hidden md:block fixed top-[80px] left-0 right-0 z-40 bg-background/95 backdrop-blur-xl border-b border-border/60 shadow-lg"
        >
          <div className="container mx-auto px-6 py-3">
            <form
              onSubmit={handleSearch}
              role="search"
              aria-label="Quick property search"
              className="flex items-center gap-4"
            >
              {/* Brand mark */}
              <Link href="/" aria-label="Home" className="shrink-0">
                <img
                  src="/logo.jpg"
                  alt="Islamabad Elite Properties"
                  className="h-8 w-auto object-contain rounded-sm"
                  width={32}
                  height={32}
                />
              </Link>

              {/* Divider */}
              <span className="w-px h-6 bg-border shrink-0" aria-hidden="true" />

              {/* Sector select */}
              <div className="flex-1 flex items-center gap-2 h-10 bg-muted rounded-xl px-4 border border-border focus-within:ring-2 focus-within:ring-primary transition-shadow">
                <Search className="w-4 h-4 text-muted-foreground shrink-0" aria-hidden="true" />
                <label htmlFor="sticky-sector" className="sr-only">Sector</label>
                <select
                  id="sticky-sector"
                  name="sector"
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                  className="flex-1 bg-transparent text-sm font-medium text-foreground focus:outline-none"
                >
                  <option value="">Search by sector…</option>
                  {sectors.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {/* Search button */}
              <button
                type="submit"
                className="h-10 px-5 rounded-xl bg-gradient-gold text-primary-foreground font-semibold text-sm flex items-center gap-2 transition-transform hover:scale-[1.02] active:scale-100 shrink-0"
              >
                <Search className="w-3.5 h-3.5" aria-hidden="true" />
                Search
              </button>

              {/* Quick links */}
              <nav className="hidden lg:flex items-center gap-5 ml-2 shrink-0" aria-label="Quick sector links">
                {["F-6", "F-7", "F-8"].map((s) => (
                  <Link
                    key={s}
                    href={`/properties/${s.toLowerCase().replace("/", "-")}`}
                    className="text-sm text-muted-foreground hover:text-primary font-medium transition-colors"
                  >
                    {s}
                  </Link>
                ))}
              </nav>
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickySearchBar;
