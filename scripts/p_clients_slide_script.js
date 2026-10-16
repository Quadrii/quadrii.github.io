document.querySelectorAll('.ples-marquee').forEach(m => {
  const track = m.querySelector('.ples-marquee__track');
  const originals = [...track.children];
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  function build(){
    track.querySelectorAll('[data-clone]').forEach(n => n.remove());
    const setW = track.getBoundingClientRect().width;           // width of ONE full set of logos
    if (!setW) return;
    const copies = Math.ceil(m.clientWidth / setW) + 1;          // enough sets to always fill the screen
    for (let i = 0; i < copies; i++) originals.forEach(el => {
      const c = el.cloneNode(true);
      c.dataset.clone = ''; c.setAttribute('aria-hidden', 'true'); c.querySelector('img').alt = '';
      track.appendChild(c);
    });
    track.style.setProperty('--ples-shift', -setW + 'px');       // slide exactly one set, then loop seamlessly
    track.style.setProperty('--ples-dur', (setW / 70) + 's');    // ~70px per second
  }
  build();
  let t; addEventListener('resize', () => { clearTimeout(t); t = setTimeout(build, 200); });
});
/*PLES-P-JS-END*/