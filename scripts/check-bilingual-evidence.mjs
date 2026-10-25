// Verifies observations recorded by the real cua_repl browser QA, not fabricated DOM fixtures.
// Re-run the browser recipe after application changes; stale entry hashes are rejected.
import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
const directory='docs/redesign/evidence/anx-012-2';
const json=async file=>JSON.parse(await readFile(file,'utf8'));
const manifest=await json('dist/.vite/manifest.json');
const responsive=await json(`${directory}/responsive-matrix.json`);
assert.equal(responsive.length,36);
for (const row of responsive) {
  assert.equal(row.entry,`/${manifest['index.html'].file}`,'Evidence must match the current build');
  assert.ok(row.scrollWidth<=row.width && !row.legacySection);
  assert.ok(row.controls.every(x=>x.width>=44 && x.height>=44));
}
for (const name of ['six-graphs-functional-final','six-graphs-functional-mobile']) {
  const {rows}=await json(`${directory}/${name}.json`);
  assert.equal(rows.length,4);
  for (const row of rows) {
    assert.equal(row.after.language,row.language);
    assert.equal(row.after.hash,row.before.hash);
    for (const frame of row.before.frames) {
      const after=row.after.frames.find(x=>x.id===frame.id);
      assert.ok(frame.zoom && after.zoom===frame.zoom,`${name}: ${frame.id} zoom`);
      assert.equal(after.playing,'false');assert.equal(after.paused,'true');
      const visit=row.visits.find(x=>x.id===frame.id);
      const initial=visit.initial.frames.find(x=>x.id===frame.id);
      assert.equal(initial.playing,'true');
      assert.notEqual(frame.zoom,initial.zoom,'Zoom control actually changed the view');
    }
  }
  const unique=rows.filter(row=>row.language==='en').flatMap(row=>row.before.frames);
  assert.equal(unique.length,6);
  assert.equal(unique.reduce((sum,x)=>sum+x.nodes,0),46);
  assert.equal(unique.reduce((sum,x)=>sum+x.paths,0),36); // The optional note has no transfer path; models retain 37.
}
const graphViews=await json(`${directory}/six-graphs-responsive.json`);
assert.equal(graphViews.length,72);
assert.ok(graphViews.every(x=>x.scrollWidth<=x.documentWidth && x.controls.every(b=>b.w>=44 && b.h>=44)));
const geometry=await json(`${directory}/deferred-geometry.json`);
assert.equal(geometry.length,8);
assert.ok(geometry.every(x=>x.before.pending && x.delta===0));
const navigation=await json(`${directory}/navigation-hero-menu.json`);
assert.ok(navigation.heroStates.every(x=>x.pressed==='true' && x.static==='true' && x.hash==='#hero'));
assert.equal(navigation.menuOpen.expanded,'true');assert.equal(navigation.menuOpen.href,'#about');
assert.equal(navigation.menuClosed.expanded,'false');assert.match(navigation.menuClosed.focus,/menu-toggle/);
assert.equal(navigation.reloadState.language,'es');assert.equal(navigation.reloadState.focus,'diagram-methodology-solution');
assert.equal(navigation.backState.focus,'projects');assert.equal(navigation.backState.hash,'#projects');
assert.deepEqual(await json(`${directory}/console.json`),[]);
const motion=await json('docs/redesign/reports/anx-012-2/motion-check/results.json');
assert.equal(motion.length,7);assert.ok(motion.every(x=>x.score===1 && x.state.reducedMotion && x.accessibility===100));
const result={entry:manifest['index.html'].file,responsiveViews:36,graphViews:72,graphs:6,nodes:46,modelEdges:37,drawnPaths:36,geometryComparisons:8,reducedMotionNavigations:7,result:'PASS',method:'Assertions over current-build real browser observations and real Chrome reduced-motion diagnostics; not an autonomous browser runner.'};
await writeFile('docs/redesign/reports/anx-012-2/browser-assertions.json',JSON.stringify(result,null,2)+'\n');
console.log('PASS: recorded real UI observations match the final build; responsive, autoplay, pause/zoom/language, geometry, focus and reduced motion.');
