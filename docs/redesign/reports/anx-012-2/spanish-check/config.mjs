export default {
  extends:'lighthouse:default',
  artifacts:[{id:'ANXLanguage',gatherer:new URL('./gatherer.mjs',import.meta.url).pathname}],
  audits:[{path:new URL('./audit.mjs',import.meta.url).pathname}],
  categories:{language:{title:'Language QA',auditRefs:[{id:'anx-spanish',weight:1}]}},
};
