import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useMedia } from "@/hooks/use-media";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  /** Percentage of travel; kept small on purpose. */
  strength?: number;
  priority?: boolean;
  width?: number;
  height?: number;
};

/** Image that drifts slightly slower than the page on desktop. Static on mobile / reduced motion. */
export function ParallaxImage({
  src,
  alt,
  className,
  imgClassName,
  strength = 8,
  priority,
  width,
  height,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const desktop = useMedia("(min-width: 768px)");
  const active = desktop && !reduce;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        style={active ? { y, scale: 1 + (strength * 2.4) / 100 } : {}}
        className={cn("h-full w-full object-cover will-change-transform", imgClassName)}
      />
    </div>
  );
}
