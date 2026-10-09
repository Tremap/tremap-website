@AGENTS.md

# tremap-website

The public marketing site for www.tremap.com, replacing the old Wix site. Next.js 16 (App Router), Tailwind v4, `motion` for animations.

## Commands
```bash
npm run dev     # http://localhost:3000
npm run build   # must pass before any deploy
npm run lint
npx tsc --noEmit
```

## Where things live
- `src/app/<route>/page.tsx` — one folder per page. Routes keep the old Wix URLs (e.g. `/traceabilityaddedvalue`, `/speciessponsors`, `/post/<slug>`) so links and search rankings survive the switch.
- `src/content/posts/*.md` — blog posts (front matter: title, date, author, categories, tags, cover, excerpt). Add a post by adding a file; images go in `public/blog/<slug>/`.
- `src/content/legal/*.md` — privacy policy and terms (copied from websitepolicies.com; keep both in sync if the policy changes).
- `src/content/media.json` + `public/media/` — images migrated from Wix, looked up by their original Wix media id with `m("<id>")` from `src/lib/media.ts`.
- `public/files/` — downloadable PDFs and zips (brochures, press kit).
- `src/lib/site.ts` — navigation, contact details, social links, app links, live tree count.
- `src/components/ui.tsx` — shared building blocks (PageHero, Panel, Button, H2, CtaBand…). Reuse these for new pages.
- `next.config.ts` — redirects for old Wix-only URLs (members, forum, `_files/...`).

## Design rules
- Colours come from the logo: `leaf #4d834f`, `ember #ec7332`, `ink #212536`, plus `forest`, `sage`, `mist`, `cream`, `sand` tokens in `globals.css`.
- Headings: Fraunces (`font-display`), italic `<em>` for the accent words. Body: Manrope.
- Pages with a dark image hero must be listed in `DARK_HERO` in `src/components/Header.tsx` (white header over the hero); every other page gets the solid header.

## SEO (do not break)
The site replaced a Wix site that ranks well. Every indexable page exports `metadata = pageMeta("/its-path", {...})` from `src/lib/seo.ts`. It sets the title, description, canonical URL and social tags, and reuses the title and description Google indexed on Wix (`src/content/seo.json`, keyed by path). To change what a page shows in Google, edit that JSON.
- Never rename or remove a route without adding a redirect in `next.config.ts`.
- New page: add it to `PAGES` in `src/app/sitemap.ts` and give it `pageMeta`.
- Structured data (`JsonLd`): WebSite + LocalBusiness on the home page, BlogPosting on posts.
- Share image: `src/app/opengraph-image.tsx` (posts use their cover). Icons: `src/app/icon.png`, `apple-icon.png`.

## Analytics and cookies
Google Analytics 4 loads only after the visitor clicks Accept in the cookie notice (`src/components/CookieConsent.tsx`); nothing is sent to Google before that. Set `NEXT_PUBLIC_GA_ID` in Vercel. Without it there is no analytics and no notice. "Cookie settings" in the footer reopens the notice.

## Contact forms
All forms post to `src/app/api/contact/route.ts`, which emails the team through Resend. Needs env vars (see `.env.example`). Without them the form shows a "please email help@tremap.com" message instead of failing silently.

## Not migrated from Wix (on purpose)
- Members / Groups / Forum (Wix community apps, unused) → redirected to `/`.
- Wix chat widget → dropped (decided 2026-10-09). Wix visitor analytics → replaced by Google Analytics, see above.
