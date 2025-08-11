"use client"

import { motion, useInView } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { useRef } from "react"
import type { GalleryImage } from "@/types"

export function GallerySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const galleryImages: GalleryImage[] = [
    {
      id: "1",
      src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      alt: "Luxury suite",
      category: "room",
      span: "col-span-2 row-span-2",
    },
    {
      id: "2",
      src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      alt: "Hotel pool",
      category: "amenity",
      span: "col-span-1 row-span-1",
    },
    {
      id: "3",
      src: "https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      alt: "Spa area",
      category: "amenity",
      span: "col-span-1 row-span-1",
    },
    {
      id: "4",
      src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      alt: "Restaurant",
      category: "dining",
      span: "col-span-2 row-span-2",
    },
    {
      id: "5",
      src: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      alt: "Garden view",
      category: "exterior",
      span: "col-span-1 row-span-1",
    },
    {
      id: "6",
      src: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      alt: "Lobby",
      category: "exterior",
      span: "col-span-1 row-span-1",
    },
  ]

  return (
    <section id="gallery" ref={ref} className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <Badge className="mb-6 bg-stone-100 text-stone-700 hover:bg-stone-200">Gallery</Badge>
          <h2 className="text-4xl md:text-5xl font-serif text-stone-800 mb-6">
            Experience Our
            <span className="text-amber-600"> Spaces</span>
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Take a visual journey through our carefully curated spaces, each designed to inspire and rejuvenate.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              className={`relative overflow-hidden rounded-xl group cursor-pointer ${image.span}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Badge className="bg-white/90 text-stone-800">{image.alt}</Badge>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
