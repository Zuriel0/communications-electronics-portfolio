const {Audit}=await import(`${process.env.ANX_LH_ROOT}/core/audits/audit.js`);
export default class CPUAudit extends Audit{
 static get meta(){return {id:'anx-cpu',title:'Bounded main-thread activity sample',failureTitle:'Main-thread sample unavailable',description:'Main-thread TaskDuration over a settled 12-second window, not total CPU or FPS.',requiredArtifacts:['ANXCPU']};}
 static audit({ANXCPU:state}){return {score:Number(state.wallSeconds>=12&&Number.isFinite(state.mainThreadBusyPercent)),details:{type:'debugdata',state}};}
}
