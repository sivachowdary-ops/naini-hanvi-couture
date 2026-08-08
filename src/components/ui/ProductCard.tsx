import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/products";
import { ShoppingBag } from "lucide-react";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  // Find primary image and secondary image if available
  const images = product.gallery.filter((g) => g.type === "image");
  const primaryImage = images[0]?.src || "/placeholder.jpg";
  const hasSecondary = images.length > 1;
  const secondaryImage = hasSecondary ? images[1]?.src : null;

  return (
    <div className="group flex flex-col relative h-full w-full max-w-[320px] mx-auto bg-cream-base">
      <Link href={`/products/${product.slug}`} className="block relative overflow-hidden aspect-[3/4] w-full bg-cream-alt">
        {/* Badges */}
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
          {product.tags?.map((tag) => (
            <span key={tag} className="uppercase text-[9px] font-bold tracking-wider px-2 py-1 bg-cream-base/90 text-charcoal-text border border-cream-alt backdrop-blur-sm shadow-sm">
              {tag}
            </span>
          ))}
          {!product.inStock && (
            <span className="uppercase text-[9px] font-bold tracking-wider px-2 py-1 bg-charcoal-text text-cream-base shadow-sm">
              Sold Out
            </span>
          )}
        </div>

        {/* Images */}
        <Image
          src={primaryImage}
          alt={product.name}
          fill
          priority={priority}
          className={`object-cover transition-opacity duration-500 pointer-events-none ${
            hasSecondary ? "group-hover:opacity-0" : ""
          }`}
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        {hasSecondary && secondaryImage && (
          <Image
            src={secondaryImage}
            alt={`${product.name} hover`}
            fill
            className="object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100 pointer-events-none"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        )}

        {/* Quick Add overlay */}
        {product.inStock && (
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 lg:block hidden">
            <button className="w-full py-3 bg-cream-base/95 backdrop-blur-sm text-charcoal-text text-sm font-semibold hover:bg-rose-accent hover:text-cream-base transition-colors shadow-lg flex items-center justify-center gap-2">
              <ShoppingBag size={16} /> Add to Cart
            </button>
          </div>
        )}
      </Link>

      <div className="flex flex-col mt-4 flex-grow">
        <Link href={`/products/${product.slug}`} className="hover:text-rose-accent transition-colors">
          <h3 className="font-serif text-lg font-medium text-charcoal-text line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <div className="mt-1 flex items-center gap-2">
          <span className="font-semibold text-charcoal-text">₹{product.price.toLocaleString()}</span>
          {product.mrp && product.mrp > product.price && (
            <span className="text-sm text-muted-text line-through">₹{product.mrp.toLocaleString()}</span>
          )}
        </div>
        
        {/* Variants / Swatches placeholder */}
        {product.variants && product.variants.length > 0 && (
          <div className="flex gap-1.5 mt-3">
            {product.variants.map((v) => (
              <div 
                key={v.id} 
                className="w-4 h-4 rounded-full border border-cream-alt shadow-sm"
                style={{ backgroundColor: v.colorName.toLowerCase() }}
                title={v.colorName}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
