"use client"

import type React from "react"

import { motion, useInView } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DatePicker } from "@/components/ui/date-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, CalendarCheck, Users, Bed, Mail, Phone, User, CreditCard, Shield, Star, MapPin } from "lucide-react"
import { useState, useRef } from "react"
import { addDays, isBefore, differenceInDays } from "date-fns"

export function BookingSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const [formData, setFormData] = useState({
    checkInDate: undefined as Date | undefined,
    checkOutDate: undefined as Date | undefined,
    guests: "2",
    roomType: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const roomTypes = [
    { value: "deluxe", label: "Deluxe Garden Suite", price: 299 },
    { value: "premium", label: "Premium Ocean View", price: 399 },
    { value: "presidential", label: "Presidential Suite", price: 599 },
  ]

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const calculateTotal = () => {
    if (!formData.checkInDate || !formData.checkOutDate || !formData.roomType) return 0

    const nights = differenceInDays(formData.checkOutDate, formData.checkInDate)
    const roomPrice = roomTypes.find((room) => room.value === formData.roomType)?.price || 0
    const subtotal = nights * roomPrice
    const taxes = subtotal * 0.12 // 12% tax
    return subtotal + taxes
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("Booking submitted:", formData)
    alert("Booking request submitted successfully! We'll contact you shortly to confirm your reservation.")

    setIsSubmitting(false)
  }

  const disableCheckInDates = (date: Date) => {
    return isBefore(date, new Date())
  }

  const disableCheckOutDates = (date: Date) => {
    if (!formData.checkInDate) return isBefore(date, new Date())
    return isBefore(date, addDays(formData.checkInDate, 1))
  }

  const selectedRoom = roomTypes.find((room) => room.value === formData.roomType)
  const nights =
    formData.checkInDate && formData.checkOutDate ? differenceInDays(formData.checkOutDate, formData.checkInDate) : 0

  return (
    <section id="booking" ref={ref} className="py-24 bg-gradient-to-br from-stone-50 to-amber-50">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <Badge className="mb-6 bg-amber-100 text-amber-800 hover:bg-amber-200">Book Your Stay</Badge>
          <h2 className="text-4xl md:text-5xl font-serif text-stone-800 mb-6">
            Reserve Your
            <span className="text-amber-600"> Perfect Escape</span>
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Complete your booking details below and let us create an unforgettable experience for you.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Booking Form */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="shadow-xl border-0">
                <CardHeader>
                  <CardTitle className="text-2xl font-serif text-stone-800 flex items-center">
                    <CreditCard className="w-6 h-6 mr-3 text-amber-600" />
                    Booking Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Dates and Room Selection */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="flex items-center text-stone-700 text-sm font-medium">
                          <Calendar className="w-4 h-4 mr-2" />
                          Check-in Date
                        </label>
                        <DatePicker
                          date={formData.checkInDate}
                          onDateChange={(date) => handleInputChange("checkInDate", date)}
                          placeholder="Select check-in"
                          disabled={disableCheckInDates}
                          className="bg-white border-stone-200"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="flex items-center text-stone-700 text-sm font-medium">
                          <CalendarCheck className="w-4 h-4 mr-2" />
                          Check-out Date
                        </label>
                        <DatePicker
                          date={formData.checkOutDate}
                          onDateChange={(date) => handleInputChange("checkOutDate", date)}
                          placeholder="Select check-out"
                          disabled={disableCheckOutDates}
                          className="bg-white border-stone-200"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="flex items-center text-stone-700 text-sm font-medium">
                          <Users className="w-4 h-4 mr-2" />
                          Number of Guests
                        </label>
                        <Select value={formData.guests} onValueChange={(value) => handleInputChange("guests", value)}>
                          <SelectTrigger className="bg-white border-stone-200 rounded-full">
                            <SelectValue placeholder="Select guests" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 Guest</SelectItem>
                            <SelectItem value="2">2 Guests</SelectItem>
                            <SelectItem value="3">3 Guests</SelectItem>
                            <SelectItem value="4">4 Guests</SelectItem>
                            <SelectItem value="5">5 Guests</SelectItem>
                            <SelectItem value="6">6 Guests</SelectItem>
                            <SelectItem value="7">7 Guests</SelectItem>
                            <SelectItem value="8">8+ Guests</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label className="flex items-center text-stone-700 text-sm font-medium">
                          <Bed className="w-4 h-4 mr-2" />
                          Room Type
                        </label>
                        <Select
                          value={formData.roomType}
                          onValueChange={(value) => handleInputChange("roomType", value)}
                        >
                          <SelectTrigger className="bg-white border-stone-200 rounded-full">
                            <SelectValue placeholder="Select room type" />
                          </SelectTrigger>
                          <SelectContent>
                            {roomTypes.map((room) => (
                              <SelectItem key={room.value} value={room.value}>
                                {room.label} - ${room.price}/night
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Guest Information */}
                    <div className="border-t border-stone-200 pt-6">
                      <h3 className="text-lg font-semibold text-stone-800 mb-4 flex items-center">
                        <User className="w-5 h-5 mr-2 text-amber-600" />
                        Guest Information
                      </h3>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-stone-700 text-sm font-medium">First Name</label>
                          <input
                            type="text"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange("firstName", e.target.value)}
                            className="w-full px-4 py-2 border border-stone-200 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                            placeholder="Enter first name"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-stone-700 text-sm font-medium">Last Name</label>
                          <input
                            type="text"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange("lastName", e.target.value)}
                            className="w-full px-4 py-2 border border-stone-200 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                            placeholder="Enter last name"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mt-4">
                        <div className="space-y-2">
                          <label className="flex items-center text-stone-700 text-sm font-medium">
                            <Mail className="w-4 h-4 mr-2" />
                            Email Address
                          </label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            className="w-full px-4 py-2 border border-stone-200 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                            placeholder="Enter email address"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="flex items-center text-stone-700 text-sm font-medium">
                            <Phone className="w-4 h-4 mr-2" />
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            className="w-full px-4 py-2 border border-stone-200 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                            placeholder="Enter phone number"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Special Requests */}
                    <div className="space-y-2">
                      <label className="text-stone-700 text-sm font-medium">Special Requests (Optional)</label>
                      <textarea
                        value={formData.specialRequests}
                        onChange={(e) => handleInputChange("specialRequests", e.target.value)}
                        className="w-full px-3 py-2 border border-stone-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        placeholder="Any special requests or preferences..."
                        rows={3}
                      />
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 text-lg font-semibold disabled:opacity-50 rounded-full"
                    >
                      {isSubmitting ? "Processing..." : "Complete Booking"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Booking Summary */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="shadow-xl border-0 sticky top-24">
                <CardHeader>
                  <CardTitle className="text-xl font-serif text-stone-800">Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedRoom && (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                          <Bed className="w-6 h-6 text-amber-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-stone-800">{selectedRoom.label}</h4>
                          <p className="text-sm text-stone-600">${selectedRoom.price} per night</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {formData.checkInDate && formData.checkOutDate && (
                    <div className="space-y-2 border-t border-stone-200 pt-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-stone-600">Check-in:</span>
                        <span className="font-medium">{formData.checkInDate.toDateString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-stone-600">Check-out:</span>
                        <span className="font-medium">{formData.checkOutDate.toDateString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-stone-600">Nights:</span>
                        <span className="font-medium">{nights}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-stone-600">Guests:</span>
                        <span className="font-medium">{formData.guests}</span>
                      </div>
                    </div>
                  )}

                  {selectedRoom && nights > 0 && (
                    <div className="space-y-2 border-t border-stone-200 pt-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-stone-600">Room ({nights} nights):</span>
                        <span className="font-medium">${selectedRoom.price * nights}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-stone-600">Taxes & Fees:</span>
                        <span className="font-medium">${Math.round(selectedRoom.price * nights * 0.12)}</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold border-t border-stone-200 pt-2">
                        <span>Total:</span>
                        <span className="text-amber-600">${Math.round(calculateTotal())}</span>
                      </div>
                    </div>
                  )}

                  {/* Trust Indicators */}
                  <div className="border-t border-stone-200 pt-4 space-y-3">
                    <div className="flex items-center space-x-2 text-sm text-stone-600">
                      <Shield className="w-4 h-4 text-green-600" />
                      <span>Secure booking guaranteed</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-stone-600">
                      <Star className="w-4 h-4 text-amber-500" />
                      <span>4.9/5 guest satisfaction</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-stone-600">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      <span>Prime location</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
