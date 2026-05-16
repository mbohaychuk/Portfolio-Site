# Portfolio site

Source for my personal portfolio. Vanilla HTML, CSS, and JS — no build step.

## Layout

```
index.html           Landing page (hero, project grid, contact)
projects/*.html      One detail page per project
css/styles.css       All styles
js/main.js           Smooth scroll, scroll-triggered animations, active-nav
images/              Per-project screenshots and media
```

Each project card on `index.html` links to its detail page in `projects/`. Detail pages share the same stylesheet and a minimal back-to-index header.

## Local development

No build step. Open `index.html` directly in a browser, or serve the directory:

```sh
python3 -m http.server 8000
# then visit http://localhost:8000
```

A local server is recommended over `file://` so relative paths and any future fetches behave correctly.

## Deployment

Not currently deployed. Intended target is GitHub Pages or Netlify — push to a `gh-pages` branch / connect the repo and let it serve the root.

## Adding a project

1. Drop screenshots in `images/<project-slug>/`.
2. Copy an existing file in `projects/` as a starting point and edit the content.
3. Add a new `<article class="project-card">` to the projects grid in `index.html` pointing to the new page.
