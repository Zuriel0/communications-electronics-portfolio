const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const variables = ['--scene-progress', '--pointer-x', '--pointer-y'];

// CSS owns ambient motion. RAF only runs while input is changing or settling.
export function startImmersiveHero(hero, { staticScene = false, environment = window, visibility = document } = {}) {
  function reset() {
    variables.forEach(name => hero.style.removeProperty(name));
    hero.dataset.motionRunning = 'false';
  }
  reset();
  if (staticScene) return reset;

  const pointerMedia = environment.matchMedia('(hover: hover) and (pointer: fine)');
  let inView = true;
  let frame = 0;
  let lastTime;
  let dirty = true;
  let bounds;
  let x = 0;
  let y = 0;
  let targetX = 0;
  let targetY = 0;
  const canRun = () => visibility.visibilityState === 'visible' && inView;

  function schedule() {
    if (!frame && canRun()) frame = environment.requestAnimationFrame(update);
  }
  function update(time) {
    frame = 0;
    if (!canRun()) return;
    if (dirty) {
      bounds = hero.getBoundingClientRect();
      const progress = clamp(-bounds.top / Math.max(1, bounds.height * .85), 0, 1);
      hero.style.setProperty('--scene-progress', progress.toFixed(4));
      dirty = false;
    }
    const elapsed = lastTime === undefined ? 16.67 : clamp(time - lastTime, 0, 64);
    lastTime = time;
    const blend = 1 - Math.exp(-elapsed / 110);
    x += (targetX - x) * blend;
    y += (targetY - y) * blend;
    if (Math.abs(targetX - x) < .001) x = targetX;
    if (Math.abs(targetY - y) < .001) y = targetY;
    hero.style.setProperty('--pointer-x', x.toFixed(4));
    hero.style.setProperty('--pointer-y', y.toFixed(4));
    if (x !== targetX || y !== targetY) schedule();
    else lastTime = undefined;
  }
  function onPointer(event) {
    if (!pointerMedia.matches || event.pointerType === 'touch' || !canRun()) return;
    bounds ||= hero.getBoundingClientRect();
    targetX = clamp((event.clientX - bounds.left) / Math.max(1, bounds.width) * 2 - 1, -1, 1);
    targetY = clamp((event.clientY - bounds.top) / Math.max(1, bounds.height) * 2 - 1, -1, 1);
    schedule();
  }
  function centerPointer() { targetX = targetY = 0; schedule(); }
  function onScroll() { dirty = true; schedule(); }
  function syncVisibility() {
    hero.dataset.motionRunning = String(canRun());
    environment.cancelAnimationFrame(frame);
    frame = 0;
    lastTime = undefined;
    if (canRun()) { dirty = true; schedule(); }
    else { targetX = targetY = x = y = 0; }
  }
  const observer = environment.IntersectionObserver ? new environment.IntersectionObserver(entries => {
    inView = entries[0].isIntersecting;
    syncVisibility();
  }) : null;
  observer?.observe(hero);
  hero.addEventListener('pointermove', onPointer, { passive: true });
  hero.addEventListener('pointerleave', centerPointer);
  pointerMedia.addEventListener('change', centerPointer);
  environment.addEventListener('scroll', onScroll, { passive: true });
  environment.addEventListener('resize', onScroll);
  visibility.addEventListener('visibilitychange', syncVisibility);
  syncVisibility();

  return () => {
    environment.cancelAnimationFrame(frame);
    observer?.disconnect();
    hero.removeEventListener('pointermove', onPointer);
    hero.removeEventListener('pointerleave', centerPointer);
    pointerMedia.removeEventListener('change', centerPointer);
    environment.removeEventListener('scroll', onScroll);
    environment.removeEventListener('resize', onScroll);
    visibility.removeEventListener('visibilitychange', syncVisibility);
    reset();
  };
}
