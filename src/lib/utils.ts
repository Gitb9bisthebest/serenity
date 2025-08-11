import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  format,
  parseISO,
  isAfter,
  isBefore,
  differenceInDays,
  addDays,
  startOfDay,
  endOfDay,
} from "date-fns";

/**
 * Utility function to merge Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// =============================================================================
// SERIALIZATION FUNCTIONS FOR PRISMA OBJECTS
// =============================================================================

/**
 * Safely serialize Prisma objects by converting problematic types
 * @param obj - The object to serialize
 * @returns Serialized object safe for JSON conversion
 */
function isDecimalLike(value: any): value is { toNumber: () => number } {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof value.toNumber === "function"
  );
}

export function serializePrismaObject<T extends Record<string, any>>(
  obj: T
): T {
  if (obj === null || obj === undefined) return obj;

  const serialized = { ...obj } as any;

  for (const [key, value] of Object.entries(obj)) {
    if (value instanceof Date) {
      serialized[key] = value.toISOString();
    } else if (typeof value === "bigint") {
      serialized[key] = value.toString();
    } else if (isDecimalLike(value)) {
      serialized[key] = value.toNumber();
    } else if (Array.isArray(value)) {
      serialized[key] = value.map((item) =>
        typeof item === "object" && item !== null
          ? serializePrismaObject(item)
          : item
      );
    } else if (value && typeof value === "object") {
      serialized[key] = serializePrismaObject(value);
    }
  }

  return serialized;
}

/**
 * Convert string dates back to Date objects
 * @param obj - Object with ISO string dates
 * @returns Object with Date objects
 */
function isISOString(str: string): boolean {
  return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z?$/.test(str);
}

export function deserializeDates<T extends Record<string, any>>(obj: T): T {
  if (obj === null || obj === undefined) return obj;

  const result: Record<string, any> = {};

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "string" && isISOString(value)) {
      result[key] = parseISO(value);
    } else if (Array.isArray(value)) {
      result[key] = value.map((item) =>
        typeof item === "object" && item !== null
          ? deserializeDates(item)
          : item
      );
    } else if (value && typeof value === "object") {
      result[key] = deserializeDates(value);
    } else {
      result[key] = value;
    }
  }

  return result as T;
}

// =============================================================================
// CURRENCY FORMATTING UTILITIES
// =============================================================================

/**
 * Format currency amount with proper locale and currency symbol
 * @param amount - Amount to format
 * @param currency - Currency code (default: PHP)
 * @param locale - Locale for formatting (default: en-PH)
 */
export function formatCurrency(
  amount: number | string,
  currency = "PHP",
  locale = "en-PH"
): string {
  const numericAmount =
    typeof amount === "string" ? parseFloat(amount) : amount;

  if (isNaN(numericAmount)) {
    throw new Error("Invalid amount provided for currency formatting");
  }

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numericAmount);
}

/**
 * Parse currency string to number
 * @param currencyString - Currency string to parse
 */
export function parseCurrency(currencyString: string): number {
  const cleaned = currencyString.replace(/[^\d.-]/g, "");
  const amount = parseFloat(cleaned);

  if (isNaN(amount)) {
    throw new Error("Invalid currency string provided");
  }

  return amount;
}

/**
 * Calculate percentage of amount
 * @param amount - Base amount
 * @param percentage - Percentage to calculate
 */
export function calculatePercentage(
  amount: number,
  percentage: number
): number {
  return (amount * percentage) / 100;
}

/**
 * Add tax to amount
 * @param amount - Base amount
 * @param taxRate - Tax rate as percentage
 */
export function addTax(amount: number, taxRate: number): number {
  return amount + calculatePercentage(amount, taxRate);
}

// =============================================================================
// DATE MANIPULATION HELPERS
// =============================================================================

/**
 * Validate check-in and check-out dates
 * @param checkIn - Check-in date
 * @param checkOut - Check-out date
 * @param allowToday - Whether to allow today as check-in date
 */
export function validateBookingDates(
  checkIn: Date,
  checkOut: Date,
  allowToday = false
): { isValid: boolean; error?: string } {
  const today = startOfDay(new Date());
  const checkInDay = startOfDay(checkIn);
  const checkOutDay = startOfDay(checkOut);

  // Check if check-in is in the future (or today if allowed)
  if (allowToday ? isBefore(checkInDay, today) : !isAfter(checkInDay, today)) {
    return {
      isValid: false,
      error: allowToday
        ? "Check-in date cannot be in the past"
        : "Check-in date must be in the future",
    };
  }

  // Check if check-out is after check-in
  if (!isAfter(checkOutDay, checkInDay)) {
    return {
      isValid: false,
      error: "Check-out date must be after check-in date",
    };
  }

  // Check maximum stay duration (e.g., 30 days)
  const daysDifference = differenceInDays(checkOutDay, checkInDay);
  if (daysDifference > 30) {
    return {
      isValid: false,
      error: "Maximum stay duration is 30 days",
    };
  }

  return { isValid: true };
}

/**
 * Calculate number of nights between dates
 * @param checkIn - Check-in date
 * @param checkOut - Check-out date
 */
export function calculateNights(checkIn: Date, checkOut: Date): number {
  return differenceInDays(endOfDay(checkOut), startOfDay(checkIn));
}

/**
 * Generate date range array
 * @param startDate - Start date
 * @param endDate - End date
 */
export function generateDateRange(startDate: Date, endDate: Date): Date[] {
  const dates: Date[] = [];
  let currentDate = startOfDay(startDate);
  const end = startOfDay(endDate);

  while (
    isBefore(currentDate, end) ||
    currentDate.getTime() === end.getTime()
  ) {
    dates.push(new Date(currentDate));
    currentDate = addDays(currentDate, 1);
  }

  return dates;
}

/**
 * Format date for display
 * @param date - Date to format
 * @param formatString - Format string (default: MMM dd, yyyy)
 */
export function formatDate(date: Date, formatString = "MMM dd, yyyy"): string {
  return format(date, formatString);
}

/**
 * Check if date ranges overlap
 * @param start1 - First range start
 * @param end1 - First range end
 * @param start2 - Second range start
 * @param end2 - Second range end
 */
export function dateRangesOverlap(
  start1: Date,
  end1: Date,
  start2: Date,
  end2: Date
): boolean {
  return isBefore(start1, end2) && isAfter(end1, start2);
}

// =============================================================================
// EMAIL VALIDATION AND FORMATTING
// =============================================================================

/**
 * Validate email format using regex
 * @param email - Email to validate
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Normalize email (lowercase, trim)
 * @param email - Email to normalize
 */
export function normalizeEmail(email: string): string {
  return email.toLowerCase().trim();
}

/**
 * Extract domain from email
 * @param email - Email address
 */
export function getEmailDomain(email: string): string {
  const normalized = normalizeEmail(email);
  return normalized.split("@")[1];
}

/**
 * Mask email for display (e.g., j***@example.com)
 * @param email - Email to mask
 */
export function maskEmail(email: string): string {
  const [username, domain] = email.split("@");
  if (username.length <= 2) return email;

  const maskedUsername =
    username.charAt(0) + "*".repeat(username.length - 2) + username.slice(-1);
  return `${maskedUsername}@${domain}`;
}

// =============================================================================
// PASSWORD STRENGTH UTILITIES
// =============================================================================

export interface PasswordStrength {
  score: number; // 0-4 (weak to strong)
  feedback: string[];
  isValid: boolean;
}

/**
 * Check password strength
 * @param password - Password to check
 */
export function checkPasswordStrength(password: string): PasswordStrength {
  const feedback: string[] = [];
  let score = 0;

  // Length check
  if (password.length < 8) {
    feedback.push("Password must be at least 8 characters long");
  } else if (password.length >= 12) {
    score++;
  }

  // Character variety checks
  if (!/[a-z]/.test(password)) {
    feedback.push("Password must contain at least one lowercase letter");
  } else {
    score++;
  }

  if (!/[A-Z]/.test(password)) {
    feedback.push("Password must contain at least one uppercase letter");
  } else {
    score++;
  }

  if (!/\d/.test(password)) {
    feedback.push("Password must contain at least one number");
  } else {
    score++;
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    feedback.push("Password must contain at least one special character");
  } else {
    score++;
  }

  // Common password patterns
  if (/(.)\1{2,}/.test(password)) {
    feedback.push("Avoid repeating characters");
    score = Math.max(0, score - 1);
  }

  if (/123|abc|password|qwerty/i.test(password)) {
    feedback.push("Avoid common patterns");
    score = Math.max(0, score - 1);
  }

  const isValid =
    password.length >= 8 &&
    /[a-z]/.test(password) &&
    /[A-Z]/.test(password) &&
    /\d/.test(password) &&
    /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return {
    score: Math.min(4, Math.max(0, score)),
    feedback,
    isValid,
  };
}

/**
 * Generate secure random password
 * @param length - Password length (default: 12)
 */
export function generateSecurePassword(length = 12): string {
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const symbols = '!@#$%^&*(),.?":{}|<>';

  const allChars = lowercase + uppercase + numbers + symbols;
  let password = "";

  // Ensure at least one character from each category
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += symbols[Math.floor(Math.random() * symbols.length)];

  // Fill remaining length
  for (let i = 4; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  // Shuffle the password
  return password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
}

// =============================================================================
// IMAGE URL HELPERS
// =============================================================================

/**
 * Validate image URL
 * @param url - URL to validate
 */
export function isValidImageUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url);
    return /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(parsedUrl.pathname);
  } catch {
    return false;
  }
}

/**
 * Generate optimized image URL (for services like Cloudinary)
 * @param url - Original image URL
 * @param width - Desired width
 * @param height - Desired height
 * @param quality - Image quality (1-100)
 */
export function getOptimizedImageUrl(
  url: string,
  width?: number,
  height?: number,
  quality = 80
): string {
  // This is a placeholder - implement based on your image service
  // For example, if using Cloudinary:
  // return url.replace('/upload/', `/upload/w_${width},h_${height},q_${quality}/`);
  return url;
}

/**
 * Get image file extension
 * @param url - Image URL
 */
export function getImageExtension(url: string): string {
  try {
    const parsedUrl = new URL(url);
    const match = parsedUrl.pathname.match(/\.([^.]+)$/);
    return match ? match[1].toLowerCase() : "";
  } catch {
    return "";
  }
}

/**
 * Generate placeholder image URL
 * @param width - Image width
 * @param height - Image height
 * @param text - Placeholder text
 */
export function getPlaceholderImageUrl(
  width = 400,
  height = 300,
  text = "No Image"
): string {
  return `https://via.placeholder.com/${width}x${height}?text=${encodeURIComponent(
    text
  )}`;
}

// =============================================================================
// BOOKING STATUS UTILITIES
// =============================================================================

export enum BookingStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  CANCELLED = "CANCELLED",
  COMPLETED = "COMPLETED",
  NO_SHOW = "NO_SHOW",
  CHECKED_IN = "CHECKED_IN",
  CHECKED_OUT = "CHECKED_OUT",
}

/**
 * Get booking status display text
 * @param status - Booking status
 */
export function getBookingStatusText(status: BookingStatus): string {
  const statusMap = {
    [BookingStatus.PENDING]: "Pending Payment",
    [BookingStatus.CONFIRMED]: "Confirmed",
    [BookingStatus.CANCELLED]: "Cancelled",
    [BookingStatus.COMPLETED]: "Completed",
    [BookingStatus.NO_SHOW]: "No Show",
    [BookingStatus.CHECKED_IN]: "Checked In",
    [BookingStatus.CHECKED_OUT]: "Checked Out",
  };

  return statusMap[status] || "Unknown";
}

/**
 * Get booking status color class
 * @param status - Booking status
 */
export function getBookingStatusColor(status: BookingStatus): string {
  const colorMap = {
    [BookingStatus.PENDING]: "text-yellow-600 bg-yellow-50",
    [BookingStatus.CONFIRMED]: "text-green-600 bg-green-50",
    [BookingStatus.CANCELLED]: "text-red-600 bg-red-50",
    [BookingStatus.COMPLETED]: "text-blue-600 bg-blue-50",
    [BookingStatus.NO_SHOW]: "text-gray-600 bg-gray-50",
    [BookingStatus.CHECKED_IN]: "text-purple-600 bg-purple-50",
    [BookingStatus.CHECKED_OUT]: "text-indigo-600 bg-indigo-50",
  };

  return colorMap[status] || "text-gray-600 bg-gray-50";
}

/**
 * Check if booking can be cancelled
 * @param status - Current booking status
 * @param checkInDate - Check-in date
 */
export function canCancelBooking(
  status: BookingStatus,
  checkInDate: Date
): boolean {
  const nonCancellableStatuses = [
    BookingStatus.CANCELLED,
    BookingStatus.COMPLETED,
    BookingStatus.NO_SHOW,
    BookingStatus.CHECKED_OUT,
  ];

  if (nonCancellableStatuses.includes(status)) {
    return false;
  }

  // Cannot cancel on the day of check-in
  const today = startOfDay(new Date());
  const checkIn = startOfDay(checkInDate);

  return isAfter(checkIn, today);
}

// =============================================================================
// ERROR HANDLING UTILITIES
// =============================================================================

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly errorCode?: string;

  constructor(
    message: string,
    statusCode: number = 500,
    isOperational: boolean = true,
    errorCode?: string
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.errorCode = errorCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Handle async errors in route handlers
 * @param fn - Async function to wrap
 */
export function asyncHandler<T extends any[], R>(
  fn: (...args: T) => Promise<R>
) {
  return (...args: T): Promise<R> => {
    return Promise.resolve(fn(...args)).catch((error) => {
      throw error;
    });
  };
}

/**
 * Standardize API error responses
 * @param error - Error object
 */
export function standardizeError(error: unknown): {
  message: string;
  statusCode: number;
  errorCode?: string;
} {
  if (error instanceof AppError) {
    return {
      message: error.message,
      statusCode: error.statusCode,
      errorCode: error.errorCode,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      statusCode: 500,
      errorCode: "INTERNAL_SERVER_ERROR",
    };
  }

  return {
    message: "An unexpected error occurred",
    statusCode: 500,
    errorCode: "UNKNOWN_ERROR",
  };
}

// =============================================================================
// TYPE-SAFE OBJECT TRANSFORMATION FUNCTIONS
// =============================================================================

/**
 * Pick specific fields from object
 * @param obj - Source object
 * @param keys - Keys to pick
 */
export function pick<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    if (key in obj) {
      result[key as K] = obj[key as K];
    }
  }
  return result;
}

/**
 * Omit specific fields from object
 * @param obj - Source object
 * @param keys - Keys to omit
 */
export function omit<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const result = { ...obj };
  for (const key of keys) {
    delete result[key];
  }
  return result;
}

/**
 * Transform object keys
 * @param obj - Source object
 * @param transformer - Key transformation function
 */
export function transformKeys<T extends Record<string, any>>(
  obj: T,
  transformer: (key: string) => string
): Record<string, any> {
  const result: Record<string, any> = {};
  for (const [key, value] of Object.entries(obj)) {
    result[transformer(key)] = value;
  }
  return result;
}

/**
 * Deep clone object
 * @param obj - Object to clone
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as T;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => deepClone(item)) as T;
  }

  const cloned = {} as T;
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }

  return cloned;
}

/**
 * Convert camelCase to snake_case
 * @param str - String to convert
 */
export function camelToSnake(str: string): string {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

/**
 * Convert snake_case to camelCase
 * @param str - String to convert
 */
export function snakeToCamel(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}
