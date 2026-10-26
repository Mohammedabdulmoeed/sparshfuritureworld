import { useState } from "react";
import { ImageOff, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

/** Never substitutes an unrelated product photo on failure. */
export function ElectronicsImage({ src, alt, label, priority, className }: {
  src: string; alt: string; label: string; priority?: boolean | undefined; className?: string | undefined;
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(!src);
  return <div className={cn("relative h-full w-full bg-paper", className)}>
    {!loaded && !failed && <span role="status" aria-label={`Loading ${label} image`} className="absolute inset-0 flex items-center justify-center text-muted-foreground"><Loader2 className="size-6 animate-spin motion-reduce:animate-none" /></span>}
    {failed ? <div role="img" aria-label={`${label}: ${src ? "image unavailable" : "genuine photo required"}`} className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center text-muted-foreground"><ImageOff className="size-8" /><span className="text-sm">{label}<br />{src ? "Photo unavailable" : "Genuine product photo required"}</span>{!src && <span className="text-xs">Awaiting manual replacement</span>}</div> :
      <img src={src} alt={alt} width={800} height={800} loading={priority ? "eager" : "lazy"} decoding="async" onLoad={() => setLoaded(true)} onError={() => setFailed(true)} className={cn("h-full w-full object-contain transition-[opacity,transform] duration-500 group-hover:scale-[1.03]", loaded ? "opacity-100" : "opacity-0")} />}
  </div>;
}