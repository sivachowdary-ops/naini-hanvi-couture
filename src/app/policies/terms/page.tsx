import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Naini Hanvi Couture",
  description:
    "Review the terms of service for shopping at Naini Hanvi Couture.",
};

export default function TermsPage() {
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
            Terms of Service
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
                Agreement to Terms
              </h2>
              <p>
                By accessing and using the Naini Hanvi Couture website (nainihanvi.com), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our website.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-rose-deep mb-3">
                Products &amp; Pricing
              </h2>
              <p>
                All product descriptions, images, and pricing on our website are provided for informational purposes and are subject to change without notice. We make every effort to display colours and details as accurately as possible, however, actual colours may vary slightly due to monitor settings and lighting conditions during photography.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-rose-deep mb-3">
                Orders &amp; Payment
              </h2>
              <p>
                By placing an order, you confirm that all information provided is accurate. We reserve the right to refuse or cancel any order for reasons including stock availability, pricing errors, or suspected fraudulent activity. Payment must be made in full at the time of purchase unless Cash on Delivery is selected.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-rose-deep mb-3">
                Intellectual Property
              </h2>
              <p>
                All content on this website — including text, images, logos, graphics, and design — is the property of Naini Hanvi Couture and is protected by applicable intellectual property laws. You may not reproduce, distribute, or use any content without our prior written consent.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-rose-deep mb-3">
                Limitation of Liability
              </h2>
              <p>
                Naini Hanvi Couture shall not be liable for any indirect, incidental, or consequential damages arising from the use of our website or products. Our total liability shall not exceed the amount paid for the specific product in question.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-rose-deep mb-3">
                Governing Law
              </h2>
              <p>
                These terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in Hyderabad, Telangana.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-rose-deep mb-3">
                Contact
              </h2>
              <p>
                For any questions regarding these Terms of Service, please contact us at chegondisoujanya@gmail.com or via WhatsApp at +91 80081 22236.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
