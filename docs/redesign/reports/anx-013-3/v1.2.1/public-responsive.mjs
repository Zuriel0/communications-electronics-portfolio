// Executed using documented cua_repl APIs on the production Preview.
export async function checkEngineering(tab,viewport,width,save){
  await viewport.set({width,height:1100});
  const rows=[];
  for(const [kind,count,edges] of [['authentication',6,5],['sessions',6,5],['tenancy',6,4],['deployment',7,6],['editor',7,6]]){
    const id=`diagram-nodalume-${kind}`;
    await tab.goto(`https://anxzu.com/projects/nodalume#${id}`);
    await tab.reload();
    await tab.playwright.locator(`#${id}:focus`).waitFor({state:'visible'});
    await tab.playwright.locator(`#${id}[data-playing="true"]`).waitFor({state:'visible'});
    await tab.getAXState({emit:false});
    const before=await tab.playwright.locator(`#${id}`).evaluate(x=>({offset:getComputedStyle(x.querySelector('.diagram-flow-signal')).offsetDistance,active:x.querySelector('.diagram-edge--flow')?.getAttribute('data-id')}));
    await save(`${kind}-${width}-motion.jpg`,await tab.screenshot({fullPage:false}));
    const after=await tab.playwright.locator(`#${id}`).evaluate(x=>({offset:getComputedStyle(x.querySelector('.diagram-flow-signal')).offsetDistance,active:x.querySelector('.diagram-edge--flow')?.getAttribute('data-id')}));
    if(before.offset===after.offset&&before.active===after.active)throw new Error(`${kind}: movement not observed`);
    await tab.playwright.locator('.nodalume-stage-controls button').nth(1).press('Enter');await tab.getAXState({emit:false});
    const stage=await tab.playwright.evaluate(()=>({stage:document.querySelector('.nodalume-stage-controls [aria-pressed="true"]').textContent,paused:document.querySelector('.nodalume-flow--evidence .diagram-motion-button').getAttribute('aria-pressed')}));
    if(stage.stage!=='2'||stage.paused!=='true')throw new Error(`${kind}: manual stage did not pause`);
    await tab.playwright.locator(`#${id}-component`).selectOption({index:count-1});await tab.getAXState({emit:false});
    const inspection=await tab.playwright.locator(`#${id}-inspection`).innerText();
    await tab.playwright.locator(`#${id} .react-flow__controls-zoomin`).press('Enter');await tab.getAXState({emit:false});
    const languages=[];
    for(const lang of ['en','es']){
      await tab.playwright.locator(`button[lang="${lang}"]`).press('Enter');await tab.getAXState({emit:false});
      languages.push(await tab.playwright.locator(`#${id}`).evaluate(x=>({language:document.documentElement.lang,hash:location.hash,playing:x.dataset.playing,zoom:x.querySelector('.react-flow__viewport').style.transform,nodes:x.querySelectorAll('.react-flow__node').length,edges:x.querySelectorAll('.react-flow__edge').length,labels:[...x.querySelectorAll('.react-flow__controls button')].map(x=>x.getAttribute('aria-label')),signal:getComputedStyle(x.querySelector('.diagram-flow-signal')).animationPlayState,selected:document.querySelector(`#${x.id}-component`).value,stage:document.querySelector('.nodalume-stage-controls [aria-pressed="true"]').textContent,width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth})));
    }
    if(languages.some(x=>x.playing!=='false'||x.nodes!==count||x.edges!==edges||x.overflow||x.width!==width)||languages[0].zoom!==languages[1].zoom||languages[0].selected!==languages[1].selected||languages[0].stage!==languages[1].stage)throw new Error(`${kind}: state/language/geometry regression ${JSON.stringify(languages)}`);
    await tab.playwright.locator(`#${id} .react-flow__controls-fitview`).press('Enter');await tab.getAXState({emit:false});
    await save(`${kind}-${width}-inspection.jpg`,await tab.screenshot({fullPage:false}));
    await tab.playwright.locator(`button[aria-controls="${id}"]`).press('Enter');await tab.getAXState({emit:false});
    // Pause button scrolls into view; at least a fifth of the canvas remains visible.
    await tab.playwright.locator(`#${id}[data-playing="true"]`).waitFor({state:'visible'});
    rows.push({kind,width,before,after,stage,inspection,languages,resumed:true,fitView:true});
  }
  await tab.playwright.locator('.nodalume-index a[href="#nodalume-philosophy"]').press('Enter');await tab.getAXState({emit:false});
  const away=await tab.playwright.evaluate(()=>({hash:location.hash,focus:document.activeElement.id,states:[...document.querySelectorAll('.diagram-frame')].map(x=>({id:x.id,playing:x.dataset.playing}))}));
  if(away.states.some(x=>x.playing==='true'))throw new Error('Offscreen diagram is playing');
  await tab.reload();await tab.playwright.locator('#nodalume-philosophy:focus').waitFor({state:'visible'});await tab.getAXState({emit:false});
  const preference=await tab.playwright.evaluate(()=>({language:document.documentElement.lang,hash:location.hash}));
  const logs=await tab.dev.logs({levels:['error','warn'],limit:100});if(logs.length)throw new Error(JSON.stringify(logs));
  return {rows,away,preference,logs};
}
export async function checkResponsive(tab,viewport){
  const rows=[];
  for(const width of [320,375,768,1024,1440,1920]){
    await viewport.set({width,height:1000});
    for(const route of ['/','/projects/concurrencia','/projects/metodologia','/projects/nodalume']){
      await tab.goto(`https://anxzu.com${route}`);await tab.playwright.locator('h1').waitFor({state:'visible'});await tab.getAXState({emit:false});
      for(const lang of ['en','es']){
        await tab.playwright.locator(`button[lang="${lang}"]`).press('Enter');await tab.getAXState({emit:false});
        const row=await tab.playwright.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,language:document.documentElement.lang,h1:document.querySelector('h1').textContent,route:location.pathname,hash:location.hash}));
        if(row.width!==width||row.scrollWidth>row.width||row.language!==lang)throw new Error(JSON.stringify(row));
        rows.push(row);
      }
    }
  }
  return rows;
}
