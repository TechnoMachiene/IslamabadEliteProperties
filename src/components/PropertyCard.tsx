"use client";

import { useState } from "react";
import { Heart, MapPin, Bed, Bath, Car } from "lucide-react";
import { Property, smallImageMap } from "@/data/properties";
import { motion } from "framer-motion";

interface Props {
  property: Property;
  onClick?: (property: Property) => void;
  index?: number;
}

const PropertyCard = ({ property, onClick = () => {}, index = 0 }: Props) => {
  const [fav, setFav] = useState(() => {
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    return favs.includes(property.id);
  });

  const toggleFav = (e: React.MouseEvent) => {
    e.stopPropagation();
    const favs: string[] = JSON.parse(localStorage.getItem("favorites") || "[]");
    const next = fav ? favs.filter((id) => id !== property.id) : [...favs, property.id];
    localStorage.setItem("favorites", JSON.stringify(next));
    setFav(!fav);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onClick={() => onClick(property)}
      className="group cursor-pointer bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={property.images[0]}
          srcSet={smallImageMap[property.images[0]] ? `${smallImageMap[property.images[0]]} 400w, ${property.images[0]} 800w` : undefined}
          sizes="(max-width: 640px) 100vw, 340px"
          alt={`${property.area} ${property.areaUnit} ${property.type.toLowerCase()} for sale in ${property.subSector} Islamabad - ${property.title}`}
          loading="lazy"
          width={800}
          height={600}
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
            {property.type}
          </span>
          {property.isFeatured && (
            <span className="px-3 py-1 rounded-full bg-gold-dark text-primary-foreground text-xs font-semibold">
              Featured
            </span>
          )}
        </div>
        <button
          onClick={toggleFav}
          className="absolute top-3 right-3 p-2 rounded-full bg-background/80 backdrop-blur-sm transition-colors hover:bg-background"
        >
          <Heart className={`w-4 h-4 ${fav ? "fill-destructive text-destructive" : "text-muted-foreground"}`} />
        </button>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-1.5 text-muted-foreground text-xs mb-2">
          <MapPin className="w-3.5 h-3.5" />
          <span>{property.subSector}, Islamabad</span>
        </div>
        <h3 className="font-display text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
          {property.title}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
          {property.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xl font-display font-bold text-gradient-gold">
            PKR {property.priceFormatted}
          </span>
          <div className="flex items-center gap-3 text-muted-foreground text-xs">
            <span className="flex items-center gap-1"><Bed className="w-3.5 h-3.5" />{property.bedrooms}</span>
            <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5" />{property.bathrooms}</span>
            <span className="flex items-center gap-1"><Car className="w-3.5 h-3.5" />{property.parking}</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">{property.area} {property.areaUnit}</p>
      </div>
    </motion.article>
  );
};

export default PropertyCard;
