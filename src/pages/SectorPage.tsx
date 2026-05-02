import { useState, useMemo } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import PropertyModal from "@/components/PropertyModal";
import SEO, { SITE_URL } from "@/components/SEO";
import { getCityBySlug, getSectorBySlug, getSubSectorBySlug } from "@/data/cities";
import { subSectorSeoContent, generatePropertySlug, Property } from "@/data/properties";
import { usePropertyStore } from "@/store/PropertyStoreContext";

interface Props {
  citySlug: string;
  /** Legacy prop: used by old /properties/f-6 and /f6 routes */
  legacySector?: string;
}

const SectorPage = ({ citySlug, legacySector }: Props) => {
  const { sectorSlug: sectorSlugParam, subNum } = useParams();
  const [selected, setSelected] = useState<Property | null>(null);
  const { properties } = usePropertyStore();

  const city = getCityBySlug(citySlug);
  if (!city) return <Navigate to="/" replace />;

  // Resolve sector: prefer param slug, fall back to legacySector matching by name
  const sector = legacySector
    ? city.sectors.find((s) => s.name === legacySector)
    : city.sectors.find((s) => s.slug === sectorSlugParam);

  if (!sector) return <Navigate to={`/${citySlug}`} replace />;

  // Sub-sector
  const subSectorInfo = subNum ? getSubSectorBySlug(sector, subNum) : undefined;
  const activeSubName = subSectorInfo?.name ?? "";

  // Canonical + SEO
  const sectorBase   = legacySector
    ? `properties/${sector.slug}` // legacy path style
    : `${citySlug}/${sector.slug}`;
  const canonicalUrl = `${SITE_URL}/${sectorBase}${subNum ? `/${subNum}` : ""}`;

  const seoTitle = activeSubName
    ? `${activeSubName} Properties for Sale ${city.name} | IEP`
    : `${sector.name} Properties for Sale in ${city.name} | IEP`;

  // Filter properties
  const filtered = useMemo(() => {
    return properties.filter((p) => {
      if (p.city !== citySlug) return false;
      if (p.sector !== sector.name) return false;
      if (activeSubName && p.subSector !== activeSubName) return false;
      return true;
    });
  }, [citySlug, sector.name, activeSubName]);

  const seoDesc = activeSubName
    ? `Browse ${filtered.length}+ properties for sale in ${activeSubName} ${city.name}. Luxury villas, houses & apartments. Expert agents & virtual tours.`
    : `Discover ${filtered.length}+ luxury properties for sale in ${sector.name} ${city.name}. Trusted real estate agents, virtual tours & best deals.`;

  // Nearby sectors
  const nearbySectors = city.sectors.filter((s) => s.slug !== sector.slug);

  // SEO content block — use cities.ts data, fall back to legacy subSectorSeoContent
  const seoContent = (() => {
    if (subSectorInfo) {
      const legacy = subSectorSeoContent[activeSubName];
      return legacy
        ? { intro: legacy.intro, invest: legacy.invest }
        : { intro: subSectorInfo.description, invest: subSectorInfo.invest };
    }
    return { intro: sector.description, invest: sector.invest };
  })();

  // JSON-LD
  const listingSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Properties for Sale in ${activeSubName || sector.name} ${city.name}`,
    description: seoDesc,
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
        address: { "@type": "PostalAddress", streetAddress: p.subSector, addressLocality: city.name, addressCountry: "PK" },
        image: `${SITE_URL}${p.images[0]}`,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home",          item: SITE_URL },
      { "@type": "ListItem", position: 2, name: city.name,        item: `${SITE_URL}/${citySlug}` },
      { "@type": "ListItem", position: 3, name: sector.name,      item: `${SITE_URL}/${sectorBase}` },
      ...(subNum && activeSubName
        ? [{ "@type": "ListItem", position: 4, name: activeSubName, item: canonicalUrl }]
        : []),
    ],
  };

  return (
    <>
      <SEO
        title={seoTitle}
        description={seoDesc}
        canonical={canonicalUrl}
        ogImageAlt={`Properties for sale in ${activeSubName || sector.name} ${city.name}`}
        keywords={`properties for sale ${sector.name} ${city.name}, houses in ${sector.name} ${city.name}, luxury real estate ${sector.name}`}
      >
        <script type="application/ld+json">{JSON.stringify(listingSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </SEO>

      <Navbar />
      <main className="pt-20 pb-16 min-h-screen bg-background">
        <div className="container mx-auto px-4 sm:px-6">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
            <ol className="flex items-center gap-1.5 flex-wrap">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li>/</li>
              <li><Link to={`/${citySlug}`} className="hover:text-primary transition-colors">{city.name}</Link></li>
              <li>/</li>
              <li>
                {subNum
                  ? <Link to={`/${sectorBase}`} className="hover:text-primary transition-colors">{sector.name}</Link>
                  : <span className="text-foreground font-medium">{sector.name}</span>
                }
              </li>
              {subNum && activeSubName && (
                <>
                  <li>/</li>
                  <li><span className="text-foreground font-medium">{activeSubName}</span></li>
                </>
              )}
            </ol>
          </nav>

          {/* Page header */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
              {activeSubName
                ? `Properties for Sale in ${activeSubName} ${city.name}`
                : `Properties for Sale in ${sector.name} ${city.name}`}
            </h1>
            <p className="text-muted-foreground">{filtered.length} properties found</p>
          </div>

          {/* Sub-sector links */}
          {!subNum && sector.subSectors.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg sm:text-xl font-display font-semibold text-foreground mb-4">
                Browse {sector.name} Sub-Areas
              </h2>
              <div className="flex flex-wrap gap-2">
                {sector.subSectors.map((ss) => (
                  <Link
                    key={ss.slug}
                    to={`/${sectorBase}/${ss.slug}`}
                    className="px-4 py-2 rounded-xl bg-muted text-foreground text-sm font-medium border border-border hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    {ss.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Property grid */}
          {filtered.length > 0 ? (
            <>
              <h2 className="text-lg sm:text-xl font-display font-semibold text-foreground mb-4">
                Available Properties in {activeSubName || sector.name}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((p, i) => (
                  <PropertyCard key={p.id} property={p} onClick={setSelected} index={i} />
                ))}
              </div>

              {/* SEO crawlable links */}
              <nav aria-label="Property listings" className="mt-8 pt-6 border-t border-border">
                <h3 className="text-base font-display font-semibold text-foreground mb-3">
                  All Properties in {activeSubName || sector.name}
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {filtered.map((p) => (
                    <li key={p.id}>
                      <Link
                        to={`/property/${generatePropertySlug(p)}`}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {p.title} — {p.area} {p.areaUnit} {p.type} in {p.subSector}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl font-display font-semibold text-foreground mb-2">No properties found</p>
              <p className="text-muted-foreground">No listings available in this area yet — check back soon.</p>
            </div>
          )}

          {/* SEO content block */}
          <section className="mt-14 sm:mt-16 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl sm:text-2xl font-display font-semibold text-foreground mb-3">
                About {activeSubName || sector.name}, {city.name}
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{seoContent.intro}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2 className="text-xl sm:text-2xl font-display font-semibold text-foreground mb-3">
                Why Invest in {activeSubName || sector.name}
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{seoContent.invest}</p>
            </motion.div>
          </section>

          {/* Explore nearby sectors */}
          <section className="mt-12">
            <h2 className="text-lg sm:text-xl font-display font-semibold text-foreground mb-4">
              Explore More in {city.name}
            </h2>
            <div className="flex flex-wrap gap-3">
              {nearbySectors.map((n) => (
                <Link
                  key={n.slug}
                  to={`/${citySlug}/${n.slug}`}
                  className="px-5 py-3 rounded-xl bg-card border border-border text-foreground font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  {n.name} Properties →
                </Link>
              ))}
              <Link
                to={`/${citySlug}`}
                className="px-5 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
              >
                All {city.name} Properties →
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
      <PropertyModal property={selected} onClose={() => setSelected(null)} />
    </>
  );
};

export default SectorPage;
