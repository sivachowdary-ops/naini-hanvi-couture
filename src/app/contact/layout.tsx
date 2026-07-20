import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Naini Hanvi Couture",
  description:
    "Get in touch with Naini Hanvi Couture via WhatsApp, phone, or our contact form. We're here to help with orders, styling, and more.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
