// Read-only Chrome profiling through Lighthouse. No application state mutation.
const {default:BaseGatherer}=await import(`${process.env.ANX_LH_ROOT}/core/gather/base-gatherer.js`);
export default class ANXCPU extends BaseGatherer {
 meta={supportedModes:['navigation']};
 async getArtifact({driver}){
  const session=driver.defaultSession;
  await session.sendCommand('Performance.enable');
  await new Promise(done=>setTimeout(done,3000));
  const state=()=>driver.executionContext.evaluate(()=>({visibility:document.visibilityState,reduced:matchMedia('(prefers-reduced-motion: reduce)').matches,diagrams:[...document.querySelectorAll('.diagram-frame')].map(x=>({id:x.id,playing:x.dataset.playing,nodes:x.querySelectorAll('.react-flow__node').length,edges:x.querySelectorAll('.react-flow__edge').length,active:x.querySelector('.diagram-edge--flow')?.getAttribute('data-id')}))}),{args:[],useIsolation:true});
  const beforeState=await state();const before=await session.sendCommand('Performance.getMetrics');
  const started=Date.now();await new Promise(done=>setTimeout(done,12000));
  const after=await session.sendCommand('Performance.getMetrics');const wall=(Date.now()-started)/1000;
  const afterState=await state();
  const values=m=>Object.fromEntries(m.metrics.map(x=>[x.name,x.value]));const a=values(before),b=values(after);
  const delta=Object.fromEntries(['TaskDuration','ScriptDuration','LayoutDuration','RecalcStyleDuration','LayoutCount','RecalcStyleCount'].map(k=>[k,b[k]-a[k]]));
  return {wallSeconds:wall,delta,mainThreadBusyPercent:delta.TaskDuration/wall*100,beforeState,afterState,heapBytes:{before:a.JSHeapUsedSize,after:b.JSHeapUsedSize}};
 }
}
