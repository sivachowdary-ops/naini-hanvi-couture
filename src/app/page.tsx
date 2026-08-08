import { Metadata } from "next";
import { getProducts } from "@/lib/products";
import { HomeContent } from "./HomeContent";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Naini Hanvi Couture | Premium Ethnic Wear Sarees",
  description:
    "Discover premium handpicked sarees at Naini Hanvi Couture. Shop Banarasi, Kanchipuram, party wear, and festive sarees with free shipping across India.",
  openGraph: {
    title: "Naini Hanvi Couture | Premium Ethnic Wear Sarees",
    description:
      "Discover premium handpicked sarees at Naini Hanvi Couture. Shop Banarasi, Kanchipuram, party wear, and festive sarees.",
    type: "website",
  },
};

export default async function HomePage() {
  const products = await getProducts();

  // JSON-LD
  const orgLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Naini Hanvi Couture",
    url: "https://nainihanvi.com",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-80081-22236",
      contactType: "customer service",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
      />
      <HomeContent products={products} />
    </>
  );
}
