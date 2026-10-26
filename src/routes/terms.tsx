import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";
import { siteConfig, fullAddress, mailHref, telHref } from "@/data/siteConfig";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/terms")({
  head: (ctx) =>
    pageHead(ctx, {
      title: "Terms and Conditions",
      description: "Terms for using the Sparsh Furniture World website, including product information, prices and enquiries.",
      path: "/terms",
    }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <LegalPage title="Terms & Conditions" updated="October 2026">
      <p>By using this website you agree to these terms. Please read them alongside our Privacy Policy.</p>
      <h2>Product information</h2>
      <p>
        Products shown on this website represent the styles we carry. Photographs are for illustration; actual colours, finishes, sizes and
        materials may vary. Stock changes frequently and is not guaranteed until confirmed by us.
      </p>
      <h2>Prices</h2>
      <p>Prices are shared on request and confirmed at the time of order. Any price we quote is valid only for the period we state.</p>
      <h2>Orders, custom work and delivery</h2>
      <p>
        Orders, custom-made furniture, delivery arrangements, timelines and any charges are agreed directly with you before purchase. Those
        agreed terms apply to your order.
      </p>
      <h2>Enquiries</h2>
      <p>Submitting an enquiry does not create an order or reservation. We'll respond to confirm details.</p>
      <h2>Use of this website</h2>
      <p>Please don't misuse the site, attempt to disrupt it, or submit false information through the enquiry form.</p>
      <h2>Contact</h2>
      <p>
        {siteConfig.name}, {fullAddress}. Phone <a href={telHref}>{siteConfig.phoneDisplay}</a>, email <a href={mailHref}>{siteConfig.email}</a>.
      </p>
    </LegalPage>
  );
}
