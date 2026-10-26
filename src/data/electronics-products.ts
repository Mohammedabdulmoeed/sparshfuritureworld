import entries from "./electronics.entries.json";
import type { Product } from "./products";
import { verifiedElectronicsPhotos } from "./electronics-photos";

/** Explicit editable demo records; never seeded on page load or claimed as inventory. */
export const electronicsProducts: Product[] = entries.map(({ asset: _removedSyntheticAsset, ...entry }) => {
  const photo = verifiedElectronicsPhotos[entry.slug];
  return {
    ...entry,
    department: "electronics",
    description: `Demonstration entry for a ${entry.name.toLowerCase()}. This is not a confirmed showroom model or inventory listing. Enquire about actual ${entry.subcategory.toLowerCase()} options, prices and availability.`,
    photoStatus: photo ? "verified" : "manual-replacement",
    ...(photo ? { photoCredit: photo } : {}),
    images: [{ src: photo?.src ?? "", alt: photo?.alt ?? `${entry.name}: genuine product photo required` }],
  };
});