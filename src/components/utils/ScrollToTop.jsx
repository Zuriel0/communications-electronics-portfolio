import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, hash, key } = useLocation();
  const hasVisited = useRef(false);
  useEffect(() => {
    let frame;
    let previousOffset;
    let stableFrames = 0;
    let hashId = hash.slice(1);
    try { hashId = decodeURIComponent(hashId); } catch { /* Keep malformed hashes harmless. */ }
    function settle() {
      const destination = (hash ? document.getElementById(hashId) : document.querySelector('main')) || document.querySelector('[data-route-error]');
      if (!destination || destination.closest('[data-route-pending]')) return;
      if (hash) {
        // Existing diagrams choose mobile heights after mounting. Jump only once
        // the destination has stayed in place across consecutive layout frames.
        const offset = destination.getBoundingClientRect().top + window.scrollY;
        stableFrames = previousOffset !== undefined && Math.abs(offset - previousOffset) < .5 ? stableFrames + 1 : 0;
        previousOffset = offset;
        if (stableFrames < 3) {
          frame = requestAnimationFrame(settle);
          return;
        }
      }
      observer.disconnect();
      const shouldFocus = hasVisited.current || Boolean(hash);
      hasVisited.current = true;
      if (shouldFocus) destination.focus({ preventScroll: true });
      if (hash) destination.scrollIntoView({ behavior: 'instant', block: 'start' });
      else window.scrollTo({ top: 0, behavior: 'instant' });
    }
    // A lazy route may commit after the location effect; wait for its real destination.
    const observer = new MutationObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(settle);
    });
    observer.observe(document.getElementById('root'), { childList: true, subtree: true });
    frame = requestAnimationFrame(settle);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); };
  }, [pathname, hash, key]);
  return null;
}
