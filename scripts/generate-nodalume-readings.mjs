import {readFile,writeFile} from 'node:fs/promises';
import {nodalumeDiagrams} from '../src/data/nodalume.js';
import {engineeringSystems} from '../src/data/nodalumeEngineering.js';
import messages from '../src/i18n/locales/nodalumeDiagrams.js';
import {createNodalumeReadings,serializeNodalumeReadings} from './lib/nodalume-readings.mjs';
const file=new URL('../src/data/nodalumeReadings.js',import.meta.url);
const source=serializeNodalumeReadings(createNodalumeReadings(nodalumeDiagrams,engineeringSystems,messages));
if(process.argv.includes('--check')) {
  if(await readFile(file,'utf8')!==source)throw new Error('Run node scripts/generate-nodalume-readings.mjs to update the semantic readings.');
  console.log('PASS: eight semantic readings match the source models and translations.');
} else await writeFile(file,source);
