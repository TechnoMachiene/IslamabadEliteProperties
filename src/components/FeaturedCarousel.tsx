import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Property } from "@/data/properties";
import { usePropertyStore } from "@/store/PropertyStoreContext";
import PropertyCard from "./PropertyCard";

interface Props {
  onPropertyClick: (p: Property) => void;
}

const FeaturedCarousel = ({ onPropertyClick }: Props) => {
  const { properties } = usePropertyStore();
  const featured = properties.filter((p) => p.isFeatured);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 380;
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-primary text-sm font-medium tracking-[0.15em] uppercase mb-2">Handpicked for You</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">Featured Properties</h2>
          </div>
          <div className="hidden md:flex gap-2">
            <button onClick={() => scroll("left")} className="p-3 rounded-xl border border-border hover:bg-muted transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={() => scroll("right")} className="p-3 rounded-xl border border-border hover:bg-muted transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none" }}
        >
          {featured.map((p, i) => (
            <div key={p.id} className="flex-shrink-0 w-[min(340px,calc(100vw-2rem))] snap-start">
              <PropertyCard property={p} onClick={onPropertyClick} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCarousel;
