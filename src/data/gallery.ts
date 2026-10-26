import hero from "@/assets/hero-living.jpg";
import showroom from "@/assets/showroom.jpg";
import living from "@/assets/cat-living.jpg";
import bedroom from "@/assets/cat-bedroom.jpg";
import dining from "@/assets/cat-dining.jpg";
import wardrobe from "@/assets/cat-wardrobe.jpg";
import office from "@/assets/cat-office.jpg";
import mattress from "@/assets/cat-mattress.jpg";
import craft from "@/assets/craft.jpg";
import armchair from "@/assets/p-armchair.jpg";
import bed from "@/assets/p-bed.jpg";
import tvunit from "@/assets/p-tvunit.jpg";
import coffee from "@/assets/p-coffeetable.jpg";
import sofa from "@/assets/p-sofa.jpg";
import entertainment from "@/assets/el-entertainment.jpg";
import cooling from "@/assets/el-cooling.jpg";
import refrigeration from "@/assets/el-refrigeration.jpg";
import laundry from "@/assets/el-laundry.jpg";
import kitchen from "@/assets/el-kitchen.jpg";
import devices from "@/assets/el-devices.jpg";
import audio from "@/assets/el-audio.jpg";
import smart from "@/assets/el-smart-home.jpg";

export type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
  tag: GalleryTag;
  shape: "portrait" | "landscape" | "square";
  category?: string;
};

export const galleryTags = ["Furniture", "Electronics", "Home Appliances", "Kitchen Appliances", "Entertainment", "Living", "Bedroom", "Dining", "Storage", "Office", "Craft"] as const;
export type GalleryTag = (typeof galleryTags)[number];

/** Replace with real showroom photographs when available — keep alt text descriptive. */
export const gallery: GalleryItem[] = [
  { src: hero, alt: "Warm living room with cream sofa and walnut panelling", caption: "Living room in walnut and linen", tag: "Living", shape: "landscape" },
  { src: living, alt: "Cream sectional sofa with round walnut coffee table", caption: "Sectional sofa, soft textures", tag: "Living", shape: "portrait" },
  { src: bedroom, alt: "Walnut bed with brass bedside lamps", caption: "A calm bedroom setting", tag: "Bedroom", shape: "landscape" },
  { src: craft, alt: "Carpenter planing a wooden plank", caption: "Custom work starts with the wood", tag: "Craft", shape: "portrait" },
  { src: dining, alt: "Six-seater dining table under a brass pendant", caption: "Dining for six", tag: "Dining", shape: "landscape" },
  { src: armchair, alt: "Cane-back accent armchair", caption: "Cane-back armchair", tag: "Living", shape: "portrait" },
  { src: wardrobe, alt: "Sliding-door walnut wardrobe", caption: "Sliding wardrobe with drawers", tag: "Storage", shape: "portrait" },
  { src: office, alt: "Executive desk and leather chair", caption: "Executive study", tag: "Office", shape: "landscape" },
  { src: mattress, alt: "Quilted mattress on a wooden base", caption: "Quilted mattress", tag: "Bedroom", shape: "square" },
  { src: showroom, alt: "Showroom floor with sofas and dining sets", caption: "On the showroom floor", tag: "Living", shape: "portrait" },
  { src: tvunit, alt: "Fluted TV unit", caption: "Fluted TV unit", tag: "Storage", shape: "portrait" },
  { src: bed, alt: "Bed with tall channel-tufted headboard", caption: "Upholstered panel bed", tag: "Bedroom", shape: "portrait" },
  { src: coffee, alt: "Round pedestal coffee table", caption: "Pedestal coffee table", tag: "Living", shape: "portrait" },
  { src: sofa, alt: "Three-seater taupe sofa", caption: "Three-seater sofa", tag: "Living", shape: "portrait" },
];

gallery.push(
  { src: entertainment, alt: "Illustrative television with a soundbar on a walnut console", caption: "Televisions & soundbars — illustrative", tag: "Entertainment", shape: "landscape", category: "televisions-entertainment" },
  { src: cooling, alt: "Illustrative split air conditioner and standing fan", caption: "Cooling & climate — illustrative", tag: "Home Appliances", shape: "portrait", category: "cooling-climate" },
  { src: refrigeration, alt: "Illustrative stainless steel refrigerator in a walnut kitchen", caption: "Refrigeration — illustrative", tag: "Home Appliances", shape: "portrait", category: "refrigeration" },
  { src: laundry, alt: "Illustrative front-load washing machine beneath walnut shelves", caption: "Laundry & home care — illustrative", tag: "Home Appliances", shape: "portrait", category: "laundry-home-care" },
  { src: kitchen, alt: "Illustrative kitchen with cooking appliances and extractor hood", caption: "Kitchen appliances — illustrative", tag: "Kitchen Appliances", shape: "landscape", category: "kitchen-appliances" },
  { src: devices, alt: "Illustrative laptop, smartphone and smartwatch on a walnut desk", caption: "Personal electronics — illustrative", tag: "Electronics", shape: "landscape", category: "personal-electronics" },
  { src: audio, alt: "Illustrative speaker, headphones, camera and compact projector", caption: "Audio & entertainment — illustrative", tag: "Entertainment", shape: "portrait", category: "audio-accessories" },

);

export function filterGallery(filter: GalleryTag | "All") {
  return gallery.filter((item) => filter === "All" || (filter === "Furniture" ? !item.category : filter === "Electronics" ? Boolean(item.category) : item.tag === filter));
}
