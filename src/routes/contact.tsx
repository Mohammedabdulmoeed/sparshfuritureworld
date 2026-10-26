import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone, Clock } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { ContactForm } from "@/components/site/ContactForm";
import { Reveal } from "@/components/site/Reveal";
import { siteConfig, fullAddress, mapsUrl, mapsEmbedUrl, telHref, mailHref } from "@/data/siteConfig";
import { whatsappUrl, generalEnquiryMessage } from "@/lib/whatsapp";
import { pageHead, localBusinessJsonLd, originFrom } from "@/lib/seo";
import hero from "@/assets/hero-living.jpg";

type Search = { product?: string; type?: string };

export const Route = createFileRoute("/contact")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    ...(typeof s["product"] === "string" && s["product"].length <= 120 ? { product: s["product"] } : {}),
    ...(typeof s["type"] === "string" && s["type"].length <= 60 ? { type: s["type"] } : {}),
  }),
  head: (ctx) => ({
    ...pageHead(ctx, {
      title: "Contact Us",
      description: `Visit, call or WhatsApp Sparsh Furniture World — ${fullAddress}. Phone ${siteConfig.phoneDisplay}.`,
      path: "/contact",
    }),
    scripts: [localBusinessJsonLd(originFrom(ctx))],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { product, type } = Route.useSearch();
  const rows = [
    { icon: MapPin, label: "Showroom", value: fullAddress, href: mapsUrl, external: true, cta: "Get directions" },
    { icon: Phone, label: "Phone", value: siteConfig.phoneDisplay, href: telHref, cta: "Call now" },
    { icon: MessageCircle, label: "WhatsApp", value: siteConfig.phoneDisplay, href: whatsappUrl(generalEnquiryMessage), external: true, cta: "Start a chat" },
    { icon: Mail, label: "Email", value: siteConfig.email, href: mailHref, cta: "Write to us" },
  ];

  return (
    <>
      <PageHero
        eyebrow="Contact"
        lines={["Let's talk", "furniture."]}
        intro="Call, WhatsApp or send an enquiry — or simply visit the showroom."
        image={hero}
        alt="Warm living room with a linen sofa"
      />

      <section className="py-20 md:py-32">
        <div className="container-editorial grid gap-16 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <Reveal>
              <p className="eyebrow mb-6 text-walnut">Get in touch</p>
              <h2 className="display-md">Visit, call or message.</h2>
            </Reveal>
            <ul className="mt-10 border-t border-border">
              {rows.map((r) => (
                <li key={r.label} className="border-b border-border">
                  <a
                    href={r.href}
                    {...(r.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex items-start gap-5 py-6"
                  >
                    <r.icon className="mt-1 size-5 shrink-0 text-walnut" aria-hidden />
                    <span className="flex-1">
                      <span className="eyebrow block text-muted-foreground">{r.label}</span>
                      <span className="mt-1 block break-words text-lg">{r.value}</span>
                      <span className="mt-2 inline-flex items-center gap-1 text-sm text-walnut">
                        <span className="link-line">{r.cta}</span>
                        <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </span>
                    </span>
                  </a>
                </li>
              ))}
              <li className="flex items-start gap-5 border-b border-border py-6">
                <Clock className="mt-1 size-5 shrink-0 text-walnut" aria-hidden />
                <span>
                  <span className="eyebrow block text-muted-foreground">Opening hours</span>
                  <span className="mt-1 block text-lg">{siteConfig.openingHours ?? "Please call to confirm timings before visiting."}</span>
                </span>
              </li>
            </ul>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <Reveal className="bg-cream p-7 md:p-12">
              <p className="eyebrow mb-4 text-walnut">Enquiry form</p>
              <h2 className="display-md mb-10">Tell us what you're looking for.</h2>
              <ContactForm defaultProduct={product} defaultType={type} />
            </Reveal>
          </div>
        </div>
      </section>

      <section aria-label="Map" className="border-t border-border">
        <iframe
          title={`Map showing ${siteConfig.name}`}
          src={mapsEmbedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block h-[28rem] w-full grayscale-[0.6] sepia-[0.15]"
        />
      </section>
    </>
  );
}
