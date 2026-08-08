"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

const ANNOUNCEMENTS = [
  "Curating Pure Handlooms with Love",
  "Now Offering Free Shipping Across Hyderabad!",
  "Orders placed before 2 PM are dispatched the same day"
];

export function Header() {
  const { totalItems, dispatch } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "New Arrivals", href: "/shop?category=new-arrivals" },
    { label: "About", href: "/about" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      <div className="bg-rose-deep text-cream-base text-xs font-semibold tracking-wider py-2 overflow-hidden relative w-full">
        <div className="whitespace-nowrap animate-marquee inline-block w-full">
          {ANNOUNCEMENTS.map((msg, i) => (
            <span key={i} className="mx-8">{msg}</span>
          ))}
          {ANNOUNCEMENTS.map((msg, i) => (
            <span key={i + 'dup'} className="mx-8">{msg}</span>
          ))}
        </div>
      </div>

      {/* Main Header */}
      <div className={cn(
        "bg-cream-base/95 backdrop-blur-md border-b border-cream-alt transition-all duration-300 py-3.5",
        isScrolled ? "shadow-sm bg-cream-base/98" : ""
      )}>
        <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between">
          
          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden text-charcoal-text p-1"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group flex-1 lg:flex-none justify-center lg:justify-start">
            <Image
              src="/assets/logo.webp"
              alt="Naini Hanvi Couture Logo"
              width={34}
              height={34}
              className="object-contain rounded-full shadow-sm group-hover:scale-105 transition-transform duration-200"
              priority
            />
            <span className="text-xl font-serif font-bold text-rose-deep tracking-tight">
              Naini Hanvi Couture
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.label} 
                href={link.href}
                className="text-sm font-medium text-charcoal-text hover:text-rose-accent transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <button 
              className="text-charcoal-text hover:text-rose-accent transition-colors relative p-1"
              onClick={() => dispatch({ type: "OPEN_CART" })}
            >
              <ShoppingBag size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-accent text-cream-base text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div className={cn(
        "fixed inset-0 bg-black/50 z-[100] transition-opacity lg:hidden",
        mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )} onClick={() => setMobileMenuOpen(false)}>
        <div 
          className={cn(
            "fixed inset-y-0 left-0 w-4/5 max-w-sm bg-cream-base shadow-2xl transition-transform duration-300 ease-in-out z-[101] flex flex-col",
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4 flex items-center justify-between border-b border-cream-alt">
            <span className="font-serif font-bold text-xl text-rose-deep">Menu</span>
            <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-charcoal-text">
              <X size={24} />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="flex flex-col">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="block px-6 py-4 text-lg font-medium text-charcoal-text border-b border-cream-alt/50 hover:bg-cream-alt/50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
