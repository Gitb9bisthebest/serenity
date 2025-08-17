"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, User, Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GoogleIcon, FacebookIcon } from "../ui/social-icon";
import { registerUser } from "@/lib/actions/user.action";
import { useToast } from "@/hooks/use-toast";
import OTPModal from "./otp-modal";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [registrationData, setRegistrationData] = useState<{
    email: string;
    userName: string;
  } | null>(null);

  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    const formData = new FormData(event.currentTarget);

    try {
      const password = formData.get("password") as string;
      const confirmPassword = formData.get("confirmPassword") as string;
      const name = formData.get("name") as string;
      const email = formData.get("email") as string;

      // Validation before sending to backend
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        toast({
          title: "Validation Error",
          description: "Passwords do not match",
          variant: "destructive",
        });
        return;
      }

      const result = await registerUser(null, formData);

      if (result.success) {
        setSuccess(result.message);
        setRegistrationData({
          email: email,
          userName: name,
        });
        setShowOTPModal(true);

        toast({
          title: "Success!",
          description: result.message,
        });
      } else {
        setError(result.message);
        toast({
          title: "Registration Failed",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      const errorMessage = "An unexpected error occurred. Please try again.";

      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseOTPModal = () => {
    setShowOTPModal(false);
    setRegistrationData(null);
    // Reset form after modal is closed
    setSuccess(null);
    setError(null);
  };

  return (
    <>
      <Card className="w-full max-w-md shadow-2xl border-0">
        <CardHeader className="text-center pb-6">
          <div className="mb-4">
            <Badge className="bg-amber-100 text-amber-800">
              <Link href="/">Serenity Suites</Link>
            </Badge>
          </div>
          <CardTitle className="text-2xl font-serif text-stone-800">
            Create an Account
          </CardTitle>
          <p className="text-stone-600 mt-2">Start your journey with us</p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Success/Error Messages */}
          {success && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
              {success}
            </div>
          )}

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Social Login Buttons */}
          <div className="space-y-3">
            <Button
              type="button"
              className="w-full bg-white hover:bg-gray-100 border-gray-300 text-gray-700 transition-all duration-200 h-12 rounded-full border-2 hover:text-gray-800"
              disabled={isLoading}
            >
              <span className="mr-3">
                <GoogleIcon />
              </span>
              Continue with Google
            </Button>
            <Button
              type="button"
              className="w-full bg-[#1877F2] hover:bg-[#166FE5] text-white transition-all duration-200 h-12 rounded-full border-2"
              disabled={isLoading}
            >
              <span className="mr-3">
                <FacebookIcon />
              </span>
              Continue with Facebook
            </Button>
          </div>

          {/* Divider */}
          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-stone-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-stone-500">
                or sign up with email
              </span>
            </div>
          </div>

          {/* Email Signup Form */}
          {/* Full Name */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="w-full pl-10 pr-4 py-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                disabled={isLoading}
              />
            </div>

            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="w-full pl-10 pr-4 py-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                disabled={isLoading}
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="w-full pl-10 pr-12 py-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5 text-stone-400" />
                ) : (
                  <Eye className="w-5 h-5 text-stone-400" />
                )}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative mt-4">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                className="w-full pl-10 pr-12 py-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
                disabled={isLoading}
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5 text-stone-400" />
                ) : (
                  <Eye className="w-5 h-5 text-stone-400" />
                )}
              </button>
            </div>

            <Button
              type="submit"
              className="w-full bg-amber-600 text-white py-3 hover:bg-amber-700 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          {/* Redirect to Login */}
          <div className="text-center text-sm text-stone-600">
            Already have an account?{" "}
            <Link href="/login" className="text-amber-600 hover:underline">
              Sign in
            </Link>
          </div>

          {/* Terms and Privacy */}
          <p className="text-xs text-stone-500 text-center leading-relaxed mt-4">
            By creating an account, you agree to our{" "}
            <a href="#" className="text-amber-600 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-amber-600 hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </CardContent>
      </Card>

      {/* OTP Modal */}
      {registrationData && (
        <OTPModal
          isOpen={showOTPModal}
          onClose={handleCloseOTPModal}
          email={registrationData.email}
          userName={registrationData.userName}
        />
      )}
    </>
  );
}
