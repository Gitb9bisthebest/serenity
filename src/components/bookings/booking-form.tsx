"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Users, Calendar, CalendarCheck } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addDays, isBefore } from "date-fns";
import { cn } from "@/lib/utils";
import { handleBookNow } from "@/lib/services/booking-form-handler";

export function BookingForm() {
  const [checkInDate, setCheckInDate] = useState<Date | undefined>();
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>();
  const [guests, setGuests] = useState("");

  const disableCheckInDates = (date: Date) => {
    return isBefore(date, new Date());
  };

  const disableCheckOutDates = (date: Date) => {
    if (!checkInDate) return isBefore(date, new Date());
    return isBefore(date, addDays(checkInDate, 1));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.3 }}
      className="w-full max-w-5xl mx-auto mt-8 bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 shadow-xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        {/* Check-in Date */}
        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium">
            <Calendar className="w-4 h-4 mr-2" />
            Check-in Date
          </label>
          <DatePicker
            date={checkInDate}
            onDateChange={(date) => setCheckInDate(date)}
            placeholder="Select check-in"
            disabled={disableCheckInDates}
          />
        </div>

        {/* Check-out Date */}
        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium">
            <CalendarCheck className="w-4 h-4 mr-2" />
            Check-out Date
          </label>
          <DatePicker
            date={checkOutDate}
            onDateChange={(date) => setCheckOutDate(date)}
            placeholder="Select check-out"
            disabled={disableCheckOutDates}
          />
        </div>

        {/* Guests */}
        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium">
            <Users className="w-4 h-4 mr-2" />
            Guests
          </label>
          <Select value={guests} onValueChange={setGuests}>
            <SelectTrigger
              className={cn(
                "bg-white/90 backdrop-blur-sm hover:text-stone-800 border-white/30 hover:bg-white/95 h-10 rounded-full",
                guests ? "text-stone-800" : "text-stone-500"
              )}
            >
              <SelectValue placeholder="Select guests" />
            </SelectTrigger>
            <SelectContent>
              {[...Array(8)].map((_, i) => (
                <SelectItem key={i + 1} value={(i + 1).toString()}>
                  {i + 1 === 8
                    ? "8+ Guests"
                    : `${i + 1} Guest${i > 0 ? "s" : ""}`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Book Button */}
        <div className="space-y-2">
          <div className="h-6"></div>
          <Button
            onClick={() => handleBookNow({ checkInDate, checkOutDate, guests })}
            className="bg-amber-600 hover:bg-amber-700 text-white border-none h-10 px-8 w-full font-semibold rounded-full"
          >
            Book Now
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
