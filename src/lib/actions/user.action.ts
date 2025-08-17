"use server";

import { signIn, signOut } from "@/lib/auth";
import { signInFormSchema } from "../validators";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";
import { prisma } from "db/prisma";
import { hash } from "../encrypt";
import { registerFormSchema } from "../validators";
import { z } from "zod";
import { createOTP, validateOTP, canRequestOTP } from "../otp";
import { sendEmail, generateOTPEmailHTML } from "../services/email.service";

// Register a new user (unverified)
export async function registerUser(prevState: unknown, formData: FormData) {
  try {
    const validatedData = registerFormSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });

    const hashedPassword = await hash(validatedData.password);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      return {
        success: false,
        message: "User with this email already exists",
      };
    }

    // Create the unverified user
    const user = await prisma.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        password: hashedPassword,
        role: "guest", // Default role
        verified: false, // User is not verified yet
      },
    });

    // Generate and send OTP
    try {
      const otpCode = await createOTP(
        validatedData.email,
        user.id,
        "REGISTRATION"
      );

      const emailResult = await sendEmail({
        to: validatedData.email,
        subject: "Verify Your Email - Serenity Suites",
        html: generateOTPEmailHTML(validatedData.name, otpCode),
      });

      if (!emailResult.success) {
        // If email fails, delete the user and return error
        await prisma.user.delete({ where: { id: user.id } });
        return {
          success: false,
          message: "Failed to send verification email. Please try again.",
        };
      }

      return {
        success: true,
        message:
          "Account created successfully! Please check your email for verification code.",
        userId: user.id,
        email: validatedData.email,
      };
    } catch (otpError) {
      // If OTP creation fails, delete the user and return error
      await prisma.user.delete({ where: { id: user.id } });
      return {
        success: false,
        message: "Failed to create verification code. Please try again.",
      };
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, message: error.errors[0].message };
    }

    // Handle Prisma-specific errors
    if (error instanceof Error) {
      if (error.message.includes("Unique constraint")) {
        return {
          success: false,
          message: "User with this email already exists",
        };
      }
      if (error.message.includes("Database")) {
        return {
          success: false,
          message: "Database error. Please try again later.",
        };
      }
    }

    return {
      success: false,
      message: "Failed to create account. Please try again.",
    };
  }
}

// Verify registration OTP
export async function verifyRegistrationOTP(
  prevState: unknown,
  formData: FormData
) {
  try {
    const email = formData.get("email") as string;
    const otpCode = formData.get("otpCode") as string;

    if (!email || !otpCode) {
      return {
        success: false,
        message: "Email and OTP code are required",
      };
    }

    const validation = await validateOTP(email, otpCode, "REGISTRATION");

    if (!validation.valid) {
      return {
        success: false,
        message: validation.message || "Invalid OTP code",
      };
    }

    // Mark user as verified
    await prisma.user.update({
      where: { email },
      data: { verified: true },
    });

    return {
      success: true,
      message: "Email verified successfully! You can now sign in.",
    };
  } catch (error) {
    console.error("OTP verification error:", error);
    return {
      success: false,
      message: "Failed to verify OTP. Please try again.",
    };
  }
}

// Resend OTP
export async function resendOTP(prevState: unknown, formData: FormData) {
  try {
    const email = formData.get("email") as string;

    if (!email) {
      return {
        success: false,
        message: "Email is required",
      };
    }

    // Check rate limiting
    const canRequest = await canRequestOTP(email, "REGISTRATION");
    if (!canRequest) {
      return {
        success: false,
        message: "Please wait 60 seconds before requesting another code",
      };
    }

    // Find the user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    }

    if (user.verified) {
      return {
        success: false,
        message: "User is already verified",
      };
    }

    // Generate and send new OTP
    const otpCode = await createOTP(email, user.id, "REGISTRATION");

    const emailResult = await sendEmail({
      to: email,
      subject: "New Verification Code - Serenity Suites",
      html: generateOTPEmailHTML(user.name, otpCode),
    });

    if (!emailResult.success) {
      return {
        success: false,
        message: "Failed to send verification email. Please try again.",
      };
    }

    return {
      success: true,
      message: "New verification code sent to your email",
    };
  } catch (error) {
    console.error("Resend OTP error:", error);
    return {
      success: false,
      message: "Failed to resend OTP. Please try again.",
    };
  }
}

// Sign in the user with credentials (only verified users)
export async function signInWithCredentials(
  prevState: unknown,
  formData: FormData
) {
  try {
    const user = signInFormSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    // Check if user is verified before allowing sign in
    const dbUser = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (!dbUser) {
      return { success: false, message: "Invalid email or password" };
    }

    if (!dbUser.verified) {
      return {
        success: false,
        message:
          "Please verify your email before signing in. Check your inbox for the verification code.",
      };
    }

    await signIn("credentials", user);

    return { success: true, message: "Signed in successfully" };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return { success: false, message: "Invalid email or password" };
  }
}

// Sign out the user
export async function signOutUser() {
  try {
    await signOut();
    redirect("/");
  } catch (error) {
    // If it's a redirect error, that's expected for sign out
    if (isRedirectError(error)) {
      redirect("/");
    }

    console.error("Error signing out:", error);
    redirect("/");
  }
}
