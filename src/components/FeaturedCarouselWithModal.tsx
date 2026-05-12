"use client";

import { useState } from "react";
import { Property } from "@/data/properties";
import FeaturedCarousel from "./FeaturedCarousel";
import PropertyModal from "./PropertyModal";

export default function FeaturedCarouselWithModal() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  return (
    <>
      <FeaturedCarousel onPropertyClick={setSelectedProperty} />
      <PropertyModal property={selectedProperty} onClose={() => setSelectedProperty(null)} />
    </>
  );
}
