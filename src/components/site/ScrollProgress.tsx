import { motion, useScroll, useSpring } from "motion/react";

/** Hairline reading-progress bar at the very top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-bronze"
      style={{ scaleX }}
    />
  );
}
