"use client";

import Link from "next/link";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GoogleIcon, FacebookIcon } from "../ui/social-icon";
import { signInWithCredentials } from "@/lib/actions/user.action";
import { useState, useActionState } from "react";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full bg-amber-600 text-white py-3 hover:bg-amber-700 rounded-full disabled:opacity-50"
    >
      {pending ? "Signing In..." : "Sign In"}
    </Button>
  );
}

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [data, action] = useActionState(signInWithCredentials, {
    success: false,
    message: "",
  });

  return (
    <Card className="w-full max-w-md shadow-2xl border-0">
      <CardHeader className="text-center pb-6">
        <div className="mb-4">
          <Badge className="bg-amber-100 text-amber-800">
            <Link href="/">Serenity Suites</Link>
          </Badge>
        </div>
        <CardTitle className="text-2xl font-serif text-stone-800">
          Welcome Back
        </CardTitle>
        <p className="text-stone-600 mt-2">Sign in to your account</p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Social Login Buttons */}
        <div className="space-y-3">
          <Button
            type="button"
            className="w-full bg-white hover:bg-gray-100 border-gray-300 text-gray-700 transition-all duration-200 h-12 rounded-full border-2 hover:text-gray-800"
          >
            <span className="mr-3">
              <GoogleIcon />
            </span>
            Continue with Google
          </Button>
          <Button
            type="button"
            className="w-full bg-[#1877F2] hover:bg-[#166FE5] text-white transition-all duration-200 h-12 rounded-full border-2"
          >
            <span className="mr-3">
              <FacebookIcon />
            </span>
            Continue with Facebook
          </Button>
        </div>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-stone-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-4 text-stone-500">
              or continue with email
            </span>
          </div>
        </div>

        {/* Error Message */}
        {data?.message && (
          <div
            className={`text-sm text-center p-3 rounded-lg ${
              data.success
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {data.message}
          </div>
        )}

        {/* Email/Password Form */}
        <form action={action} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              className="w-full pl-10 pr-4 py-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              required
              className="w-full pl-10 pr-12 py-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-amber-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5 text-stone-400" />
              ) : (
                <Eye className="w-5 h-5 text-stone-400" />
              )}
            </button>
          </div>

          <div className="text-right">
            <button
              type="button"
              className="text-sm text-amber-600 hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <SubmitButton />
        </form>

        <div className="text-center text-sm text-stone-600">
          Don't have an account?{" "}
          <Link href="/register" className="text-amber-600 hover:underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
