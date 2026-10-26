import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/Reveal";
import { ctaVariants } from "@/components/site/cta";
import { offers } from "@/data/content";
import { siteConfig } from "@/data/siteConfig";
import { whatsappUrl } from "@/lib/whatsapp";
import { pageHead } from "@/lib/seo";
import hero from "@/assets/p-tvunit.jpg";

export const Route = createFileRoute("/offers")({
  head: (ctx) =>
    pageHead(ctx, {
      title: "Offers",
      description: "Current promotions at Sparsh Furniture World, Adilabad. Ask us on WhatsApp about seasonal offers.",
      path: "/offers",
    }),
  component: OffersPage,
});

const dateFmt = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric" });
const askMessage = `Hello ${siteConfig.name}, are there any offers running at the moment?`;

function OffersPage() {
  const [featured, ...others] = offers;
  return (
    <>
      <PageHero
        eyebrow="Offers"
        lines={["Seasonal", "offers."]}
        intro="Promotions are listed here only once they're confirmed."
        image={hero}
        alt="Fluted walnut TV unit in a living room"
      />

      {offers.length === 0 ? (
        <section className="py-24 md:py-36">
          <div className="container-editorial grid gap-12 md:grid-cols-12">
            <Reveal className="md:col-span-7">
              <p className="eyebrow mb-6 text-walnut">Right now</p>
              <h2 className="display-lg">
                No offers listed
                <br />
                <span className="italic text-walnut">at the moment.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1} className="md:col-span-4 md:col-start-9 md:self-end">
              <p className="lede text-muted-foreground">
                Offers change through the year, especially around festivals. Message us to ask what's available today.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={whatsappUrl(askMessage)} target="_blank" rel="noopener noreferrer" className={ctaVariants({ variant: "primary" })}>
                  <MessageCircle /> Ask about offers
                </a>
                <Link to="/products" className={ctaVariants({ variant: "outline" })}>
                  Browse products
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      ) : (
        <section className="py-24 md:py-32">
          <div className="container-editorial">
            {featured && (
              <Reveal className="grid gap-10 border-b border-border pb-16 md:grid-cols-12">
                {featured.image && <img src={featured.image} alt="" className="aspect-[4/3] w-full object-cover md:col-span-7" />}
                <div className="md:col-span-5">
                  <p className="eyebrow mb-4 text-walnut">Featured offer</p>
                  <h2 className="display-md">{featured.title}</h2>
                  <p className="lede mt-5 text-muted-foreground">{featured.description}</p>
                  {featured.validUntil && <p className="mt-4 text-sm">Valid until {dateFmt.format(new Date(featured.validUntil))}</p>}
                  <a href={whatsappUrl(`Hello, I'd like to know more about the offer: ${featured.title}`)} target="_blank" rel="noopener noreferrer" className={`${ctaVariants({ variant: "primary" })} mt-8`}>
                    Enquire <ArrowRight />
                  </a>
                </div>
              </Reveal>
            )}
            <RevealGroup className="mt-16 grid gap-6 md:grid-cols-2">
              {others.map((o) => (
                <RevealItem key={o.title} className="border border-border p-8">
                  <h3 className="font-display text-3xl">{o.title}</h3>
                  <p className="mt-3 text-muted-foreground">{o.description}</p>
                  {o.validUntil && <p className="mt-3 text-sm">Valid until {dateFmt.format(new Date(o.validUntil))}</p>}
                  <a href={whatsappUrl(`Hello, I'd like to know more about the offer: ${o.title}`)} target="_blank" rel="noopener noreferrer" className={`${ctaVariants({ variant: "text", size: "none" })} mt-6`}>
                    <span className="link-line">Enquire</span> <ArrowRight />
                  </a>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}
    </>
  );
}
