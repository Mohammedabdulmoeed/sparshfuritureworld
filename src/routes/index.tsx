import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { HeroSection } from "@/components/site/HeroSection";
import { CategoryGrid, ElectronicsGrid } from "@/components/site/CategoryGrid";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ProductCard } from "@/components/site/ProductCard";
import { FlipCard } from "@/components/site/FlipCard";
import { StickyStory } from "@/components/site/StickyStory";
import { MaskReveal, Reveal, RevealGroup, RevealItem, WordReveal, LineReveal } from "@/components/site/Reveal";
import { ParallaxImage } from "@/components/site/ParallaxImage";
import { ctaVariants } from "@/components/site/cta";
import { featuredProducts } from "@/data/products";
import { services } from "@/data/services";
import { siteConfig, fullAddress, mapsUrl } from "@/data/siteConfig";
import { whatsappUrl, generalEnquiryMessage } from "@/lib/whatsapp";
import { pageHead, localBusinessJsonLd, originFrom } from "@/lib/seo";
import showroom from "@/assets/showroom.jpg";
import bedroom from "@/assets/cat-bedroom.jpg";
import dining from "@/assets/cat-dining.jpg";

export const Route = createFileRoute("/")({
  head: (ctx) => ({
    ...pageHead(ctx, {
      title: "Furniture & Electronics Showroom in Adilabad",
      description:
        "Furniture, electronics and home appliances in Adilabad, Telangana. Explore sofas, beds, TVs, kitchen appliances and more at Sparsh Furniture World.",
      path: "/",
    }),
    scripts: [localBusinessJsonLd(originFrom(ctx))],
  }),
  component: HomePage,
});

function HomePage() {
  const [lead, ...rest] = featuredProducts;
  return (
    <>
      <HeroSection />

      {/* Intro statement */}
      <section id="intro" className="py-24 md:py-36">
        <div className="container-editorial grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-3">
            <p className="eyebrow flex items-center gap-4 text-walnut">
              <span className="font-display text-base normal-case italic tracking-normal">01</span>
              <span className="h-px w-10 bg-current opacity-60" aria-hidden />
              Welcome
            </p>
          </Reveal>
          <div className="md:col-span-9">
            <WordReveal
              className="font-display text-[clamp(1.9rem,3.6vw,3.4rem)] leading-[1.15]"
              text="From smart electronics to beautiful furniture, discover everything you need to make your home feel more comfortable, stylish, and complete."
            />
            <Reveal delay={0.2} className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-4">
              <Link to="/about" className={ctaVariants({ variant: "text", size: "none" })}>
                <span className="link-line">Our approach</span> <ArrowRight />
              </Link>
              <Link to="/services" className={ctaVariants({ variant: "text", size: "none" })}>
                <span className="link-line">What we offer</span> <ArrowRight />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="pb-24 md:pb-36" aria-labelledby="cat-title">
        <div className="container-editorial">
          <SectionHeading
            index="02"
            eyebrow="Shop by room"
            title={
              <span id="cat-title">
                Every room,
                <br />
                <span className="italic text-walnut">considered.</span>
              </span>
            }
            intro="Explore our furniture by the room it belongs to — from sofas and beds to wardrobes, desks and mattresses."
            action={
              <Link to="/categories" className={ctaVariants({ variant: "outline", size: "sm" })}>
                View all categories <ArrowRight />
              </Link>
            }
            className="mb-14"
          />
          <CategoryGrid />
        </div>
      </section>

      {/* Furniture & Electronics */}
      <section className="border-t border-border py-24 md:py-36" aria-labelledby="electronics-title">
        <div className="container-editorial">
          <SectionHeading index="03" eyebrow="Shop electronics"
            title={<span id="electronics-title">Technology for<br /><span className="italic text-walnut">everyday living.</span></span>}
            intro="Discover the electronics and home appliances that bring comfort, convenience and entertainment into every room."
            action={<Link to="/products" search={{ department: "electronics" }} className={ctaVariants({ variant: "outline", size: "sm" })}>Explore electronics <ArrowRight /></Link>}
            className="mb-14" />
          <ElectronicsGrid />
        </div>
      </section>

      {/* Featured products */}
      <section className="bg-cream py-24 md:py-36" aria-labelledby="featured-title">
        <div className="container-editorial">
          <SectionHeading
            index="04"
            eyebrow="From the showroom"
            title={
              <span id="featured-title">
                Pieces we
                <br />
                <span className="italic text-walnut">keep coming back to.</span>
              </span>
            }
            intro="A selection of styles from our floor. Stock and finishes change often — ask us for today's availability and price."
            action={
              <Link to="/products" className={ctaVariants({ variant: "primary", size: "sm" })}>
                View all products <ArrowRight />
              </Link>
            }
            className="mb-16"
          />
          <div className="grid gap-x-6 gap-y-14 md:grid-cols-12">
            {lead && (
              <Reveal className="md:col-span-6 md:row-span-2">
                <ProductCard product={lead} size="feature" />
              </Reveal>
            )}
            <RevealGroup className="grid gap-x-6 gap-y-14 sm:grid-cols-2 md:col-span-6">
              {rest.slice(0, 4).map((p) => (
                <RevealItem key={p.slug}>
                  <ProductCard product={p} />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* About brand — dark, asymmetric */}
      <section className="relative overflow-hidden bg-espresso py-24 text-on-dark md:py-40" aria-labelledby="about-title">
        <div className="container-editorial grid gap-14 md:grid-cols-12 md:gap-8">
          <div className="relative md:col-span-5">
            <MaskReveal>
              <ParallaxImage src={showroom} alt="Inside a warm furniture showroom with sofas and a dining set" className="aspect-[4/5]" />
            </MaskReveal>
            <MaskReveal className="absolute -bottom-10 -right-6 hidden w-1/2 border-8 border-espresso md:block lg:-right-16">
              <img src={bedroom} alt="Walnut bed with cream linen bedding" loading="lazy" className="aspect-square w-full object-cover" />
            </MaskReveal>
          </div>
          <div className="md:col-span-6 md:col-start-7 md:pt-16">
            <Reveal>
              <p className="eyebrow mb-6 flex items-center gap-4 text-bronze">
                <span className="font-display text-base normal-case italic tracking-normal">05</span>
                <span className="h-px w-10 bg-current opacity-60" aria-hidden />
                About Sparsh
              </p>
            </Reveal>
            <LineReveal
              id-hint="about"
              lines={["Designed around", "the way you live."]}
              className="display-lg [&>span:last-child]:italic [&>span:last-child]:text-bronze"
            />
            <Reveal delay={0.15} className="lede mt-10 max-w-xl space-y-5 text-on-dark-muted">
              <p>
                {siteConfig.name} is a furniture showroom in Adilabad. We bring together furniture for every part
                of the home and workplace, so families and businesses can choose in one place.
              </p>
              <p>
                We believe furniture should be tried before it is bought — sat on, opened, measured. So we keep
                things simple: show you real pieces, listen to how you'll use them, and help you decide.
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <ul className="mt-12 grid gap-px border-y border-line-dark sm:grid-cols-3">
                {["See it in person", "Custom options", "Delivery arranged"].map((t, i) => (
                  <li key={t} className="py-6 sm:pr-6">
                    <span className="font-display text-lg italic text-bronze">0{i + 1}</span>
                    <p className="mt-2 text-sm uppercase tracking-[0.16em]">{t}</p>
                  </li>
                ))}
              </ul>
              <Link to="/about" className={`${ctaVariants({ variant: "text-light", size: "none" })} mt-10`}>
                <span className="link-line">More about us</span> <ArrowRight />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <StickyStory />

      {/* Services — flip cards */}
      <section className="py-24 md:py-36" aria-labelledby="services-title">
        <div className="container-editorial">
          <SectionHeading
            index="06"
            eyebrow="Services"
            title={
              <span id="services-title">
                More than
                <br />
                <span className="italic text-walnut">a showroom.</span>
              </span>
            }
            intro="Hover, tap or press Enter on a card to see what's included."
            action={
              <Link to="/services" className={ctaVariants({ variant: "outline", size: "sm" })}>
                All services <ArrowRight />
              </Link>
            }
            className="mb-14"
          />
          <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <RevealItem key={s.slug} className={i % 2 === 1 ? "lg:translate-y-12" : ""}>
                <FlipCard
                  index={i}
                  title={s.title}
                  label={s.label}
                  image={s.image}
                  alt={s.alt}
                  description={s.summary}
                  highlights={s.highlights}
                  cta={{ label: "Enquire", to: "/contact", search: { type: s.enquiryType } }}
                />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Visit band */}
      <section className="relative overflow-hidden text-on-dark" aria-labelledby="visit-title">
        <ParallaxImage src={dining} alt="Walnut dining table under a warm brass pendant light" className="absolute inset-0 h-full" strength={10} />
        <div className="hero-overlay absolute inset-0" />
        <div className="container-editorial relative grid gap-12 py-28 md:grid-cols-12 md:py-44">
          <div className="md:col-span-7">
            <Reveal>
              <p className="eyebrow mb-6 text-bronze">Visit us</p>
            </Reveal>
            <LineReveal lines={["See it, sit on it,", "then decide."]} className="display-lg" />
          </div>
          <Reveal delay={0.15} className="md:col-span-4 md:col-start-9 md:self-end">
            <address className="lede not-italic text-on-dark-muted">{fullAddress}</address>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className={ctaVariants({ variant: "light", size: "sm" })}>
                Directions <ArrowUpRight />
              </a>
              <a href={whatsappUrl(generalEnquiryMessage)} target="_blank" rel="noopener noreferrer" className={ctaVariants({ variant: "outline-light", size: "sm" })}>
                WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
