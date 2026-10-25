# 🚀 Come avviare CVPyrites (guida a prova di scemo)

CVPyrites è un sito web che gira **solo sul tuo computer**. Non c'è niente da installare
"come programma": si accende un piccolo server locale e lo si apre nel browser.
I tuoi CV restano salvati **dentro il browser**, non vanno da nessuna parte.

---

## ✅ PARTE 1 — Controllo iniziale (si fa una volta sola)

### 1. Hai Node.js?

1. Premi il tasto **Windows**, scrivi `cmd` e premi **Invio**. Si apre una finestra nera.
2. Scrivi questo e premi **Invio**:

   ```
   node -v
   ```

3. Guarda cosa risponde:
   - Se esce qualcosa tipo **`v20.x.x`** o **`v22.x.x`** → perfetto, vai al punto 2.
   - Se esce **`v18.18`** o più alto → va bene lo stesso.
   - Se dice **"node non è riconosciuto come comando…"** → Node non c'è. Installalo:
     1. Vai su **https://nodejs.org**
     2. Scarica la versione **LTS** (il bottone verde a sinistra).
     3. Installala cliccando sempre **Avanti / Next** senza cambiare niente.
     4. **Chiudi** la finestra nera e **riaprila** (importante!), poi riprova `node -v`.

### 2. Installa i "pezzi" del progetto

> Questo serve solo la **prima volta**, oppure se la cartella `node_modules` sparisce,
> oppure se qualcosa si è rotto. Se la cartella `node_modules` c'è già, puoi saltarlo
> (ma rifarlo non fa mai male).

1. Apri la cartella del progetto in Esplora File:
   `C:\Users\Yorick\Documents\CVPyrites`
2. Clicca sulla **barra dell'indirizzo** in alto (dove c'è scritto il percorso),
   cancella tutto, scrivi `cmd` e premi **Invio**.
   → Si apre la finestra nera **già posizionata nella cartella giusta**. 🎯
3. Scrivi e premi **Invio**:

   ```
   npm install
   ```

4. Aspetta. Scorrerà un sacco di testo per un minuto o due. Alla fine torna il cursore.
   - Le scritte gialle `WARN` / `deprecated` → **ignorale**, sono normali.
   - Se compare `ERR!` in rosso → vedi la sezione **"Se qualcosa va storto"** in fondo.

---

## ▶️ PARTE 2 — Avviarlo (si fa ogni volta)

1. Apri la cartella `C:\Users\Yorick\Documents\CVPyrites`.
2. Barra dell'indirizzo → scrivi `cmd` → **Invio** (come sopra).
3. Scrivi e premi **Invio**:

   ```
   npm run dev
   ```

   *(È la stessa cosa che avevi scritto nel file `avvoare.txt` 😉)*

4. Dopo qualche secondo vedrai una cosa del genere:

   ```
   VITE v5.x.x  ready in 800 ms

   ➜  Local:   http://localhost:5173/
   ```

5. Apri il browser (Chrome, Edge, Firefox…) e vai su:

   ### 👉 http://localhost:5173

   (oppure tieni premuto **Ctrl** e clicca sul link nella finestra nera)

6. Fatto. Ora puoi creare/modificare i CV. 🎉

### ⚠️ IMPORTANTE

- **NON chiudere la finestra nera** finché stai usando il programma.
  Se la chiudi, il sito smette di funzionare (la pagina non si carica più).
- Puoi ridurla a icona, quello sì.

---

## ⏹️ PARTE 3 — Spegnerlo

Quando hai finito:

- clicca nella finestra nera e premi **Ctrl + C** (se chiede `Terminare il processo batch (S/N)?` scrivi `S` e Invio),
- oppure semplicemente **chiudi la finestra nera** con la X.

I tuoi CV **non si perdono**: sono salvati nel browser.

---

## 💾 Dove sono finiti i miei CV? (leggere, è importante)

I CV sono salvati **dentro il browser**, legati all'indirizzo `http://localhost:5173`. Quindi:

- ✅ Usa **sempre lo stesso browser** (es. sempre Chrome). Se apri con Edge non li vedi.
- ✅ Usa **sempre l'indirizzo `localhost:5173`**. Se il programma parte su un'altra porta
  (es. `5174`, perché la 5173 era occupata) i CV sembreranno spariti → chiudi tutte
  le finestre nere aperte e rilancia `npm run dev`, così torna su 5173.
- ❌ Se fai "Cancella dati di navigazione / cookie e dati dei siti", **i CV vengono cancellati**.
- ❌ Le finestre in **incognito** non salvano niente.

👉 **Consiglio:** ogni tanto **esporta il CV in JSON** (dal menu di esportazione dell'app)
e tienilo in una cartella. È il tuo backup: si reimporta in un attimo.

---

## 📄 Come esportare il CV in PDF

1. Nell'app usa il bottone di esportazione → **PDF**. Si apre la finestra di stampa del browser.
2. Come **Destinazione** scegli **"Salva come PDF"**.
3. In **Altre impostazioni**:
   - **Margini** → **Nessuno** (o Predefiniti)
   - spunta **Grafica di sfondo** ✅
4. **Salva**.

C'è anche l'esportazione in **Word (.docx)** se ti serve.

---

## 🆘 Se qualcosa va storto

| Problema | Soluzione |
| --- | --- |
| `node` o `npm` "non è riconosciuto come comando" | Node.js non è installato (o hai aperto la finestra nera prima di installarlo). Vedi Parte 1, punto 1. Dopo l'installazione **chiudi e riapri** la finestra nera. |
| `npm run dev` dice `Missing script: "dev"` o `Could not read package.json` | Sei nella cartella sbagliata. Riapri la finestra nera dalla barra dell'indirizzo di `C:\Users\Yorick\Documents\CVPyrites` (Parte 2, punto 2). |
| Errore tipo `Cannot find module…` / `vite non è riconosciuto` | Mancano i pezzi: lancia `npm install`, poi di nuovo `npm run dev`. |
| `npm install` dà errori `ERR!` strani | Cancella la cartella `node_modules` (e se vuoi anche il file `package-lock.json`), poi rilancia `npm install`. |
| Il browser dice "Impossibile raggiungere il sito" | La finestra nera è chiusa o il programma non è partito. Rilancia `npm run dev` e lasciala aperta. |
| Parte su `localhost:5174` invece di `5173` | C'è già un'altra finestra nera con il programma acceso. Chiudile tutte e rilancia. |
| I miei CV sono spariti! | Stesso browser? Stesso indirizzo `localhost:5173`? Non in incognito? Vedi la sezione "Dove sono finiti i miei CV?". |
| PowerShell dice qualcosa su "esecuzione di script disabilitata" | Stai usando PowerShell invece di cmd. Usa **cmd** come spiegato sopra (scrivi `cmd` nella barra dell'indirizzo). |

---

## 🧾 Riassunto ultra-breve (per la prossima volta)

1. Cartella `CVPyrites` → barra dell'indirizzo → `cmd` → Invio
2. (solo la prima volta) `npm install`
3. `npm run dev`
4. Browser → **http://localhost:5173**
5. Non chiudere la finestra nera finché lavori. Fine.

---

<sub>Extra per curiosi — altri comandi disponibili: `npm run build` (crea la versione
"definitiva" nella cartella `dist/`, serve solo se vuoi pubblicarla online, vedi `DEPLOY.md`),
`npm run preview` (prova la versione definitiva in locale). Per usare il programma non servono.</sub>
