// CSS scroll timelines are preferred. This fallback only serves older engines.
export function startHeroTransition(hero, { reducedMotion, environment = window }) {
  const reset = () => hero.style.removeProperty('--hero-progress');
  const nativeTimeline = environment.CSS?.supports('animation-timeline', 'view()')
    && environment.CSS?.supports('animation-range', 'exit 0% exit 85%');
  if (reducedMotion || nativeTimeline) {
    reset();
    return reset;
  }

  let frame = 0;
  function update() {
    frame = 0;
    const { top, height } = hero.getBoundingClientRect();
    const progress = Math.min(1, Math.max(0, -top / Math.max(1, height * .85)));
    hero.style.setProperty('--hero-progress', progress.toFixed(4));
  }
  function schedule() {
    if (!frame) frame = environment.requestAnimationFrame(update);
  }
  environment.addEventListener('scroll', schedule, { passive: true });
  environment.addEventListener('resize', schedule);
  update();
  return () => {
    environment.cancelAnimationFrame(frame);
    environment.removeEventListener('scroll', schedule);
    environment.removeEventListener('resize', schedule);
    reset();
  };
}
