"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, User } from "lucide-react";
import { useState, useEffect, ReactNode } from "react";
import Link from "next/link";

interface NavigationProps {
  userButton: ReactNode;
}

export function Navigation({ userButton }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect - make transparent at top
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking on a link
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#gallery", label: "Gallery" },
    { href: "#rooms", label: "Rooms" },
    { href: "#amenities", label: "Amenities" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          scrolled || isOpen
            ? "bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-lg"
            : "bg-transparent backdrop-blur-none border-b border-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={`text-xl sm:text-2xl font-serif z-50 relative transition-colors duration-500 ${
                scrolled || isOpen ? "text-stone-800" : "text-white"
              }`}
            >
              Serenity Suites
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`font-medium transition-colors duration-500 ${
                    scrolled || isOpen
                      ? "text-stone-600 hover:text-stone-800"
                      : "text-white/90 hover:text-white"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Book Now Button */}
              <Button
                className={`transition-all duration-500 rounded-full ${
                  scrolled || isOpen
                    ? "bg-amber-600 hover:bg-amber-700 text-white border-amber-600"
                    : "bg-white/20 hover:bg-amber-600 hover:border-amber-600 text-white border-white/30 backdrop-blur-sm"
                }`}
                variant="outline"
              >
                Book Now
              </Button>
              {/* UserButton - Server Component passed as prop */}
              <div
                className={`transition-all duration-500 ${
                  scrolled || isOpen
                    ? "[&_button]:text-stone-600 [&_button]:hover:text-stone-800"
                    : "[&_button]:text-stone-600 [&_button]:hover:text-stone-800"
                }`}
              >
                {userButton}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden z-50 relative p-2 rounded-md transition-all duration-500 ${
                scrolled || isOpen
                  ? "hover:bg-stone-100 text-stone-800"
                  : "hover:bg-white/20 text-white"
              }`}
              aria-label="Toggle mobile menu"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Mobile Menu */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-40 lg:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Menu Header */}
                <div className="px-6 py-8 border-b border-stone-200">
                  <h2 className="text-2xl font-serif text-stone-800">Menu</h2>
                </div>

                {/* Mobile Navigation Links */}
                <div className="flex-1 px-6 py-8">
                  <nav className="space-y-6">
                    {navLinks.map((link, index) => (
                      <motion.a
                        key={link.href}
                        href={link.href}
                        onClick={handleLinkClick}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                        className="block text-lg font-medium text-stone-700 hover:text-stone-900 transition-colors duration-200 py-2"
                      >
                        {link.label}
                      </motion.a>
                    ))}
                  </nav>
                </div>

                {/* Mobile Menu Footer */}
                <div className="px-6 py-8 border-t border-stone-200 space-y-4">
                  {/* Mobile UserButton */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="w-full"
                  >
                    {userButton}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <Button
                      className="w-full bg-amber-600 hover:bg-amber-700 text-white transition-all duration-300 rounded-full"
                      onClick={handleLinkClick}
                    >
                      Book Now
                    </Button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="text-center"
                  >
                    <p className="text-sm text-stone-500">+1 (555) 123-4567</p>
                    <p className="text-sm text-stone-500">
                      hello@serenitysuites.com
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
