# Status: littlehammerlabs.com

## Current state
Redesigned on branch `holdco-redesign` (October 9, 2026), then repositioned toward owners on October 23, 2026 from Max's brief: owners page, Systems Audit page, guides section, investor memo flow on hold. Not yet merged. `main` still serves the old AI-consultancy site. The branch is published for review at https://new.littlehammerlabs.com (repo `Little-Hammer-Labs/preview`, which strips the sitemap and blocks crawlers on purpose); redeploy after pushing with `gh workflow run deploy.yml -R Little-Hammer-Labs/preview`.

## Pages
Home, For owners, Systems Audit (+ thanks), Guides (index only, noindex until the first article), Thesis, Playbook, Portfolio (empty state), Investors (holding copy, no form), Investors/Thanks (unused, kept), Privacy, Terms, 404. Redirect stubs at the four old consultancy URLs. Article template in `_templates/guide.html`.

## Before merging
- Review `ASSUMPTIONS.md` with Max: buy-box numbers, audit capacity, bio and DRE, LinkedIn company URL.
- Create the cal.com "Systems Audit" event (45 min) and swap the slug if different; optionally a dedicated "Owner conversation" event.
- Create the Formspree form for the audit and replace `REPLACE_ME_AUDIT` in `systems-audit/index.html`.
- Securities counsel on the investor page before any memo flow returns.
- Cloudflare redirect rules for the old URLs (or accept the meta-refresh stubs).

## Known issues
- Founders photo is a casual night shot; the guide author box crops it square. Replace when there is a better one.
- Audit form has no spam protection beyond a honeypot field. Add Formspree's reCAPTCHA if junk arrives.
- `/guides/` lists the ten planned titles but no articles yet.
