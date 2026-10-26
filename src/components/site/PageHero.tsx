import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { LineReveal } from "./Reveal";
import { ParallaxImage } from "./ParallaxImage";
import { easeEditorial } from "@/lib/motion";

type Props = {
  eyebrow: string;
  lines: string[];
  intro?: ReactNode;
  image?: string | undefined;
  alt: string;
  children?: ReactNode;
};

/** Inner-page hero: full-bleed photo, dark overlay, line-revealed title. */
export function PageHero({ eyebrow, lines, intro, image, alt, children }: Props) {
  const reduce = useReducedMotion();
  return (
    <section className="relative flex min-h-[72svh] items-end overflow-hidden bg-espresso text-on-dark md:min-h-[78svh]">
      {image && <motion.div
        className="absolute inset-0"
        initial={reduce ? false : { clipPath: "inset(6% 6% 6% 6%)", scale: 1.06 }}
        animate={{ clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
        transition={{ duration: 1.3, ease: easeEditorial }}
      >
        <ParallaxImage src={image} alt={alt} priority strength={6} className="h-full w-full" />
      </motion.div>}
      {image && <div className="hero-overlay absolute inset-0" />}
      <div className="container-editorial relative pb-16 pt-36 md:pb-24">
        <motion.p
          className="eyebrow mb-7 flex items-center gap-4 text-bronze"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          <span className="h-px w-10 bg-current" aria-hidden />
          {eyebrow}
        </motion.p>
        <LineReveal as="h1" lines={lines} animateOnMount delay={0.35} className="display-xl max-w-5xl" />
        {intro && (
          <motion.p
            className="lede mt-8 max-w-xl text-on-dark-muted"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75, ease: easeEditorial }}
          >
            {intro}
          </motion.p>
        )}
        {children && (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9, ease: easeEditorial }}
            className="mt-10"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}
