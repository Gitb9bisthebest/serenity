import { z } from "zod";
import { isBefore } from "date-fns";

// Schema for booking details
export const BookingDetailsSchema = z
  .object({
    checkInDate: z.date({
      required_error: "Check-in date is required",
      invalid_type_error: "Check-in date must be a valid date",
    }),
    checkOutDate: z.date({
      required_error: "Check-out date is required",
      invalid_type_error: "Check-out date must be a valid date",
    }),
    guests: z
      .string()
      .min(1, "Number of guests is required")
      .regex(/^\d+$/, "Guests must be a valid number")
      .transform((val) => parseInt(val))
      .refine((val) => val > 0, "Must have at least 1 guest")
      .refine((val) => val <= 20, "Maximum 20 guests allowed"),
  })
  .refine(
    (data) => {
      return (
        !isBefore(data.checkOutDate, data.checkInDate) &&
        data.checkOutDate.getTime() !== data.checkInDate.getTime()
      );
    },
    {
      message: "Check-out date must be after check-in date",
      path: ["checkOutDate"],
    }
  );

export type BookingDetails = z.infer<typeof BookingDetailsSchema>;

// Schema for user registration
export const registerFormSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Passwords do not match"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerFormSchema>;

// Schema for signing users in
export const signInFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Schema for room details
export const RoomSchema = z.object({
  title: z.string().min(3, "Room title is required"),
  description: z.string().min(10, "Description is too short"),
  pricePerNight: z.number().positive("Price must be a positive number"),
  capacity: z.number().min(1, "At least one guest").max(20, "Max 20 guests"),
  images: z
    .array(z.string().url("Must be a valid image URL"))
    .min(1, "At least one image is required"),
});

export type RoomDetails = z.infer<typeof RoomSchema>;

// Schema for payment processing
export const PaymentSchema = z.object({
  bookingId: z.string().uuid("Invalid booking ID"),
  amount: z.number().positive("Amount must be a positive number"),
  method: z.enum(["paypal", "stripe", "gcash", "cod"], {
    required_error: "Payment method is required",
  }),
});

export type PaymentDetails = z.infer<typeof PaymentSchema>;

// Schema for room reviews
export const ReviewSchema = z.object({
  bookingId: z.string().uuid("Invalid booking ID"),
  rating: z
    .number()
    .min(1, "Minimum rating is 1")
    .max(5, "Maximum rating is 5"),
  comment: z.string().max(1000, "Comment too long").optional(),
});

export type ReviewDetails = z.infer<typeof ReviewSchema>;

// Schema for admin actions
export const AdminActionSchema = z.object({
  action: z.enum(["approveBooking", "cancelBooking", "featureRoom"]),
  targetId: z.string().uuid("Invalid target ID"),
});

export type AdminAction = z.infer<typeof AdminActionSchema>;

// Schema for query parameters
export const QueryParamsSchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val) : 1))
    .refine((val) => val > 0, "Page must be a positive number"),
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val) : 10))
    .refine((val) => val > 0 && val <= 100, "Limit must be between 1-100"),
  minPrice: z
    .string()
    .optional()
    .transform((val) => (val ? parseFloat(val) : undefined)),
  maxPrice: z
    .string()
    .optional()
    .transform((val) => (val ? parseFloat(val) : undefined)),
  sortBy: z
    .enum(["price", "rating", "date"], {
      required_error: "Sort parameter is invalid",
    })
    .optional(),
});

export type QueryParams = z.infer<typeof QueryParamsSchema>;
