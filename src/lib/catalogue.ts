import { getCategory, type Department } from "@/data/categories";
import type { Product } from "@/data/products";

export type CatalogueFilter = { category?: string | undefined; department?: Department | undefined; q?: string | undefined };

/** Filters by category, department and free-text search (name, brand, model, category, specs). */
export function filterProducts(list: Product[], { category, department, q }: CatalogueFilter): Product[] {
  const terms = (q ?? "").toLowerCase().split(/\s+/).filter(Boolean);
  return list.filter((p) => {
    const cat = getCategory(p.category);
    if (category && p.category !== category && !getCategory(category)?.categorySlugs?.includes(p.category)) return false;
    if (department && cat?.department !== department) return false;
    if (!terms.length) return true;
    const hay = [p.name, p.description, p.brand, p.modelNumber, p.subcategory, p.material, cat?.name, cat?.label, ...(p.specs ?? []).map((s) => `${s.label} ${s.value}`)]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return terms.every((t) => hay.includes(t));
  });
}
