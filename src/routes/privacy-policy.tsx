import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";
import { siteConfig, fullAddress, mailHref, telHref } from "@/data/siteConfig";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/privacy-policy")({
  head: (ctx) =>
    pageHead(ctx, {
      title: "Privacy Policy",
      description: "How Sparsh Furniture World collects, uses and protects the information you share through this website.",
      path: "/privacy-policy",
    }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="October 2026">
      <p>
        This policy explains how {siteConfig.name} ("we", "us") handles information you share when you use this website.
      </p>
      <h2>Information we collect</h2>
      <p>When you send an enquiry through the contact form, we collect:</p>
      <ul>
        <li>Your name and mobile number</li>
        <li>Your email address, if you choose to provide it</li>
        <li>The type of enquiry, any product you mention and your message</li>
      </ul>
      <p>If you contact us by WhatsApp, phone or email, those services handle your messages under their own privacy policies.</p>
      <h2>How we use it</h2>
      <p>We use your details only to respond to your enquiry, share prices or availability, and arrange any order or delivery you request. We do not sell your information.</p>
      <h2>How long we keep it</h2>
      <p>We keep enquiry details for as long as needed to respond and for reasonable record-keeping, after which they are deleted.</p>
      <h2>Your choices</h2>
      <p>
        You can ask us to see, correct or delete the information you've shared by contacting us at <a href={mailHref}>{siteConfig.email}</a> or{" "}
        <a href={telHref}>{siteConfig.phoneDisplay}</a>.
      </p>
      <h2>Third-party services</h2>
      <p>This site loads fonts from Google Fonts and an embedded Google Map on the Contact page. These services may receive basic technical information such as your IP address.</p>
      <h2>Contact</h2>
      <p>{siteConfig.name}, {fullAddress}.</p>
    </LegalPage>
  );
}
