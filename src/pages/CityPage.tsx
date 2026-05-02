import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Building2, MapPin, TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import PropertyModal from "@/components/PropertyModal";
import SEO, { SITE_URL } from "@/components/SEO";
import { getCityBySlug } from "@/data/cities";
import { Property } from "@/data/properties";
import { usePropertyStore } from "@/store/PropertyStoreContext";

interface Props {
  citySlug: string;
}

const cardVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const CityPage = ({ citySlug }: Props) => {
  const city = getCityBySlug(citySlug);
  const [selected, setSelected] = useState<Property | null>(null);
  const { properties } = usePropertyStore();

  if (!city) return <Navigate to="/" replace />;

  const cityProperties = properties.filter((p) => p.city === citySlug);
  const featuredProps  = cityProperties.filter((p) => p.isFeatured).slice(0, 6);
  const displayProps   = featuredProps.length ? featuredProps : cityProperties.slice(0, 6);

  const canonicalUrl = `${SITE_URL}/${citySlug}`;
  const seoTitle     = `Luxury Properties in ${city.name} | Twin Cities Real Estate`;
  const seoDesc      = `Browse ${cityProperties.length}+ verified luxury properties for sale in ${city.name}. ${city.sectors.map(s => s.name).join(", ")} — expert agents, virtual tours & best prices.`;

  return (
    <>
      <SEO
        title={seoTitle}
        description={seoDesc}
        canonical={canonicalUrl}
        ogImageAlt={`Luxury real estate in ${city.name} — Twin Cities`}
        keywords={`properties for sale ${city.name}, luxury real estate ${city.name}, ${city.sectors.map(s => s.name + " " + city.name).join(", ")}`}
      />

      <Navbar />

      <main className="pt-16 md:pt-20">
        {/* ── City hero ────────────────────────────────────── */}
        <section className="relative bg-charcoal py-20 sm:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,hsl(38_70%_50%_/_0.10),transparent)]" aria-hidden="true" />
          <div className="relative container mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 }}
              className="max-w-3xl"
            >
              <p className="text-gold-light text-xs sm:text-sm font-medium tracking-[0.25em] uppercase mb-3">
                Twin Cities Real Estate
              </p>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold text-white leading-tight mb-5">
                Luxury Properties<br className="hidden sm:block" /> in {city.name}
              </h1>
              <p className="text-sm sm:text-base text-white/70 max-w-xl leading-relaxed mb-8">
                {city.tagline} — {cityProperties.length}+ verified listings across{" "}
                {city.sectors.map((s) => s.name).join(", ")}.
              </p>

              {/* City highlights */}
              <div className="flex flex-wrap gap-6">
                {city.highlights.map((h, i) => (
                  <div key={i}>
                    <p className="text-xl font-display font-bold text-gradient-gold">{h.value}</p>
                    <p className="text-xs text-white/50 mt-0.5">{h.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Sector navigator ─────────────────────────────── */}
        <section className="py-14 sm:py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="mb-10">
              <p className="text-primary text-xs font-medium tracking-[0.15em] uppercase mb-2">Browse by Area</p>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground">
                Prime Sectors in {city.name}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {city.sectors.map((sector, i) => {
                const sectorCount = cityProperties.filter((p) => p.sector === sector.name).length;
                return (
                  <motion.div
                    key={sector.slug}
                    custom={i}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="group"
                  >
                    <Link
                      to={`/${citySlug}/${sector.slug}`}
                      className="block p-6 sm:p-7 rounded-2xl bg-card border border-border hover:border-primary/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-display font-bold text-gradient-gold">{sector.name}</h3>
                        <span className="text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
                          {sectorCount} listings
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                        {sector.description}
                      </p>

                      {/* Sub-sector chips */}
                      {sector.subSectors.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {sector.subSectors.slice(0, 4).map((ss) => (
                            <Link
                              key={ss.slug}
                              to={`/${citySlug}/${sector.slug}/${ss.slug}`}
                              onClick={(e) => e.stopPropagation()}
                              className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                            >
                              {ss.name}
                            </Link>
                          ))}
                        </div>
                      )}

                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary group-hover:gap-3 transition-all duration-200">
                        View properties <ArrowRight className="w-4 h-4 shrink-0" />
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Featured listings ─────────────────────────────── */}
        {displayProps.length > 0 && (
          <section className="py-14 sm:py-16 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="flex items-end justify-between mb-10">
                <div>
                  <p className="text-primary text-xs font-medium tracking-[0.15em] uppercase mb-2">
                    Handpicked for You
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground">
                    Featured Properties in {city.name}
                  </h2>
                </div>
                <Link
                  to={`/properties?city=${citySlug}`}
                  className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:gap-3 transition-all"
                >
                  View all <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayProps.map((p, i) => (
                  <PropertyCard key={p.id} property={p} onClick={setSelected} index={i} />
                ))}
              </div>

              <div className="mt-8 text-center sm:hidden">
                <Link
                  to={`/properties?city=${citySlug}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-gold text-primary-foreground font-semibold text-sm"
                >
                  View All {city.name} Properties <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* ── Investment stats ──────────────────────────────── */}
        <section className="py-14 sm:py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
              {[
                { icon: Building2,  stat: `${cityProperties.length}+`, label: `Properties in ${city.name}` },
                { icon: MapPin,     stat: city.sectors.length.toString(), label: "Prime Sectors Covered" },
                { icon: TrendingUp, stat: "15+ Yrs", label: "Market Expertise" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex items-center gap-4 p-6 rounded-2xl bg-card border border-border"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-display font-bold text-gradient-gold">{item.stat}</p>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* SEO content */}
            <div className="max-w-3xl space-y-8">
              <div>
                <h2 className="text-xl sm:text-2xl font-display font-semibold text-foreground mb-3">
                  Real Estate in {city.name}
                </h2>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{city.seoIntro}</p>
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-display font-semibold text-foreground mb-3">
                  Why Invest in {city.name}
                </h2>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{city.seoInvest}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Internal links ────────────────────────────────── */}
        <section className="py-10 border-t border-border">
          <div className="container mx-auto px-4 sm:px-6">
            <p className="text-sm font-medium text-foreground mb-4">Explore all sectors:</p>
            <div className="flex flex-wrap gap-3">
              {city.sectors.flatMap((sector) =>
                sector.subSectors.map((ss) => (
                  <Link
                    key={`${sector.slug}-${ss.slug}`}
                    to={`/${citySlug}/${sector.slug}/${ss.slug}`}
                    className="px-4 py-2 rounded-xl bg-muted text-muted-foreground text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    {ss.name}
                  </Link>
                ))
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <PropertyModal property={selected} onClose={() => setSelected(null)} />
    </>
  );
};

export default CityPage;
