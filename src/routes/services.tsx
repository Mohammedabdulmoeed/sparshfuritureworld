import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { EditorialImageTextSection } from "@/components/site/EditorialImageTextSection";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/Reveal";
import { ctaVariants } from "@/components/site/cta";
import { services, electronicsServices } from "@/data/services";
import { FlipCard } from "@/components/site/FlipCard";
import { SectionHeading } from "@/components/site/SectionHeading";
import { whatsappUrl } from "@/lib/whatsapp";
import { siteConfig } from "@/data/siteConfig";
import { pageHead } from "@/lib/seo";
import hero from "@/assets/craft.jpg";

export const Route = createFileRoute("/services")({
  head: (ctx) =>
    pageHead(ctx, {
      title: "Services",
      description:
        "Furniture selection and electronics enquiries at Sparsh Furniture World, Adilabad. Ask about home appliances, TVs, kitchen appliances, prices and availability.",
      path: "/services",
    }),
  component: ServicesPage,
});

const process = [
  { t: "Tell us what you need", d: "Visit, call or WhatsApp with your room, sizes and ideas." },
  { t: "See the options", d: "We show suitable pieces — or discuss a custom-made one." },
  { t: "Confirm the details", d: "Price, finish, and delivery details are agreed before you order." },
  { t: "Bring it home", d: "We arrange delivery to your home or office." },
];

function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        lines={["Help at every", "step of the way."]}
        intro="Furniture selection, custom-made pieces and electronics enquiries — considered assistance for your home."
        image={hero}
        alt="Carpenter hand-planing walnut wood in a workshop"
      >
        <nav aria-label="Services on this page" className="flex flex-wrap gap-x-7 gap-y-3">
          {services.map((s) => (
            <a key={s.slug} href={`#${s.slug}`} className="link-line text-sm uppercase tracking-[0.16em] text-on-dark">
              {s.title}
            </a>
          ))}
        </nav>
      </PageHero>

      {services.map((s, i) => (
        <EditorialImageTextSection
          key={s.slug}
          id={s.slug}
          index={`0${i + 1}`}
          eyebrow={s.label}
          title={s.title}
          image={s.image}
          alt={s.alt}
          reverse={i % 2 === 1}
          tone={i % 2 === 1 ? "cream" : "light"}
          actions={
            <>
              <Link to="/contact" search={{ type: s.enquiryType }} className={ctaVariants({ variant: "primary", size: "sm" })}>
                Enquire <ArrowRight />
              </Link>
              <a
                href={whatsappUrl(`Hello ${siteConfig.name}, I'd like to know more about ${s.title.toLowerCase()}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className={ctaVariants({ variant: "outline", size: "sm" })}
              >
                <MessageCircle /> WhatsApp
              </a>
            </>
          }
        >
          <p>{s.body}</p>
          <ul className="space-y-2 pt-2 text-base">
            {s.highlights.map((h) => (
              <li key={h} className="flex items-center gap-3">
                <span className="h-px w-5 bg-walnut" aria-hidden />
                {h}
              </li>
            ))}
          </ul>
        </EditorialImageTextSection>
      ))}

      <section className="bg-cream py-24 md:py-36">
        <div className="container-editorial">
          <SectionHeading eyebrow="Electronics & home appliances" title={<>Considered choices.<br /><span className="italic text-walnut">Everyday comfort.</span></>}
            intro="Ask about home appliances, entertainment and kitchen essentials — including current prices and availability, by phone or WhatsApp." className="mb-14" />
          <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {electronicsServices.map((s, i) => <RevealItem key={s.slug}><FlipCard index={i} title={s.title} label={s.label} image={s.image} alt={s.alt} description={s.summary} highlights={s.highlights} cta={{ label: "Enquire", to: "/contact", search: { type: s.enquiryType } }} /></RevealItem>)}
          </RevealGroup>
        </div>
      </section>

      <section className="bg-espresso py-24 text-on-dark md:py-36">
        <div className="container-editorial">
          <Reveal className="grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <p className="eyebrow mb-6 text-bronze">The process</p>
              <h2 className="display-lg">
                Simple, <span className="italic text-bronze">from start to finish.</span>
              </h2>
            </div>
          </Reveal>
          <RevealGroup as="ol" className="mt-16 grid gap-px bg-line-dark md:grid-cols-4">
            {process.map((p, i) => (
              <RevealItem as="li" key={p.t} className="bg-espresso p-8 md:min-h-[18rem]">
                <span className="font-display text-5xl italic text-bronze">0{i + 1}</span>
                <h3 className="mt-8 font-display text-2xl">{p.t}</h3>
                <p className="mt-3 leading-relaxed text-on-dark-muted">{p.d}</p>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal className="mt-14">
            <Link to="/contact" className={ctaVariants({ variant: "bronze" })}>
              Start an enquiry <ArrowRight />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
