"use client"

import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wifi, Car, Coffee, Waves } from "lucide-react"
import { useRef } from "react"

export function AmenitiesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const amenities = [
    { icon: Wifi, title: "High-Speed WiFi", description: "Complimentary high-speed internet throughout the property" },
    { icon: Car, title: "Valet Parking", description: "24/7 valet parking service for your convenience" },
    { icon: Coffee, title: "In-Room Dining", description: "Gourmet room service available around the clock" },
    { icon: Waves, title: "Infinity Pool", description: "Stunning infinity pool with panoramic views" },
  ]

  return (
    <section id="amenities" ref={ref} className="py-24 bg-stone-50">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <Badge className="mb-6 bg-white text-stone-700 hover:bg-stone-100">Amenities</Badge>
          <h2 className="text-4xl md:text-5xl font-serif text-stone-800 mb-6">
            Premium
            <span className="text-amber-600"> Services</span>
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Enjoy world-class amenities designed to enhance your stay and create unforgettable experiences.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {amenities.map((amenity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <amenity.icon className="w-8 h-8 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-stone-800 mb-2">{amenity.title}</h3>
                  <p className="text-stone-600 leading-relaxed">{amenity.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
