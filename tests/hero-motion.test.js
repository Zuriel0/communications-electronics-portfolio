import assert from 'node:assert/strict';
import { test } from 'node:test';
import { startHeroTransition } from '../src/components/sections/heroMotion.js';

function fixture(nativeTimeline = false) {
  const environment = new EventTarget();
  environment.CSS = { supports: () => nativeTimeline };
  const frames = new Map();
  let id = 0;
  environment.requestAnimationFrame = callback => { frames.set(++id, callback); return id; };
  environment.cancelAnimationFrame = key => frames.delete(key);
  const values = new Map();
  const bounds = { top: 0, height: 1000 };
  const hero = {
    style: { setProperty: (key, value) => values.set(key, value), removeProperty: key => values.delete(key) },
    getBoundingClientRect: () => bounds,
  };
  const flush = () => {
    const pending = [...frames.values()];
    frames.clear();
    pending.forEach(callback => callback());
  };
  return { environment, frames, values, bounds, hero, flush };
}

for (const mode of ['reduced motion', 'native timeline']) {
  test(`${mode}: no fallback animation work is scheduled`, () => {
    const f = fixture(mode === 'native timeline');
    f.values.set('--hero-progress', '.5');
    const stop = startHeroTransition(f.hero, { reducedMotion: mode === 'reduced motion', environment: f.environment });
    f.environment.dispatchEvent(new Event('scroll'));
    assert.equal(f.frames.size, 0);
    assert.equal(f.values.has('--hero-progress'), false);
    stop();
  });
}

test('fallback clamps progress, batches scroll work and cleans up pending work', () => {
  const f = fixture();
  const stop = startHeroTransition(f.hero, { reducedMotion: false, environment: f.environment });
  assert.equal(f.values.get('--hero-progress'), '0.0000');
  f.bounds.top = -425;
  for (let i = 0; i < 10; i++) f.environment.dispatchEvent(new Event('scroll'));
  assert.equal(f.frames.size, 1);
  f.flush();
  assert.equal(f.values.get('--hero-progress'), '0.5000');
  f.bounds.top = -2000;
  f.environment.dispatchEvent(new Event('resize'));
  f.flush();
  assert.equal(f.values.get('--hero-progress'), '1.0000');
  f.bounds.top = 200;
  f.environment.dispatchEvent(new Event('scroll'));
  f.flush();
  assert.equal(f.values.get('--hero-progress'), '0.0000');
  f.environment.dispatchEvent(new Event('scroll'));
  stop();
  assert.equal(f.frames.size, 0);
  assert.equal(f.values.has('--hero-progress'), false);
  f.environment.dispatchEvent(new Event('scroll'));
  f.environment.dispatchEvent(new Event('resize'));
  assert.equal(f.frames.size, 0);
});

test('switching to reduced motion removes a running fallback without leaving transforms behind', () => {
  const f = fixture();
  f.bounds.top = -425;
  const stop = startHeroTransition(f.hero, { reducedMotion: false, environment: f.environment });
  assert.equal(f.values.get('--hero-progress'), '0.5000');
  stop();
  const stopReduced = startHeroTransition(f.hero, { reducedMotion: true, environment: f.environment });
  f.environment.dispatchEvent(new Event('scroll'));
  assert.equal(f.frames.size, 0);
  assert.equal(f.values.has('--hero-progress'), false);
  stopReduced();
});
