/* =====================================================================
   MOBIEL HAMBURGERMENU — Robin Verdonck Coaching
   Eén gedeeld menu voor alle pagina's. Zelfstandig: geen afhankelijkheid
   van de CSS van de pagina. Verschijnt alleen op smalle schermen (<=880px),
   zodat het desktopmenu op de homepage onaangeroerd blijft.

   GEBRUIK: zet vlak vóór </body> op elke pagina:  <script src="menu.js"></script>
   ===================================================================== */
(function(){
  if(document.getElementById('rvm-knop'))return;               /* niet dubbel laden */

  /* De pagina's van de site. Pas hier één keer aan en het staat overal goed. */
  var LINKS=[
    {t:'Home',            h:'index.html'},
    {t:'Aanpak',          h:'index.html#methode'},
    {t:'Herken je dit',   h:'index.html#herkenning'},
    {t:'Wie ik ben',      h:'index.html#verhaal'},
    {t:'Prijzen',         h:'index.html#investering'},
    {t:'Kennisbank',      h:'kennisbank.html'},
    {t:'Gratis tools',    h:'gratis-tools.html'},
    {t:'Gratis logboek',  h:'gratis-log.html'}
  ];
  var CTA={t:'Stuur een berichtje', h:'index.html#aanvraag'};

  /* welke pagina ben ik nu? (voor het accentueren van de actieve link) */
  var hier=(location.pathname.split('/').pop()||'index.html').toLowerCase();

  var css=''+
'#rvm-knop{position:fixed;top:14px;right:14px;z-index:9998;width:46px;height:46px;border:1px solid #232a35;'+
'  background:rgba(11,14,19,.86);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);border-radius:12px;'+
'  display:none;align-items:center;justify-content:center;cursor:pointer;padding:0}'+
'#rvm-knop span,#rvm-knop span::before,#rvm-knop span::after{content:"";display:block;width:20px;height:2px;'+
'  background:#e0c98f;border-radius:2px;transition:.25s cubic-bezier(.22,.61,.36,1);position:relative}'+
'#rvm-knop span::before{position:absolute;top:-6px}#rvm-knop span::after{position:absolute;top:6px}'+
'body.rvm-open #rvm-knop span{background:transparent}'+
'body.rvm-open #rvm-knop span::before{top:0;transform:rotate(45deg)}'+
'body.rvm-open #rvm-knop span::after{top:0;transform:rotate(-45deg)}'+
'#rvm-laag{position:fixed;inset:0;z-index:9997;background:rgba(6,8,11,.55);-webkit-backdrop-filter:blur(3px);'+
'  backdrop-filter:blur(3px);opacity:0;pointer-events:none;transition:opacity .28s ease}'+
'body.rvm-open #rvm-laag{opacity:1;pointer-events:auto}'+
'#rvm-paneel{position:fixed;top:0;right:0;bottom:0;z-index:9998;width:min(82vw,320px);'+
'  background:#12161d;border-left:1px solid #232a35;box-shadow:-24px 0 60px rgba(0,0,0,.5);'+
'  transform:translateX(100%);transition:transform .32s cubic-bezier(.22,.61,.36,1);'+
'  display:flex;flex-direction:column;padding:76px 0 24px;overflow-y:auto;-webkit-overflow-scrolling:touch}'+
'body.rvm-open #rvm-paneel{transform:none}'+
'#rvm-paneel a{display:block;padding:15px 26px;color:#c9cdd3;font-family:system-ui,-apple-system,sans-serif;'+
'  font-size:16px;font-weight:600;text-decoration:none;border-bottom:1px solid #1c222b;transition:.2s}'+
'#rvm-paneel a:hover,#rvm-paneel a:active{background:rgba(201,169,98,.08);color:#e0c98f}'+
'#rvm-paneel a.rvm-nu{color:#e0c98f;border-left:3px solid #c9a962;padding-left:23px}'+
'#rvm-paneel a.rvm-cta{margin:18px 22px 0;padding:15px 20px;text-align:center;border:none;border-radius:99px;'+
'  background:linear-gradient(135deg,#c9a962,#b3934e);color:#0b0e13;font-weight:800}'+
'#rvm-paneel a.rvm-cta:hover{color:#0b0e13;filter:brightness(1.04)}'+
'@media(max-width:880px){#rvm-knop{display:flex}}'+
'@media(prefers-reduced-motion:reduce){#rvm-paneel,#rvm-laag,#rvm-knop span,#rvm-knop span::before,#rvm-knop span::after{transition:none}}';

  var st=document.createElement('style'); st.textContent=css; document.head.appendChild(st);

  var knop=document.createElement('button');
  knop.id='rvm-knop'; knop.setAttribute('aria-label','Menu'); knop.innerHTML='<span></span>';

  var laag=document.createElement('div'); laag.id='rvm-laag';

  var paneel=document.createElement('nav'); paneel.id='rvm-paneel'; paneel.setAttribute('aria-label','Hoofdmenu');
  var html='';
  LINKS.forEach(function(l){
    var doel=l.h.split('#')[0].toLowerCase();
    var actief=(doel===hier)&&l.h.indexOf('#')===-1?' class="rvm-nu"':'';
    html+='<a href="'+l.h+'"'+actief+'>'+l.t+'</a>';
  });
  html+='<a class="rvm-cta" href="'+CTA.h+'">'+CTA.t+'</a>';
  paneel.innerHTML=html;

  document.body.appendChild(knop);
  document.body.appendChild(laag);
  document.body.appendChild(paneel);

  function toggle(open){
    document.body.classList.toggle('rvm-open', open===undefined?!document.body.classList.contains('rvm-open'):open);
  }
  knop.addEventListener('click',function(){toggle()});
  laag.addEventListener('click',function(){toggle(false)});
  paneel.addEventListener('click',function(e){ if(e.target.tagName==='A')toggle(false); });
  document.addEventListener('keydown',function(e){ if(e.key==='Escape')toggle(false); });
})();
