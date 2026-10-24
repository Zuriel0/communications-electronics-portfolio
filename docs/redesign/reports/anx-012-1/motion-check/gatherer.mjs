// Lighthouse extension: read-only diagnostics, no application/browser state mutation.
const {default:BaseGatherer} = await import(`${process.env.ANX_LH_ROOT}/core/gather/base-gatherer.js`);
export default class ANXMotion extends BaseGatherer {
  meta = { supportedModes:['navigation'] };
  async getArtifact({driver}) {
    return driver.executionContext.evaluate(() => ({
      reducedMotion:matchMedia('(prefers-reduced-motion: reduce)').matches,
      language:document.documentElement.lang,
      heroStatic:document.querySelector('#hero')?.getAttribute('data-static') || null,
      heroControl:document.querySelector('.hero-pause') ? {disabled:document.querySelector('.hero-pause').disabled,text:document.querySelector('.hero-pause').textContent} : null,
      diagrams:[...document.querySelectorAll('.diagram-frame')].map(frame=>({id:frame.id,playing:frame.getAttribute('data-playing'),
        nodes:frame.querySelectorAll('.react-flow__node').length,edges:frame.querySelectorAll('.react-flow__edge').length,
        controlDisabled:document.querySelector(`button[aria-controls="${frame.id}"]`)?.disabled,
        signals:[...frame.querySelectorAll('.diagram-flow-signal')].map(signal=>({animation:getComputedStyle(signal).animationName,state:getComputedStyle(signal).animationPlayState}))})),
    }), {args:[],useIsolation:true});
  }
}
