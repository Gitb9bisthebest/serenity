import type React from "react";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Serenity Suites - Luxury Staycation Hotel",
  description:
    "Experience luxury and tranquility at Serenity Suites. Premium accommodations for the perfect staycation just moments from the city.",
  keywords:
    "luxury hotel, staycation, premium suites, spa, resort, accommodation",
  authors: [{ name: "Serenity Suites" }],
  openGraph: {
    title: "Serenity Suites - Luxury Staycation Hotel",
    description:
      "Experience luxury and tranquility at Serenity Suites. Premium accommodations for the perfect staycation.",
    url: "https://serenitysuites.com",
    siteName: "Serenity Suites",
    images: [
      {
        url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Serenity Suites Luxury Hotel",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Serenity Suites - Luxury Staycation Hotel",
    description: "Experience luxury and tranquility at Serenity Suites.",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={poppins.variable}>
      <body className="font-poppins antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
