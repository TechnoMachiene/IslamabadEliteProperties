import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getCityBySlug, cities } from "@/data/cities";
import { getProperties } from "@/lib/supabase-server";
import { generatePropertySlug, subSectorSeoContent } from "@/data/properties";
import { SITE_URL } from "../../../layout";
import PropertyGridClient from "@/components/PropertyGridClient";

export const revalidate = 3600;

export async function generateStaticParams() {
  return cities.flatMap((city) =>
    city.sectors.flatMap((sector) =>
      sector.subSectors.map((ss) => ({
        city: city.slug,
        sector: sector.slug,
        sub: ss.slug,
      }))
    )
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string; sector: string; sub: string }>;
}): Promise<Metadata> {
  const { city: citySlug, sector: sectorSlug, sub: subSlug } = await params;
  const city = getCityBySlug(citySlug);
  const sector = city?.sectors.find((s) => s.slug === sectorSlug);
  const subSector = sector?.subSectors.find((ss) => ss.slug === subSlug);
  if (!city || !sector || !subSector) return {};

  const canonical = `${SITE_URL}/${citySlug}/${sectorSlug}/${subSlug}`;
  const title = `${subSector.name} Properties for Sale in ${city.name} | Islamabad Elite Properties`;
  const description = `Browse luxury properties for sale in ${subSector.name} ${city.name}. Verified villas, houses & apartments with expert agents & virtual tours.`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical },
    keywords: [
      `properties for sale ${subSector.name}`,
      `${subSector.name} houses for sale`,
      `${subSector.name} ${city.name} real estate`,
    ],
  };
}

export default async function SubSectorPage({
  params,
}: {
  params: Promise<{ city: string; sector: string; sub: string }>;
}) {
  const { city: citySlug, sector: sectorSlug, sub: subSlug } = await params;
  const city = getCityBySlug(citySlug);
  const sector = city?.sectors.find((s) => s.slug === sectorSlug);
  const subSector = sector?.subSectors.find((ss) => ss.slug === subSlug);
  if (!city || !sector || !subSector) notFound();

  const allProps = await getProperties();
  const filtered = allProps.filter(
    (p) => p.city === citySlug && p.sector === sector.name && p.subSector === subSector.name
  );

  const nearbySectors = city.sectors.filter((s) => s.slug !== sectorSlug);
  const seoBlock = subSectorSeoContent[subSector.name] ?? {
    intro: subSector.description,
    invest: subSector.invest,
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home",           item: SITE_URL },
      { "@type": "ListItem", position: 2, name: city.name,         item: `${SITE_URL}/${citySlug}` },
      { "@type": "ListItem", position: 3, name: sector.name,       item: `${SITE_URL}/${citySlug}/${sectorSlug}` },
      { "@type": "ListItem", position: 4, name: subSector.name,    item: `${SITE_URL}/${citySlug}/${sectorSlug}/${subSlug}` },
    ],
  };

  const listingSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Properties for Sale in ${subSector.name} ${city.name}`,
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
        address: {
          "@type": "PostalAddress",
          streetAddress: subSector.name,
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

      <main className="pt-20 pb-16 min-h-screen bg-background">
        <div className="container mx-auto px-4 sm:px-6">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
            <ol className="flex items-center gap-1.5 flex-wrap">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li>/</li>
              <li><Link href={`/${citySlug}`} className="hover:text-primary transition-colors">{city.name}</Link></li>
              <li>/</li>
              <li><Link href={`/${citySlug}/${sectorSlug}`} className="hover:text-primary transition-colors">{sector.name}</Link></li>
              <li>/</li>
              <li><span className="text-foreground font-medium">{subSector.name}</span></li>
            </ol>
          </nav>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
            Properties for Sale in {subSector.name} {city.name}
          </h1>
          <p className="text-muted-foreground mb-8">{filtered.length} properties found</p>

          {/* Other sub-sectors */}
          <div className="mb-8">
            <h2 className="text-base font-display font-semibold text-foreground mb-3">
              Other {sector.name} Areas
            </h2>
            <div className="flex flex-wrap gap-2">
              {sector.subSectors
                .filter((ss) => ss.slug !== subSlug)
                .map((ss) => (
                  <Link
                    key={ss.slug}
                    href={`/${citySlug}/${sectorSlug}/${ss.slug}`}
                    className="px-4 py-2 rounded-xl bg-muted text-foreground text-sm font-medium border border-border hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    {ss.name}
                  </Link>
                ))}
            </div>
          </div>

          {/* SSR links */}
          {filtered.length > 0 && (
            <nav aria-label="Property listings" className="mb-8">
              <h2 className="text-lg font-display font-semibold text-foreground mb-4">
                Available Properties in {subSector.name}
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
                {filtered.map((p) => (
                  <li key={p.id}>
                    <Link
                      href={`/property/${generatePropertySlug(p)}`}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {p.title} — {p.area} {p.areaUnit} {p.type} · PKR {p.priceFormatted}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          <PropertyGridClient properties={filtered} />

          {/* SEO content */}
          <section className="mt-14 sm:mt-16 space-y-8 max-w-3xl">
            <div>
              <h2 className="text-xl sm:text-2xl font-display font-semibold text-foreground mb-3">
                About {subSector.name}, {city.name}
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                {seoBlock.intro}
              </p>
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-display font-semibold text-foreground mb-3">
                Why Invest in {subSector.name}
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                {seoBlock.invest}
              </p>
            </div>
          </section>

          {/* Explore more */}
          <section className="mt-12">
            <h2 className="text-lg sm:text-xl font-display font-semibold text-foreground mb-4">
              Explore More in {city.name}
            </h2>
            <div className="flex flex-wrap gap-3">
              {nearbySectors.map((n) => (
                <Link
                  key={n.slug}
                  href={`/${citySlug}/${n.slug}`}
                  className="px-5 py-3 rounded-xl bg-card border border-border text-foreground font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  {n.name} Properties →
                </Link>
              ))}
              <Link
                href={`/${citySlug}/${sectorSlug}`}
                className="px-5 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
              >
                All {sector.name} Properties →
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
