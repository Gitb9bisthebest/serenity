"use client";

import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-stone-800 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-serif mb-4">Serenity Suites</h3>
            <p className="text-stone-300 mb-6 leading-relaxed">
              Where luxury meets tranquility. Experience the perfect staycation
              in our thoughtfully designed suites, just moments from the city.
            </p>
            <div className="flex space-x-4">
              <Button
                variant="outline"
                size="icon"
                className="border-stone-600 text-stone-300 hover:bg-amber-600 hover:border-amber-600 hover:text-white bg-transparent rounded-full transition-all duration-300"
              >
                <span className="sr-only">Facebook</span>
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="border-stone-600 text-stone-300 hover:bg-amber-600 hover:border-amber-600 hover:text-white bg-transparent rounded-full transition-all duration-300"
              >
                <span className="sr-only">Instagram</span>
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.781c-.315 0-.595-.122-.807-.315-.21-.21-.315-.49-.315-.807s.105-.595.315-.807c.21-.21.49-.315.807-.315s.595.105.807.315c.21.21.315.49.315.807s-.105.595-.315.807c-.21.193-.49.315-.807.315zm0 0" />
                  <path d="M12 7.377c-2.747 0-4.623 1.876-4.623 4.623S9.253 16.623 12 16.623s4.623-1.876 4.623-4.623S14.747 7.377 12 7.377zm0 7.286c-1.458 0-2.663-1.205-2.663-2.663S10.542 9.337 12 9.337s2.663 1.205 2.663 2.663-1.205 2.663-2.663 2.663z" />
                </svg>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="border-stone-600 text-stone-300 hover:bg-amber-600 hover:border-amber-600 hover:text-white bg-transparent rounded-full transition-all duration-300"
              >
                <span className="sr-only">Twitter</span>
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </Button>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-stone-300">
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#rooms" className="hover:text-white transition-colors">
                  Rooms
                </a>
              </li>
              <li>
                <a
                  href="#amenities"
                  className="hover:text-white transition-colors"
                >
                  Amenities
                </a>
              </li>
              <li>
                <a
                  href="#gallery"
                  className="hover:text-white transition-colors"
                >
                  Gallery
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-stone-300">
              <li>123 Serenity Lane</li>
              <li>Peaceful Valley, PV 12345</li>
              <li>+1 (555) 123-4567</li>
              <li>hello@serenitysuites.com</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-700 mt-12 pt-8 text-center text-stone-400">
          <p>&copy; 2024 Serenity Suites. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
