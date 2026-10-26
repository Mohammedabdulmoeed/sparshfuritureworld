import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

type Props = {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: "light" | "dark";
  align?: "split" | "stack";
  action?: ReactNode;
  className?: string;
};

/** Numbered eyebrow + oversized serif title, optionally split with intro copy on the right. */
export function SectionHeading({
  index,
  eyebrow,
  title,
  intro,
  tone = "light",
  align = "split",
  action,
  className,
}: Props) {
  const muted = tone === "dark" ? "text-on-dark-muted" : "text-muted-foreground";
  return (
    <div
      className={cn(
        "grid gap-8",
        align === "split" && "md:grid-cols-12 md:items-end",
        className,
      )}
    >
      <Reveal className={cn(align === "split" ? "md:col-span-7" : "")}>
        <p className={cn("eyebrow mb-6 flex items-center gap-4", tone === "dark" ? "text-bronze" : "text-walnut")}>
          {index && <span className="font-display text-base tracking-normal normal-case italic">{index}</span>}
          <span className="h-px w-10 bg-current opacity-60" aria-hidden />
          {eyebrow}
        </p>
        <h2 className="display-lg">{title}</h2>
      </Reveal>
      {(intro || action) && (
        <Reveal delay={0.1} className={cn(align === "split" ? "md:col-span-4 md:col-start-9" : "max-w-xl")}>
          {intro && <p className={cn("lede", muted)}>{intro}</p>}
          {action && <div className="mt-6">{action}</div>}
        </Reveal>
      )}
    </div>
  );
}
