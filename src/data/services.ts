import showroom from "@/assets/showroom.jpg";
import craft from "@/assets/craft.jpg";
import office from "@/assets/cat-office.jpg";
import delivery from "@/assets/delivery.jpg";
import appliances from "@/assets/el-laundry.jpg";
import entertainment from "@/assets/el-entertainment.jpg";
import kitchen from "@/assets/el-kitchen.jpg";

export type Service = {
  slug: string;
  title: string;
  label: string;
  image: string;
  alt: string;
  summary: string;
  body: string;
  highlights: [string, string, string];
  enquiryType: string;
};

/** Only confirmed services. Do not add promises (timelines, warranties) unless confirmed. */
export const services: Service[] = [
  {
    slug: "selection-assistance",
    title: "Help Choosing Furniture",
    label: "In the showroom",
    image: showroom,
    alt: "Furniture showroom with sofas, armchairs and a dining set",
    summary: "Talk us through your room and we'll help you narrow down the right pieces.",
    body: "Bring your room sizes, a few photos or simply an idea of how you live. We'll walk you through pieces that suit the space, the people using it and your budget — so you can see, sit and compare before you decide.",
    highlights: ["Room-by-room suggestions", "Compare pieces in person", "Bring photos or sizes"],
    enquiryType: "Help choosing furniture",
  },
  {
    slug: "custom-furniture",
    title: "Custom-Made Furniture",
    label: "Made to your needs",
    image: craft,
    alt: "Carpenter hand-planing a walnut plank in a workshop",
    summary: "When the right piece doesn't exist yet, we can discuss making it for you.",
    body: "Need a wardrobe that fits an awkward wall, a dining table for a larger family or a finish that matches existing furniture? Share your requirement and we'll discuss sizes, materials and what's possible, with a quote before anything is made.",
    highlights: ["Made-to-size pieces", "Choice of finishes", "Quote before making"],
    enquiryType: "Custom-made furniture",
  },
  {
    slug: "office-commercial",
    title: "Office & Commercial Furniture",
    label: "For workplaces",
    image: office,
    alt: "Walnut executive desk with a leather office chair",
    summary: "Desks, chairs and storage for offices, clinics, shops and institutions.",
    body: "From a single cabin to a full office, we supply desks, seating and storage for workplaces. Tell us the number of people, the kind of work and the space available, and we'll put together suitable options.",
    highlights: ["Desks & workstations", "Office seating", "Bulk enquiries welcome"],
    enquiryType: "Office / commercial furniture",
  },
  {
    slug: "delivery",
    title: "Delivery",
    label: "To your door",
    image: delivery,
    alt: "Two delivery staff carrying a wrapped sofa into a home",
    summary: "We arrange delivery of your furniture to your home or office.",
    body: "Once you've chosen your furniture, we arrange for it to be brought to your home or workplace. Delivery area, timing and any charges are confirmed with you at the time of your order.",
    highlights: ["Home & office delivery", "Careful handling", "Details confirmed at order"],
    enquiryType: "Delivery",
  },
];

/** Enquiry assistance only; no unconfirmed electronics fulfilment or warranty promises. */
export const electronicsServices: Service[] = [
  { slug: "appliance-selection", title: "Home Appliance Selection", label: "Everyday comfort", image: appliances, alt: "Illustrative washing machine in a refined utility room", summary: "Discuss refrigerators, washing machines and cooling appliances for your home.", body: "Tell us about your space and the appliances you're considering. Contact us to discuss suitable options, available models and current prices before you decide.", highlights: ["Home appliance enquiries", "Space & usage requirements", "Price & availability enquiries"], enquiryType: "Home appliance selection" },
  { slug: "entertainment-enquiries", title: "Television & Entertainment Enquiries", label: "At home, together", image: entertainment, alt: "Illustrative television and soundbar on a walnut console", summary: "Enquire about televisions, soundbars, speakers and home entertainment.", body: "Share what you're looking for in your television or entertainment setup. Ask us about available products and confirmed model details through phone or WhatsApp.", highlights: ["TV & soundbar enquiries", "Audio product enquiries", "Confirmed product details"], enquiryType: "Television & entertainment enquiry" },
  { slug: "kitchen-enquiries", title: "Kitchen Appliance Enquiries", label: "For the everyday kitchen", image: kitchen, alt: "Illustrative appliances in a walnut kitchen", summary: "Ask about microwave ovens, mixer grinders, kitchen chimneys and gas stoves.", body: "Discuss the kitchen appliances you're considering and ask for current availability and pricing. We confirm the details of each product in response to your enquiry.", highlights: ["Cooking appliance enquiries", "Kitchen requirements", "Phone & WhatsApp assistance"], enquiryType: "Kitchen appliance enquiry" },
];

export const enquiryTypes = [
  "General enquiry",
  "Product price & availability",
  ...services.map((s) => s.enquiryType),
  ...electronicsServices.map((s) => s.enquiryType),
] as const;
