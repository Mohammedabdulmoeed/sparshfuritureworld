import type { ReactNode } from "react";

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <section className="pb-24 pt-32 md:pb-36 md:pt-44">
      <div className="container-editorial grid gap-12 md:grid-cols-12">
        <header className="md:col-span-4">
          <p className="eyebrow mb-5 text-walnut">Legal</p>
          <h1 className="display-lg">{title}</h1>
          <p className="mt-6 text-sm text-muted-foreground">Last updated {updated}</p>
        </header>
        <div className="space-y-6 leading-relaxed text-charcoal md:col-span-7 md:col-start-6 [&_h2]:mt-12 [&_h2]:font-display [&_h2]:text-3xl [&_h2]:text-espresso [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_a]:text-walnut [&_a]:underline [&_a]:underline-offset-4">
          {children}
        </div>
      </div>
    </section>
  );
}
