
const $ = (s,sc=document)=>sc.querySelector(s);
const menu = $('#menu');
const tog = $('#navToggle');
tog && tog.addEventListener('click',()=>{
  const isOpen = menu.classList.toggle('open');
  tog.setAttribute('aria-expanded', isOpen);
});
document.querySelectorAll('a[href^="#"],a[href^="index.html#"]').forEach(a=>a.addEventListener('click',e=>{
  const href=a.getAttribute('href');
  const id = href.includes('#') ? '#'+href.split('#')[1] : null;
  if(!id || id==='#')return;
  const el=document.querySelector(id);
  if(el){e.preventDefault();el.scrollIntoView({behavior:'smooth'});menu.classList.remove('open');tog && tog.setAttribute('aria-expanded','false');}
}));

/* Consent manager (bottom bar + small panel) */
const CONSENT_KEY = 'cookieConsentV2';
const bar = $('#cookieBar');
const panel = $('#cookiePanel');
function getConsent(){ try{ return JSON.parse(localStorage.getItem(CONSENT_KEY)) || null }catch(e){ return null } }
function setConsent(obj){ localStorage.setItem(CONSENT_KEY, JSON.stringify(obj)); applyConsent(obj); }
function applyConsent(c){
  // maps gating
  const mapC = $('#mapContainer');
  if(mapC){
    const hasIframe = !!mapC.querySelector('iframe');
    if(c?.maps && !hasIframe){
      const iframe = document.createElement('iframe');
      iframe.src = 'https://www.google.com/maps?q=Venezia&output=embed';
      iframe.loading = 'lazy';
      iframe.title = 'Google Maps Venezia';
      mapC.innerHTML = '';
      mapC.appendChild(iframe);
    }
  }
}
function openPanel(){
  const c = getConsent() || {maps:false,analytics:false};
  panel.style.display = 'block';
  const form = $('#cookieFormSmall');
  form.maps.checked = !!c.maps;
}
function closePanel(){ panel.style.display = 'none'; }
const existingConsent = getConsent();
if(!existingConsent){ bar.hidden = false; } else { applyConsent(existingConsent); }
$('#cookiePrefs')?.addEventListener('click', openPanel);
$('#cookieSettings')?.addEventListener('click', openPanel);
$('#cookieClose')?.addEventListener('click', closePanel);
$('#cookieAcceptAll')?.addEventListener('click', ()=>{ setConsent({maps:true,analytics:false}); bar.hidden = true; closePanel(); });
$('#cookieReject')?.addEventListener('click', ()=>{ setConsent({maps:false,analytics:false}); bar.hidden = true; closePanel(); });
$('#cookieFormSmall')?.addEventListener('submit',(e)=>{
  e.preventDefault();
  const maps = e.target.maps.checked;
  setConsent({maps,analytics:false});
  bar.hidden = true; closePanel();
});

/* Map "Carica mappa" button */
$('#loadMap')?.addEventListener('click', ()=>{
  const c = getConsent();
  if(!c || !c.maps){ openPanel(); } else { applyConsent(c); }
});

/* Contact form (AJAX + math captcha + honeypot + min time + consent checkbox) */
const form = $('#contactForm');
let formLoadedAt = Date.now();
if(form){
  const a = Math.floor(Math.random()*9)+1;
  const b = Math.floor(Math.random()*9)+1;
  $('#a').textContent = a;
  $('#b').textContent = b;
  $('#captcha_expected').value = a + b;

  form.addEventListener('submit', async (e)=>{
    const expected = parseInt($('#captcha_expected').value,10);
    const val = parseInt(form.captcha_input.value||'',10);
    const hp = form.company.value;
    const error = $('#captchaError');
    const status = $('#formStatus');
    const elapsed = Date.now() - formLoadedAt;
    $('#ttfb_ms').value = elapsed;
    const consentChecked = $('#consent').checked;

    if(hp){ e.preventDefault(); error.style.display='block'; error.textContent='Bot rilevato.'; return; }
    if(isNaN(val) || val !== expected){ e.preventDefault(); error.style.display='block'; error.textContent='Verifica captcha non superata.'; return; }
    if(elapsed < 2500){ e.preventDefault(); error.style.display='block'; error.textContent='Invio troppo rapido. Riprova.'; return; }
    if(!consentChecked){ e.preventDefault(); error.style.display='block'; error.textContent='Devi autorizzare il trattamento dei dati.'; return; }

    e.preventDefault();
    error.style.display='none';
    status.style.display='block';
    status.style.color = '#1b6db1';
    status.textContent = 'Invio in corso...';

    try {
      const formData = new FormData(form);
      const endpoint = form.getAttribute('action');
      const resp = await fetch(endpoint, { method: 'POST', headers: { 'Accept': 'application/json' }, body: formData });
      if (resp.ok) {
        status.style.color = '#0fb69a';
        status.textContent = 'Grazie, inviato! Ti risponderemo al più presto.';
        form.reset();
        const a2 = Math.floor(Math.random()*9)+1;
        const b2 = Math.floor(Math.random()*9)+1;
        $('#a').textContent = a2; $('#b').textContent = b2; $('#captcha_expected').value = a2+b2;
        formLoadedAt = Date.now();
      } else {
        const data = await resp.json().catch(()=>({}));
        status.style.color = '#b91c1c';
        status.textContent = data.error || 'Si è verificato un errore. Riprova più tardi.';
      }
    } catch (err) {
      status.style.color = '#b91c1c';
      status.textContent = 'Errore di rete. Controlla la connessione e riprova.';
    }
  }, { once: false });
}

/* Remove any legacy modal popup if still present */
document.addEventListener('DOMContentLoaded', ()=>{
  const legacy = document.getElementById('cookieBanner');
  if(legacy && legacy.parentNode){ legacy.parentNode.removeChild(legacy); }
});
