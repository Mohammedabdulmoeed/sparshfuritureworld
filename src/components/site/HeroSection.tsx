import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero-living.jpg";
import { LineReveal } from "./Reveal";
import { ctaVariants } from "./cta";
import { easeEditorial } from "@/lib/motion";
import { useMedia } from "@/hooks/use-media";
import { siteConfig } from "@/data/siteConfig";

export function HeroSection() {
  const reduce = useReducedMotion();
  const desktop = useMedia("(min-width: 768px)");
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 900], [0, 140]);
  const contentY = useTransform(scrollY, [0, 700], [0, -60]);
  const contentOpacity = useTransform(scrollY, [0, 560], [1, 0.15]);
  const parallax = desktop && !reduce;

  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-espresso text-on-dark">
      <motion.div
        className="absolute inset-0"
        initial={reduce ? false : { clipPath: "inset(10% 8% 10% 8%)", scale: 1.12 }}
        animate={{ clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
        transition={{ duration: 1.5, ease: easeEditorial, delay: 0.1 }}
      >
        <motion.img
          src={heroImg}
          alt="Sunlit living room with a cream linen sofa, walnut coffee table and walnut wall panelling"
          width={1920}
          height={1088}
          fetchPriority="high"
          style={parallax ? { y, scale: 1.12 } : {}}
          className="h-full w-full object-cover object-[65%_center]"
        />
      </motion.div>
      <div className="hero-overlay absolute inset-0" />

      <motion.div
        style={parallax ? { y: contentY, opacity: contentOpacity } : {}}
        className="container-editorial relative pb-24 pt-40 md:pb-32"
      >
        <motion.p
          className="eyebrow mb-8 flex items-center gap-4 text-bronze"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          <span className="h-px w-10 bg-current" aria-hidden />
          {siteConfig.name} · {siteConfig.address.city}
        </motion.p>

        <LineReveal
          as="h1"
          animateOnMount
          delay={0.45}
          lines={["Electronics that Inspire", "Furniture that Transforms", "Every space into home."]}
          className="display-xl max-w-[16ch] [&>span:last-child]:italic [&>span:last-child]:text-bronze"
        />

        <div className="mt-10 grid gap-10 md:grid-cols-12 md:items-end">
          <motion.p
            className="lede max-w-md text-on-dark-muted md:col-span-5"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.95, ease: easeEditorial }}
          >
            Thoughtfully selected furniture for comfortable living, beautiful interiors and everyday moments.
          </motion.p>
          <motion.div
            className="flex flex-wrap gap-3 md:col-span-7 md:justify-end"
            initial={reduce ? false : "hidden"}
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 1.1 } } }}
          >
            <motion.div variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}>
              <Link to="/products" className={ctaVariants({ variant: "light" })}>
                Explore Collection <ArrowRight />
              </Link>
            </motion.div>
            <motion.div variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}>
              <Link to="/contact" className={ctaVariants({ variant: "outline-light" })}>
                Contact Us
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <motion.a
        href="#intro"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-on-dark-muted md:flex"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        aria-label="Scroll to content"
      >
        <span className="eyebrow text-[0.6rem]">Scroll</span>
        <span className="relative block h-12 w-px overflow-hidden bg-on-dark/20">
          <span className="animate-scroll-cue absolute inset-0 bg-on-dark" />
        </span>
      </motion.a>
    </section>
  );
}
