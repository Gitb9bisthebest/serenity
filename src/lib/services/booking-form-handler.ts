import { toast } from "sonner";
import { BookingDetailsSchema } from "../validators";
import { ZodError } from "zod";

type BookingFormData = {
  checkInDate?: Date;
  checkOutDate?: Date;
  guests: string;
};

export function handleBookNow({
  checkInDate,
  checkOutDate,
  guests,
}: BookingFormData) {
  try {
    const validatedData = BookingDetailsSchema.parse({
      checkInDate,
      checkOutDate,
      guests,
    });

    // Proceed with booking logic using validated data. we'll work on later
    console.log("Booking details:", {
      checkIn: validatedData.checkInDate,
      checkOut: validatedData.checkOutDate,
      guests: validatedData.guests,
    });

    toast.success("Booking Confirmed ✅", {
      description: `Check-in: ${validatedData.checkInDate.toDateString()}\nCheck-out: ${validatedData.checkOutDate.toDateString()}\nGuests: ${
        validatedData.guests
      }`,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      const firstError = error.errors[0];
      toast.error("Booking Error", {
        description: firstError.message,
      });
    } else {
      toast.error("Something went wrong", {
        description: "Please try again later",
      });
    }
  }
}
