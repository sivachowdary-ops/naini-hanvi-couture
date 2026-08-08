"use client";

import React, { useState, useCallback, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ShoppingBag,
  Loader2,
  ExternalLink,
  CheckCircle,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { MOCK_PRODUCTS } from "@/lib/products";
import { INDIAN_STATES_AND_UTS } from "@/lib/indianStatesAndUTs";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import {
  buildWhatsAppOrderMessage,
  resolveCartItems,
  type WhatsAppShippingData,
} from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

/* ------------------------------------------------------------------ */
/*  Validation helpers                                                 */
/* ------------------------------------------------------------------ */

type FieldName = keyof WhatsAppShippingData;

const VALIDATION_RULES: Record<
  FieldName,
  { required: boolean; pattern?: RegExp; message: string }
> = {
  fullName: { required: true, message: "Full name is required" },
  mobile: {
    required: true,
    pattern: /^[6-9]\d{9}$/,
    message: "Enter a valid 10-digit Indian mobile number",
  },
  addressLine: { required: true, message: "Address is required" },
  state: { required: true, message: "Please select a state" },
  city: { required: true, message: "District / City is required" },
  pinCode: {
    required: true,
    pattern: /^\d{6}$/,
    message: "Enter a valid 6-digit PIN code",
  },
  email: {
    required: false,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Enter a valid email address",
  },
  orderNotes: { required: false, message: "" },
};

function validateField(name: FieldName, value: string): string | null {
  const rule = VALIDATION_RULES[name];
  if (rule.required && !value.trim()) return rule.message;
  if (value.trim() && rule.pattern && !rule.pattern.test(value.trim()))
    return rule.message;
  return null;
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function CheckoutPage() {
  const { state: cartState, dispatch } = useCart();

  /* ---- resolve products ---- */
  const cartItemsWithDetails = useMemo(
    () =>
      cartState.items
        .map((item) => {
          const product = cartState.products.find((p) => p.id === item.productId);
          if (!product) return null;
          return { ...item, product };
        })
        .filter(Boolean) as {
        productId: string;
        variantId?: string;
        quantity: number;
        product: (typeof cartState.products)[number];
      }[],
    [cartState.items, cartState.products]
  );

  const hasOutOfStockItems = useMemo(
    () => cartItemsWithDetails.some((item) => !item.product.inStock),
    [cartItemsWithDetails]
  );

  const subtotal = cartItemsWithDetails.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  /* ---- form state ---- */
  const [formData, setFormData] = useState<WhatsAppShippingData>({
    fullName: "",
    mobile: "",
    addressLine: "",
    state: "",
    city: "",
    pinCode: "",
    email: "",
    orderNotes: "",
  });

  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>(
    {}
  );
  const [submitting, setSubmitting] = useState(false);

  /* ---- handlers ---- */
  const handleChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));

      // Clear error on change if touched
      if (touched[name as FieldName]) {
        const err = validateField(name as FieldName, value);
        setErrors((prev) => ({ ...prev, [name]: err || undefined }));
      }
    },
    [touched]
  );

  const handleBlur = useCallback(
    (
      e: React.FocusEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name, value } = e.target;
      setTouched((prev) => ({ ...prev, [name]: true }));
      const err = validateField(name as FieldName, value);
      setErrors((prev) => ({ ...prev, [name]: err || undefined }));
    },
    []
  );

  /* ---- check if form is valid ---- */
  const isFormValid = useMemo(() => {
    const requiredFields: FieldName[] = [
      "fullName",
      "mobile",
      "addressLine",
      "state",
      "city",
      "pinCode",
    ];

    return requiredFields.every((field) => {
      const val = formData[field] || "";
      return validateField(field, val) === null;
    });
  }, [formData]);

  /* ---- submit ---- */
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      // Validate all fields
      const newErrors: Partial<Record<FieldName, string>> = {};
      const allTouched: Partial<Record<FieldName, boolean>> = {};

      (Object.keys(VALIDATION_RULES) as FieldName[]).forEach((field) => {
        allTouched[field] = true;
        const err = validateField(field, formData[field] || "");
        if (err) newErrors[field] = err;
      });

      setTouched(allTouched);
      setErrors(newErrors);

      if (Object.keys(newErrors).length > 0) return;
      if (hasOutOfStockItems) {
        dispatch({ type: "SHOW_TOAST", payload: "Please remove sold out items to place your order." });
        return;
      }

      setSubmitting(true);

      const orderItems = resolveCartItems(cartState.items, cartState.products);
      const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const totalQuantity = orderItems.reduce((sum, item) => sum + item.quantity, 0);

      // Track form submission event
      trackEvent("checkout_form_submit", {
        subtotal: subtotal,
        itemCount: totalQuantity,
        state: formData.state,
        city: formData.city,
      });

      const saveOrderAndRedirect = async () => {
        if (isSupabaseConfigured) {
          try {
            const { error } = await supabase.from("orders").insert({
              customer_name: formData.fullName,
              mobile: formData.mobile,
              address: formData.addressLine,
              state: formData.state,
              city: formData.city,
              pincode: formData.pinCode,
              email: formData.email || null,
              notes: formData.orderNotes || null,
              items: cartState.items.map((item) => {
                const p = cartState.products.find((prod) => prod.id === item.productId);
                return {
                  id: item.productId,
                  name: p ? p.name : "Unknown Saree",
                  price: p ? p.price : 0,
                  quantity: item.quantity,
                };
              }),
              subtotal: subtotal,
            });

            if (error) {
              console.error("Supabase order write error:", error);
            }
          } catch (err) {
            console.error("Error writing order to Supabase:", err);
          }
        }

        const url = buildWhatsAppOrderMessage(orderItems, formData);

        // Track redirect event
        trackEvent("whatsapp_redirect", {
          subtotal: subtotal,
          itemCount: totalQuantity,
        });

        // Clear cart
        dispatch({ type: "CLEAR_CART" });

        // Redirect immediately
        window.location.href = url;
      };

      saveOrderAndRedirect();
    },
    [formData, cartItemsWithDetails, cartState.items, dispatch]
  );

  /* ---- empty cart ---- */
  if (cartItemsWithDetails.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-24 h-24 rounded-full bg-cream-alt flex items-center justify-center mb-6">
          <ShoppingBag size={40} className="text-muted-text" />
        </div>
        <h1 className="font-serif text-3xl text-rose-deep mb-3">
          Nothing to Checkout
        </h1>
        <p className="text-muted-text mb-8 max-w-md">
          Your cart is empty. Add some beautiful sarees before proceeding to
          checkout.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-rose-deep text-cream-base text-sm font-semibold tracking-wide hover:bg-rose-accent transition-colors"
        >
          <ArrowLeft size={16} />
          Browse Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 lg:px-8 py-8 lg:py-12">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link
          href="/cart"
          className="inline-flex items-center gap-1.5 text-sm text-muted-text hover:text-rose-accent transition-colors"
        >
          <ArrowLeft size={14} />
          Back to Cart
        </Link>
      </div>

      <h1 className="font-serif text-3xl lg:text-4xl text-rose-deep mb-8">
        Checkout
      </h1>

      <div className="lg:grid lg:grid-cols-3 lg:gap-12">
        {/* ---- Form ---- */}
        <form
          onSubmit={handleSubmit}
          className="lg:col-span-2 space-y-8"
          noValidate
        >
          {/* Shipping Details */}
          <div className="bg-bg-secondary/60 border border-cream-alt p-6 lg:p-8 space-y-6">
            <h2 className="font-serif text-xl text-rose-deep">
              Shipping Details
            </h2>

            {/* Full Name */}
            <FormField
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.fullName ? errors.fullName : undefined}
              placeholder="Enter your full name"
              required
            />

            {/* Mobile */}
            <FormField
              label="Mobile Number"
              name="mobile"
              type="tel"
              value={formData.mobile}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.mobile ? errors.mobile : undefined}
              placeholder="10-digit mobile number"
              maxLength={10}
              prefix="+91"
              required
            />

            {/* Address */}
            <FormTextarea
              label="Address"
              name="addressLine"
              value={formData.addressLine}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.addressLine ? errors.addressLine : undefined}
              placeholder="House/Flat No., Street, Area, Landmark"
              required
            />

            {/* State & City row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormSelect
                label="State / UT"
                name="state"
                value={formData.state}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.state ? errors.state : undefined}
                options={INDIAN_STATES_AND_UTS}
                placeholder="Select state"
                required
              />
              <FormField
                label="District / City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.city ? errors.city : undefined}
                placeholder="Enter district or city"
                required
              />
            </div>

            {/* PIN & Email row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                label="PIN Code"
                name="pinCode"
                type="tel"
                value={formData.pinCode}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.pinCode ? errors.pinCode : undefined}
                placeholder="6-digit PIN code"
                maxLength={6}
                required
              />
              <FormField
                label="Email"
                name="email"
                type="email"
                value={formData.email || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email ? errors.email : undefined}
                placeholder="Optional"
              />
            </div>
          </div>

          {/* Order Notes */}
          <div className="bg-bg-secondary/60 border border-cream-alt p-6 lg:p-8 space-y-6">
            <h2 className="font-serif text-xl text-rose-deep">
              Additional Information
            </h2>
            <FormTextarea
              label="Order Notes"
              name="orderNotes"
              value={formData.orderNotes || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Any special requests or notes for your order (optional)"
            />
          </div>

          {/* Submit - mobile only (desktop has sticky sidebar) */}
          <div className="lg:hidden">
            {hasOutOfStockItems && (
              <p className="text-xs text-error font-medium text-center mb-3">
                Your cart contains sold out items. Please remove them to place your order.
              </p>
            )}
            <button
              type="submit"
              disabled={!isFormValid || submitting || hasOutOfStockItems}
              className={cn(
                "w-full py-4 text-sm font-semibold tracking-wide transition-colors flex items-center justify-center gap-2",
                isFormValid && !submitting && !hasOutOfStockItems
                  ? "bg-rose-deep text-cream-base hover:bg-rose-accent"
                  : "bg-cream-alt text-muted-text cursor-not-allowed"
              )}
            >
              {submitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Processing…
                </>
              ) : (
                "Place Order via WhatsApp"
              )}
            </button>
          </div>
        </form>

        {/* ---- Order Summary Sidebar ---- */}
        <div className="lg:col-span-1 mt-8 lg:mt-0">
          <div className="sticky top-32 bg-bg-secondary/60 border border-cream-alt p-6 lg:p-8 space-y-6">
            <h2 className="font-serif text-xl text-rose-deep">
              Order Summary
            </h2>

            {/* Items */}
            <div className="space-y-4 max-h-64 overflow-y-auto">
              {cartItemsWithDetails.map((item) => {
                const primaryImage =
                  item.product.gallery.find((g) => g.type === "image")?.src ||
                  "/placeholder.jpg";
                return (
                  <div
                    key={`${item.productId}-${item.variantId || "default"}`}
                    className="flex gap-3"
                  >
                    <div className="relative w-14 h-18 flex-shrink-0 bg-cream-alt overflow-hidden">
                      <Image
                        src={primaryImage}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                      {/* Quantity badge */}
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-accent text-cream-base text-[10px] font-bold rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-charcoal-text line-clamp-1">
                        {item.product.name}
                      </p>
                      <p className="text-sm text-muted-text mt-0.5">
                        ₹{item.product.price.toLocaleString("en-IN")} × {item.quantity}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-charcoal-text whitespace-nowrap">
                      ₹
                      {(item.product.price * item.quantity).toLocaleString(
                        "en-IN"
                      )}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-cream-alt pt-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-text">Subtotal</span>
                <span className="font-medium text-charcoal-text">
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-text">Shipping</span>
                <span className="font-medium text-success">Free</span>
              </div>
            </div>

            <div className="border-t border-cream-alt pt-4 flex justify-between items-center">
              <span className="font-serif text-lg text-charcoal-text">
                Total
              </span>
              <span className="font-serif text-2xl font-semibold text-rose-deep">
                ₹{subtotal.toLocaleString("en-IN")}
              </span>
            </div>

            {hasOutOfStockItems && (
              <p className="text-xs text-error font-medium text-center">
                Your cart contains sold out items.
              </p>
            )}
            {/* Desktop Submit Button */}
            <button
              type="submit"
              form=""
              disabled={!isFormValid || submitting || hasOutOfStockItems}
              onClick={handleSubmit}
              className={cn(
                "hidden lg:flex w-full py-3.5 text-sm font-semibold tracking-wide transition-colors items-center justify-center gap-2",
                isFormValid && !submitting && !hasOutOfStockItems
                  ? "bg-rose-deep text-cream-base hover:bg-rose-accent"
                  : "bg-cream-alt text-muted-text cursor-not-allowed"
              )}
            >
              {submitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Processing…
                </>
              ) : (
                "Place Order via WhatsApp"
              )}
            </button>

            <p className="text-xs text-muted-text text-center">
              You&apos;ll be redirected to WhatsApp to confirm your order
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  Reusable Form Sub-components                                       */
/* ================================================================== */

type FormFieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
  placeholder?: string;
  maxLength?: number;
  prefix?: string;
  required?: boolean;
};

function FormField({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  type = "text",
  placeholder,
  maxLength,
  prefix,
  required,
}: FormFieldProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-charcoal-text mb-1.5"
      >
        {label}
        {required && <span className="text-rose-accent ml-0.5">*</span>}
      </label>
      <div
        className={cn(
          "flex items-center border transition-colors",
          error
            ? "border-error"
            : "border-cream-alt focus-within:border-rose-accent"
        )}
      >
        {prefix && (
          <span className="pl-3 pr-1 text-sm text-muted-text select-none">
            {prefix}
          </span>
        )}
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          maxLength={maxLength}
          className={cn(
            "w-full px-3 py-3 bg-transparent text-sm text-charcoal-text placeholder:text-muted-text/60 outline-none",
            prefix && "pl-1"
          )}
        />
      </div>
      {error && <p className="mt-1 text-xs text-error">{error}</p>}
    </div>
  );
}

type FormTextareaProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
};

function FormTextarea({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  required,
}: FormTextareaProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-charcoal-text mb-1.5"
      >
        {label}
        {required && <span className="text-rose-accent ml-0.5">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        rows={3}
        className={cn(
          "w-full px-3 py-3 border bg-transparent text-sm text-charcoal-text placeholder:text-muted-text/60 outline-none resize-none transition-colors",
          error
            ? "border-error"
            : "border-cream-alt focus:border-rose-accent"
        )}
      />
      {error && <p className="mt-1 text-xs text-error">{error}</p>}
    </div>
  );
}

type FormSelectProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLSelectElement>) => void;
  error?: string;
  options: readonly string[];
  placeholder?: string;
  required?: boolean;
};

function FormSelect({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  options,
  placeholder,
  required,
}: FormSelectProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-charcoal-text mb-1.5"
      >
        {label}
        {required && <span className="text-rose-accent ml-0.5">*</span>}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={cn(
          "w-full px-3 py-3 border bg-transparent text-sm outline-none appearance-none transition-colors",
          !value ? "text-muted-text/60" : "text-charcoal-text",
          error
            ? "border-error"
            : "border-cream-alt focus:border-rose-accent"
        )}
      >
        <option value="" disabled>
          {placeholder || "Select…"}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-error">{error}</p>}
    </div>
  );
}
