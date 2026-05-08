import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getProperties } from "@/lib/supabase-server";
import { generatePropertySlug } from "@/data/properties";
import { cities } from "@/data/cities";
import { SITE_URL } from "../layout";
import PropertyListingClient from "@/components/PropertyListingClient";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "All Properties for Sale in Islamabad & Rawalpindi",
  description:
    "Browse our complete portfolio of luxury properties for sale in Islamabad and Rawalpindi. Filter by sector, price, bedrooms and type. Villas, houses & apartments.",
  alternates: { canonical: `${SITE_URL}/properties` },
  openGraph: {
    title: "All Properties for Sale in Islamabad & Rawalpindi",
    description: "Complete portfolio of luxury properties — F-6, F-7, F-8 Islamabad and Bahria Town, DHA Rawalpindi.",
    url: `${SITE_URL}/properties`,
  },
};

export default async function PropertiesPage() {
  const allProperties = await getProperties();

  return (
    <>
      <Navbar />

      <main className="pt-20 pb-16 min-h-screen bg-background">
        <div className="container mx-auto px-4 sm:px-6">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
            <ol className="flex items-center gap-1.5">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li>/</li>
              <li><span className="text-foreground font-medium">Properties</span></li>
            </ol>
          </nav>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
            All Properties for Sale — Twin Cities
          </h1>
          <p className="text-muted-foreground mb-8">
            {allProperties.length}+ verified luxury properties in Islamabad and Rawalpindi
          </p>

          {/* City quick-filter links (SSR) */}
          <div className="flex flex-wrap gap-3 mb-8">
            {cities.map((city) => (
              <Link
                key={city.slug}
                href={`/${city.slug}`}
                className="px-5 py-2.5 rounded-xl bg-card border border-border text-foreground text-sm font-medium hover:border-primary/40 hover:shadow-sm transition-all"
              >
                {city.name} Properties
              </Link>
            ))}
            {cities.filter((city) => city.slug === "islamabad").flatMap((city) =>
              city.sectors.map((sector) => (
                <Link
                  key={`${city.slug}-${sector.slug}`}
                  href={`/${city.slug}/${sector.slug}`}
                  className="px-4 py-2 rounded-xl bg-muted text-muted-foreground text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  {sector.name}
                </Link>
              ))
            )}
          </div>

          {/* Client component for interactive filtering + grid */}
          <PropertyListingClient initialProperties={allProperties} />

          {/* SSR crawlable list */}
          <nav aria-label="All property listings" className="mt-12 pt-8 border-t border-border">
            <h2 className="text-lg font-display font-semibold text-foreground mb-4">
              All Available Properties
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {allProperties.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/property/${generatePropertySlug(p)}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {p.title} — {p.area} {p.areaUnit} {p.type} in {p.subSector} ·{" "}
                    PKR {p.priceFormatted}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* SEO text */}
          <section className="mt-14 max-w-3xl">
            <h2 className="text-xl sm:text-2xl font-display font-semibold text-foreground mb-4">
              Luxury Properties for Sale in Islamabad &amp; Rawalpindi
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base mb-4">
              Islamabad Elite Properties offers the most comprehensive portfolio of verified luxury
              properties for sale across the Twin Cities — Islamabad and Rawalpindi. Our listings
              span Islamabad's most prestigious sectors (F-6, F-7 and F-8) and Rawalpindi's premier
              communities (Bahria Town and DHA Rawalpindi), giving buyers unmatched choice across
              every price point and property type.
            </p>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              Every listing is personally verified by our agents. We offer physical site visits,
              virtual 360° tours, detailed documentation support, and expert negotiation on your
              behalf. Whether you are a first-time buyer, an investor seeking strong rental yields,
              or a seller looking to list your property at the best price, our team of seasoned
              real estate professionals is here to guide you through every step.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
