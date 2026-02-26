# littlehammerlabs.com

For page strategy, SEO, assets, and architecture details,
search QMD or read `hub/projects/website.md` in the Knowledge Hub.

## Development
```bash
python3 -m http.server 8000
```

## Deployment
Push to `main` — GitHub Pages auto-deploys (custom domain via CNAME).

## Key Conventions
- Responsive breakpoints: 1024px (tablet), 768px (mobile), 480px (small)
- Service pages in subdirectories, use `../` relative paths for shared assets
- Visual style: "Refined Dark" — no animated orbs, shimmer, or canvas effects
