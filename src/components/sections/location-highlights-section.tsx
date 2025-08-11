"use client"

import { motion, useInView } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { useRef } from "react"

interface LocationBlock {
  id: number
  heading: string
  description: string
  image: string
  alt: string
  imagePosition: "left" | "right"
}

function LocationBlockComponent({ block, index }: { block: LocationBlock; index: number }) {
  const blockRef = useRef(null)
  const isInView = useInView(blockRef, { once: true, margin: "-100px" })

  return (
    <div ref={blockRef} className="relative">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        {/* Text Content */}
        <motion.div
          className={`relative z-20 ${
            block.imagePosition === "right" ? "lg:order-1 lg:pr-8 lg:ml-16" : "lg:order-2 lg:pl-8 lg:mr-16"
          }`}
          initial={{
            opacity: 0,
            x: block.imagePosition === "right" ? -50 : 50,
          }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bg-white p-8 lg:p-12 rounded-2xl shadow-xl border border-stone-100">
            <h3 className="text-3xl lg:text-4xl font-serif text-stone-800 mb-6 leading-tight">{block.heading}</h3>
            <p className="text-lg text-stone-600 leading-relaxed mb-8">{block.description}</p>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-1 bg-amber-600 rounded-full"></div>
              <span className="text-sm font-medium text-amber-600 uppercase tracking-wider">Explore Now</span>
            </div>
          </div>
        </motion.div>

        {/* Image */}
        <motion.div
          className={`relative z-10 ${block.imagePosition === "right" ? "lg:order-2" : "lg:order-1"}`}
          initial={{
            opacity: 0,
            x: block.imagePosition === "right" ? 50 : -50,
          }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="relative h-80 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={block.image || "/placeholder.svg"}
              alt={block.alt}
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>

          {/* Decorative Element */}
          <motion.div
            className={`absolute -top-6 ${
              block.imagePosition === "right" ? "-left-6" : "-right-6"
            } w-20 h-20 bg-amber-100 rounded-full opacity-70`}
            initial={{ scale: 0, rotate: -180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
          />
        </motion.div>
      </div>
    </div>
  )
}

export function LocationHighlightsSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const locationBlocks: LocationBlock[] = [
    {
      id: 1,
      heading: "Steps Away from the Beach",
      description:
        "Wake up to the sound of waves and feel the soft sand between your toes. Our prime beachfront location offers direct access to pristine shores and crystal-clear waters.",
      image:
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      alt: "Beautiful pristine beach with crystal clear waters",
      imagePosition: "right",
    },
    {
      id: 2,
      heading: "Heart of the Cultural District",
      description:
        "Immerse yourself in local culture with world-class museums, art galleries, and historic landmarks just minutes away. Experience authentic local life at your doorstep.",
      image:
        "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      alt: "Historic cultural district with museums and galleries",
      imagePosition: "left",
    },
    {
      id: 3,
      heading: "Culinary Paradise Nearby",
      description:
        "Discover world-class dining experiences within walking distance. From vibrant street food markets to Michelin-starred restaurants, satisfy every craving and culinary desire.",
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      alt: "Vibrant local restaurant with outdoor dining atmosphere",
      imagePosition: "right",
    },
  ]

  return (
    <section id="location" ref={sectionRef} className="py-24 bg-stone-50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <Badge className="mb-6 bg-white text-stone-700 hover:bg-stone-100">Prime Location</Badge>
          <h2 className="text-4xl md:text-5xl font-serif text-stone-800 mb-6 leading-tight">
            Perfectly Located for Your
            <span className="text-amber-600"> Dream Getaway</span>
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Experience the convenience of staying close to everything that matters most to you.
          </p>
        </motion.div>

        {/* Location Blocks */}
        <div className="space-y-32 max-w-7xl mx-auto">
          {locationBlocks.map((block, index) => (
            <LocationBlockComponent key={block.id} block={block} index={index} />
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-24"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="bg-gradient-to-r from-amber-50 to-stone-50 p-8 lg:p-12 rounded-2xl border border-amber-100 max-w-4xl mx-auto shadow-lg">
            <h3 className="text-2xl lg:text-3xl font-serif text-stone-800 mb-4">Ready to Experience It All?</h3>
            <p className="text-lg text-stone-600 mb-6 max-w-2xl mx-auto">
              Our concierge team is ready to help you explore every corner of this incredible location. Book your stay
              and let the adventure begin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center space-x-2 text-stone-600">
                <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
                <span className="text-sm">Personalized recommendations</span>
              </div>
              <div className="flex items-center space-x-2 text-stone-600">
                <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
                <span className="text-sm">Local insider tips</span>
              </div>
              <div className="flex items-center space-x-2 text-stone-600">
                <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
                <span className="text-sm">24/7 assistance</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
