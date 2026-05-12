"use client";

import { Property } from "@/data/properties";
import { MessageCircle, Phone } from "lucide-react";
import { trackContactClick } from "@/lib/tracking";

interface PropertyContactClientProps {
  property: Property;
}

export default function PropertyContactClient({ property }: PropertyContactClientProps) {
  const whatsappPhone = property.agentPhone || "923062392222";
  const whatsappMessage = encodeURIComponent(
    `Hi! I'm interested in the ${property.title} property (${property.area} ${property.areaUnit} ${property.type}) in ${property.subSector}. Can you provide more details? Price: PKR ${property.priceFormatted}`
  );
  const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${whatsappMessage}`;

  const handleWhatsAppClick = async () => {
    await trackContactClick('whatsapp', property.id);
    window.open(whatsappUrl, '_blank');
  };

  const handleCallClick = async () => {
    await trackContactClick('call', property.id);
    // Add small delay to ensure tracking is recorded before navigation
    setTimeout(() => {
      window.location.href = `tel:${whatsappPhone.replace(/\D/g, '')}`;
    }, 100);
  };

  return (
    <div className="my-12 p-8 rounded-2xl bg-accent border border-border">
      <h2 className="text-xl md:text-2xl font-display font-bold text-accent-foreground mb-2">
        Interested in this property?
      </h2>
      <p className="text-accent-foreground/80 mb-6">
        Contact our expert agents for a site visit, detailed inspection, or to negotiate the best price.
      </p>
      <div className="flex flex-wrap gap-4">
        <button
          onClick={handleWhatsAppClick}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-foreground text-accent font-medium hover:opacity-90 transition-opacity cursor-pointer"
        >
          <MessageCircle className="w-5 h-5" />
          WhatsApp Agent
        </button>
        <button
          onClick={handleCallClick}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-foreground/10 text-accent-foreground font-medium hover:bg-accent-foreground/20 transition-colors border border-accent-foreground/20 cursor-pointer"
        >
          <Phone className="w-5 h-5" />
          Call Agent
        </button>
      </div>
    </div>
  );
}
