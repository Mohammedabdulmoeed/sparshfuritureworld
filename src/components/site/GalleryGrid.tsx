import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Plus, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { filterGallery, galleryTags, type GalleryItem, type GalleryTag } from "@/data/gallery";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ctaVariants } from "./cta";
import { cn } from "@/lib/utils";

const shapeClass: Record<GalleryItem["shape"], string> = {
  portrait: "aspect-[4/5]",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
};

export function GalleryGrid() {
  const [filter, setFilter] = useState<GalleryTag | "All">("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const items = useMemo(() => filterGallery(filter), [filter]);

  return (
    <>
      <div role="toolbar" aria-label="Filter gallery" className="mb-12 flex flex-wrap gap-x-7 gap-y-3 border-b border-border pb-5">
        {(["All", ...galleryTags] as const).map((t) => (
          <Button variant="ghost"
            key={t}
            type="button"
            aria-pressed={filter === t}
            onClick={() => { setOpenIndex(null); setFilter(t); }}
            className={cn(
              "link-line h-auto rounded-none px-0 pb-1 text-sm font-medium uppercase tracking-[0.18em] transition-colors hover:bg-transparent",
              filter === t ? "text-espresso after:!scale-x-100" : "text-muted-foreground hover:text-espresso",
            )}
          >
            {t}
          </Button>
        ))}
      </div>

      <motion.ul layout className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>li]:mb-4">
        <AnimatePresence mode="popLayout">
          {items.map((item, i) => (
            <motion.li
              layout
              key={item.src + item.caption}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.45 }}
              className="break-inside-avoid"
            >
              <Button variant="ghost"
                type="button"
                onClick={() => setOpenIndex(i)}
                className={cn("group relative block h-auto w-full rounded-none p-0 overflow-hidden bg-cream text-left", shapeClass[item.shape])}
                aria-label={`Open image: ${item.caption}`}
              >
                <img src={item.src} alt={item.alt} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-[900ms] ease-[var(--ease-editorial)] group-hover:scale-[1.04]" />
                <span className="image-bottom-overlay absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100" />
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 text-on-dark opacity-0 transition-all duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <span>
                    <span className="eyebrow block text-on-dark-muted">{item.tag}</span>
                    <span className="font-display text-xl">{item.caption}</span>
                  </span>
                  <Plus className="size-5" aria-hidden />
                </span>
              </Button>
              {item.category && <Link to="/products" search={{ category: item.category }} className="mt-3 mb-6 inline-block link-line text-xs uppercase tracking-[0.16em] text-walnut">Explore collection →</Link>}
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <Lightbox items={items} index={openIndex} onChange={setOpenIndex} />
    </>
  );
}

export function Lightbox({ items, index, onChange }: { items: GalleryItem[]; index: number | null; onChange: (i: number | null) => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const open = index !== null;
  const item = open ? items[index] : null;

  const prev = useCallback(() => index !== null && onChange((index - 1 + items.length) % items.length), [index, items.length, onChange]);
  const next = useCallback(() => index !== null && onChange((index + 1) % items.length), [index, items.length, onChange]);
  const close = useCallback(() => onChange(null), [onChange]);

  useEffect(() => {
    if (!open) return;
    lastFocus.current = document.activeElement as HTMLElement;
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      lastFocus.current?.focus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`Image ${(index ?? 0) + 1} of ${items.length}: ${item.caption}`}
          className="fixed inset-0 z-[80] flex flex-col bg-espresso/95 text-on-dark backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.target === e.currentTarget && close()}
        >
          <div className="container-editorial flex h-20 shrink-0 items-center justify-between">
            <p className="eyebrow text-on-dark-muted">
              {String((index ?? 0) + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </p>
            <Button variant="ghost" ref={closeRef} type="button" onClick={close} aria-label="Close" className="flex size-11 rounded-none items-center justify-center border border-line-dark hover:bg-ivory hover:text-espresso">
              <X className="size-5" />
            </Button>
          </div>
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 md:px-24" onClick={(e) => e.target === e.currentTarget && close()}>
            <AnimatePresence mode="wait">
              <motion.figure
                key={item.src}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="flex max-h-full flex-col items-center"
              >
                <img src={item.src} alt={item.alt} className="max-h-[72vh] w-auto max-w-full object-contain" />
                <figcaption className="mt-5 text-center font-display text-xl">{item.caption}</figcaption>
                {item.category && <Link to="/products" search={{ category: item.category }} className={ctaVariants({ variant: "text-light", size: "none" })}>Explore collection →</Link>}
              </motion.figure>
            </AnimatePresence>
            <Button variant="ghost" type="button" onClick={prev} aria-label="Previous image" className="absolute left-2 top-1/2 flex size-12 rounded-none -translate-y-1/2 items-center justify-center border border-line-dark bg-espresso/60 hover:bg-ivory hover:text-espresso md:left-8">
              <ChevronLeft className="size-5" />
            </Button>
            <Button variant="ghost" type="button" onClick={next} aria-label="Next image" className="absolute right-2 top-1/2 flex size-12 rounded-none -translate-y-1/2 items-center justify-center border border-line-dark bg-espresso/60 hover:bg-ivory hover:text-espresso md:right-8">
              <ChevronRight className="size-5" />
            </Button>
          </div>
          <div className="h-10 shrink-0" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
