// Reproducible, serial lab comparison. Run against two stable, already built Preview servers.
// ANX_LH_CLI points to the installed Lighthouse CLI; no dependency is added to the application.
import { spawn } from 'node:child_process';
import { readFile, writeFile, mkdir, unlink } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';
import { resolve } from 'node:path';

const cli = process.env.ANX_LH_CLI;
if (!cli) throw new Error('Set ANX_LH_CLI to lighthouse/cli/index.js');
const output = resolve(process.argv[2] || 'docs/redesign/reports/anx-012-1/lighthouse');
await mkdir(output, { recursive:true });
const origins = { baseline: process.env.ANX_BASELINE_URL || 'http://127.0.0.1:4180', candidate: process.env.ANX_CANDIDATE_URL || 'http://127.0.0.1:4173' };
const rows = [];
for (const profile of ['mobile','desktop']) for (const [route,path] of [['home','/'],['concurrencia','/projects/concurrencia'],['metodologia','/projects/metodologia']]) {
  for (let run = 1; run <= 3; run++) for (const version of run === 2 ? ['candidate','baseline'] : ['baseline','candidate']) {
    const id = `${version}-${route}-${profile}-${run}`;
    const temporary = resolve(output, `${id}.json`);
    const args = [cli, origins[version]+path, '--quiet', '--no-enable-error-reporting', '--only-categories=performance,accessibility', '--disable-full-page-screenshot', '--output=json', `--output-path=${temporary}`, '--chrome-flags=--headless=new --no-first-run --disable-extensions --disable-background-networking --disable-component-update'];
    if (profile === 'desktop') args.push('--preset=desktop');
    const start = Date.now();
    await new Promise((done,reject) => {
      const child = spawn(process.execPath, args, { env:process.env, stdio:['ignore','ignore','pipe'] });
      let errors = ''; child.stderr.on('data',x => { errors += x; });
      child.on('error',reject);
      child.on('exit',code => code === 0 ? done() : reject(new Error(`${id} exited ${code}: ${errors}`)));
    });
    const raw = await readFile(temporary);
    const lhr = JSON.parse(raw);
    if (lhr.runtimeError) throw new Error(`${id}: ${JSON.stringify(lhr.runtimeError)}`);
    await writeFile(`${temporary}.gz`, gzipSync(raw,{level:9})); await unlink(temporary);
    const row = { id,version,route,profile,run,fetchTime:lhr.fetchTime,lighthouseVersion:lhr.lighthouseVersion,userAgent:lhr.environment.hostUserAgent,settings:lhr.configSettings,
      performance:lhr.categories.performance.score*100,accessibility:lhr.categories.accessibility.score*100,
      lcp:lhr.audits['largest-contentful-paint'].numericValue,cls:lhr.audits['cumulative-layout-shift'].numericValue,tbt:lhr.audits['total-blocking-time'].numericValue,
      warnings:lhr.runWarnings,failedAccessibility:lhr.categories.accessibility.auditRefs.filter(a => lhr.audits[a.id]?.score === 0).map(a=>a.id),durationSeconds:(Date.now()-start)/1000 };
    rows.push(row);
    await writeFile(resolve(output,'runs.json'),JSON.stringify(rows,null,2)+'\n');
    console.log(`${rows.length}/36 ${id}: P${row.performance} A${row.accessibility} LCP${Math.round(row.lcp)} CLS${row.cls.toFixed(4)} TBT${Math.round(row.tbt)}`);
  }
}
const median = values => [...values].sort((a,b)=>a-b)[Math.floor(values.length/2)];
const groups=[];
for (const version of Object.keys(origins)) for (const profile of ['mobile','desktop']) for (const route of ['home','concurrencia','metodologia']) {
  const selected = rows.filter(x=>x.version===version && x.profile===profile && x.route===route);
  const group={version,profile,route,n:selected.length};
  for (const key of ['performance','accessibility','lcp','cls','tbt']) group[key]={median:median(selected.map(x=>x[key])),min:Math.min(...selected.map(x=>x[key])),max:Math.max(...selected.map(x=>x[key]))};
  groups.push(group);
}
await writeFile(resolve(output,'summary.json'),JSON.stringify({method:'Serial, alternating baseline/candidate runs; 3 per route/profile/version; default simulated mobile/desktop profiles; fresh Chrome per invocation; normal motion; no field Web Vitals or FPS claim.',origins,groups},null,2)+'\n');
