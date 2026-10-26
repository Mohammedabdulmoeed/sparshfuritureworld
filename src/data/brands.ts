/**
 * Brand profiles. Sparsh Furniture World is the site identity (see siteConfig).
 * Lavya Industries is a separate brand: its details stay null — and nothing is shown —
 * until confirmed branding and business information is provided.
 */
export type BrandProfile = {
  id: string;
  name: string;
  logo: string | null;
  phone: string | null;
  address: string | null;
  website: string | null;
  description: string | null;
  confirmed: boolean;
};

export const brands: BrandProfile[] = [
  { id: "lavya-industries", name: "Lavya Industries", logo: null, phone: null, address: null, website: null, description: null, confirmed: false },
];

export const confirmedBrands = brands.filter((b) => b.confirmed);
