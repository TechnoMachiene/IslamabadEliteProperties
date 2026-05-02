import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Building2, MapPin, Shield, TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO, { SITE_URL } from "@/components/SEO";
import { cities } from "@/data/cities";
import { properties } from "@/data/properties";

const cardVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.55 } }),
};

const TwinCitiesPage = () => {
  const totalListings = properties.length;

  return (
    <>
      <SEO
        title="Twin Cities Real Estate | Islamabad & Rawalpindi Properties"
        description={`Browse ${totalListings}+ verified luxury properties across Islamabad and Rawalpindi. F-6, F-7, F-8, Bahria Town, DHA — premium real estate in the Twin Cities.`}
        canonical={`${SITE_URL}/twin-cities`}
        ogImageAlt="Twin Cities Real Estate — Islamabad & Rawalpindi"
        keywords="twin cities real estate, properties Islamabad Rawalpindi, luxury real estate F-6 F-7 F-8 Bahria Town DHA"
      />

      <Navbar />

      <main className="pt-16 md:pt-20">
        {/* ── Hero ─────────────────────────────────────────── */}
        <section className="relative bg-charcoal py-20 sm:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,hsl(38_70%_50%_/_0.12),transparent)]" aria-hidden="true" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-gold to-transparent" aria-hidden="true" />

          <div className="relative container mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-gold-light text-xs sm:text-sm font-medium tracking-[0.25em] uppercase mb-4">
                Pakistan's Capital Region
              </p>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold text-white leading-tight mb-5">
                Twin Cities<br className="hidden sm:block" />
                <span className="text-gradient-gold"> Real Estate</span>
              </h1>
              <p className="text-sm sm:text-base text-white/70 max-w-xl mx-auto leading-relaxed mb-10">
                Premium verified listings across Islamabad and Rawalpindi — F-6, F-7, F-8,
                Bahria Town, and DHA. Your trusted partner for the Twin Cities property market.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
                {[
                  { value: `${totalListings}+`, label: "Total Listings" },
                  { value: cities.length.toString(),   label: "Cities Covered" },
                  { value: cities.reduce((a, c) => a + c.sectors.length, 0).toString(), label: "Prime Sectors" },
                  { value: "15+ Yrs", label: "Market Expertise" },
                ].map((s, i) => (
                  <div key={i}>
                    <p className="text-2xl sm:text-3xl font-display font-bold text-gradient-gold">{s.value}</p>
                    <p className="text-xs text-white/50 mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── City cards ───────────────────────────────────── */}
        <section className="py-16 sm:py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <p className="text-primary text-xs font-medium tracking-[0.15em] uppercase mb-2">Choose Your City</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-foreground">
                Explore Both Cities
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {cities.map((city, i) => {
                const cityCount = properties.filter((p) => p.city === city.slug).length;
                return (
                  <motion.div
                    key={city.slug}
                    custom={i}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <Link
                      to={`/${city.slug}`}
                      className="group block p-8 sm:p-10 rounded-2xl bg-card border border-border hover:border-primary/40 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h2 className="text-2xl sm:text-3xl font-display font-bold text-gradient-gold mb-1">
                            {city.name}
                          </h2>
                          <p className="text-sm text-muted-foreground">{city.tagline}</p>
                        </div>
                        <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1.5 rounded-full shrink-0">
                          {cityCount} listings
                        </span>
                      </div>

                      <p className="text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                        {city.seoIntro.slice(0, 200)}…
                      </p>

                      {/* Sector chips */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {city.sectors.map((s) => (
                          <span
                            key={s.slug}
                            className="text-xs px-3 py-1.5 rounded-full bg-muted text-muted-foreground font-medium"
                          >
                            {s.name}
                          </span>
                        ))}
                      </div>

                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-3 transition-all duration-200">
                        Explore {city.name} properties <ArrowRight className="w-4 h-4 shrink-0" />
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Why Twin Cities ──────────────────────────────── */}
        <section className="py-16 sm:py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <p className="text-primary text-xs font-medium tracking-[0.15em] uppercase mb-2">Why Twin Cities</p>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-3">
                Pakistan's Most Strategic Real Estate Market
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
                The capital region offers unmatched stability, consistent appreciation, and a lifestyle
                that no other market in Pakistan can match.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { icon: Shield,     title: "Verified Listings",    desc: "Every property manually verified. No fake listings or misleading descriptions." },
                { icon: TrendingUp, title: "8–20% Annual Gains",   desc: "Prime sectors consistently outperform Pakistan's broader property market." },
                { icon: Building2,  title: "All Property Types",   desc: "Villas, houses, apartments, bungalows — across every budget and preference." },
                { icon: MapPin,     title: "Local Expert Agents",  desc: "Dedicated agents who know every street, sector, and sub-sector in the Twin Cities." },
              ].map((f, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <f.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── All sectors quick links ───────────────────────── */}
        <section className="py-10 border-t border-border">
          <div className="container mx-auto px-4 sm:px-6">
            <p className="text-sm font-medium text-foreground mb-4">Browse all sectors across both cities:</p>
            <div className="flex flex-wrap gap-3">
              {cities.flatMap((city) =>
                city.sectors.map((sector) => (
                  <Link
                    key={`${city.slug}-${sector.slug}`}
                    to={`/${city.slug}/${sector.slug}`}
                    className="px-4 py-2 rounded-xl bg-muted text-muted-foreground text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    {sector.name} — {city.name}
                  </Link>
                ))
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default TwinCitiesPage;
