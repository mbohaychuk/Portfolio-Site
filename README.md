# Portfolio site

Source for my personal portfolio. Vanilla HTML, CSS, and JS — no build step.

## Layout

```
index.html           Landing page (hero, about, project grid, contact)
projects/*.html      One detail page per project
css/styles.css       All styles (design tokens in :root)
js/main.js           Mobile nav, smooth scroll, scroll-reveal, active-nav
images/              Per-project screenshots, og-card, media
favicon.svg          Site icon
deploy/publish.sh    FTP publish script (see Deployment)
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

The site is a static bundle (HTML/CSS/JS plus `images/` and `favicon.svg`), served at
**[mark.bohaychuk.com](https://mark.bohaychuk.com)**. Deploying is a file copy: upload the
repository root to the web host's document root. `deploy/publish.sh` does this over FTP —
copy `deploy/.env.example` to `deploy/.env`, fill in the host credentials, and run it.
There is no build step and no server-side code.

## Adding a project

1. Drop screenshots in `images/<project-slug>/`.
2. Copy an existing file in `projects/` as a starting point and edit the content.
3. Add a new `<article class="project-card">` to the projects grid in `index.html` pointing to the new page.
