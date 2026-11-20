# iTestEye.com

A collection of free, browser-based tools and reference pages for optometrists and small businesses, built as a static site with plain HTML, CSS and JavaScript. No build step, no framework, no backend.

**Live site:** [itesteye.com](https://itesteye.com)

---

## Tools and pages

### Optometry

| Page | What it does |
|------|--------------|
| `index.html` | **Spectacle ⇄ Contact Lens Calculator.** Vertex-distance compensated conversion of sphere, cylinder and axis in both directions. Power rounded to 0.25 D, axis to the nearest 10°. Includes ± steppers with press-and-hold, axis wrap-around (0–180), keyboard navigation and a copy-results button. |
| `more.html` | **Optometry Tools & Resources.** Tabbed reference: South African driving licence vision criteria and licence conversion info, visual acuity conversion chart (Snellen / decimal / LogMAR / near), prescription abbreviations and copyable symbols, WHO visual impairment classification, HPCSA contact lens prescription rules. |
| `codes.html` | **Optometry Tariff Codes.** Searchable, filterable list of tariff codes (effective 1 Jan 2020). Tap a row to copy its code. |
| `therapeutics.html` | **HPCSA approved medicines for optometrists.** Filterable table by registration category (I, D, T). Collapses to cards on phones. |

### Business and productivity

| Page | What it does |
|------|--------------|
| `invoice.html` | **Invoice Maker.** Editable invoice with logo upload, theme colours, A4 or Letter, multi-currency, tax, banking details and PDF export (html2pdf.js). State is saved in the browser. |
| `letter.html` | **Letter Generator.** Practice letters, work/school excuse letters, prescriptions and referrals, with live preview and print to PDF. Settings saved in the browser. |
| `poster.html` | **Poster Maker.** Quick text posters with gradient backgrounds, backdrop text or image, header and footer, exported as PNG or JPEG (html2canvas). |
| `profit.html` | **SA E-commerce Profit Calculator.** Landed cost (duty, import VAT, clearance), platform fees, marketing, net profit, margin, ROI and markup in ZAR. |
| `chromia.html` | **Chromia.** Colour harmony explorer. Pick a colour, get Classic, Modern and Neutral palettes. HEX, RGB and HSL input. |

### Other

| Page | What it does |
|------|--------------|
| `downloader.html` | Landing page for the **iTestEye Image Downloader**, a free Windows app that saves every image from a web page. |
| `about.html` | Link page and contact form. |
| `cv.html` | Online and print-ready CV. |
| `calc.html` | Redirects to the home page (legacy URL). |

---

## Project structure

```
.
├── index.html            # Spectacle ⇄ CL calculator (home)
├── more.html             # Resources and reference tabs
├── codes.html            # Tariff codes
├── therapeutics.html     # HPCSA medicines list
├── invoice.html
├── letter.html
├── poster.html
├── profit.html
├── chromia.html
├── downloader.html
├── about.html
├── cv.html
├── calc.html             # redirect
│
├── bg.css                # Shared static background (soft blue / green / yellow blobs, dark mode aware)
├── css/optometry.css     # Shared styles for the optometry pages
├── load.js               # Injects menu.js and footer.js on every page
├── menu.js               # Floating hamburger menu (glass style)
├── footer.js             # Bottom bar, home button, copyright, visit counter
│
├── CNAME                 # Custom domain for GitHub Pages
└── fav/site.webmanifest  # Web app manifest
```

Assets referenced by the pages but kept alongside them: `img/` (letter logos), `src/` (Chromia logo), `favicons/`, `profile.jpeg`, and `apps/iTestEye_Setup.zip` (the downloader installer).

### How the shared pieces fit together

- Every page includes `<script src="/load.js"></script>` at the end of `<body>`.
- `load.js` adds `menu.js` and `footer.js` from `https://itesteye.com/`, skipping any that are already on the page.
- `menu.js` injects its own CSS, loads Font Awesome and Barlow Condensed if missing, and builds the site menu. Add or reorder links in the `menuHTML` template there.
- `footer.js` adds the bottom bar, a home button and the copyright text. On `itesteye.com` only, it also shows a per-page visit count from a Cloudflare Worker.
- `bg.css` is linked after each page's own styles and gives all pages the same background. It follows `prefers-color-scheme` and a `data-theme` attribute, and hides itself when printing.

---

## Running locally

There is nothing to install. Because the pages use root-relative paths such as `/load.js` and `/css/optometry.css`, serve the repository from its root rather than opening files directly:

```bash
# Python
python -m http.server 8000

# or Node
npx serve .
```

Then open `http://localhost:8000`.

Note that `load.js` fetches `menu.js` and `footer.js` from the live `https://itesteye.com/` domain. To test changes to those two files locally, temporarily point the URLs in `load.js` at your local server.

---

## Deployment

The site is hosted on **GitHub Pages** with the custom domain `itesteye.com` (see `CNAME`), with DNS and caching through **Cloudflare**.

1. Push to the default branch.
2. GitHub Pages publishes the root of the repository.
3. If `menu.js` or `footer.js` change but the old version still shows, purge the Cloudflare cache. `footer.js` also versions its injected style tag (currently `v10`) to bust stale styles.

---

## Third-party libraries and services

Loaded from CDNs, nothing is bundled:

- [Font Awesome](https://fontawesome.com/) 6 for icons
- [Google Fonts](https://fonts.google.com/): Barlow Condensed, Share Tech Mono, Inter, Montserrat, Playfair Display, Pacifico and others
- [html2pdf.js](https://github.com/eKoopmans/html2pdf.js) (invoice export)
- [html2canvas](https://html2canvas.hertzen.com/) (poster export)
- [Tailwind CSS](https://tailwindcss.com/) play CDN and [Iconify](https://iconify.design/) (CV page only)
- [Web3Forms](https://web3forms.com/) for the contact forms on `about.html` and `cv.html`
- Cloudflare Web Analytics and a Cloudflare Worker for the visit counter

---

## Privacy notes

- The invoice and letter tools store their data only in your browser's `localStorage`. Nothing is uploaded to a server.
- Patient details in the letter generator can be cleared with the **Clear patient data** button.
- The visit counter records page-view counts only.

---

## Disclaimers

- The optometry calculators and reference pages are aids for qualified professionals. Always apply clinical judgement and check against lens manufacturer parameters and the official sources.
- Regulatory content (HPCSA rules, medicines list, tariff codes, driving licence criteria) is a convenience summary and can go out of date. Confirm against the official documents before relying on it.
- A valid sick note must be issued and signed by a medical practitioner registered with the HPCSA. The letter generator does not replace this.
- The Image Downloader should only be used for images you have the right to use.

---

## Contributing

Issues and suggestions are welcome. Open an issue, or send a pull request for small fixes. Please keep the no-build, plain HTML/CSS/JS approach.

## Contact

[info@itesteye.com](mailto:info@itesteye.com) · [Instagram](https://instagram.com/itesteye) · [TikTok](https://tiktok.com/@itesteye) · [YouTube](https://youtube.com/@itesteye) · [Facebook](https://facebook.com/itesteye)

---

© 2026 iTestEye.com. All rights reserved.
