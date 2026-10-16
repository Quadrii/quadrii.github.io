(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Fade-up reveal when scrolled into view
  const items = document.querySelectorAll('.ples-reveal');
  if (reduce || !('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('ples-in'));
  } else {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('ples-in'); obs.unobserve(e.target); } });
    }, { threshold: .15 });
    items.forEach(el => io.observe(el)); 
  }

  // Count-up numbers in the stats bar
  const counters = document.querySelectorAll('[data-ples-count]');
  const run = el => {
    const end = +el.dataset.plesCount, dur = 1400, t0 = performance.now();
    const tick = t => {
      const p = Math.min((t - t0) / dur, 1);
      el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick); 
    };
    requestAnimationFrame(tick); 
  };
  if (reduce || !('IntersectionObserver' in window)) return;
  const co = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => { if (e.isIntersecting) { run(e.target); obs.unobserve(e.target); } });
  }, { threshold: .6 });
  counters.forEach(c => co.observe(c));
})();

