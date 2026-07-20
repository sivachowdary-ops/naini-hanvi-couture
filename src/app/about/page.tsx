import type { Metadata } from "next";
import { Sparkles, Heart, Crown } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Naini Hanvi Couture",
  description:
    "Discover the story behind Naini Hanvi Couture — a curated ethnic wear brand celebrating Indian heritage through premium sarees and traditional attire.",
};

const values = [
  {
    icon: Sparkles,
    title: "Quality",
    description:
      "Every piece in our collection is hand-selected for its superior fabric, weave, and finish. We partner only with trusted artisans and weavers who share our commitment to excellence.",
  },
  {
    icon: Heart,
    title: "Tradition",
    description:
      "We celebrate the rich tapestry of Indian textile heritage — from Banarasi brocades to Kanjivaram silks. Each saree carries centuries of craft tradition into your modern wardrobe.",
  },
  {
    icon: Crown,
    title: "Elegance",
    description:
      "Our curation focuses on timeless elegance over fleeting trends. We believe every woman deserves to feel regal, and our collection is designed to make that effortless.",
  },
];

export default function AboutPage() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative bg-cream-alt py-24 md:py-32 overflow-hidden">
        {/* Decorative gold line */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-hairline to-transparent" />

        <div className="container mx-auto px-4 lg:px-8 text-center">
          <p className="text-sm tracking-[0.3em] uppercase text-rose-accent font-medium mb-4">
            Our Story
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-rose-deep leading-tight mb-6">
            Naini Hanvi Couture
          </h1>
          <p className="text-muted-text text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Where heritage meets modern grace — curating India&apos;s finest
            ethnic wear for the woman who celebrates tradition with style.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-hairline to-transparent" />
      </section>

      {/* Brand Story Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-rose-deep mb-2">
              Our Journey
            </h2>
            <div className="w-16 h-0.5 bg-gold-hairline mx-auto mt-4" />
          </div>

          <div className="space-y-6 text-muted-text text-base md:text-lg leading-relaxed">
            <p>
              Naini Hanvi Couture was born from a deep love for India&apos;s
              textile traditions and a desire to make premium ethnic wear
              accessible to every woman. What started as a passion for
              collecting beautiful sarees soon blossomed into a mission — to
              curate the very best of Indian craftsmanship and bring it to your
              doorstep.
            </p>
            <p>
              We work directly with skilled weavers and artisan families across
              India, from the silk looms of Varanasi to the handloom clusters of
              South India. Every saree in our collection tells a story — of
              heritage, of skill passed through generations, and of the hands
              that wove it with care.
            </p>
            <p>
              At Naini Hanvi, we believe that ethnic wear is more than
              clothing — it&apos;s an expression of identity, celebration, and
              grace. Whether you&apos;re dressing for a wedding, a festival, or
              an everyday moment of elegance, we are here to help you find the
              perfect piece that makes you feel extraordinary.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-cream-alt py-20 md:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-rose-deep mb-2">
              What We Stand For
            </h2>
            <div className="w-16 h-0.5 bg-gold-hairline mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-cream-base rounded-xl p-8 text-center shadow-sm border border-cream-alt hover:shadow-md transition-shadow duration-300"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blush-primary/30 text-rose-deep mb-6">
                  <value.icon size={26} />
                </div>
                <h3 className="font-serif text-xl font-bold text-rose-deep mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-text text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-rose-deep mb-4">
            Ready to Explore?
          </h2>
          <p className="text-muted-text mb-8 max-w-md mx-auto">
            Discover our handpicked collection of premium ethnic wear, curated
            just for you.
          </p>
          <a
            href="/shop"
            className="inline-block bg-rose-deep text-cream-base px-8 py-3.5 rounded-lg font-semibold text-sm tracking-wide hover:bg-rose-accent transition-colors duration-300"
          >
            Shop the Collection
          </a>
        </div>
      </section>
    </main>
  );
}
