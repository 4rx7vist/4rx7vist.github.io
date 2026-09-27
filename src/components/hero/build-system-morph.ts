/** Six engineering components become one illustrative request path. No runtime UI framework. */
const root = document.querySelector<HTMLElement>('[data-build-system]');

if (root) {
  const buttons = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-mode-button]'));
  const nodes = Array.from(root.querySelectorAll<SVGGElement>('[data-node]'));
  const paths = Array.from(root.querySelectorAll<SVGPathElement>('[data-connection]'));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const mobile = window.matchMedia('(max-width: 600px)');
  const svg = root.querySelector<SVGSVGElement>('[data-morph-svg]')!;
  const numbers = (value: string) => (value.match(/-?\d*\.?\d+/g) || []).map(Number);
  const geometry = paths.map(path => ({ from: numbers(path.dataset.from!), to: numbers(path.dataset.to!) }));
  // Recompose the diagram on mobile instead of shrinking six desktop nodes.
  const mobileBuild = [[15, 30], [195, 30], [15, 190], [195, 190], [15, 350], [195, 350]];
  const mobileSystem = [[15, 30], [195, 30], [195, 190], [15, 190], [15, 350], [195, 350]];
  const mobilePaths = [
    [165, 72, 175, 72, 184, 72, 191, 72],
    [270, 114, 270, 140, 270, 160, 270, 185],
    [195, 232, 184, 232, 175, 232, 169, 232],
    [90, 274, 90, 300, 90, 320, 90, 345],
    [165, 392, 175, 392, 184, 392, 191, 392],
  ];
  let progress = 0;
  let target = 0;
  let frame = 0;

  function render(value: number) {
    nodes.forEach((node, index) => {
      const { x, y, sx, sy } = node.dataset;
      const from = mobile.matches ? mobileBuild[index] : [Number(x), Number(y)];
      const to = mobile.matches ? mobileSystem[index] : [Number(sx), Number(sy)];
      node.setAttribute('transform', `translate(${from[0] + (to[0] - from[0]) * value} ${from[1] + (to[1] - from[1]) * value})`);
    });
    paths.forEach((path, i) => {
      const from = mobile.matches ? mobilePaths[i].map((v, index) => index % 2 === 0 ? v : v - 12) : geometry[i].from;
      const to = mobile.matches ? mobilePaths[i] : geometry[i].to;
      const p = from.map((v, index) => v + (to[index] - v) * value);
      path.setAttribute('d', `M ${p[0]} ${p[1]} C ${p[2]} ${p[3]} ${p[4]} ${p[5]} ${p[6]} ${p[7]}`);
    });
  }
  function resizeDiagram() {
    svg.setAttribute('viewBox', mobile.matches ? '0 0 360 465' : '0 0 560 470');
    render(progress);
  }
  mobile.addEventListener('change', resizeDiagram);
  resizeDiagram();

  function changeMode(mode: string) {
    const isSystem = mode === 'system';
    target = isSystem ? 1 : 0;
    cancelAnimationFrame(frame);
    root!.dataset.mode = mode;
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.modeButton === mode)));
    root!.querySelectorAll<HTMLElement>('[data-caption]').forEach(caption => { caption.hidden = caption.dataset.caption !== mode; });
    root!.querySelectorAll<SVGTextElement>('[data-node-label]').forEach(label => { label.textContent = isSystem ? label.dataset.systemLabel! : label.dataset.buildLabel!; });
    if (reduceMotion.matches) { progress = target; render(progress); return; }
    const startProgress = progress;
    const start = performance.now();
    const duration = parseFloat(getComputedStyle(root!).getPropertyValue('--motion-morph')) || 900;
    const tick = (now: number) => {
      const elapsed = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - elapsed, 4);
      progress = startProgress + (target - startProgress) * eased;
      render(progress);
      if (elapsed < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
  }
  buttons.forEach((button, index) => {
    button.addEventListener('click', () => changeMode(button.dataset.modeButton!));
    button.addEventListener('keydown', event => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? buttons.length - 1 : (index + 1) % buttons.length;
      buttons[next].focus();
      changeMode(buttons[next].dataset.modeButton!);
    });
  });
  reduceMotion.addEventListener('change', () => { if (reduceMotion.matches) { cancelAnimationFrame(frame); progress = target; render(progress); } });
  window.addEventListener('pagehide', () => cancelAnimationFrame(frame), { once: true });
}
