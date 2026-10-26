import type { ReactNode } from "react";
import { MaskReveal, Reveal } from "./Reveal";
import { ParallaxImage } from "./ParallaxImage";
import { cn } from "@/lib/utils";

type Props = {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  children: ReactNode;
  image: string;
  alt: string;
  reverse?: boolean;
  tone?: "light" | "cream" | "dark";
  actions?: ReactNode;
  id?: string;
};

/** Alternating asymmetric image + text block. */
export function EditorialImageTextSection({ index, eyebrow, title, children, image, alt, reverse, tone = "light", actions, id }: Props) {
  return (
    <section
      id={id}
      className={cn(
        "py-20 md:py-32",
        tone === "cream" && "bg-cream",
        tone === "dark" && "bg-espresso text-on-dark",
      )}
    >
      <div className="container-editorial grid items-center gap-12 md:grid-cols-12 md:gap-8">
        <MaskReveal className={cn("md:col-span-6", reverse ? "md:order-2 md:col-start-7" : "")}>
          <ParallaxImage src={image} alt={alt} className="aspect-[4/5] w-full" strength={6} />
        </MaskReveal>
        <div className={cn("md:col-span-5", reverse ? "md:order-1 md:col-start-1" : "md:col-start-8")}>
          <Reveal>
            <p className={cn("eyebrow mb-6 flex items-center gap-4", tone === "dark" ? "text-bronze" : "text-walnut")}>
              {index && <span className="font-display text-base normal-case italic tracking-normal">{index}</span>}
              <span className="h-px w-10 bg-current opacity-60" aria-hidden />
              {eyebrow}
            </p>
            <h2 className="display-md">{title}</h2>
          </Reveal>
          <Reveal delay={0.1} className={cn("lede mt-7 space-y-5", tone === "dark" ? "text-on-dark-muted" : "text-muted-foreground")}>
            {children}
          </Reveal>
          {actions && <Reveal delay={0.2} className="mt-9 flex flex-wrap gap-3">{actions}</Reveal>}
        </div>
      </div>
    </section>
  );
}
