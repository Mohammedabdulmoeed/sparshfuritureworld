import { Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle } from "lucide-react";
import { getCategory } from "@/data/categories";
import { formatPrice, type Product } from "@/data/products";
import { productEnquiryMessage, whatsappUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { ElectronicsImage } from "./ElectronicsImage";

type Props = {
  product: Product;
  size?: "feature" | "default";
  className?: string;
  priority?: boolean;
};

/** Product tile: photo stays visible; subtle zoom, secondary image, underline + enquire on hover. */
export function ProductCard({ product, size = "default", className, priority }: Props) {
  const [primary, secondary] = product.images;
  if (!primary) return null;
  const category = getCategory(product.category);
  const electronics = category?.department === "electronics";
  return (
    <article className={cn("group relative", className)}>
      <div className={cn("relative overflow-hidden bg-cream", size === "feature" ? "aspect-[4/5] md:aspect-[5/6]" : "aspect-[4/5]")}>
        <Link to="/products/$slug" params={{ slug: product.slug }} className="absolute inset-0 z-10" aria-label={`View ${product.name}`} />
        {electronics ? <ElectronicsImage key={primary.src} src={primary.src} alt={primary.alt} label={product.subcategory ?? category.name} priority={priority} /> : <img
          src={primary.src}
          alt={primary.alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-[var(--ease-editorial)] group-hover:scale-[1.05]"
        />}
        {secondary && (
          <img
            src={secondary.src}
            alt=""
            aria-hidden
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        )}
        <a
          href={whatsappUrl(productEnquiryMessage(product.name, electronics ? category.name : undefined, product.demonstration))}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-4 left-4 z-20 inline-flex items-center gap-2 bg-ivory px-4 py-2.5 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-espresso transition-all duration-300 hover:bg-bronze md:translate-y-3 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:focus-visible:translate-y-0 md:focus-visible:opacity-100"
          aria-label={`Enquire about ${product.name} on WhatsApp (opens in a new tab)`}
        >
          <MessageCircle className="size-3.5" aria-hidden /> Enquire
        </a>
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow mb-2 text-muted-foreground">{product.subcategory ?? category?.name}</p>
          {product.demonstration && <p className="mb-2 text-xs text-muted-foreground">Demonstration entry · Not confirmed stock</p>}
          {product.brand && <p className="mb-2 text-sm text-walnut">{product.brand}</p>}
          <h3 className={cn("font-display leading-tight", size === "feature" ? "text-3xl md:text-4xl" : "text-2xl")}>
            <Link to="/products/$slug" params={{ slug: product.slug }} className="link-line">
              {product.name}
            </Link>
          </h3>
          <p className="mt-2 text-sm text-walnut">{formatPrice(product.price)}</p>
        </div>
        <ArrowRight className="mt-7 size-5 shrink-0 text-walnut transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden />
      </div>
    </article>
  );
}
