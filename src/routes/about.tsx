import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { EditorialImageTextSection } from "@/components/site/EditorialImageTextSection";
import { Reveal, RevealGroup, RevealItem, WordReveal } from "@/components/site/Reveal";
import { ctaVariants } from "@/components/site/cta";
import { siteConfig } from "@/data/siteConfig";
import { pageHead } from "@/lib/seo";
import hero from "@/assets/showroom.jpg";
import living from "@/assets/cat-living.jpg";
import craft from "@/assets/craft.jpg";
import electronics from "@/assets/el-entertainment.jpg";
import { CategoryTile } from "@/components/site/CategoryGrid";
import { getCategory } from "@/data/categories";
import { SectionHeading } from "@/components/site/SectionHeading";

export const Route = createFileRoute("/about")({
  head: (ctx) =>
    pageHead(ctx, {
      title: "About Us",
      description:
        "Sparsh Furniture World brings furniture, electronics and home appliances together in Adilabad, with personal assistance and product enquiries.",
      path: "/about",
    }),
  component: AboutPage,
});

const commitments = [
  { t: "Real pieces, in person", d: "What you choose is what you've seen, touched and sat on in our showroom." },
  { t: "Prices on request, clearly", d: "Ask about any piece and we'll tell you its price and current availability." },
  { t: "Made-to-need options", d: "When a standard size won't do, we discuss custom-made pieces with a quote first." },
  { t: "Delivery arranged", d: "We arrange delivery to your home or office, with details confirmed at order." },
];

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        lines={["Designed around", "the way you live."]}
        intro={`${siteConfig.name} brings furniture, electronics and home appliances together under one roof in Adilabad.`}
        image={hero}
        alt="Warm furniture showroom interior"
      />

      <section className="py-24 md:py-36">
        <div className="container-editorial grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-3">
            <p className="eyebrow text-walnut">Our story</p>
          </Reveal>
          <div className="md:col-span-8">
            <WordReveal
              className="font-display text-[clamp(1.7rem,3vw,2.8rem)] leading-[1.2]"
              text="We started with a simple belief: furniture is something you live with for years, so you should be able to see it, try it and talk it through before it comes home."
            />
          </div>
        </div>
      </section>

      <EditorialImageTextSection
        index="01"
        eyebrow="Philosophy"
        title={<>Comfort first.<br /><span className="italic text-walnut">Beauty that lasts.</span></>}
        image={living}
        alt="Cream sectional sofa in a softly lit living room"
        tone="cream"
      >
        <p>
          A good sofa is one you sink into after a long day. A good wardrobe is one that actually fits your clothes and your wall.
          We choose pieces that look good, but we judge them by how they feel and work at home.
        </p>
        <p>Warm woods, honest fabrics and shapes that won't date quickly — furniture meant for everyday life.</p>
      </EditorialImageTextSection>

      <EditorialImageTextSection
        index="02"
        eyebrow="How we work"
        title={<>Listening before<br /><span className="italic text-walnut">recommending.</span></>}
        image={craft}
        alt="Carpenter working a wooden plank by hand"
        reverse
        actions={
          <Link to="/services" className={ctaVariants({ variant: "outline", size: "sm" })}>
            Our services <ArrowRight />
          </Link>
        }
      >
        <p>
          Every home and office is different. We ask about your space, the people who use it and your budget, then show you options
          that make sense — including made-to-size pieces when the room calls for it.
        </p>
      </EditorialImageTextSection>

      <section className="bg-cream py-24 md:py-36">
        <div className="container-editorial">
          <SectionHeading eyebrow="Furniture & electronics" title={<>Everything for a<br /><span className="italic text-walnut">more considered home.</span></>}
            intro="From thoughtfully chosen furniture to everyday electronics and home appliances, explore products designed to make your home more comfortable, functional and enjoyable." className="mb-14" />
          <RevealGroup className="grid gap-4 md:grid-cols-2">
            {([{ department: "furniture", name: "Furniture & Interiors", image: living, alt: "Illustrative cream sofa in a warm living room" }, { department: "electronics", name: "Electronics & Home Appliances", image: electronics, alt: "Illustrative television and soundbar on a walnut console" }] as const).map((area) => (
              <RevealItem key={area.department}>
                <Link to="/products" search={{ department: area.department }} className="group relative block aspect-[4/5] overflow-hidden bg-cream md:aspect-[4/3]">
                  <img src={area.image} alt={area.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.05]" />
                  <span className="image-bottom-overlay absolute inset-0" />
                  <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-7 text-on-dark"><span className="font-display text-3xl">{area.name}</span><span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-on-dark/50"><ArrowRight className="size-4" /></span></span>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="bg-espresso py-24 text-on-dark md:py-36">
        <div className="container-editorial">
          <Reveal>
            <p className="eyebrow mb-6 text-bronze">Our commitments</p>
            <h2 className="display-lg max-w-3xl">
              What you can <span className="italic text-bronze">expect from us.</span>
            </h2>
          </Reveal>
          <RevealGroup className="mt-16 grid border-t border-line-dark md:grid-cols-2">
            {commitments.map((c, i) => (
              <RevealItem key={c.t} className="border-b border-line-dark py-10 md:odd:border-r md:odd:pr-12 md:even:pl-12">
                <span className="font-display text-xl italic text-bronze">0{i + 1}</span>
                <h3 className="mt-3 font-display text-3xl">{c.t}</h3>
                <p className="lede mt-4 max-w-md text-on-dark-muted">{c.d}</p>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal className="mt-14 flex flex-wrap gap-3">
            <Link to="/contact" className={ctaVariants({ variant: "bronze" })}>
              Visit or enquire <ArrowRight />
            </Link>
            <Link to="/products" className={ctaVariants({ variant: "outline-light" })}>
              Browse products
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
