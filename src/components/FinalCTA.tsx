import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";

const FinalCTA = () => (
  <section
    className="relative py-20 sm:py-28 bg-charcoal overflow-hidden"
    aria-labelledby="final-cta-heading"
  >
    {/* Radial gold glow — purely decorative */}
    <div
      className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,hsl(38_70%_50%_/_0.12),transparent)]"
      aria-hidden="true"
    />
    {/* Subtle top border accent */}
    <div
      className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent"
      aria-hidden="true"
    />

    <div className="relative container mx-auto px-4 sm:px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {/* Eyebrow */}
        <p className="text-gold-light text-xs sm:text-sm font-medium tracking-[0.25em] uppercase mb-4">
          Your Next Chapter Starts Here
        </p>

        {/* Headline */}
        <h2
          id="final-cta-heading"
          className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white leading-tight mb-5 sm:mb-6"
        >
          Find Your Dream Property<br className="hidden sm:block" />
          in Islamabad Today
        </h2>

        {/* Sub-copy */}
        <p className="text-sm sm:text-base text-white/60 max-w-xl mx-auto leading-relaxed mb-10 sm:mb-12">
          Browse verified listings in F-6, F-7, and F-8. Connect with a dedicated agent
          who knows your neighbourhood inside out.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/properties"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-gold text-primary-foreground font-semibold text-sm transition-transform hover:scale-105 active:scale-100"
          >
            Browse All Properties
            <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
          </Link>
          <a
            href="https://wa.me/923001234567"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-xl border border-white/20 text-white font-semibold text-sm transition-all hover:bg-white/10 hover:border-white/40 active:scale-95"
          >
            <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
            Chat with an Agent
          </a>
        </div>

        {/* Micro trust line */}
        <p className="mt-8 text-white/30 text-xs">
          No registration required · 500+ verified listings · Response within 1 hour
        </p>
      </motion.div>
    </div>
  </section>
);

export default FinalCTA;
