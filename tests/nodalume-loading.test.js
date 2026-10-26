import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';import {createHash} from 'node:crypto';
import {nodalumeDiagrams} from '../src/data/nodalume.js';import {engineeringSystems} from '../src/data/nodalumeEngineering.js';import diagramMessages from '../src/i18n/locales/nodalumeDiagrams.js';import editorial from '../src/i18n/locales/nodalume.js';import {nodalumeReadings} from '../src/data/nodalumeReadings.js';
import {createNodalumeReadings,serializeNodalumeReadings} from '../scripts/lib/nodalume-readings.mjs';

test('eight semantic readings match their original models in EN/ES without importing canvas geometry',()=>{
  assert.equal(nodalumeReadings.length,8);
  const expected=createNodalumeReadings(nodalumeDiagrams,engineeringSystems,diagramMessages);
  assert.deepEqual(nodalumeReadings,expected);
  assert.equal(readFileSync('src/data/nodalumeReadings.js','utf8'),serializeNodalumeReadings(expected));
  for(const view of nodalumeReadings){assert.ok(!('nodes' in view)&&!('edges' in view));for(const language of ['en','es'])assert.ok(view[language].relationships.length>=4);}
});
test('named editorial copy preserves every retained ANX-013.1 EN/ES message value',()=>{
  const baseline=JSON.parse(readFileSync('tests/fixtures/nodalume-editorial-0131.json'));
  assert.equal(Object.keys(editorial.en).length,baseline.count);
  const values=['en','es'].map(lang=>Object.values(editorial[lang]).sort());
  assert.equal(createHash('sha256').update(JSON.stringify(values)).digest('hex'),baseline.sha256);
});

test('semantic generation fails closed on an incomplete locale instead of publishing mixed-language readings',()=>{
  assert.throws(()=>createNodalumeReadings(nodalumeDiagrams,engineeringSystems,{en:diagramMessages.en,es:{}}),/Missing es diagram copy/);
});
