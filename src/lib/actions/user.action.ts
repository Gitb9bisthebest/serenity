"use server";

import { signIn, signOut } from "@/lib/auth";
import { signInFormSchema } from "../validators";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";
import { prisma } from "db/prisma";
import { hash } from "../encrypt";
import { registerFormSchema } from "../validators";
import { z } from "zod";

// Register a new user
export async function registerUser(prevState: unknown, formData: FormData) {
  try {
    const validatedData = registerFormSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    });

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      return { success: false, message: "User with this email already exists" };
    }

    // Hash the password
    const hashedPassword = await hash(validatedData.password);

    // Create the user
    const user = await prisma.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        password: hashedPassword,
        role: "guest", // Default role
      },
    });

    // Sign in the user after successful registration
    try {
      const result = await signIn("credentials", {
        email: validatedData.email,
        password: validatedData.password,
        redirect: false,
      });

      if (result?.error) {
        return {
          success: true,
          message:
            "Account created successfully! Please sign in with your credentials.",
        };
      }

      return {
        success: true,
        message: "Account created successfully! Welcome to Serenity Suites!",
      };
    } catch (signInError) {
      // If sign-in fails, still return success but log the error
      return {
        success: true,
        message:
          "Account created successfully! Please sign in with your credentials.",
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

// Sign in the user with credentials
export async function signInWithCredentials(
  prevState: unknown,
  formData: FormData
) {
  try {
    const user = signInFormSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });
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
