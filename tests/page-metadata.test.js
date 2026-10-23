import assert from 'node:assert/strict';
import { test } from 'node:test';
import { getPageMetadata, pageMetadata } from '../src/data/pageMetadata.js';
import { readFileSync } from 'node:fs';
import { renderPageHead, routeMetadataPlugin } from '../scripts/page-head.mjs';
import { projectNavigation } from '../src/data/navigation.js';

test('the three public routes have distinct titles and descriptions in their content language', () => {
  assert.equal(Object.keys(pageMetadata).length, 3);
  assert.equal(new Set(Object.values(pageMetadata).map(page => page.title)).size, 3);
  assert.equal(new Set(Object.values(pageMetadata).map(page => page.description)).size, 3);
  assert.equal(getPageMetadata('/').lang, 'en');
  for (const path of ['/projects/concurrencia', '/projects/metodologia']) {
    assert.equal(getPageMetadata(path).lang, 'en');
    assert.equal(getPageMetadata(`${path}/`).title, getPageMetadata(path).title);
    assert.ok(getPageMetadata(path).description.length >= 100);
    assert.ok(getPageMetadata(path).description.length <= 170);
  }
});

test('unknown paths are not indexed as portfolio pages', () => {
  assert.equal(getPageMetadata('/does-not-exist').robots, 'noindex, follow');
  assert.equal(getPageMetadata('/').robots, undefined);
  assert.equal(getPageMetadata('/does-not-exist').canonical, undefined);
  assert.equal(getPageMetadata('/').canonical, 'https://anxzu.com/');
  assert.equal(getPageMetadata('/projects/concurrencia/').canonical, 'https://anxzu.com/projects/concurrencia');
});

test('static route directories preserve the project navigation when a host adds a trailing slash', () => {
  for (const path of ['/projects/concurrencia', '/projects/metodologia']) {
    assert.deepEqual(projectNavigation(`${path}/`), projectNavigation(path));
  }
});

test('static project HTML has one correct title, language and description before React runs', () => {
  const template = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  for (const [route, metadata] of Object.entries(pageMetadata)) {
    const html = renderPageHead(template, route);
    assert.ok(html.includes(`<html lang="${metadata.lang}"`));
    assert.ok(html.includes(`<title>${metadata.title}</title>`));
    assert.equal((html.match(/name="description"/g) || []).length, 1);
    assert.equal((html.match(/property="og:title"/g) || []).length, 1);
    assert.equal((html.match(/rel="canonical"/g) || []).length, 1);
    assert.ok(html.includes(`href="${getPageMetadata(route).canonical}"`));
    assert.equal(renderPageHead(html, route), html, 'Repeated transformation must not duplicate metadata');
  }
});

test('Preview serves the static project head on the original public URLs without requiring a slash', () => {
  let middleware;
  routeMetadataPlugin().configurePreviewServer({ middlewares: { use(handler) { middleware = handler; } } });
  for (const [url, expected] of [
    ['/projects/concurrencia', '/projects/concurrencia/index.html'],
    ['/projects/metodologia/?review=1', '/projects/metodologia/index.html?review=1'],
    ['/', '/'],
    ['/assets/file.js', '/assets/file.js'],
  ]) {
    const request = { url };
    let calls = 0;
    middleware(request, {}, () => calls++);
    assert.equal(request.url, expected);
    assert.equal(calls, 1);
  }
});
