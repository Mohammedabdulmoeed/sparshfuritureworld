import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { categoriesIn, electronicsCollections, type Category } from "@/data/categories";
import { RevealGroup, RevealItem } from "./Reveal";
import { cn } from "@/lib/utils";

/** Layout recipe for the editorial category mosaic (desktop). */
const layout = [
  "md:col-span-6 md:row-span-2 aspect-[4/5] md:aspect-auto", // living — feature
  "md:col-span-6 aspect-[16/10]", // bedroom
  "md:col-span-3 aspect-[4/5]", // dining
  "md:col-span-3 aspect-[4/5]", // wardrobes
  "md:col-span-5 aspect-[16/11]", // office
  "md:col-span-3 aspect-[4/5] md:aspect-auto", // mattresses
  "md:col-span-4 aspect-[16/11] md:aspect-auto", // other
];

export function CategoryTile({ category, className, feature }: { category: Category; className?: string; feature?: boolean }) {
  return (
    <Link
      to="/products"
      search={{ category: category.slug }}
      className={cn("group relative block h-full min-h-[16rem] overflow-hidden bg-cream", className)}
      aria-label={`${category.name} — view products`}
    >
      <img
        src={category.image}
        alt={category.alt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-[var(--ease-editorial)] group-hover:scale-[1.05]"
      />
      <div className="image-bottom-overlay absolute inset-0 opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-on-dark md:p-7">
        <div className="transition-transform duration-500 ease-[var(--ease-editorial)] group-hover:-translate-y-1">
            <p className="eyebrow mb-2 text-on-dark-muted break-words">{category.label}</p>
          <h3 className={cn("font-display leading-none", feature ? "text-4xl md:text-6xl" : "text-[1.75rem] md:text-3xl")}>
              <span className="link-line break-words">{category.name}</span>
          </h3>
        </div>
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-on-dark/50 transition-all duration-300 group-hover:border-bronze group-hover:bg-bronze group-hover:text-espresso">
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}

export function ElectronicsGrid() {
  const electronicsLayout = [
    "sm:col-span-2 md:col-span-6 md:row-span-2 aspect-[4/5] md:aspect-auto",
    "md:col-span-6 aspect-[16/10]",
    "md:col-span-3 aspect-[4/5]",
    "md:col-span-3 aspect-[4/5]",
    "md:col-span-3 aspect-[4/5]",
    "md:col-span-3 aspect-[4/5]",
    "md:col-span-3 aspect-[4/5]",
    "md:col-span-3 aspect-[4/5]",
  ];
  return (
    <RevealGroup className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:auto-rows-[minmax(14rem,auto)] md:grid-cols-12 md:gap-4">
      {electronicsCollections.map((category, i) => (
        <RevealItem key={category.slug} className={electronicsLayout[i] ?? "md:col-span-3 aspect-[4/5]"}>
          <CategoryTile category={category} feature={i === 0} className="h-full" />
        </RevealItem>
      ))}
    </RevealGroup>
  );
}

export function CategoryGrid() {
  return (
    <RevealGroup className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:auto-rows-[minmax(14rem,auto)] md:grid-cols-12 md:gap-4">
      {categoriesIn("furniture").map((c, i) => (
        <RevealItem key={c.slug} className={cn(layout[i] ?? "md:col-span-4 aspect-[4/5]", i === 0 && "sm:col-span-2 md:col-span-6")}>
          <CategoryTile category={c} feature={i === 0} className="h-full" />
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
