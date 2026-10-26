import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { categoriesIn } from "@/data/categories";
import { siteConfig, telHref } from "@/data/siteConfig";
import { whatsappUrl, generalEnquiryMessage } from "@/lib/whatsapp";
import { easeEditorial } from "@/lib/motion";
import { ctaVariants } from "./cta";
import { cn } from "@/lib/utils";

export const mainNav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/categories", label: "Categories" },
  { to: "/services", label: "Services" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
] as const;

/** Pages that open with a dark full-bleed image, so the header starts transparent. */
const heroPaths = new Set([
  "/",
  "/about",
  "/categories",
  "/products",
  "/services",
  "/gallery",
  "/offers",
  "/contact",
  "/faq",
]);

function Wordmark({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn("group flex flex-col leading-none", className)} aria-label={`${siteConfig.name} — home`}>
      <span className="font-display text-[1.65rem] tracking-[0.01em]">
        Sparsh<span className="text-bronze">.</span>
      </span>
      <span className="eyebrow mt-1 text-[0.55rem] tracking-[0.42em] opacity-75">Furniture World & Lavya Industies</span>
    </Link>
  );
}

export function Header() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setDropOpen(false);
  }, [pathname]);

  const overHero = heroPaths.has(pathname);
  const solid = scrolled || !overHero;

  return (
    <>
      <motion.header
        initial={reduce ? false : { y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: easeEditorial }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,color,border-color,backdrop-filter] duration-500",
          solid
            ? "border-b border-border bg-ivory/92 text-espresso backdrop-blur-md"
            : "border-b border-line-dark bg-transparent text-on-dark",
        )}
      >
        <div className={cn("container-editorial flex items-center justify-between transition-[height] duration-500", solid ? "h-[4.25rem]" : "h-20")}>
          <Wordmark />

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {mainNav.map((item) =>
                item.to === "/categories" ? (
                  <li
                    key={item.to}
                    className="relative"
                    onMouseEnter={() => setDropOpen(true)}
                    onMouseLeave={() => setDropOpen(false)}
                    onKeyDown={(e) => e.key === "Escape" && setDropOpen(false)}
                  >
                    <div className="flex items-center gap-1">
                      <Link to="/categories" className="link-line text-[0.8rem] font-medium uppercase tracking-[0.16em]">
                        {item.label}
                      </Link>
                      <button
                        type="button"
                        aria-label="Show product categories"
                        aria-expanded={dropOpen}
                        aria-controls="category-menu"
                        onClick={() => setDropOpen((v) => !v)}
                        className="p-1"
                      >
                        <ChevronDown className={cn("size-3.5 transition-transform duration-300", dropOpen && "rotate-180")} />
                      </button>
                    </div>
                    <AnimatePresence>
                      {dropOpen && (
                        <motion.div
                          id="category-menu"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.25, ease: easeEditorial }}
                          className="absolute left-1/2 top-full w-[34rem] -translate-x-1/2 pt-5"
                        >
                          <div className="grid grid-cols-2 gap-x-8 border border-border bg-ivory p-7 text-espresso shadow-soft">
                            <p className="eyebrow col-span-2 mb-4 text-walnut">Shop by room</p>
                            {categoriesIn("furniture").map((c) => (
                              <Link
                                key={c.slug}
                                to="/products"
                                search={{ category: c.slug }}
                                className="group flex items-center justify-between border-b border-border py-3 font-display text-xl transition-colors hover:text-walnut"
                              >
                                {c.name}
                                <ArrowUpRight className="size-4 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                              </Link>
                            ))}
                            <Link
                              to="/products"
                              search={{ department: "electronics" }}
                              className="group flex items-center justify-between border-b border-border py-3 font-display text-xl transition-colors hover:text-walnut"
                            >
                              Electronics
                              <ArrowUpRight className="size-4 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                            </Link>
                            <Link
                              to="/products"
                              className="group flex items-center justify-between border-b border-border py-3 font-display text-xl italic text-walnut"
                            >
                              All products
                              <ArrowUpRight className="size-4" />
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                ) : (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      activeOptions={{ exact: item.to === "/" }}
                      className="link-line text-[0.8rem] font-medium uppercase tracking-[0.16em]"
                    >
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              className={cn(
                ctaVariants({ variant: solid ? "primary" : "outline-light", size: "sm" }),
                "hidden sm:inline-flex",
              )}
            >
              Enquire Now
            </Link>
            <button
              ref={toggleRef}
              type="button"
              className="flex size-11 items-center justify-center lg:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <Menu className="size-6" />
            </button>
          </div>
        </div>
      </motion.header>

      <MobileNavigation open={menuOpen} onClose={() => { setMenuOpen(false); toggleRef.current?.focus(); }} />
    </>
  );
}

function MobileNavigation({ open, onClose }: { open: boolean; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const first = panelRef.current?.querySelector<HTMLElement>("a, button");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && panelRef.current) {
        const items = Array.from(panelRef.current.querySelectorAll<HTMLElement>("a, button"));
        const firstEl = items[0];
        const lastEl = items[items.length - 1];
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl?.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl?.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.6, ease: easeEditorial }}
          className="fixed inset-0 z-[70] flex flex-col overflow-y-auto bg-espresso text-on-dark lg:hidden"
        >
          <div className="container-editorial flex h-20 items-center justify-between border-b border-line-dark">
            <Wordmark />
            <button type="button" onClick={onClose} aria-label="Close menu" className="flex size-11 items-center justify-center">
              <X className="size-6" />
            </button>
          </div>
          <nav aria-label="Mobile" className="container-editorial flex-1 py-10">
            <motion.ul
              initial="hidden"
              animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } } }}
            >
              {[...mainNav, { to: "/products", label: "Products" }, { to: "/offers", label: "Offers" }, { to: "/faq", label: "FAQ" }].map(
                (item, i) => (
                  <motion.li
                    key={item.to}
                    variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeEditorial } } }}
                    className="border-b border-line-dark"
                  >
                    <Link
                      to={item.to}
                      activeOptions={{ exact: item.to === "/" }}
                      onClick={onClose}
                      className="flex items-baseline justify-between py-4 font-display text-[2.1rem] leading-none data-[status=active]:text-bronze"
                    >
                      {item.label}
                      <span className="font-sans text-xs tracking-[0.2em] text-on-dark-muted">0{i + 1}</span>
                    </Link>
                  </motion.li>
                ),
              )}
            </motion.ul>
          </nav>
          <div className="container-editorial grid gap-3 pb-10">
            <a href={whatsappUrl(generalEnquiryMessage)} target="_blank" rel="noopener noreferrer" className={ctaVariants({ variant: "bronze" })}>
              WhatsApp us
            </a>
            <a href={telHref} className={ctaVariants({ variant: "outline-light" })}>
              Call {siteConfig.phoneDisplay}
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
