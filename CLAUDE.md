# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static personal portfolio site for Mark Bohaychuk. Pure vanilla HTML/CSS/JS — no framework, no build step, no package manager, no tests.

## Running locally

Open `index.html` directly in a browser, or serve the directory with any static server (e.g. `python3 -m http.server`). There is nothing to build, install, or compile.

## Architecture

The site is a single landing page (`index.html`) plus one detail page per project under `projects/`. All pages share `css/styles.css` and `js/main.js`.

- **`css/styles.css`** — single global stylesheet. The design system lives in CSS custom properties on `:root` (colors, spacing scale `--spacing-xs`…`--spacing-2xl`, radii, shadows, transitions). Reuse these variables instead of hardcoding values. Two background gradients (`135deg, #667eea → #764ba2`) appear in `.hero`, `.project-image`, and `.project-header` — keep them in sync if changing brand colors.
- **`js/main.js`** — progressive enhancement only. A `DOMContentLoaded` handler wires up four features: smooth in-page scrolling, project-card hover/scroll animations (IntersectionObserver), and active-nav highlighting on scroll. The file also defines several **unused** functions (`initParallaxEffect`, `initLazyLoading`, `initTypingEffect`, `initContactForm`) kept as opt-in scaffolding — they are not called from `DOMContentLoaded`. Note that `.nav-links a.active` styles are injected from JS at the bottom of the file rather than living in `styles.css`.
- **`projects/*.html`** — each project detail page is a standalone HTML document that links back to `../css/styles.css` and `../js/main.js`. Use an existing project page as the template when adding a new one, and add a matching `.project-card` to `index.html`'s `.projects-grid`.

## Conventions

- Project detail pages live one directory deep, so asset paths use `../css/...` and `../js/...`.
- Section IDs (`#home`, `#projects`, `#contact`) are referenced by the smooth-scroll and active-nav logic in `main.js` — renaming them will silently break navigation highlighting.
- The README's "Customization Guide" documents the intended extension points (adding projects, swapping colors via CSS variables, replacing `.media-item.placeholder` divs with real `<img>`/`<video>`).
