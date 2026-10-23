// One observer and at most one timer per visible diagram; no per-edge RAF.
export function observeDiagramPlayback(element, {
  paused = false, reducedMotion = false, onPlaying, onStep,
  delay = 1800, visibility = document, environment = window,
}) {
  let disposed = false;
  let inView = false;
  let running = false;
  let timer;

  function sync() {
    if (disposed) return;
    const next = !paused && !reducedMotion && inView && visibility.visibilityState === 'visible';
    element.dataset.playing = String(next);
    if (next === running) return;
    running = next;
    clearInterval(timer);
    timer = undefined;
    if (running) timer = setInterval(onStep, delay);
    onPlaying(running);
  }
  element.dataset.playing = 'false';
  onPlaying(false);
  if (paused || reducedMotion) return () => { disposed = true; };

  const observer = environment.IntersectionObserver ? new environment.IntersectionObserver(entries => {
    inView = entries[0].isIntersecting && entries[0].intersectionRatio >= .12;
    sync();
  }, { threshold: [0, .12], rootMargin: '-80px 0px 0px 0px' }) : null;

  // Older engines retain event-driven visibility checks, never an idle frame loop.
  function checkBounds() {
    const bounds = element.getBoundingClientRect();
    const visibleHeight = Math.max(0, Math.min(bounds.bottom, environment.innerHeight) - Math.max(bounds.top, 80));
    inView = visibleHeight >= Math.min(bounds.height * .12, 120);
    sync();
  }
  if (observer) observer.observe(element);
  else {
    environment.addEventListener('scroll', checkBounds, { passive: true });
    environment.addEventListener('resize', checkBounds);
    checkBounds();
  }
  visibility.addEventListener('visibilitychange', sync);
  return () => {
    disposed = true;
    clearInterval(timer);
    observer?.disconnect();
    environment.removeEventListener('scroll', checkBounds);
    environment.removeEventListener('resize', checkBounds);
    visibility.removeEventListener('visibilitychange', sync);
    element.dataset.playing = 'false';
  };
}
