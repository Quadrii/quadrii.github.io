(() => {
  const root = document.getElementById('ples-in-testi');
  const track = document.getElementById('ples-in-testi-track');
  const slides = [...track.children].filter(el => el.tagName === 'FIGURE');
  const dotsBox = document.getElementById('ples-in-testi-dots');
  if (slides.length < 2) { root.classList.add('is-single'); return; }   // nothing to slide yet

  let i = 0, timer;
  const dots = slides.map((_, n) => {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'ples-in-testi__dot'; b.setAttribute('aria-label', 'Show testimonial ' + (n + 1));
    b.addEventListener('click', () => { go(n); restart(); });
    dotsBox.appendChild(b); return b;
  });
  slides.forEach((s, n) => s.setAttribute('aria-label', (n + 1) + ' of ' + slides.length));

  function go(n){
    i = (n + slides.length) % slides.length;
    track.style.transform = 'translateX(' + (-100 * i) + '%)';
    dots.forEach((d, k) => d.setAttribute('aria-current', k === i ? 'true' : 'false'));
    slides.forEach((s, k) => s.setAttribute('aria-hidden', k === i ? 'false' : 'true'));
  }
  const next = () => go(i + 1), prev = () => go(i - 1);
  const stop = () => clearInterval(timer);
  const start = () => { if (!matchMedia('(prefers-reduced-motion: reduce)').matches) timer = setInterval(next, 7000); };
  const restart = () => { stop(); start(); };

  document.getElementById('ples-in-next').addEventListener('click', () => { next(); restart(); });
  document.getElementById('ples-in-prev').addEventListener('click', () => { prev(); restart(); });
  root.addEventListener('mouseenter', stop); root.addEventListener('mouseleave', start);
  root.addEventListener('focusin', stop);    root.addEventListener('focusout', start);
  root.addEventListener('keydown', e => { if (e.key === 'ArrowRight') { next(); restart(); } if (e.key === 'ArrowLeft') { prev(); restart(); } });

  let x0 = null;                                                           // swipe on touch screens
  root.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
  root.addEventListener('touchend', e => { if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) { dx < 0 ? next() : prev(); restart(); } x0 = null; });

  go(0); start();
})();