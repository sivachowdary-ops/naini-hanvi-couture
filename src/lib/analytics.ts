/**
 * Analytics utility for Naini Hanvi Couture
 * 
 * Provides a lightweight event tracking interface that can be wired to
 * GA4, Meta Pixel, or any analytics provider later.
 * 
 * Currently logs events to console in development mode.
 */

type AnalyticsEvent =
  | "add_to_cart"
  | "remove_from_cart"
  | "view_product"
  | "view_category"
  | "checkout_form_submit"
  | "whatsapp_redirect"
  | "whatsapp_product_inquiry"
  | "cart_opened"
  | "page_view"
  | "request_video_call"
  | "request_store_visit";

type EventParams = Record<string, string | number | boolean | undefined>;

/**
 * Track a named event with optional parameters.
 * 
 * Usage:
 *   trackEvent("add_to_cart", { productId: "prod-1", productName: "Silk Saree", price: 4500 });
 *   trackEvent("whatsapp_redirect", { subtotal: 8700, itemCount: 2 });
 */
export function trackEvent(event: AnalyticsEvent, params?: EventParams): void {
  // Development logging
  if (process.env.NODE_ENV === "development") {
    console.log(`[Analytics] ${event}`, params || "");
  }

  // GA4 / gtag integration (uncomment when GA4 is configured)
  // if (typeof window !== "undefined" && (window as any).gtag) {
  //   (window as any).gtag("event", event, params);
  // }

  // Meta Pixel integration (uncomment when Pixel is configured)
  // if (typeof window !== "undefined" && (window as any).fbq) {
  //   (window as any).fbq("trackCustom", event, params);
  // }
}

/**
 * Track a page view event.
 * Call from useEffect in page components or from the layout.
 */
export function trackPageView(path: string, title?: string): void {
  trackEvent("page_view", { path, title });
}
