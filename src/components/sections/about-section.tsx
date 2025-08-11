"use client"

import { motion, useInView } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin } from "lucide-react"
import Image from "next/image"
import { useRef } from "react"

export function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" ref={ref} className="py-24 bg-stone-50">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-6 bg-stone-100 text-stone-700 hover:bg-stone-200">About Serenity Suites</Badge>
            <h2 className="text-4xl md:text-5xl font-serif text-stone-800 mb-6 leading-tight">
              Where Luxury Meets
              <span className="text-amber-600"> Tranquility</span>
            </h2>
            <p className="text-lg text-stone-600 mb-6 leading-relaxed">
              Nestled in the heart of nature yet close to urban conveniences, Serenity Suites offers an unparalleled
              staycation experience. Our thoughtfully designed spaces blend contemporary luxury with natural elements,
              creating the perfect sanctuary for modern travelers.
            </p>
            <p className="text-lg text-stone-600 mb-8 leading-relaxed">
              Each suite is meticulously crafted to provide comfort, privacy, and breathtaking views. Whether you're
              seeking a romantic getaway or a peaceful retreat, we've created an environment where memories are made.
            </p>
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-600">50+</div>
                <div className="text-stone-600">Luxury Suites</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-600">4.9</div>
                <div className="text-stone-600 flex items-center">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400 mr-1" />
                  Rating
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-600">24/7</div>
                <div className="text-stone-600">Concierge</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Hotel interior"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <motion.div
              className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-amber-600" />
                <div>
                  <div className="font-semibold text-stone-800">Prime Location</div>
                  <div className="text-sm text-stone-600">15 min from city center</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
