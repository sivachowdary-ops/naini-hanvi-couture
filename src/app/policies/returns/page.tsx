import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Returns & Exchange Policy | Naini Hanvi Couture",
  description:
    "Understand Naini Hanvi Couture's returns and exchange policy for a hassle-free shopping experience.",
};

export default function ReturnsPolicyPage() {
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
            Returns &amp; Exchange Policy
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
                Our Commitment
              </h2>
              <p>
                At Naini Hanvi Couture, your satisfaction is our priority. We want you to love every piece you receive. If something isn&apos;t right, we&apos;re here to help.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-rose-deep mb-3">
                Damaged or Defective Products
              </h2>
              <p>
                If you receive a damaged, defective, or incorrect product, please contact us within 48 hours of delivery with clear photographs of the issue. We will arrange a replacement or issue a full refund at no additional cost.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-rose-deep mb-3">
                Non-Returnable Items
              </h2>
              <p>
                Due to the nature of ethnic wear and hygiene considerations, we do not accept returns for change of mind, incorrect size selection, or minor colour variations that may occur between screen displays and actual fabric. We recommend referring to detailed product descriptions and measurements before ordering.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-rose-deep mb-3">
                How to Initiate a Return
              </h2>
              <p>
                To initiate a return or exchange, please reach out to us via WhatsApp at +91 91000 50610 or email us at hello@nainihanvi.com with your order number, photos, and a brief description of the issue. Our team will guide you through the process.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-rose-deep mb-3">
                Refund Processing
              </h2>
              <p>
                Approved refunds will be processed within 7–10 business days to the original payment method. You will receive a confirmation once the refund has been initiated.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
