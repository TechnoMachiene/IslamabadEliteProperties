import { motion } from "framer-motion";
import HeroSearch from "./HeroSearch";

/**
 * Layout approach:
 *   section = flex-col, min-h-[100svh]
 *   ├── spacer div  → exactly navbar height (h-16 md:h-20)
 *   └── content div → flex-1, flex items-center justify-center
 *
 * This avoids the double-padding bug where `section pt-16` +
 * `content py-16` stacked 128px of wasted space on mobile, pushing
 * the search bar off-screen on short devices (≤ 568 px).
 */
const Hero = () => (
  <section
    className="relative min-h-[100svh] flex flex-col overflow-hidden"
    aria-label="Hero – Luxury properties for sale in Islamabad"
  >
    {/* ── Background ────────────────────────────────────────── */}
    <img
      src="/hero-islamabad.webp"
      srcSet="/hero-islamabad-sm.webp 1024w, /hero-islamabad.webp 1920w"
      sizes="100vw"
      alt="Luxury properties for sale in Islamabad with Margalla Hills in the background"
      className="absolute inset-0 w-full h-full object-cover object-center"
      width="1920"
      height="1080"
      fetchPriority="high"
      decoding="async"
    />

    {/*
      Single strong overlay instead of two layered divs.
      from-black/75 → via-black/60 → to-black/75 ensures the
      centre of the image (where the headline sits) is never
      lighter than 60% black, keeping WCAG AA contrast on white text.
    */}
    <div
      className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/60 to-black/80"
      aria-hidden="true"
    />

    {/* ── Exact navbar height spacer ─────────────────────────── */}
    <div className="h-16 md:h-20 shrink-0" aria-hidden="true" />

    {/* ── Hero content — fills remaining viewport height ─────── */}
    <div className="relative z-10 flex-1 flex flex-col items-center justify-center w-full px-4 sm:px-6 py-8 text-center">

      {/* Headline block */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-3xl w-full mx-auto mb-6 sm:mb-8"
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-gold-light text-xs sm:text-sm font-medium tracking-[0.25em] uppercase mb-3 sm:mb-4"
        >
          Islamabad's Premier Real Estate Agency
        </motion.p>

        {/* H1 — keyword target */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-[1.18] mb-4 sm:mb-5 drop-shadow-lg"
        >
          Luxury Properties for Sale in{" "}
          <span className="text-gradient-gold">Twin Cities</span>
        </motion.h1>

        {/* Subtitle — hidden on very small heights to keep search visible */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.18 }}
          className="hidden xs:block text-sm sm:text-base md:text-lg text-white/85 font-light max-w-xl mx-auto leading-relaxed"
        >
          Handpicked villas, houses &amp; apartments in Islamabad's most
          prestigious sectors. Expert agents. Virtual tours. Best prices guaranteed.
        </motion.p>

        {/* Trust signals — desktop only so mobile search stays in-frame */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.28 }}
          className="hidden md:flex items-center justify-center gap-x-6 gap-y-2 mt-5 text-white/60 text-xs font-medium tracking-wide"
          aria-label="Platform highlights"
        >
          <span>500+ Properties Sold</span>
          <span className="w-px h-3 bg-white/30" aria-hidden="true" />
          <span>15+ Years Experience</span>
          <span className="w-px h-3 bg-white/30" aria-hidden="true" />
          <span>Twin Cities</span>
        </motion.div>
      </motion.div>

      {/* Search bar — PRIMARY CTA, always in viewport */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.3, ease: "easeOut" }}
        className="w-full max-w-4xl mx-auto mb-5"
      >
        <HeroSearch />
      </motion.div>

      {/* Secondary CTA */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="text-white/50 text-xs"
      >
        Or{" "}
        <a
          href="https://wa.me/923001234567"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-white transition-colors"
        >
          chat with an agent on WhatsApp
        </a>
      </motion.p>
    </div>
  </section>
);

export default Hero;
