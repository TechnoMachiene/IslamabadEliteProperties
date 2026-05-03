import { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import PropertyModal from "@/components/PropertyModal";
import SEO, { SITE_URL, OG_IMAGE_DEFAULT } from "@/components/SEO";
import { citySectors, subSectors, priceRanges, Property, generatePropertySlug } from "@/data/properties";
import { cities } from "@/data/cities";
import { usePropertyStore } from "@/store/PropertyStoreContext";

const Properties = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selected, setSelected] = useState<Property | null>(null);
  const [expandedListings, setExpandedListings] = useState(false);
  const { properties } = usePropertyStore();

  const citySlug  = searchParams.get("city")      || "";
  const sector    = searchParams.get("sector")    || "";
  const subSector = searchParams.get("subSector") || "";
  const priceIdx  = searchParams.get("price")     || "";

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set(key, value); else params.delete(key);
    if (key === "city")   { params.delete("sector"); params.delete("subSector"); }
    if (key === "sector") { params.delete("subSector"); }
    setSearchParams(params);
  };

  // Dynamic sector options based on selected city
  const availableSectors    = citySlug ? (citySectors[citySlug] ?? []) : Object.keys(citySectors).flatMap((c) => citySectors[c]);
  const availableSubSectors = sector ? (subSectors[sector] ?? []) : [];

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      if (citySlug  && p.city      !== citySlug)  return false;
      if (sector    && p.sector    !== sector)    return false;
      if (subSector && p.subSector !== subSector) return false;
      if (priceIdx !== "") {
        const range = priceRanges[parseInt(priceIdx)];
        if (range && (p.price < range.min || p.price >= range.max)) return false;
      }
      return true;
    });
  }, [properties, citySlug, sector, subSector, priceIdx]);

  const cityName  = cities.find((c) => c.slug === citySlug)?.name ?? "";
  const seoTitle  = subSector
    ? `${subSector} Properties for Sale ${cityName || "Islamabad"} | IEP`
    : sector
    ? `${sector} Properties for Sale in ${cityName || "Twin Cities"} | IEP`
    : citySlug
    ? `Luxury Properties in ${cityName} | Twin Cities Real Estate`
    : "Properties for Sale in Islamabad & Rawalpindi | Twin Cities";

  const seoDesc = `Browse ${filtered.length}+ luxury properties for sale${cityName ? ` in ${cityName}` : " across the Twin Cities"}. ${sector ? sector + " · " : ""}Verified listings, virtual tours & expert agents.`;

  const listingSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: seoTitle,
    numberOfItems: filtered.length,
    itemListElement: filtered.slice(0, 10).map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "RealEstateListing",
        name: p.title,
        url: `${SITE_URL}/property/${generatePropertySlug(p)}`,
        price: p.price,
        priceCurrency: "PKR",
        image: `${SITE_URL}${p.images[0]}`,
      },
    })),
  };

  return (
    <>
      <SEO
        title={seoTitle}
        description={seoDesc}
        canonical={`${SITE_URL}/properties`}
        ogImage={OG_IMAGE_DEFAULT}
        ogImageAlt={`Properties for sale ${cityName || "Twin Cities"}`}
        keywords={`properties for sale ${cityName || "Islamabad Rawalpindi"}, luxury real estate twin cities, buy property islamabad rawalpindi`}
      >
        <script type="application/ld+json">{JSON.stringify(listingSchema)}</script>
      </SEO>

      <Navbar />
      <main className="pt-24 pb-16 min-h-screen bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
              {subSector  ? `Properties for Sale in ${subSector} ${cityName}`
               : sector   ? `Properties for Sale in ${sector} ${cityName}`
               : citySlug ? `Properties for Sale in ${cityName}`
               : "Properties for Sale in the Twin Cities"}
            </h1>
            <p className="text-muted-foreground">{filtered.length} properties found</p>
          </div>

          {/* ── Filters ──────────────────────────────────────── */}
          <div className="flex flex-wrap gap-3 mb-8 p-4 rounded-2xl bg-card border border-border">
            {/* City */}
            <div className="flex flex-col gap-1">
              <label htmlFor="filter-city" className="sr-only">City</label>
              <select
                id="filter-city"
                name="city"
                value={citySlug}
                onChange={(e) => updateFilter("city", e.target.value)}
                className="min-h-[44px] px-4 py-2.5 rounded-xl bg-muted text-foreground border border-border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">All Cities</option>
                {cities.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
              </select>
            </div>

            {/* Sector */}
            <div className="flex flex-col gap-1">
              <label htmlFor="filter-sector" className="sr-only">Sector</label>
              <select
                id="filter-sector"
                name="sector"
                value={sector}
                onChange={(e) => updateFilter("sector", e.target.value)}
                className="min-h-[44px] px-4 py-2.5 rounded-xl bg-muted text-foreground border border-border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">All Sectors</option>
                {availableSectors.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            {/* Sub-area */}
            <div className="flex flex-col gap-1">
              <label htmlFor="filter-subsector" className="sr-only">Sub-area</label>
              <select
                id="filter-subsector"
                name="subSector"
                value={subSector}
                onChange={(e) => updateFilter("subSector", e.target.value)}
                disabled={!sector || availableSubSectors.length === 0}
                className="min-h-[44px] px-4 py-2.5 rounded-xl bg-muted text-foreground border border-border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">All Sub-areas</option>
                {availableSubSectors.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            {/* Price */}
            <div className="flex flex-col gap-1">
              <label htmlFor="filter-price" className="sr-only">Price range</label>
              <select
                id="filter-price"
                name="price"
                value={priceIdx}
                onChange={(e) => updateFilter("price", e.target.value)}
                className="min-h-[44px] px-4 py-2.5 rounded-xl bg-muted text-foreground border border-border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Any Price</option>
                {priceRanges.map((p, i) => <option key={i} value={i}>{p.label}</option>)}
              </select>
            </div>

            {(citySlug || sector || subSector || priceIdx) && (
              <button
                type="button"
                onClick={() => setSearchParams({})}
                className="min-h-[44px] px-4 py-2.5 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>

          {/* ── Grid ─────────────────────────────────────────── */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p, i) => (
                <PropertyCard key={p.id} property={p} onClick={setSelected} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl font-display font-semibold text-foreground mb-2">No properties found</p>
              <p className="text-muted-foreground">Try adjusting your filters to see more results.</p>
            </div>
          )}

          {/* Crawlable links */}
          {filtered.length > 0 && (
            <nav aria-label="Property listings" className="mt-8 pt-6 border-t border-border">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-display font-semibold text-foreground">All Listed Properties</h2>
                {filtered.length > 8 && !expandedListings && (
                  <button
                    onClick={() => setExpandedListings(true)}
                    className="text-primary font-medium hover:underline flex items-center gap-1 transition-colors"
                  >
                    See more <span className="text-xl leading-none">›</span>
                  </button>
                )}
                {expandedListings && filtered.length > 8 && (
                  <button
                    onClick={() => setExpandedListings(false)}
                    className="text-primary font-medium hover:underline flex items-center gap-1 transition-colors"
                  >
                    Show less <span className="text-xl leading-none rotate-180 inline-block">›</span>
                  </button>
                )}
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {filtered.slice(0, expandedListings ? undefined : 8).map((p) => (
                  <li key={p.id}>
                    <Link to={`/property/${generatePropertySlug(p)}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {p.title} — {p.area} {p.areaUnit} {p.type} in {p.subSector}, {cities.find(c => c.slug === p.city)?.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {/* City quick links */}
          <section className="mt-12">
            <h2 className="text-xl font-display font-semibold text-foreground mb-4">Browse by City</h2>
            <div className="flex flex-wrap gap-3">
              {cities.map((city) =>
                city.sectors.map((s) => (
                  <Link
                    key={`${city.slug}-${s.slug}`}
                    to={`/${city.slug}/${s.slug}`}
                    className="px-5 py-3 rounded-xl bg-card border border-border text-foreground font-medium hover:bg-accent hover:text-accent-foreground transition-colors text-sm"
                  >
                    {s.name} — {city.name} →
                  </Link>
                ))
              )}
            </div>
          </section>
        </div>
      </main>

      <Footer />
      <PropertyModal property={selected} onClose={() => setSelected(null)} />
    </>
  );
};

export default Properties;
