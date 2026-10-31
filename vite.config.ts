import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'node:path'
import type { Plugin } from 'vite'

// CVPyrites: GitHub Pages serves the app from /<repo>/ — the deploy workflow sets
// BASE_PATH (e.g. "/CVPyrites/"). Locally and on Cloudflare it stays "/".
const base = process.env.BASE_PATH || '/'

// Hosts that can't send HTTP headers (GitHub Pages) get the CSP from
// public/_headers as a <meta> tag instead (minus frame-ancestors, which only
// works as a header). Keeps the "no external requests" guarantee there too.
const cspMeta = (): Plugin => ({
  name: 'cvpyrites-csp-meta',
  apply: 'build',
  transformIndexHtml: (html) =>
    process.env.CSP_META
      ? html.replace(
          '<meta charset="UTF-8" />',
          `<meta charset="UTF-8" />\n    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; connect-src 'self'; worker-src 'self' blob:; manifest-src 'self'; object-src 'none'; base-uri 'none'; form-action 'none'; upgrade-insecure-requests" />`,
        )
      : html,
})

// https://vitejs.dev/config/
export default defineConfig({
  base,
  plugins: [
    react(),
    cspMeta(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      includeAssets: ['favicon.svg', 'icon.svg'],
      manifest: {
        id: base,
        name: 'CVPyrites — Free Open-Source Resume Builder',
        short_name: 'CVPyrites',
        description: 'Free, open-source, 100% local resume builder. 38 ATS-ready templates, a built-in ATS score, PDF résumé import, and PDF / Word / JSON export — no account, fully offline.',
        categories: ['productivity', 'business', 'utilities'],
        theme_color: '#d4982f',
        background_color: '#0b0f1a',
        display: 'standalone',
        start_url: base,
        scope: base,
        icons: [
          { src: `${base}icon.svg`, sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
          // Concrete PNG sizes — required before Chrome offers "Install app".
          { src: `${base}icon-192.png`, sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: `${base}icon-512.png`, sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: `${base}icon-512.png`, sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // Fonts are self-hosted, so they precache via the woff2 glob below — no
        // third-party runtime caching is needed. The app contacts no external host.
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff,woff2}'],
        // OCR engine assets (tesseract worker/core/traineddata, ~10MB) are only
        // needed when a user imports a scanned PDF — keep them OUT of the precache
        // so first load stays lean; they fetch on demand, same-origin, from /ocr/.
        globIgnores: ['**/ocr/**'],
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
        navigateFallback: `${base}index.html`,
        // The print route renders client-side; never serve the SPA shell for it from cache wrongly.
        navigateFallbackDenylist: [new RegExp(`^${base}print/`)],
      },
      // Keep the dev server untouched; the service worker only ships in builds.
      devOptions: { enabled: false },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    open: false,
  },
  build: {
    target: 'es2021',
    sourcemap: false,
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          editor: ['@tiptap/react', '@tiptap/starter-kit'],
          dnd: ['@dnd-kit/core', '@dnd-kit/sortable', '@dnd-kit/utilities', '@dnd-kit/modifiers'],
          motion: ['framer-motion'],
        },
      },
    },
  },
})
