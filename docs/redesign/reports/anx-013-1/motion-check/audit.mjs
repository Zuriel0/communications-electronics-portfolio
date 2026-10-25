const {Audit} = await import(`${process.env.ANX_LH_ROOT}/core/audits/audit.js`);
export default class MotionAudit extends Audit {
  static get meta() { return {id:'anx-reduced-motion',title:'Reduced motion presents static content',failureTitle:'Reduced motion is not fully static',description:'Checks the actual media preference, Hero and six graph playback controls.',requiredArtifacts:['ANXMotion']}; }
  static audit({ANXMotion:state}) {
    const hero = !state.heroControl || state.heroStatic === 'true' && state.heroControl.disabled;
    const diagrams = state.diagrams.every(d=>d.playing === 'false' && d.controlDisabled && d.signals.every(s=>s.state==='paused' || s.animation==='none'));
    const targetPresent = state.hash.startsWith('#diagram-') ? state.diagrams.some(d=>d.id===state.hash.slice(1)) : Boolean(state.heroControl);
    return {score:Number(state.reducedMotion && hero && diagrams && targetPresent),details:{type:'debugdata',state}};
  }
}
