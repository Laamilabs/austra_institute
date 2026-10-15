"use client";

import React, { useState, useEffect } from "react";
import { MessageCircle, ArrowUp } from "lucide-react";

export default function FloatingWidgets() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show back-to-top button when scrolled down > 300px
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const whatsappUrl =
    "https://wa.me/254703710401?text=Hello%2C%20I%20would%20like%20to%20enquire%20about%20your%20courses.";

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-center gap-2.5">
      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-800 text-white shadow-md transition-all duration-300 hover:bg-zinc-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-zinc-500 active:scale-95"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      )}

      {/* Floating WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="group relative flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:bg-[#20ba5a] hover:scale-105 active:scale-95"
      >
        <MessageCircle className="h-5 w-5 fill-current" />
        {/* Hover Tooltip */}
        <span className="absolute right-14 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md bg-zinc-900 px-2.5 py-1 text-[11px] font-medium text-white opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100 pointer-events-none">
          Chat with us
        </span>
      </a>
    </div>
  );
}