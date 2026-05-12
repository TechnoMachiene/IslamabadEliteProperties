"use client";

import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Bed, Bath, Car, Calendar, Phone } from "lucide-react";
import { Property } from "@/data/properties";
import { trackContactClick } from "@/lib/tracking";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  property: Property | null;
  onClose: () => void;
}

const PropertyModal = ({ property, onClose }: Props) => {
  const [imgIdx, setImgIdx] = useState(0);
  const [tab, setTab] = useState<"photos" | "video">("photos");

  if (!property) return null;

  const prevImg = () => setImgIdx((i) => (i === 0 ? property.images.length - 1 : i - 1));
  const nextImg = () => setImgIdx((i) => (i === property.images.length - 1 ? 0 : i + 1));

  const waText = encodeURIComponent(
    `Hi! I'm interested in "${property.title}" in ${property.subSector}. Price: PKR ${property.priceFormatted}. Please share more details.`
  );

  const handleWhatsAppClick = async () => {
    await trackContactClick('whatsapp', property.id);
    window.open(`https://wa.me/${property.agentPhone.replace(/\D/g, "")}?text=${waText}`, '_blank');
  };

  const handleCallClick = async () => {
    await trackContactClick('call', property.id);
    window.location.href = `tel:${property.agentPhone}`;
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-foreground/60 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-background rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        >
          {/* Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-background/90 backdrop-blur-xl border-b border-border">
            <h2 className="font-display text-xl font-bold text-foreground">{property.title}</h2>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 md:p-6">
            {/* Tabs */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setTab("photos")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === "photos" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
              >
                Photos
              </button>
              <button
                onClick={() => setTab("video")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === "video" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
              >
                Video Tour
              </button>
            </div>

            {/* Gallery / Video */}
            {tab === "photos" ? (
              <div className="relative aspect-video rounded-xl overflow-hidden mb-6 bg-muted">
                <img
                  src={property.images[imgIdx]}
                  alt={`${property.area} ${property.areaUnit} ${property.type.toLowerCase()} for sale in ${property.subSector} Islamabad - ${property.title} - Photo ${imgIdx + 1}`}
                  className="w-full h-full object-cover"
                />
                <button onClick={prevImg} className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button onClick={nextImg} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background">
                  <ChevronRight className="w-5 h-5" />
                </button>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {property.images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setImgIdx(i)}
                      className={`w-2.5 h-2.5 rounded-full transition-colors ${i === imgIdx ? "bg-primary" : "bg-background/60"}`}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="aspect-video rounded-xl overflow-hidden mb-6">
                <iframe
                  src={property.videoUrl}
                  title="Video walkthrough"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}

            {/* Thumbnails */}
            {tab === "photos" && (
              <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {property.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setImgIdx(i)}
                    className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors ${i === imgIdx ? "border-primary" : "border-transparent"}`}
                  >
                    <img src={img} alt={`${property.title} in ${property.subSector} - thumbnail ${i + 1}`} loading="lazy" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Price & Location */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <p className="text-3xl font-display font-bold text-gradient-gold">PKR {property.priceFormatted}</p>
                <p className="text-muted-foreground text-sm mt-1">{property.subSector}, Islamabad</p>
              </div>
              <div className="flex gap-2">
                <span className="px-3 py-1.5 rounded-lg bg-accent text-accent-foreground text-sm font-medium">{property.type}</span>
                <span className="px-3 py-1.5 rounded-lg bg-accent text-accent-foreground text-sm font-medium">{property.area} {property.areaUnit}</span>
              </div>
            </div>

            {/* Features grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-muted">
                <Bed className="w-5 h-5 text-primary" />
                <div><p className="text-sm text-muted-foreground">Bedrooms</p><p className="font-semibold">{property.bedrooms}</p></div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-muted">
                <Bath className="w-5 h-5 text-primary" />
                <div><p className="text-sm text-muted-foreground">Bathrooms</p><p className="font-semibold">{property.bathrooms}</p></div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-muted">
                <Car className="w-5 h-5 text-primary" />
                <div><p className="text-sm text-muted-foreground">Parking</p><p className="font-semibold">{property.parking}</p></div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-muted">
                <Calendar className="w-5 h-5 text-primary" />
                <div><p className="text-sm text-muted-foreground">Built</p><p className="font-semibold">{property.yearBuilt}</p></div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="font-display text-lg font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground leading-relaxed">{property.description}</p>
            </div>

            {/* Amenities */}
            <div className="mb-6">
              <h3 className="font-display text-lg font-semibold mb-3">Features & Amenities</h3>
              <div className="flex flex-wrap gap-2">
                {property.features.map((f) => (
                  <span key={f} className="px-3 py-1.5 rounded-full bg-accent text-accent-foreground text-sm">
                    {f}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleWhatsAppClick}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-gold text-primary-foreground font-semibold text-sm transition-transform hover:scale-105 cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                WhatsApp Agent
              </button>
              <button
                onClick={handleCallClick}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border-2 border-border text-foreground font-semibold text-sm transition-colors hover:bg-muted cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                Call Agent
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PropertyModal;
