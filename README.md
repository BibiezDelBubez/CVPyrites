<div align="center">

<img src="public/icon.svg" width="88" alt="Logo di CVPyrites" />

# CVPyrites

Editor di curriculum che funziona direttamente nel browser.
È gratuito, non chiede di registrarsi e non manda i tuoi dati a nessuno.

### [Apri CVPyrites](https://bibiezdelbubez.github.io/CVPyrites/)

</div>

CVPyrites nasce da [CVAurum](https://github.com/akhil-dara/cvaurum), un progetto open source
di [akhil-dara](https://github.com/akhil-dara), e ne mantiene tutte le funzioni. In più è
pensato per chi scrive un CV in Italia (formato Europass, livelli delle lingue secondo il
Quadro comune europeo, dichiarazione sulla privacy) e aggiunge alcune opzioni all'editor e
all'impaginazione del PDF.

## Le novità rispetto a CVAurum

### Per i CV italiani

- Il CV può essere in italiano o in inglese. Cambiano i titoli delle sezioni e le date, scritte
  come nell'Europass (`03/2021 – oggi`).
- Le lingue si indicano con i livelli del Quadro comune europeo, da A1 a C2, oppure come
  madrelingua. Si possono aggiungere le certificazioni con punteggio e anno (IELTS, TOEFL,
  DELE…) e il dettaglio di comprensione, parlato e scrittura.
- C'è una sezione apposta per l'autorizzazione al trattamento dei dati personali, con luogo,
  data e firma.
- Nella formazione c'è un campo per la tesi, l'indirizzo di studi e le borse di studio.
- L'importazione da PDF riconosce titoli, date e sezioni dei CV scritti in italiano.
- Chi ha lavorato o studiato all'estero trova indicazioni su come scriverlo (il Paese,
  l'Erasmus).
- Il controllo ATS considera anche i livelli delle lingue, le certificazioni e i dettagli
  della formazione.

### Nell'editor

- Il breve riassunto sotto ogni esperienza compare solo se lo aggiungi, con `+ riepilogo`.
- Corsi, parole chiave e competenze si spostano trascinandoli e si correggono con un clic,
  senza doverli cancellare e riscrivere.
- Una sezione eliminata non ricompare più in fondo al CV. Se l'hai tolta per sbaglio, c'è
  Annulla.

### Nel PDF e nel Word

- Ogni pagina ha i suoi margini, anche quando il CV occupa più pagine.
- Le pagine non restano mezze vuote. Un'esperienza lunga può continuare nella pagina dopo,
  ma solo tra un punto e l'altro; quelle brevi restano intere. Le linee di fine pagina che
  vedi nell'editor sono le stesse del PDF.
- Volendo, in fondo a ogni pagina compaiono il tuo nome e il numero di pagina
  (`Mario Rossi · 2/3`).
- Nel Word ci sono anche i corsi e i dettagli della formazione.

### Online

- L'app è pubblicata su GitHub Pages e si aggiorna da sola a ogni modifica del codice.

## Cosa viene da CVAurum

Tutto il resto è del progetto originale: 38 modelli tra cui scegliere, molti adatti ai
software ATS; la modifica direttamente sulla pagina; il controllo ATS, con il confronto tra
il CV e un annuncio di lavoro; l'importazione di un CV esistente in PDF, anche scansionato;
l'esportazione in PDF, Word e JSON; una bacheca per seguire le candidature; la possibilità
di installarla come app e usarla offline.

## I tuoi dati

CVPyrites non ha un server. I CV restano nel browser che usi e non vengono inviati a nessuno:
niente registrazione, niente cookie, niente statistiche. Per spostare un CV su un altro
computer, esportalo in JSON e importalo dall'altra parte.

## Usarla sul proprio computer

Serve [Node.js](https://nodejs.org) 18.18 o successivo. Dalla cartella del progetto:

```bash
npm install
npm run dev
```

Poi apri http://localhost:5173. Se è la prima volta, [COME_AVVIARE.md](COME_AVVIARE.md)
spiega tutto passo per passo.

## Pubblicarla online

A ogni push sul ramo `main`, GitHub costruisce e pubblica il sito da solo: se ne occupa il
file [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml). Se fai un
fork, basta attivare GitHub Pages una volta, da **Settings → Pages → Source → GitHub
Actions**. In [DEPLOY.md](DEPLOY.md) trovi anche come pubblicarla su Cloudflare, Netlify o
Vercel.

## Crediti e licenza

Motore, grafica e modelli sono di [CVAurum](https://github.com/akhil-dara/cvaurum), di
[akhil-dara](https://github.com/akhil-dara). CVPyrites è distribuito con la stessa licenza MIT
dell'originale: vedi [LICENSE](LICENSE).
