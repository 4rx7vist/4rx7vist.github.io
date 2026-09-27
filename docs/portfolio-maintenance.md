# PORTVAULT maintenance

## Run and build

Use `pnpm dev`, `pnpm build`, and `pnpm preview`. Astro produces a static `dist/` with the homepage and three `/systems/[slug]/` pages. Base path is configured at the root (`/`). No React integration, client hydration tree, server runtime, or database is required.

## Content

- `src/data/systems.ts`: typed source for project listings, architecture, metadata, and detail routes. Replace TODOs with verified facts; do not infer production status or results.
- `src/data/system-media.ts`: image imports for Astro optimization. Sources are preserved in `public/images/`; optimized responsive media is generated from `src/assets/systems/`.
- `src/components/About.astro`: tool groups and technologies used to build systems.
- `src/components/Lab.astro`: research directions, explicitly not completed experiments. Replace them with actual work as it is published.
- EN/ES copy uses `Text.astro`; native select options use `data-en` and `data-es`.

## Design and motion

Nata Sans is global, including forms and buttons. Tokens live in `src/styles/global.css`; system rules live in `DESIGN.md`.

The hero is static Astro markup. Its small TypeScript controller interpolates SVG path coordinates and node positions on demand. The flow is explicitly illustrative, not a claim about any project's cloud deployment. Reduced-motion mode updates immediately. Keyboard arrows, click, Enter, and Space operate the mode buttons. No animation library is loaded by the new pages.

## Contact delivery

Without configuration the form prepares an email draft, then offers an explicit **Open email draft** link and **Copy inquiry** fallback. It never claims a message has been sent. The user must send the draft from their mail application. Long drafts may exceed a mail client's URL limits; the copy fallback preserves the full text. Native validation and whitespace checks protect required fields.

To connect a provider, set `PUBLIC_CONTACT_ENDPOINT` at build time to an HTTPS endpoint. This public URL is visible in the built page and must not contain a secret. `src/lib/contact.ts` sends JSON with these fields:

`name`, `email`, `projectTypes`, `context`, `outcome`, `timeline`, `budget`, `cloudProvider`, `cloudConcern`, and `source`.

The endpoint must accept browser requests from this site's origin (CORS), handle validation, abuse protection and actual delivery, and return 2xx only when it accepts the inquiry. Adapt `deliverInquiry` for providers with different payload or response requirements. Failures and timeouts retain all fields and expose the email fallback. Configure credentials on the provider/server side only.

## Preserved resources

`Achievements.astro` and all existing GLB files remain in place. The homepage does not mount that component, so Three.js and the laptop are not loaded. Original agency components remain available in source but are not part of the active route. The old Banner component is no longer rendered.

## Before publishing

Fill in verified role, year, deployment status, constraints, engineering decisions, results, and lessons in the three system records. Add a real portrait and actual lab entries when available. Review the suggested 24–48 hour response time and project availability copy. Connect a contact provider only if direct form delivery is desired.
