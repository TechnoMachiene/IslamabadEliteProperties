"use client";

import { Property, generatePropertySlug } from "@/data/properties";
import PropertyCard from "./PropertyCard";

export default function PropertyGridClient({ properties }: { properties: Property[] }) {
  if (properties.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-xl font-display font-semibold text-foreground mb-2">No properties found</p>
        <p className="text-muted-foreground">Try adjusting your filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((p, i) => (
        <PropertyCard key={p.id} property={p} index={i} />
      ))}
    </div>
  );
}
