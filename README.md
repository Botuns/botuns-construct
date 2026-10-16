# Botuns Construct Nigeria Limited

A responsive Next.js site for the company’s construction, property, procurement and merchandising services.

## Run locally

```sh
pnpm install
pnpm dev
```

Open http://localhost:3000. For a production preview, run `pnpm build` followed by `pnpm start`.

## Checks

```sh
pnpm lint
pnpm exec tsc --noEmit
pnpm build
```

## Design and content

- Shared colors, responsive layouts and locally hosted Helvetica fonts live in `app/globals.css`.
- Page sections live in `components/sections`. The page uses native scrolling, with a small reduced-motion-aware entrance on the contact CTA.
- The gallery supports category filters and a keyboard-accessible native dialog.
- `public/assets/projects/completed-bungalow` contains six optimized WebP photos supplied by the owner from the completed bungalow album. The hero and approach sections also use these real project photos. Source and selection notes are in `docs/project-photos.md`.
- The gallery presents one completed bungalow, with Exterior and Interior filters. Project location, completion date, size and costs are intentionally omitted until supplied by the owner.
- The enquiry form prepares a `mailto:` draft in the visitor’s email app. It does not submit to a server or claim delivery. A backend/email service is needed for direct website submissions.
- The commitment section replaces the previous generic testimonial placeholders. Add attributed client testimonials only after the owner has verified them.
