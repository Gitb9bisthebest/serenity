"use client"

import { motion, useInView } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Wifi, Shield, Clock, Car, Coffee, Waves } from "lucide-react"
import { useRef } from "react"

export function WhyStaySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const features = [
    {
      icon: Wifi,
      title: "Fast Wi-Fi",
      description: "Complimentary high-speed internet throughout the property for seamless connectivity.",
    },
    {
      icon: Shield,
      title: "Secure & Safe",
      description: "24/7 security monitoring and contactless check-in for your peace of mind.",
    },
    {
      icon: Clock,
      title: "24/7 Service",
      description: "Round-the-clock concierge and room service to cater to your every need.",
    },
    {
      icon: Car,
      title: "Valet Parking",
      description: "24/7 valet parking service for your convenience and peace of mind.",
    },
    {
      icon: Coffee,
      title: "In-Room Dining",
      description: "Gourmet room service available around the clock for your dining pleasure.",
    },
    {
      icon: Waves,
      title: "Infinity Pool",
      description: "Stunning infinity pool with panoramic views for the ultimate relaxation.",
    },
  ]

  return (
    <section id="why-stay" ref={ref} className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <Badge className="mb-6 bg-stone-100 text-stone-700 hover:bg-stone-200">Why Choose Us</Badge>
          <h2 className="text-4xl md:text-5xl font-serif text-stone-800 mb-6">
            Why Stay
            <span className="text-amber-600"> With Us</span>
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Discover what makes Serenity Suites the perfect choice for your staycation experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="text-center p-8 border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white h-full">
                <CardContent className="p-0 flex flex-col items-center">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-6">
                    <feature.icon className="w-8 h-8 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-stone-800 mb-4">{feature.title}</h3>
                  <p className="text-stone-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
