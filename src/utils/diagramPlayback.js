// No animation work is scheduled for reduced motion or a hidden document.
export function startDiagramPlayback(onTick, { reducedMotion, visibility = document, delay = 1800 }) {
  if (reducedMotion) return () => {};
  let interval;
  function updatePlayback() {
    clearInterval(interval);
    if (visibility.visibilityState === 'visible') interval = setInterval(onTick, delay);
  }
  updatePlayback();
  visibility.addEventListener('visibilitychange', updatePlayback);
  return () => {
    clearInterval(interval);
    visibility.removeEventListener('visibilitychange', updatePlayback);
  };
}
