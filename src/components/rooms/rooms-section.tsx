"use client";

import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Users, Square, MapPin } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

// Updated Room type to match Prisma schema
export interface Room {
  id: string;
  name: string;
  slug: string;
  roomType: string;
  images: string[];
  description: string;
  features: string[];
  price: number; // Using number for frontend, will be Decimal in DB
  size: number;
  maxGuests: number;
  isAvailable: boolean;
  rating?: number;
  numReviews?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface RoomsSectionProps {
  rooms?: Room[];
}

export function RoomsSection({ rooms: propsRooms }: RoomsSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentRoom, setCurrentRoom] = useState(0);

  // Default rooms data (can be removed when fetching from API)
  const defaultRooms: Room[] = [
    {
      id: "deluxe-garden-suite",
      name: "Deluxe Garden Suite",
      slug: "deluxe-garden-suite",
      roomType: "Deluxe",
      price: 299,
      images: [
        "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      ],
      features: [
        "King Size Bed",
        "Garden View",
        "Private Balcony",
        "Marble Bathroom",
      ],
      description:
        "Spacious suite with panoramic garden views and luxury amenities.",
      maxGuests: 2,
      size: 45,
      isAvailable: true,
      rating: 4.8,
      numReviews: 124,
    },
    {
      id: "premium-ocean-view",
      name: "Premium Ocean View",
      slug: "premium-ocean-view",
      roomType: "Premium",
      price: 399,
      images: [
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      ],
      features: ["Ocean View", "Jacuzzi", "Living Area", "Premium Minibar"],
      description:
        "Elegant suite featuring breathtaking ocean views and premium facilities.",
      maxGuests: 3,
      size: 65,
      isAvailable: true,
      rating: 4.9,
      numReviews: 89,
    },
    {
      id: "presidential-suite",
      name: "Presidential Suite",
      slug: "presidential-suite",
      roomType: "Presidential",
      price: 599,
      images: [
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      ],
      features: [
        "2 Bedrooms",
        "Private Pool",
        "Butler Service",
        "Panoramic Views",
      ],
      description:
        "Ultimate luxury with private pool and personalized butler service.",
      maxGuests: 4,
      size: 120,
      isAvailable: true,
      rating: 5.0,
      numReviews: 67,
    },
  ];

  const rooms = propsRooms || defaultRooms;

  const handleBookNow = (room: Room) => {
    // Navigate to booking page or open booking modal
    // You can implement this based on your routing setup
    console.log(`Booking room: ${room.slug}`);
    // Example: router.push(`/booking/${room.slug}`)
  };

  if (!rooms || rooms.length === 0) {
    return (
      <section id="rooms" className="py-24 bg-stone-50">
        <div className="container mx-auto px-6 text-center">
          <p className="text-stone-600">No rooms available at the moment.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="rooms" ref={ref} className="py-24 bg-stone-50">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <Badge className="mb-6 bg-white text-stone-700 hover:bg-stone-100">
            Accommodations
          </Badge>
          <h2 className="text-4xl md:text-5xl font-serif text-stone-800 mb-6">
            Luxury
            <span className="text-amber-600"> Suites</span>
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Choose from our collection of thoughtfully designed suites, each
            offering a unique perspective on luxury and comfort.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <motion.div
            key={currentRoom}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="overflow-hidden shadow-2xl border-0">
              <div className="grid md:grid-cols-2">
                <div className="relative h-64 md:h-full">
                  <Image
                    src={rooms[currentRoom].images[0] || "/placeholder.svg"}
                    alt={rooms[currentRoom].name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {!rooms[currentRoom].isAvailable && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <Badge
                        variant="destructive"
                        className="text-lg px-4 py-2"
                      >
                        Currently Unavailable
                      </Badge>
                    </div>
                  )}
                </div>
                <CardContent className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-4">
                    <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">
                      {rooms[currentRoom].roomType}
                    </Badge>
                    {rooms[currentRoom].rating && (
                      <div className="flex items-center text-sm text-stone-600">
                        <span className="text-amber-500 mr-1">★</span>
                        <span>{rooms[currentRoom].rating}</span>
                        {rooms[currentRoom].numReviews && (
                          <span className="ml-1">
                            ({rooms[currentRoom].numReviews} reviews)
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <h3 className="text-3xl font-serif text-stone-800 mb-2">
                    {rooms[currentRoom].name}
                  </h3>
                  <p className="text-stone-600 mb-6 leading-relaxed">
                    {rooms[currentRoom].description}
                  </p>

                  {/* Room details */}
                  <div className="flex items-center gap-4 mb-4 text-sm text-stone-600">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      <span>{rooms[currentRoom].maxGuests} guests</span>
                    </div>
                    <div className="flex items-center">
                      <Square className="w-4 h-4 mr-1" />
                      <span>{rooms[currentRoom].size}m²</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {rooms[currentRoom].features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center text-sm text-stone-600"
                      >
                        <div className="w-2 h-2 bg-amber-600 rounded-full mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-3xl font-bold text-stone-800">
                        ${rooms[currentRoom].price}
                      </span>
                      <span className="text-stone-600 ml-2">per night</span>
                    </div>
                    <Button
                      className="bg-amber-600 hover:bg-amber-700 text-white rounded-full disabled:opacity-50"
                      onClick={() => handleBookNow(rooms[currentRoom])}
                      disabled={!rooms[currentRoom].isAvailable}
                    >
                      {rooms[currentRoom].isAvailable
                        ? "Book Now"
                        : "Unavailable"}
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          </motion.div>

          {/* Navigation */}
          <div className="flex justify-center mt-8 space-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                setCurrentRoom(
                  (prev) => (prev - 1 + rooms.length) % rooms.length
                )
              }
              className="rounded-full"
              aria-label="Previous room"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div className="flex space-x-2 items-center">
              {rooms.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentRoom(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentRoom ? "bg-stone-800" : "bg-stone-300"
                  }`}
                  aria-label={`Go to room ${index + 1}`}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                setCurrentRoom((prev) => (prev + 1) % rooms.length)
              }
              className="rounded-full"
              aria-label="Next room"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
