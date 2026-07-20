"use client";

import Link from "next/link";

export type BreadcrumbItem = {
  label: string;
  href?: string; // last item (current page) has no href
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
};

/**
 * Reusable breadcrumb component that renders both visible UI
 * and schema.org/BreadcrumbList JSON-LD structured data.
 */
export default function Breadcrumb({ items }: BreadcrumbProps) {
  // Generate JSON-LD for BreadcrumbList
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `https://hanvi-couture.vercel.app${item.href}` } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="text-xs text-[var(--color-text-muted)] mb-4 sm:mb-6">
        <ol className="flex flex-wrap items-center gap-1.5">
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-1.5">
              {index > 0 && (
                <span className="text-[var(--color-gold-muted)]">/</span>
              )}
              {item.href ? (
                <Link
                  href={item.href}
                  className="hover:text-[var(--color-gold-primary)] transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-[var(--color-gold-primary)]">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
