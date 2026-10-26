/**
 * Single source of truth for business contact details.
 * Edit here — every page, link and structured-data block reads from this file.
 * Leave a field as null to hide it everywhere until it is confirmed.
 */
export const siteConfig = {
  name: "Sparsh Furniture World",
  shortName: "Sparsh",
  tagline: "Furniture for every room, in Adilabad",
  description:
    "Sparsh Furniture World is a furniture showroom in Adilabad, Telangana — living room, bedroom, dining, storage, office furniture and mattresses, with custom-made options and delivery.",
  /** Display format */
  phoneDisplay: "+91 94404 06508",
  /** E.164 without "+" — used for tel: and wa.me links */
  phoneE164: "919440406508",
  whatsappE164: "919440406508",
  email: "Sparshfurnitureworld81@gmail.com",
  /** Not confirmed yet — set e.g. "Mon–Sat, 10:00 am – 9:00 pm" to show it. */
  openingHours: null as string | null,
  address: {
    street: "Dasnapur, Sapthagiri Colony, Dhobi Colony",
    city: "Adilabad",
    region: "Telangana",
    postalCode: "504001",
    country: "India",
    countryCode: "IN",
  },
  /** Add confirmed social profile URLs here; empty means none are shown. */
  social: [] as { label: string; href: string }[],
} as const;

export const fullAddress = `${siteConfig.address.street}, ${siteConfig.address.city}, ${siteConfig.address.region} ${siteConfig.address.postalCode}, ${siteConfig.address.country}`;

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${siteConfig.name}, ${fullAddress}`,
)}`;

export const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  `${siteConfig.name}, ${fullAddress}`,
)}&output=embed`;

export const telHref = `tel:+${siteConfig.phoneE164}`;
export const mailHref = `mailto:${siteConfig.email}`;
