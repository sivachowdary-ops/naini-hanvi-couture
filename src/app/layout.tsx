import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { Analytics } from "@vercel/analytics/next";

import { StoreLayoutWrapper } from "@/components/layout/StoreLayoutWrapper";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Naini Hanvi Couture | Premium Ethnic Wear Sarees",
    template: "%s | Naini Hanvi Couture",
  },
  description:
    "Discover premium handpicked sarees at Naini Hanvi Couture. Shop Banarasi, Kanchipuram, party wear, and festive sarees with free shipping across India.",
  keywords: [
    "sarees",
    "ethnic wear",
    "banarasi saree",
    "kanchipuram silk",
    "party wear saree",
    "Naini Hanvi Couture",
  ],
  metadataBase: new URL("https://nainihanvi.com"),
  openGraph: {
    siteName: "Naini Hanvi Couture",
    type: "website",
    locale: "en_IN",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-cream-base text-charcoal-text antialiased">
        <CartProvider>
          <StoreLayoutWrapper>{children}</StoreLayoutWrapper>
        </CartProvider>
        <Analytics />
      </body>
    </html>
  );
}
