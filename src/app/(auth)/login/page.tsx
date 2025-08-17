import { LoginForm } from "@/components/auth/login-form";
import { auth } from "@/lib/auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Serenity Suites | Sign In",
};

export default async function LoginPage() {
  const session = await auth();

  if (session) {
    return redirect("/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <LoginForm />
    </div>
  );
}
