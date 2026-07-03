<div align="center">

# CVPyrites

### A fork of CVAurum, an open-source resume studio, with additions for job seekers in Italy.

**Build a beautiful, ATS-ready resume in your browser. 100% local, private, and free.**
**No account. No server. No tracking.**

### 🔗 [**Repo → github.com/BibiezDelBubez/CVPyrites**](https://github.com/BibiezDelBubez/CVPyrites)

`100% Client-Side` · `MIT Licensed` · `Node ≥ 18.18` · `Zero Backend`

</div>

---

> **Fork notice.** CVPyrites is a fork of [**CVAurum**](https://github.com/akhil-dara/cvaurum) by [akhil-dara](https://github.com/akhil-dara) — all credit for the original design, engine, and template library goes there. This fork adds a handful of features aimed at the **Italian job market**, starting with a **Closing Statement** section for the "autorizzo il trattamento dei dati personali" (GDPR/D.Lgs. 196-2003) declaration, with optional place / date / signature. See [Italian Market Additions](#-italian-market-additions) below.

CVPyrites is a beautiful, privacy-first resume builder that runs entirely in your browser. Pick from 38 premium templates, edit right on the page, get instant ATS feedback, tailor your resume to a job description, **import an existing PDF résumé**, and export a crisp PDF or an ATS-friendly Word document — all without an account, a server, or a single byte of tracking. Install it as an app and it works fully offline. Your data lives in your browser's IndexedDB and never leaves your machine unless **you** send it somewhere.

```bash
npm install && npm run dev
```

That's the entire setup. No Docker, no Postgres, no Redis, no headless Chromium. Just a Vite dev server and your browser.

---

## ✨ Why CVPyrites

A resume tool should be beautiful, private, and instant — without asking you to sign up, pay, or trust a server with your career history. CVPyrites is built around four ideas:

- **🎨 Design-first.** 38 hand-crafted templates with real typographic hierarchy, icon-chip section headings, and an auto-fit engine that keeps your resume looking sharp on a single page.
- **🔒 Private by architecture.** There is no backend. Your data lives only in your browser. Nothing is ever uploaded, logged, or tracked.
- **⚡ Instant to run, instant to use.** One command to start. Edit directly on the resume, drag sections around, undo/redo, and watch a live ATS score update as you type.
- **🧩 Yours to own.** 100% open source (MIT), built on the open JSON Resume schema, and easy to extend — adding a template is a config object and a CSS block.

---

## 📑 Table of Contents

- [Italian Market Additions](#-italian-market-additions)
- [Features](#-features)
- [Screenshots](#-screenshots)
- [Quick Start](#-quick-start)
- [Usage Highlights](#-usage-highlights)
  - [Templates](#templates)
  - [ATS Analysis & Job Tailoring](#ats-analysis--job-tailoring)
  - [Import & Export](#import--export)
  - [PDF Export](#pdf-export)
- [Privacy](#-privacy)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)
- [Acknowledgements](#-acknowledgements)

---

## 🇮🇹 Italian Market Additions

Features CVPyrites adds on top of upstream CVAurum, aimed at résumés built for Italy:

- **Closing Statement section** — a dedicated, reorderable section for the data-processing consent declaration Italian CVs conventionally close with (e.g. *"Autorizzo il trattamento dei miei dati personali… ai sensi del GDPR (Regolamento UE 2016/679)"*). Add it from **+ Add section** like any other. It has a rich-text statement field plus optional **place**, **date**, and an **uploaded signature image** — edited inline on the canvas or from the sidebar, exported to PDF and Word like every other section.
- **Editable Role Summary on Experience entries** — the per-role summary field (toggleable from a section's gear icon) is now reachable from the canvas even before it has content, matching how Location and other optional fields already behave.

---

## 🚀 Features

### 🎨 Templates & Design
- **38 premium, data-driven templates** — Aurum, Aurum Editorial, Swiss Aurum, Atelier, Harvard, Garamond, Aria, Oxford, Cambridge, Vector, Frost, Sterling, Vertex, Apex, Prism, Linen, Quartz, Lumière, Editorial, Marquee, Terminal, Nova, Scholar, Onyx, Cobalt, Academia, Verdant, Sienna, Newton, Deedy, Slate, Mercury, Halcyon, Graphite, Portrait, Spotlight, Mono, and Opal — each with icon-chip section headings and a refined type scale.
- Most templates are **ATS-safe** and flagged with a shield so you know which ones parse cleanly.
- **Full typography control:** separate body / heading / name fonts (**45 bundled, self-hosted fonts** — no CDN), font size, line-height, letter-spacing, accent colors, spacing, and margins.
- **Layout freedom:** two-column ↔ single-column, **A4 or US-Letter** page size, light / dark / system theme.

### 📝 Editing Experience
- **Edit directly on the resume** — click any text on the canvas (name, title, summary, company, bullets…) and type. Changes sync live to the form panel, undo/redo, and autosave. Prefer forms? Both work, always in sync.
- **Live WYSIWYG preview** on an A4 / US-Letter page with **page-break guides** and full multi-page support.
- **Rich text** (TipTap) for summaries and bullet points.
- **Drag-and-drop section reordering** (dnd-kit), show/hide sections, custom sections, and section renaming.
- **Visual "Add a section" gallery** — each section is shown as a **live preview rendered in your actual template**, so you see exactly how it will look before adding it.
- **Undo / redo** with `Ctrl+Z` / `Ctrl+Shift+Z` (powered by zundo).
- **Debounced autosave** to IndexedDB — your work is saved as you type.
- **Multi-resume dashboard:** create, duplicate, delete, and import resumes.
- **Job application tracker:** a drag-and-drop kanban board (Wishlist → Applied → Interview → Offer → Rejected) to manage your search.

### 📊 ATS & Job Tailoring
- **Deterministic ATS analysis** — instant, private, and **no LLM required**. Structural checks for contact info, summary, quantified bullets, action verbs, length, ATS-safe layout, and standard headings, plus an overall **ATS score**.
- **Live job-description tailoring:** paste a JD and instantly see **matched vs. missing keywords** and a **match score**.

### 📄 Import & Export
- **Import an existing PDF résumé** — drop in a PDF and CVPyrites reconstructs it into editable, structured sections (contact, experience, education, skills…) **entirely in your browser — nothing is uploaded.** Text-based PDFs work best; scanned / image-only PDFs are read with **on-device OCR** (self-hosted [Tesseract](https://github.com/naptha/tesseract.js), no cloud). Always give the result a quick review.
- **One-click PDF export** via the browser's native "Save as PDF" of a dedicated print route — **selectable, ATS-parseable text** (not a rasterized image), pixel-identical to the preview.
- **Word (.docx) export** — a clean, single-column, **ATS-friendly** Word document with real bullet lists, preserved bold, and your template's accent color and fonts. Generated entirely in your browser; nothing is uploaded.
- **Import & export JSON Resume files** — built on the [JSON Resume schema](https://jsonresume.org/schema) so your data round-trips with the wider ecosystem.

### 📲 Installable & Offline (PWA)
- **Install it like a native app** on desktop or mobile (Add to Home Screen / Install).
- **Works fully offline, zero external requests** — all 45 fonts are **bundled** and the whole app is precached by a service worker, so CVPyrites never contacts a third-party server (not even for fonts). Build resumes with no connection at all.

### 🔒 Privacy by Default
- No server, no account, no analytics, no tracking, no cookies. (More in [Privacy](#-privacy).)

---

## 📸 Screenshots

> _Run `npm run dev` to see it live. To populate this section, drop PNGs into `docs/screenshots/`
> (`editor.png`, `preview.png`, `templates.png`, `ats.png`) and uncomment the table below._

<!--
| Editor | Live Preview |
| --- | --- |
| ![Editor](docs/screenshots/editor.png) | ![Preview](docs/screenshots/preview.png) |

| Templates Gallery | ATS Analysis |
| --- | --- |
| ![Templates](docs/screenshots/templates.png) | ![ATS](docs/screenshots/ats.png) |
-->

A quick tour of what you get:

- **Dashboard** — your private resume library, all stored locally.
- **Editor** — left panel (Content · Design · Templates · ATS) with a live, paginated A4/Letter preview.
- **Templates gallery** — 38 templates rendered live with *your* content.
- **ATS panel** — an instant score plus a checklist and job-description keyword matching.

---

## ⚡ Quick Start

### Prerequisites
- **Node.js ≥ 18.18**
- A modern browser

That's it. No database, no Docker, no background services.

### Run it

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (http://localhost:5173)
npm run dev
```

Open **http://localhost:5173** and start building. CVPyrites makes **zero external network requests** — all 45 fonts are bundled with the app — so it works **fully offline** from the very first load and never contacts a third-party server.

### All scripts

| Command | What it does |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Start the Vite dev server on `http://localhost:5173` |
| `npm run build` | Typecheck + production build to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run format` | Run Prettier |

---

## 🧭 Usage Highlights

### Templates
Choose from **38 templates** and switch between them at any time — your content stays put while the design changes. ATS-safe templates are marked with a **shield** so you can pick a layout that parses cleanly through applicant tracking systems. Fine-tune fonts, colors, spacing, margins, and page size to make any template your own.

### ATS Analysis & Job Tailoring
The **ATS engine is fully deterministic** — it runs instantly, in your browser, with **no LLM and no network call**. It checks for the things real applicant tracking systems care about: contact details, a summary, quantified and action-verb-driven bullets, appropriate length, an ATS-safe layout, and standard section headings — then rolls everything into an overall **ATS score**.

Want to target a specific role? Paste the **job description** into the tailoring panel and CVPyrites highlights **matched vs. missing keywords** and gives you a live **match score** so you know exactly what to add.

### Import & Export
**Bring in an existing PDF résumé** — CVPyrites parses it into structured, editable sections right in your browser (the file is never uploaded). It detects columns, headings, dated entries, bullets, and contact details deterministically; **scanned or image-only PDFs fall back to on-device OCR** (a self-hosted Tesseract engine, loaded only when needed). PDF parsing is best-effort, so review the imported fields before you rely on them.

CVPyrites also speaks the **[JSON Resume schema](https://jsonresume.org/schema)**, with the app's visual metadata namespaced under `meta.cvaurum` (kept as-is from upstream for compatibility). That means you can:
- **Import** an existing JSON Resume file and keep editing.
- **Export** your resume as JSON Resume — exports **round-trip** with the JSON Resume ecosystem, and the `meta.cvaurum` namespace preserves your template, fonts, and layout choices.

Imports are validated with **Zod**, so bringing in a file is safe and predictable.

### PDF Export
CVPyrites exports via your browser's **native "Save as PDF"** on a dedicated print route, producing **real selectable text** that ATS systems can parse — not a flattened image. The output is pixel-identical to your live preview.

> **💡 PDF export tip:** In the browser's print dialog, set **Margins** to **None** (or **Default**) and enable **Background graphics**. This ensures your template's colors, accents, and spacing render exactly as they appear in the preview.

---

## 🔒 Privacy

Privacy isn't a feature bolted on — it's the architecture.

- **No server.** There's no backend to send your data to.
- **No account, no login.** Just open the app and start.
- **No analytics, no tracking, no cookies.**
- **Zero external requests.** Fonts are bundled, so the app contacts **no third-party server at all** — not even a font CDN. Nothing about you (not even your IP) is exposed to anyone.
- **All resume data is stored locally** in your browser's **IndexedDB** (via `idb-keyval`).
- **Clearing your site data deletes it** — you are always in full control.

Your resume data never leaves your browser unless **you** explicitly export it (as a PDF or a JSON file) or import a file you picked.

---

## 🛠 Tech Stack

Everything is **client-side**:

| Concern | Library |
| --- | --- |
| UI framework | **React 18** + **Vite** + **TypeScript** |
| Styling / theming | **Tailwind CSS v3** (design tokens, dark mode) |
| State | **Zustand** + **zundo** (undo/redo) |
| Drag & drop | **dnd-kit** |
| Animation | **Framer Motion** |
| Rich text | **TipTap** |
| Validation / safe import | **Zod** |
| Local persistence | **idb-keyval** (IndexedDB) |
| Word export | **docx** (in-browser .docx generation) |
| Offline / installable | **vite-plugin-pwa** (Workbox service worker) |
| Icons | **lucide-react** |
| Data contract | **JSON Resume schema** + app metadata under `meta.cvaurum` (namespace kept from upstream) |

---

## 🗂 Project Structure

```text
src/
├── types/        JSON Resume schema + metadata (Zod)
├── data/         fonts registry, sample resume, defaults
├── store/        Zustand stores (resume w/ undo-redo, app/settings, editor UI)
├── lib/          ats.ts (ATS engine), io.ts (import/export),
│                 pdf.ts (print), storage.ts (IndexedDB), sections.ts, utils
├── templates/    rendering engine (_shared/Artboard + section renderers),
│                 registry.ts (template configs), templates.css (per-template styling),
│                 TemplateRenderer
├── components/   editor/ (panels, field editors, dnd), preview/, ui/
├── routes/       Dashboard, EditorRoute, PrintPage, Tracker (job board)
└── styles/       artboard.css (resume base styles), print.css
```

---

## 🗺 Roadmap

Planned and under consideration:

- **More templates** _(ongoing)_
- **Sharper PDF import** — better reading order for dense two-column layouts, and a confidence/review pass on imported fields _(planned)_

✅ **Shipped:** local PDF résumé import (text + on-device OCR), Word (.docx) export, 38 templates, full offline PWA, Closing Statement section (Italian market).

Have an idea? Open an issue and let's talk.

---

## 🤝 Contributing

Contributions are welcome and appreciated! Whether it's a new template, a bug fix, docs, or a feature from the roadmap, we'd love your help.

- Browse the open issues to find something to work on.
- Run `npm run typecheck` and `npm run build` before opening a PR.
- See [`CONTRIBUTING.md`](./CONTRIBUTING.md) for full guidelines, and [`docs/TEMPLATES.md`](./docs/TEMPLATES.md) to add a template (the easiest way to contribute).

If you build something cool with CVPyrites, tell us about it!

---

## 📄 License

CVPyrites is released under the **MIT License**, same as upstream CVAurum. See [`LICENSE`](./LICENSE) for details.

---

## 🙏 Acknowledgements

- **[CVAurum](https://github.com/akhil-dara/cvaurum)** by [akhil-dara](https://github.com/akhil-dara) — the project this fork is built on. All the design system, rendering engine, and template library originate there.
- **[JSON Resume](https://jsonresume.org)** — for the open schema that makes the data portable and interoperable.
- The open-source community behind React, Vite, Tailwind, Zustand, dnd-kit, TipTap, and the many libraries that make this possible.

---

<div align="center">

**If CVPyrites helps you land an interview, consider giving the repo a ⭐ — it really helps.**

Built with care, for everyone job hunting. · [Report an issue](https://github.com/BibiezDelBubez/CVPyrites/issues) · [Star the repo](https://github.com/BibiezDelBubez/CVPyrites)

</div>
