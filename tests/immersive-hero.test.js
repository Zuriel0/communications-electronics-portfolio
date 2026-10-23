import assert from 'node:assert/strict';
import { test } from 'node:test';
import { startImmersiveHero } from '../src/components/sections/immersiveHeroMotion.js';

function fixture({ finePointer = true } = {}) {
  const environment = new EventTarget();
  const visibility = new EventTarget();
  visibility.visibilityState = 'visible';
  const media = new EventTarget();
  media.matches = finePointer;
  environment.matchMedia = () => media;
  const frames = new Map();
  let id = 0;
  let time = 0;
  environment.requestAnimationFrame = fn => { frames.set(++id, fn); return id; };
  environment.cancelAnimationFrame = key => frames.delete(key);
  let observe;
  let disconnected = false;
  environment.IntersectionObserver = class {
    constructor(callback) { observe = callback; }
    observe() {}
    disconnect() { disconnected = true; }
  };
  const values = new Map();
  const hero = new EventTarget();
  hero.dataset = {};
  hero.style = { setProperty: (key, value) => values.set(key, value), removeProperty: key => values.delete(key) };
  const bounds = { left: 0, top: 0, width: 1000, height: 1000 };
  hero.getBoundingClientRect = () => bounds;
  function flush() {
    time += 16.67;
    const work = [...frames.values()];
    frames.clear();
    work.forEach(fn => fn(time));
  }
  function pointer(x, y, type = 'mouse') {
    const event = new Event('pointermove');
    Object.assign(event, { clientX: x, clientY: y, pointerType: type });
    hero.dispatchEvent(event);
  }
  return { environment, visibility, media, values, hero, frames, bounds, flush, pointer,
    intersect: value => observe([{ isIntersecting: value }]), isDisconnected: () => disconnected };
}

test('static/reduced/paused composition schedules no frames or input subscriptions', () => {
  const f = fixture();
  const stop = startImmersiveHero(f.hero, { ...f, staticScene: true });
  f.pointer(1000, 1000);
  f.environment.dispatchEvent(new Event('scroll'));
  assert.equal(f.frames.size, 0);
  assert.equal(f.hero.dataset.motionRunning, 'false');
  assert.equal(f.values.size, 0);
  stop();
});

test('pointer depth is bounded, interpolated and stops requesting frames after settling', () => {
  const f = fixture();
  const stop = startImmersiveHero(f.hero, f);
  f.flush();
  assert.equal(f.frames.size, 0, 'CSS ambient motion does not need a JS frame loop');
  f.pointer(2000, -500);
  f.flush();
  assert.ok(Number(f.values.get('--pointer-x')) > 0 && Number(f.values.get('--pointer-x')) < 1);
  assert.ok(Number(f.values.get('--pointer-y')) < 0 && Number(f.values.get('--pointer-y')) > -1);
  for (let i = 0; i < 100; i++) f.flush();
  assert.equal(f.values.get('--pointer-x'), '1.0000');
  assert.equal(f.values.get('--pointer-y'), '-1.0000');
  assert.equal(f.frames.size, 0);
  f.hero.dispatchEvent(new Event('pointerleave'));
  for (let i = 0; i < 100; i++) f.flush();
  assert.equal(f.values.get('--pointer-x'), '0.0000');
  stop();
});

test('touch/coarse pointers do not drive perspective; scroll stays batched and clamped', () => {
  const f = fixture({ finePointer: false });
  const stop = startImmersiveHero(f.hero, f);
  f.flush();
  f.pointer(1000, 1000, 'touch');
  assert.equal(f.frames.size, 0);
  f.bounds.top = -425;
  for (let i = 0; i < 20; i++) f.environment.dispatchEvent(new Event('scroll'));
  assert.equal(f.frames.size, 1);
  f.flush();
  assert.equal(f.values.get('--scene-progress'), '0.5000');
  f.bounds.top = -2000;
  f.environment.dispatchEvent(new Event('resize'));
  f.flush();
  assert.equal(f.values.get('--scene-progress'), '1.0000');
  stop();
});

test('hidden tab and offscreen scene pause CSS, cancel work and resume without duplicate frames', () => {
  const f = fixture();
  const stop = startImmersiveHero(f.hero, f);
  f.flush();
  f.pointer(1000, 1000);
  f.visibility.visibilityState = 'hidden';
  f.visibility.dispatchEvent(new Event('visibilitychange'));
  assert.equal(f.frames.size, 0);
  assert.equal(f.hero.dataset.motionRunning, 'false');
  f.visibility.visibilityState = 'visible';
  for (let i = 0; i < 3; i++) f.visibility.dispatchEvent(new Event('visibilitychange'));
  assert.equal(f.frames.size, 1);
  f.flush();
  assert.equal(f.hero.dataset.motionRunning, 'true');
  f.intersect(false);
  assert.equal(f.frames.size, 0);
  assert.equal(f.hero.dataset.motionRunning, 'false');
  f.environment.dispatchEvent(new Event('scroll'));
  assert.equal(f.frames.size, 0);
  f.intersect(true);
  assert.equal(f.frames.size, 1);
  stop();
  assert.equal(f.isDisconnected(), true);
  assert.equal(f.frames.size, 0);
  assert.equal(f.values.size, 0);
  f.pointer(1000, 1000);
  f.environment.dispatchEvent(new Event('scroll'));
  f.visibility.dispatchEvent(new Event('visibilitychange'));
  f.media.dispatchEvent(new Event('change'));
  assert.equal(f.frames.size, 0, 'cleanup removes all subscriptions');
});
