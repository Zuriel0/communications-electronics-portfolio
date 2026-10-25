import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {engineeringSystems} from '../src/data/nodalumeEngineering.js';
import messages from '../src/i18n/locales/nodalume.js';
import {walkthroughAt,walkthroughSteps,engineeringViewForHash} from '../src/utils/nodalumeWalkthrough.js';

const byKind = kind => engineeringSystems.find(model=>model.kind===kind);
test('five evidence views translate every explanation and retain valid, explicit reading stages',()=>{
  assert.equal(engineeringSystems.length,5);
  assert.equal(new Set(engineeringSystems.map(model=>model.id)).size,5);
  for (const model of engineeringSystems) {
    const nodes=new Set(model.nodes.map(node=>node.id));
    const edges=new Set(model.edges.map(edge=>edge.id));
    assert.equal(nodes.size,model.nodes.length);assert.equal(edges.size,model.edges.length);
    for (const edge of model.edges) assert.ok(nodes.has(edge.source)&&nodes.has(edge.target),edge.id);
    const copy=[model.title,model.status,model.summary,...model.nodes.flatMap(node=>[node.label,node.detail,node.explanation]),...model.edges.map(edge=>edge.label),...model.steps.map(step=>step.title)];
    for (const key of copy) assert.ok(messages.en[key]&&messages.es[key],key);
    for (let step=0;step<model.steps.length;step++) {
      const phase=walkthroughAt(model,step);
      assert.ok(edges.has(phase.edgeId));assert.ok(nodes.has(phase.source)&&nodes.has(phase.target));
      assert.equal(phase.index,step);
    }
    assert.deepEqual(walkthroughAt(model,model.steps.length),walkthroughAt(model,0));
    assert.deepEqual(walkthroughAt(model,-1),walkthroughAt(model,model.steps.length-1));
    assert.ok(!/https?:|\b\d{1,3}(?:\.\d{1,3}){3}\b/i.test(JSON.stringify(model)));
  }
});
test('session accounting does not imply a disconnect, mandatory Interim or a simultaneous alternative',()=>{
  const sessions=byKind('sessions');
  assert.equal(sessions.edges.filter(edge=>edge.source==='audit'||edge.target==='audit').length,0);
  assert.ok(sessions.nodes.find(node=>node.id==='audit').independent);
  assert.ok(sessions.edges.find(edge=>edge.id==='start-stop').conditional);
  assert.ok(!walkthroughSteps(sessions).some(step=>step.edge==='start-stop'));
  assert.ok(sessions.nodes.find(node=>node.id==='audit').explanation.includes('does not send Disconnect or CoA'));
  const tenant=byKind('tenancy');
  assert.ok(!walkthroughSteps(tenant).some(step=>step.edge==='platform-guard'));
});
test('all evidence hashes select one system view, including direct encoded links and malformed input',()=>{
  for(const model of engineeringSystems){
    assert.equal(engineeringViewForHash(engineeringSystems,'#'+model.id),model);
    assert.equal(engineeringViewForHash(engineeringSystems,'#'+encodeURIComponent(model.id)),model);
  }
  for(const hash of ['','#nodalume-design','#%ZZ'])assert.equal(engineeringViewForHash(engineeringSystems,hash),engineeringSystems[0]);
});
test('the three original Nodalume models remain byte-for-byte intact',()=>{
  const actual=createHash('sha256').update(readFileSync('src/data/nodalume.js')).digest('hex');
  assert.equal(actual,'d44b0b20b20a08891412c4101f08f58bd9df4c9c320593fc63861171bee29821');
});
