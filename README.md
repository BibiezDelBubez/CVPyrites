<div align="center">

<img src="public/icon.svg" width="88" alt="Logo CVPyrites" />

# CVPyrites

**Crea il tuo CV nel browser: gratis, senza account, e i dati non lasciano mai il tuo computer.**

### [▶ Apri l'app — bibiezdelbubez.github.io/CVPyrites](https://bibiezdelbubez.github.io/CVPyrites/)

</div>

CVPyrites è un fork di [CVAurum](https://github.com/akhil-dara/cvaurum) di
[akhil-dara](https://github.com/akhil-dara), adattato ai **CV per il mercato italiano** e a un
uso più comodo dell'editor e dei PDF. Non serve installare niente: si apre il link e si inizia.

## Cosa aggiunge rispetto a CVAurum

**CV in italiano**
- **Lingua del CV** (italiano / inglese): titoli delle sezioni e date in stile Europass (`03/2021 – oggi`).
- **Lingue in formato QCER**: livello A1–C2 o madrelingua, certificazioni con punteggio e anno
  (IELTS, TOEFL, DELE…), dettaglio Europass (comprensione · parlato · scrittura), pallini facoltativi.
- **Dichiarazione privacy** (GDPR) come sezione a sé, con luogo, data e firma.
- **Istruzione con campo Dettagli** per tesi, indirizzo di studi e borse.
- **Import PDF** che riconosce titoli, date e sezioni dei CV italiani.
- Suggerimenti per **esperienze e studi all'estero** (Paese, Erasmus).
- L'**analisi ATS** conta anche livelli linguistici, certificazioni e dettagli dell'istruzione.

**Editor più comodo**
- **Riepilogo del ruolo** solo dove serve, con il pulsante `+ riepilogo`.
- **Corsi, keyword e competenze** si riordinano trascinandoli e si modificano con un clic.
- Le **sezioni eliminate** spariscono davvero dal CV, e restano recuperabili con Annulla.

**PDF e Word**
- **Margini su ogni pagina**, non solo all'inizio e alla fine del documento.
- **Impaginazione senza buchi**: un'esperienza lunga continua alla pagina dopo tra un punto
  e l'altro, le voci brevi restano intere, e le linee "Page 2", "Page 3" dell'editor
  coincidono con il PDF.
- **Numeri di pagina** facoltativi (`Nome · 2/3`), solo sui CV di più pagine.
- L'export **Word** include anche dettagli e corsi dell'istruzione.

**Pubblicazione**
- Sito su **GitHub Pages**, aggiornato automaticamente a ogni push.
- Logo e anteprima dei link propri.

## Cosa c'era già in CVAurum

- **38 template**, molti pensati per i software ATS, con font, colori e spaziature regolabili.
- **Modifica direttamente sulla pagina**, con anteprima A4 / Letter, annulla/ripeti e salvataggio automatico.
- **Analisi ATS** istantanea e confronto con il testo di un annuncio (parole chiave trovate e mancanti).
- **Import di un CV in PDF**, anche scansionato (OCR nel browser).
- **Export** in PDF (testo selezionabile), Word e JSON ([JSON Resume](https://jsonresume.org)).
- **App installabile** che funziona anche offline, e un **tracker delle candidature**.

## Privacy

Non c'è un server: i CV sono salvati nel browser di chi usa l'app (IndexedDB) e non vengono
inviati a nessuno. Niente account, cookie o statistiche. Per spostare un CV su un altro
computer o browser lo esporti in JSON e lo reimporti.

## Avviarla sul tuo computer

Serve [Node.js](https://nodejs.org) 18.18 o più recente.

```bash
npm install
npm run dev
```

Poi apri http://localhost:5173. Guida passo passo per Windows: [COME_AVVIARE.md](COME_AVVIARE.md).

## Pubblicarla

Il workflow [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) pubblica
il sito su GitHub Pages a ogni push su `main`. Su un tuo fork basta attivarlo una volta:
**Settings → Pages → Source: GitHub Actions**. Altre opzioni (Cloudflare, Netlify, Vercel)
in [DEPLOY.md](DEPLOY.md).

## Crediti e licenza

Il motore, il design e i template vengono da [CVAurum](https://github.com/akhil-dara/cvaurum)
di [akhil-dara](https://github.com/akhil-dara). Licenza **MIT**, come l'originale: vedi [LICENSE](LICENSE).
