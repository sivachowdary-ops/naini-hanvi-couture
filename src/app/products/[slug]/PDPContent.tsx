"use client";

import { useState } from "react";
import Link from "next/link";
import { Product, MOCK_PRODUCTS } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { MediaGallery } from "@/components/ui/MediaGallery";
import { ProductCard } from "@/components/ui/ProductCard";
import { TrustBadges } from "@/components/ui/TrustBadges";
import { ShoppingBag, ChevronDown, ChevronUp, Truck, RotateCcw, Minus, Plus, Video, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "@/components/ui/icons/WhatsAppIcon";
import Breadcrumb from "@/components/ui/Breadcrumb";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

interface PDPContentProps {
  product: Product;
}

export function PDPContent({ product }: PDPContentProps) {
  const { dispatch } = useCart();
  const [qty, setQty] = useState(1);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  // Track product view on load
  useEffect(() => {
    trackEvent("view_product", {
      productId: product.id,
      productName: product.name,
      price: product.price,
      category: product.category,
    });
  }, [product]);

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: { productId: product.id, quantity: qty },
    });
    dispatch({ type: "SHOW_TOAST", payload: `${product.name} added to cart!` });
    
    // Track add to cart event
    trackEvent("add_to_cart", {
      productId: product.id,
      productName: product.name,
      price: product.price,
      quantity: qty,
      subtotal: product.price * qty,
    });
  };

  const handleWhatsAppInquiry = () => {
    trackEvent("whatsapp_product_inquiry", {
      productId: product.id,
      productName: product.name,
      price: product.price,
    });
  };

  const whatsappProductUrl = `https://wa.me/918008122236?text=${encodeURIComponent(
    `Hi! I'm interested in this product: ${product.name} (₹${product.price.toLocaleString()}). Can you share more details?`
  )}`;

  const relatedProducts = (() => {
    const sameCategory = MOCK_PRODUCTS.filter(
      (p) => p.id !== product.id && p.category === product.category
    );
    if (sameCategory.length >= 4) return sameCategory.slice(0, 4);
    // Fill with other products if not enough in same category
    const others = MOCK_PRODUCTS.filter(
      (p) => p.id !== product.id && p.category !== product.category
    );
    return [...sameCategory, ...others].slice(0, 4);
  })();

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <main className="pb-20 lg:pb-0">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 lg:px-8 py-4">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Shop", href: "/shop" },
            { label: product.name }
          ]}
        />
      </div>

      {/* Product Layout */}
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left — Gallery */}
          <div>
            <MediaGallery items={product.gallery} />
          </div>

          {/* Right — Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] text-rose-accent uppercase mb-2">
                {product.brand}
              </p>
              <h1 className="font-serif text-3xl lg:text-4xl font-bold text-charcoal-text leading-tight">
                {product.name}
              </h1>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-charcoal-text">
                ₹{product.price.toLocaleString()}
              </span>
              {product.mrp && product.mrp > product.price && (
                <>
                  <span className="text-lg text-muted-text line-through">
                    ₹{product.mrp.toLocaleString()}
                  </span>
                  <span className="text-sm font-semibold text-success bg-success/10 px-2 py-0.5 rounded">
                    {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF
                  </span>
                </>
              )}
            </div>
            <p className="text-xs text-muted-text -mt-3">Inclusive of all taxes</p>

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-charcoal-text mb-2">Color</p>
                <div className="flex gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      className="w-10 h-10 rounded-full border-2 border-cream-alt hover:border-rose-accent transition-colors overflow-hidden"
                      title={v.colorName}
                    >
                      <div
                        className="w-full h-full rounded-full"
                        style={{ backgroundColor: v.colorName.toLowerCase() }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Specs Table */}
            {(product.fabric || product.lengthWidth || product.blouseDetail) && (
              <div className="border border-cream-alt rounded-md overflow-hidden">
                <table className="w-full text-sm">
                  <tbody>
                    {product.fabric && (
                      <tr className="border-b border-cream-alt">
                        <td className="px-4 py-3 font-semibold text-charcoal-text bg-cream-alt/50 w-1/3">Fabric</td>
                        <td className="px-4 py-3 text-muted-text">{product.fabric}</td>
                      </tr>
                    )}
                    {product.lengthWidth && (
                      <tr className="border-b border-cream-alt">
                        <td className="px-4 py-3 font-semibold text-charcoal-text bg-cream-alt/50 w-1/3">Length</td>
                        <td className="px-4 py-3 text-muted-text">{product.lengthWidth}</td>
                      </tr>
                    )}
                    {product.blouseDetail && (
                      <tr>
                        <td className="px-4 py-3 font-semibold text-charcoal-text bg-cream-alt/50 w-1/3">Blouse</td>
                        <td className="px-4 py-3 text-muted-text">{product.blouseDetail}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* Quantity Selector */}
            <div>
              <p className="text-sm font-semibold text-charcoal-text mb-2">Quantity</p>
              <div className="inline-flex items-center border border-cream-alt rounded-md">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="p-3 hover:bg-cream-alt transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="px-5 py-3 font-semibold text-charcoal-text border-x border-cream-alt min-w-[48px] text-center">
                  {qty}
                </span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="p-3 hover:bg-cream-alt transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={cn(
                  "w-full py-4 font-semibold text-base rounded-md transition-all duration-200 flex items-center justify-center gap-2",
                  product.inStock
                    ? "bg-rose-accent text-cream-base hover:bg-rose-deep shadow-lg hover:shadow-xl"
                    : "bg-cream-alt text-muted-text cursor-not-allowed"
                )}
              >
                <ShoppingBag size={20} />
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </button>
              <a
                href={whatsappProductUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWhatsAppInquiry}
                className="w-full py-3.5 font-semibold text-sm rounded-md transition-all duration-200 flex items-center justify-center gap-2 border-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white"
              >
                <WhatsAppIcon size={18} />
                Ask on WhatsApp
              </a>
              {/* Video Call & Store Visit */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`https://wa.me/918008122236?text=${encodeURIComponent(
                    `Hi! I'd like to request a video call to see this product:\n📦 ${product.name} (₹${product.price.toLocaleString()})\n📂 Category: ${product.category}\n\nPlease let me know a convenient time for the video call. Thank you!`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("request_video_call", { productId: product.id, productName: product.name })}
                  className="py-3 font-semibold text-xs rounded-md transition-all duration-200 flex items-center justify-center gap-2 border border-rose-accent/40 text-rose-accent hover:bg-rose-accent hover:text-cream-base"
                >
                  <Video size={16} />
                  Video Call
                </a>
                <a
                  href={`https://wa.me/918008122236?text=${encodeURIComponent(
                    `Hi! I'd like to visit your store to see this product in person:\n📦 ${product.name} (₹${product.price.toLocaleString()})\n📂 Category: ${product.category}\n\nCould you please share the store address and available timings? Thank you!`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("request_store_visit", { productId: product.id, productName: product.name })}
                  className="py-3 font-semibold text-xs rounded-md transition-all duration-200 flex items-center justify-center gap-2 border border-rose-accent/40 text-rose-accent hover:bg-rose-accent hover:text-cream-base"
                >
                  <MapPin size={16} />
                  Store Visit
                </a>
              </div>
              {/* Instagram Video Link */}
              {product.instagramUrl && (
                <a
                  href={product.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 font-semibold text-xs rounded-md text-white transition-all duration-300 flex items-center justify-center gap-2 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:brightness-110 shadow-md hover:shadow-lg mt-3"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-instagram"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                  Watch Video on Instagram
                </a>
              )}
            </div>

            {/* Delivery estimate */}
            <div className="flex items-center gap-3 text-sm text-muted-text bg-cream-alt/50 px-4 py-3 rounded-md">
              <Truck size={18} className="text-rose-accent shrink-0" />
              <span>
                Estimated delivery in <strong className="text-charcoal-text">5–7 business days</strong>
                {/* TODO: Confirm delivery timeline with client */}
              </span>
            </div>

            {/* Expandable Sections */}
            <div className="space-y-0 border-t border-cream-alt pt-4">
              {[
                { key: "description", title: "Description", content: product.description },
                {
                  key: "shipping",
                  title: "Shipping & Delivery",
                  content:
                    "We ship pan-India via trusted courier partners. Orders are dispatched within 24–48 hours. Standard delivery takes 5–7 business days. Free shipping on all orders. [Client to confirm final shipping details]",
                },
                {
                  key: "returns",
                  title: "Return & Exchange",
                  content:
                    "We offer easy exchanges within 7 days of delivery. Items must be unused and in original packaging. Please record an unpacking video for any claims. [Client to confirm return/exchange policy]",
                },
              ].map((section) => (
                <div key={section.key} className="border-b border-cream-alt">
                  <button
                    onClick={() => toggleSection(section.key)}
                    className="w-full py-4 flex items-center justify-between text-left"
                  >
                    <span className="font-semibold text-charcoal-text text-sm">
                      {section.title}
                    </span>
                    {expandedSection === section.key ? (
                      <ChevronUp size={18} className="text-muted-text" />
                    ) : (
                      <ChevronDown size={18} className="text-muted-text" />
                    )}
                  </button>
                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-300",
                      expandedSection === section.key
                        ? "max-h-96 opacity-100 pb-4"
                        : "max-h-0 opacity-0"
                    )}
                  >
                    <p className="text-sm text-muted-text leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="mt-16">
        <TrustBadges />
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="container mx-auto px-4 lg:px-8 py-16">
          <h2 className="font-serif text-2xl lg:text-3xl font-bold text-center mb-10">
            You May Also Like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
