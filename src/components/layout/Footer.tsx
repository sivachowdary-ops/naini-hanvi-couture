import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Heart, Share2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-cream-alt pt-16 pb-24 lg:pb-8 border-t border-cream-base">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">
          
          {/* Brand & Story */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Image
                src="/assets/logo.webp"
                alt="Naini Hanvi Couture Logo"
                width={30}
                height={30}
                className="object-contain rounded-full shadow-sm"
              />
              <h3 className="font-serif text-2xl font-bold text-rose-deep">Naini Hanvi Couture</h3>
            </div>
            <p className="text-muted-text text-sm leading-relaxed max-w-sm">
              Discover the elegance of premium ethnic wear. Handpicked sarees and traditional attire that celebrate your grace and beauty.
            </p>
            <div className="flex gap-4 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
                className="text-charcoal-text hover:text-rose-accent transition-colors bg-cream-base p-2 rounded-full shadow-sm flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.51" />
                </svg>
              </a>
              <a href="#" className="text-charcoal-text hover:text-rose-accent transition-colors bg-cream-base p-2 rounded-full shadow-sm">
                <Share2 size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-charcoal-text mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/shop" className="text-sm text-muted-text hover:text-rose-accent transition-colors">Shop All</Link></li>
              <li><Link href="/shop?category=new-arrivals" className="text-sm text-muted-text hover:text-rose-accent transition-colors">New Arrivals</Link></li>
              <li><Link href="/about" className="text-sm text-muted-text hover:text-rose-accent transition-colors">Our Story</Link></li>
              <li><Link href="/faq" className="text-sm text-muted-text hover:text-rose-accent transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="font-semibold text-charcoal-text mb-6">Customer Care</h4>
            <ul className="space-y-3">
              <li><Link href="/policies/shipping" className="text-sm text-muted-text hover:text-rose-accent transition-colors">Shipping Policy</Link></li>
              <li><Link href="/policies/returns" className="text-sm text-muted-text hover:text-rose-accent transition-colors">Returns & Exchange</Link></li>
              <li><Link href="/policies/privacy" className="text-sm text-muted-text hover:text-rose-accent transition-colors">Privacy Policy</Link></li>
              <li><Link href="/policies/terms" className="text-sm text-muted-text hover:text-rose-accent transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-charcoal-text mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-muted-text">
                <Phone size={18} className="text-rose-accent mt-0.5 shrink-0" />
                <span>+91 80081 22236 <br/><span className="text-xs opacity-80">(Mon-Sat, 10am-7pm)</span></span>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-text">
                <Mail size={18} className="text-rose-accent mt-0.5 shrink-0" />
                <span>chegondisoujanya@gmail.com</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-text">
                <MapPin size={18} className="text-rose-accent mt-0.5 shrink-0" />
                <span>Manjeera pipeline road, <br/> Hafeezpet, Hyderabad</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-cream-base/60 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-text">
          <p>&copy; {new Date().getFullYear()} Naini Hanvi Couture. All rights reserved.</p>
          <p>Designed for Elegance.</p>
        </div>
      </div>
    </footer>
  );
}
