import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { FAQAccordion } from "@/components/site/FAQAccordion";
import { Reveal } from "@/components/site/Reveal";
import { ctaVariants } from "@/components/site/cta";
import { faqs } from "@/data/content";
import { whatsappUrl, generalEnquiryMessage } from "@/lib/whatsapp";
import { pageHead } from "@/lib/seo";
import hero from "@/assets/cat-wardrobe.jpg";

export const Route = createFileRoute("/faq")({
  head: (ctx) => ({
    ...pageHead(ctx, {
      title: "Frequently Asked Questions",
      description: "Answers about prices, stock, custom-made furniture, delivery and visiting Sparsh Furniture World in Adilabad.",
      path: "/faq",
    }),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }),
      },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        lines={["Questions,", "answered."]}
        intro="The things people most often ask us before visiting."
        image={hero}
        alt="Walnut sliding wardrobe in a bedroom"
      />
      <section className="py-20 md:py-32">
        <div className="container-editorial grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <div className="md:sticky md:top-28">
              <h2 className="display-md">Still unsure?</h2>
              <p className="lede mt-5 text-muted-foreground">Ask us directly — we're happy to help.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={whatsappUrl(generalEnquiryMessage)} target="_blank" rel="noopener noreferrer" className={ctaVariants({ variant: "primary", size: "sm" })}>
                  <MessageCircle /> WhatsApp
                </a>
                <Link to="/contact" className={ctaVariants({ variant: "outline", size: "sm" })}>
                  Contact
                </Link>
              </div>
            </div>
          </Reveal>
          <div className="md:col-span-8">
            <FAQAccordion items={faqs} />
          </div>
        </div>
      </section>
    </>
  );
}
