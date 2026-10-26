import { siteConfig, fullAddress } from "@/data/siteConfig";

type HeadCtx = { matches: Array<{ routeId: string; loaderData?: unknown }> };

/** Origin captured by the root loader on the server — used for canonical URLs. */
export function originFrom(ctx: HeadCtx): string {
  const root = ctx.matches.find((m) => m.routeId === "__root__");
  const data = root?.loaderData as { origin?: string } | undefined;
  return data?.origin ?? "";
}

export function pageHead(ctx: HeadCtx, opts: { title: string; description: string; path: string; type?: string }) {
  const origin = originFrom(ctx);
  const title = `${opts.title} | ${siteConfig.name}`;
  const url = origin ? `${origin}${opts.path}` : undefined;
  return {
    meta: [
      { title },
      { name: "description", content: opts.description },
      { property: "og:title", content: title },
      { property: "og:description", content: opts.description },
      { property: "og:type", content: opts.type ?? "website" },
      { property: "og:site_name", content: siteConfig.name },
      ...(url ? [{ property: "og:url", content: url }] : []),
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: opts.description },
    ],
    links: url ? [{ rel: "canonical", href: url }] : [],
  };
}

/** LocalBusiness structured data using only confirmed details. */
export function localBusinessJsonLd(origin: string) {
  return {
    type: "application/ld+json",
    children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FurnitureStore",
      name: siteConfig.name,
      description: siteConfig.description,
      telephone: `+${siteConfig.phoneE164}`,
      email: siteConfig.email,
      ...(origin ? { url: origin } : {}),
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.address.street,
        addressLocality: siteConfig.address.city,
        addressRegion: siteConfig.address.region,
        postalCode: siteConfig.address.postalCode,
        addressCountry: siteConfig.address.countryCode,
      },
      areaServed: siteConfig.address.city,
      hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`,
    }),
  };
}
