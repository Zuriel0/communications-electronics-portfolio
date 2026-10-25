// Run through cua_repl with the existing tab, viewport capability and fs handle.
// This is browser UI automation, not a Node/headless test or an app benchmark hook.
function check(condition, message) { if (!condition) throw new Error(message); }
export async function diagramQA(tab) {
  const read = () => tab.playwright.evaluate(() => ({hash:location.hash,language:document.documentElement.lang,
    frames:[...document.querySelectorAll('.diagram-frame')].map(x=>({id:x.id,playing:x.dataset.playing,
      zoom:x.querySelector('.react-flow__viewport')?.style.transform,nodes:x.querySelectorAll('.react-flow__node').length,
      paths:x.querySelectorAll('.react-flow__edge').length,
      paused:document.querySelector(`button[aria-controls="${x.id}"]`)?.getAttribute('aria-pressed')}))}));
  const rows=[];
  for (const [route,ids] of [['concurrencia',['diagram-loadbalance','diagram-business','diagram-logic','diagram-highlevel']],['metodologia',['diagram-methodology-problem','diagram-methodology-solution']]]) {
    // Reset our earlier manual pauses before testing a fresh navigation's autoplay.
    await tab.goto(`http://127.0.0.1:4173/projects/${route}`);
    await tab.reload();
    await tab.playwright.locator('#case-title').waitFor({state:'visible'});
    const visits=[];
    for (const id of ids) {
      await tab.goto(`http://127.0.0.1:4173/projects/${route}#${id}`);
      await tab.playwright.locator(`#${id}.diagram-frame:focus`).waitFor({state:'visible'});
      await tab.playwright.locator(`#${id}[data-playing="true"]`).waitFor({state:'visible'});
      await tab.getAXState({emit:false});
      const initial=await read();
      const frame=initial.frames.find(x=>x.id===id);
      check(frame?.playing==='true', `${id}: autoplay`);
      await tab.playwright.locator(`button[aria-controls="${id}"]`).press('Enter');
      await tab.playwright.locator(`#${id} .react-flow__controls-zoomin`).press('Enter');
      await tab.getAXState({emit:false});
      visits.push({id,initial});
    }
    const before=await read();
    check(before.frames.length===ids.length, `${route}: previously loaded diagrams remain mounted`);
    for (const language of ['en','es']) {
      await tab.playwright.locator(`button[lang="${language}"]`).press('Enter');
      await tab.getAXState({emit:false});
      const after=await read();
      check(after.language===language && after.hash===before.hash, `${route}: language/hash`);
      for (const frame of before.frames) {
        const next=after.frames.find(x=>x.id===frame.id);
        check(next?.zoom===frame.zoom && next.paused==='true' && next.playing==='false', `${frame.id}: retained pause/zoom in ${language}`);
      }
      rows.push({route,language,visits,before,after});
    }
    for (const id of ids) {
      await tab.goto(`http://127.0.0.1:4173/projects/${route}#${id}`);
      await tab.playwright.locator(`#${id}.diagram-frame:focus`).waitFor({state:'visible'});
      await tab.playwright.locator(`#${id} .react-flow__controls-fitview`).press('Enter');
      await tab.playwright.locator(`button[aria-controls="${id}"]`).press('Space');
      await tab.playwright.locator(`#${id}[data-playing="true"]`).waitFor({state:'visible'});
      await tab.getAXState({emit:false});
    }
  }
  return {method:'Real public UI, Enter/Space, direct hashes, all six autoplay/pause/zoom/Fit View/resume; assertions throw on failure.',rows};
}

export async function responsiveQA(tab,viewport,save) {
  const rows=[];
  for (const width of [320,375,768,1024,1440,1920]) {
    await viewport.set({width,height:960});
    for (const route of ['','projects/concurrencia','projects/metodologia']) {
      await tab.goto(`http://127.0.0.1:4173/${route}`);
      await tab.playwright.locator(route ? '#case-title' : '#hero-title').waitFor({state:'visible'});
      for (const language of ['en','es']) {
        await tab.playwright.locator(`button[lang="${language}"]`).press('Enter');
        await tab.getAXState({emit:false});
        const state=await tab.playwright.evaluate(()=>({language:document.documentElement.lang,route:location.pathname,width:innerWidth,
          documentWidth:document.documentElement.clientWidth,scrollWidth:document.documentElement.scrollWidth,
          legacySection:!!document.querySelector('.capability-additional'),entry:document.querySelector('script[type="module"]')?.getAttribute('src'),
          controls:[...document.querySelectorAll('button[lang]')].map(x=>({width:x.getBoundingClientRect().width,height:x.getBoundingClientRect().height}))}));
        check(state.language===language && !state.legacySection && state.scrollWidth<=state.width, `responsive: ${width} ${route} ${language}`);
        check(state.controls.every(x=>x.width>=44 && x.height>=44), 'Language touch targets');
        rows.push({requestedWidth:width,...state});
        if ([375,1440].includes(width)) await save(`${route.split('/').pop() || 'home'}-${language}-${width}.png`,await tab.screenshot({fullPage:false}));
      }
    }
  }
  return rows;
}
