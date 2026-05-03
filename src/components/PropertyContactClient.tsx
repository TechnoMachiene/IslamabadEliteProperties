"use client";

import { Property } from "@/data/properties";
import { WhatsApp, Phone } from "lucide-react";

interface PropertyContactClientProps {
  property: Property;
}

export default function PropertyContactClient({ property }: PropertyContactClientProps) {
  const whatsappPhone = property.agentPhone || "923001234567";
  const whatsappMessage = encodeURIComponent(
    `Hi! I'm interested in the ${property.title} property (${property.area} ${property.areaUnit} ${property.type}) in ${property.subSector}. Can you provide more details? Price: PKR ${property.priceFormatted}`
  );
  const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${whatsappMessage}`;

  return (
    <div className="my-12 p-8 rounded-2xl bg-accent border border-border">
      <h2 className="text-xl md:text-2xl font-display font-bold text-accent-foreground mb-2">
        Interested in this property?
      </h2>
      <p className="text-accent-foreground/80 mb-6">
        Contact our expert agents for a site visit, detailed inspection, or to negotiate the best price.
      </p>
      <div className="flex flex-wrap gap-4">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-foreground text-accent font-medium hover:opacity-90 transition-opacity"
        >
          <WhatsApp className="w-5 h-5" />
          WhatsApp Agent
        </a>
        <a
          href={`tel:${whatsappPhone}`}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-foreground/10 text-accent-foreground font-medium hover:bg-accent-foreground/20 transition-colors border border-accent-foreground/20"
        >
          <Phone className="w-5 h-5" />
          Call Agent
        </a>
      </div>
    </div>
  );
}
