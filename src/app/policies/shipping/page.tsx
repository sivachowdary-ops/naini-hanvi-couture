import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping Policy | Naini Hanvi Couture",
  description:
    "Learn about Naini Hanvi Couture's shipping policy, delivery timelines, and free shipping across India.",
};

export default function ShippingPolicyPage() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="relative bg-cream-alt py-16 md:py-24 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-hairline to-transparent" />
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <p className="text-sm tracking-[0.3em] uppercase text-rose-accent font-medium mb-4">
            Policies
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-rose-deep leading-tight">
            Shipping Policy
          </h1>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-hairline to-transparent" />
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <div className="bg-cream-alt/50 border border-cream-alt rounded-lg px-6 py-4 mb-10 text-sm text-rose-accent font-medium">
            [PLACEHOLDER — Client to provide final legal text]
          </div>

          <div className="prose prose-neutral max-w-none space-y-8 text-muted-text leading-relaxed">
            <div>
              <h2 className="font-serif text-xl font-bold text-rose-deep mb-3">
                Domestic Shipping
              </h2>
              <p>
                We offer free standard shipping across India on all orders. Orders are carefully packaged and dispatched within 24 hours on business days (Monday–Saturday). Standard delivery typically takes 5–7 business days depending on your location and pin code.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-rose-deep mb-3">
                Order Processing
              </h2>
              <p>
                All orders are processed and verified within 24 hours of placement. You will receive a confirmation email and WhatsApp message with your order details once your order has been confirmed.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-rose-deep mb-3">
                Tracking Your Order
              </h2>
              <p>
                Once your order is shipped, we will share a tracking link via email and WhatsApp. You can use this link to monitor the real-time status of your delivery. For any queries, contact us on WhatsApp at +91 80081 22236.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-rose-deep mb-3">
                Delivery Partners
              </h2>
              <p>
                We partner with trusted courier services to ensure safe and timely delivery of your orders. Depending on your location, delivery may be handled by Delhivery, Blue Dart, DTDC, or India Post.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-rose-deep mb-3">
                Shipping Delays
              </h2>
              <p>
                While we strive to deliver on time, occasional delays may occur due to unforeseen circumstances such as weather, strikes, or high-demand periods (festive season). We appreciate your patience and will keep you updated on any delays.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
