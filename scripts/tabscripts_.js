(function(){
  var tabs=[].slice.call(document.querySelectorAll('.filter-tab')),
      cards=[].slice.call(document.querySelectorAll('.project-card')),
      status=document.getElementById('filter-status');
  function apply(f){
    var n=0;
    tabs.forEach(function(t){var on=t.dataset.filter===f;t.classList.toggle('is-active',on);t.setAttribute('aria-pressed',on)});
    cards.forEach(function(c){var show=f==='all'||c.dataset.category===f;c.hidden=!show;if(show)n++});
    status.textContent='Showing '+n+' project'+(n===1?'':'s');
  }
  tabs.forEach(function(t){t.addEventListener('click',function(){
    apply(t.dataset.filter);
    try{history.replaceState(null,'',t.dataset.filter==='all'?location.pathname:'#'+t.dataset.filter)}catch(e){}
  })});
  var h=location.hash.slice(1);
  if(h&&tabs.some(function(t){return t.dataset.filter===h}))apply(h);
})();