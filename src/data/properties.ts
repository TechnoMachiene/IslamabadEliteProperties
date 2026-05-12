// Images live in /public/images/ — served at stable paths, no Vite hashing.
// The same paths are used in the Supabase database so URLs always match.
export const smallImageMap: Record<string, string> = {
  "/images/property-1.webp": "/images/property-1-sm.webp",
  "/images/property-2.webp": "/images/property-2-sm.webp",
  "/images/property-3.webp": "/images/property-3-sm.webp",
  "/images/property-4.webp": "/images/property-4-sm.webp",
  "/images/property-5.webp": "/images/property-5-sm.webp",
  "/images/property-6.webp": "/images/property-6-sm.webp",
};

export interface Property {
  id: string;
  /** City slug: "islamabad" | "rawalpindi" */
  city: string;
  title: string;
  description: string;
  price: number;
  priceFormatted: string;
  /** Sector name — must match SectorInfo.name in cities.ts */
  sector: string;
  subSector: string;
  area: string;
  areaUnit: "Marla" | "Kanal";
  bedrooms: number;
  bathrooms: number;
  parking: number;
  features: string[];
  images: string[];
  videoUrl: string;
  isFeatured: boolean;
  type: "House" | "Villa" | "Apartment" | "Penthouse" | "Bungalow";
  yearBuilt: number;
  agentPhone: string;
}

const imgs = [
  "/images/property-1.webp",
  "/images/property-2.webp",
  "/images/property-3.webp",
  "/images/property-4.webp",
  "/images/property-5.webp",
  "/images/property-6.webp",
];
const pick = (i: number) => imgs[i % imgs.length];
const YT = "https://www.youtube.com/embed/dQw4w9WgXcQ";
const AGENT = "+923062091111"; // Default agent phone for properties

export const properties: Property[] = [
  // ── ISLAMABAD — F-7 ────────────────────────────────────
  { id: "1",  city: "islamabad", title: "Modern Luxury Villa",      description: "Exquisitely designed 1 Kanal villa in the heart of F-7/2 with panoramic Margalla Hills views. Features Italian marble flooring, imported fixtures, smart home automation, and a private rooftop terrace.", price: 180000000, priceFormatted: "18 Crore",  sector: "F-7", subSector: "F-7/2", area: "1",  areaUnit: "Kanal", bedrooms: 6,  bathrooms: 7,  parking: 3, features: ["Smart Home","Pool","Rooftop Terrace","Marble Flooring","CCTV"],         images: [pick(0),pick(1),pick(2)], videoUrl: YT, isFeatured: true,  type: "Villa",      yearBuilt: 2023, agentPhone: AGENT },
  { id: "4",  city: "islamabad", title: "Classic Family Home",       description: "Well-maintained 1 Kanal family residence in F-7/1 with spacious rooms, a large drawing room, and beautiful front lawn.",                                                                                        price: 150000000, priceFormatted: "15 Crore",  sector: "F-7", subSector: "F-7/1", area: "1",  areaUnit: "Kanal", bedrooms: 5,  bathrooms: 6,  parking: 2, features: ["Lawn","Servant Quarter","Study Room","Store Room"],                 images: [pick(2),pick(3),pick(1)], videoUrl: YT, isFeatured: false, type: "House",      yearBuilt: 2018, agentPhone: AGENT },
  { id: "7",  city: "islamabad", title: "Designer House",            description: "Tastefully designed 12 Marla house in F-7/3 with custom woodwork, imported kitchen, and landscaped backyard.",                                                                                                 price: 110000000, priceFormatted: "11 Crore",  sector: "F-7", subSector: "F-7/3", area: "12", areaUnit: "Marla", bedrooms: 5,  bathrooms: 5,  parking: 2, features: ["Custom Woodwork","Imported Kitchen","Backyard"],                         images: [pick(3),pick(0),pick(4)], videoUrl: YT, isFeatured: false, type: "House",      yearBuilt: 2020, agentPhone: AGENT },
  { id: "10", city: "islamabad", title: "Grand Colonial Mansion",    description: "Majestic 2 Kanal colonial-style mansion in F-7/4 with grand entrance, ballroom, and manicured gardens.",                                                                                                     price: 400000000, priceFormatted: "40 Crore",  sector: "F-7", subSector: "F-7/4", area: "2",  areaUnit: "Kanal", bedrooms: 10, bathrooms: 12, parking: 5, features: ["Ballroom","Gardens","Guest House","Security Gate"],                    images: [pick(4),pick(0),pick(5)], videoUrl: YT, isFeatured: true,  type: "Villa",      yearBuilt: 2019, agentPhone: AGENT },
  { id: "13", city: "islamabad", title: "Heritage Residence",        description: "Beautifully restored heritage house in F-7/1 combining classic Pakistani architecture with modern comfort.",                                                                                                    price: 200000000, priceFormatted: "20 Crore",  sector: "F-7", subSector: "F-7/1", area: "1",  areaUnit: "Kanal", bedrooms: 6,  bathrooms: 7,  parking: 3, features: ["Heritage Design","Restored","Central Location"],                        images: [pick(2),pick(0),pick(5)], videoUrl: YT, isFeatured: false, type: "House",      yearBuilt: 2020, agentPhone: AGENT },
  { id: "16", city: "islamabad", title: "Artist's Retreat",          description: "Unique 10 Marla property in F-7/2 with dedicated art studio, gallery wall, and creative living spaces.",                                                                                                       price: 95000000,  priceFormatted: "9.5 Crore", sector: "F-7", subSector: "F-7/2", area: "10", areaUnit: "Marla", bedrooms: 4,  bathrooms: 4,  parking: 1, features: ["Art Studio","Gallery Wall","Skylights"],                                  images: [pick(4),pick(5),pick(0)], videoUrl: YT, isFeatured: false, type: "House",      yearBuilt: 2021, agentPhone: AGENT },
  { id: "19", city: "islamabad", title: "Minimalist Cube",           description: "Architectural statement piece — a sleek 12 Marla minimalist home in F-7/3 with cubic design, hidden storage, and clean lines.",                                                                               price: 105000000, priceFormatted: "10.5 Crore",sector: "F-7", subSector: "F-7/3", area: "12", areaUnit: "Marla", bedrooms: 4,  bathrooms: 5,  parking: 2, features: ["Minimalist","Hidden Storage","LED Lighting"],                            images: [pick(3),pick(1),pick(4)], videoUrl: YT, isFeatured: false, type: "House",      yearBuilt: 2023, agentPhone: AGENT },
  { id: "21", city: "islamabad", title: "Smart Tech Home",           description: "Fully automated 14 Marla smart home in F-7/4 with voice-controlled everything, integrated security, and energy management.",                                                                                   price: 130000000, priceFormatted: "13 Crore",  sector: "F-7", subSector: "F-7/4", area: "14", areaUnit: "Marla", bedrooms: 5,  bathrooms: 5,  parking: 2, features: ["Full Automation","Voice Control","EV Charger","Solar"],                  images: [pick(0),pick(3),pick(5)], videoUrl: YT, isFeatured: false, type: "House",      yearBuilt: 2024, agentPhone: AGENT },
  { id: "24", city: "islamabad", title: "Mediterranean Villa",       description: "Mediterranean-inspired 1 Kanal villa in F-7/2 with terracotta roof, arched doorways, olive trees, and a courtyard fountain.",                                                                                  price: 220000000, priceFormatted: "22 Crore",  sector: "F-7", subSector: "F-7/2", area: "1",  areaUnit: "Kanal", bedrooms: 7,  bathrooms: 7,  parking: 3, features: ["Mediterranean","Fountain","Olive Garden","Wine Room"],                   images: [pick(4),pick(2),pick(0)], videoUrl: YT, isFeatured: false, type: "Villa",      yearBuilt: 2021, agentPhone: AGENT },
  // ── ISLAMABAD — F-6 ────────────────────────────────────
  { id: "2",  city: "islamabad", title: "Contemporary Residence",    description: "A stunning 14 Marla contemporary home in F-6/1 featuring floor-to-ceiling windows, open-plan living spaces, and a beautifully landscaped garden.",                                                           price: 120000000, priceFormatted: "12 Crore",  sector: "F-6", subSector: "F-6/1", area: "14", areaUnit: "Marla", bedrooms: 5,  bathrooms: 5,  parking: 2, features: ["Garden","Servant Quarter","Central Heating","Double Glazed"],         images: [pick(1),pick(0),pick(3)], videoUrl: YT, isFeatured: true,  type: "House",      yearBuilt: 2022, agentPhone: AGENT },
  { id: "5",  city: "islamabad", title: "Ultra-Modern Villa",        description: "Architectural masterpiece spanning 2 Kanals in F-6/2. Features infinity pool, home theater, wine cellar, and designer interiors.",                                                                          price: 350000000, priceFormatted: "35 Crore",  sector: "F-6", subSector: "F-6/2", area: "2",  areaUnit: "Kanal", bedrooms: 8,  bathrooms: 9,  parking: 4, features: ["Pool","Home Theater","Wine Cellar","Gym","Smart Home"],              images: [pick(1),pick(5),pick(0)], videoUrl: YT, isFeatured: true,  type: "Villa",      yearBuilt: 2024, agentPhone: AGENT },
  { id: "8",  city: "islamabad", title: "Margalla View Estate",      description: "Breathtaking 1 Kanal estate in F-6/3 with unobstructed Margalla Hills views, Japanese garden, and glass atrium.",                                                                                             price: 250000000, priceFormatted: "25 Crore",  sector: "F-6", subSector: "F-6/3", area: "1",  areaUnit: "Kanal", bedrooms: 7,  bathrooms: 7,  parking: 3, features: ["Margalla Views","Japanese Garden","Glass Atrium","Security"],         images: [pick(0),pick(5),pick(2)], videoUrl: YT, isFeatured: true,  type: "Villa",      yearBuilt: 2023, agentPhone: AGENT },
  { id: "11", city: "islamabad", title: "Serene Family Retreat",     description: "Peaceful 1 Kanal residence in F-6/4 surrounded by lush greenery. Features a private courtyard and meditation space.",                                                                                        price: 160000000, priceFormatted: "16 Crore",  sector: "F-6", subSector: "F-6/4", area: "1",  areaUnit: "Kanal", bedrooms: 6,  bathrooms: 6,  parking: 2, features: ["Courtyard","Meditation Room","Organic Garden"],                          images: [pick(2),pick(4),pick(0)], videoUrl: YT, isFeatured: false, type: "House",      yearBuilt: 2021, agentPhone: AGENT },
  { id: "14", city: "islamabad", title: "Eco-Smart Villa",           description: "LEED-certified green villa in F-6/1 with solar panels, rainwater harvesting, and sustainable materials throughout.",                                                                                          price: 190000000, priceFormatted: "19 Crore",  sector: "F-6", subSector: "F-6/1", area: "1",  areaUnit: "Kanal", bedrooms: 5,  bathrooms: 6,  parking: 2, features: ["Solar Panels","LEED Certified","Rainwater Harvest","EV Charger"],    images: [pick(0),pick(3),pick(4)], videoUrl: YT, isFeatured: false, type: "Villa",      yearBuilt: 2024, agentPhone: AGENT },
  { id: "17", city: "islamabad", title: "Diplomat's Residence",      description: "Prestigious 2 Kanal property in F-6/2 formerly occupied by diplomats. High-security compound with multiple annexes.",                                                                                          price: 450000000, priceFormatted: "45 Crore",  sector: "F-6", subSector: "F-6/2", area: "2",  areaUnit: "Kanal", bedrooms: 9,  bathrooms: 10, parking: 6, features: ["High Security","Annex","Conference Room","Generator"],               images: [pick(1),pick(4),pick(2)], videoUrl: YT, isFeatured: false, type: "Villa",      yearBuilt: 2017, agentPhone: AGENT },
  { id: "20", city: "islamabad", title: "Royal Palace Estate",       description: "The crown jewel of F-6/3 — a 4 Kanal palatial estate with indoor pool, ballroom, private cinema, and guest villas.",                                                                                          price: 800000000, priceFormatted: "80 Crore",  sector: "F-6", subSector: "F-6/3", area: "4",  areaUnit: "Kanal", bedrooms: 12, bathrooms: 14, parking: 8, features: ["Indoor Pool","Cinema","Ballroom","Guest Villas","Helipad"],            images: [pick(5),pick(0),pick(1)], videoUrl: YT, isFeatured: true,  type: "Villa",      yearBuilt: 2022, agentPhone: AGENT },
  { id: "22", city: "islamabad", title: "Luxury Apartment Suite",    description: "Premium 3-bed apartment in F-6/4 complex with pool, gym, and 24/7 security. Walking distance to Kohsar Market.",                                                                                              price: 48000000,  priceFormatted: "4.8 Crore", sector: "F-6", subSector: "F-6/4", area: "5",  areaUnit: "Marla", bedrooms: 3,  bathrooms: 3,  parking: 1, features: ["Pool Access","Gym","24/7 Security","Near Market"],                      images: [pick(5),pick(2),pick(4)], videoUrl: YT, isFeatured: false, type: "Apartment",  yearBuilt: 2023, agentPhone: AGENT },
  // ── ISLAMABAD — F-8 ────────────────────────────────────
  { id: "3",  city: "islamabad", title: "Premium Penthouse",         description: "Luxurious penthouse apartment offering 360-degree views of Islamabad. Features a private elevator, chef's kitchen, and wraparound balcony.",                                                                 price: 95000000,  priceFormatted: "9.5 Crore", sector: "F-8", subSector: "F-8/1", area: "8",  areaUnit: "Marla", bedrooms: 4,  bathrooms: 4,  parking: 2, features: ["Elevator","Balcony","Gym Access","Security"],                            images: [pick(5),pick(4),pick(0)], videoUrl: YT, isFeatured: true,  type: "Penthouse",  yearBuilt: 2024, agentPhone: AGENT },
  { id: "6",  city: "islamabad", title: "Executive Bungalow",        description: "Elegant 10 Marla bungalow in F-8/3 with modern amenities, separate guest wing, and covered parking.",                                                                                                         price: 85000000,  priceFormatted: "8.5 Crore", sector: "F-8", subSector: "F-8/3", area: "10", areaUnit: "Marla", bedrooms: 4,  bathrooms: 5,  parking: 2, features: ["Guest Wing","Central AC","Solar Panels"],                                  images: [pick(4),pick(2),pick(5)], videoUrl: YT, isFeatured: false, type: "Bungalow",   yearBuilt: 2021, agentPhone: AGENT },
  { id: "9",  city: "islamabad", title: "Compact Modern Home",       description: "Efficiently designed 7 Marla modern home in F-8/2 perfect for young professionals. Open layout with premium finishes.",                                                                                       price: 55000000,  priceFormatted: "5.5 Crore", sector: "F-8", subSector: "F-8/2", area: "7",  areaUnit: "Marla", bedrooms: 3,  bathrooms: 3,  parking: 1, features: ["Modern Design","Modular Kitchen","Terrace"],                              images: [pick(3),pick(1),pick(4)], videoUrl: YT, isFeatured: false, type: "House",      yearBuilt: 2022, agentPhone: AGENT },
  { id: "12", city: "islamabad", title: "Skyline Apartment",         description: "Premium 4-bed apartment in F-8/4 with city views, concierge service, and state-of-the-art facilities.",                                                                                                       price: 65000000,  priceFormatted: "6.5 Crore", sector: "F-8", subSector: "F-8/4", area: "6",  areaUnit: "Marla", bedrooms: 4,  bathrooms: 3,  parking: 1, features: ["Concierge","City Views","Gym","Rooftop Deck"],                           images: [pick(5),pick(1),pick(3)], videoUrl: YT, isFeatured: false, type: "Apartment",  yearBuilt: 2024, agentPhone: AGENT },
  { id: "15", city: "islamabad", title: "Corner Plot Mansion",       description: "Commanding 1 Kanal corner plot house in F-8/1 with maximum sunlight, extra-wide driveway, and panoramic frontage.",                                                                                           price: 140000000, priceFormatted: "14 Crore",  sector: "F-8", subSector: "F-8/1", area: "1",  areaUnit: "Kanal", bedrooms: 5,  bathrooms: 6,  parking: 3, features: ["Corner Plot","Extra Wide","Sunlit","Double Gate"],                       images: [pick(3),pick(2),pick(1)], videoUrl: YT, isFeatured: false, type: "House",      yearBuilt: 2022, agentPhone: AGENT },
  { id: "18", city: "islamabad", title: "Garden View House",         description: "Charming 10 Marla house in F-8/3 overlooking a sector park. Bright interiors with French doors and a wraparound veranda.",                                                                                    price: 78000000,  priceFormatted: "7.8 Crore", sector: "F-8", subSector: "F-8/3", area: "10", areaUnit: "Marla", bedrooms: 4,  bathrooms: 4,  parking: 2, features: ["Park Facing","Veranda","French Doors"],                                    images: [pick(0),pick(2),pick(5)], videoUrl: YT, isFeatured: false, type: "House",      yearBuilt: 2019, agentPhone: AGENT },
  { id: "23", city: "islamabad", title: "Hilltop Retreat",           description: "Exclusive 1 Kanal house in F-8/2 near Margalla foothills. Floor-to-ceiling windows frame stunning mountain views.",                                                                                          price: 170000000, priceFormatted: "17 Crore",  sector: "F-8", subSector: "F-8/2", area: "1",  areaUnit: "Kanal", bedrooms: 6,  bathrooms: 6,  parking: 3, features: ["Mountain Views","Floor Windows","Fireplace","Library"],                 images: [pick(1),pick(0),pick(3)], videoUrl: YT, isFeatured: false, type: "House",      yearBuilt: 2023, agentPhone: AGENT },
  { id: "25", city: "islamabad", title: "Starter Family Home",       description: "Affordable yet elegant 7 Marla house in F-8/4. Ideal for small families looking for quality living in a prime sector.",                                                                                       price: 42000000,  priceFormatted: "4.2 Crore", sector: "F-8", subSector: "F-8/4", area: "7",  areaUnit: "Marla", bedrooms: 3,  bathrooms: 3,  parking: 1, features: ["Affordable","Prime Location","Modern Kitchen"],                           images: [pick(3),pick(5),pick(1)], videoUrl: YT, isFeatured: false, type: "House",      yearBuilt: 2020, agentPhone: AGENT },
  // ── RAWALPINDI ─────────────────────────────────────────
  { id: "26", city: "rawalpindi", title: "Spacious Cantonment House",  description: "Beautiful 10 Marla house in Rawalpindi Cantonment with mature trees, covered parking, and a large drawing room.",                                                                                                price: 38000000,  priceFormatted: "3.8 Crore", sector: "General", subSector: "All Properties", area: "10", areaUnit: "Marla", bedrooms: 4,  bathrooms: 4,  parking: 2, features: ["Mature Trees","Covered Parking","Large Lawn"],                          images: [pick(1),pick(3),pick(5)], videoUrl: YT, isFeatured: false, type: "House",      yearBuilt: 2018, agentPhone: AGENT },
  { id: "27", city: "rawalpindi", title: "Modern Development Villa",   description: "Contemporary 12 Marla villa in new Rawalpindi development with smart home features and panoramic views.",                                                                                                        price: 55000000,  priceFormatted: "5.5 Crore", sector: "General", subSector: "All Properties", area: "12", areaUnit: "Marla", bedrooms: 5,  bathrooms: 5,  parking: 2, features: ["Smart Home","Modern Design","Panoramic Views"],               images: [pick(2),pick(0),pick(4)], videoUrl: YT, isFeatured: true,  type: "Villa",      yearBuilt: 2023, agentPhone: AGENT },
  { id: "28", city: "rawalpindi", title: "Cosy Family Residence",       description: "Well-maintained 8 Marla house perfect for small families with green surroundings and secure neighborhood.",                                                                                                        price: 28000000,  priceFormatted: "2.8 Crore", sector: "General", subSector: "All Properties", area: "8",  areaUnit: "Marla", bedrooms: 3,  bathrooms: 3,  parking: 1, features: ["Green Area","Secure Area","Modern Amenities"],                           images: [pick(4),pick(2),pick(1)], videoUrl: YT, isFeatured: false, type: "House",      yearBuilt: 2019, agentPhone: AGENT },
  { id: "29", city: "rawalpindi", title: "Luxury Hilltop Property",     description: "Premium 1 Kanal villa with stunning city views and high-end finishes throughout the property.",                                                                                                                   price: 75000000,  priceFormatted: "7.5 Crore", sector: "General", subSector: "All Properties", area: "1",  areaUnit: "Kanal", bedrooms: 6,  bathrooms: 6,  parking: 3, features: ["City Views","Hilltop Location","Premium Finishes"],               images: [pick(5),pick(1),pick(3)], videoUrl: YT, isFeatured: true,  type: "Villa",      yearBuilt: 2022, agentPhone: AGENT },
  { id: "30", city: "rawalpindi", title: "Investor Delight Apartment",  description: "3-bed apartment with excellent rental history and strong cash flow potential in prime Rawalpindi location.",                                                                                                      price: 18000000,  priceFormatted: "1.8 Crore", sector: "General", subSector: "All Properties", area: "5",  areaUnit: "Marla", bedrooms: 3,  bathrooms: 2,  parking: 1, features: ["Rental Income","Prime Location","Furnished Option"],              images: [pick(3),pick(4),pick(0)], videoUrl: YT, isFeatured: false, type: "Apartment",  yearBuilt: 2021, agentPhone: AGENT },
];

// ─── Lookup helpers ──────────────────────────────────────────
export const generatePropertySlug = (p: Property): string => {
  const subSlug = p.subSector.replace(/[\s/]+/g, "-").toLowerCase();
  return `${p.type.toLowerCase()}-${subSlug}-${p.area}-${p.areaUnit.toLowerCase()}-${p.id}`;
};

// ─── Static filter data ──────────────────────────────────────
export const sectors = ["F-6", "F-7", "F-8"] as const;

/** All sector names keyed by city slug */
export const citySectors: Record<string, string[]> = {
  islamabad:  ["F-6", "F-7", "F-8"],
};

/** All sub-sector display names keyed by sector name */
export const subSectors: Record<string, string[]> = {
  "F-6":             ["F-6/1", "F-6/2", "F-6/3", "F-6/4"],
  "F-7":             ["F-7/1", "F-7/2", "F-7/3", "F-7/4"],
  "F-8":             ["F-8/1", "F-8/2", "F-8/3", "F-8/4"],
};

export const priceRanges = [
  { label: "Under 5 Crore",   min: 0,         max: 50000000  },
  { label: "5 – 10 Crore",    min: 50000000,  max: 100000000 },
  { label: "10 – 20 Crore",   min: 100000000, max: 200000000 },
  { label: "20 – 50 Crore",   min: 200000000, max: 500000000 },
  { label: "50 Crore+",       min: 500000000, max: Infinity  },
];

// ─── Islamabad sub-sector SEO content (kept for SectorPage) ──
export const subSectorSeoContent: Record<string, { intro: string; invest: string }> = {
  "F-6/1": {
    intro:   "F-6/1 is a prime sub-sector within Sector F-6, Islamabad, known for its elegant residences and tree-lined streets. Located near the Diplomatic Enclave, it attracts families and professionals seeking a peaceful yet centrally connected lifestyle.",
    invest:  "F-6/1 offers excellent investment potential due to its proximity to embassies, international schools, and Kohsar Market. Property values show consistent appreciation, making it a safe choice for long-term investors.",
  },
  "F-6/2": {
    intro:   "F-6/2 is one of the most exclusive addresses in Islamabad, home to ultra-luxury villas and diplomatic residences. Spacious plots, wide roads, and proximity to Margalla Hills National Park define this sub-sector.",
    invest:  "With limited inventory and high demand, F-6/2 properties command premium prices and offer strong capital gains. Its reputation as a diplomat's enclave ensures sustained interest from high-net-worth buyers.",
  },
  "F-6/3": {
    intro:   "F-6/3 boasts some of the most spectacular properties in Islamabad, with many offering unobstructed views of the Margalla Hills. Known for palatial estates, Japanese-inspired gardens, and glass atriums.",
    invest:  "F-6/3 is a trophy location for investors seeking the pinnacle of Islamabad real estate. Its large plot sizes and scenic beauty ensure properties appreciate significantly over time.",
  },
  "F-6/4": {
    intro:   "F-6/4 offers a mix of luxury apartments and family homes within walking distance of Kohsar Market. Ideal for buyers who want the prestige of F-6 with slightly more accessible price points.",
    invest:  "F-6/4 presents a balanced investment opportunity with strong rental yields from apartment complexes and steady house value appreciation.",
  },
  "F-7/1": {
    intro:   "F-7/1 is a prestigious sub-sector home to heritage residences and classic family homes near Jinnah Super Market. A perfect blend of tradition and convenience.",
    invest:  "F-7/1 benefits from central location and commercial proximity. Consistent demand from families and professionals ensures strong property values.",
  },
  "F-7/2": {
    intro:   "F-7/2 is one of Islamabad's most sought-after sub-sectors — luxury villas, panoramic Margalla Hills views, and a vibrant community. From Mediterranean villas to smart homes, the variety is unmatched.",
    invest:  "Properties in F-7/2 consistently outperform the market. The sub-sector's prime location and diverse portfolio make it ideal for buyers seeking lifestyle value and strong returns.",
  },
  "F-7/3": {
    intro:   "F-7/3 is a dynamic sub-sector known for contemporary architecture and designer homes. It attracts young professionals and creative individuals who appreciate minimalist design.",
    invest:  "F-7/3 is emerging as a hotspot for modern living. Competitive pricing compared to F-7/1 and F-7/2 offers excellent growth potential for forward-thinking investors.",
  },
  "F-7/4": {
    intro:   "F-7/4 is home to grand estates and tech-forward residences. The sub-sector features some of the largest plots in F-7, attracting buyers who desire space, privacy, and smart home technology.",
    invest:  "F-7/4 offers exceptional value for buyers seeking large properties in a prime sector. Spacious plots and ongoing modernisation drive significant long-term appreciation.",
  },
  "F-8/1": {
    intro:   "F-8/1 is a vibrant sub-sector offering premium penthouses and corner-plot mansions. Close to F-8 Markaz and major hospitals, it provides unmatched urban convenience.",
    invest:  "F-8/1 is a strong investment choice due to its commercial proximity and modern infrastructure. It attracts both families and professionals, ensuring healthy demand.",
  },
  "F-8/2": {
    intro:   "F-8/2 enjoys a unique position near the Margalla Hills foothills, offering stunning mountain views and a serene environment. Ideal for nature lovers who want premium living.",
    invest:  "F-8/2 combines natural beauty with urban accessibility. Properties with mountain views command premium prices and show strong appreciation trends.",
  },
  "F-8/3": {
    intro:   "F-8/3 is a family-friendly sub-sector known for park-facing properties and garden bungalows. A peaceful, green environment with easy access to schools and markets.",
    invest:  "F-8/3 offers excellent value for families. Park-facing properties command premiums and the family-oriented character ensures steady demand.",
  },
  "F-8/4": {
    intro:   "F-8/4 provides accessible luxury within F-8. Modern apartments and starter homes are ideal for young families and first-time buyers with quality living at competitive prices.",
    invest:  "F-8/4 is the entry point into F-8's premium market. Rising demand from young professionals and ongoing development make it an excellent growth investment.",
  },
};

