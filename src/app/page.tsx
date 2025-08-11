"use client";

import { useScroll, useTransform } from "framer-motion";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { GallerySection } from "@/components/sections/gallery-section";
import { RoomsSection } from "@/components/rooms/rooms-section";
import { WhyStaySection } from "@/components/sections/why-stay-section";
import { ParallaxSection } from "@/components/sections/parallax-section";
import { LocationHighlightsSection } from "@/components/sections/location-highlights-section";
import { BookingSection } from "@/components/sections/booking-section";

export default function StaycationHotel() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div className="min-h-screen bg-stone-50">
      <HeroSection y={y} />
      <AboutSection />
      <GallerySection />
      <RoomsSection />
      <WhyStaySection />
      <ParallaxSection />
      <LocationHighlightsSection />
      <BookingSection />
    </div>
  );
}
