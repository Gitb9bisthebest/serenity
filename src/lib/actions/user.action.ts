"use server";

import { signIn, signOut } from "@/lib/auth";
import { signInFormSchema } from "../validators";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";

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
