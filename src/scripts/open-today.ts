// "Vandaag open" wordt in de browser berekend, niet bij het bouwen: zo klopt het elke dag.
import { openingHours } from '../data/site';

const dayNames = ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'];

const toMinutes = (time: string) => {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
};

/** Dag (0 = zondag) en minuten sinds middernacht in Nederlandse tijd. */
export const amsterdamNow = (date = new Date()) => {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Amsterdam',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date);
  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? '';
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
  return { day, minutes: Number(get('hour')) * 60 + Number(get('minute')) };
};

export type OpenStatus = { state: 'open' | 'closed'; text: string; today: number };

export const openStatus = (date = new Date()): OpenStatus => {
  const { day, minutes } = amsterdamNow(date);
  const today = openingHours.find((entry) => entry.index === day);

  if (today?.status === 'open') {
    if (minutes < toMinutes(today.opens)) {
      return { state: 'open', text: `Vandaag open vanaf ${today.opens}`, today: day };
    }
    if (minutes < toMinutes(today.closes)) {
      return { state: 'open', text: `Nu open, tot ${today.closes}`, today: day };
    }
  }

  for (let step = 1; step <= 7; step += 1) {
    const next = (day + step) % 7;
    const entry = openingHours.find((item) => item.index === next);
    if (entry?.status !== 'open') continue;
    const when = step === 1 ? 'morgen' : dayNames[next];
    return { state: 'closed', text: `Nu gesloten, ${when} vanaf ${entry.opens}`, today: day };
  }

  return { state: 'closed', text: 'Nu gesloten', today: day };
};

const render = () => {
  const status = openStatus();
  document.querySelectorAll<HTMLElement>('[data-open-today]').forEach((element) => {
    element.textContent = status.text;
  });
  document.querySelectorAll<HTMLElement>('[data-open-dot]').forEach((element) => {
    element.dataset.state = status.state;
  });
  document.querySelectorAll<HTMLElement>('[data-day]').forEach((row) => {
    const isToday = Number(row.dataset.day) === status.today;
    row.dataset.today = String(isToday);
    const label = row.querySelector<HTMLElement>('[data-today-label]');
    if (label) label.hidden = !isToday;
  });
};

render();
// Bijwerken als de pagina lang openstaat, bijvoorbeeld rond sluitingstijd.
window.setInterval(render, 60_000);
