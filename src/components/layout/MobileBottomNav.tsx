"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid, ShoppingBag, MessageCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

export function MobileBottomNav() {
  const pathname = usePathname();
  const { totalItems, dispatch } = useCart();

  const navItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Grid, label: "Shop", href: "/shop" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-cream-base border-t border-cream-alt pb-safe z-40 lg:hidden shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)]">
      <nav className="flex justify-around items-center h-16 px-2">
        
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.label} 
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors",
                isActive ? "text-rose-accent" : "text-charcoal-text hover:text-rose-accent"
              )}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}

        {/* WhatsApp Button */}
        <a 
          href="https://wa.me/918008122236?text=Hi,%20I%20have%20a%20question%20about%20Naini%20Hanvi%20Couture%20products"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center w-full h-full space-y-1 text-charcoal-text hover:text-success transition-colors"
        >
          <MessageCircle size={20} />
          <span className="text-[10px] font-medium">WhatsApp</span>
        </a>

        {/* Cart Button */}
        <button 
          onClick={() => dispatch({ type: "OPEN_CART" })}
          className="flex flex-col items-center justify-center w-full h-full space-y-1 text-charcoal-text hover:text-rose-accent relative transition-colors"
        >
          <div className="relative">
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-rose-accent text-cream-base text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center border border-cream-base">
                {totalItems}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium">Cart</span>
        </button>
      </nav>
    </div>
  );
}
