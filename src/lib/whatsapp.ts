import { siteConfig } from "@/data/siteConfig";

/** Official WhatsApp click-to-chat link with a correctly encoded prefilled message. */
export function whatsappUrl(message?: string, number: string = siteConfig.whatsappE164): string {
  const digits = number.replace(/\D/g, "");
  const base = `https://wa.me/${digits}`;
  const text = message?.trim();
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export function productEnquiryMessage(productName: string, category?: string, demonstration?: boolean): string {
  if (demonstration) return `Hello ${siteConfig.name}, I'm viewing the demonstration ${productName}${category ? ` in ${category}` : ""}. Which actual products of this type are available, and at what price?`;
  if (category) return `Hello ${siteConfig.name}, I'm interested in the ${productName} in ${category}. Could you share the price and availability?`;
  return `Hello ${siteConfig.name}, I'm interested in the ${productName}. Could you share the price and availability?`;
}

export const generalEnquiryMessage = `Hello ${siteConfig.name}, I'd like to know more about your furniture.`;

export const electronicsEnquiryMessage = `Hello ${siteConfig.name}, I'd like to know which electronics and appliances you currently have.`;

export function categoryEnquiryMessage(categoryName: string): string {
  return `Hello ${siteConfig.name}, I'd like to know what you currently have in ${categoryName}, with prices.`;
}
