"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/products";
import { ProductCard } from "@/components/ui/ProductCard";
import { TrustBadges } from "@/components/ui/TrustBadges";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { ArrowRight, Play, Volume2, VolumeX, Sparkles } from "lucide-react";
import { useState } from "react";

const FAQ_PREVIEW = [
  {
    question: "How do I place an order?",
    answer:
      "Browse our collection, add your favourite sarees to the cart, and proceed to checkout. Fill in your shipping details and you'll be redirected to WhatsApp where our team will confirm your order and arrange payment.",
  },
  {
    question: "Do you offer COD (Cash on Delivery)?",
    answer:
      "Yes! We offer Cash on Delivery across India. You can also pay via UPI, bank transfer, or other methods confirmed on WhatsApp. [Client to confirm final payment details]",
  },
  {
    question: "What is your return/exchange policy?",
    answer:
      "We offer easy exchanges within 7 days of delivery. Items must be unused and in original packaging. Please record an unpacking video for any claims. [Client to confirm return/exchange policy]",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Orders are dispatched within 24–48 hours. Standard delivery takes 5–7 business days across India. [Client to confirm delivery timelines]",
  },
];



const CATEGORY_TILES = [
  { name: "Malai Cotton Sarees", href: "/shop?category=Malai+Cottons", image: "/catalog/malai-cottons/malai-cottons-saree-01-img1.webp" },
  { name: "Muslin Sequence Sarees", href: "/shop?category=Muslin+Sequence", image: "/catalog/muslin-sequence/muslin-sequence-saree-20-img1.webp" },
  { name: "Silk Kota Sarees", href: "/shop?category=Silk+Kota", image: "/catalog/silk-kota/silk-kota-saree-29-img1.webp" },
  { name: "Ajarakh Modal Silk", href: "/shop?category=Ajarakh+Modal+Silk", image: "/catalog/ajarakh-modal-silk/ajarakh-modal-silk-saree-01-img1.webp" },
  { name: "Jamdani Sarees", href: "/shop?category=Jamdani", image: "/catalog/jamdani/jamdani-saree-01-img1.webp" },
  { name: "Premium Kota Sarees", href: "/shop?category=Premium+Kota", image: "/catalog/premium-kota/premium-kota-saree-01-img1.webp" },
  { name: "Swan Jamdani Sarees", href: "/shop?category=Swan+Jamdani", image: "/catalog/swan-jamdani/swan-jamdani-saree-01-img1.webp" },
];

function VideoCard({ src, thumb, label }: { src: string; thumb: string; label: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleTogglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    
    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  return (
    <div 
      className="relative shrink-0 w-[280px] lg:w-full aspect-[9/14] rounded-xl overflow-hidden group snap-center bg-charcoal-text cursor-pointer"
      onClick={handleTogglePlay}
    >
      <video
        ref={videoRef}
        src={src}
        poster={thumb}
        loop
        muted
        playsInline
        preload="none"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="text-white font-serif text-lg font-semibold drop-shadow">{label}</p>
      </div>
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
            <Play size={28} className="text-white fill-white" />
          </div>
        </div>
      )}
    </div>
  );
}



export function HomeContent({ products }: { products: Product[] }) {
  return (
    <main className="pb-20 lg:pb-0 overflow-x-hidden">
      {/* ===== HERO ===== */}
      <section className="relative h-[70vh] lg:h-[85vh] overflow-hidden">
        <Image
          src="/assets/hero-banner.png"
          alt="Naini Hanvi Couture - Premium Ethnic Wear"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-xl space-y-6">
              <p className="text-blush-primary text-sm font-semibold tracking-[0.3em] uppercase">
                New Collection
              </p>
              <h1 className="text-4xl lg:text-6xl font-serif font-bold text-white leading-tight">
                Elegance <br />
                <span className="text-blush-primary">Redefined</span>
              </h1>
              <p className="text-white/80 text-base lg:text-lg max-w-md">
                Discover handpicked sarees that celebrate tradition, craftsmanship, and timeless beauty.
              </p>
              <div className="flex gap-4">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 bg-rose-accent text-cream-base px-8 py-4 font-semibold text-sm hover:bg-rose-deep transition-colors shadow-lg"
                >
                  Shop Now
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SHOP BY CATEGORY ===== */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-rose-accent text-xs font-semibold tracking-[0.3em] uppercase mb-3">
              Browse
            </p>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-charcoal-text">
              Shop by Category
            </h2>
          </div>
          
          <div className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide justify-start lg:justify-center items-center">
            {/* Circular Category Swatches */}
            {CATEGORY_TILES.map((tile) => (
              <Link
                key={tile.name}
                href={tile.href}
                className="group flex flex-col items-center shrink-0 snap-center text-center cursor-pointer"
              >
                {/* Gold ring and image container */}
                <div className="relative w-28 h-28 lg:w-32 lg:h-32 rounded-full p-1 border-2 border-border-hairline group-hover:border-gold-primary transition-all duration-300 mb-3 overflow-hidden bg-bg-secondary">
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <Image
                      src={tile.image}
                      alt={tile.name}
                      fill
                      priority={true}
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="128px"
                    />
                  </div>
                </div>
                <span className="text-xs font-semibold tracking-wider text-gold-primary group-hover:text-gold-bright uppercase transition-colors">
                  {tile.name}
                </span>
              </Link>
            ))}

            {/* View All Tile (distinct bordered square) */}
            <Link
              href="/shop"
              className="group flex flex-col items-center shrink-0 snap-center text-center cursor-pointer"
            >
              <div className="w-28 h-28 lg:w-32 lg:h-32 border-2 border-dashed border-border-hairline group-hover:border-gold-primary transition-all duration-300 rounded-xl flex flex-col items-center justify-center bg-bg-secondary mb-3">
                <Sparkles size={24} className="text-gold-primary group-hover:text-gold-bright transition-colors mb-2" />
                <span className="text-[10px] font-bold tracking-widest text-gold-primary uppercase">VIEW ALL</span>
              </div>
              <span className="text-xs font-semibold tracking-wider text-gold-primary group-hover:text-gold-bright uppercase transition-colors opacity-0 group-hover:opacity-100 transition-opacity">
                All Products
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section className="py-16 bg-cream-alt/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-rose-accent text-xs font-semibold tracking-[0.3em] uppercase mb-3">
                Curated
              </p>
              <h2 className="font-serif text-3xl lg:text-4xl font-bold text-charcoal-text">
                Top Picks
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-sm font-semibold text-rose-accent hover:text-rose-deep flex items-center gap-1 transition-colors"
            >
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide lg:grid lg:grid-cols-4 lg:overflow-visible">
            {products.map((product, i) => (
              <div key={product.id} className="shrink-0 w-[260px] lg:w-full snap-start">
                <ProductCard product={product} priority={i < 4} />
              </div>
            ))}
          </div>
        </div>
      </section>





      {/* ===== BRAND STORY ===== */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/5] lg:aspect-[3/4] rounded-xl overflow-hidden">
              <Image
                src="/assets/saree-2.webp"
                alt="Our Story - Naini Hanvi Couture"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="space-y-6 max-w-lg">
              <p className="text-rose-accent text-xs font-semibold tracking-[0.3em] uppercase">
                Our Story
              </p>
              <h2 className="font-serif text-3xl lg:text-4xl font-bold text-charcoal-text leading-tight">
                The Heart Behind Every Weave
              </h2>
              <p className="text-muted-text leading-relaxed">
                At Naini Hanvi Couture, we believe every saree tells a story. Our collection is carefully curated from the finest weavers and artisans across India, bringing you the perfect blend of tradition, quality, and contemporary elegance.
              </p>
              <p className="text-muted-text leading-relaxed">
                {/* TODO: Replace with client's actual brand story */}
                From the looms of Banaras to the silk heritage of Kanchipuram, each piece in our collection is handpicked to ensure it meets our exacting standards of craftsmanship and beauty.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-rose-accent font-semibold text-sm hover:text-rose-deep transition-colors"
              >
                Read Our Full Story <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TRUST BADGES ===== */}
      <TrustBadges />

      {/* ===== FAQ PREVIEW ===== */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-charcoal-text mb-3">
              Frequently Asked
            </h2>
            <p className="text-muted-text">
              Quick answers to your most common questions.
            </p>
          </div>
          <FAQAccordion items={FAQ_PREVIEW} />
          <div className="text-center mt-8">
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 text-rose-accent font-semibold text-sm hover:text-rose-deep transition-colors"
            >
              View All FAQs <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
