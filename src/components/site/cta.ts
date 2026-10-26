import { cva, type VariantProps } from "class-variance-authority";

/** Editorial call-to-action styles — square-ish, quiet, confident. */
export const ctaVariants = cva(
  "group/cta inline-flex items-center justify-center gap-3 whitespace-nowrap font-sans text-[0.78rem] font-medium uppercase tracking-[0.2em] transition-[background-color,color,border-color] duration-300 ease-[var(--ease-editorial)] disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-300 hover:[&_svg]:translate-x-1",
  {
    variants: {
      variant: {
        primary: "bg-walnut text-ivory hover:bg-espresso",
        bronze: "bg-bronze text-espresso hover:bg-ivory",
        light: "bg-ivory text-espresso hover:bg-bronze",
        outline: "border border-espresso/30 text-espresso hover:border-espresso hover:bg-espresso hover:text-ivory",
        "outline-light": "border border-on-dark/40 text-on-dark hover:border-on-dark hover:bg-ivory hover:text-espresso",
        text: "px-0 text-espresso",
        "text-light": "px-0 text-on-dark",
      },
      size: {
        md: "h-12 px-7",
        sm: "h-10 px-5",
        none: "h-auto",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export type CtaVariants = VariantProps<typeof ctaVariants>;
