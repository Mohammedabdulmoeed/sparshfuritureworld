import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import showroom from "@/assets/showroom.jpg";
import craft from "@/assets/craft.jpg";
import living from "@/assets/cat-living.jpg";
import delivery from "@/assets/delivery.jpg";
import { cn } from "@/lib/utils";

const steps = [
  {
    title: "Visit & look around",
    body: "Walk the showroom, sit on the sofas, open the wardrobes. Bring room sizes or photos if you have them.",
    image: showroom,
    alt: "Showroom floor with sofas and a dining set",
  },
  {
    title: "Choose with help",
    body: "Tell us how you use the room and we'll help you compare pieces, sizes and finishes that suit it.",
    image: living,
    alt: "Cream sectional sofa with walnut tables",
  },
  {
    title: "Customise if needed",
    body: "If the right piece needs a different size or finish, we can discuss making it for you — with a quote first.",
    image: craft,
    alt: "Carpenter planing a wooden plank",
  },
  {
    title: "Delivered to your door",
    body: "We arrange delivery to your home or office. Timing and any charges are confirmed when you order.",
    image: delivery,
    alt: "Delivery staff carrying a wrapped sofa into a home",
  },
];

function Step({ index, active, onActive, step }: { index: number; active: boolean; onActive: (i: number) => void; step: (typeof steps)[number] }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);
  return (
    <li ref={ref} className="border-t border-line-dark py-10 md:flex md:min-h-[62vh] md:flex-col md:justify-center md:py-0">
      <img src={step.image} alt={step.alt} loading="lazy" className="mb-8 aspect-[4/3] w-full object-cover md:hidden" />
      <span className={cn("font-display text-2xl italic transition-colors duration-500", active ? "text-bronze" : "text-on-dark-muted")}>
        0{index + 1}
      </span>
      <h3 className={cn("mt-3 font-display text-4xl leading-tight transition-opacity duration-500 md:text-5xl", active ? "opacity-100" : "md:opacity-40")}>
        {step.title}
      </h3>
      <p className={cn("lede mt-5 max-w-md text-on-dark-muted transition-opacity duration-500", active ? "opacity-100" : "md:opacity-40")}>
        {step.body}
      </p>
    </li>
  );
}

/** Sticky image on the left changes as the steps on the right scroll past (desktop). */
export function StickyStory() {
  const [active, setActive] = useState(0);
  return (
    <section className="bg-espresso text-on-dark" aria-labelledby="story-title">
      <div className="container-editorial grid gap-10 py-20 md:grid-cols-12 md:gap-8 md:py-0">
        <div className="md:col-span-6">
          <div className="md:sticky md:top-0 md:flex md:h-screen md:flex-col md:justify-center md:py-24">
            <p className="eyebrow mb-6 flex items-center gap-4 text-bronze">
              <span className="font-display text-base normal-case italic tracking-normal">04</span>
              <span className="h-px w-10 bg-current opacity-60" aria-hidden />
              How it works
            </p>
            <h2 id="story-title" className="display-lg mb-10">
              From our floor
              <br />
              <span className="italic text-bronze">to your home.</span>
            </h2>
            <div className="relative hidden aspect-[4/3] overflow-hidden md:block">
              <AnimatePresence initial={false} mode="popLayout">
                <motion.img
                  key={active}
                  src={steps[active]?.image}
                  alt={steps[active]?.alt ?? ""}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute bottom-4 left-4 flex gap-1.5">
                {steps.map((_, i) => (
                  <span key={i} className={cn("h-0.5 w-8 transition-colors duration-500", i === active ? "bg-ivory" : "bg-ivory/30")} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <ol className="md:col-span-5 md:col-start-8 md:py-[20vh]">
          {steps.map((s, i) => (
            <Step key={s.title} index={i} step={s} active={i === active} onActive={setActive} />
          ))}
        </ol>
      </div>
    </section>
  );
}
