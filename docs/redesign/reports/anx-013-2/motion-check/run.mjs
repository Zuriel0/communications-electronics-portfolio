import {spawn} from 'node:child_process';
import {readFile,writeFile,unlink} from 'node:fs/promises';
import {gzipSync} from 'node:zlib';
const root=process.cwd();
const output=root+'/docs/redesign/reports/anx-013-2/motion-check';
const routes=[['home','/'],...['platform','builder','evolution','authentication','sessions','tenancy','deployment','editor'].map(kind=>['nodalume-'+kind,'/projects/nodalume#diagram-nodalume-'+kind])];
const rows=[];
for (const [name,path] of routes) {
 const file=`${output}/${name}.json`;
 const args=[process.env.ANX_LH_ROOT+'/cli/index.js','http://127.0.0.1:4173'+path,'--quiet','--no-enable-error-reporting',`--config-path=${output}/config.mjs`,'--only-categories=qa,accessibility','--chrome-flags=--headless=new --force-prefers-reduced-motion','--output=json',`--output-path=${file}`];
 await new Promise((done,reject)=>{const p=spawn(process.execPath,args,{env:process.env,stdio:['ignore','ignore','pipe']});let error='';p.stderr.on('data',x=>error+=x);p.on('error',reject);p.on('exit',code=>code===0?done():reject(new Error(error)));});
 const raw=await readFile(file),lhr=JSON.parse(raw);
 const audit=lhr.audits['anx-reduced-motion'];
 if(lhr.runtimeError || audit.score!==1) throw new Error(`${name}: ${JSON.stringify(lhr.runtimeError||audit)}`);
 rows.push({name,path,score:audit.score,accessibility:lhr.categories.accessibility.score*100,state:audit.details.state,warnings:lhr.runWarnings});
 await writeFile(file+'.gz',gzipSync(raw,{level:9}));await unlink(file);
 console.log(`${rows.length}/9 ${name}: reduced motion PASS, A${rows.at(-1).accessibility}`);
 await writeFile(output+'/results.json',JSON.stringify(rows,null,2)+'\n');
}
