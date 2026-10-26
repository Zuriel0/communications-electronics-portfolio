import {readFile,writeFile} from 'node:fs/promises';
import {gzipSync} from 'node:zlib';
import {createHash} from 'node:crypto';
const bases={baseline:'/private/tmp/anx0132-baseline-dist-85e81e5',candidate:'dist'};
const report={method:'Generated build bytes; local gzip level 9. Static JS closures exclude deferred graph loads. Baseline 85e81e5, same lockfile and build tools. Not field Web Vitals.',versions:{}};
for(const [version,root]of Object.entries(bases)){
 const manifest=JSON.parse(await readFile(`${root}/.vite/manifest.json`));
 const assets={};
 for(const [key,m]of Object.entries(manifest))if(m.file.endsWith('.js')){
  const raw=await readFile(`${root}/${m.file}`);assets[key]={file:m.file,bytes:raw.length,gzip9:gzipSync(raw,{level:9}).length,sha256:createHash('sha256').update(raw).digest('hex')};
 }
 const closures={};
 for(const key of ['index.html','src/pages/projects/Concurrencia.jsx','src/pages/projects/Metodologia.jsx','src/pages/projects/Nodalume.jsx','src/components/ui/graphics/nodalume_flow.jsx']){
  const visited=new Set();const visit=k=>{if(visited.has(k))return;visited.add(k);manifest[k].imports?.forEach(visit);};visit(manifest[key]?key:Object.keys(manifest).find(k=>/^_Nodalume-.*\.js$/.test(k)));
  const items=[...visited].map(k=>assets[k]);closures[key]={bytes:items.reduce((a,x)=>a+x.bytes,0),gzip9:items.reduce((a,x)=>a+x.gzip9,0),files:items.map(x=>x.file)};
 }
 const css={};for(const f of new Set(Object.values(manifest).flatMap(m=>m.css||[]))){const raw=await readFile(`${root}/${f}`);css[f]={bytes:raw.length,gzip9:gzipSync(raw,{level:9}).length};}
 report.versions[version]={assets,closures,css};
}
await writeFile('docs/redesign/reports/anx-013-2/bundles.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(Object.fromEntries(Object.entries(report.versions).map(([v,x])=>[v,x.closures])),null,2));
