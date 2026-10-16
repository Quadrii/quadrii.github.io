const plesMarquees = document.querySelectorAll('.ples-pr-marquee');
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  plesMarquees.forEach(m => {
    const track = m.querySelector('.ples-pr-marquee__track');
    const originals = [...track.children];
    function build(){
      track.querySelectorAll('[data-clone]').forEach(n => n.remove());
      const setW = track.getBoundingClientRect().width;
      if (!setW) return;
      const copies = Math.ceil(m.clientWidth / setW) + 1;
      for (let i = 0; i < copies; i++) originals.forEach(el => {
        const c = el.cloneNode(true);
        c.dataset.clone = ''; c.setAttribute('aria-hidden', 'true'); c.querySelector('img').alt = '';
        track.appendChild(c);
      });
      track.style.setProperty('--ples-shift', -setW + 'px');
      track.style.setProperty('--ples-dur', (setW / 60) + 's');
    }
    build();
    let t; addEventListener('resize', () => { clearTimeout(t); t = setTimeout(build, 200); });
  });
}