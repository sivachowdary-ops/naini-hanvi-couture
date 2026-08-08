import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Naini Hanvi Couture",
  description:
    "Read Naini Hanvi Couture's privacy policy to understand how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
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
            Privacy Policy
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
                Information We Collect
              </h2>
              <p>
                When you visit our website or place an order, we may collect personal information including your name, email address, phone number, shipping address, and payment details. We also collect non-personal data such as browser type, device information, and browsing behaviour through cookies.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-rose-deep mb-3">
                How We Use Your Information
              </h2>
              <p>
                We use your information to process and fulfil orders, communicate order updates, provide customer support, improve our website and services, and send promotional offers (only with your consent). We do not sell, trade, or share your personal information with third parties for marketing purposes.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-rose-deep mb-3">
                Data Security
              </h2>
              <p>
                We implement industry-standard security measures to protect your personal information. All payment transactions are processed through secure, PCI-compliant payment gateways. However, no method of electronic transmission or storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-rose-deep mb-3">
                Cookies
              </h2>
              <p>
                Our website uses cookies to enhance your browsing experience, remember your preferences, and analyse website traffic. You can choose to disable cookies through your browser settings, though this may affect certain features of the website.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-rose-deep mb-3">
                Your Rights
              </h2>
              <p>
                You have the right to access, correct, or delete your personal data. To exercise these rights or for any privacy-related queries, please contact us at chegondisoujanya@gmail.com or via WhatsApp at +91 80081 22236.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-rose-deep mb-3">
                Changes to This Policy
              </h2>
              <p>
                We may update this privacy policy from time to time. Any changes will be posted on this page with the revised date. We encourage you to review this policy periodically.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
