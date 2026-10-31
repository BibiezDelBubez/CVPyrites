<div align="center">

<img src="public/icon.svg" width="88" alt="CVPyrites logo" />

# CVPyrites

A résumé editor that lives entirely in your browser.
It's free, it doesn't ask you to sign up, and it never sends your data anywhere.

### [Open CVPyrites](https://bibiezdelbubez.github.io/CVPyrites/)

[Versione italiana](README.md)

</div>

## Getting started

Open the link above and start typing. There's nothing to install, no account to create, and nothing to pay. The app takes care of layout, margins and date formatting.

## Your data

CVPyrites has no server. Whatever you write stays in your browser, on your computer, and nobody else can see it. A résumé only leaves when you export it.

This also means that clearing your browser data deletes your résumé. Every now and then, save a JSON copy with the Export button. That's also how you move it to another computer.

## What you can do with it

Type straight onto the page, like any document, or use the panel on the left if you'd rather fill in fields. Everything saves automatically, and any change can be undone with Ctrl+Z.

It was built with the Italian job market in mind, so it speaks Europass: Italian-style dates, language levels from A1 to C2 with your certificates, and the data-protection consent statement Italian employers expect. It works just as well for a résumé in English.

There are 38 templates, and fonts, colors and margins can all be adjusted. If your résumé runs over more than one page, the editor shows where each page ends, exactly as in the PDF.

There's also a check for ATS, the software many companies use to screen résumés before a human ever sees them. It points out what might trip it up and, if you paste in a job ad, which keywords you're missing.

Already have a résumé as a PDF? Import it and pick up from there. When you're done, export it as PDF or Word.

To keep track of your applications, there's a board where you move them along: wishlist, applied, interview, offer, rejected.

You can also install it as an app and use it offline.

## For developers

CVPyrites is written in TypeScript with React and Vite, and runs entirely client-side.

To run it locally you need [Node.js](https://nodejs.org) 18.18 or newer. From the project folder:

```bash
npm install
npm run dev
```

Then open http://localhost:5173. A step-by-step guide (in Italian) is in [COME_AVVIARE.md](COME_AVVIARE.md).

The site publishes itself to GitHub Pages on every push to `main`. If you fork it, you only need to switch Pages on once, under **Settings → Pages → Source → GitHub Actions**. Other ways to host it (Cloudflare, Netlify, Vercel) are in [DEPLOY.md](DEPLOY.md).

## Credits

CVPyrites started as a fork of [CVAurum](https://github.com/akhil-dara/cvaurum) by [akhil-dara](https://github.com/akhil-dara) and is now developed independently. It's MIT-licensed, just like the original: see [LICENSE](LICENSE).
