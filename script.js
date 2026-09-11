// Mobile nav toggle
  const nav = document.getElementById('siteNav');
  const navToggle = document.getElementById('navToggle');
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Car carousel
  const carTrack = document.getElementById('carTrack');
  const cardWidth = 320;
  document.getElementById('carPrev').addEventListener('click', () => {
    carTrack.scrollBy({left: -cardWidth, behavior: 'smooth'});
  });
  document.getElementById('carNext').addEventListener('click', () => {
    carTrack.scrollBy({left: cardWidth, behavior: 'smooth'});
  });

  // Hero stat count-up
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('.hero-stats dt').forEach(el => {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    if (reduceMotion) { el.textContent = target + suffix; return; }
    let start = null;
    const duration = 1200;
    function step(ts){
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      el.textContent = Math.floor(progress * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
    }
    setTimeout(() => requestAnimationFrame(step), 700);
  });

  // Trailer modal
  const modalBackdrop = document.getElementById('modalBackdrop');
  const trailerBtn = document.getElementById('trailerBtn');
  const modalClose = document.getElementById('modalClose');
  function openModal(){
    modalBackdrop.classList.add('open');
    modalClose.focus();
  }
  function closeModal(){
    modalBackdrop.classList.remove('open');
    trailerBtn.focus();
  }
  trailerBtn.addEventListener('click', openModal);
  modalClose.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', (e) => { if (e.target === modalBackdrop) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modalBackdrop.classList.contains('open')) closeModal(); });

  // Release form (demo only, no backend)
  const releaseForm = document.getElementById('releaseForm');
  const releaseNote = document.getElementById('releaseNote');
  releaseForm.addEventListener('submit', (e) => {
    e.preventDefault();
    releaseNote.textContent = "You're on the list. We'll email you at launch.";
    releaseForm.reset();
  });
