/* global process */
import assert from 'node:assert/strict';
import test from 'node:test';
import { createRequire } from 'node:module';
import { createServer } from 'vite';
import { readFileSync } from 'node:fs';
import messages from '../src/i18n/locales/nodalume.js';
import { nodalumeDiagrams } from '../src/data/nodalume.js';
import { getPageMetadata } from '../src/data/pageMetadata.js';
import { projects } from '../src/data/projects.js';
import { projectNavigation } from '../src/data/navigation.js';
import { isDiagramDestination } from '../src/utils/diagramLoading.js';

test('Nodalume is discoverable with a canonical route and stable deep navigation',()=>{
  assert.equal(projects.filter(project=>project.link==='/projects/nodalume').length,1);
  assert.equal(getPageMetadata('/projects/nodalume/').canonical,'https://anxzu.com/projects/nodalume');
  assert.deepEqual(projectNavigation('/projects/nodalume/'),projectNavigation('/projects/nodalume'));
  assert.ok(projectNavigation('/projects/nodalume').every(item=>item.href==='/'||item.href.startsWith('#nodalume-')));
  for(const model of Object.values(nodalumeDiagrams)){
    assert.ok(isDiagramDestination('#'+model.id,model.id));
    assert.ok(isDiagramDestination('#'+encodeURIComponent(model.id),model.id));
  }
});

test('all three abstract models retain explicit scope and translate each relationship and node',()=>{
  assert.equal(Object.keys(nodalumeDiagrams).length,3);
  const statuses=new Set();
  for(const model of Object.values(nodalumeDiagrams)){
    statuses.add(model.status);
    assert.equal(model.nodes.length,5);assert.equal(model.edges.length,4);
    const ids=new Set(model.nodes.map(node=>node.id));assert.equal(ids.size,5);
    for(const edge of model.edges){assert.ok(ids.has(edge.source)&&ids.has(edge.target));}
    for(const key of [model.title,model.status,...model.nodes.flatMap(node=>[node.label,node.detail]),...model.edges.map(edge=>edge.label)]){
      assert.ok(messages.en[key]&&messages.es[key],key);
    }
    assert.ok(!/https?:|\b\d{1,3}(?:\.\d{1,3}){3}\b|token|password/i.test(JSON.stringify(model)));
  }
  assert.equal(statuses.size,3);
});

test('actual editorial page renders complete EN/ES before the deferred diagram runtime',async()=>{
  const require=createRequire(`${process.cwd()}/package.json`);
  const React=require('react'),{renderToStaticMarkup}=require('react-dom/server'),{MemoryRouter}=require('react-router-dom');
  const server=await createServer({logLevel:'silent',server:{middlewareMode:true,hmr:false,ws:false},appType:'custom'});
  try{
    const {default:Page}=await server.ssrLoadModule('/src/pages/projects/Nodalume.jsx');
    const {default:Provider}=await server.ssrLoadModule('/src/i18n/LanguageProvider.jsx');
    const {createLanguageStore}=await server.ssrLoadModule('/src/i18n/languageStore.js');
    const store=createLanguageStore(()=>null);
    for(const language of ['en','es']){
      store.setLanguage(language);
      const html=renderToStaticMarkup(React.createElement(MemoryRouter,{initialEntries:['/projects/nodalume']},React.createElement(Provider,{store},React.createElement(Page))));
      assert.equal((html.match(/<h1/g)||[]).length,1);
      assert.ok(html.includes(messages[language]['A portal. Your possibilities.']));
      assert.ok(html.includes(messages[language]['Future direction']));
      assert.ok(html.includes(messages[language]['Source reviewed · isolated tests reproduced']));
      for(const brand of ['Elementor / Wix','Figma','Scratch / Zoho Flow','Postman'])assert.ok(html.includes(brand));
      assert.ok(html.includes('Docker Compose'));assert.ok(html.includes('MikroTik'));
      assert.equal((html.match(/class="diagram-load-frame"/g)||[]).length,4);
      const loading=language==='en'?'Loading interactive diagram…':'Cargando diagrama interactivo…';
      assert.equal(html.split(loading).length-1,4,'Each deferred figure uses the active route language');
      assert.ok(html.includes(language==='en'?'aria-label="Case study sections"':'aria-label="Secciones del caso de estudio"'));
      assert.ok(!html.includes('react-flow__node'));
      for(const nav of projectNavigation('/projects/nodalume'))if(nav.href.startsWith('#'))assert.ok(html.includes(`id="${nav.href.slice(1)}"`));
      assert.ok(!/\bSaaS\b|99\.9%|customers served|production deployment achieved/i.test(html));
      assert.equal(store.getSnapshot(),language);
    }
    const graph=readFileSync('src/components/ui/graphics/nodalume_flow.jsx','utf8');
    assert.ok(graph.includes('observeDiagramPlayback'));
    assert.ok(graph.includes('useReducedMotion'));
    assert.ok(graph.includes('zoomOnScroll={false}'));
    assert.ok(graph.includes('preventScrolling={false}'));
    assert.ok(!graph.includes('requestAnimationFrame'));
  }finally{await server.close();}
});

test('the route catalog independently translates shared graph controls and recovery states',()=>{
  for(const key of ['Zoom In','Zoom Out','Fit View','Diagram controls','Case study sections','Loading interactive diagram…','Unable to load this diagram.','Check your connection and reload to try again. The case study remains available.','Reload diagram']){
    assert.ok(messages.es[key],key);
    assert.notEqual(messages.es[key],key,`${key} must not fall back to English in the route-local context`);
  }
});
