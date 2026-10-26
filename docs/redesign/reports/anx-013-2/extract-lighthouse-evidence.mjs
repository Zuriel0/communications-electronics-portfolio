import {readFile,writeFile} from 'node:fs/promises';import {gunzipSync} from 'node:zlib';
const dir='docs/redesign/reports/anx-013-2/lighthouse';const runs=JSON.parse(await readFile(dir+'/runs.json'));
const rows=[];
for(const run of runs.filter(x=>x.route==='nodalume')){
 const lhr=JSON.parse(gunzipSync(await readFile(`${dir}/${run.id}.json.gz`)));
 const element=lhr.audits['lcp-breakdown-insight'].details.items.find(x=>x.type==='node');
 const requests=lhr.audits['network-requests'].details.items.filter(x=>/\.js|\.css/.test(x.url));
 if(requests.some(x=>/nodalume_flow|style-[^/]+\.js/.test(x.url)))throw new Error('A deferred graph reached the initial request set');
 rows.push({id:run.id,lcpElement:{selector:element.selector,rect:element.boundingRect,label:element.nodeLabel},resources:requests.map(x=>({file:x.url.split('/').at(-1),observedStartMs:x.networkRequestTime,observedEndMs:x.networkEndTime,transferSize:x.transferSize}))});
}
for(const profile of ['mobile','desktop']){
 const pair=rows.filter(x=>x.id.endsWith(`${profile}-1`));if(JSON.stringify(pair[0].lcpElement)!==JSON.stringify(pair[1].lcpElement))throw new Error('LCP element changed');
}
await writeFile('docs/redesign/reports/anx-013-2/critical-resources.json',JSON.stringify({method:'LCP element and observed unthrottled local resource trace from the saved Lighthouse runs. Performance medians use Lighthouse simulation; these request timings are not field latency.',rows},null,2)+'\n');
