<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules
- Catalogue is data-driven: categories (with a `department`: furniture | electronics) live in src/data/categories.ts and products in src/data/products.ts; filtering/search lives in src/lib/catalogue.ts — extend these, don't create parallel systems.
- Separate brand profiles (e.g. Lavya Industries) live in src/data/brands.ts and stay hidden until `confirmed` — the site identity stays in siteConfig.
- Editorial electronics collections group existing category slugs in categories.ts; catalogue filtering resolves those groups without duplicate products.
- Gallery department filtering derives furniture versus electronics from catalogue-linked items; retain room tags and the shared lightbox.
- Electronics enquiry services are separate from confirmed furniture fulfilment services so adding enquiries does not imply delivery or support promises.
- Editable electronics demo records feed the same products.ts array; verified photo assignments live in electronics-photos.ts with source, licensing, credit and dimensions. Unverified entries have empty image sources and explicit manual-replacement status, never synthetic substitutes.
- ElectronicsImage handles contained electronics imagery, loading and an explicit product-type fallback; furniture photography remains on its original rendering path.
