"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { cities } from "@/data/cities";
import { citySectors, subSectors, priceRanges } from "@/data/properties";

const selectClass =
  "h-12 w-full px-4 rounded-xl bg-white/10 text-white border border-white/20 text-sm font-medium " +
  "focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white/20 transition-all";

const HeroSearch = () => {
  const router = useRouter();
  const [citySlug,   setCitySlug]   = useState("");
  const [sector,     setSector]     = useState("");
  const [subSector,  setSubSector]  = useState("");
  const [priceRange, setPriceRange] = useState("");

  // Dynamic options driven by city selection
  const availableSectors    = citySlug ? (citySectors[citySlug] ?? []) : Object.keys(citySectors).flatMap((c) => citySectors[c]);
  const availableSubSectors = sector   ? (subSectors[sector] ?? [])   : [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });

    const params = new URLSearchParams();
    if (citySlug)   params.set("city",      citySlug);
    if (sector)     params.set("sector",    sector);
    if (subSector)  params.set("subSector", subSector);
    if (priceRange) params.set("price",     priceRange);

    setTimeout(() => router.push(`/properties?${params.toString()}`), 80);
  };

  return (
    <form
      onSubmit={handleSearch}
      role="search"
      aria-label="Search properties"
      className="w-full rounded-2xl p-4 sm:p-5 md:p-6 bg-white/15 backdrop-blur-md border border-white/25 shadow-[0_8px_32px_rgba(0,0,0,0.35)]"
    >
      {/* Column labels — desktop */}
      <div className="hidden md:grid md:grid-cols-5 gap-3 mb-2">
        {["City", "Sector", "Sub-area", "Price range", ""].map((label, i) => (
          <span key={i} className="text-xs font-medium text-white/60 px-1">{label}</span>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
        {/* City */}
        <div>
          <label htmlFor="hero-city" className="sr-only">City</label>
          <select
            id="hero-city"
            name="city"
            value={citySlug}
            onChange={(e) => { setCitySlug(e.target.value); setSector(""); setSubSector(""); }}
            className={selectClass}
            style={{ color: "white", backgroundColor: "#1a1a1a" }}
          >
            <option value="">All Cities</option>
            {cities.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
          </select>
        </div>

        {/* Sector */}
        <div>
          <label htmlFor="hero-sector" className="sr-only">Sector</label>
          <select
            id="hero-sector"
            name="sector"
            value={sector}
            onChange={(e) => { setSector(e.target.value); setSubSector(""); }}
            className={selectClass}
            style={{ color: "white", backgroundColor: "#1a1a1a" }}
          >
            <option value="">All Sectors</option>
            {availableSectors.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {/* Sub-area */}
        <div>
          <label htmlFor="hero-subsector" className="sr-only">Sub-area</label>
          <select
            id="hero-subsector"
            name="subSector"
            value={subSector}
            onChange={(e) => setSubSector(e.target.value)}
            disabled={!sector || availableSubSectors.length === 0}
            className={`${selectClass} disabled:opacity-40 disabled:cursor-not-allowed`}
            style={{ color: "white", backgroundColor: "#1a1a1a" }}
          >
            <option value="">All Sub-areas</option>
            {availableSubSectors.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {/* Price */}
        <div>
          <label htmlFor="hero-price" className="sr-only">Price range</label>
          <select
            id="hero-price"
            name="price"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className={selectClass}
            style={{ color: "white", backgroundColor: "#1a1a1a" }}
          >
            <option value="">Any Price</option>
            {priceRanges.map((p, i) => <option key={i} value={i}>{p.label}</option>)}
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="h-12 w-full flex items-center justify-center gap-2 px-6 rounded-xl bg-gradient-gold text-primary-foreground font-semibold text-sm shadow-lg transition-transform hover:scale-[1.02] active:scale-100"
        >
          <Search className="w-4 h-4 shrink-0" aria-hidden="true" />
          Search
        </button>
      </div>
    </form>
  );
};

export default HeroSearch;
