# littlehammerlabs.com

Company marketing website for Little Hammer Labs.

Hub docs: `~/LHL-Knowledge-Hub/hub/projects/website/`

## Stack

- Static HTML/CSS/JS — no framework, no build step
- Hosted on GitHub Pages with custom domain (CNAME: `littlehammerlabs.com`)
- Single shared `styles.css` at root
- No npm, no bundler, no SPA

## Project Structure

```
index.html              # Homepage
styles.css              # Global stylesheet
CNAME                   # GitHub Pages custom domain
robots.txt              # Crawl directives
manifest.json           # PWA manifest
logo.html               # SVG logo generator (internal tool)
assets/
  images/               # Site images (webp preferred, jpeg/png fallback)
  favicons/             # Favicon sets (png + webp variants)
casestudy/
  dga/index.html        # DGA case study
  knowledge-hub/index.html
contentgen/             # Content generation tool pages (internal)
propertymanagement/     # Property management service page
webdesign/              # Web design service page
privacy/                # Privacy policy
terms/                  # Terms of service
.github/workflows/      # CI: claude-code-review.yml, claude.yml
```

## Commands

```bash
# Local dev server
python3 -m http.server 8000

# Then open http://localhost:8000
```

No build, lint, or test commands — it's static HTML.

## Deployment

Push to `main` — GitHub Pages auto-deploys via the CNAME file.
No CI build step required. Changes are live within minutes.

## Key Conventions

- **Responsive breakpoints**: 1024px (tablet), 768px (mobile), 480px (small)
- **Visual style**: "Refined Dark" — no animated orbs, shimmer, or canvas effects
- **Brand colors**: `--orange: #e85a2c`, `--dark: #0f1923`, `--white: #ffffff`
- **Border radius**: `--radius: 14px`
- **Font**: `'Inter', sans-serif`
- **Service pages**: Each in its own subdirectory with `index.html`; use `../` relative paths for shared assets (styles.css, images)
- **Images**: Prefer `.webp` format; keep `.png`/`.jpeg` as fallback only
- **No JavaScript frameworks** — vanilla JS only, minimal usage

## SEO & Content

For page strategy, SEO keywords, copy direction, and architecture details,
search QMD or read the hub docs linked above.
