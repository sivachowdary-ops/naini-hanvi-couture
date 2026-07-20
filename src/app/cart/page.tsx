"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { MOCK_PRODUCTS } from "@/lib/products";

function CartPageContent() {
  const { state, dispatch } = useCart();

  const cartItemsWithDetails = state.items
    .map((item) => {
      const product = MOCK_PRODUCTS.find((p) => p.id === item.productId);
      if (!product) return null;
      return { ...item, product };
    })
    .filter(Boolean) as {
    productId: string;
    variantId?: string;
    quantity: number;
    product: (typeof MOCK_PRODUCTS)[number];
  }[];

  const subtotal = cartItemsWithDetails.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleUpdateQuantity = (
    productId: string,
    variantId: string | undefined,
    newQty: number
  ) => {
    if (newQty < 1) {
      dispatch({ type: "REMOVE_ITEM", payload: { productId, variantId } });
    } else {
      dispatch({
        type: "UPDATE_QUANTITY",
        payload: { productId, variantId, quantity: newQty },
      });
    }
  };

  if (cartItemsWithDetails.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-24 h-24 rounded-full bg-cream-alt flex items-center justify-center mb-6">
          <ShoppingBag size={40} className="text-muted-text" />
        </div>
        <h1 className="font-serif text-3xl text-rose-deep mb-3">
          Your Cart is Empty
        </h1>
        <p className="text-muted-text mb-8 max-w-md">
          Looks like you haven&apos;t added any sarees to your cart yet. Browse
          our collection and find something you love.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-rose-deep text-cream-base text-sm font-semibold tracking-wide hover:bg-rose-accent transition-colors"
        >
          <ArrowLeft size={16} />
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 lg:px-8 py-8 lg:py-12">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link
          href="/shop"
          className="inline-flex items-center gap-1.5 text-sm text-muted-text hover:text-rose-accent transition-colors"
        >
          <ArrowLeft size={14} />
          Continue Shopping
        </Link>
      </div>

      <h1 className="font-serif text-3xl lg:text-4xl text-rose-deep mb-8">
        Shopping Cart
      </h1>

      <div className="lg:grid lg:grid-cols-3 lg:gap-12">
        {/* Cart Items - 2 columns on desktop */}
        <div className="lg:col-span-2">
          {/* Table Header - Desktop */}
          <div className="hidden lg:grid lg:grid-cols-[2fr_1fr_1fr_auto] gap-4 pb-4 border-b border-cream-alt text-sm font-medium text-muted-text uppercase tracking-wider">
            <span>Product</span>
            <span className="text-center">Quantity</span>
            <span className="text-right">Total</span>
            <span className="w-10" />
          </div>

          <div className="divide-y divide-cream-alt">
            {cartItemsWithDetails.map((item) => {
              const primaryImage =
                item.product.gallery.find((g) => g.type === "image")?.src ||
                "/placeholder.jpg";
              const lineTotal = item.product.price * item.quantity;

              return (
                <div
                  key={`${item.productId}-${item.variantId || "default"}`}
                  className="py-6 grid grid-cols-[80px_1fr] lg:grid-cols-[2fr_1fr_1fr_auto] gap-4 lg:gap-4 items-center"
                >
                  {/* Product Info */}
                  <div className="flex gap-4 col-span-1 lg:col-span-1">
                    <Link
                      href={`/products/${item.product.slug}`}
                      className="relative w-20 h-24 lg:w-24 lg:h-30 flex-shrink-0 bg-cream-alt overflow-hidden"
                    >
                      <Image
                        src={primaryImage}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 80px, 96px"
                      />
                    </Link>
                  </div>

                  <div className="flex flex-col gap-3 lg:contents">
                    {/* Name & Price (mobile combined) */}
                    <div className="lg:hidden">
                      <Link
                        href={`/products/${item.product.slug}`}
                        className="font-serif text-base font-medium text-charcoal-text hover:text-rose-accent transition-colors line-clamp-2"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-sm font-semibold text-rose-deep mt-1">
                        ₹{item.product.price.toLocaleString("en-IN")}
                      </p>
                    </div>

                    {/* Hidden on mobile, visible on desktop alongside image */}
                    <div className="hidden lg:flex lg:flex-col lg:justify-center -ml-4">
                      <Link
                        href={`/products/${item.product.slug}`}
                        className="font-serif text-base font-medium text-charcoal-text hover:text-rose-accent transition-colors line-clamp-2"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-sm text-muted-text mt-0.5">
                        ₹{item.product.price.toLocaleString("en-IN")} each
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between lg:justify-center">
                      <div className="flex items-center border border-cream-alt">
                        <button
                          onClick={() =>
                            handleUpdateQuantity(
                              item.productId,
                              item.variantId,
                              item.quantity - 1
                            )
                          }
                          className="w-9 h-9 flex items-center justify-center text-muted-text hover:text-charcoal-text hover:bg-cream-alt transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-10 h-9 flex items-center justify-center text-sm font-medium text-charcoal-text border-x border-cream-alt">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleUpdateQuantity(
                              item.productId,
                              item.variantId,
                              item.quantity + 1
                            )
                          }
                          className="w-9 h-9 flex items-center justify-center text-muted-text hover:text-charcoal-text hover:bg-cream-alt transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      {/* Mobile-only line total & remove */}
                      <div className="flex items-center gap-3 lg:hidden">
                        <span className="text-sm font-semibold text-charcoal-text">
                          ₹{lineTotal.toLocaleString("en-IN")}
                        </span>
                        <button
                          onClick={() =>
                            dispatch({
                              type: "REMOVE_ITEM",
                              payload: {
                                productId: item.productId,
                                variantId: item.variantId,
                              },
                            })
                          }
                          className="p-1.5 text-muted-text hover:text-error transition-colors"
                          aria-label={`Remove ${item.product.name}`}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Desktop Line Total */}
                    <div className="hidden lg:flex items-center justify-end">
                      <span className="font-semibold text-charcoal-text">
                        ₹{lineTotal.toLocaleString("en-IN")}
                      </span>
                    </div>

                    {/* Desktop Remove */}
                    <div className="hidden lg:flex items-center">
                      <button
                        onClick={() =>
                          dispatch({
                            type: "REMOVE_ITEM",
                            payload: {
                              productId: item.productId,
                              variantId: item.variantId,
                            },
                          })
                        }
                        className="p-2 text-muted-text hover:text-error transition-colors"
                        aria-label={`Remove ${item.product.name}`}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1 mt-8 lg:mt-0">
          <div className="sticky top-32 bg-bg-secondary/60 border border-cream-alt p-6 lg:p-8">
            <h2 className="font-serif text-xl text-rose-deep mb-6">
              Order Summary
            </h2>

            <div className="space-y-3 pb-4 border-b border-cream-alt">
              <div className="flex justify-between text-sm">
                <span className="text-muted-text">
                  Subtotal ({cartItemsWithDetails.length}{" "}
                  {cartItemsWithDetails.length === 1 ? "item" : "items"})
                </span>
                <span className="font-medium text-charcoal-text">
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-text">Shipping</span>
                <span className="font-medium text-success">Free</span>
              </div>
            </div>

            <div className="flex justify-between items-center py-4">
              <span className="font-serif text-lg text-charcoal-text">
                Total
              </span>
              <span className="font-serif text-2xl font-semibold text-rose-deep">
                ₹{subtotal.toLocaleString("en-IN")}
              </span>
            </div>

            <Link
              href="/checkout"
              className="block w-full py-3.5 bg-rose-deep text-cream-base text-center text-sm font-semibold tracking-wide hover:bg-rose-accent transition-colors mt-2"
            >
              Proceed to Checkout
            </Link>

            <p className="text-xs text-muted-text text-center mt-4">
              Secure checkout via WhatsApp
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CartPage() {
  return <CartPageContent />;
}
