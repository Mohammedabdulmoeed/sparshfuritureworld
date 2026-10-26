import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, MessageCircle, Phone } from "lucide-react";
import { useState } from "react";
import { ProductCard } from "@/components/site/ProductCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/Reveal";
import { ctaVariants } from "@/components/site/cta";
import { getCategory } from "@/data/categories";
import { formatPrice, getProduct, products } from "@/data/products";
import { telHref, siteConfig } from "@/data/siteConfig";
import { productEnquiryMessage, whatsappUrl } from "@/lib/whatsapp";
import { pageHead } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { ElectronicsImage } from "@/components/site/ElectronicsImage";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: (ctx) => {
    const p = ctx.loaderData?.product;
    if (!p) return { meta: [{ title: `Product unavailable | ${siteConfig.name}` }, { name: "robots", content: "noindex" }] };
    return pageHead(ctx, {
      title: p.name,
      description: `${p.description} Request the price and availability from ${siteConfig.name}, Adilabad.`,
      path: `/products/${p.slug}`,
      type: "product",
    });
  },
  notFoundComponent: ProductNotFound,
  component: ProductPage,
});

function ProductNotFound() {
  return (
    <section className="container-editorial flex min-h-[70svh] flex-col justify-center pt-28">
      <p className="eyebrow mb-6 text-walnut">Not found</p>
      <h1 className="display-lg">We couldn't find that piece.</h1>
      <p className="lede mt-6 max-w-lg text-muted-foreground">It may have been renamed or removed. Browse the collection or ask us directly.</p>
      <div className="mt-8 flex gap-3">
        <Link to="/products" className={ctaVariants({ variant: "primary" })}>View products</Link>
        <Link to="/contact" className={ctaVariants({ variant: "outline" })}>Contact us</Link>
      </div>
    </section>
  );
}

function ProductPage() {
  const { product } = Route.useLoaderData();
  const category = getCategory(product.category);
  const [active, setActive] = useState(0);
  const image = product.images[active] ?? product.images[0] ?? { src: "", alt: product.name };
  const related = products.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 3);
  const sameDept = (p: (typeof products)[number]) => getCategory(p.category)?.department === category?.department;
  const fallback = related.length < 3 ? products.filter((p) => p.slug !== product.slug && !related.includes(p) && sameDept(p)).slice(0, 3 - related.length) : [];

  const isElectronics = category?.department === "electronics";
  const details: { k: string; v: string }[] = [
    { k: "Category", v: [category?.name, product.subcategory].filter(Boolean).join(" · ") || "—" },
    ...(product.brand ? [{ k: "Brand", v: product.brand }] : []),
    ...(product.modelNumber ? [{ k: "Model", v: product.modelNumber }] : []),
    { k: "Price", v: formatPrice(product.price) },
    ...(product.specs ?? []).map((sp) => ({ k: sp.label, v: sp.value })),
    ...(product.warranty ? [{ k: "Warranty", v: product.warranty }] : []),
    ...(product.availability ? [{ k: "Availability", v: product.availability }] : []),
    ...(isElectronics
      ? []
      : [
          { k: "Material", v: product.material ?? "Ask us for options" },
          { k: "Dimensions", v: product.dimensions ?? "Confirmed on enquiry" },
        ]),
  ];

  return (
    <>
      <section className="pb-20 pt-28 md:pb-28 md:pt-36">
        <div className="container-editorial">
          <nav aria-label="Breadcrumb" className="mb-10 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <Link to="/products" className="inline-flex items-center gap-2 hover:text-walnut">
              <ArrowLeft className="size-4" /> Products
            </Link>
            {category && (
              <>
                <span aria-hidden>/</span>
                <Link to="/products" search={{ category: category.slug }} className="hover:text-walnut">
                  {category.name}
                </Link>
              </>
            )}
          </nav>

          <div className="grid gap-12 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-7">
              <div className="relative aspect-[4/5] overflow-hidden bg-cream">
                {isElectronics ? <ElectronicsImage key={image.src} src={image.src} alt={image.alt} label={product.subcategory ?? category.name} priority /> : <AnimatePresence mode="wait">
                  <motion.img
                    key={image.src}
                    src={image.src}
                    alt={image.alt}
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </AnimatePresence>}
              </div>
              {product.images.length > 1 && (
                <div className="mt-4 flex gap-3" role="group" aria-label="Product images">
                  {product.images.map((img, i) => (
                    <Button variant="ghost"
                      key={img.src}
                      type="button"
                      onClick={() => setActive(i)}
                      aria-label={`Show image ${i + 1}: ${img.alt}`}
                      aria-pressed={i === active}
                      className={cn("aspect-square w-20 overflow-hidden border-2 transition-colors md:w-24", i === active ? "border-walnut" : "border-transparent opacity-70 hover:opacity-100")}
                    >
                      <img src={img.src} alt="" className="h-full w-full object-cover" />
                    </Button>
                  ))}
                </div>
              )}
            </div>

            <div className="md:col-span-5">
              <div className="md:sticky md:top-28">
                <Reveal>
                  <p className="eyebrow mb-5 text-walnut">{[product.brand, category?.name].filter(Boolean).join(" · ")}</p>
                  <h1 className="display-lg">{product.name}</h1>
                  {product.demonstration && <p className="mt-4 text-sm text-walnut">Demonstration entry · Not confirmed showroom inventory</p>}
                  {product.photoStatus === "manual-replacement" && <p className="mt-3 text-sm text-muted-foreground">A genuine matching product photograph is awaiting manual replacement.</p>}
                  {product.photoCredit && <p className="mt-3 text-xs text-muted-foreground">Photo: {product.photoCredit.attribution} · <a href={product.photoCredit.sourcePage} target="_blank" rel="noopener noreferrer" className="underline">Source</a> · <a href={product.photoCredit.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline">Licence</a></p>}
                  <p className="mt-6 font-display text-2xl italic text-walnut">{formatPrice(product.price)}</p>
                  <p className="lede mt-6 text-muted-foreground">{product.description}</p>
                </Reveal>

                {product.colours && (
                  <Reveal delay={0.05} className="mt-8">
                    <p className="eyebrow mb-3 text-muted-foreground">Colour options seen in store</p>
                    <ul className="flex flex-wrap gap-2">
                      {product.colours.map((c) => (
                        <li key={c} className="border border-border px-3 py-1.5 text-sm">{c}</li>
                      ))}
                    </ul>
                  </Reveal>
                )}

                <Reveal delay={0.1}>
                  <dl className="mt-10 border-t border-border">
                    {details.map((d) => (
                      <div key={d.k} className="flex justify-between gap-6 border-b border-border py-4 text-sm">
                        <dt className="eyebrow text-muted-foreground">{d.k}</dt>
                        <dd className="text-right">{d.v}</dd>
                      </div>
                    ))}
                  </dl>
                </Reveal>

                <Reveal delay={0.15} className="mt-10 grid gap-3">
                  <a href={whatsappUrl(productEnquiryMessage(product.name, isElectronics ? category.name : undefined, product.demonstration))} target="_blank" rel="noopener noreferrer" className={ctaVariants({ variant: "primary" })}>
                    <MessageCircle /> Enquire on WhatsApp
                  </a>
                  <div className="grid grid-cols-2 gap-3">
                    <a href={telHref} className={ctaVariants({ variant: "outline", size: "sm" })}>
                      <Phone /> Call
                    </a>
                    <Link to="/contact" search={{ product: isElectronics ? `${product.name} (${category.name})${product.demonstration ? " — demonstration enquiry" : ""}` : product.name, type: "Product price & availability" }} className={ctaVariants({ variant: "outline", size: "sm" })}>
                      Send enquiry
                    </Link>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {isElectronics ? "Models and stock change — we'll confirm price, warranty and availability when you enquire." : "Stock, sizes and finishes change — we'll confirm price and availability when you enquire."}
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {related.length + fallback.length > 0 && (
      <section className="border-t border-border bg-cream py-20 md:py-28">
        <div className="container-editorial">
          <Reveal className="mb-12 flex items-end justify-between gap-6">
            <h2 className="display-md">You may also like</h2>
            {category && (
              <Link to="/products" search={{ category: category.slug }} className={ctaVariants({ variant: "text", size: "none" })}>
                <span className="link-line">More {category.name}</span> <ArrowRight />
              </Link>
            )}
          </Reveal>
          <RevealGroup className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {[...related, ...fallback].map((p) => (
              <RevealItem key={p.slug}>
                <ProductCard product={p} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
      )}
    </>
  );
}
