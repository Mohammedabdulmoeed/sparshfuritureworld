import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { GalleryGrid } from "@/components/site/GalleryGrid";
import { pageHead } from "@/lib/seo";
import hero from "@/assets/cat-bedroom.jpg";

export const Route = createFileRoute("/gallery")({
  head: (ctx) =>
    pageHead(ctx, {
      title: "Gallery",
      description: "Explore furniture, electronics, home appliances, kitchen appliances and entertainment imagery at Sparsh Furniture World, Adilabad.",
      path: "/gallery",
    }),
  component: GalleryPage,
});

function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        lines={["Rooms worth", "coming home to."]}
        intro="Furniture, electronics and appliances for a considered home. Electronics photographs illustrate categories, not specific models or stock."
        image={hero}
        alt="Bedroom with a walnut bed and brass lamps"
      />
      <section className="py-16 md:py-24">
        <div className="container-editorial">
          <GalleryGrid />
        </div>
      </section>
    </>
  );
}
