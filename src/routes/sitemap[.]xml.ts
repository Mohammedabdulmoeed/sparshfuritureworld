import { createFileRoute } from "@tanstack/react-router";
import { products } from "@/data/products";

const staticPaths = ["/", "/about", "/categories", "/products", "/services", "/gallery", "/offers", "/contact", "/faq", "/privacy-policy", "/terms"];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const origin = new URL(request.url).origin;
        const urls = [...staticPaths, ...products.map((p) => `/products/${p.slug}`)];
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
          .map((u) => `  <url><loc>${origin}${u}</loc></url>`)
          .join("\n")}\n</urlset>`;
        return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
      },
    },
  },
});
