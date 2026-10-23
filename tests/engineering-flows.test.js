import assert from 'node:assert/strict';
import { test } from 'node:test';
import { observeDiagramPlayback } from '../src/utils/diagramVisibility.js';
import { activeFlowEdges, decorateFlowEdges, flowStepCount } from '../src/utils/engineeringFlows.js';

function fixture() {
  const visibility = new EventTarget();
  visibility.visibilityState = 'visible';
  const environment = new EventTarget();
  let callback;
  let disconnected = false;
  environment.IntersectionObserver = class {
    constructor(fn) { callback = fn; }
    observe() {}
    disconnect() { disconnected = true; }
  };
  const element = { dataset: {} };
  const states = [];
  let ticks = 0;
  const options = { visibility, environment, onPlaying: state => states.push(state), onStep: () => ticks++ };
  return { element, options, states, intersect: (ratio = 1) => callback?.([{ isIntersecting: ratio > 0, intersectionRatio: ratio }]),
    visibility: state => { visibility.visibilityState = state; visibility.dispatchEvent(new Event('visibilitychange')); },
    ticks: () => ticks, disconnected: () => disconnected };
}

test('autoplay waits for a useful viewport intersection and cancels work on exit', context => {
  context.mock.timers.enable({ apis: ['setInterval'] });
  const f = fixture();
  const stop = observeDiagramPlayback(f.element, f.options);
  context.mock.timers.tick(3600);
  assert.equal(f.ticks(), 0);
  f.intersect(.05);
  context.mock.timers.tick(3600);
  assert.equal(f.ticks(), 0);
  f.intersect(.5);
  context.mock.timers.tick(1800);
  assert.equal(f.ticks(), 1);
  assert.equal(f.element.dataset.playing, 'true');
  f.intersect(0);
  context.mock.timers.tick(5400);
  assert.equal(f.ticks(), 1);
  assert.equal(f.element.dataset.playing, 'false');
  f.intersect(.5);
  context.mock.timers.tick(1800);
  assert.equal(f.ticks(), 2);
  stop();
});

test('hidden tab pauses CSS and timer; repeated visibility notifications do not duplicate intervals', context => {
  context.mock.timers.enable({ apis: ['setInterval'] });
  const f = fixture();
  const stop = observeDiagramPlayback(f.element, f.options);
  f.intersect();
  context.mock.timers.tick(1800);
  f.visibility('hidden');
  assert.equal(f.element.dataset.playing, 'false');
  context.mock.timers.tick(5400);
  assert.equal(f.ticks(), 1);
  f.visibility('visible');
  f.visibility('visible');
  f.intersect();
  context.mock.timers.tick(1800);
  assert.equal(f.ticks(), 2);
  stop();
  f.intersect();
  f.visibility('visible');
  context.mock.timers.tick(5400);
  assert.equal(f.ticks(), 2, 'late observer callbacks and visibility cannot revive a disposed controller');
  assert.equal(f.disconnected(), true);
});

for (const state of ['paused', 'reducedMotion']) {
  test(`${state} prevents autoplay, including after hidden/visible`, context => {
    context.mock.timers.enable({ apis: ['setInterval'] });
    const f = fixture();
    const stop = observeDiagramPlayback(f.element, { ...f.options, [state]: true });
    f.intersect();
    f.visibility('hidden');
    f.visibility('visible');
    context.mock.timers.tick(7200);
    assert.equal(f.ticks(), 0);
    assert.equal(f.element.dataset.playing, 'false');
    stop();
  });
}

test('switching to static mode cancels an active interval; manual intent remains authoritative', context => {
  context.mock.timers.enable({ apis: ['setInterval'] });
  const f = fixture();
  let stop = observeDiagramPlayback(f.element, f.options);
  f.intersect();
  context.mock.timers.tick(1800);
  stop();
  stop = observeDiagramPlayback(f.element, { ...f.options, reducedMotion: true });
  context.mock.timers.tick(3600);
  assert.equal(f.ticks(), 1);
  stop();
  stop = observeDiagramPlayback(f.element, { ...f.options, paused: true });
  f.visibility('visible');
  context.mock.timers.tick(3600);
  assert.equal(f.ticks(), 1, 'restoring normal motion must not override an explicit pause');
  stop();
});

test('fallback without IntersectionObserver is event driven and removes its listeners', context => {
  context.mock.timers.enable({ apis: ['setInterval'] });
  const f = fixture();
  delete f.options.environment.IntersectionObserver;
  f.options.environment.innerHeight = 900;
  let top = 1000;
  let reads = 0;
  f.element.getBoundingClientRect = () => {
    reads++;
    return { top, bottom: top + 700, height: 700 };
  };
  const stop = observeDiagramPlayback(f.element, f.options);
  context.mock.timers.tick(3600);
  assert.equal(reads, 1, 'no idle polling for offscreen diagrams');
  assert.equal(f.ticks(), 0);
  top = 180;
  f.options.environment.dispatchEvent(new Event('scroll'));
  context.mock.timers.tick(1800);
  assert.equal(f.ticks(), 1);
  top = -800;
  f.options.environment.dispatchEvent(new Event('resize'));
  context.mock.timers.tick(3600);
  assert.equal(f.ticks(), 1);
  const lastReads = reads;
  stop();
  f.options.environment.dispatchEvent(new Event('scroll'));
  f.options.environment.dispatchEvent(new Event('resize'));
  assert.equal(reads, lastReads);
});

test('Web destination is exclusive; monitoring branches remain independent', () => {
  const destinations = new Set();
  for (let step = 0; step < 9; step++) {
    const active = activeFlowEdges('balance', step);
    assert.ok(active.includes('client-lb'));
    const web = active.filter(id => id.startsWith('lb-ws'));
    assert.equal(web.length, 1);
    destinations.add(web[0]);
  }
  assert.equal(destinations.size, 3, 'preserve the original three-slot schematic');
  for (let step = 0; step < 3; step++) {
    const active = activeFlowEdges('business', step);
    assert.ok(active.includes('m1') && active.includes('m2'));
    assert.equal(active.filter(id => /^e\d$/.test(id)).length, 1);
  }
  assert.deepEqual(activeFlowEdges('logic', 1), ['ssh-web', 'ssh-radius']);
  for (let step = 0; step < flowStepCount('logic'); step++) {
    const active = activeFlowEdges('logic', step);
    assert.ok(!active.includes('policy-detect'));
    assert.ok(!(active.includes('web-detect') && active.includes('radius-detect')));
  }
});

test('methodology advances through five directed transfers without skipping the six steps', () => {
  assert.deepEqual(Array.from({ length: flowStepCount('methodology') }, (_, step) => activeFlowEdges('methodology', step)),
    [['a-b'], ['b-c'], ['c-d'], ['d-e'], ['e-f']]);
  assert.deepEqual(activeFlowEdges('methodology', 5), ['a-b']);
});

test('edge presentation never creates a transfer or changes model connections and labels', () => {
  const edges = [{ id: 'mac-ssh', source: 'mac', target: 'ssh', label: 'Original', sourceHandle: 'bottom', style: { stroke: 'blue' } },
    { id: 'policy-detect', source: 'policy', target: 'detect', label: 'Regla opcional', animated: false }];
  const snapshot = structuredClone(edges);
  const result = decorateFlowEdges(edges, 'logic', 0);
  assert.deepEqual(edges, snapshot);
  assert.equal(result.length, edges.length);
  result.forEach((edge, index) => {
    for (const key of ['id', 'source', 'target', 'sourceHandle', 'label', 'style']) assert.deepEqual(edge[key], edges[index][key]);
  });
  assert.ok(result[0].className.includes('diagram-edge--flow'));
  assert.equal(result[0].type, 'engineering');
  assert.equal(result[0].data.flowActive, true);
  assert.equal(result[1].className, '');
  assert.equal(result[1].markerEnd, undefined);
  assert.equal(result[1].type, undefined, 'the optional policy retains its native static edge');
  assert.equal(result[1].data, undefined);
});
