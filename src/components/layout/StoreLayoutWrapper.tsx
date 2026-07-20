"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { MobileBottomNav } from "./MobileBottomNav";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { CartToast } from "@/components/ui/CartToast";
import { CartDrawer } from "@/components/cart/CartDrawer";

interface StoreLayoutWrapperProps {
  children: React.ReactNode;
}

export function StoreLayoutWrapper({ children }: StoreLayoutWrapperProps) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <div className="flex-1 bg-gray-50 text-gray-900">{children}</div>;
  }

  return (
    <>
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
      <MobileBottomNav />
      <FloatingWhatsApp />
      <CartToast />
      <CartDrawer />
    </>
  );
}
