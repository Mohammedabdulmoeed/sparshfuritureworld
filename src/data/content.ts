import { siteConfig } from "./siteConfig";

export type Offer = {
  title: string;
  description: string;
  validUntil?: string; // ISO date, optional
  image?: string;
};

/** Only add confirmed promotions. Empty list shows a "no current offers" message. */
export const offers: Offer[] = [];

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "Where is the Sparsh Furniture World showroom?",
    a: `We're at ${siteConfig.address.street}, ${siteConfig.address.city}, ${siteConfig.address.region} ${siteConfig.address.postalCode}. The Contact page has a map and directions.`,
  },
  {
    q: "How do I find out the price of a piece?",
    a: "Prices depend on size, finish and current stock, so we share them on request. Tap “Enquire on WhatsApp” on any product, call us, or send the enquiry form and we'll reply with the price and availability.",
  },
  {
    q: "Is everything on the website in stock?",
    a: "The website shows the kinds of furniture we carry. Stock changes often, so message us before visiting if you're coming for a particular piece.",
  },
  {
    q: "Can you make furniture to my size or design?",
    a: "Yes, we offer custom-made furniture. Share your measurements, photos or idea and we'll discuss materials, finishes and a quote before anything is made.",
  },
  {
    q: "Do you deliver?",
    a: "Yes, we arrange delivery to your home or office. The delivery area, timing and any charges are confirmed with you when you place the order.",
  },
  {
    q: "Do you supply furniture for offices and businesses?",
    a: "Yes. We supply desks, chairs and storage for offices, clinics, shops and other workplaces, including larger orders.",
  },
  {
    q: "Can I see and try the furniture before buying?",
    a: "Please do. Visiting the showroom is the best way to compare comfort, sizes and finishes — especially for sofas and mattresses.",
  },
  {
    q: "What are your opening hours?",
    a: `Please call or WhatsApp us on ${siteConfig.phoneDisplay} to confirm timings before you visit.`,
  },
];
