// Menukaart: de index volgt de actieve rubriek, het filter animeert met GSAP Flip.
const sections = [...document.querySelectorAll<HTMLElement>('[data-menu-section]')];
const links = [...document.querySelectorAll<HTMLAnchorElement>('[data-index-link]')];
const buttons = [...document.querySelectorAll<HTMLButtonElement>('[data-filter]')];
const status = document.querySelector<HTMLElement>('[data-filter-status]');
const dishes = [...document.querySelectorAll<HTMLElement>('[data-menu-list] [data-dish]')];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const labels: Record<string, string> = {
  vegetarian: 'vegetarisch',
  fish: 'met vis',
  meat: 'met vlees of kip',
};

const setActive = (id: string) => {
  for (const link of links) {
    const active = link.dataset.indexLink === id;
    if (active) link.setAttribute('aria-current', 'true');
    else link.removeAttribute('aria-current');
    // Op mobiel scrolt de horizontale index mee, zonder de pagina te verschuiven.
    if (active) {
      const list = link.closest('ol');
      if (list && list.scrollWidth > list.clientWidth) {
        list.scrollTo({ left: link.offsetLeft - 20, behavior: reduceMotion ? 'auto' : 'smooth' });
      }
    }
  }
};

const visible = new Map<string, boolean>();
const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) visible.set(entry.target.id, entry.isIntersecting);
    const first = sections.find((section) => visible.get(section.id) && !section.hidden);
    if (first) setActive(first.id);
  },
  { rootMargin: '-25% 0px -65% 0px' },
);
for (const section of sections) observer.observe(section);

const matches = (dish: HTMLElement, filter: string) => {
  if (filter === 'all') return true;
  const tags = (dish.dataset.tags ?? '').split(' ');
  if (filter === 'meat') return tags.includes('meat') || tags.includes('chicken');
  return tags.includes(filter);
};

const apply = (filter: string) => {
  let count = 0;
  for (const dish of dishes) {
    const show = matches(dish, filter);
    dish.hidden = !show;
    if (show) count += 1;
  }
  for (const section of sections) {
    if (section.hasAttribute('data-menu-static')) {
      section.hidden = filter !== 'all';
    } else {
      const items = [...section.querySelectorAll<HTMLElement>('[data-dish]')];
      section.hidden = items.length > 0 && items.every((item) => item.hidden);
    }
    const link = links.find((l) => l.dataset.indexLink === section.id);
    if (link) {
      link.dataset.empty = String(section.hidden);
      link.toggleAttribute('aria-disabled', section.hidden);
      link.tabIndex = section.hidden ? -1 : 0;
    }
  }
  if (status) {
    status.textContent =
      filter === 'all'
        ? ''
        : `${count} gerechten ${labels[filter]}. Rubrieken zonder treffers zijn verborgen.`;
  }
};

type FlipApi = typeof import('gsap/Flip').Flip;
let flip: { gsap: typeof import('gsap').gsap; Flip: FlipApi } | null = null;
const loadFlip = async () => {
  if (flip || reduceMotion) return flip;
  try {
    const [{ gsap }, { Flip }] = await Promise.all([import('gsap'), import('gsap/Flip')]);
    gsap.registerPlugin(Flip);
    flip = { gsap, Flip };
  } catch {
    flip = null;
  }
  return flip;
};

for (const button of buttons) {
  button.addEventListener('click', async () => {
    const filter = button.dataset.filter ?? 'all';
    for (const other of buttons) other.setAttribute('aria-pressed', String(other === button));
    const api = await loadFlip();
    if (!api) {
      apply(filter);
      return;
    }
    const state = api.Flip.getState(dishes);
    apply(filter);
    api.Flip.from(state, {
      duration: 0.45,
      ease: 'power2.inOut',
      onEnter: (elements) =>
        api.gsap.fromTo(elements, { opacity: 0 }, { opacity: 1, duration: 0.35 }),
      onLeave: (elements) => api.gsap.to(elements, { opacity: 0, duration: 0.2 }),
    });
  });
}

export {};
