# Assumptions to confirm before this goes live

Everything below was drafted without input from Max. Each item says where it appears so it can be changed or cut. Delete this file once reviewed.

## Numbers and claims I made up

| Claim | Where | Change it if |
|---|---|---|
| Target revenue $500K to $3M, 3+ years of history | thesis (criteria), portfolio (sell), home (why) | Your sourcing range differs |
| Target SDE $150K to $750K | thesis (criteria) | |
| Enterprise value $400K to $2.5M | thesis (criteria), investors (fact card) | |
| Sectors: home and property services, field services, small B2B services, light professional services | thesis (criteria) | You have a narrower or different list |
| Geography: Southern California first | thesis, portfolio, investors hero | |
| Capital stack: investor equity + seller note + SBA 7(a) | thesis, investors | You don't intend to use SBA debt. Note that SBA 7(a) has ownership and personal-guarantee rules that constrain outside equity, so check this with a lender before promising it |
| Investor vehicle: holdco interests or deal-specific entity | thesis (structure), investors (fact card) | Decide one. This is the securities-counsel question |
| "Max and Ryan put their own money in alongside investors and don't draw a management fee on the first deal" | investors (the case) | Not true, or you want a fee. This is a strong line for investors, so only keep it if you mean it |
| Memo sent within two business days | investors (process, form, thanks) | |
| Monthly operating updates to investors | investors (process) | |
| Ninety-day playbook with the week ranges | home, playbook | The phases are invented from how the automation work actually goes, but the timeline is a guess |
| "A general manager, often someone already in the business" | home, playbook | |
| Manager gets a bonus tied to dashboard numbers | playbook | |
| Pipeline stage is "Sourcing", last updated October 2026 | portfolio | Update by hand when a deal moves |
| Formed California, 2025 | home fact card, schema.org | Check the Secretary of State filing date |
| Ryan "is finishing a master's degree in spatial data science" | home (people) | |
| Max's bio: "business operations and process work" | home (people) | Carried over from the old site |

## Numbers carried over from the old site (real, but re-confirm with DGA)

- 1,800 recordings transcribed in under an hour
- $20K+ estimated annual labor savings across roughly 10 to 12 projects
- 6 weeks from first conversation to production
- The principal's quote
- 11 nightly agents running LHL operations

## Market claims I kept qualitative on purpose

The thesis says "a large share of American small businesses are owned by people near retirement age" and "most have no succession plan" without numbers. If you want figures, the usual sources are the Exit Planning Institute's State of Owner Readiness survey and the Census Bureau's Annual Business Survey (owner age). Cite whichever you use; investors check.

## Setup needed

1. **Form endpoint.** `investors/index.html` posts to `https://formspree.io/f/REPLACE_ME`. Create a Formspree form (free tier is 50 submissions a month), paste the ID, and submissions land in contact@littlehammerlabs.com with a redirect to `/investors/thanks/`. Until then `site.js` turns a submit into a prefilled mailto, so the form is not dead, just clunky.
2. **Securities counsel.** The site invites accredited investors to request a memo. That is general solicitation. Under Reg D Rule 506(c) it is allowed if you take reasonable steps to verify accredited status before anyone invests, and California has its own notice filing. Thirty minutes with a securities attorney before this is pushed to main.
3. **Photo.** The founders photo is the nighttime selfie from the old site. It is real and that counts for something, but a daytime photo in front of a business, or two plain headshots, would do more for an investor page.
4. **Old URLs.** `/propertymanagement/`, `/webdesign/`, and `/casestudy/*` now return the custom 404. If any of them have inbound links worth keeping, add a meta-refresh redirect page at the old path.
5. **GA4.** Conversion events are `investor_memo_request` (form submit), `investor_memo_submitted` (thanks page load), and `book_call_click`. Mark the first two as key events in the GA4 property.
