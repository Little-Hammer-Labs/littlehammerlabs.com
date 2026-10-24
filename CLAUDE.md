# littlehammerlabs.com

Public site for Little Hammer Labs, LLC, a San Diego holding company that acquires owner-operated small businesses and rebuilds their back office around automation. The site's job, in priority order: get San Diego owners thinking about stepping back to book a call (`/owners/`), get owners who want a better-run office to book a Systems Audit (`/systems-audit/`), and be the page Google and AI assistants cite when a San Diego owner asks how to sell or step back (`/guides/`). Investors are third and the memo request is on hold until securities counsel signs off.

Repositioned October 2026 from an AI-consultancy site, then toward owners on October 23, 2026 from Max's brief. `ASSUMPTIONS.md` lists every number and claim not yet confirmed by a founder; clear it before publishing.

## Coming-soon mode (current)

The site ships in coming-soon mode: the homepage is the only public page, with the full story but no links, buttons, or forms; `COMING_SOON = true` in `site.js` sends every other page (except privacy and terms) home, and `sitemap.xml` lists only the homepage. To launch, revert the commit titled "Coming-soon mode", which restores the full homepage, nav, CTAs, and sitemap in one step.

## Stack

- Static HTML, one shared `styles.css`, one small `site.js`. No framework, no build step, no npm.
- GitHub Pages with custom domain (`CNAME`). Push to `main` deploys.
- Fonts from Google Fonts: Newsreader (display serif) and Inter (body).
- The Systems Audit form `action` is the intake webhook (n8n W1, or Formspree). `site.js` posts the fields as JSON (including `sms_consent`), then sends the owner to `/systems-audit/thanks/` with name and email prefilled into the cal.com link via sessionStorage. While the action contains `REPLACE_ME`, or if the request fails, a submit becomes a prefilled mailto.
- Meta pixel: set `META_PIXEL_ID` in `site.js`; it loads on every page from there. `Lead` fires on audit submit, `Schedule` on the booked pages.
- GitHub Pages runs Jekyll by default, so folders starting with `_` (like `_templates/`) are not published.

## Structure

```
index.html              Home: pitch, owner band, model, why, how we evaluate, proof, people
owners/                 Seller page: four ways to work with us, what you can count on, process, fit, FAQ (FAQPage schema)
systems-audit/          Free audit offer: what you get, who it's for, proof, form (Service + Offer schema)
systems-audit/thanks/   Form redirect target with the cal.com booking link (noindex)
guides/                 Article index (noindex until the first article ships)
guides/<slug>/          Articles, one folder each, built from _templates/guide.html
_templates/guide.html   Article template (Article + FAQPage schema, author box, one CTA). Not published.
thesis/                 Criteria, what we avoid, why now, holdco structure
playbook/               "How we evaluate": the LHL Score (seven factors), the offer, 30-day handover then automation, rules, tool kit, DGA proof
owners/booked/  systems-audit/booked/   cal.com "redirect on booking" targets; fire the *_call_booked events (noindex)
portfolio/              Empty state + pipeline + pointer to /owners/
investors/              Short holding page, no offer, no form. Old content archived in _templates/investors-archive.html
investors/thanks/       Old form redirect target, unused (noindex)
privacy/  terms/        Legal (noindex)
404.html                Custom not-found
propertymanagement/ webdesign/ casestudy/*/   Meta-refresh redirect stubs for old consultancy URLs (noindex)
styles.css  site.js     Shared
sitemap.xml  robots.txt  manifest.json
assets/images/          logo-lockup.* (nav/footer), logo-mark.webp, og.png, founders.jpeg, lhlfull.* (source logo)
```

## Conventions

- Visual style: editorial and light. Cream background sampled from the logo, serif headlines, one orange accent. No gradients, glows, shadows, rounded cards, scroll animations, or icon grids.
- Copy: plain declarative sentences, concrete nouns, no em-dashes in body text, no marketing adjectives. Say what the company does and does not do.
- Never state or imply a return. Every page footer carries the no-offer disclaimer; keep it.
- Each page repeats the full nav and footer. When you change one, change every page (and the template); a regex swap in a script is the safe way.
- Nav: Thesis · How we evaluate (/playbook/) · Portfolio · Guides · For owners (button). Investors is footer-only on purpose.
- San Diego is named explicitly on every owner-facing page, not only "Southern California".
- Every page carries the Organization JSON-LD; subpages add BreadcrumbList. Owners has FAQPage + Service, Systems Audit has Service + Offer, articles have Article + FAQPage.
- Owner copy: write to one owner in second person. Specific beats impressive. Never "AI-powered", "revolutionize", "unlock", "synergy". No promises about price or outcomes for a specific business. Answer the fear (confidentiality, employees, name, timeline) before the ask.
- GA4 events in `site.js`: `audit_form_submit`, `owner_call_booked` and `audit_call_booked` (only on the booked pages, i.e. a confirmed booking), `owner_call_click` / `audit_call_click` / `book_call_click` (link clicks), `guide_cta_click`, `email_click`. UTM parameters are kept in sessionStorage, copied into hidden form fields, and appended to every cal.com link.
- Never publish LHL Score point values, multiples, or pricing math. Say what we look at, not how we price.
- Breakpoints: 1024px, 768px, 480px.
- Local preview: `python -m http.server 8600` (port registered in the vault's `Projects/Ports.md`).
- Shared preview: `gh workflow run deploy.yml -R Little-Hammer-Labs/preview` publishes the `holdco-redesign` branch to https://new.littlehammerlabs.com.
