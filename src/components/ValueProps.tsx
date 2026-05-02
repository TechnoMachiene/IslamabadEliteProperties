import { motion } from "framer-motion";
import { BarChart3, ShieldCheck, Star, Zap } from "lucide-react";

const props = [
  {
    icon: ShieldCheck,
    title: "Verified Listings Only",
    desc: "Every property is personally verified by our team. No ghost listings, no misleading photos — ever.",
  },
  {
    icon: Zap,
    title: "Updated Daily",
    desc: "Fresh inventory every 24 hours so you never miss a new opportunity in F-6, F-7, or F-8.",
  },
  {
    icon: Star,
    title: "Curated Premium Selection",
    desc: "We handpick only the finest properties. No clutter, no noise — just Islamabad's best.",
  },
  {
    icon: BarChart3,
    title: "Transparent Market Pricing",
    desc: "Backed by real sales data. Fair valuations, no hidden mark-ups, no inflated numbers.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const ValueProps = () => (
  <section className="py-16 sm:py-20 bg-muted/30" aria-labelledby="value-props-heading">
    <div className="container mx-auto px-4 sm:px-6">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10 sm:mb-14"
      >
        <p className="text-primary text-xs sm:text-sm font-medium tracking-[0.15em] uppercase mb-2">
          The Platform Difference
        </p>
        <h2
          id="value-props-heading"
          className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-foreground mb-4 leading-snug"
        >
          Why Buyers Choose<br className="hidden sm:block" /> Islamabad Elite
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Not just a listing site — a curated real estate experience built for serious buyers
          who deserve better.
        </p>
      </motion.div>

      {/* Feature cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        {props.map((p, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="group p-6 sm:p-7 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            {/* Icon badge */}
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors duration-300">
              <p.icon className="w-6 h-6 text-primary" aria-hidden="true" />
            </div>
            <h3 className="font-display font-semibold text-foreground text-base sm:text-lg mb-2 leading-snug">
              {p.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ValueProps;
