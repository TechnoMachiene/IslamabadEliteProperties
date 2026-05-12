import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, Shield, Star, TrendingUp, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import FeaturedCarouselWithModal from "@/components/FeaturedCarouselWithModal";
import SectorHighlights from "@/components/SectorHighlights";
import ValueProps from "@/components/ValueProps";
import Testimonials from "@/components/Testimonials";
import FinalCTA from "@/components/FinalCTA";
import { cities } from "@/data/cities";
import { properties, generatePropertySlug } from "@/data/properties";
import { SITE_URL, SITE_NAME, OG_IMAGE } from "./layout";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: {
    absolute: "Luxury Properties for Sale in Islamabad | F-6, F-7 & F-8 | Islamabad Elite Properties",
  },
  description:
    "Islamabad's premier real estate agency. Browse 500+ luxury villas, houses & apartments for sale in F-6, F-7 and F-8 sectors. Expert agents, virtual tours & best prices guaranteed.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "Luxury Properties for Sale in Islamabad | F-6, F-7 & F-8",
    description:
      "Browse 500+ luxury villas, houses & apartments in F-6, F-7 & F-8 Islamabad. Expert agents, virtual tours & best deals.",
    url: SITE_URL,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    title: "Luxury Properties for Sale in Islamabad | F-6, F-7 & F-8",
    description: "Browse 500+ luxury properties in Islamabad's most prestigious sectors.",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: SITE_NAME,
  description:
    "Islamabad's premier luxury real estate agency specialising in properties for sale in F-6, F-7, and F-8 sectors.",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.jpg`,
  image: OG_IMAGE,
  telephone: "+923001234567",
  email: "info@islamabadeliteproperties.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Islamabad",
    addressRegion: "Islamabad Capital Territory",
    addressCountry: "PK",
  },
  areaServed: [
    { "@type": "Place", name: "F-6, Islamabad" },
    { "@type": "Place", name: "F-7, Islamabad" },
    { "@type": "Place", name: "F-8, Islamabad" },
  ],
  sameAs: [
    "https://facebook.com/islamabadeliteproperties",
    "https://instagram.com/islamabadeliteproperties",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Which are the best sectors to buy property in Islamabad?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "F-6, F-7, and F-8 are Islamabad's most prestigious residential sectors. F-6 is adjacent to the Diplomatic Enclave and offers ultra-luxury villas. F-7 is the cultural and commercial heart with strong rental yields. F-8 offers modern infrastructure at competitive prices near F-8 Markaz and the Faisal Mosque.",
      },
    },
    {
      "@type": "Question",
      name: "What is the average property price in F-7 Islamabad?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Property prices in F-7 Islamabad range from PKR 9.5 Crore for 10-Marla houses to PKR 40 Crore and above for 2-Kanal villas. Sub-sectors F-7/1 and F-7/2 command the highest premiums due to their central location and Margalla Hills views.",
      },
    },
    {
      "@type": "Question",
      name: "Is it a good time to invest in Islamabad real estate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Prime Islamabad sectors historically deliver 8–12% annual appreciation. Low supply in F-6 and F-7, sustained demand from diplomats and government officials, and a growing expat population make Islamabad real estate one of Pakistan's most reliable long-term investments.",
      },
    },
  ],
};

const islamabad = cities.find((c) => c.slug === "islamabad")!;
const featuredProps = properties.filter((p) => p.isFeatured).slice(0, 6);

export default function HomePage() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href="/hero-islamabad.webp"
        imageSrcSet="/hero-islamabad-sm.webp 1024w, /hero-islamabad.webp 1920w"
        imageSizes="100vw"
        fetchPriority="high"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Navbar />

      {/* ── Hero (client component — animation) ─────────────── */}
      <Hero />

      <main>
        {/* ── Trust strip ─────────────────────────────────────── */}
        <TrustStrip />

        {/* ── SSR anchor: H1 + intro text ─────────────────────── */}
        <section className="py-16 sm:py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto text-center mb-14">
              <p className="text-primary text-xs font-medium tracking-[0.2em] uppercase mb-3">
                Islamabad's Premier Real Estate Agency
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground leading-tight mb-6">
                Luxury Properties for Sale in{" "}
                <span className="text-gradient-gold">Twin Cities</span>
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Islamabad Elite Properties is Pakistan's most trusted luxury real estate agency, specialising
                in premium houses, villas and apartments for sale in Islamabad's F-6, F-7 and F-8 sectors. With over 15 years of market expertise
                and more than 500 successful transactions, we connect discerning buyers with the finest
                residential properties in the Twin Cities.
              </p>
            </div>

            {/* ── Sector links grid ────────────────────────── */}
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground text-center mb-8">
              Explore Premium Sectors in Islamabad
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
              {islamabad.sectors.map((sector) => (
                <div
                  key={sector.slug}
                  className="group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/40 hover:shadow-lg transition-all duration-300"
                >
                  <Link
                    href={`/islamabad/${sector.slug}`}
                    className="absolute inset-0 z-10 rounded-2xl"
                    aria-label={`Browse ${sector.name} properties in Islamabad`}
                  />
                  <div className="relative z-20 pointer-events-none">
                    <h3 className="text-xl font-display font-bold text-gradient-gold mb-2">
                      {sector.name} Properties
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {sector.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-4 pointer-events-auto">
                      {sector.subSectors.map((ss) => (
                        <Link
                          key={ss.slug}
                          href={`/islamabad/${sector.slug}/${ss.slug}`}
                          className="relative z-30 text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                        >
                          {ss.name}
                        </Link>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary group-hover:gap-3 transition-all">
                      Browse {sector.name} <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Featured carousel (client component) ────────────── */}
        <FeaturedCarouselWithModal />

        {/* ── SSR: About Islamabad real estate ─────────────────── */}
        <section className="py-16 sm:py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-6">
                Introduction to Islamabad Real Estate
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                Islamabad, Pakistan's planned capital city, is nestled against the breathtaking Margalla Hills
                National Park in the Potohar Plateau region. Designed by Greek architect Konstantinos
                Doxiadis in the 1960s, the city is celebrated for its orderly grid of sectors, wide
                tree-lined boulevards, and an exceptionally high standard of civic infrastructure. Among all
                major Pakistani cities, Islamabad consistently ranks first for quality of life, urban
                planning, security, and environmental cleanliness.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                The residential real estate market in Islamabad is anchored by the F-series sectors — F-6,
                F-7 and F-8 — which represent the gold standard of premium urban living in Pakistan. These
                sectors are characterised by large residential plots (typically 10 Marla to 4 Kanal), strict
                low-density zoning, proximity to the Diplomatic Enclave, and access to the country's finest
                schools, hospitals and commercial markets including Jinnah Super Market, Kohsar Market and
                F-8 Markaz.
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                Whether you are seeking a 1-Kanal family home in F-7/2 with Margalla Hills views, a
                palatial diplomat's villa in F-6, a modern penthouse in F-8, or an investment-grade
                property in Bahria Town or DHA Rawalpindi, Islamabad Elite Properties offers the most
                comprehensive portfolio of verified luxury listings in the Twin Cities.
              </p>
            </div>

            {/* ── Stats ────────────────────────────────────────── */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-12">
              {[
                { icon: Building2,  stat: "500+",    label: "Properties Sold"    },
                { icon: Users,      stat: "15+ Yrs", label: "Market Expertise"   },
                { icon: Star,       stat: "98%",     label: "Client Satisfaction" },
                { icon: TrendingUp, stat: "8–12%",   label: "Avg. Annual Gains"  },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col items-center text-center p-5 rounded-2xl bg-card border border-border"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-2xl font-display font-bold text-gradient-gold">{item.stat}</p>
                  <p className="text-xs text-muted-foreground mt-1">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SSR: Sector overviews ─────────────────────────────── */}
        <section className="py-16 sm:py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-10">
              Overview of Islamabad's Premier Sectors
            </h2>

            <div className="space-y-10">
              <article>
                <h3 className="text-xl font-display font-semibold text-foreground mb-3">
                  <Link href="/islamabad/f-6" className="hover:text-primary transition-colors">
                    Sector F-6 — The Diplomatic Address
                  </Link>
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base mb-3">
                  F-6 is universally regarded as Islamabad's most prestigious residential sector. Located
                  directly adjacent to the Diplomatic Enclave, it is home to embassies, high commissions,
                  and the residences of foreign ambassadors and senior government officials. Properties
                  here range from elegant 14-Marla family homes to palatial 4-Kanal estates — the very
                  pinnacle of Pakistani luxury real estate. Sub-sectors F-6/1 and F-6/2 in particular
                  command Islamabad's highest per-marla rates and rarely enter the open market.
                </p>
                <div className="flex flex-wrap gap-2">
                  {islamabad.sectors[0].subSectors.map((ss) => (
                    <Link
                      key={ss.slug}
                      href={`/islamabad/f-6/${ss.slug}`}
                      className="px-3 py-1.5 rounded-xl bg-muted text-sm font-medium text-foreground hover:bg-accent transition-colors"
                    >
                      Properties in {ss.name}
                    </Link>
                  ))}
                </div>
              </article>

              <article>
                <h3 className="text-xl font-display font-semibold text-foreground mb-3">
                  <Link href="/islamabad/f-7" className="hover:text-primary transition-colors">
                    Sector F-7 — The Cultural &amp; Commercial Heart
                  </Link>
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base mb-3">
                  F-7 is Islamabad's most vibrant and well-connected residential sector. Home to the iconic
                  Jinnah Super Market, the sector offers an unmatched blend of community character,
                  commercial convenience, and premium residential living. F-7/2 is consistently ranked as
                  Islamabad's single most sought-after sub-sector — luxury villas here overlook the
                  Margalla Hills and regularly sell for upwards of PKR 20 Crore. Across F-7, strong rental
                  yields and sustained buyer demand make it a perennial top performer in the Islamabad
                  property market.
                </p>
                <div className="flex flex-wrap gap-2">
                  {islamabad.sectors[1].subSectors.map((ss) => (
                    <Link
                      key={ss.slug}
                      href={`/islamabad/f-7/${ss.slug}`}
                      className="px-3 py-1.5 rounded-xl bg-muted text-sm font-medium text-foreground hover:bg-accent transition-colors"
                    >
                      {ss.name} Houses for Sale
                    </Link>
                  ))}
                </div>
              </article>

              <article>
                <h3 className="text-xl font-display font-semibold text-foreground mb-3">
                  <Link href="/islamabad/f-8" className="hover:text-primary transition-colors">
                    Sector F-8 — Modern Living Near Faisal Mosque
                  </Link>
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base mb-3">
                  F-8 is rapidly emerging as one of Islamabad's most desirable sectors for modern buyers.
                  Offering excellent access to F-8 Markaz, PIMS Hospital, and the iconic Faisal Mosque,
                  it delivers premium urban living at more accessible entry prices than F-6 or F-7. F-8/2
                  borders the Margalla Hills foothills, providing stunning mountain views, while F-8/1
                  appeals to professionals seeking penthouses and corner-plot mansions close to major
                  hospitals and commercial centres.
                </p>
                <div className="flex flex-wrap gap-2">
                  {islamabad.sectors[2].subSectors.map((ss) => (
                    <Link
                      key={ss.slug}
                      href={`/islamabad/f-8/${ss.slug}`}
                      className="px-3 py-1.5 rounded-xl bg-muted text-sm font-medium text-foreground hover:bg-accent transition-colors"
                    >
                      {ss.name} Properties
                    </Link>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ── Sector highlights (client component) ────────────── */}
        <SectorHighlights />

        {/* ── Available property types ─────────────────────────── */}
        <section className="py-16 sm:py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground text-center mb-10">
              Available Property Types in Islamabad
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-8">
              {[
                { label: "Villas",       href: "/properties?type=Villa",      desc: "Detached luxury villas 1–4 Kanal" },
                { label: "Houses",       href: "/properties?type=House",      desc: "Family homes 7 Marla–2 Kanal" },
                { label: "Apartments",   href: "/properties?type=Apartment",  desc: "Premium flats & serviced suites" },
                { label: "Penthouses",   href: "/properties?type=Penthouse",  desc: "Sky-high panoramic residences" },
                { label: "Bungalows",    href: "/properties?type=Bungalow",   desc: "Single-storey garden residences" },
              ].map((t) => (
                <Link
                  key={t.label}
                  href={t.href}
                  className="group flex flex-col items-center text-center p-5 rounded-2xl bg-card border border-border hover:border-primary/40 hover:shadow-md transition-all"
                >
                  <Building2 className="w-7 h-7 text-primary mb-2" />
                  <p className="font-display font-semibold text-foreground text-sm mb-1">{t.label}</p>
                  <p className="text-xs text-muted-foreground">{t.desc}</p>
                </Link>
              ))}
            </div>

            {/* SSR featured property links for crawlers */}
            <nav aria-label="Featured property listings" className="mt-10">
              <h3 className="text-lg font-display font-semibold text-foreground mb-4">
                Featured Properties for Sale
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {featuredProps.map((p) => (
                  <li key={p.id}>
                    <Link
                      href={`/property/${generatePropertySlug(p)}`}
                      className="flex flex-col p-4 rounded-xl bg-card border border-border hover:border-primary/40 hover:shadow-sm transition-all"
                    >
                      <span className="font-display font-semibold text-foreground text-sm mb-1">
                        {p.title}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {p.subSector} · {p.area} {p.areaUnit} {p.type} · PKR {p.priceFormatted}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </section>

        {/* ── Value props (client component) ───────────────────── */}
        <ValueProps />

        {/* ── Testimonials (client component) ─────────────────── */}
        <Testimonials />

        {/* ── FAQ section (SSR for schema) ─────────────────────── */}
        <section className="py-16 sm:py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqSchema.mainEntity.map((q) => (
                <div key={q.name} className="border-b border-border pb-6">
                  <h3 className="font-display font-semibold text-foreground mb-2 text-base">
                    {q.name}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {q.acceptedAnswer.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Final CTA (client component) ─────────────────────── */}
        <FinalCTA />
      </main>

      <Footer />
    </>
  );
}
