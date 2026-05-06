import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getProperties, getPropertyBySlug } from "@/lib/supabase-server";
import { generatePropertySlug, properties as staticProperties } from "@/data/properties";
import { getCityBySlug } from "@/data/cities";
import { SITE_URL, SITE_NAME } from "../../layout";
import PropertyContactClient from "@/components/PropertyContactClient";

export const revalidate = 3600;

export async function generateStaticParams() {
  return staticProperties.map((p) => ({ slug: generatePropertySlug(p) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property) return {};

  const canonical = `${SITE_URL}/property/${slug}`;
  const ogImage = `${SITE_URL}${property.images[0]}`;
  const title = `${property.title} - ${property.subSector}`;
  const description = `${property.area} ${property.areaUnit} ${property.type.toLowerCase()} for sale in ${property.subSector}. ${property.bedrooms} bed Â· ${property.bathrooms} bath Â· PKR ${property.priceFormatted}. ${property.description.slice(0, 80)}.`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
      images: [{ url: ogImage, width: 1200, height: 630, alt: property.title }],
    },
    twitter: { title, description, images: [ogImage] },
    keywords: [
      `${property.type.toLowerCase()} for sale ${property.subSector}`,
      `properties for sale ${property.sector} Islamabad`,
      `buy property ${property.sector}`,
    ],
  };
}

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property) notFound();

  const allProperties = await getProperties();
  const related = allProperties
    .filter((p) => p.id !== property.id && p.sector === property.sector)
    .slice(0, 3);

  const canonicalUrl = `${SITE_URL}/property/${slug}`;
  const citySlug = property.city;
  const sectorSlug = property.sector.toLowerCase().replace(/\s+/g, "-");
  const cityInfo = getCityBySlug(citySlug);
  const sectorInfo = cityInfo?.sectors.find((s) => s.slug === sectorSlug);
  const subSectorSlug = sectorInfo?.subSectors.find((ss) => ss.name === property.subSector)?.slug;
  const subSectorUrl = subSectorSlug
    ? `${SITE_URL}/${citySlug}/${sectorSlug}/${subSectorSlug}`
    : `${SITE_URL}/${citySlug}/${sectorSlug}`;

  const listingSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.title,
    description: property.description,
    url: canonicalUrl,
    price: property.price,
    priceCurrency: "PKR",
    address: {
      "@type": "PostalAddress",
      streetAddress: property.subSector,
      addressLocality: citySlug === "islamabad" ? "Islamabad" : "Rawalpindi",
      addressCountry: "PK",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: property.mapCoords.lat,
      longitude: property.mapCoords.lng,
    },
    numberOfRooms: property.bedrooms,
    numberOfBathroomsTotal: property.bathrooms,
    floorSize: {
      "@type": "QuantitativeValue",
      value: property.area,
      unitText: property.areaUnit,
    },
    image: `${SITE_URL}${property.images[0]}`,
    offers: {
      "@type": "Offer",
      price: property.price,
      priceCurrency: "PKR",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
      },
    },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home",              item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Properties",        item: `${SITE_URL}/properties` },
      { "@type": "ListItem", position: 3, name: property.sector,     item: `${SITE_URL}/${citySlug}/${sectorSlug}` },
      { "@type": "ListItem", position: 4, name: property.subSector,  item: subSectorUrl },
      { "@type": "ListItem", position: 5, name: property.title,      item: canonicalUrl },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <Navbar />

      <main className="pt-24 pb-16 min-h-screen bg-background">
        <div className="container mx-auto px-4">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
            <ol className="flex items-center gap-1.5 flex-wrap">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li>/</li>
              <li><Link href="/properties" className="hover:text-primary transition-colors">Properties</Link></li>
              <li>/</li>
              <li>
                <Link
                  href={`/${citySlug}/${sectorSlug}`}
                  className="hover:text-primary transition-colors"
                >
                  Sector {property.sector}
                </Link>
              </li>
              <li>/</li>
              <li><span className="text-foreground font-medium">{property.title}</span></li>
            </ol>
          </nav>

          {/* H1 */}
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
            {property.title} â€“ {property.area} {property.areaUnit} {property.type} for Sale in{" "}
            {property.subSector}
          </h1>
          <p className="text-muted-foreground mb-8">
            PKR {property.priceFormatted} Â· {property.subSector} Â·{" "}
            {property.bedrooms} Beds Â· {property.bathrooms} Baths Â· {property.area} {property.areaUnit}
          </p>

          {/* Images */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {property.images.map((img, i) => (
              <div
                key={i}
                className={`rounded-xl overflow-hidden ${
                  i === 0 ? "md:col-span-2 md:row-span-2" : ""
                }`}
              >
                <img
                  src={img}
                  alt={`${property.title} in ${property.subSector} â€“ Photo ${i + 1}`}
                  loading={i === 0 ? "eager" : "lazy"}
                  fetchPriority={i === 0 ? "high" : "auto"}
                  className="w-full h-full object-cover aspect-[4/3]"
                  width={800}
                  height={600}
                />
              </div>
            ))}
          </div>

          {/* Property specs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Bedrooms",  value: property.bedrooms  },
              { label: "Bathrooms", value: property.bathrooms },
              { label: "Parking",   value: property.parking   },
              { label: "Year Built",value: property.yearBuilt },
            ].map((s) => (
              <div key={s.label} className="p-4 rounded-xl bg-muted">
                <p className="text-sm text-muted-foreground">{s.label}</p>
                <p className="font-display font-semibold text-foreground">{s.value}</p>
              </div>
            ))}
          </div>

          {/* Description */}
          <section className="mb-8 max-w-3xl">
            <h2 className="text-xl md:text-2xl font-display font-semibold text-foreground mb-3">
              Property Description
            </h2>
            <p className="text-muted-foreground leading-relaxed">{property.description}</p>
          </section>

          {/* Features */}
          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-display font-semibold text-foreground mb-3">
              Features &amp; Amenities
            </h2>
            <div className="flex flex-wrap gap-2">
              {property.features.map((f) => (
                <span
                  key={f}
                  className="px-3 py-1.5 rounded-full bg-accent text-accent-foreground text-sm"
                >
                  {f}
                </span>
              ))}
            </div>
          </section>

          {/* CTA â€” client component handles WhatsApp link */}
          <PropertyContactClient property={property} />

          {/* Related properties â€” SSR links */}
          {related.length > 0 && (
            <section className="mb-12">
              <h2 className="text-xl md:text-2xl font-display font-semibold text-foreground mb-4">
                More Properties in {property.sector}
              </h2>
              <div className="flex flex-wrap gap-3">
                {related.map((rp) => (
                  <Link
                    key={rp.id}
                    href={`/property/${generatePropertySlug(rp)}`}
                    className="px-4 py-3 rounded-xl bg-card border border-border text-foreground text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    {rp.title} â€“ {rp.subSector} â†’
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Internal links */}
          <section>
            <h2 className="text-xl md:text-2xl font-display font-semibold text-foreground mb-4">
              Explore Islamabad Sectors
            </h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/islamabad/f-6" className="px-5 py-3 rounded-xl bg-card border border-border text-foreground font-medium hover:bg-accent hover:text-accent-foreground transition-colors">Properties in F-6 â†’</Link>
              <Link href="/islamabad/f-7" className="px-5 py-3 rounded-xl bg-card border border-border text-foreground font-medium hover:bg-accent hover:text-accent-foreground transition-colors">Properties in F-7 â†’</Link>
              <Link href="/islamabad/f-8" className="px-5 py-3 rounded-xl bg-card border border-border text-foreground font-medium hover:bg-accent hover:text-accent-foreground transition-colors">Properties in F-8 â†’</Link>
              <Link href="/rawalpindi/bahria-town" className="px-5 py-3 rounded-xl bg-card border border-border text-foreground font-medium hover:bg-accent hover:text-accent-foreground transition-colors">Bahria Town Properties â†’</Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
