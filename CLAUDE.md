# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static marketing website for Little Hammer Labs LLC (littlehammerlabs.com). No build tools, no package manager, no dependencies — just HTML, CSS, and minimal JS (scroll reveal + Google Analytics).

## Business Context

LHL is an AI consultancy focused on **Agentic Ops** — building and deploying autonomous AI agents that handle multi-step business workflows (beyond basic LLM chat interfaces).

- **Target market:** Property management (primary), AEC/architecture firms (secondary)
- **Differentiator:** Privacy-first approach with local/private LLM deployments — clients in data-sensitive industries can use AI without exposing data to public APIs
- **Infrastructure:** Hybrid model — local Mac Mini for orchestration, cloud GPU bursting for heavy compute
- **Agent framework:** Claude Agent SDK (Python)
- **Services:** Agentic Ops implementation, custom AI automation, local LLM deployment
- **Customers:** Diehl Group Architects (DGA) — custom AI transcription tool
- **Tone:** Professional, lean, technically credible but focused on business ROI

## Local Development

Run a local server to preview changes:
```bash
python3 -m http.server 8000
```
Then visit http://localhost:8000

## Deployment

Push to `main` branch — GitHub Pages auto-deploys to littlehammerlabs.com (custom domain via CNAME file).

## Architecture

Multi-page site sharing one stylesheet:
- **index.html** — Homepage with nav, hero, services, solutions, differentiators, customers, CTA, footer
- **propertymanagement/index.html** — Property management vertical landing page
- **webdesign/index.html** — Web design service landing page
- **logo.html** — Dedicated logo showcase page (uses `.logo-page` body class)
- **styles.css** — All styles using CSS custom properties (`:root` vars), grid/flexbox layout

Service pages live in subdirectories and use `../` relative paths for shared assets.

Key responsive breakpoints: ≤1024px (tablet), ≤768px (mobile), ≤480px (small mobile).

## Assets

- **assets/images/** — WebP primary with PNG fallbacks
- **assets/favicons/** — Both PNG and WebP variants in multiple sizes

## Conventions

- Brand colors defined as CSS vars: `--orange: #e85a2c`, `--dark: #111b27`, `--dark-mid: #1a2836`
- All pages include comprehensive SEO meta tags (Open Graph, Twitter Cards, Schema.org JSON-LD)
- Visual style: "Refined Dark" — dark theme with subtle grain texture, static gradient accents, no animated orbs or shimmer effects. Scroll reveal animations on elements entering viewport.
- Nav logo: 56px height desktop, 36px mobile
- DGA logo: uses light background pill (`rgba(255,255,255,0.1)`) for readability on dark backgrounds
- Performance: preload critical resources, minimal JS (scroll reveal only, no canvas animations)
- Contact email: contact@littlehammerlabs.com

## Web Design Pricing

| Tier | Price | Includes |
|------|-------|----------|
| Starter (Single Page) | $1,750 one-time | Custom single-page site, mobile responsive, basic SEO, 30-day support |
| Professional (Multi-Page) | $5,000 one-time | Up to 5 pages, custom design system, full SEO & analytics, 90-day support |
| Ongoing (Monthly Care) | $300/mo | Content updates, performance monitoring, design refreshes, priority support |
| Growth Bundle (Web + AI Agents) | $8,500 one-time | Custom multi-page website, 1 AI-powered workflow, website & agent integration, 90-day priority support |
