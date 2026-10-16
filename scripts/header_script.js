(() => {
  const nav = document.getElementById('primaryNav');
  const burger = document.getElementById('burger');
  const items = [...nav.querySelectorAll('.nav__item')].filter(i => i.querySelector('.submenu'));
  const mq = matchMedia('(max-width:1180px)');

  function closeMenus(except){
    items.forEach(i => { if (i !== except){ i.classList.remove('open'); i.querySelector('button').setAttribute('aria-expanded','false'); } });
  }
  items.forEach(item => {
    const btn = item.querySelector('button');
    btn.addEventListener('click', () => {
      const open = !item.classList.contains('open');
      closeMenus(item);
      item.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', open);
    });
  });

  function setDrawer(open){
    nav.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.classList.toggle('nav-locked', open && mq.matches);
    if (!open) closeMenus();
  }
  burger.addEventListener('click', () => setDrawer(!nav.classList.contains('open')));

  // Close on outside click, Escape, link tap, or when resizing to desktop
  document.addEventListener('click', e => {
    if (!e.target.closest('.nav')) closeMenus();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape'){ closeMenus(); if (nav.classList.contains('open')) { setDrawer(false); burger.focus(); } }
  });
  nav.addEventListener('click', e => { if (e.target.closest('a') && mq.matches) setDrawer(false); });
  mq.addEventListener('change', () => setDrawer(false));
})();