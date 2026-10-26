import { describe, expect, it } from "vitest";
import { categories, categoriesIn } from "@/data/categories";
import { products, formatPrice, getProduct } from "@/data/products";
import { productEnquiryMessage } from "@/lib/whatsapp";
import { filterProducts } from "@/lib/catalogue";

describe("catalogue", () => {
  it("lists all 20 electronics categories and keeps the 7 furniture ones", () => {
    expect(categoriesIn("electronics")).toHaveLength(20);
    expect(categoriesIn("furniture")).toHaveLength(7);
    expect(new Set(categories.map((c) => c.slug)).size).toBe(categories.length);
  });

  it("department filter keeps furniture products under furniture only", () => {
    expect(filterProducts(products, { department: "furniture" })).toHaveLength(11);
    expect(filterProducts(products, { department: "electronics" })).toHaveLength(200);
  });

  it("search matches by name and category", () => {
    expect(filterProducts(products, { q: "wardrobe" }).map((p) => p.slug)).toEqual(["sliding-door-wardrobe"]);
    expect(filterProducts(products, { q: "office furniture" }).length).toBe(2);
  });

  it("unknown price reads Request Price", () => {
    expect(formatPrice(undefined)).toBe("Request Price");
  });

  it.each(categoriesIn("electronics"))("has ten matching entries for $slug", (category) => {
    const items = filterProducts(products, { department: "electronics", category: category.slug });
    expect(items).toHaveLength(10);
    expect(items.every(p => p.category === category.slug && p.department === "electronics")).toBe(true);
  });

  it("uses 200 distinct names and stable identifiers", () => {
    const items = filterProducts(products, { department: "electronics" });
    for (const values of [items.map(p => p.id), items.map(p => p.slug), items.map(p => p.name)]) {
      expect(values.every(Boolean)).toBe(true);
      expect(new Set(values).size).toBe(200);
    }
  });

  it("never claims demo inventory or unsupported product details", () => {
    for (const p of filterProducts(products, { department: "electronics" })) {
      expect(p.demonstration).toBe(true);
      expect(p.brand).toBeUndefined(); expect(p.modelNumber).toBeUndefined();
      expect(p.price).toBeUndefined(); expect(p.specs).toBeUndefined();
      expect(p.warranty).toBeUndefined(); expect(p.availability).toBeUndefined();
      expect(p.subcategory).toBeTruthy();
      expect(getProduct(p.slug)).toBe(p);
    }
  });

  it("does not override conflicting department and category filters", () => {
    expect(filterProducts(products, { department: "furniture", category: "security-cameras" })).toHaveLength(0);
    expect(filterProducts(products, { department: "electronics", category: "living-room" })).toHaveLength(0);
  });

  it("matches subcategories and verified brand fields in search", () => {
    expect(filterProducts(products, { department: "electronics", q: "water heater" }).some(p => p.subcategory === "Water heater")).toBe(true);
    const p = products.find(p => p.category === "televisions");
    if (!p) throw new Error("Missing TV fixture");
    expect(filterProducts([{ ...p, brand: "Verified Example" }], { q: "verified example" })).toHaveLength(1);
    expect(filterProducts(products, { category: "security-cameras", q: "bullet" })).toHaveLength(3);
  });

  it("keeps collection links working without duplicating products", () => {
    expect(filterProducts(products, { category: "televisions-entertainment" })).toHaveLength(40);
  });

  it("security entries have security-only types and no synthetic substitute photos", () => {
    for (const p of filterProducts(products, { category: "security-cameras" })) {
      expect(p.subcategory).toMatch(/security camera/);
      expect(p.images[0]?.src).not.toMatch(/svg|data:image/);
    }
  });

  it("requires genuine licensed photos or explicit manual replacement for every electronics entry", () => {
    for (const p of filterProducts(products, { department: "electronics" })) {
      expect(p.images[0]?.src ?? "").not.toMatch(/\.svg|data:image/);
      if (p.photoStatus === "verified") {
        expect(p.images[0]?.src).toBeTruthy();
        expect(p.photoCredit?.sourcePage).toMatch(/^https:\/\//);
        expect(p.photoCredit?.licenseUrl).toMatch(/^https:\/\//);
        expect(p.photoCredit?.attribution).toBeTruthy();
        expect(p.photoCredit?.width).toBeGreaterThan(0);
      } else {
        expect(p.photoStatus).toBe("manual-replacement");
        expect(p.images[0]?.src).toBe("");
      }
    }
  });

  it("preserves the demo product and category in enquiries", () => {
    const msg = productEnquiryMessage("Outdoor Bullet Camera", "Security Cameras", true);
    expect(msg).toContain("Outdoor Bullet Camera");
    expect(msg).toContain("Security Cameras");
    expect(msg).toContain("demonstration");
  });
});
