import { getProducts } from "@/lib/products";
import { Metadata } from "next";
import { Suspense } from "react";
import { ShopContent } from "./ShopContent";

export const revalidate = 300; // 5 minutes

export const metadata: Metadata = {
  title: "Shop All Sarees | Naini Hanvi Couture",
  description:
    "Browse our handpicked collection of premium sarees — from Banarasi silk to Kanchipuram, party wear to festive. Shop now at Naini Hanvi Couture.",
  openGraph: {
    title: "Shop All Sarees | Naini Hanvi Couture",
    description:
      "Browse our handpicked collection of premium sarees — from Banarasi silk to Kanchipuram, party wear to festive.",
  },
};

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <Suspense fallback={
      <div className="min-h-screen bg-cream-base flex items-center justify-center">
        <p className="font-serif text-charcoal-text animate-pulse">Loading Collection...</p>
      </div>
    }>
      <ShopContent initialProducts={products} />
    </Suspense>
  );
}
