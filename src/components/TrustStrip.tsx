import { motion } from "framer-motion";
import { CheckCircle2, MapPin, RefreshCw, Users } from "lucide-react";

const items = [
  { icon: MapPin,        value: "500+",   label: "Active Listings"   },
  { icon: Users,         value: "50+",    label: "Verified Agents"   },
  { icon: CheckCircle2,  value: "15+",    label: "Years in Market"   },
  { icon: RefreshCw,     value: "Daily",  label: "New Listings Added" },
];

const TrustStrip = () => (
  <section className="py-6 sm:py-8 border-y border-border bg-card/60" aria-label="Platform credibility">
    <div className="container mx-auto px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 md:gap-16"
      >
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            className="flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <item.icon className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-base font-display font-bold text-gradient-gold leading-none">
                {item.value}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5 whitespace-nowrap">
                {item.label}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default TrustStrip;
