"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { MOCK_PRODUCTS } from "@/lib/products";
import { cn } from "@/lib/utils";

export function CartDrawer() {
  const { state, dispatch } = useCart();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (state.isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [state.isOpen]);

  // Resolve cart items with product details
  const cartItemsWithDetails = state.items
    .map((item) => {
      const product = state.products.find((p) => p.id === item.productId);
      if (!product) return null;
      return { ...item, product };
    })
    .filter(Boolean) as {
    productId: string;
    variantId?: string;
    quantity: number;
    product: (typeof state.products)[number];
  }[];

  const hasOutOfStockItems = cartItemsWithDetails.some((item) => !item.product.inStock);

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
      // Check if trying to add/increase quantity for an out of stock item
      const item = cartItemsWithDetails.find(i => i.productId === productId && i.variantId === variantId);
      if (item && !item.product.inStock && newQty > item.quantity) {
        dispatch({ type: "SHOW_TOAST", payload: "Cannot add more. Item is out of stock." });
        return;
      }
      dispatch({
        type: "UPDATE_QUANTITY",
        payload: { productId, variantId, quantity: newQty },
      });
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-[200] transition-opacity duration-300",
          state.isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        onClick={() => dispatch({ type: "CLOSE_CART" })}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-label="Shopping cart"
        aria-modal="true"
        className={cn(
          "fixed inset-y-0 right-0 z-[201] w-full max-w-md bg-cream-base shadow-2xl flex flex-col transition-transform duration-300 ease-in-out",
          state.isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-cream-alt">
          <h2 className="font-serif text-xl font-semibold text-rose-deep flex items-center gap-2">
            <ShoppingBag size={20} />
            Your Cart
            {cartItemsWithDetails.length > 0 && (
              <span className="text-sm font-sans font-normal text-muted-text">
                ({cartItemsWithDetails.length}{" "}
                {cartItemsWithDetails.length === 1 ? "item" : "items"})
              </span>
            )}
          </h2>
          <button
            onClick={() => dispatch({ type: "CLOSE_CART" })}
            className="p-2 text-muted-text hover:text-charcoal-text hover:bg-cream-alt rounded-full transition-colors"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cart Items */}
        {cartItemsWithDetails.length === 0 ? (
          /* Empty State */
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
            <div className="w-20 h-20 rounded-full bg-cream-alt flex items-center justify-center mb-6">
              <ShoppingBag size={32} className="text-muted-text" />
            </div>
            <p className="font-serif text-xl text-rose-deep mb-2">
              Your cart is empty
            </p>
            <p className="text-muted-text text-sm mb-8">
              Discover our beautiful collection of handcrafted sarees
            </p>
            <Link
              href="/shop"
              onClick={() => dispatch({ type: "CLOSE_CART" })}
              className="inline-flex items-center gap-2 px-8 py-3 bg-rose-deep text-cream-base text-sm font-semibold tracking-wide hover:bg-rose-accent transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            {/* Scrollable Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {cartItemsWithDetails.map((item) => {
                const primaryImage =
                  item.product.gallery.find((g) => g.type === "image")?.src ||
                  "/placeholder.jpg";

                return (
                  <div
                    key={`${item.productId}-${item.variantId || "default"}`}
                    className="flex gap-4 p-3 bg-bg-secondary/60 border border-cream-alt rounded-sm"
                  >
                    {/* Product Image */}
                    <Link
                      href={`/products/${item.product.slug}`}
                      onClick={() => dispatch({ type: "CLOSE_CART" })}
                      className="relative w-20 h-24 flex-shrink-0 bg-cream-alt overflow-hidden"
                    >
                      <Image
                        src={primaryImage}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </Link>

                    {/* Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            href={`/products/${item.product.slug}`}
                            onClick={() => dispatch({ type: "CLOSE_CART" })}
                            className="font-serif text-sm font-medium text-charcoal-text hover:text-rose-accent transition-colors line-clamp-2 leading-snug"
                          >
                            {item.product.name}
                          </Link>
                          {!item.product.inStock && (
                            <span className="shrink-0 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 bg-error/15 text-error border border-error/20 rounded-sm">
                              Sold Out
                            </span>
                          )}
                        </div>
                        <p className="text-sm font-semibold text-rose-deep mt-1">
                          ₹{item.product.price.toLocaleString("en-IN")}
                        </p>
                      </div>

                      {/* Quantity + Remove */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-cream-alt">
                          <button
                            onClick={() =>
                              handleUpdateQuantity(
                                item.productId,
                                item.variantId,
                                item.quantity - 1
                              )
                            }
                            className="w-8 h-8 flex items-center justify-center text-muted-text hover:text-charcoal-text hover:bg-cream-alt transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 h-8 flex items-center justify-center text-sm font-medium text-charcoal-text border-x border-cream-alt">
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
                            className="w-8 h-8 flex items-center justify-center text-muted-text hover:text-charcoal-text hover:bg-cream-alt transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

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
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="border-t border-cream-alt px-6 py-5 space-y-4 bg-cream-base">
              {/* Subtotal */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-text">Subtotal</span>
                <span className="text-lg font-serif font-semibold text-charcoal-text">
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </div>
              <p className="text-xs text-muted-text">
                Shipping & taxes calculated at checkout
              </p>

              {/* Checkout Button */}
              {hasOutOfStockItems ? (
                <div className="space-y-2">
                  <button
                    disabled
                    className="w-full py-3.5 bg-cream-alt text-muted-text text-center text-sm font-semibold tracking-wide cursor-not-allowed border border-cream-alt"
                  >
                    Proceed to Checkout
                  </button>
                  <p className="text-xs text-error text-center font-medium">
                    Remove sold out items to place your order.
                  </p>
                </div>
              ) : (
                <Link
                  href="/checkout"
                  onClick={() => dispatch({ type: "CLOSE_CART" })}
                  className="block w-full py-3.5 bg-rose-deep text-cream-base text-center text-sm font-semibold tracking-wide hover:bg-rose-accent transition-colors"
                >
                  Proceed to Checkout
                </Link>
              )}

              {/* View Cart Link */}
              <Link
                href="/cart"
                onClick={() => dispatch({ type: "CLOSE_CART" })}
                className="block text-center text-sm text-muted-text underline underline-offset-4 hover:text-rose-accent transition-colors"
              >
                View Full Cart
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}
