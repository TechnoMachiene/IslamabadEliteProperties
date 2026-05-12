// ─────────────────────────────────────────────────────────────
// Twin Cities Real Estate — City / Sector / Sub-sector registry
// ─────────────────────────────────────────────────────────────

export interface SubSectorInfo {
  name: string;
  slug: string;
  description: string;
  invest: string;
}

export interface SectorInfo {
  name: string;
  slug: string;
  description: string;
  invest: string;
  subSectors: SubSectorInfo[];
}

export interface CityInfo {
  name: string;
  slug: string;
  tagline: string;
  highlights: { value: string; label: string }[];
  seoIntro: string;
  seoInvest: string;
  sectors: SectorInfo[];
}

// ─── City registry ─────────────────────────────────────────
export const cities: CityInfo[] = [
  // ── ISLAMABAD ──────────────────────────────────────────
  {
    name: "Islamabad",
    slug: "islamabad",
    tagline: "Pakistan's Capital — F-6, F-7 & F-8",
    highlights: [
      { value: "25+",     label: "Properties Listed"  },
      { value: "F-6 · F-7 · F-8", label: "Prime Sectors" },
      { value: "15+ Yrs", label: "Market Expertise"   },
    ],
    seoIntro:
      "Islamabad, Pakistan's planned capital city, is home to some of the most prestigious residential real estate in the country. Nestled against the Margalla Hills National Park, the city's premium sectors — F-6, F-7, and F-8 — represent the gold standard of luxury living. Wide tree-lined avenues, strict low-density zoning, and proximity to diplomatic enclaves make Islamabad's established sectors the preferred address for executives, ambassadors, and discerning investors. Whether you're searching for a sprawling kanal villa in F-6, an architecturally distinct designer home in F-7, or a modern penthouse in F-8, Islamabad's real estate market delivers unmatched quality and long-term capital appreciation.",
    seoInvest:
      "Investing in Islamabad real estate has historically delivered strong returns, with prime sectors averaging 8–12% annual appreciation. The city's status as the federal capital ensures sustained demand from senior government officials, diplomats, and multinational executives. Low property supply in F-6 and F-7, combined with increasing buyer competition, creates a seller's market that consistently rewards long-term investors. Pakistan's growing expat population and steady foreign direct investment further underpin Islamabad's position as the safest and most rewarding real estate market in the country.",
    sectors: [
      {
        name: "F-6",
        slug: "f-6",
        description:
          "Islamabad's most prestigious sector, adjacent to the Diplomatic Enclave. Known for ultra-luxury villas, wide avenues, and mature trees.",
        invest:
          "F-6 commands Islamabad's highest per-marla rates. Limited inventory and sustained demand from diplomats and C-suite executives drive consistent capital appreciation year on year.",
        subSectors: [
          {
            name: "F-6/1",
            slug: "1",
            description:
              "Prime sub-sector near Kohsar Market with elegant residences and tree-lined streets. Popular with embassy staff and international families.",
            invest:
              "Strong rental yields and capital growth, driven by proximity to the Diplomatic Enclave and international schools.",
          },
          {
            name: "F-6/2",
            slug: "2",
            description:
              "Ultra-exclusive address home to diplomatic villas and palatial estates. Some of Islamabad's most premium real estate is concentrated here.",
            invest:
              "Limited inventory and blue-chip demand ensure premium pricing and exceptional long-term returns.",
          },
          {
            name: "F-6/3",
            slug: "3",
            description:
              "Spectacular Margalla Hills views, large plot sizes, and Japanese-inspired gardens. A trophy location for the most discerning buyers.",
            invest:
              "Trophy sub-sector with consistent double-digit appreciation. Properties rarely enter the market and sell quickly at premium values.",
          },
          {
            name: "F-6/4",
            slug: "4",
            description:
              "A balanced mix of luxury apartments and family homes within walking distance of Kohsar Market and Super Market F-6.",
            invest:
              "Strong rental demand from young professionals and accessible entry prices make F-6/4 an excellent investment with solid yield.",
          },
        ],
      },
      {
        name: "F-7",
        slug: "f-7",
        description:
          "Islamabad's cultural and commercial heart. Home to Jinnah Super Market, top schools, and a vibrant, well-established residential community.",
        invest:
          "F-7 consistently outperforms the broader market. Strong rental yields and sustained buyer demand from families and professionals make it a perennial top performer.",
        subSectors: [
          {
            name: "F-7/1",
            slug: "1",
            description:
              "Heritage residences and classic family homes near Jinnah Super Market. A neighbourhood with deep community roots and excellent amenities.",
            invest:
              "High demand from families seeking a central location with community living. Values are underpinned by the sector's commercial proximity.",
          },
          {
            name: "F-7/2",
            slug: "2",
            description:
              "Islamabad's most sought-after sub-sector — luxury villas, panoramic Margalla Hills views, and a vibrant neighbourhood energy.",
            invest:
              "Consistent market outperformance. Ideal for buyers seeking lifestyle value, strong appreciation, and long-term wealth preservation.",
          },
          {
            name: "F-7/3",
            slug: "3",
            description:
              "Contemporary architecture and designer homes popular with young professionals and creative individuals.",
            invest:
              "Emerging hotspot with competitive pricing and strong growth potential as demand for architecturally distinct homes rises.",
          },
          {
            name: "F-7/4",
            slug: "4",
            description:
              "Grand estates and tech-forward smart homes on the largest plots in F-7. Combines space, privacy, and cutting-edge amenities.",
            invest:
              "Exceptional long-term value. Large plot sizes and ongoing modernisation drive significant appreciation for patient investors.",
          },
        ],
      },
      {
        name: "F-8",
        slug: "f-8",
        description:
          "A rapidly developing sector with modern infrastructure. Excellent access to F-8 Markaz, major hospitals, and the iconic Faisal Mosque.",
        invest:
          "F-8 offers the best value proposition in Islamabad's premium market — strong fundamentals at more competitive entry prices than F-6 or F-7.",
        subSectors: [
          {
            name: "F-8/1",
            slug: "1",
            description:
              "Premium penthouses and corner-plot mansions close to F-8 Markaz. A mix of modern high-rise living and classic family homes.",
            invest:
              "Strong professional demand from hospital and commercial proximity. Solid yields and steady price growth.",
          },
          {
            name: "F-8/2",
            slug: "2",
            description:
              "Near the Margalla foothills with mountain views and a peaceful residential character. Ideal for buyers seeking green surroundings.",
            invest:
              "Premium views and proximity to nature drive consistent price premiums over neighbouring sub-sectors.",
          },
          {
            name: "F-8/3",
            slug: "3",
            description:
              "Park-facing properties with veranda-style homes and an excellent community feel. Popular with established families.",
            invest:
              "Steady appreciation backed by strong family demand and the premium attached to park-facing addresses.",
          },
          {
            name: "F-8/4",
            slug: "4",
            description:
              "Mix of modern apartments and starter homes ideal for first-time buyers and rental investors.",
            invest:
              "Strong rental yields from hospital-adjacent demand. Accessible entry prices with solid upside as the sector matures.",
          },
        ],
      },
    ],
  },
  // ── RAWALPINDI ─────────────────────────────────────────
  {
    name: "Rawalpindi",
    slug: "rawalpindi",
    tagline: "Pakistan's Twin City — General Properties",
    highlights: [
      { value: "10+",     label: "Properties Listed"  },
      { value: "All Areas", label: "Across Rawalpindi" },
      { value: "10+ Yrs", label: "Market Expertise"   },
    ],
    seoIntro:
      "Rawalpindi, Pakistan's twin city to Islamabad, offers diverse residential opportunities across multiple neighborhoods and price points. From established cantonment areas to rapidly developing new sectors, Rawalpindi provides excellent options for families, professionals, and investors seeking value-driven real estate. Our curated portfolio spans various localities offering quality living with strong rental potential and steady capital appreciation.",
    seoInvest:
      "Rawalpindi's real estate market continues to demonstrate solid growth potential. Proximity to Islamabad, ongoing infrastructure development, and strong rental demand from professionals and families make Rawalpindi an attractive investment destination. Properties offer competitive entry prices with steady appreciation, making it ideal for value-conscious investors.",
    sectors: [
      {
        name: "General",
        slug: "general",
        description:
          "Properties across various areas and neighborhoods of Rawalpindi, offering diverse options to suit different preferences and budgets.",
        invest:
          "Diverse portfolio across Rawalpindi's growing neighborhoods with strong rental yields and appreciation potential.",
        subSectors: [
          {
            name: "All Properties",
            slug: "all",
            description:
              "Curated selection of properties across Rawalpindi including cantonment areas, new developments, and established neighborhoods.",
            invest:
              "Competitive entry prices with steady appreciation and strong rental demand make Rawalpindi an excellent value investment.",
          },
        ],
      },
    ],
  },
];

// ─── Helpers ───────────────────────────────────────────────
export const getCityBySlug = (slug: string): CityInfo | undefined =>
  cities.find((c) => c.slug === slug);

export const getSectorBySlug = (city: CityInfo, sectorSlug: string): SectorInfo | undefined =>
  city.sectors.find((s) => s.slug === sectorSlug);

export const getSubSectorBySlug = (sector: SectorInfo, subSlug: string): SubSectorInfo | undefined =>
  sector.subSectors.find((ss) => ss.slug === subSlug);

/** Flat array of all sector names for a given city slug */
export const citySectorNames = (citySlug: string): string[] =>
  getCityBySlug(citySlug)?.sectors.map((s) => s.name) ?? [];

/** Flat array of all sub-sector names for a given city+sector */
export const citySubSectorNames = (citySlug: string, sectorName: string): string[] => {
  const city = getCityBySlug(citySlug);
  const sector = city?.sectors.find((s) => s.name === sectorName);
  return sector?.subSectors.map((ss) => ss.name) ?? [];
};
