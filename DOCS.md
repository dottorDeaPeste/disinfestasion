# Documentazione — Disinfestazione Venezia (GDPR + SEO)

## Cookie & Consenso
- **Barra inferiore non intrusiva** con pulsanti **Accetta**, **Rifiuta**, **Impostazioni**.
- **Pannello preferenze**: categorie attive in questa build
  - Necessari (sempre attivi)
  - Mappe (Google Maps) → disattive finché non c’è consenso
- Scelte salvate in `localStorage` (`cookieConsentV2`).

### Come aggiungere altri servizi (es. Analytics)
Nel file `assets/js/script.js`, funzione `applyConsent(c)`, inserisci il caricamento condizionale, ad esempio:
```js
if(c.analytics){
  // carica qui Google Analytics con Consent Mode v2
  // const s = document.createElement('script');
  // s.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXX';
  // document.head.appendChild(s);
  // window.dataLayer = window.dataLayer || [];
  // function gtag(){dataLayer.push(arguments);}
  // gtag('consent', 'default', { 'ad_storage': 'denied', 'analytics_storage': 'denied' });
  // gtag('js', new Date());
  // gtag('config', 'G-XXXXXXXX');
}
```

## Google Maps
- Di default viene mostrata una **mappa SVG** locale (`assets/svg/venezia.svg`).
- Il bottone **“Carica mappa interattiva”** carica l’iframe **solo** se l’utente ha acconsentito alla categoria *Mappe*.
- Per cambiare posizione della mappa, modifica l’URL dell’iframe in `applyConsent()` (query `q=Venezia`).

## Form contatti
- Invio **AJAX** a Formspree (`https://formspree.io/f/xovlprrq`). Modifica l’endpoint se mai cambiasse.
- Anti-spam: **honeypot**, **captcha somma 1–9**, **blocco invio <2.5s**.
- **Consenso obbligatorio**: checkbox “Autorizzo il trattamento dei dati…”. Senza spunta, il form non parte.
- Messaggio di successo **in-page** (“Grazie, inviato!”).

## Dati personali & GDPR
- Privacy policy aggiornata (`privacy.html`). Adatta con il tuo consulente (es. DPA con Formspree).
- Cookie policy (`cookie.html`) con pulsante per riaprire preferenze.
- Nessun Google Fonts/asset esterno che imposta cookie senza consenso.

## SEO On‑page
- **Title/Description** curati per ogni pagina.
- **BreadcrumbList** JSON‑LD su tutte le pagine.
- **OfferCatalog** JSON‑LD (su preventivo).
- **Sitemap** e **robots.txt** già pronti.
- Contenuti arricchiti (FAQ estese, metodo IPM, zone).

## Roadmap per prima pagina Google (“disinfestazione venezia”)
1. **Google Business Profile**: categoria, descrizione, foto, Q&A, post; NAP coerente.
2. **Backlink locali**: CamCom, consorzi, associazioni, portali turistici, partner B2B.
3. **Contenuti localizzati**: 1–2 articoli/mese su problemi tipici di Venezia (zanzare laguna, gabbiani, fondaci umidi).
4. **Velocità**: se carichi foto reali, usa **WebP**, `loading="lazy"`, dimensioni esplicite.
5. **E-E-A-T**: arricchisci “Chi siamo” con nominativi, certificazioni, polizza, foto reali quando puoi.

## Note
- Telefono è **commentato** in HTML (footer e CTA). Riattivalo quando vuoi.
- Dominio personalizzato configurato in `CNAME`.
- Tutti i path sono **relativi** → compatibile con GitHub Pages.
