import { useEffect, useState } from "react";
import { useScroll } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StickySearchBar from "@/components/StickySearchBar";
import TrustStrip from "@/components/TrustStrip";
import FeaturedCarousel from "@/components/FeaturedCarousel";
import SectorHighlights from "@/components/SectorHighlights";
import ValueProps from "@/components/ValueProps";
import Testimonials from "@/components/Testimonials";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import PropertyModal from "@/components/PropertyModal";
import SEO, { SITE_URL, OG_IMAGE_DEFAULT, SITE_NAME } from "@/components/SEO";
import { Property } from "@/data/properties";

const agentSchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: SITE_NAME,
  description:
    "Premium real estate agency in Islamabad specialising in luxury properties for sale in F-6, F-7, and F-8 sectors.",
  url: SITE_URL,
  logo: OG_IMAGE_DEFAULT,
  image: OG_IMAGE_DEFAULT,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Islamabad",
    addressRegion: "Islamabad Capital Territory",
    addressCountry: "PK",
  },
  telephone: "+923001234567",
  email: "info@islamabadelite.pk",
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

const Index = () => {
  const [selected, setSelected] = useState<Property | null>(null);
  const [stickyVisible, setStickyVisible] = useState(false);

  // Framer Motion scroll tracker — zero-cost listener, no polling
  const { scrollY } = useScroll();

  useEffect(() => {
    // Hero is min-h-[100svh]. Threshold: show sticky bar after 75% of viewport height scrolled.
    const threshold = window.innerHeight * 0.75;
    const unsub = scrollY.on("change", (y) => setStickyVisible(y > threshold));
    return unsub;
  }, [scrollY]);

  return (
    <>
      <SEO
        title="Luxury Properties for Sale in Islamabad | F-6, F-7 & F-8"
        description="Browse 500+ luxury properties for sale in Islamabad. Premium villas, houses & apartments in F-6, F-7 & F-8. Expert agents, virtual tours & best deals."
        canonical={SITE_URL}
        ogImageAlt="Luxury real estate in Islamabad F-6 F-7 F-8 — Islamabad Elite Properties"
        keywords="properties for sale Islamabad, houses in F-6 F-7 F-8 Islamabad, luxury real estate Islamabad, buy property Islamabad"
      >
        <script type="application/ld+json">{JSON.stringify(agentSchema)}</script>
      </SEO>

      {/* ── Fixed chrome ─────────────────────────────────────── */}
      <Navbar />
      <StickySearchBar visible={stickyVisible} />

      {/* ── Conversion funnel ────────────────────────────────── */}
      <main>
        {/* 1. Emotion + primary search CTA */}
        <Hero />

        {/* 2. Instant credibility */}
        <TrustStrip />

        {/* 3. Featured listings */}
        <FeaturedCarousel onPropertyClick={setSelected} />

        {/* 4. Sector explorer + why us */}
        <SectorHighlights />

        {/* 5. Platform value proposition */}
        <ValueProps />

        {/* 6. Social proof */}
        <Testimonials />

        {/* 7. Closing CTA */}
        <FinalCTA />
      </main>

      <Footer />
      <PropertyModal property={selected} onClose={() => setSelected(null)} />
    </>
  );
};

export default Index;
