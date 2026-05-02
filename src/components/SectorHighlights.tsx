import { motion } from "framer-motion";
import { Building2, Shield, TrendingUp, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  { icon: Building2, value: "500+", label: "Properties Sold" },
  { icon: Shield, value: "15+", label: "Years Experience" },
  { icon: TrendingUp, value: "98%", label: "Client Satisfaction" },
];

const sectors = [
  {
    sector: "F-6",
    slug: "f-6",
    desc: "Adjacent to the diplomatic enclave, F-6 offers proximity to embassies, Kohsar Market, and Margalla Hills trails. Ideal for those seeking prestige and convenience.",
  },
  {
    sector: "F-7",
    slug: "f-7",
    desc: "Home to Jinnah Super Market and Islamabad's finest schools, F-7 is the quintessential family neighbourhood with excellent connectivity and vibrant community life.",
  },
  {
    sector: "F-8",
    slug: "f-8",
    desc: "A rapidly developing sector with modern infrastructure, F-8 offers excellent value with easy access to F-8 Markaz, hospitals, and the Faisal Mosque.",
  },
];

const SectorHighlights = () => (
  <section className="py-16 sm:py-20 bg-background">
    <div className="container mx-auto px-4 sm:px-6">

      {/* Section header */}
      <div className="text-center mb-10 sm:mb-12">
        <p className="text-primary text-xs sm:text-sm font-medium tracking-[0.15em] uppercase mb-2">
          Why Choose Us
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-foreground mb-4 leading-snug">
          Islamabad's Most Trusted<br className="hidden sm:block" /> Real Estate Partner
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Over 15 years of expertise in F-6, F-7, and F-8 — Islamabad's most sought-after
          residential sectors.
        </p>
      </div>

      {/* Stats — 3 columns even on mobile (icons keep them compact) */}
      <div className="grid grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center p-4 sm:p-8 rounded-2xl bg-card border border-border"
          >
            <s.icon className="w-7 h-7 sm:w-10 sm:h-10 text-primary mx-auto mb-3" />
            <p className="text-2xl sm:text-4xl font-display font-bold text-gradient-gold mb-1">
              {s.value}
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground font-medium leading-snug">
              {s.label}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Sector cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
        {sectors.map((s, i) => (
          <motion.div
            key={s.sector}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group p-6 sm:p-7 rounded-2xl bg-muted/50 border border-border hover:border-primary/40 hover:bg-muted transition-all duration-300"
          >
            <h3 className="text-xl sm:text-2xl font-display font-bold text-gradient-gold mb-3">
              Sector {s.sector}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-5">{s.desc}</p>
            <Link
              to={`/properties/${s.slug}`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary group-hover:gap-3 transition-all duration-200"
              aria-label={`Browse properties in ${s.sector} Islamabad`}
            >
              Browse {s.sector} Properties
              <ArrowRight className="w-4 h-4 shrink-0" />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default SectorHighlights;
