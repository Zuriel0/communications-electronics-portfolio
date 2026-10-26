import test from 'node:test';import assert from 'node:assert/strict';
import {preloadNodalumeEditorial} from '../scripts/page-head.mjs';
test('direct Nodalume HTML preloads only the editorial static closure in stylesheet order',()=>{
 const chunk=(fileName,modules,imports=[],css=[])=>({type:'chunk',fileName,modules:Object.fromEntries(modules.map(id=>[id,{}])),imports,dynamicImports:['graph.js'],viteMetadata:{importedCss:new Set(css)}});
 const bundle={'entry.js':chunk('entry.js',['/src/main.jsx'],[],['base.css']),'case.js':chunk('case.js',['/src/components/ui/CaseStudy.jsx'],['entry.js'],['case.css']),'nodalume.js':chunk('nodalume.js',['/src/pages/projects/Nodalume.jsx'],['entry.js','case.js'],['nodalume.css']),'graph.js':chunk('graph.js',['/src/data/nodalumeEngineering.js'],[],['flow.css'])};
 const html=preloadNodalumeEditorial('<head><script src="/entry.js"></script><link href="/base.css" /></head>',bundle);
 assert.ok(html.includes('rel="modulepreload" crossorigin href="/nodalume.js"'));
 assert.ok(html.includes('rel="modulepreload" crossorigin href="/case.js"'));
 assert.equal((html.match(/entry.js/g)||[]).length,1);assert.equal((html.match(/base.css/g)||[]).length,1);
 assert.ok(html.indexOf('/case.css')<html.indexOf('/nodalume.css'));
 assert.ok(!html.includes('graph.js')&&!html.includes('flow.css'));
});
