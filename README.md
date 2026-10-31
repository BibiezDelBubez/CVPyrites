<div align="center">

<img src="public/icon.svg" width="88" alt="Logo di CVPyrites" />

# CVPyrites

Cos'è: un editor di curriculum che funziona direttamente nel browser.
È gratuito, non chiede di registrarsi e non manda i tuoi dati a nessuno.

### [Apri CVPyrites](https://bibiezdelbubez.github.io/CVPyrites/)

[English version](README.en.md)

</div>

## Come si usa

Apri il link qui sopra e comincia a scrivere. Non c'è niente da installare, nessun account da creare e niente da pagare. All'impaginazione, ai margini e al formato delle date pensa l'app.

## I tuoi dati

CVPyrites non ha un server. Quello che scrivi resta nel browser del tuo computer e non lo vede nessun altro. Un CV esce da lì solo se lo esporti tu.

Di conseguenza, se cancelli i dati del browser cancelli anche il CV. Ogni tanto salvane una copia in JSON dal pulsante Export. È anche il modo per portarlo su un altro computer.

## Cosa ci puoi fare

Puoi scrivere direttamente sul foglio, come in un normale documento, oppure dal pannello a sinistra se preferisci i campi da compilare. Tutto si salva da solo, e ogni modifica si può annullare con Ctrl+Z.

Il CV può essere in italiano o in inglese. Le date sono nello stile dell'Europass, le lingue si indicano con i livelli europei (dall'A1 al C2) insieme alle certificazioni, e c'è la sezione per l'autorizzazione al trattamento dei dati personali.

Per l'aspetto ci sono 38 modelli, e font, colori e margini si possono cambiare. Se il CV occupa più pagine, l'editor mostra dove finisce ognuna, esattamente come nel PDF.

C'è anche un controllo pensato per gli ATS, i programmi che molte aziende usano per fare una prima scrematura dei curriculum. Ti segnala cosa potrebbe metterli in difficoltà e, se incolli il testo di un annuncio, quali parole chiave mancano.

Se hai già un CV in PDF puoi importarlo e ripartire da lì. Alla fine lo esporti in PDF o in Word.

Per seguire le candidature c'è una bacheca dove spostarle man mano: da inviare, inviata, colloquio, offerta, rifiutata.

Volendo, puoi installarlo come un'app e usarlo anche senza connessione.

## Per sviluppatori

CVPyrites è scritto in TypeScript, con React e Vite, e gira tutto nel browser.

Per avviarlo sul tuo computer serve [Node.js](https://nodejs.org) 18.18 o più recente. Dalla cartella del progetto:

```bash
npm install
npm run dev
```

Poi apri http://localhost:5173. In [COME_AVVIARE.md](COME_AVVIARE.md) c'è una guida passo per passo.

Il sito si pubblica da solo su GitHub Pages ogni volta che fai push sul ramo `main`. Se fai un fork, devi solo attivare Pages una volta, da **Settings → Pages → Source → GitHub Actions**. Altri modi per pubblicarlo (Cloudflare, Netlify, Vercel) sono in [DEPLOY.md](DEPLOY.md).

## Ringraziamenti

CVPyrites è nato come fork di [CVAurum](https://github.com/akhil-dara/cvaurum) di [akhil-dara](https://github.com/akhil-dara) e oggi è sviluppato in modo indipendente. La licenza è la MIT, la stessa dell'originale: trovi i dettagli in [LICENSE](LICENSE).
