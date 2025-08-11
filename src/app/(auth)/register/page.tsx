import RegisterForm from "@/components/auth/register-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Serenity Suites | Sign Up",
  description: "Create an account to book your perfect stay.",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-white">
      <RegisterForm />
    </div>
  );
}
