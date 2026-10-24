# Assumptions to confirm before this goes live

Everything below was drafted without a founder confirming it. Each item says where it appears so it can be changed or cut. Delete this file once reviewed.

## From Max's October 2026 brief: bracketed values used as written

These came from the brief in [brackets], meaning "confirm before publishing". They are on the preview as plain text so Max can see them in place.

| Value used | Where | Confirm |
|---|---|---|
| $100K to $750K owner earnings (SDE); "first acquisitions at the smaller end" | thesis (criteria), owners (fit, FAQ) | Final buy-box numbers |
| $250K to $2.5M enterprise value | thesis (criteria), investors (fact card) | |
| $500K to $3M revenue, 3+ years of steady earnings | owners (FAQ, fit), thesis | |
| 4 audits a month, free for everyone | systems-audit (meta, fact card, afterward) | Audit capacity and whether it's free for everyone |
| Audit is for businesses with 3+ employees | systems-audit (who it's for), Service schema | |
| Max's bio: born and raised in San Diego (Burlingame and South Park), licensed California real estate agent with a San Diego brokerage | home (people), guide template (author box) | DRE number is **omitted** until Max confirms the brokerage's advertising rules. Wording keeps LHL buying for its own account, never brokering for others |
| Ryan's bio unchanged | home (people) | Add a San Diego connection if true; confirm master's degree wording |
| LinkedIn company page `https://www.linkedin.com/company/little-hammer-labs/` | Organization schema `sameAs` on every page | Does this URL exist? Fix or remove |

## Booking links

| Link | Where | Status |
|---|---|---|
| `https://cal.com/max-lhl/30min?source=owners` | owners (hero, final band) | Existing 30-minute event reused as the "Owner conversation". The brief wants a dedicated event type with 3 intake questions; create it and swap the slug |
| `https://cal.com/max-lhl/systems-audit?source=audit` | systems-audit/thanks | **Does not exist yet.** Create a 45-minute "Systems Audit" event type with 3 intake questions, or change the slug |
| `https://cal.com/max-lhl/30min` | footers, investors thanks | Unchanged |

## Forms

- **Systems Audit form** (`systems-audit/index.html`) posts to `https://formspree.io/f/REPLACE_ME_AUDIT`. Create a Formspree form, paste the ID, and submissions land in contact@littlehammerlabs.com with a redirect to `/systems-audit/thanks/`, where the owner picks a time. Until then `site.js` turns a submit into a prefilled mailto, so the form is not dead, just clunky. UTM values arrive in hidden fields.
- **n8n webhook.** The brief wants every form submit and booking posted to an n8n webhook that creates, scores, and routes the lead. Formspree can forward to a webhook from its dashboard (Integrations), and cal.com has a webhook per event type. Both are dashboard settings, not site code.
- **Investor memo form** was removed from `investors/index.html` per the brief (securities counsel). `investors/thanks/` and the `memo-form` handler in `site.js` remain so it can come back with one revert.

## Numbers and claims carried over (still unconfirmed)

| Claim | Where | Change it if |
|---|---|---|
| Sectors: home and property services, field services, small B2B services, light professional services | thesis, owners, systems-audit | You have a narrower list |
| Capital stack: investor equity + seller note + SBA 7(a) | thesis, investors | You don't intend to use SBA debt. SBA 7(a) has ownership and personal-guarantee rules that constrain outside equity |
| Investor vehicle: holdco interests or deal-specific entity | thesis (structure), investors (fact card) | The securities-counsel question |
| "Max and Ryan put their own money in alongside investors and don't draw a management fee on the first deal" | investors (the case) | Not true, or you want a fee |
| Monthly operating updates to investors | investors (process) | |
| Ninety-day playbook with the week ranges; manager often from inside the business; manager bonus tied to dashboard | home, playbook | |
| Pipeline stage "Sourcing", last updated October 2026 | portfolio | Update by hand when a deal moves |
| "Straight answer in two weeks", "diligence and closing usually 60 to 90 days" | owners | |
| Formed California, 2025; LLC name | home fact card, schema.org | Check the Secretary of State filing |

## Numbers from the old site (real, but re-confirm with DGA for public use)

- 1,800 recordings transcribed in under an hour
- $20K+ estimated annual labor savings across roughly 10 to 12 projects
- 6 weeks from first conversation to production
- The principal's quote
- 11 nightly agents running LHL operations ("Eleven scheduled agents" on home and playbook): still true?

## Market claims kept qualitative on purpose

The thesis says "a large share of American small businesses are owned by people near retirement age" and "most have no succession plan" without numbers. If you want figures, the usual sources are the Exit Planning Institute's State of Owner Readiness survey and the Census Bureau's Annual Business Survey (owner age). Cite whichever you use.

## Guides

- `/guides/` is `noindex` and out of `sitemap.xml` until the first article exists. Flip both when it does (instructions at the top of `_templates/guide.html`).
- Article 6 (California taxes on a sale, installment sales) needs a CPA's review before publishing.
- The author box uses the founders photo cropped square. A headshot of Max would be better.

## Setup outside the repo

1. **Securities counsel.** The investor page now says "We'll share more when our first acquisition is under letter of intent" and has no form. Keep it that way until counsel picks a structure (Reg D 506(b) vs 506(c), California notice filing).
2. **Redirects.** GitHub Pages cannot send 301s. The old URLs (`/propertymanagement/`, `/webdesign/`, `/casestudy/dga/`, `/casestudy/knowledge-hub/`) now have meta-refresh stub pages. For true 301s add Cloudflare Redirect Rules (Rules → Redirect Rules) for the same four paths; then the stubs can be deleted.
3. **GA4.** Mark `owner_call_booked`, `audit_form_submit`, and `audit_call_booked` as key events. Create a segment for sessions whose source is chatgpt.com, claude.ai, perplexity.ai, or gemini.google.com to track AI referrals.
4. **Google Search Console.** Submit `sitemap.xml` after the merge; the preview deploy strips it and blocks crawlers on purpose.
5. **Photo.** The founders photo is the nighttime selfie. A daytime photo in front of a business, or two plain headshots, would do more on the owners page.
