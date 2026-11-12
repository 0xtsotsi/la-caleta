// Beweging met GSAP + ScrollTrigger. Zonder JS of bij reduced motion staat alles direct
// stil in beeld; de beginstanden worden pas gezet als GSAP geladen is.
const root = document.documentElement;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const ARCH_OPEN = 'inset(0% 0% 0% 0% round 999px 999px 0px 0px)';
const ARCH_SHUT = 'inset(100% 0% 0% 0% round 999px 999px 0px 0px)';

type Gsap = typeof import('gsap').gsap;

const ready = () => root.classList.add('motion-ready');

// Hero-video: niet bij reduced motion of databesparing. Kleine telefoons krijgen het kleine bestand.
const initHeroVideo = () => {
  const video = document.querySelector<HTMLVideoElement>('[data-hero-video]');
  const button = document.querySelector<HTMLButtonElement>('[data-hero-pause]');
  if (!video || reduceMotion) return;
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  if (connection?.saveData) return;
  const src = window.innerWidth < 768 ? video.dataset.srcSmall : video.dataset.srcLarge;
  if (!src) return;

  let pausedByUser = false;
  video.src = src;
  video.addEventListener('playing', () => {
    video.dataset.playing = 'true';
    if (button) button.hidden = false;
  });
  video.play().catch(() => {});

  const setButton = (paused: boolean) => {
    if (!button) return;
    button.setAttribute('aria-pressed', String(paused));
    button.querySelector<HTMLElement>('[data-pause-icon]')?.toggleAttribute('hidden', paused);
    button.querySelector<HTMLElement>('[data-play-icon]')?.toggleAttribute('hidden', !paused);
    const label = button.querySelector<HTMLElement>('[data-pause-label]');
    if (label) label.textContent = paused ? 'Video afspelen' : 'Video pauzeren';
  };

  button?.addEventListener('click', () => {
    pausedByUser = !video.paused;
    if (video.paused) video.play().catch(() => {});
    else video.pause();
    setButton(pausedByUser);
  });

  // Buiten beeld stilzetten, zodat de video geen rekenkracht kost.
  new IntersectionObserver(([entry]) => {
    if (pausedByUser) return;
    if (entry.isIntersecting) video.play().catch(() => {});
    else video.pause();
  }).observe(video);
};

// Verhaal: wissel het beeld per moment. Werkt met en zonder GSAP.
const initStory = (gsap?: Gsap) => {
  const frames = [...document.querySelectorAll<HTMLElement>('[data-story-frame]')];
  const steps = [...document.querySelectorAll<HTMLElement>('[data-story-step]')];
  if (frames.length === 0) return;

  let current = 0;
  const show = (index: number) => {
    if (index === current) return;
    current = index;
    frames.forEach((frame, i) => {
      const clipPath = i <= index ? ARCH_OPEN : ARCH_SHUT;
      if (gsap && !reduceMotion) {
        gsap.to(frame, { clipPath, duration: 0.9, ease: 'power3.inOut', overwrite: true });
      } else {
        frame.style.clipPath = clipPath;
      }
    });
  };

  // Het laatste moment waarvan de bovenkant boven het midden van het scherm staat.
  // Een scroll-meting in plaats van een observer, zodat ook een sprong naar boven klopt.
  let frame = 0;
  const update = () => {
    frame = 0;
    const middle = window.innerHeight * 0.55;
    let index = 0;
    steps.forEach((step, i) => {
      if (step.getBoundingClientRect().top < middle) index = i;
    });
    show(index);
  };
  window.addEventListener(
    'scroll',
    () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    },
    { passive: true },
  );
  update();
};

const hasMotion = () =>
  document.querySelector(
    '[data-lines], [data-arch-reveal], [data-hero], [data-glow], [data-parallax]',
  );

const initGsap = async () => {
  const [{ gsap }, { ScrollTrigger }] = await Promise.all([
    import('gsap'),
    import('gsap/ScrollTrigger'),
  ]);
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });

  // Beginstanden eerst inline zetten, dan pas de CSS-terugval uitschakelen.
  const lines = [...document.querySelectorAll<HTMLElement>('[data-lines]')];
  const reveals = [...document.querySelectorAll<HTMLElement>('[data-arch-reveal]')];
  lines.forEach((block) => {
    // y: 0 wist de CSS-beginstand die GSAP anders als pixelverschuiving overneemt.
    gsap.set(block.querySelectorAll('.line > span'), { y: 0, yPercent: 105 });
  });
  gsap.set(reveals, { clipPath: ARCH_SHUT });
  ready();

  lines.forEach((block) => {
    gsap.to(block.querySelectorAll('.line > span'), {
      yPercent: 0,
      duration: 0.9,
      stagger: 0.12,
      ease: 'power3.out',
      delay: 0.1,
    });
  });

  reveals.forEach((element) => {
    const image = element.querySelector('[data-arch-img], img');
    const tl = gsap.timeline({
      defaults: { duration: 1 },
      scrollTrigger: { trigger: element, start: 'top 88%', once: true },
    });
    tl.to(element, { clipPath: ARCH_OPEN, duration: 1.1, ease: 'power3.inOut' });
    if (image) tl.from(image, { scale: 1.12, duration: 1.4, ease: 'power3.out' }, 0);
  });

  const mm = gsap.matchMedia();

  // Hero: de ring, het kleine beeld en de strook komen na de boog binnen; bij het scrollen
  // drijven de lagen licht uit elkaar. Beginstanden staan alleen hier, nooit in de CSS.
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  const ring = hero?.querySelector<HTMLElement>('[data-hero-ring]');
  const mini = hero?.querySelector<HTMLElement>('[data-hero-mini]');
  const strip = hero?.querySelector<HTMLElement>('[data-hero-strip]');
  const copy = hero?.querySelector<HTMLElement>('[data-hero-copy]');
  if (hero) {
    const intro = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.5 });
    if (ring)
      intro.from(
        ring,
        { autoAlpha: 0, scale: 0.94, transformOrigin: '50% 100%', duration: 1.2 },
        0.2,
      );
    if (mini) intro.from(mini, { autoAlpha: 0, y: 48, duration: 1 }, 0.7);
    if (strip) intro.from(strip.children, { autoAlpha: 0, y: 16, stagger: 0.1, duration: 0.7 }, 1);
  }

  mm.add('(min-width: 1024px)', () => {
    if (!hero) return;
    const scrub = { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.8 };
    // Op de losse lagen, zodat het openen van de boog (schaal op de wrapper) er niet mee botst.
    const layers = hero.querySelectorAll('[data-hero-img], [data-hero-video]');
    gsap.to(layers, { scale: 1.08, ease: 'none', scrollTrigger: scrub });
    if (mini) gsap.to(mini, { yPercent: -28, ease: 'none', scrollTrigger: scrub });
    if (ring) gsap.to(ring, { yPercent: 6, ease: 'none', scrollTrigger: scrub });
    if (copy) gsap.to(copy, { yPercent: -10, autoAlpha: 0.2, ease: 'none', scrollTrigger: scrub });
  });

  // Koperen lichtvlek: beweegt mee met het scrollen, nooit uit zichzelf.
  mm.add('(min-width: 1024px)', () => {
    document.querySelectorAll<HTMLElement>('[data-glow]').forEach((glow) => {
      gsap.to(glow, {
        x: '38vw',
        y: '22vh',
        ease: 'none',
        scrollTrigger: {
          trigger: glow.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
      });
    });
  });

  mm.add('(min-width: 768px)', () => {
    document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((layer) => {
      gsap.fromTo(
        layer,
        { yPercent: -5 },
        {
          yPercent: 5,
          ease: 'none',
          scrollTrigger: {
            trigger: layer.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      );
    });
  });

  initStory(gsap);
};

initHeroVideo();

if (reduceMotion || !hasMotion()) {
  ready();
  initStory();
} else {
  initGsap().catch(() => {
    // GSAP niet geladen: alles direct tonen.
    ready();
    initStory();
  });
}

export {};
