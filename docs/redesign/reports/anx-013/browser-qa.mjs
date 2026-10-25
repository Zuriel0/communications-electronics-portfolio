// Run through cua_repl against the stable production Preview; real public controls only.
export async function checkNodalume(tab, viewport, width, saveImage) {
  await viewport.set({width,height:1000});
  const rows=[];
  for(const kind of ['platform','builder','evolution']){
    const id=`diagram-nodalume-${kind}`;
    await tab.goto(`http://127.0.0.1:4173/projects/nodalume#${id}`);
    await tab.reload();
    await tab.playwright.locator(`#${id}:focus`).waitFor({state:'visible'});
    await tab.playwright.locator(`#${id}[data-playing="true"]`).waitFor({state:'visible'});
    await tab.getAXState({emit:false});
    const before=await tab.playwright.locator(`#${id}`).evaluate(x=>({offset:getComputedStyle(x.querySelector('.diagram-flow-signal')).offsetDistance,active:x.querySelector('.diagram-edge--flow')?.getAttribute('data-id')}));
    await saveImage(`${kind}-${width}-motion-a.jpg`,await tab.screenshot({fullPage:false}));
    const after=await tab.playwright.locator(`#${id}`).evaluate(x=>({offset:getComputedStyle(x.querySelector('.diagram-flow-signal')).offsetDistance,active:x.querySelector('.diagram-edge--flow')?.getAttribute('data-id')}));
    if(before.offset===after.offset&&before.active===after.active)throw new Error(`${kind}: no measured motion`);
    await tab.playwright.locator(`button[aria-controls="${id}"]`).press('Enter');await tab.getAXState({emit:false});
    await tab.playwright.locator(`#${id} .react-flow__controls-zoomin`).press('Enter');await tab.getAXState({emit:false});
    const languages=[];
    for(const language of ['en','es']){
      await tab.playwright.locator(`button[lang="${language}"]`).press('Enter');await tab.getAXState({emit:false});
      languages.push(await tab.playwright.locator(`#${id}`).evaluate(x=>({language:document.documentElement.lang,hash:location.hash,playing:x.dataset.playing,zoom:x.querySelector('.react-flow__viewport').style.transform,nodes:[...x.querySelectorAll('.nodalume-node strong')].map(n=>n.textContent),edges:x.querySelectorAll('.react-flow__edge').length,zoomLabels:[...x.querySelectorAll('.react-flow__controls button')].map(button=>button.getAttribute('aria-label')),signalState:getComputedStyle(x.querySelector('.diagram-flow-signal')).animationPlayState,paused:document.querySelector(`button[aria-controls="${x.id}"]`).getAttribute('aria-pressed')})));
    }
    if(languages[1].zoomLabels.some(label=>['Zoom In','Zoom Out','Fit View'].includes(label)))throw new Error(`${kind}: untranslated controls`);
    if(languages.some(x=>x.playing!=='false'||x.signalState!=='paused'||x.paused!=='true'||x.edges!==4||x.nodes.length!==5)||languages[0].zoom!==languages[1].zoom)throw new Error(`${kind}: retained state`);
    await tab.playwright.locator(`#${id} .react-flow__controls-fitview`).press('Enter');await tab.getAXState({emit:false});
    await saveImage(`${kind}-es-${width}.jpg`,await tab.screenshot({fullPage:false}));
    await tab.playwright.locator(`button[aria-controls="${id}"]`).press('Enter');await tab.getAXState({emit:false});
    await tab.playwright.locator(`#${id}[data-playing="true"]`).waitFor({state:'visible'});
    rows.push({kind,width,before,after,languages,resumed:true,fitView:true});
  }
  await tab.playwright.locator('.nodalume-index a[href="#nodalume-philosophy"]').press('Enter');await tab.getAXState({emit:false});
  const away=await tab.playwright.evaluate(()=>({hash:location.hash,focus:document.activeElement?.id,diagrams:[...document.querySelectorAll('.diagram-frame')].map(x=>({id:x.id,playing:x.dataset.playing}))}));
  if(away.diagrams.some(x=>x.playing!=='false'))throw new Error('Offscreen playback');
  await tab.reload();await tab.playwright.locator('#nodalume-philosophy:focus').waitFor({state:'visible'});await tab.getAXState({emit:false});
  const preference=await tab.playwright.evaluate(()=>({language:document.documentElement.lang,hash:location.hash,focus:document.activeElement?.id}));
  if(preference.language!=='es')throw new Error('Preference persistence');
  const console=await tab.dev.logs({levels:['error','warn'],limit:100});if(console.length)throw new Error(JSON.stringify(console));
  return{rows,away,preference,console};
}
