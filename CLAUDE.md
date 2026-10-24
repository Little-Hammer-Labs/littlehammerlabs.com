# littlehammerlabs.com

Public site for Little Hammer Labs, LLC, a San Diego holding company that acquires owner-operated small businesses and rebuilds their back office around automation. The site's job, in priority order: get San Diego owners thinking about stepping back to book a call (`/owners/`), get owners who want a better-run office to book a Systems Audit (`/systems-audit/`), and be the page Google and AI assistants cite when a San Diego owner asks how to sell or step back (`/guides/`). Investors are third and the memo request is on hold until securities counsel signs off.

Repositioned October 2026 from an AI-consultancy site, then toward owners on October 23, 2026 from Max's brief. `ASSUMPTIONS.md` lists every number and claim not yet confirmed by a founder; clear it before publishing.

## Stack

- Static HTML, one shared `styles.css`, one small `site.js`. No framework, no build step, no npm.
- GitHub Pages with custom domain (`CNAME`). Push to `main` deploys.
- Fonts from Google Fonts: Newsreader (display serif) and Inter (body).
- The Systems Audit form posts to Formspree (`systems-audit/index.html`). Endpoint ID lives in the form `action`; until it is set, `site.js` falls back to a prefilled mailto.
- GitHub Pages runs Jekyll by default, so folders starting with `_` (like `_templates/`) are not published.

## Structure

```
index.html              Home: pitch, owner band, model, why, playbook summary, proof, people, investor note
owners/                 Seller page: four ways to work with us, what you can count on, process, fit, FAQ (FAQPage schema)
systems-audit/          Free audit offer: what you get, who it's for, proof, form (Service + Offer schema)
systems-audit/thanks/   Form redirect target with the cal.com booking link (noindex)
guides/                 Article index (noindex until the first article ships)
guides/<slug>/          Articles, one folder each, built from _templates/guide.html
_templates/guide.html   Article template (Article + FAQPage schema, author box, one CTA). Not published.
thesis/                 Criteria, what we avoid, why now, holdco structure
playbook/               Ninety-day operating plan, rules, tool kit, DGA proof
portfolio/              Empty state + pipeline + pointer to /owners/
investors/              The case, process, risks; memo request on hold, no form
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
- Nav: Thesis · Playbook · Portfolio · Guides · For owners (button). Investors is footer-only on purpose.
- San Diego is named explicitly on every owner-facing page, not only "Southern California".
- Every page carries the Organization JSON-LD; subpages add BreadcrumbList. Owners has FAQPage + Service, Systems Audit has Service + Offer, articles have Article + FAQPage.
- Owner copy: write to one owner in second person. Specific beats impressive. Never "AI-powered", "revolutionize", "unlock", "synergy". No promises about price or outcomes for a specific business. Answer the fear (confidentiality, employees, name, timeline) before the ask.
- GA4 events in `site.js`: `owner_call_booked`, `audit_form_submit`, `audit_call_booked`, `guide_cta_click`, `email_click`, plus `book_call_click` elsewhere. UTM parameters are kept in sessionStorage and copied into hidden form fields.
- Breakpoints: 1024px, 768px, 480px.
- Local preview: `python -m http.server 8600` (port registered in the vault's `Projects/Ports.md`).
- Shared preview: `gh workflow run deploy.yml -R Little-Hammer-Labs/preview` publishes the `holdco-redesign` branch to https://new.littlehammerlabs.com.
