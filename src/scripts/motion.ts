// Beweging met GSAP + ScrollTrigger. Zonder JS of bij reduced motion staat alles direct
// stil in beeld; de beginstanden worden pas gezet als GSAP geladen is.
const root = document.documentElement;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const ARCH_OPEN = 'inset(0% 0% 0% 0% round 999px 999px 0px 0px)';
const ARCH_SHUT = 'inset(100% 0% 0% 0% round 999px 999px 0px 0px)';

type Gsap = typeof import('gsap').gsap;

const ready = () => root.classList.add('motion-ready');

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

  // Hero: de boog opent bij het scrollen tot het beeld de volle breedte vult.
  mm.add('(min-width: 1024px)', () => {
    const hero = document.querySelector<HTMLElement>('[data-hero]');
    const media = hero?.querySelector<HTMLElement>('[data-hero-media]');
    if (!hero || !media) return;
    const tl = gsap.timeline({
      defaults: { duration: 1 },
      scrollTrigger: { trigger: hero, start: 'top top', end: '+=90%', scrub: 0.6, pin: true },
    });
    tl.to(media, { clipPath: 'inset(0% 0% 0% 0% round 0px 0px 0px 0px)', ease: 'none' }, 0)
      .fromTo(
        hero.querySelectorAll('[data-hero-img]'),
        { scale: 1.12 },
        { scale: 1, ease: 'none' },
        0,
      )
      .to(
        hero.querySelector('[data-hero-copy]'),
        { yPercent: -18, autoAlpha: 0, ease: 'none', duration: 0.4 },
        0,
      );
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
