"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserIcon, X, Menu, LogOut } from "lucide-react";
import { signOutUser } from "@/lib/actions/user.action"; // Import the server action

interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string;
}

interface NavClientProps {
  user?: User | null;
}

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#gallery", label: "Gallery" },
  { href: "#rooms", label: "Rooms" },
  { href: "#amenities", label: "Amenities" },
] as const;

// Animation variants for better performance
const menuVariants = {
  closed: { x: "100%" },
  open: { x: 0 },
};

const overlayVariants = {
  closed: { opacity: 0 },
  open: { opacity: 1 },
};

const iconVariants = {
  closed: { rotate: 0, opacity: 1 },
  open: { rotate: 180, opacity: 1 },
};

export default function NavClient({ user }: NavClientProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  // Memoized scroll handler
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  // Scroll effect with cleanup
  useEffect(() => {
    handleScroll(); // Check initial scroll position
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Body scroll lock with cleanup
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "0px"; // Prevent layout shift
    }

    return () => {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "unset";
    };
  }, [isOpen]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  // Memoized handlers
  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);
  const closeMenu = useCallback(() => setIsOpen(false), []);

  // Memoized user display data
  const userDisplayData = useMemo(() => {
    if (!user) return null;

    return {
      initial:
        user.name?.charAt(0).toUpperCase() ??
        user.email?.charAt(0).toUpperCase() ??
        "U",
      displayName: user.name ?? "User",
      email: user.email ?? "",
    };
  }, [user]);

  // Memoized theme classes
  const themeClasses = useMemo(() => {
    const isLight = scrolled || isOpen;
    return {
      nav: isLight
        ? "bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-lg"
        : "bg-transparent border-b border-transparent",
      logo: isLight ? "text-stone-800" : "text-white",
      links: isLight
        ? "text-stone-600 hover:text-stone-800"
        : "text-white/90 hover:text-white",
      button: isLight
        ? "bg-amber-600 hover:bg-amber-700 text-white"
        : "bg-white/20 hover:bg-amber-600 text-white border-white/30",
      menuButton: isLight
        ? "hover:bg-stone-100 text-stone-800"
        : "hover:bg-white/20 text-white",
    };
  }, [scrolled, isOpen]);

  // Updated sign out handler using server action
  const handleSignOut = useCallback(async () => {
    try {
      setIsSigningOut(true);
      closeMenu();
      await signOutUser(); // This will handle the redirect to homepage
    } catch (error) {
      console.error("Sign out error:", error);
      setIsSigningOut(false);
    }
  }, [closeMenu]);

  // Render user authentication section
  const renderUserSection = () => {
    if (!user || !userDisplayData) {
      return (
        <Button asChild variant="ghost" className="rounded-full">
          <Link href="/login" className="!text-inherit flex items-center">
            <UserIcon className="w-4 h-4 mr-2" />
            Sign In
          </Link>
        </Button>
      );
    }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative w-8 h-8 rounded-full ml-2 flex items-center justify-center bg-gray-200 hover:bg-gray-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
            aria-label={`User menu for ${userDisplayData.displayName}`}
            disabled={isSigningOut}
          >
            {user.image ? (
              <img
                src={user.image}
                alt={userDisplayData.displayName}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <span className="text-sm font-medium text-stone-700">
                {userDisplayData.initial}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <div className="text-sm font-medium leading-none">
                {userDisplayData.displayName}
              </div>
              <div className="text-sm text-muted-foreground leading-none">
                {userDisplayData.email}
              </div>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            <Link href="/user/profile" className="w-full cursor-pointer">
              User Profile
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href="/user/orders" className="w-full cursor-pointer">
              Order History
            </Link>
          </DropdownMenuItem>

          {user.role === "admin" && (
            <DropdownMenuItem asChild>
              <Link href="/admin/overview" className="w-full cursor-pointer">
                Admin Panel
              </Link>
            </DropdownMenuItem>
          )}

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={handleSignOut}
            className="cursor-pointer text-red-600 focus:text-red-600"
            disabled={isSigningOut}
          >
            <LogOut className="w-4 h-4 mr-2" />
            {isSigningOut ? "Signing Out..." : "Sign Out"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${themeClasses.nav}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={`text-xl sm:text-2xl font-serif z-50 relative transition-colors duration-500 ${themeClasses.logo}`}
            >
              <Link href="/" className="hover:opacity-80 transition-opacity">
                Serenity Suites
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav
              className="hidden lg:flex space-x-8"
              aria-label="Desktop navigation"
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`font-medium duration-500 hover:scale-105 transform transition-transform ${themeClasses.links}`}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              <Button
                className={`transition-all duration-500 rounded-full ${themeClasses.button}`}
                variant="outline"
                asChild
              >
                <Link href="/book">Book Now</Link>
              </Button>

              {renderUserSection()}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className={`lg:hidden z-50 relative p-2 rounded-md transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-amber-500 ${themeClasses.menuButton}`}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    variants={iconVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    variants={iconVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              variants={overlayVariants}
              initial="closed"
              animate="open"
              exit="closed"
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
              onClick={closeMenu}
              aria-hidden="true"
            />

            {/* Mobile Menu Panel */}
            <motion.div
              id="mobile-menu"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-40 lg:hidden"
              role="dialog"
              aria-label="Mobile menu"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Menu Header */}
                <div className="px-6 py-8 border-b border-stone-200">
                  <h2 className="text-2xl font-serif text-stone-800">Menu</h2>
                </div>

                {/* Mobile Navigation Links */}
                <nav
                  className="flex-1 px-6 py-8"
                  aria-label="Mobile navigation"
                >
                  <ul className="space-y-6">
                    {NAV_LINKS.map((link, index) => (
                      <motion.li
                        key={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                      >
                        <a
                          href={link.href}
                          className="block text-lg font-medium text-stone-700 hover:text-stone-900 transition-colors duration-200 py-2 focus:outline-none focus:text-stone-900"
                          onClick={closeMenu}
                        >
                          {link.label}
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                {/* Mobile Footer */}
                <div className="px-6 py-8 border-t border-stone-200 space-y-4">
                  <div className="flex justify-center">
                    {renderUserSection()}
                  </div>

                  <Button
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white transition-all duration-300 rounded-full"
                    onClick={closeMenu}
                    asChild
                  >
                    <Link href="/book">Book Now</Link>
                  </Button>

                  <div className="text-center text-sm text-stone-500 space-y-1">
                    <p>
                      <a
                        href="tel:+15551234567"
                        className="hover:text-stone-700"
                      >
                        +1 (555) 123-4567
                      </a>
                    </p>
                    <p>
                      <a
                        href="mailto:hello@serenitysuites.com"
                        className="hover:text-stone-700"
                      >
                        hello@serenitysuites.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
