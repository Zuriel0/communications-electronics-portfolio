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
const profiles = (process.env.ANX_LH_PROFILES || 'mobile,desktop').split(',');
const versions = (process.env.ANX_LH_VERSIONS || 'baseline,candidate').split(',');
const repetitions = Number(process.env.ANX_LH_RUNS || 3);
const extraConfig = process.env.ANX_LH_CONFIG;
const knownRoutes = { home:'/', concurrencia:'/projects/concurrencia', metodologia:'/projects/metodologia', nodalume:'/projects/nodalume' };
const routeNames = (process.env.ANX_LH_ROUTES || 'home,concurrencia,metodologia').split(',');
if (routeNames.some(name => !Object.hasOwn(knownRoutes, name))) throw new Error('Unknown Lighthouse route');
const routes = routeNames.map(name => [name, knownRoutes[name]]);
const total = profiles.length * routes.length * repetitions * versions.length;
for (const profile of profiles) for (const [route,path] of routes) {
  for (let run = 1; run <= repetitions; run++) for (const version of run % 2 === 0 ? [...versions].reverse() : versions) {
    const id = `${version}-${route}-${profile}-${run}`;
    const temporary = resolve(output, `${id}.json`);
    const args = [cli, origins[version]+path, '--quiet', '--no-enable-error-reporting', `--only-categories=performance,accessibility${extraConfig ? ',language' : ''}`, '--disable-full-page-screenshot', '--output=json', `--output-path=${temporary}`, '--chrome-flags=--headless=new --no-first-run --disable-extensions --disable-background-networking --disable-component-update'];
    if (extraConfig) args.push(`--config-path=${resolve(extraConfig)}`);
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
    if (extraConfig && lhr.audits['anx-spanish']?.score !== 1) throw new Error(`${id}: Spanish preference not confirmed`);
    if (lhr.runtimeError) throw new Error(`${id}: ${JSON.stringify(lhr.runtimeError)}`);
    await writeFile(`${temporary}.gz`, gzipSync(raw,{level:9})); await unlink(temporary);
    const row = { id,version,route,profile,run,fetchTime:lhr.fetchTime,lighthouseVersion:lhr.lighthouseVersion,userAgent:lhr.environment.hostUserAgent,settings:lhr.configSettings,
      performance:lhr.categories.performance.score*100,accessibility:lhr.categories.accessibility.score*100,
      lcp:lhr.audits['largest-contentful-paint'].numericValue,cls:lhr.audits['cumulative-layout-shift'].numericValue,tbt:lhr.audits['total-blocking-time'].numericValue,
      language:lhr.audits['anx-spanish']?.details?.state?.language || 'en',warnings:lhr.runWarnings,failedAccessibility:lhr.categories.accessibility.auditRefs.filter(a => lhr.audits[a.id]?.score === 0).map(a=>a.id),durationSeconds:(Date.now()-start)/1000 };
    rows.push(row);
    await writeFile(resolve(output,'runs.json'),JSON.stringify(rows,null,2)+'\n');
    console.log(`${rows.length}/${total} ${id}: P${row.performance} A${row.accessibility} LCP${Math.round(row.lcp)} CLS${row.cls.toFixed(4)} TBT${Math.round(row.tbt)}`);
  }
}
const median = values => [...values].sort((a,b)=>a-b)[Math.floor(values.length/2)];
const groups=[];
for (const version of versions) for (const profile of profiles) for (const route of routeNames) {
  const selected = rows.filter(x=>x.version===version && x.profile===profile && x.route===route);
  const group={version,profile,route,n:selected.length};
  for (const key of ['performance','accessibility','lcp','cls','tbt']) group[key]={median:median(selected.map(x=>x[key])),min:Math.min(...selected.map(x=>x[key])),max:Math.max(...selected.map(x=>x[key]))};
  groups.push(group);
}
await writeFile(resolve(output,'summary.json'),JSON.stringify({method:'Serial; reverse version order on even repetitions when comparing versions; default simulated mobile/desktop profiles; fresh Chrome per invocation; normal motion; no field Web Vitals or FPS claim.',origins,versions,profiles,repetitions,groups},null,2)+'\n');
