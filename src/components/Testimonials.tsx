import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  { name: "Ahmed Khan", role: "Property Investor", text: "Islamabad Elite helped me find the perfect 1 Kanal villa in F-7/2. Their team was professional and the process was seamless. Highly recommended!", rating: 5 },
  { name: "Sarah Malik", role: "Homeowner, F-6/1", text: "We were looking for a family home in F-6 for months. The curated selection and virtual tours saved us so much time. We love our new home!", rating: 5 },
  { name: "Usman Raza", role: "Business Owner", text: "Outstanding service! They understood our requirements perfectly and found us a corner plot property in F-8 that exceeded all expectations.", rating: 5 },
];

const Testimonials = () => (
  <section className="py-20 bg-muted/50">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <p className="text-primary text-sm font-medium tracking-[0.15em] uppercase mb-2">What Our Clients Say</p>
        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">Trusted by 500+ Families</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-2xl bg-card border border-border"
          >
            <div className="flex gap-1 mb-4">
              {Array.from({ length: t.rating }).map((_, j) => (
                <Star key={j} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-foreground mb-4 leading-relaxed">"{t.text}"</p>
            <div>
              <p className="font-semibold text-foreground">{t.name}</p>
              <p className="text-sm text-muted-foreground">{t.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
