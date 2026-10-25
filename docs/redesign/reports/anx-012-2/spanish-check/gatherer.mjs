// Seed only a disposable Lighthouse profile with the same public preference
// written by the EN/ES selector; no application-only benchmark path is added.
const {default:BaseGatherer} = await import(`${process.env.ANX_LH_ROOT}/core/gather/base-gatherer.js`);
export default class ANXLanguage extends BaseGatherer {
  meta = {supportedModes:['navigation']};
  async startInstrumentation({driver}) {
    await driver.executionContext.evaluateOnNewDocument(() => {
      try { localStorage.setItem('anxzu.language','es'); } catch { /* about:blank has no storage */ }
    }, {args:[]});
  }
  async getArtifact({driver}) {
    return driver.executionContext.evaluate(() => ({language:document.documentElement.lang,title:document.title,heading:document.querySelector('h1')?.textContent}), {args:[],useIsolation:true});
  }
}
