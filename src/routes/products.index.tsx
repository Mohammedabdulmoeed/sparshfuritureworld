import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { MessageCircle, Search as SearchIcon, X } from "lucide-react";
import { useEffect, useState } from "react";
import { PageHero } from "@/components/site/PageHero";
import { ProductCard } from "@/components/site/ProductCard";
import { Reveal } from "@/components/site/Reveal";
import { ctaVariants } from "@/components/site/cta";
import { categoriesIn, departments, getCategory, getDepartment, type Department } from "@/data/categories";
import { products } from "@/data/products";
import { whatsappUrl, generalEnquiryMessage, categoryEnquiryMessage, electronicsEnquiryMessage } from "@/lib/whatsapp";
import { filterProducts } from "@/lib/catalogue";
import { pageHead } from "@/lib/seo";
import { cn } from "@/lib/utils";
import hero from "@/assets/cat-living.jpg";
import { Button } from "@/components/ui/button";

type Search = { category?: string | undefined; department?: Department | undefined; q?: string | undefined };

export const Route = createFileRoute("/products/")({
  validateSearch: (s: Record<string, unknown>): Search => {
    const out: Search = {};
    if (typeof s["category"] === "string" && getCategory(s["category"])) out.category = s["category"];
    if (typeof s["department"] === "string" && getDepartment(s["department"])) out.department = s["department"] as Department;
    if (typeof s["q"] === "string" && s["q"].trim()) out.q = s["q"].slice(0, 80);
    return out;
  },
  head: (ctx) =>
    pageHead(ctx, {
      title: "Product Catalogue",
      description:
        "Furniture and electronics at Sparsh Furniture World, Adilabad — sofas, beds, dining sets, TVs, appliances, laptops and more. Request prices on WhatsApp.",
      path: "/products",
    }),
  component: ProductsPage,
});

function ProductsPage() {
  const { category, q, department: deptParam } = Route.useSearch();
  const navigate = Route.useNavigate();
  const active = category ? getCategory(category) : undefined;
  const department = deptParam ?? active?.department;
  const list = filterProducts(products, { category, department, q });
  const visibleCategories = department ? categoriesIn(department) : categoriesIn("furniture");
  const [query, setQuery] = useState(q ?? "");
  useEffect(() => setQuery(q ?? ""), [q]);
  const linkCls = (on: boolean) =>
    cn("link-line pb-1 text-sm font-medium uppercase tracking-[0.18em]", on ? "text-espresso after:!scale-x-100" : "text-muted-foreground hover:text-espresso");
  const emptyMessage = active
    ? categoryEnquiryMessage(active.name)
    : department === "electronics"
      ? electronicsEnquiryMessage
      : generalEnquiryMessage;

  return (
    <>
      <PageHero
        eyebrow="Collection"
        lines={active ? [active.name] : department === "electronics" ? ["Electronics."] : ["The collection."]}
        intro={active ? active.description : department === "electronics" ? "TVs, appliances, computers, phones and more — enquire about actual available products." : "Furniture and electronics under one roof, from sofas to smart TVs."}
        image={active?.department === "electronics" || department === "electronics" ? undefined : active?.image ?? hero}
        alt={active?.alt ?? (department === "electronics" ? "Illustrative flat-screen TV on a walnut console" : "Cream sectional sofa in a warm living room")}
      />

      <section className="py-16 md:py-24">
        <div className="container-editorial">
          <form
            role="search"
            className="mb-8 flex max-w-xl items-center gap-3 border-b border-border pb-3 focus-within:border-walnut"
            onSubmit={(e) => {
              e.preventDefault();
              const v = query.trim();
              navigate({ search: (prev) => ({ ...prev, q: v || undefined }) });
            }}
          >
            <SearchIcon className="size-4 shrink-0 text-walnut" aria-hidden />
            <label htmlFor="catalogue-search" className="sr-only">Search products</label>
            <input
              id="catalogue-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search sofas, TVs, refrigerators, brands…"
              className="min-h-11 w-full bg-transparent text-base outline-none placeholder:text-muted-foreground"
            />
            {q && (
              <Button variant="ghost" size="icon" type="button" aria-label="Clear search" className="p-2 text-muted-foreground hover:text-espresso" onClick={() => navigate({ search: (prev) => ({ ...prev, q: undefined }) })}>
                <X className="size-4" />
              </Button>
            )}
          </form>

          <nav aria-label="Filter by department" className="mb-5 -mx-5 overflow-x-auto px-5 md:mx-0 md:px-0">
            <ul className="flex min-w-max gap-x-7">
              <li>
                <Link to="/products" search={{ q }} className={linkCls(!department)} aria-current={!department ? "page" : undefined}>All</Link>
              </li>
              {departments.map((d) => (
                <li key={d.slug}>
                  <Link to="/products" search={{ department: d.slug, q }} className={linkCls(department === d.slug && !category)} aria-current={department === d.slug && !category ? "page" : undefined}>
                    {d.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Filter by category" className="mb-6 -mx-5 overflow-x-auto px-5 md:mx-0 md:px-0">
            <ul className="flex min-w-max gap-x-6 border-b border-border pb-5">
              {visibleCategories.map((c) => (
                <li key={c.slug}>
                  <Link
                    to="/products"
                    search={{ category: c.slug, department: c.department, q }}
                    className={cn("link-line pb-1 text-xs font-medium uppercase tracking-[0.16em]", category === c.slug ? "text-espresso after:!scale-x-100" : "text-muted-foreground hover:text-espresso")}
                    aria-current={category === c.slug ? "page" : undefined}
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <p className="mb-14 max-w-2xl text-sm text-muted-foreground" aria-live="polite">
            Showing {list.length} {list.length === 1 ? "style" : "styles"}. {department === "electronics" ? "Electronics are demonstration entries, not confirmed showroom inventory. Products without a verified genuine photograph are marked for manual photo replacement. Enquire for actual products, prices and availability." : department === "furniture" ? "These pieces represent what we carry — stock, sizes and finishes change often, so message us for current availability and prices." : "Electronics entries are demonstrations, not confirmed inventory; missing genuine photographs are marked for manual replacement. Message us for current availability and prices."}
          </p>

          <motion.ul layout className="grid gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {list.map((p) => (
                <motion.li
                  layout
                  key={p.slug}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ProductCard product={p} />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>

          {list.length === 0 && (
            <div className="flex flex-col items-center gap-6 py-20 text-center">
              <p className="max-w-md text-muted-foreground">
                {q ? `Nothing listed matches "${q}" yet.` : "No items listed here yet."} Ask us what's currently in the showroom.
              </p>
              <a href={whatsappUrl(emptyMessage)} target="_blank" rel="noopener noreferrer" className={ctaVariants({ variant: "primary", size: "sm" })}>
                <MessageCircle /> Ask on WhatsApp
              </a>
            </div>
          )}
        </div>
      </section>

      <section className="bg-cream py-20 md:py-28">
        <Reveal className="container-editorial flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <h2 className="display-md max-w-xl">
            Looking for something <span className="italic text-walnut">specific?</span>
          </h2>
          <div className="flex flex-wrap gap-3">
            <a href={whatsappUrl(generalEnquiryMessage)} target="_blank" rel="noopener noreferrer" className={ctaVariants({ variant: "primary" })}>
              <MessageCircle /> Ask on WhatsApp
            </a>
            <Link to="/services" className={ctaVariants({ variant: "outline" })}>
              Custom-made options
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
