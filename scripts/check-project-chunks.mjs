import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';
import { build } from 'vite';

let chunks;
await build({
  logLevel: 'warn',
  build: { write: false },
  plugins: [{
    name: 'verify-project-isolation',
    generateBundle(_options, bundle) {
      chunks = Object.values(bundle).filter(item => item.type === 'chunk').map(item => ({
        file: item.fileName, entry: item.isEntry, facade: item.facadeModuleId,
        imports: item.imports, dynamicImports: item.dynamicImports, modules: Object.keys(item.modules),
      }));
    },
  }],
});

function closure(start) {
  const files = new Set();
  function visit(file) {
    if (files.has(file)) return;
    files.add(file);
    chunks.find(chunk => chunk.file === file)?.imports.forEach(visit);
  }
  visit(start.file);
  return chunks.filter(chunk => files.has(chunk.file));
}
const flowOnly = /node_modules\/(?:@xyflow\/|d3-(?:zoom|selection|drag|dispatch|interpolate|transition|timer|color|ease)\/|zustand\/)/;
const entry = chunks.find(chunk => chunk.entry);
assert.ok(entry, 'Entry chunk exists');
const initial = closure(entry);
assert.equal(initial.flatMap(chunk => chunk.modules).filter(id => flowOnly.test(id)).length, 0, 'React Flow and its graph-specific dependencies must stay out of home');
for (const page of ['Concurrencia', 'Metodologia']) {
  const route = chunks.find(chunk => chunk.facade?.endsWith(`/pages/projects/${page}.jsx`));
  assert.ok(route, `${page} has its own dynamic chunk`);
  assert.ok(entry.dynamicImports.includes(route.file), `${page} is a dynamic import from the entry`);
  assert.ok(closure(route).flatMap(chunk => chunk.modules).some(id => id.includes('/@xyflow/react/')), `${page} retains React Flow`);
}
const report = {
  initialFiles: initial.map(chunk => chunk.file),
  routes: chunks.filter(chunk => /\/pages\/projects\//.test(chunk.facade || '')).map(chunk => ({ file: chunk.file, imports: chunk.imports })),
  flowFiles: chunks.filter(chunk => chunk.modules.some(id => flowOnly.test(id))).map(chunk => chunk.file),
};
await writeFile('/tmp/anx004-chunks.json', JSON.stringify(report, null, 2));
console.log('PASS: home excludes React Flow/d3/zustand; both dynamic project routes retain their diagrams.');
console.log(JSON.stringify(report, null, 2));
