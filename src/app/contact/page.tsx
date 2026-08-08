"use client";

import { useState } from "react";
import { MessageCircle, Phone, Clock, Send } from "lucide-react";
import { cn } from "@/lib/utils";

// Metadata is exported from a separate file since this is a client component
// See: contact/layout.tsx or head.tsx — but for simplicity we inline it in
// a server wrapper. Actually, in App Router we can't export metadata from
// a "use client" file, so we use generateMetadata in a wrapper or just rely
// on the layout. We'll keep it simple: the parent layout provides the site
// title and this page works as client.

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // No backend — just show a confirmation
    setSubmitted(true);
  }

  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="relative bg-cream-alt py-20 md:py-28 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-hairline to-transparent" />

        <div className="container mx-auto px-4 lg:px-8 text-center">
          <p className="text-sm tracking-[0.3em] uppercase text-rose-accent font-medium mb-4">
            Get in Touch
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-rose-deep leading-tight mb-4">
            Contact Us
          </h1>
          <p className="text-muted-text text-lg max-w-xl mx-auto">
            We&apos;d love to hear from you. Reach out and we&apos;ll get back
            to you as soon as possible.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-hairline to-transparent" />
      </section>

      {/* Contact Info + Form */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            {/* Left: Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-rose-deep mb-6">
                  We&apos;re Here to Help
                </h2>
                <p className="text-muted-text leading-relaxed">
                  Whether you have a question about our products, need help with
                  an order, or just want to say hello — we&apos;re always happy
                  to connect.
                </p>
              </div>

              {/* WhatsApp */}
              <a
                href="https://wa.me/918008122236"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-cream-alt rounded-xl p-5 border border-cream-alt hover:border-rose-accent/30 transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center shrink-0">
                  <MessageCircle
                    size={24}
                    className="text-success group-hover:scale-110 transition-transform"
                  />
                </div>
                <div>
                  <p className="font-semibold text-charcoal-text text-sm">
                    Chat on WhatsApp
                  </p>
                  <p className="text-muted-text text-sm">
                    Fastest way to reach us — tap to start a chat
                  </p>
                </div>
              </a>

              {/* Phone */}
              <a
                href="tel:+918008122236"
                className="flex items-center gap-4 bg-cream-alt rounded-xl p-5 border border-cream-alt hover:border-rose-accent/30 transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-blush-primary/30 flex items-center justify-center shrink-0">
                  <Phone
                    size={24}
                    className="text-rose-deep group-hover:scale-110 transition-transform"
                  />
                </div>
                <div>
                  <p className="font-semibold text-charcoal-text text-sm">
                    +91 80081 22236
                  </p>
                  <p className="text-muted-text text-sm">
                    Call us during business hours
                  </p>
                </div>
              </a>

              {/* Business Hours */}
              <div className="flex items-center gap-4 bg-cream-alt rounded-xl p-5 border border-cream-alt">
                <div className="w-12 h-12 rounded-full bg-gold-hairline/20 flex items-center justify-center shrink-0">
                  <Clock size={24} className="text-gold-hairline" />
                </div>
                <div>
                  <p className="font-semibold text-charcoal-text text-sm">
                    Business Hours
                  </p>
                  <p className="text-muted-text text-sm">
                    Monday – Saturday: 10:00 AM – 7:00 PM IST
                  </p>
                  <p className="text-muted-text text-xs mt-0.5">
                    Closed on Sundays &amp; public holidays
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="bg-cream-alt rounded-2xl p-8 md:p-10 border border-cream-alt">
              <h3 className="font-serif text-xl font-bold text-rose-deep mb-6">
                Send Us a Message
              </h3>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                    <Send size={28} className="text-success" />
                  </div>
                  <h4 className="font-serif text-xl font-bold text-rose-deep mb-2">
                    Thank You!
                  </h4>
                  <p className="text-muted-text text-sm">
                    We&apos;ve received your message and will get back to you
                    shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-charcoal-text mb-1.5"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-3 rounded-lg border border-cream-base bg-cream-base text-charcoal-text placeholder:text-muted-text/50 focus:outline-none focus:ring-2 focus:ring-rose-accent/50 focus:border-rose-accent transition-colors text-sm"
                      placeholder="Enter your name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-charcoal-text mb-1.5"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-3 rounded-lg border border-cream-base bg-cream-base text-charcoal-text placeholder:text-muted-text/50 focus:outline-none focus:ring-2 focus:ring-rose-accent/50 focus:border-rose-accent transition-colors text-sm"
                      placeholder="you@example.com"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-charcoal-text mb-1.5"
                    >
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          message: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-3 rounded-lg border border-cream-base bg-cream-base text-charcoal-text placeholder:text-muted-text/50 focus:outline-none focus:ring-2 focus:ring-rose-accent/50 focus:border-rose-accent transition-colors text-sm resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-rose-deep text-cream-base py-3.5 rounded-lg font-semibold text-sm tracking-wide hover:bg-rose-accent transition-colors duration-300"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
