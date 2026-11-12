// Groot formaat en presentatiemodus voor /portfolio/.
type Item = {
  id: string;
  title: string;
  kind: string;
  alt: string;
  caption: string;
  src: string;
  download: string;
  size: string;
};

const data: Item[] = JSON.parse(document.getElementById('viewer-data')?.textContent ?? '[]');
const dialog = document.querySelector<HTMLDialogElement>('#viewer');
const byId = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;

if (dialog && data.length > 0) {
  const img = byId<HTMLImageElement>('viewer-img');
  let index = 0;

  const render = () => {
    const item = data[index];
    img.src = item.src;
    img.alt = item.alt;
    byId('viewer-title').textContent = item.title;
    byId('viewer-kind').textContent = item.kind;
    byId('viewer-caption').textContent = item.caption;
    byId('viewer-count').textContent = `${index + 1} van ${data.length}`;
    const link = byId<HTMLAnchorElement>('viewer-download');
    link.href = item.download;
    link.download = `la-caleta-${item.id}.jpg`;
    byId('viewer-dl-label').textContent = `Download ${item.size}`;
    // Volgende en vorige alvast laden, zodat bladeren direct gaat.
    for (const near of [
      data[(index + 1) % data.length],
      data[(index - 1 + data.length) % data.length],
    ]) {
      new Image().src = near.src;
    }
  };

  const go = (step: number) => {
    index = (index + step + data.length) % data.length;
    render();
  };

  const open = (id: string) => {
    index = Math.max(
      0,
      data.findIndex((item) => item.id === id),
    );
    render();
    if (!dialog.open) dialog.showModal();
  };

  document.querySelectorAll<HTMLElement>('[data-open]').forEach((el) => {
    el.addEventListener('click', () => open(el.dataset.open ?? ''));
  });
  document.querySelectorAll<HTMLElement>('[data-present]').forEach((el) => {
    el.addEventListener('click', () => open(data[0].id));
  });

  dialog.querySelector('[data-viewer-close]')?.addEventListener('click', () => dialog.close());
  dialog.querySelector('[data-viewer-prev]')?.addEventListener('click', () => go(-1));
  dialog.querySelector('[data-viewer-next]')?.addEventListener('click', () => go(1));
  dialog.querySelector('[data-viewer-full]')?.addEventListener('click', () => {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    else dialog.requestFullscreen?.().catch(() => {});
  });

  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') go(1);
    else if (event.key === 'ArrowLeft') go(-1);
    else if (event.key === 'Home') {
      index = 0;
      render();
    } else if (event.key === 'End') {
      index = data.length - 1;
      render();
    } else return;
    event.preventDefault();
  });

  // Klik naast de inhoud sluit, een veeg bladert.
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  let startX = 0;
  img.addEventListener('pointerdown', (event) => {
    startX = event.clientX;
  });
  img.addEventListener('pointerup', (event) => {
    const dx = event.clientX - startX;
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
  });
}
