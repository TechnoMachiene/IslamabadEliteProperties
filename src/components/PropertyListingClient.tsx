"use client";

import { useState, useMemo } from "react";
import { Property } from "@/data/properties";
import PropertyGridClient from "./PropertyGridClient";
import { cities } from "@/data/cities";

interface PropertyListingClientProps {
  initialProperties: Property[];
}

export default function PropertyListingClient({ initialProperties }: PropertyListingClientProps) {
  const [cityFilter, setCityFilter] = useState("");
  const [sectorFilter, setSectorFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState<[number, number]>([0, 100_000_000]);

  const filtered = useMemo(() => {
    return initialProperties.filter((p) => {
      if (cityFilter && p.city !== cityFilter) return false;
      if (sectorFilter && p.sector !== sectorFilter) return false;
      if (typeFilter && p.type !== typeFilter) return false;
      if (p.price < priceFilter[0] || p.price > priceFilter[1]) return false;
      return true;
    });
  }, [cityFilter, sectorFilter, typeFilter, priceFilter]);

  const allSectors = Array.from(
    new Set(initialProperties.map((p) => p.sector))
  ).sort();
  const allTypes = Array.from(
    new Set(initialProperties.map((p) => p.type))
  ).sort();

  return (
    <>
      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-8 p-4 rounded-2xl bg-card border border-border">
        <select
          value={cityFilter}
          onChange={(e) => {
            setCityFilter(e.target.value);
            setSectorFilter("");
          }}
          className="px-4 py-2.5 rounded-xl bg-muted text-foreground border border-border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">All Cities</option>
          {cities.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>

        <select
          value={sectorFilter}
          onChange={(e) => setSectorFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl bg-muted text-foreground border border-border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">All Sectors</option>
          {allSectors.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl bg-muted text-foreground border border-border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">All Types</option>
          {allTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        {(cityFilter || sectorFilter || typeFilter) && (
          <button
            onClick={() => {
              setCityFilter("");
              setSectorFilter("");
              setTypeFilter("");
              setPriceFilter([0, 100_000_000]);
            }}
            className="px-4 py-2.5 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
          >
            Clear Filters
          </button>
        )}
      </div>

      <div className="text-sm text-muted-foreground mb-6">
        Showing {filtered.length} of {initialProperties.length} properties
      </div>

      <PropertyGridClient properties={filtered} />
    </>
  );
}
