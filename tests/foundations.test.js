import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { startDiagramPlayback } from '../src/utils/diagramPlayback.js';

const css = readFileSync(new URL('../src/styles/tokens.css', import.meta.url), 'utf8');
const variables = text => Object.fromEntries([...text.matchAll(/(--[\w-]+):\s*([^;]+);/g)].map(([, name, value]) => [name, value.trim()]));
const primitives = variables(css.slice(0, css.indexOf(":root, [data-theme='dark']")));
function luminance(hex) {
  return hex.slice(1).match(/../g).map(value => parseInt(value, 16) / 255)
    .map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4)
    .reduce((sum, value, index) => sum + value * [.2126, .7152, .0722][index], 0);
}
function contrast(a, b) {
  const [dark, light] = [luminance(a), luminance(b)].sort((x, y) => x - y);
  return (light + .05) / (dark + .05);
}

for (const theme of ['dark', 'light']) {
  test(`${theme}: normal text, accents, focus and boundaries meet contrast budgets`, () => {
    const themeBlock = css.match(new RegExp(`\\[data-theme='${theme}'\\] \\{([\\s\\S]*?)\\}`))[1];
    const tokens = { ...primitives, ...variables(themeBlock) };
    const color = name => {
      let value = tokens[name];
      while (value?.startsWith('var(')) value = tokens[value.slice(4, -1)];
      assert.match(value, /^#[a-f\d]{6}$/i, name);
      return value;
    };
    for (const bg of ['--background-primary', '--background-secondary', '--surface', '--interactive-hover', '--interactive-active']) {
      for (const fg of ['--text-primary', '--text-secondary', '--accent']) {
        assert.ok(contrast(color(fg), color(bg)) >= 4.5, `${fg}/${bg}`);
      }
      for (const fg of ['--focus', '--border']) assert.ok(contrast(color(fg), color(bg)) >= 3, `${fg}/${bg}`);
    }
    for (const bg of ['--accent', '--accent-hover', '--accent-active']) assert.ok(contrast(color('--on-accent'), color(bg)) >= 4.5, `button/${bg}`);
    assert.ok(contrast(color('--selection-text'), color('--selection')) >= 4.5);
  });
}

class Visibility extends EventTarget {
  constructor(state) { super(); this.visibilityState = state; }
  change(state) { this.visibilityState = state; this.dispatchEvent(new Event('visibilitychange')); }
}

test('reduced motion never starts playback, including when the tab becomes visible', context => {
  context.mock.timers.enable({ apis: ['setInterval'] });
  const visibility = new Visibility('visible');
  let ticks = 0;
  const stop = startDiagramPlayback(() => ticks++, { reducedMotion: true, visibility });
  context.mock.timers.tick(5400);
  visibility.change('hidden');
  visibility.change('visible');
  context.mock.timers.tick(5400);
  assert.equal(ticks, 0);
  stop();
});

test('hidden tabs pause playback; resume does not duplicate timers; cleanup stops it', context => {
  context.mock.timers.enable({ apis: ['setInterval'] });
  const visibility = new Visibility('hidden');
  let ticks = 0;
  const stop = startDiagramPlayback(() => ticks++, { reducedMotion: false, visibility });
  context.mock.timers.tick(3600);
  assert.equal(ticks, 0);
  visibility.change('visible');
  context.mock.timers.tick(1800);
  assert.equal(ticks, 1);
  visibility.change('hidden');
  context.mock.timers.tick(3600);
  assert.equal(ticks, 1);
  visibility.change('visible');
  visibility.change('visible');
  context.mock.timers.tick(1800);
  assert.equal(ticks, 2);
  stop();
  visibility.change('visible');
  context.mock.timers.tick(5400);
  assert.equal(ticks, 2);
});
