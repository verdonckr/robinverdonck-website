/* =====================================================================
   COOKIEBANNER — Robin Verdonck Coaching
   Laadt Google Analytics PAS nadat de bezoeker toestemming geeft.

   GEBRUIK:
   1) Verwijder op elke pagina het bestaande Google-blok uit de <head>:
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-YQPNEP9SLS"></script>
        <script> window.dataLayer = ... gtag('config','G-YQPNEP9SLS'); </script>
   2) Zet in de plaats, vlak vóór </body>:
        <script src="cookies.js"></script>
   ===================================================================== */
(function(){
  var SLEUTEL='rv_cookie_v1';
  var META_ID='G-YQPNEP9SLS';

  var css=''+
'#ck-laag{position:fixed;left:0;right:0;bottom:0;z-index:9999;padding:14px;padding-bottom:calc(14px + env(safe-area-inset-bottom));display:flex;justify-content:center;pointer-events:none}'+
'#ck-doos{pointer-events:auto;background:rgba(23,28,36,.98);-webkit-backdrop-filter:blur(18px);backdrop-filter:blur(18px);border:1px solid #232a35;border-radius:16px;padding:20px;max-width:560px;width:100%;box-shadow:0 20px 60px rgba(0,0,0,.6);animation:ckIn .4s cubic-bezier(.22,.61,.36,1);font-family:system-ui,-apple-system,sans-serif}'+
'@keyframes ckIn{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}'+
'#ck-doos h3{font-size:16px;font-weight:800;margin:0 0 8px;color:#f5f4f1;line-height:1.3}'+
'#ck-doos p{font-size:13.5px;color:#9aa1ab;line-height:1.6;margin:0 0 14px}'+
'#ck-doos a{color:#e0c98f}'+
'#ck-knoppen{display:flex;gap:10px;flex-wrap:wrap}'+
'#ck-knoppen button{flex:1;min-width:130px;border:none;border-radius:10px;padding:13px 16px;font-weight:700;font-size:14.5px;cursor:pointer;font-family:inherit;transition:transform .12s ease}'+
'#ck-knoppen button:active{transform:scale(.97)}'+
'#ck-ja{background:#c9a962;color:#0b0e13}'+
'#ck-nee{background:transparent;border:1px solid #232a35 !important;color:#f5f4f1}'+
'#ck-nee:hover{border-color:#c9a962 !important}';

  var st=document.createElement('style'); st.textContent=css; document.head.appendChild(st);

  var geladen=false;
  function laadAnalytics(){
    if(geladen)return; geladen=true;
    var sc=document.createElement('script');
    sc.async=true;
    sc.src='https://www.googletagmanager.com/gtag/js?id='+META_ID;
    document.head.appendChild(sc);
    window.dataLayer=window.dataLayer||[];
    window.gtag=function(){window.dataLayer.push(arguments)};
    window.gtag('js',new Date());
    window.gtag('config',META_ID,{anonymize_ip:true});
  }

  function toon(){
    if(document.getElementById('ck-laag'))return;
    var laag=document.createElement('div');
    laag.id='ck-laag';
    laag.innerHTML='<div id="ck-doos">'+
      '<h3>Cookies op deze site</h3>'+
      '<p>Ik gebruik enkel wat nodig is om de site te laten werken. Daarnaast hou ik graag anonieme statistieken bij om te zien welke pagina\u2019s gelezen worden \u2014 maar alleen als jij dat goedvindt. Meer uitleg in de <a href="privacy.html">privacyverklaring</a>.</p>'+
      '<div id="ck-knoppen">'+
        '<button id="ck-nee" type="button">Alleen noodzakelijke</button>'+
        '<button id="ck-ja" type="button">Statistieken toestaan</button>'+
      '</div></div>';
    document.body.appendChild(laag);
    document.getElementById('ck-ja').onclick=function(){
      try{localStorage.setItem(SLEUTEL,'ja')}catch(e){}
      laadAnalytics(); laag.remove();
    };
    document.getElementById('ck-nee').onclick=function(){
      try{localStorage.setItem(SLEUTEL,'nee')}catch(e){}
      laag.remove();
    };
  }

  /* laat bezoekers hun keuze later wijzigen (link in de privacyverklaring) */
  window.cookieKeuzeOpnieuw=function(){
    try{localStorage.removeItem(SLEUTEL)}catch(e){}
    toon();
  };

  var keuze=null;
  try{keuze=localStorage.getItem(SLEUTEL)}catch(e){}
  if(keuze==='ja')      laadAnalytics();
  else if(keuze!=='nee') toon();
})();
