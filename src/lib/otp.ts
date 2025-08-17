import { prisma } from "db/prisma";

// Generate a random 6-digit OTP code
export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Create an OTP record in the database
export async function createOTP(
  email: string,
  userId: string,
  type: string = "REGISTRATION"
): Promise<string> {
  const code = generateOTP();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

  // Clean up old/used OTPs for this email and type
  await prisma.otp.deleteMany({
    where: {
      email,
      type,
      OR: [{ used: true }, { expiresAt: { lt: new Date() } }],
    },
  });

  // Create new OTP
  await prisma.otp.create({
    data: {
      code,
      email,
      type,
      expiresAt,
      userId,
    },
  });

  return code;
}

// Validate an OTP code
export async function validateOTP(
  email: string,
  code: string,
  type: string = "REGISTRATION"
): Promise<{ valid: boolean; userId?: string; message?: string }> {
  const otp = await prisma.otp.findFirst({
    where: {
      email,
      code,
      type,
      used: false,
      expiresAt: { gt: new Date() },
    },
  });

  if (!otp) {
    return {
      valid: false,
      message: "Invalid or expired OTP code",
    };
  }

  // Mark OTP as used
  await prisma.otp.update({
    where: { id: otp.id },
    data: { used: true },
  });

  return {
    valid: true,
    userId: otp.userId || undefined,
  };
}

// Check if user can request a new OTP (rate limiting)
export async function canRequestOTP(
  email: string,
  type: string = "REGISTRATION"
): Promise<boolean> {
  const recentOTP = await prisma.otp.findFirst({
    where: {
      email,
      type,
      createdAt: { gt: new Date(Date.now() - 60 * 1000) }, // Within last minute
    },
  });

  return !recentOTP;
}

// Clean up expired OTPs (can be run as a cron job)
export async function cleanupExpiredOTPs(): Promise<void> {
  await prisma.otp.deleteMany({
    where: {
      expiresAt: { lt: new Date() },
    },
  });
}
