export async function checkSite(tab,origin){
 const rows=[];
 for(const [route,id]of[['concurrencia','diagram-loadbalance'],['concurrencia','diagram-business'],['concurrencia','diagram-logic'],['concurrencia','diagram-highlevel'],['metodologia','diagram-methodology-problem'],['metodologia','diagram-methodology-solution']]){
  await tab.goto(`${origin}/projects/${route}#${id}`);await tab.reload();
  await tab.playwright.locator(`#${id}.diagram-frame:focus`).waitFor({state:'visible'});
  await tab.playwright.locator(`#${id}[data-playing="true"]`).waitFor({state:'visible'});await tab.getAXState({emit:false});
  await tab.playwright.locator(`button[aria-controls="${id}"]`).press('Enter');await tab.getAXState({emit:false});
  await tab.playwright.locator(`#${id} .react-flow__controls-zoomin`).press('Enter');await tab.getAXState({emit:false});
  const states=[];
  for(const language of['en','es']){
   await tab.playwright.locator(`button[lang="${language}"]`).press('Enter');await tab.getAXState({emit:false});
   states.push(await tab.playwright.locator(`#${id}`).evaluate(x=>({language:document.documentElement.lang,hash:location.hash,playing:x.dataset.playing,zoom:x.querySelector('.react-flow__viewport').style.transform,nodes:x.querySelectorAll('.react-flow__node').length,paths:x.querySelectorAll('.react-flow__edge').length,paused:document.querySelector(`button[aria-controls="${x.id}"]`).getAttribute('aria-pressed')})));
  }
  if(states[0].zoom!==states[1].zoom||states.some(x=>x.playing!=='false'||x.paused!=='true'))throw new Error(id+' state retention');
  await tab.playwright.locator(`#${id} .react-flow__controls-fitview`).press('Enter');await tab.getAXState({emit:false});
  await tab.playwright.locator(`button[aria-controls="${id}"]`).press('Enter');await tab.getAXState({emit:false});
  await tab.playwright.locator(`#${id}[data-playing="true"]`).waitFor({state:'visible'});rows.push({id,autoplay:true,states,resumed:true,fitView:true});
 }
 await tab.goto(`${origin}/#hero`);await tab.reload();await tab.playwright.locator('.hero-pause[aria-pressed="false"]').waitFor({state:'visible'});await tab.getAXState({emit:false});await tab.playwright.locator('.hero-pause').press('Enter');await tab.playwright.locator('.hero-pause[aria-pressed="true"]').waitFor({state:'visible'});await tab.getAXState({emit:false});
 const home=[];
 for(const lang of['en','es']){await tab.playwright.locator(`button[lang="${lang}"]`).press('Enter');await tab.getAXState({emit:false});home.push(await tab.playwright.evaluate(()=>({language:document.documentElement.lang,entry:document.querySelector('script[type="module"]').getAttribute('src'),heroPaused:document.querySelector('.hero-pause').getAttribute('aria-pressed'),legacy:!!document.querySelector('.capability-additional'),areas:document.querySelectorAll('.capability-family').length,credentials:document.querySelectorAll('a[href*="credly.com/badges/"]').length,aws:document.querySelector('#learning-in-progress')?.textContent,contact:document.querySelector('a[href^="mailto:"]')?.getAttribute('href'),canonical:document.querySelector('link[rel="canonical"]')?.href,scrollWidth:document.documentElement.scrollWidth,width:document.documentElement.clientWidth})));}
 if(home.some(x=>x.heroPaused!=='true'||x.legacy||x.credentials!==18||x.areas!==6||x.scrollWidth>x.width))throw new Error('Home content');
 await tab.playwright.locator('.hero-project-link').press('Enter');await tab.playwright.locator('#projects:focus').waitFor({state:'visible'});await tab.getAXState({emit:false});await tab.reload();await tab.playwright.locator('#projects:focus').waitFor({state:'visible'});await tab.getAXState({emit:false});
 const preference=await tab.playwright.evaluate(()=>({language:document.documentElement.lang,hash:location.hash,focus:document.activeElement?.id}));if(preference.language!=='es')throw new Error('Preference persistence');
 const logs=await tab.dev.logs({levels:['error','warn'],limit:100});if(logs.length)throw new Error(JSON.stringify(logs));
 return{origin,graphs:rows,home,preference,console:logs};
}
