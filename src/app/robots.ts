import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/cart", "/checkout", "/admin"],
    },
    sitemap: "https://nainihanvi.com/sitemap.xml",
  };
}
