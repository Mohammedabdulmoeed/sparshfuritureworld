import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { FlipCard } from "@/components/site/FlipCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/Reveal";
import { ctaVariants } from "@/components/site/cta";
import { categoriesIn, departments } from "@/data/categories";
import { products } from "@/data/products";
import { pageHead } from "@/lib/seo";
import hero from "@/assets/cat-dining.jpg";

export const Route = createFileRoute("/categories")({
  head: (ctx) =>
    pageHead(ctx, {
      title: "Furniture & Electronics Categories",
      description:
        "Browse furniture for every room plus TVs, appliances, laptops, phones and more electronics at Sparsh Furniture World, Adilabad.",
      path: "/categories",
    }),
  component: CategoriesPage,
});

function CategoriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Categories"
        lines={["Furniture for", "every room."]}
        intro="Furniture for every room, plus TVs, appliances and electronics. Flip a card for details, then explore the collection."
        image={hero}
        alt="Dining room with a walnut table and cream chairs"
      />

      {departments.map((d, di) => (
      <section key={d.slug} id={d.slug} className={di === 0 ? "py-24 md:py-32" : "border-t border-border py-24 md:py-32"}>
        <div className="container-editorial">
          <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <h2 className="display-md">{d.name}</h2>
            <Link to="/products" search={{ department: d.slug }} className={ctaVariants({ variant: "text", size: "none" })}>
              <span className="link-line">All {d.name.toLowerCase()}</span> <ArrowRight />
            </Link>
          </Reveal>
          <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categoriesIn(d.slug).map((c, i) => (
              <RevealItem key={c.slug}>
                <FlipCard
                  index={i}
                  title={c.name}
                  label={c.label}
                  image={c.image}
                  alt={c.alt}
                  description={c.description}
                  highlights={c.highlights}
                  cta={{ label: "Explore collection", to: "/products", search: { category: c.slug } }}
                />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
      ))}

      <section className="border-t border-border bg-cream py-24 md:py-32">
        <div className="container-editorial grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <p className="eyebrow mb-6 text-walnut">Index</p>
            <h2 className="display-md">
              All rooms,
              <br />
              <span className="italic text-walnut">at a glance.</span>
            </h2>
            <Link to="/products" className={`${ctaVariants({ variant: "primary", size: "sm" })} mt-8`}>
              All products <ArrowRight />
            </Link>
          </Reveal>
          <ul className="md:col-span-7 md:col-start-6">
            {categoriesIn("furniture").map((c) => {
              const count = products.filter((p) => p.category === c.slug).length;
              return (
                <li key={c.slug} className="border-b border-border first:border-t">
                  <Link
                    to="/products"
                    search={{ category: c.slug }}
                    className="group flex items-center justify-between gap-6 py-6"
                  >
                    <span className="font-display text-3xl transition-transform duration-500 group-hover:translate-x-2 md:text-4xl">
                      {c.name}
                    </span>
                    <span className="flex items-center gap-5 text-sm text-muted-foreground">
                      <span className="hidden sm:inline">{count} {count === 1 ? "style" : "styles"}</span>
                      <ArrowUpRight className="size-5 text-walnut transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
