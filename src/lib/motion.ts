import type { Transition, Variants } from "motion/react";

/** Shared easing + timing so every reveal feels like the same hand. */
export const easeEditorial = [0.22, 1, 0.36, 1] as const;

export const revealTransition: Transition = { duration: 0.7, ease: easeEditorial };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: revealTransition },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: easeEditorial } },
};

export const stagger = (staggerChildren = 0.09, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
});

export const lineReveal: Variants = {
  hidden: { y: "105%" },
  visible: { y: "0%", transition: { duration: 0.85, ease: easeEditorial } },
};

export const maskReveal: Variants = {
  hidden: { clipPath: "inset(12% 0% 12% 0%)", opacity: 0.4 },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    opacity: 1,
    transition: { duration: 1.1, ease: easeEditorial },
  },
};

export const viewportOnce = { once: true, margin: "0px 0px -12% 0px" } as const;
