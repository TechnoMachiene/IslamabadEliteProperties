import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Building2, MapPin, TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getCityBySlug, cities } from "@/data/cities";
import { getPropertiesByCity } from "@/lib/supabase-server";
import { generatePropertySlug } from "@/data/properties";
import { SITE_URL } from "../layout";
import PropertyGridClient from "@/components/PropertyGridClient";

export const revalidate = 3600;

export async function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) return {};
  const canonical = `${SITE_URL}/${citySlug}`;
  const title = `Luxury Properties for Sale in ${city.name}`;
  const description = `Browse verified luxury properties for sale in ${city.name}. Premium villas, houses & apartments in ${city.sectors.map((s) => s.name).join(", ")}. Expert agents & best prices.`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical },
    keywords: [
      `properties for sale ${city.name}`,
      `luxury real estate ${city.name}`,
      ...city.sectors.map((s) => `${s.name} ${city.name} properties`),
    ],
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();

  const cityProperties = await getPropertiesByCity(citySlug);
  const featuredProps = cityProperties.filter((p) => p.isFeatured).slice(0, 6);
  const displayProps = featuredProps.length ? featuredProps : cityProperties.slice(0, 6);

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: city.name, item: `${SITE_URL}/${citySlug}` },
    ],
  };

  const listingSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Properties for Sale in ${city.name}`,
    numberOfItems: cityProperties.length,
    itemListElement: displayProps.slice(0, 10).map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "RealEstateListing",
        name: p.title,
        url: `${SITE_URL}/property/${generatePropertySlug(p)}`,
        price: p.price,
        priceCurrency: "PKR",
        address: {
          "@type": "PostalAddress",
          streetAddress: p.subSector,
          addressLocality: city.name,
          addressCountry: "PK",
        },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listingSchema) }}
      />

      <Navbar />

      <main>
        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="relative bg-charcoal pt-24 pb-16 sm:pt-32 sm:pb-20 overflow-hidden">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(ellipse 80% 60% at 50% 100%, hsl(38 70% 50%), transparent)",
            }}
            aria-hidden="true"
          />
          <div className="relative container mx-auto px-4 sm:px-6 max-w-4xl">
            <nav aria-label="Breadcrumb" className="mb-6 text-sm text-white/50">
              <ol className="flex items-center gap-1.5">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>/</li>
                <li>
                  <span className="text-white/80 font-medium">{city.name}</span>
                </li>
              </ol>
            </nav>

            <p className="text-primary text-xs font-medium tracking-[0.25em] uppercase mb-3">
              Twin Cities Real Estate
            </p>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold text-white leading-tight mb-5">
              Luxury Properties<br className="hidden sm:block" /> in {city.name}
            </h1>
            <p className="text-base text-white/70 max-w-2xl leading-relaxed mb-8">
              {city.tagline} — {cityProperties.length}+ verified listings across{" "}
              {city.sectors.map((s) => s.name).join(", ")}.
            </p>

            <div className="flex flex-wrap gap-8">
              {city.highlights.map((h) => (
                <div key={h.label}>
                  <p className="text-2xl font-display font-bold text-gradient-gold">{h.value}</p>
                  <p className="text-xs text-white/50 mt-0.5">{h.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Sector grid ─────────────────────────────────────── */}
        {citySlug !== "rawalpindi" && (
          <section className="py-14 sm:py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-2">
              Prime Sectors in {city.name}
            </h2>
            <p className="text-muted-foreground mb-8">
              Browse {cityProperties.length}+ verified properties across {city.sectors.length}{" "}
              premier sectors
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {city.sectors.map((sector) => {
                const count = cityProperties.filter((p) => p.sector === sector.name).length;
                return (
                  <Link
                    key={sector.slug}
                    href={`/${citySlug}/${sector.slug}`}
                    className="group block p-6 sm:p-7 rounded-2xl bg-card border border-border hover:border-primary/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-display font-bold text-gradient-gold">
                        {sector.name}
                      </h3>
                      <span className="text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
                        {count} listings
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                      {sector.description}
                    </p>
                    {sector.subSectors.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {sector.subSectors.slice(0, 4).map((ss) => (
                          <span
                            key={ss.slug}
                            className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground"
                          >
                            {ss.name}
                          </span>
                        ))}
                      </div>
                    )}
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary group-hover:gap-3 transition-all">
                      View properties <ArrowRight className="w-4 h-4 shrink-0" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
          </section>
        )}

        {/* ── Featured properties ──────────────────────────────── */}
        {displayProps.length > 0 && (
          <section className="py-14 sm:py-16 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="flex items-end justify-between mb-8">
                <div>
                  <p className="text-primary text-xs font-medium tracking-[0.15em] uppercase mb-2">
                    Handpicked for You
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground">
                    Featured Properties in {city.name}
                  </h2>
                </div>
                <Link
                  href={`/properties?city=${citySlug}`}
                  className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:gap-3 transition-all"
                >
                  View all <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* SSR crawlable property links */}
              <nav aria-label="Featured listings" className="mb-8">
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {displayProps.map((p) => (
                    <li key={p.id}>
                      <Link
                        href={`/property/${generatePropertySlug(p)}`}
                        className="flex flex-col p-4 rounded-xl bg-card border border-border hover:border-primary/40 hover:shadow-sm transition-all"
                      >
                        <span className="font-display font-semibold text-foreground text-sm mb-1">
                          {p.title}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {p.subSector} · {p.area} {p.areaUnit} · PKR {p.priceFormatted}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Client-side interactive grid */}
              <PropertyGridClient properties={displayProps} />
            </div>
          </section>
        )}

        {/* ── Investment stats ─────────────────────────────────── */}
        <section className="py-14 sm:py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
              {[
                { icon: Building2,  stat: `${cityProperties.length}+`, label: `Properties in ${city.name}` },
                { icon: MapPin,     stat: city.sectors.length.toString(),   label: "Prime Sectors Covered"    },
                { icon: TrendingUp, stat: "15+ Yrs",                        label: "Market Expertise"          },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-4 p-6 rounded-2xl bg-card border border-border"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-display font-bold text-gradient-gold">{item.stat}</p>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="max-w-3xl space-y-8">
              <div>
                <h2 className="text-xl sm:text-2xl font-display font-semibold text-foreground mb-3">
                  Real Estate in {city.name}
                </h2>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                  {city.seoIntro}
                </p>
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-display font-semibold text-foreground mb-3">
                  Why Invest in {city.name}
                </h2>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                  {city.seoInvest}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Sub-sector quick links ───────────────────────────── */}
        <section className="py-10 border-t border-border">
          <div className="container mx-auto px-4 sm:px-6">
            <p className="text-sm font-medium text-foreground mb-4">
              Explore all areas in {city.name}:
            </p>
            <div className="flex flex-wrap gap-3">
              {city.sectors.flatMap((sector) =>
                sector.subSectors.map((ss) => (
                  <Link
                    key={`${sector.slug}-${ss.slug}`}
                    href={`/${citySlug}/${sector.slug}/${ss.slug}`}
                    className="px-4 py-2 rounded-xl bg-muted text-muted-foreground text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    {ss.name} Properties
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
}
