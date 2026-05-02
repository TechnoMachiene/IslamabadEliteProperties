import { useMemo } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyModal from "@/components/PropertyModal";
import SEO, { SITE_URL } from "@/components/SEO";
import { generatePropertySlug } from "@/data/properties";
import { usePropertyStore } from "@/store/PropertyStoreContext";

const PropertyPage = () => {
  const { slug } = useParams();
  const { properties, findBySlug } = usePropertyStore();
  const property = useMemo(() => (slug ? findBySlug(slug) : undefined), [slug, findBySlug]);

  if (!property) return <Navigate to="/properties" replace />;

  const sectorSlug = property.sector.toLowerCase();
  const sectorBase = `properties/${sectorSlug}`;
  const subNum = property.subSector.split("/")[1];
  const canonicalUrl = `${SITE_URL}/property/${slug}`;
  const ogImage = `${SITE_URL}${property.images[0]}`;

  // Title ≤ 60 chars
  const seoTitle = `${property.title} – ${property.subSector} | Islamabad Elite`;
  // Description 150–160 chars
  const seoDesc = `${property.area} ${property.areaUnit} ${property.type.toLowerCase()} for sale in ${property.subSector} Islamabad. ${property.bedrooms} bed, ${property.bathrooms} bath. PKR ${property.priceFormatted}. ${property.description.slice(0, 75)}.`;

  const relatedProperties = properties
    .filter((p) => p.id !== property.id && p.sector === property.sector)
    .slice(0, 3);

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
      addressLocality: "Islamabad",
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
    image: ogImage,
    datePosted: "2026-01-01",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Properties", item: `${SITE_URL}/properties` },
      { "@type": "ListItem", position: 3, name: `Sector ${property.sector}`, item: `${SITE_URL}/${sectorBase}` },
      { "@type": "ListItem", position: 4, name: property.subSector, item: `${SITE_URL}/${sectorBase}/${subNum}` },
      { "@type": "ListItem", position: 5, name: property.title, item: canonicalUrl },
    ],
  };

  return (
    <>
      <SEO
        title={seoTitle}
        description={seoDesc}
        canonical={canonicalUrl}
        ogImage={ogImage}
        ogImageAlt={`${property.title} in ${property.subSector} Islamabad`}
        ogType="article"
        keywords={`${property.type.toLowerCase()} for sale ${property.subSector} Islamabad, properties for sale Islamabad, buy property ${property.sector} Islamabad`}
      >
        <script type="application/ld+json">{JSON.stringify(listingSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </SEO>

      <Navbar />
      <main className="pt-24 pb-16 min-h-screen bg-background">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
            <ol className="flex items-center gap-1.5 flex-wrap">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li>/</li>
              <li><Link to="/properties" className="hover:text-primary transition-colors">Properties</Link></li>
              <li>/</li>
              <li><Link to={`/${sectorBase}`} className="hover:text-primary transition-colors">Sector {property.sector}</Link></li>
              <li>/</li>
              <li><Link to={`/${sectorBase}/${subNum}`} className="hover:text-primary transition-colors">{property.subSector}</Link></li>
              <li>/</li>
              <li><span className="text-foreground font-medium">{property.title}</span></li>
            </ol>
          </nav>

          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
            {property.title} – {property.area} {property.areaUnit} {property.type} for Sale in {property.subSector} Islamabad
          </h1>
          <p className="text-muted-foreground mb-8">
            PKR {property.priceFormatted} · {property.subSector}, Islamabad · {property.bedrooms} Beds · {property.bathrooms} Baths · {property.area} {property.areaUnit}
          </p>

          {/* Property images */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {property.images.map((img, i) => (
              <div key={i} className={`rounded-xl overflow-hidden ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}`}>
                <img
                  src={img}
                  alt={`${property.title} in ${property.subSector} Islamabad - Photo ${i + 1}`}
                  loading={i === 0 ? "eager" : "lazy"}
                  className="w-full h-full object-cover"
                  width={800}
                  height={600}
                />
              </div>
            ))}
          </div>

          {/* Details grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="p-4 rounded-xl bg-muted">
              <p className="text-sm text-muted-foreground">Bedrooms</p>
              <p className="font-display font-semibold text-foreground">{property.bedrooms}</p>
            </div>
            <div className="p-4 rounded-xl bg-muted">
              <p className="text-sm text-muted-foreground">Bathrooms</p>
              <p className="font-display font-semibold text-foreground">{property.bathrooms}</p>
            </div>
            <div className="p-4 rounded-xl bg-muted">
              <p className="text-sm text-muted-foreground">Parking</p>
              <p className="font-display font-semibold text-foreground">{property.parking}</p>
            </div>
            <div className="p-4 rounded-xl bg-muted">
              <p className="text-sm text-muted-foreground">Year Built</p>
              <p className="font-display font-semibold text-foreground">{property.yearBuilt}</p>
            </div>
          </div>

          {/* Description */}
          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-display font-semibold text-foreground mb-3">
              Property Description
            </h2>
            <p className="text-muted-foreground leading-relaxed">{property.description}</p>
          </section>

          {/* Features */}
          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-display font-semibold text-foreground mb-3">
              Features & Amenities
            </h2>
            <div className="flex flex-wrap gap-2">
              {property.features.map((f) => (
                <span key={f} className="px-3 py-1.5 rounded-full bg-accent text-accent-foreground text-sm">{f}</span>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3 mb-12">
            <a
              href={`https://wa.me/${property.agentPhone.replace(/\D/g, "")}?text=${encodeURIComponent(`Hi! I'm interested in "${property.title}" in ${property.subSector}. Price: PKR ${property.priceFormatted}. Please share more details.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-gold text-primary-foreground font-semibold text-sm transition-transform hover:scale-105"
            >
              WhatsApp Agent
            </a>
            <a
              href={`tel:${property.agentPhone}`}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border-2 border-border text-foreground font-semibold text-sm transition-colors hover:bg-muted"
            >
              Call Agent
            </a>
          </div>

          {/* Related properties */}
          {relatedProperties.length > 0 && (
            <section className="mb-12">
              <h2 className="text-xl md:text-2xl font-display font-semibold text-foreground mb-4">
                More Properties in {property.sector} Islamabad
              </h2>
              <div className="flex flex-wrap gap-3">
                {relatedProperties.map((rp) => (
                  <Link
                    key={rp.id}
                    to={`/property/${generatePropertySlug(rp)}`}
                    className="px-4 py-3 rounded-xl bg-card border border-border text-foreground text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    {rp.title} – {rp.subSector} →
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Internal links */}
          <section>
            <h2 className="text-xl md:text-2xl font-display font-semibold text-foreground mb-4">
              Explore More Sectors
            </h2>
            <div className="flex flex-wrap gap-3">
              <Link to="/properties/f-6" className="px-5 py-3 rounded-xl bg-card border border-border text-foreground font-medium hover:bg-accent hover:text-accent-foreground transition-colors">Properties in F-6 →</Link>
              <Link to="/properties/f-7" className="px-5 py-3 rounded-xl bg-card border border-border text-foreground font-medium hover:bg-accent hover:text-accent-foreground transition-colors">Properties in F-7 →</Link>
              <Link to="/properties/f-8" className="px-5 py-3 rounded-xl bg-card border border-border text-foreground font-medium hover:bg-accent hover:text-accent-foreground transition-colors">Properties in F-8 →</Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PropertyPage;
