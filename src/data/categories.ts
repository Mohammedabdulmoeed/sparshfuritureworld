import living from "@/assets/cat-living.jpg";
import bedroom from "@/assets/cat-bedroom.jpg";
import dining from "@/assets/cat-dining.jpg";
import wardrobe from "@/assets/cat-wardrobe.jpg";
import office from "@/assets/cat-office.jpg";
import mattress from "@/assets/cat-mattress.jpg";
import tvunit from "@/assets/p-tvunit.jpg";
import elEntertainment from "@/assets/el-entertainment.jpg";
import elKitchen from "@/assets/el-kitchen.jpg";
import elDevices from "@/assets/el-devices.jpg";
import elHome from "@/assets/el-home-appliances.jpg";
import elAudio from "@/assets/el-audio.jpg";
import elSmart from "@/assets/el-smart-home.jpg";
import elCooling from "@/assets/el-cooling.jpg";
import elRefrigeration from "@/assets/el-refrigeration.jpg";
import elLaundry from "@/assets/el-laundry.jpg";

export type Department = "furniture" | "electronics";

export const departments: { slug: Department; name: string }[] = [
  { slug: "furniture", name: "Furniture" },
  { slug: "electronics", name: "Electronics" },
];

export type Category = {
  slug: string;
  department: Department;
  name: string;
  label: string;
  image: string;
  alt: string;
  description: string;
  highlights: [string, string, string];
  categorySlugs?: string[];
};

/** Edit to match the showroom's actual inventory. */
export const categories: Category[] = [
  {
    slug: "living-room",
    department: "furniture",
    name: "Living Room",
    label: "Sofas · Armchairs · Tables",
    image: living,
    alt: "Cream sectional sofa with walnut side tables in a warm living room",
    description:
      "Sofas, sectionals, accent chairs and tables for the room where everyone gathers.",
    highlights: ["Sofas & sectionals", "Accent chairs", "Coffee & side tables"],
  },
  {
    slug: "bedroom",
    department: "furniture",
    name: "Bedroom",
    label: "Beds · Bedside · Dressers",
    image: bedroom,
    alt: "Walnut bed with cream linen bedding and brass bedside lamps",
    description: "Beds and bedside pieces chosen for calm, comfortable rest.",
    highlights: ["Queen & king beds", "Bedside tables", "Dressers"],
  },
  {
    slug: "dining-room",
    department: "furniture",
    name: "Dining Room",
    label: "Tables · Chairs · Sets",
    image: dining,
    alt: "Walnut dining table with cream upholstered chairs under a brass pendant",
    description: "Dining tables and chairs for everyday meals and festive gatherings.",
    highlights: ["Dining sets", "Dining chairs", "Sideboards"],
  },
  {
    slug: "wardrobes-storage",
    department: "furniture",
    name: "Wardrobes & Storage",
    label: "Wardrobes · Cabinets",
    image: wardrobe,
    alt: "Walnut sliding-door wardrobe with neatly hung clothes",
    description: "Wardrobes and storage that keep every room ordered and uncluttered.",
    highlights: ["Sliding & hinged wardrobes", "Cabinets", "Made-to-size options"],
  },
  {
    slug: "office-furniture",
    department: "furniture",
    name: "Office Furniture",
    label: "Desks · Chairs",
    image: office,
    alt: "Walnut executive desk with a black leather office chair",
    description: "Desks, chairs and storage for home offices and workplaces.",
    highlights: ["Executive desks", "Ergonomic chairs", "Commercial orders"],
  },
  {
    slug: "mattresses",
    department: "furniture",
    name: "Mattresses",
    label: "Comfort · Support",
    image: mattress,
    alt: "Quilted cream mattress on a low walnut bed base",
    description: "Mattresses you can try in the showroom before you decide.",
    highlights: ["Multiple sizes", "Different firmness", "Try in store"],
  },
  {
    slug: "other-collections",
    department: "furniture",
    name: "Other Collections",
    label: "TV units · Accents",
    image: tvunit,
    alt: "Fluted walnut TV unit styled with books and ceramics",
    description: "TV units, shelving and accent pieces that complete a room.",
    highlights: ["TV units", "Shelving", "Accent pieces"],
  },
];

/**
 * Electronics categories. Images are illustrative category photos, not specific models.
 * Listing a category does not mean every item is in stock — add products in data/products.ts.
 */
const electronics: [slug: string, name: string, label: string, image: string, alt: string, description: string, highlights: [string, string, string]][] = [
  ["televisions", "Televisions & Smart TVs", "LED · Smart TVs", elEntertainment, "Illustrative flat-screen TV on a walnut console", "Televisions and smart TVs for living rooms and bedrooms.", ["LED TVs", "Smart TVs", "Ask for sizes"]],
  ["refrigerators", "Refrigerators", "Single · Double door", elKitchen, "Illustrative kitchen with a refrigerator", "Refrigerators for homes of every size.", ["Single door", "Double door", "Side-by-side"]],
  ["washing-machines", "Washing Machines", "Front · Top load", elHome, "Illustrative front-load washing machine in a laundry room", "Washing machines for everyday laundry.", ["Front load", "Top load", "Semi-automatic"]],
  ["air-conditioners", "Air Conditioners", "Split · Window", elHome, "Illustrative wall-mounted split air conditioner", "Air conditioners to keep rooms cool through summer.", ["Split ACs", "Window ACs", "Ask for capacity"]],
  ["water-heaters-air-coolers", "Water Heaters & Air Coolers", "Geysers · Coolers", elHome, "Illustrative home appliances in a calm room", "Water heaters and air coolers for every season.", ["Water heaters", "Air coolers", "Ask for capacity"]],
  ["microwave-ovens", "Microwave Ovens", "Solo · Convection", elKitchen, "Illustrative built-in microwave in a kitchen", "Microwave ovens for reheating, grilling and baking.", ["Solo", "Grill", "Convection"]],
  ["kitchen-chimneys", "Kitchen Chimneys", "Wall-mounted · Island", elKitchen, "Illustrative stainless kitchen chimney above a stove", "Kitchen chimneys to keep cooking smoke out of the home.", ["Wall-mounted", "Auto-clean", "Ask for sizes"]],
  ["gas-stoves", "Gas Stoves", "Burners · Hobs", elKitchen, "Illustrative gas stove in a warm kitchen", "Gas stoves and hobs for daily cooking.", ["2-burner", "3-burner", "Hobs"]],
  ["mixer-grinders", "Mixer Grinders", "Mixers · Juicers", elKitchen, "Illustrative kitchen counter", "Mixer grinders and kitchen small appliances.", ["Mixer grinders", "Juicers", "Ask for models"]],
  ["laptops-computers", "Laptops & Computers", "Laptops · Desktops", elDevices, "Illustrative laptop on a walnut desk", "Laptops and computers for study, work and home.", ["Laptops", "Desktops", "Accessories"]],
  // ["tablets-smartphones", "Tablets & Smartphones", "Phones · Tablets", elDevices, "Illustrative smartphone on a walnut desk", "Smartphones and tablets.", ["Smartphones", "Tablets", "Accessories"]],
  ["earbuds-headphones", "Earbuds & Headphones", "Wireless · Wired", elAudio, "Illustrative over-ear headphones on a sideboard", "Earbuds and headphones for music and calls.", ["Wireless earbuds", "Headphones", "Neckbands"]],
 
  ["cameras", "Cameras", "Digital · Mirrorless", elAudio, "Illustrative camera on a walnut sideboard", "Cameras for photos and video.", ["Digital cameras", "Lenses", "Accessories"]],
  ["speakers-home-theatre", "Bluetooth Speakers & Home Theatre", "Speakers · Soundbars", elAudio, "Illustrative bluetooth speaker on a sideboard", "Bluetooth speakers, soundbars and home theatre systems.", ["Bluetooth speakers", "Soundbars", "Home theatre"]],
  ["projectors", "Projectors", "Home · Portable", elAudio, "Illustrative compact projector on a sideboard", "Projectors for home cinema and presentations.", ["Home projectors", "Portable", "Screens"]],
 
  

];

categories.push(
  ...electronics.map(([slug, name, label, image, alt, description, highlights]): Category => ({
    slug, department: "electronics", name, label, image, alt, description, highlights,
  })),
);

export const categoriesIn = (d: Department) => categories.filter((c) => c.department === d);
export const getDepartment = (s: string) => departments.find((d) => d.slug === s);

/** Editorial collections group existing catalogue categories without duplicating inventory. */
export const electronicsCollections: Category[] = [
  { slug: "televisions-entertainment", department: "electronics", name: "Televisions & Entertainment", label: "Smart TVs · Soundbars · Cinema", image: elEntertainment, alt: "Illustrative television and soundbar on a walnut console", description: "Explore televisions, soundbars and home theatre systems.", highlights: ["Smart TVs", "Soundbars", "Home theatre"], categorySlugs: ["televisions", "speakers-home-theatre", "projectors", "set-top-boxes-accessories"] },
  { slug: "cooling-climate", department: "electronics", name: "Cooling & Climate", label: "Air conditioning · Coolers", image: elCooling, alt: "Illustrative split air conditioner and standing fan in an ivory room", description: "Enquire about cooling options for your home.", highlights: ["Air conditioners", "Air coolers", "Cooling enquiries"], categorySlugs: ["air-conditioners", "water-heaters-air-coolers"] },
  { slug: "refrigeration", department: "electronics", name: "Refrigeration", label: "Refrigerators · Cooling", image: elRefrigeration, alt: "Illustrative stainless steel refrigerator in a walnut kitchen", description: "Explore refrigeration options and ask about available models.", highlights: ["Refrigerators", "Home refrigeration", "Model enquiries"], categorySlugs: ["refrigerators"] },
  { slug: "laundry-home-care", department: "electronics", name: "Laundry & Home Care", label: "Washing · Everyday care", image: elLaundry, alt: "Illustrative front-load washing machine beneath walnut shelves", description: "Washing machines for everyday home care.", highlights: ["Front load", "Top load", "Laundry enquiries"], categorySlugs: ["washing-machines"] },
  { slug: "kitchen-appliances", department: "electronics", name: "Kitchen Appliances", label: "Cooking · Mixing · Extraction", image: elKitchen, alt: "Illustrative kitchen appliances in a walnut kitchen", description: "Explore microwave ovens, mixer grinders, chimneys and gas stoves.", highlights: ["Microwaves", "Mixer grinders", "Chimneys & stoves"], categorySlugs: ["microwave-ovens", "mixer-grinders", "kitchen-chimneys", "gas-stoves"] },
  { slug: "personal-electronics", department: "electronics", name: "Personal Electronics", label: "Work · Connect · Explore", image: elDevices, alt: "Illustrative laptop, phone and smartwatch on a desk", description: "Laptops, tablets, smartphones and smartwatches for everyday life.", highlights: ["Laptops", "Phones & tablets", "Smartwatches"], categorySlugs: ["laptops-computers", "tablets-smartphones", "smartwatches", "cameras"] },
  { slug: "audio-accessories", department: "electronics", name: "Audio & Accessories", label: "Speakers · Earbuds · Headphones", image: elAudio, alt: "Illustrative headphones and speaker on a walnut sideboard", description: "Explore speakers, earbuds and headphones.", highlights: ["Speakers", "Earbuds", "Headphones"], categorySlugs: ["speakers-home-theatre", "earbuds-headphones"] },
  
];

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug) ?? electronicsCollections.find((c) => c.slug === slug);
