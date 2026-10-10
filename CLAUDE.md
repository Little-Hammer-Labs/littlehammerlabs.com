# littlehammerlabs.com

Public site for Little Hammer Labs, LLC, a California holding company that acquires owner-operated small businesses and rebuilds their back office around automation. The site's job is to get accredited investors to request the investor memo, and secondarily to get business owners to get in touch.

Repositioned October 2026 from an AI-consultancy site. `ASSUMPTIONS.md` lists every number and claim drafted without founder input; clear it before publishing.

## Stack

- Static HTML, one shared `styles.css`, one small `site.js`. No framework, no build step, no npm.
- GitHub Pages with custom domain (`CNAME`). Push to `main` deploys.
- Fonts from Google Fonts: Newsreader (display serif) and Inter (body).
- Form posts to Formspree (`investors/index.html`). Endpoint ID lives in the form `action`.

## Structure

```
index.html              Home: pitch, model, why, playbook summary, proof, people, investor band
thesis/                 Criteria, what we avoid, why now, holdco structure
playbook/               Ninety-day operating plan, rules, tool kit, DGA proof
portfolio/              Empty state + pipeline + "sell us your business"
investors/              The case, process, risks, qualification form
investors/thanks/       Form redirect target (noindex)
privacy/  terms/        Legal (noindex)
404.html                Custom not-found; old consultancy URLs land here
styles.css  site.js     Shared
sitemap.xml  robots.txt  manifest.json
assets/images/          logo-lockup.* (nav/footer), logo-mark.webp, og.png, founders.jpeg, lhlfull.* (source logo)
```

## Conventions

- Visual style: editorial and light. Cream background sampled from the logo, serif headlines, one orange accent. No gradients, glows, shadows, rounded cards, scroll animations, or icon grids.
- Copy: plain declarative sentences, concrete nouns, no em-dashes in body text, no marketing adjectives. Say what the company does and does not do.
- Never state or imply a return. Every page footer carries the no-offer disclaimer; keep it.
- Each page repeats the full nav and footer. When you change one, change all seven.
- Breakpoints: 1024px, 768px, 480px.
- Local preview: `python -m http.server 8600` (port registered in the vault's `Projects/Ports.md`).
