import {uiMessages} from './helpers/uiMessages.mjs';
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
  const restored=new Set(JSON.parse(readFileSync('tests/fixtures/nodalume-restored-editorial.json')).messages.map(x=>x.key));
  assert.equal(Object.keys(editorial.en).length,baseline.count+restored.size);
  const values=['en','es'].map(lang=>Object.entries(editorial[lang]).filter(([key])=>!restored.has(key)).map(([,value])=>value).sort());
  assert.equal(createHash('sha256').update(JSON.stringify(values)).digest('hex'),baseline.sha256);
});

test('semantic generation fails closed on an incomplete locale instead of publishing mixed-language readings',()=>{
  assert.throws(()=>createNodalumeReadings(nodalumeDiagrams,engineeringSystems,{en:diagramMessages.en,es:{}}),/Missing es diagram copy/);
});

test('Nodalume editorial arrays are covered by the route catalog itself, not an unrelated project catalog',()=>{
 const missing=[...uiMessages()].filter(([key,file])=>file==='src/pages/projects/Nodalume.jsx' && (!Object.hasOwn(editorial.en,key)||!Object.hasOwn(editorial.es,key)));
 assert.deepEqual(missing,[]);
});

test('restored editorial values match the verified original EN/ES copy',()=>{
 const restored=JSON.parse(readFileSync('tests/fixtures/nodalume-restored-editorial.json')).messages;
 assert.equal(restored.length,26);
 for(const item of restored){assert.equal(editorial.en[item.key],item.en);assert.equal(editorial.es[item.key],item.es);assert.notEqual(item.en,item.es);}
});
