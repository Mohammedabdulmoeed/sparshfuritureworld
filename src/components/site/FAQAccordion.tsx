import * as Accordion from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import type { Faq } from "@/data/content";

export function FAQAccordion({ items }: { items: Faq[] }) {
  return (
    <Accordion.Root type="single" collapsible className="border-t border-border">
      {items.map((f, i) => (
        <Accordion.Item key={f.q} value={`item-${i}`} className="border-b border-border">
          <Accordion.Header>
            <Accordion.Trigger className="group flex w-full items-start justify-between gap-6 py-7 text-left">
              <span className="flex gap-5">
                <span className="mt-1.5 font-display text-base italic text-walnut">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display text-2xl leading-snug md:text-[1.75rem]">{f.q}</span>
              </span>
              <span className="mt-1 flex size-9 shrink-0 items-center justify-center rounded-full border border-border transition-colors group-hover:border-walnut group-data-[state=open]:bg-walnut group-data-[state=open]:text-ivory">
                <Plus className="size-4 transition-transform duration-300 group-data-[state=open]:rotate-45" />
              </span>
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
            <p className="lede max-w-2xl pb-8 pl-10 text-muted-foreground">{f.a}</p>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
