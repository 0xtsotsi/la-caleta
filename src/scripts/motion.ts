/**
 * Kleine, elegante bewegingen:
 * - elementen die in beeld komen faded-in
 * - een zachte parallax op de hero-beeld
 * - kaarten die licht opveren bij hover
 *
 * Alles schakelt automatisch uit bij prefers-reduced-motion.
 */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

const initReveal = () => {
  const targets = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (targets.length === 0) return;

  if (prefersReducedMotion.matches || !('IntersectionObserver' in window)) {
    for (const element of targets) element.setAttribute('data-revealed', 'true');
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const element = entry.target as HTMLElement;
        const delay = Number(element.dataset.revealDelay ?? 0);
        window.setTimeout(() => element.setAttribute('data-revealed', 'true'), delay);
        observer.unobserve(element);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
  );

  for (const element of targets) observer.observe(element);
};

const initParallax = () => {
  const layers = document.querySelectorAll<HTMLElement>('[data-parallax]');
  if (layers.length === 0 || prefersReducedMotion.matches) return;

  let frame = 0;

  const update = () => {
    frame = 0;
    const viewport = window.innerHeight;
    layers.forEach((layer) => {
      const rect = layer.parentElement?.getBoundingClientRect();
      if (!rect) return;
      const progress = (rect.top + rect.height / 2 - viewport / 2) / viewport;
      const shift = Math.max(-40, Math.min(40, progress * -36));
      layer.style.setProperty('--parallax-shift', `${shift.toFixed(2)}px`);
    });
  };

  const onScroll = () => {
    if (frame) return;
    frame = window.requestAnimationFrame(update);
  };

  update();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
};

initReveal();
initParallax();
