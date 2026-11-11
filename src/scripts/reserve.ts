// Reserveringsformulier: tijdsloten uit de openingstijden, inline validatie, Web3Forms of mailto.
import { openingHours, reservation, site, tapasDay } from '../data/site';

const form = document.querySelector<HTMLFormElement>('[data-reserve-form]');
const success = document.querySelector<HTMLElement>('[data-form-success]');

const TZ = 'Europe/Amsterdam';
const toMinutes = (time: string) => {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
};
const todayIso = () => new Intl.DateTimeFormat('en-CA', { timeZone: TZ }).format(new Date());
const nowMinutes = () => {
  const [h, m] = new Intl.DateTimeFormat('en-GB', {
    timeZone: TZ,
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  })
    .format(new Date())
    .split(':')
    .map(Number);
  return h * 60 + m;
};
const dayOf = (iso: string) => new Date(`${iso}T12:00:00Z`).getUTCDay();
const longDate = (iso: string) =>
  new Intl.DateTimeFormat('nl-NL', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    timeZone: 'UTC',
  }).format(new Date(`${iso}T12:00:00Z`));

const slotsFor = (iso: string): string[] => {
  const entry = openingHours.find((d) => d.index === dayOf(iso));
  if (entry?.status !== 'open') return [];
  const last = toMinutes(reservation.kitchenCloses) - reservation.lastSlotOffset;
  // Vandaag: niet later reserveren dan een uur van tevoren.
  const from = Math.max(toMinutes(entry.opens), iso === todayIso() ? nowMinutes() + 60 : 0);
  const slots: string[] = [];
  for (let t = toMinutes(entry.opens); t <= last; t += reservation.slotStep) {
    if (t >= from)
      slots.push(
        `${String(Math.floor(t / 60)).padStart(2, '0')}:${String(t % 60).padStart(2, '0')}`,
      );
  }
  return slots;
};

if (form && success) {
  const key = form.dataset.key;
  const el = <T extends HTMLElement>(selector: string) => form.querySelector<T>(selector);
  const datum = el<HTMLInputElement>('#datum');
  const personen = el<HTMLSelectElement>('#personen');
  const naam = el<HTMLInputElement>('#naam');
  const telefoon = el<HTMLInputElement>('#telefoon');
  const email = el<HTMLInputElement>('#email');
  const opmerking = el<HTMLTextAreaElement>('#opmerking');
  const radios = [...form.querySelectorAll<HTMLInputElement>('input[name="tijd"]')];
  const slotHint = el<HTMLElement>('[data-slot-hint]');
  const submit = el<HTMLButtonElement>('[data-submit]');
  const submitLabel = el<HTMLElement>('[data-submit-label]');
  const spinner = el<HTMLElement>('[data-spinner]');
  const status = el<HTMLElement>('[data-form-status]');
  const formError = el<HTMLElement>('[data-form-error]');
  const touched = new Set<string>();

  if (datum) datum.min = todayIso();
  const params = new URLSearchParams(window.location.search);
  if (datum && /^\d{4}-\d{2}-\d{2}$/.test(params.get('datum') ?? ''))
    datum.value = params.get('datum') ?? '';
  if (personen && params.get('personen')) {
    const wanted = params.get('personen') ?? '';
    if ([...personen.options].some((o) => o.value === wanted)) personen.value = wanted;
  }

  const selectedTime = () => radios.find((r) => r.checked)?.value ?? '';

  const updateSlots = () => {
    const iso = datum?.value ?? '';
    const available = iso ? slotsFor(iso) : [];
    for (const radio of radios) {
      const ok = available.includes(radio.value);
      radio.disabled = !ok;
      if (!ok) radio.checked = false;
      const label = radio.closest<HTMLElement>('[data-slot]');
      if (label) label.dataset.hidden = String(!ok);
    }
    if (!slotHint) return;
    const entry = iso ? openingHours.find((d) => d.index === dayOf(iso)) : undefined;
    if (!iso) slotHint.textContent = 'Kies eerst een datum, dan ziet u welke tijden er zijn.';
    else if (entry?.status !== 'open')
      slotHint.textContent = `Op ${entry?.day.toLowerCase()} zijn we gesloten.`;
    else if (available.length === 0)
      slotHint.textContent =
        'Vandaag kan er online niet meer gereserveerd worden. Kies een andere dag of bel ons.';
    else {
      const tapas = (tapasDay.dayIndexes as readonly number[]).includes(dayOf(iso))
        ? ` Het is tapasdag: inloop tussen ${tapasDay.walkIn.from} en ${tapasDay.walkIn.until}.`
        : '';
      slotHint.textContent = `Tijden op ${longDate(iso)}. De keuken sluit om ${reservation.kitchenCloses}.${tapas}`;
    }
  };

  const validators: Record<string, () => string> = {
    datum: () => {
      const iso = datum?.value ?? '';
      if (!iso) return 'Kies een datum.';
      if (iso < todayIso()) return 'Deze datum is al voorbij. Kies vandaag of later.';
      const entry = openingHours.find((d) => d.index === dayOf(iso));
      if (entry?.status !== 'open')
        return 'Op maandag en dinsdag zijn we gesloten. Kies een andere dag.';
      if (slotsFor(iso).length === 0)
        return 'Vandaag zijn er online geen tijden meer. Kies een andere dag.';
      return '';
    },
    personen: () =>
      personen?.value === 'meer'
        ? `Voor groepen van meer dan ${reservation.maxGuests} personen maken we graag een arrangement op maat. Bel ons op ${site.phone}.`
        : '',
    tijd: () => (selectedTime() ? '' : 'Kies een tijd.'),
    naam: () => ((naam?.value.trim().length ?? 0) >= 2 ? '' : 'Vul uw naam in.'),
    telefoon: () =>
      (telefoon?.value.replace(/\D/g, '').length ?? 0) >= 10
        ? ''
        : 'Vul een telefoonnummer in, bijvoorbeeld 06 12345678.',
    email: () =>
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email?.value.trim() ?? '')
        ? ''
        : 'Vul een geldig e-mailadres in, bijvoorbeeld naam@voorbeeld.nl.',
  };

  const controls: Record<string, HTMLElement[]> = {
    datum: datum ? [datum] : [],
    personen: personen ? [personen] : [],
    tijd: radios,
    naam: naam ? [naam] : [],
    telefoon: telefoon ? [telefoon] : [],
    email: email ? [email] : [],
  };

  const check = (name: string) => {
    const message = validators[name]();
    const target = el<HTMLElement>(`[data-error-for="${name}"]`);
    if (target) {
      target.hidden = !message;
      target.textContent = message;
      if (message && name === 'personen') {
        target.append(' ');
        const link = document.createElement('a');
        link.href = site.phoneHref;
        link.className = 'link-text';
        link.textContent = `Bel ${site.phone}`;
        target.append(link);
      }
    }
    for (const control of controls[name])
      control.setAttribute('aria-invalid', String(Boolean(message)));
    return !message;
  };

  const watch = (name: string, element: HTMLElement | null, events: string[]) => {
    if (!element) return;
    element.addEventListener('blur', () => {
      touched.add(name);
      check(name);
    });
    for (const type of events) {
      element.addEventListener(type, () => {
        if (touched.has(name)) check(name);
      });
    }
  };

  watch('naam', naam, ['input']);
  watch('telefoon', telefoon, ['input']);
  watch('email', email, ['input']);
  datum?.addEventListener('change', () => {
    touched.add('datum');
    updateSlots();
    check('datum');
    if (touched.has('tijd')) check('tijd');
  });
  personen?.addEventListener('change', () => {
    touched.add('personen');
    check('personen');
  });
  for (const radio of radios) {
    radio.addEventListener('change', () => {
      touched.add('tijd');
      check('tijd');
    });
  }

  updateSlots();
  if (datum?.value) check('datum');

  const summary = () => ({
    datum: datum?.value ? longDate(datum.value) : '',
    tijd: selectedTime(),
    personen: personen?.selectedOptions[0]?.textContent?.trim() ?? '',
    naam: naam?.value.trim() ?? '',
  });

  const setPending = (pending: boolean) => {
    if (!submit) return;
    submit.disabled = pending;
    submit.setAttribute('aria-disabled', String(pending));
    if (spinner) spinner.hidden = !pending;
    if (submitLabel)
      submitLabel.textContent = pending ? 'Bezig met versturen' : 'Verstuur aanvraag';
    if (status) status.textContent = pending ? 'Uw aanvraag wordt verstuurd.' : '';
  };

  const showSuccess = (mode: 'sent' | 'mail') => {
    const data = summary();
    for (const [name, value] of Object.entries(data)) {
      const target = success.querySelector<HTMLElement>(`[data-sum="${name}"]`);
      if (target) target.textContent = value;
    }
    const set = (selector: string, text: string) => {
      const target = success.querySelector<HTMLElement>(selector);
      if (target) target.textContent = text;
    };
    if (mode === 'mail') {
      set('[data-success-label]', 'E-mail klaargezet');
      set('[data-success-title]', 'Uw e-mailprogramma is geopend.');
      set(
        '[data-success-text]',
        `Verstuur de e-mail om uw aanvraag af te ronden. Opende er niets? Bel ${site.phone} of mail naar ${site.email}.`,
      );
      set('[data-form-reset]', 'Terug naar het formulier');
    }
    success.dataset.mode = mode;
    form.hidden = true;
    success.hidden = false;
    success.focus();
    success.scrollIntoView({ block: 'start' });
  };

  const showFormError = (text?: string) => {
    if (!formError) return;
    const detail = formError.querySelector<HTMLElement>('[data-form-error-text]');
    if (detail && text) detail.textContent = text;
    formError.hidden = false;
    formError.scrollIntoView({ block: 'center' });
  };

  const mailtoHref = () => {
    const data = summary();
    const lines = [
      `Naam: ${data.naam}`,
      `Datum: ${data.datum}`,
      `Tijd: ${data.tijd}`,
      `Personen: ${data.personen}`,
      `Telefoon: ${telefoon?.value.trim() ?? ''}`,
      `E-mail: ${email?.value.trim() ?? ''}`,
      `Opmerking: ${opmerking?.value.trim() || '-'}`,
    ];
    const subject = `Reserveringsaanvraag ${data.datum} ${data.tijd}`;
    return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (formError) formError.hidden = true;
    const names = Object.keys(validators);
    for (const name of names) touched.add(name);
    const invalid = names.filter((name) => !check(name));
    if (invalid.length > 0) {
      if (status) status.textContent = 'Controleer de gemarkeerde velden.';
      controls[invalid[0]][0]?.focus();
      return;
    }

    // Honeypot ingevuld: doe alsof het gelukt is, maar verstuur niets.
    if (el<HTMLInputElement>('#botcheck')?.checked) {
      showSuccess('sent');
      return;
    }

    if (!key) {
      window.location.href = mailtoHref();
      showSuccess('mail');
      return;
    }

    setPending(true);
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 15000);
    try {
      const data = summary();
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          access_key: key,
          subject: `Reserveringsaanvraag ${data.datum} ${data.tijd}, ${data.personen}`,
          from_name: 'Website La Caleta',
          name: data.naam,
          email: email?.value.trim(),
          telefoon: telefoon?.value.trim(),
          datum: data.datum,
          tijd: data.tijd,
          personen: data.personen,
          opmerking: opmerking?.value.trim() || '-',
          botcheck: false,
        }),
      });
      const result = (await response.json().catch(() => ({}))) as { success?: boolean };
      if (response.ok && result.success) showSuccess('sent');
      else showFormError();
    } catch {
      showFormError(
        'De verbinding viel weg of duurde te lang. Uw gegevens staan er nog. Probeer het opnieuw, of bel ons.',
      );
    } finally {
      window.clearTimeout(timer);
      setPending(false);
    }
  });

  success.querySelector('[data-form-reset]')?.addEventListener('click', () => {
    if (success.dataset.mode === 'sent') {
      form.reset();
      touched.clear();
      updateSlots();
    }
    success.hidden = true;
    form.hidden = false;
    datum?.focus();
  });
}
