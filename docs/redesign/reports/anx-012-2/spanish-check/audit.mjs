const {Audit} = await import(`${process.env.ANX_LH_ROOT}/core/audits/audit.js`);
export default class LanguageAudit extends Audit {
  static get meta() { return {id:'anx-spanish',title:'Spanish preference restored',failureTitle:'Spanish preference missing',description:'Confirms the language actually rendered in the isolated measurement.',requiredArtifacts:['ANXLanguage']}; }
  static audit({ANXLanguage:state}) { return {score:Number(state.language==='es'),details:{type:'debugdata',state}}; }
}
