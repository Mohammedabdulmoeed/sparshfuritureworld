import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { fadeUp, maskReveal, stagger, viewportOnce, lineReveal } from "@/lib/motion";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "article" | "header";
};

/** Gentle fade + rise when the element scrolls into view. */
export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView="visible"
      viewport={viewportOnce}
      variants={fadeUp}
      transition={{ delay }}
    >
      {children}
    </Comp>
  );
}

/** Parent that staggers its RevealItem children. */
export function RevealGroup({
  children,
  className,
  gap = 0.09,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  gap?: number;
  as?: "div" | "ul" | "ol";
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView="visible"
      viewport={viewportOnce}
      variants={stagger(gap)}
    >
      {children}
    </Comp>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  const Comp = motion[as];
  return (
    <Comp className={className} variants={fadeUp}>
      {children}
    </Comp>
  );
}

/** Clip-path reveal for selected photographs. */
export function MaskReveal({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={cn("overflow-hidden", className)}
      initial={reduce ? false : "hidden"}
      whileInView="visible"
      viewport={viewportOnce}
      variants={maskReveal}
    >
      {children}
    </motion.div>
  );
}

/** Line-by-line heading reveal. Pass each line as a string. Use only on major headings. */
export function LineReveal({
  lines,
  className,
  as = "h2",
  animateOnMount = false,
  delay = 0,
}: {
  lines: string[];
  className?: string;
  as?: "h1" | "h2" | "h3";
  animateOnMount?: boolean;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  const trigger = animateOnMount
    ? { animate: "visible" as const }
    : { whileInView: "visible" as const, viewport: viewportOnce };
  return (
    <Comp
      className={className}
      initial={reduce ? false : "hidden"}
      {...trigger}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: delay } } }}
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span className="block" variants={lineReveal}>
            {line}
          </motion.span>
        </span>
      ))}
    </Comp>
  );
}

/** Word-by-word reveal for a single statement paragraph. */
export function WordReveal({ text, className }: { text: string; className?: string }) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  return (
    <motion.p
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -20% 0px" }}
      variants={stagger(0.035)}
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          className="inline-block"
          variants={{
            hidden: { opacity: 0.12, y: 6 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
        >
          {w}
          {i < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </motion.p>
  );
}
