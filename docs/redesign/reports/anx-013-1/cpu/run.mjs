import {spawn} from 'node:child_process';import {readFile,writeFile,unlink} from 'node:fs/promises';import {gzipSync} from 'node:zlib';
const output=process.cwd()+'/docs/redesign/reports/anx-013-1/cpu';const rows=[];
for(let run=1;run<=3;run++)for(const reduced of run%2?[false,true]:[true,false]){
 const id=`${reduced?'static':'active'}-${run}`,file=`${output}/${id}.json`;
 const args=[process.env.ANX_LH_ROOT+'/cli/index.js','http://127.0.0.1:4173/projects/nodalume#diagram-nodalume-authentication','--quiet','--no-enable-error-reporting',`--config-path=${output}/config.mjs`,'--only-categories=qa','--preset=desktop','--throttling-method=provided',`--chrome-flags=--headless=new --no-first-run --disable-extensions ${reduced?'--force-prefers-reduced-motion':''}`,'--output=json',`--output-path=${file}`];
 await new Promise((done,reject)=>{const p=spawn(process.execPath,args,{env:process.env,stdio:['ignore','ignore','pipe']});let errors='';p.stderr.on('data',x=>errors+=x);p.on('error',reject);p.on('exit',c=>c===0?done():reject(new Error(errors)));});
 const raw=await readFile(file),lhr=JSON.parse(raw),audit=lhr.audits['anx-cpu'];if(lhr.runtimeError||audit.score!==1)throw new Error(JSON.stringify(lhr.runtimeError||audit));
 const state=audit.details.state;
 for(const sample of [state.beforeState,state.afterState])if(sample.reduced!==reduced||sample.visibility!=='visible'||sample.diagrams.filter(x=>x.playing==='true').length!==(reduced?0:1))throw new Error('Unexpected playback state');
 rows.push({id,run,reduced,lighthouseVersion:lhr.lighthouseVersion,userAgent:lhr.environment.hostUserAgent,...state});await writeFile(file+'.gz',gzipSync(raw,{level:9}));await unlink(file);
 await writeFile(output+'/results.json',JSON.stringify(rows,null,2)+'\n');console.log(`${id}: ${state.mainThreadBusyPercent.toFixed(3)}% main-thread busy`);
}
