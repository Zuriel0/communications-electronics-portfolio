/* global process */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { createServer } from 'vite';
import { createLanguageStore, languageKey } from '../src/i18n/languageStore.js';
import { defineMessages } from '../src/i18n/catalog.js';
import { translate } from '../src/i18n/translate.js';
import en from '../src/i18n/locales/en.js';
import es from '../src/i18n/locales/es.js';
import projectEn from '../src/i18n/locales/projects.en.js';
import projectEs from '../src/i18n/locales/projects.es.js';
import { uiMessages } from './helpers/uiMessages.mjs';
import { declaration, sha256 } from './helpers/modelIntegrity.mjs';
import { formatCredentialDate } from '../src/utils/credentialStatus.js';
const fixture = file => JSON.parse(readFileSync(new URL(`./fixtures/${file}`, import.meta.url)));

test('language preference is deferred, persisted, validated and retained across subscribers/routes', () => {
  let reads = 0;
  const data = new Map([[languageKey, 'es']]);
  const store = createLanguageStore(() => ({ getItem: key => { reads++; return data.get(key); }, setItem: (key,value) => data.set(key,value) }));
  assert.equal(reads, 0);
  assert.equal(store.getSnapshot(), 'en');
  store.restore(); assert.equal(store.getSnapshot(), 'es');
  let updates = 0;
  const unsubscribe = store.subscribe(() => updates++);
  store.setLanguage('en'); store.setLanguage('en'); store.setLanguage('fr');
  assert.equal(updates, 1); assert.equal(data.get(languageKey), 'en');
  unsubscribe(); store.setLanguage('es'); assert.equal(updates, 1);
  const nextRoute = store.subscribe(() => updates++);
  assert.equal(store.getSnapshot(), 'es');
  store.setLanguage('en'); assert.equal(updates, 2); nextRoute();
});

test('blocked storage and invalid saved languages retain an operable in-memory fallback', () => {
  const store = createLanguageStore(() => { throw new Error('SecurityError'); });
  store.restore(); store.setLanguage('es'); assert.equal(store.getSnapshot(), 'es');
  store.restore(); assert.equal(store.getSnapshot(), 'es');
  const invalid = createLanguageStore(() => ({ getItem: () => 'xx' }));
  invalid.restore(); assert.equal(invalid.getSnapshot(), 'en');
});

test('EN/ES keys and substitution slots match in both independently loaded catalogs', () => {
  for (const [a,b] of [[en,es],[projectEn,projectEs]]) {
    assert.deepEqual(Object.keys(a).sort(), Object.keys(b).sort());
    for (const key of Object.keys(a)) {
      assert.ok(a[key].trim() && b[key].trim(), key);
      assert.deepEqual(a[key].match(/\{\d+\}/g), b[key].match(/\{\d+\}/g), key);
    }
  }
  assert.equal(translate('View Project: {0}', 'es', null, {en,es}, ['Concurrent log monitor via SSH']), 'Ver proyecto: Monitor concurrente de logs vía SSH');
  assert.equal(translate('missing', 'es', {en:{missing:'Readable fallback'}}, {}), 'Readable fallback');
});

test('application copy, content arrays and all diagram labels have translations or explicit invariant names', () => {
  const invariants = fixture('invariant-messages.json');
  const missing = [...uiMessages()].filter(([s]) => !(s in en) && !(s in projectEn) && !invariants.includes(s));
  assert.deepEqual(missing, []);
  assert.ok(uiMessages().size > 500);
});

test('six graph models retain all 46 nodes and 37 edges byte-for-byte after AST normalization', () => {
  let nodes = 0, edges = 0;
  for (const [file, models] of Object.entries(fixture('diagram-models.json'))) {
    for (const [name, baseline] of Object.entries(models)) {
      const model = declaration(readFileSync(file,'utf8'), name);
      assert.equal(sha256(JSON.stringify(model)), baseline.sha256, `${file}: ${name}`);
      if (name === 'initialNodes') nodes += model.elements.length; else edges += model.elements.length;
    }
  }
  assert.equal(nodes,46); assert.equal(edges,37);
});

test('animation controllers, original skill inventory, experience dates and 18 Credly records are preserved', () => {
  const baseline = fixture('anx012-preservation.json');
  for (const [file, hash] of Object.entries(baseline.files)) assert.equal(sha256(readFileSync(file)), hash, file);
  const source = readFileSync('src/data/credentials.js','utf8');
  const records = declaration(source,'credentials');
  assert.equal(records.elements.length,18);
  assert.equal(sha256(JSON.stringify(records)), baseline.credentials.sha256);
  const prep = declaration(source,'certificationPreparation').elements[0];
  const fields = Object.fromEntries(prep.properties.map(p => [p.key.name,p.value.value]));
  assert.equal(fields.status,'in-preparation'); assert.equal(fields.kind,'certification-preparation');
  assert.equal(fields.examCode,'SAA-C03'); assert.equal(fields.name,'AWS Certified Solutions Architect – Associate');
  for (const key of ['image','issuedOn','expiresOn','progress','examDate']) assert.ok(!(key in fields));
});

test('date-only credential display follows the interface language without shifting the day', () => {
  assert.equal(formatCredentialDate('2026-10-16','en'), 'Oct 16, 2026');
  assert.match(formatCredentialDate('2026-10-16','es'), /16 oct 2026/);
});

test('actual React pages render in both languages with one retained store across all routes', async () => {
  const require = createRequire(`${process.cwd()}/package.json`);
  const React = require('react');
  const { renderToStaticMarkup } = require('react-dom/server');
  const { MemoryRouter } = require('react-router-dom');
  const server = await createServer({ logLevel:'silent', server:{middlewareMode:true,hmr:false,ws:false}, appType:'custom' });
  try {
    const {default:Provider} = await server.ssrLoadModule('/src/i18n/LanguageProvider.jsx');
    const {createLanguageStore:makeStore} = await server.ssrLoadModule('/src/i18n/languageStore.js');
    const store = makeStore(() => null);
    const {ProjectRouteState} = await server.ssrLoadModule('/src/components/layout/ProjectRoute.jsx');
    for (const lang of ['en','es']) {
      store.setLanguage(lang);
      for (const error of [false,true]) {
        const state = renderToStaticMarkup(React.createElement(MemoryRouter,{initialEntries:['/projects/concurrencia']},React.createElement(Provider,{store},React.createElement(ProjectRouteState,{error}))));
        assert.ok(state.includes(error ? (lang === 'es' ? 'Recargar proyecto' : 'Reload project') : (lang === 'es' ? 'Cargando proyecto…' : 'Loading project…')));
        assert.ok(state.includes(error ? 'role="alert"' : 'role="status"'));
      }
      for (const [route,path,enText,esText] of [
        ['/','/src/pages/Home.jsx','Professional capabilities','Capacidades profesionales'],
        ['/projects/concurrencia','/src/pages/projects/Concurrencia.jsx','Finding a request without knowing its destination.','Encontrar una petición sin conocer su destino.'],
        ['/projects/metodologia','/src/pages/projects/Metodologia.jsx','Six stages. One deliberate sequence.','Seis etapas. Una secuencia deliberada.'],
      ]) {
        const {default:Page} = await server.ssrLoadModule(path);
        const html = renderToStaticMarkup(React.createElement(MemoryRouter,{initialEntries:[route]},React.createElement(Provider,{store},React.createElement(Page))));
        assert.ok(html.includes(lang === 'en' ? enText : esText), `${route}: ${lang}`);
        assert.ok(html.includes('aria-pressed="true"'));
        assert.ok(!html.includes(lang === 'en' ? esText : enText), `${route}: mixed-language main copy`);
        assert.equal(store.getSnapshot(),lang);
      }
    }
  } finally { await server.close(); }
});


test('compact catalogs derive source values, retain corrections and reject ambiguous duplicate sources', () => {
  const messages = defineMessages({ fromEnglish: { Hello:'Hola' }, fromSpanish: { Adiós:'Goodbye' }, spanishCorrections: { Adiós:'Hasta luego' } });
  assert.deepEqual(messages, { en:{ Hello:'Hello', Adiós:'Goodbye' }, es:{ Hello:'Hola', Adiós:'Hasta luego' } });
  assert.throws(() => defineMessages({ fromEnglish:{ Hello:'Hola' }, fromSpanish:{ Hello:'Hello' } }), /Duplicate message/);
});
