import type { Metadata } from "next";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { FAQ_ITEMS } from "@/lib/faqData";

export const metadata: Metadata = {
  title: "FAQ | Naini Hanvi Couture",
  description:
    "Frequently asked questions about ordering, shipping, returns, and more at Naini Hanvi Couture.",
};

export default function FAQPage() {
  // schema.org/FAQPage JSON-LD for rich search results
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    <main className="flex-1">
      {/* Hero */}
      <section className="relative bg-cream-alt py-20 md:py-28 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-hairline to-transparent" />

        <div className="container mx-auto px-4 lg:px-8 text-center">
          <p className="text-sm tracking-[0.3em] uppercase text-rose-accent font-medium mb-4">
            Help Centre
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-rose-deep leading-tight mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-muted-text text-lg max-w-xl mx-auto">
            Everything you need to know about shopping with us. Can&apos;t find
            your answer?{" "}
            <a
              href="/contact"
              className="text-rose-accent underline underline-offset-4 hover:text-rose-deep transition-colors"
            >
              Get in touch
            </a>
            .
          </p>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-hairline to-transparent" />
      </section>

      {/* FAQ Accordion */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <FAQAccordion items={FAQ_ITEMS} />
        </div>
      </section>

      {/* Still have questions CTA */}
      <section className="bg-cream-alt py-16 text-center">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-rose-deep mb-4">
            Still Have Questions?
          </h2>
          <p className="text-muted-text mb-8 max-w-md mx-auto">
            Our team is happy to help. Reach out via WhatsApp for the quickest
            response.
          </p>
          <a
            href="https://wa.me/918008122236"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-rose-deep text-cream-base px-8 py-3.5 rounded-lg font-semibold text-sm tracking-wide hover:bg-rose-accent transition-colors duration-300"
          >
            Chat on WhatsApp
          </a>
        </div>
      </section>
    </main>
    </>
  );
}
