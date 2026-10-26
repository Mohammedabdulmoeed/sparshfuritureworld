import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { categoriesIn } from "@/data/categories";
import { siteConfig, fullAddress, mapsUrl, telHref, mailHref } from "@/data/siteConfig";
import { whatsappUrl, generalEnquiryMessage } from "@/lib/whatsapp";

const quickLinks = [
  { to: "/about", label: "About" },
  { to: "/products", label: "Products" },
  { to: "/services", label: "Services" },
  { to: "/gallery", label: "Gallery" },
  { to: "/offers", label: "Offers" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-espresso text-on-dark">
      <div className="container-editorial border-b border-line-dark py-16 md:py-24">
        <p className="eyebrow mb-6 text-bronze">Visit the showroom</p>
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <h2 className="display-lg md:col-span-8">
            Come sit on it
            <br />
            <span className="italic text-bronze">before you decide.</span>
          </h2>
          <div className="flex flex-wrap gap-3 md:col-span-4 md:justify-end">
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 border-b border-on-dark/40 pb-1 text-sm uppercase tracking-[0.18em] hover:border-bronze hover:text-bronze">
              Get directions <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>

      <div className="container-editorial grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Link to="/" className="inline-block font-display text-4xl">
            Sparsh<span className="text-bronze">.</span>
          </Link>
          <p className="eyebrow mt-2 text-on-dark-muted">Furniture World · Adilabad</p>
          <p className="mt-6 max-w-sm leading-relaxed text-on-dark-muted">
            A furniture showroom for living rooms, bedrooms, dining spaces and offices — with help choosing,
            custom-made pieces and delivery.
          </p>
        </div>

        <nav aria-label="Footer" className="lg:col-span-2">
          <p className="eyebrow mb-5 text-bronze">Explore</p>
          <ul className="space-y-3">
            {quickLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="link-line text-on-dark-muted transition-colors hover:text-on-dark">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <p className="eyebrow mb-5 text-bronze">Categories</p>
          <ul className="space-y-3">
            {categoriesIn("furniture").map((c) => (
              <li key={c.slug}>
                <Link to="/products" search={{ category: c.slug }} className="link-line text-on-dark-muted transition-colors hover:text-on-dark">
                  {c.name}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/products" search={{ department: "electronics" }} className="link-line text-on-dark-muted transition-colors hover:text-on-dark">
                Electronics
              </Link>
            </li>
          </ul>
        </div>

        <address className="not-italic lg:col-span-3">
          <p className="eyebrow mb-5 text-bronze">Contact</p>
          <p className="leading-relaxed text-on-dark-muted">{fullAddress}</p>
          <ul className="mt-5 space-y-3">
            <li>
              <a href={telHref} className="link-line hover:text-bronze">{siteConfig.phoneDisplay}</a>
            </li>
            <li>
              <a href={whatsappUrl(generalEnquiryMessage)} target="_blank" rel="noopener noreferrer" className="link-line hover:text-bronze">
                WhatsApp
              </a>
            </li>
            <li>
              <a href={mailHref} className="link-line break-all hover:text-bronze">{siteConfig.email}</a>
            </li>
            {siteConfig.openingHours && <li className="text-on-dark-muted">{siteConfig.openingHours}</li>}
          </ul>
          {siteConfig.social.length > 0 && (
            <ul className="mt-5 flex gap-5">
              {siteConfig.social.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-line">{s.label}</a>
                </li>
              ))}
            </ul>
          )}
        </address>
      </div>

      <div className="container-editorial flex flex-col gap-4 border-t border-line-dark py-8 text-xs text-on-dark-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© {year} {siteConfig.name}. All rights reserved.</p>
        <div className="flex gap-6">
          <Link to="/privacy-policy" className="link-line hover:text-on-dark">Privacy Policy</Link>
          <Link to="/terms" className="link-line hover:text-on-dark">Terms &amp; Conditions</Link>
        </div>
      </div>
    </footer>
  );
}
