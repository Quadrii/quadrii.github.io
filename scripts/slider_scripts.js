(() => {
  const hero   = document.getElementById('heroSlider');
  const slides = [...hero.querySelectorAll('.slide')];
  const dotsEl = hero.querySelector('.dots');
  const DELAY  = 7500;             // ms between slides
  let index = 0, timer;

  const dots = slides.map((_, i) => {
    const b = document.createElement('button');
    b.className = 'dot';
    b.setAttribute('aria-label', 'Go to slide ' + (i + 1));
    b.addEventListener('click', () => { go(i); restart(); });
    dotsEl.appendChild(b);
    return b;
  });

  function go(n){
    index = (n + slides.length) % slides.length;
    slides.forEach((s, i) => s.classList.toggle('is-active', i === index));
    dots.forEach((d, i) => d.classList.toggle('is-active', i === index));
  }
  const next = () => go(index + 1);
  const prev = () => go(index - 1);
  const start   = () => { timer = setInterval(next, DELAY); };
  const stop    = () => clearInterval(timer);
  const restart = () => { stop(); start(); };

  hero.querySelector('.arrow--next').addEventListener('click', () => { next(); restart(); });
  hero.querySelector('.arrow--prev').addEventListener('click', () => { prev(); restart(); });

  // Pause on hover / focus
  hero.addEventListener('mouseenter', stop);
  hero.addEventListener('mouseleave', start);
  hero.addEventListener('focusin', stop);
  hero.addEventListener('focusout', start);

  // Keyboard arrows
  hero.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') { next(); restart(); }
    if (e.key === 'ArrowLeft')  { prev(); restart(); }
  });

  // Touch swipe
  let x0 = null;
  hero.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, {passive:true});
  hero.addEventListener('touchend', e => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 50) { dx < 0 ? next() : prev(); restart(); }
    x0 = null;
  });

  // Pause when the tab is hidden
  document.addEventListener('visibilitychange', () => document.hidden ? stop() : restart());

  go(0);
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) start();
})();
