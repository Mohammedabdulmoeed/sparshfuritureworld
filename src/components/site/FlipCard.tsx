import { Link } from "@tanstack/react-router";
import { ArrowRight, RotateCw } from "lucide-react";
import { useState, type KeyboardEvent, type PointerEvent, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

type FlipCardProps = {
  title: string;
  label: string;
  image: string;
  alt: string;
  description: string;
  highlights: readonly string[];
  cta: { label: string; to: "/products" | "/services" | "/contact"; search?: Record<string, string> };
  className?: string;
  index?: number;
};

/**
 * 3D flip card used for categories and services.
 * Mouse: hover flips. Touch/pen: tap toggles. Keyboard: Enter/Space toggles.
 * Reduced motion: crossfade (handled in styles.css).
 */
export function FlipCard({ title, label, image, alt, description, highlights, cta, className, index }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);

  const onPointerEnter = (e: PointerEvent) => e.pointerType === "mouse" && setFlipped(true);
  const onPointerLeave = (e: PointerEvent) => e.pointerType === "mouse" && setFlipped(false);
  const onClick = (e: MouseEvent) => {
    if ((e.target as HTMLElement).closest("a")) return;
    // Mouse users already flip on hover; clicks still toggle for anyone else.
    if ((e.nativeEvent as globalThis.PointerEvent).pointerType === "mouse") return;
    setFlipped((v) => !v);
  };
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.target !== e.currentTarget) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setFlipped((v) => !v);
    }
    if (e.key === "Escape") setFlipped(false);
  };

  return (
    <div
      role="group"
      tabIndex={0}
      aria-roledescription="flip card"
      aria-label={`${title}. Press Enter to ${flipped ? "show the photo" : "see details"}.`}
      data-flipped={flipped}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onClick={onClick}
      onKeyDown={onKeyDown}
      className={cn("flip-scene relative aspect-[4/5] w-full cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background", className)}
    >
      <div className="flip-inner">
        {/* Front */}
        <div className="flip-face flip-front bg-cream" aria-hidden={flipped}>
          <img src={image} alt={alt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
          <div className="image-bottom-overlay absolute inset-0" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 text-on-dark">
            <div>
              <p className="eyebrow mb-2 text-on-dark-muted">{label}</p>
              <h3 className="font-display text-[1.9rem] leading-none">{title}</h3>
            </div>
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-on-dark/40">
              <RotateCw className="size-4" aria-hidden />
            </span>
          </div>
          {typeof index === "number" && (
            <span className="absolute left-6 top-5 font-display text-lg italic text-on-dark">
              {String(index + 1).padStart(2, "0")}
            </span>
          )}
        </div>

        {/* Back */}
        <div className="flip-face flip-back flex flex-col justify-between bg-espresso p-7 text-on-dark" aria-hidden={!flipped}>
          <div>
            <p className="eyebrow mb-4 text-bronze">{label}</p>
            <h3 className="font-display text-[2rem] leading-none">{title}</h3>
            <p className="mt-5 leading-relaxed text-on-dark-muted">{description}</p>
          </div>
          <div>
            <ul className="mb-7 space-y-2.5 border-t border-line-dark pt-5">
              {highlights.map((h) => (
                <li key={h} className="flex items-center gap-3 text-sm">
                  <span className="h-px w-4 bg-bronze" aria-hidden />
                  {h}
                </li>
              ))}
            </ul>
            <Link
              to={cta.to}
              search={cta.search as never}
              tabIndex={flipped ? 0 : -1}
              className="group inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-bronze hover:text-on-dark"
            >
              {cta.label}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
