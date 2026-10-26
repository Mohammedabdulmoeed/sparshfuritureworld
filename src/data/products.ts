import sofa from "@/assets/p-sofa.jpg";
import armchair from "@/assets/p-armchair.jpg";
import coffeeTable from "@/assets/p-coffeetable.jpg";
import tvUnit from "@/assets/p-tvunit.jpg";
import bed from "@/assets/p-bed.jpg";
import officeChair from "@/assets/p-officechair.jpg";
import living from "@/assets/cat-living.jpg";
import bedroom from "@/assets/cat-bedroom.jpg";
import dining from "@/assets/cat-dining.jpg";
import wardrobe from "@/assets/cat-wardrobe.jpg";
import office from "@/assets/cat-office.jpg";
import mattress from "@/assets/cat-mattress.jpg";
import showroom from "@/assets/showroom.jpg";
import { electronicsProducts } from "./electronics-products";
import type { Department } from "./categories";

export type ProductImage = { src: string; alt: string };

export type Product = {
  id?: string;
  department?: Department;
  demonstration?: boolean;
  photoStatus?: "verified" | "manual-replacement";
  photoCredit?: { sourcePage: string; licenseUrl: string; attribution: string; width: number; height: number };
  slug: string;
  name: string;
  category: string; // category slug
  description: string;
  /** Leave undefined until a confirmed price exists — UI shows "Request Price". */
  price?: number;
  material?: string;
  dimensions?: string;
  colours?: string[];
  /** Electronics fields — show only what is confirmed. */
  subcategory?: string;
  brand?: string;
  modelNumber?: string;
  specs?: { label: string; value: string }[];
  warranty?: string;
  availability?: string;
  images: ProductImage[];
  featured?: boolean;
};

/**
 * Representative styles carried in the showroom. Stock, sizes and finishes change,
 * so prices and dimensions are only shown when confirmed.
 */
export const products: Product[] = [
  {
    slug: "three-seater-fabric-sofa",
    name: "Three-Seater Fabric Sofa",
    category: "living-room",
    description:
      "A clean-lined three-seater with deep seat cushions and tapered wooden legs — an easy anchor for most living rooms.",
    material: "Fabric upholstery, wooden legs",
    colours: ["Taupe", "Cream", "Charcoal"],
    images: [
      { src: sofa, alt: "Taupe three-seater fabric sofa with walnut legs" },
      { src: living, alt: "Sofa styled in a warm living room" },
    ],
    featured: true,
  },
  {
    slug: "cane-back-accent-armchair",
    name: "Cane-Back Accent Armchair",
    category: "living-room",
    description:
      "A wooden frame armchair with a woven cane back and a soft cushioned seat, for reading corners and bedrooms.",
    material: "Wood frame, cane back, upholstered seat",
    images: [{ src: armchair, alt: "Walnut armchair with cane back and cream cushion" }],
    featured: true,
  },
  {
    slug: "round-pedestal-coffee-table",
    name: "Round Pedestal Coffee Table",
    category: "living-room",
    description:
      "A sculptural round coffee table on a tapered pedestal base. Rich wood grain, no sharp corners.",
    material: "Wood",
    images: [{ src: coffeeTable, alt: "Round walnut coffee table on a pedestal base" }],
    featured: true,
  },
  {
    slug: "modular-sectional-sofa",
    name: "Modular Sectional Sofa",
    category: "living-room",
    description:
      "A generous L-shaped sectional with rounded arms and soft textured upholstery — made for long evenings.",
    material: "Textured fabric upholstery",
    images: [{ src: living, alt: "Cream modular sectional sofa in a living room" }],
  },
  {
    slug: "upholstered-panel-bed",
    name: "Upholstered Panel Bed",
    category: "bedroom",
    description:
      "A tall channel-tufted headboard framed in wood. Available in different bed sizes — ask us which are in stock.",
    material: "Wood frame, upholstered headboard",
    images: [
      { src: bed, alt: "Wooden bed with tall cream channel-tufted headboard" },
      { src: bedroom, alt: "Bed styled in a calm bedroom" },
    ],
    featured: true,
  },
  {
    slug: "sliding-door-wardrobe",
    name: "Sliding-Door Wardrobe",
    category: "wardrobes-storage",
    description:
      "A full-height wardrobe with sliding doors, hanging space and drawers. Can be discussed as a made-to-size piece.",
    material: "Wood finish",
    images: [{ src: wardrobe, alt: "Walnut sliding-door wardrobe partly open" }],
    featured: true,
  },
  {
    slug: "six-seater-dining-set",
    name: "Six-Seater Dining Set",
    category: "dining-room",
    description:
      "A solid rectangular dining table with six upholstered chairs, sized for family meals and guests.",
    material: "Wood table, upholstered chairs",
    images: [{ src: dining, alt: "Six-seater walnut dining table with cream chairs" }],
    featured: true,
  },
  {
    slug: "executive-office-desk",
    name: "Executive Office Desk",
    category: "office-furniture",
    description:
      "A substantial wooden desk with drawer storage, for home offices, cabins and consulting rooms.",
    material: "Wood finish",
    images: [{ src: office, alt: "Walnut executive desk with drawers" }],
  },
  {
    slug: "ergonomic-office-chair",
    name: "Ergonomic Office Chair",
    category: "office-furniture",
    description:
      "A high-back mesh chair with headrest, adjustable arms and a padded seat for long working days.",
    material: "Mesh back, padded seat, metal base",
    images: [{ src: officeChair, alt: "Charcoal ergonomic mesh office chair with headrest" }],
  },
  {
    slug: "quilted-comfort-mattress",
    name: "Quilted Comfort Mattress",
    category: "mattresses",
    description:
      "A quilted mattress with a soft top layer. Visit the showroom to compare firmness options in person.",
    images: [{ src: mattress, alt: "Quilted cream mattress on a wooden bed base" }],
  },
  {
    slug: "fluted-tv-unit",
    name: "Fluted TV Unit",
    category: "other-collections",
    description:
      "A low, wide TV unit with fluted doors and open shelves for books, speakers and decor.",
    material: "Wood finish",
    images: [
      { src: tvUnit, alt: "Fluted walnut TV unit with open shelves" },
      { src: showroom, alt: "Showroom furniture arrangement" },
    ],
    featured: true,
  },
];

/*
 * Electronics: add confirmed items here with the electronics category slug, e.g.
 * { slug: "brand-model-43-tv", name: "…", category: "televisions", brand: "…", modelNumber: "…",
 *   specs: [{ label: "Screen", value: "43 inch" }], warranty: "…", description: "…",
 *   images: [{ src: actualPhoto, alt: "…" }] }
 * Use the real product photo — never a generic image for a specific model.
 */

products.push(...electronicsProducts);

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const featuredProducts = products.filter((p) => p.featured);

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

/** Never fabricate a price: unknown prices read "Request Price". */
export function formatPrice(price?: number): string {
  return typeof price === "number" && price > 0 ? inr.format(price) : "Request Price";
}
