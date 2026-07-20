import { getProducts } from "@/lib/products";
import { Metadata } from "next";
import { ShopContent } from "./ShopContent";

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

  return <ShopContent initialProducts={products} />;
}
