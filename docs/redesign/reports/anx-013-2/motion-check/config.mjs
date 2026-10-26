export default {
  extends:'lighthouse:default',
  artifacts:[{id:'ANXMotion',gatherer:new URL('./gatherer.mjs',import.meta.url).pathname}],
  audits:[{path:new URL('./audit.mjs',import.meta.url).pathname}],
  categories:{qa:{title:'ANX reduced motion QA',auditRefs:[{id:'anx-reduced-motion',weight:1}]}},
};
