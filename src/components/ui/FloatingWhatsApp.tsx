"use client";

import { WhatsAppIcon } from "@/components/ui/icons/WhatsAppIcon";

export function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/918008122236?text=Hi,%20I%20have%20a%20question%20about%20Naini%20Hanvi%20Couture%20products"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 lg:bottom-8 right-4 lg:right-8 z-40 bg-[#25D366] text-white p-4 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:scale-105 hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] transition-all duration-300 flex items-center justify-center group"
      aria-label="Chat on WhatsApp"
    >
      <WhatsAppIcon size={28} />
      {/* Tooltip */}
      <span className="absolute right-full mr-4 bg-charcoal-text text-cream-base text-xs font-medium py-1.5 px-3 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden lg:block">
        Need help? Chat with us!
      </span>
    </a>
  );
}
