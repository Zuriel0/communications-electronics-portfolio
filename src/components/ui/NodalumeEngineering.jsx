import { lazy } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useTranslation from '../../i18n/useTranslation';
import Button from './button';
import ActionLink from './ActionLink';
import NodalumePrinciple from './NodalumePrinciple';
import { CaseFigure } from './CaseStudy';
import { nodalumeReadings } from '../../data/nodalumeReadings';
const engineeringViews = nodalumeReadings.filter(view=>view.inspected);
import { engineeringViewForHash } from '../../utils/nodalumeWalkthrough';

const EngineeringDiagram = lazy(() => import('./graphics/nodalume_flow.jsx'));
const ledger = [
  ['Access issuance & CHAP','Implemented and validated',"copy.eight-original-nodalume-unit-tests-reproduced-offline"],
  ['Registration, sessions & tenancy','Implemented · further validation needed',"copy.transaction-boundaries-sql-policy-snapshots-tenant-guards"],
  ['Visual editor & publication','Implemented · further validation needed',"copy.the-document-contract-contextual-inspector-version-checks"],
  ['Broader operational acceptance','In development',"copy.releasecandidate-documents-retain-deploymentspecific-physical-and-assistedoperation"],
  ['General visual logic & API-action builder','Design concept',"copy.the-reviewed-implementation-establishes-editor-rest-operations"],
  ['AWS deployment','Future direction',"copy.execution-state-network-access-and-operating-cost"],
];
export function EvidenceLedger() {
  const { t } = useTranslation();
  return <div className="nodalume-evidence-ledger">
    <h3>{t('Engineering evidence')}</h3>
    <p>{t("copy.source-snapshot-reviewed-25c6897-productunit-evidence-is")}</p>
    <dl>{ledger.map(([feature,status,scope])=><div key={feature}><dt>{t(feature)}</dt><dd><strong>{t(status)}</strong><p>{t(scope)}</p></dd></div>)}</dl>
  </div>;
}
export function SystemsExplorer() {
  const { t, language } = useTranslation();
  const { hash, pathname } = useLocation();
  const navigate = useNavigate();
  const model = engineeringViewForHash(engineeringViews, hash);
  return <div id="nodalume-systems" tabIndex={-1} className="nodalume-systems" aria-labelledby="nodalume-systems-title">
    <h3 id="nodalume-systems-title">{t('Follow the implementation.')}</h3>
    <p>{t("copy.choose-a-system-view-the-animation-walks")}</p>
    <div className="nodalume-system-selector" role="group" aria-label={t('Engineering views')}>
      {engineeringViews.map(item=><Button key={item.id} aria-pressed={item.id===model.id} aria-controls="nodalume-system-view" onClick={()=>navigate({pathname,hash:`#${item.id}`})}>{item[language].title}</Button>)}
    </div>
    <div id="nodalume-system-view" className="nodalume-system-view">
      <div className="nodalume-figure-heading"><h4>{model[language].title}</h4><span className="nodalume-status">{model[language].status}</span></div>
      <p>{model[language].summary}</p>
      <CaseFigure key={model.id} diagramId={model.id} height={model.height} mobileHeight={model.mobileHeight} reading="copy.dashed-connections-are-conditional-or-independent-paths">
        <EngineeringDiagram kind={model.kind}/>
      </CaseFigure>

    </div>
    <div className="nodalume-system-readings">{engineeringViews.map(view=><DiagramReading key={view.id} view={view} showTitle/>)}</div>
  </div>;
}
export function DiagramReading({ view, showTitle = false }) {
  const { t, language } = useTranslation();
  const text=view[language];
  return <details className="nodalume-text-model"><summary>{t('Text version of this diagram')}{showTitle && <>: {text.title}</>}</summary>{text.summary && <p>{text.summary}</p>}<ul>{text.relationships.map((line,index)=><li key={index}>{line}</li>)}</ul></details>;
}
const dna = [
  ['Elementor / Wix','Composing a portal beyond a fixed template','Reusable visual elements','Own decision: a versioned document tree with constrained sections, columns and typed blocks.','Implemented in the reviewed editor contract and tree operations.'],
  ['Figma','Keeping selection and properties in context','Contextual editing',"copy.own-decision-a-block-inspector-applies-allowed",'Implemented in the reviewed inspector and editor tree.'],
  ['Scratch / Zoho Flow','Making conditional behavior understandable','Visible logic and approachable building blocks','Own decision: keep policy reasoning legible while defining safe execution boundaries.','General visual automation remains a design concept in the inspected scope.'],
  ['Postman','Making API operations explicit','Inputs, requests and inspectable outcomes',"copy.own-decision-editor-operations-use-explicit-save",'Editor REST operations are implemented; a general external API-action builder remains conceptual.'],
];
const principleKinds={'Elementor / Wix':'composition',Figma:'context','Scratch / Zoho Flow':'logic',Postman:'request'};
export function ProductDNA({ references }) {
  const { t } = useTranslation();
  return <div className="nodalume-product-dna"><h3>{t('Product Design DNA')}</h3><p>{t("copy.each-reference-addresses-an-interaction-problem-the")}</p>
    {dna.map(([name,problem,principle,decision,status])=><article key={name} className="nodalume-dna-relation">
      <div className="nodalume-dna-reference"><h4>{t(name)}</h4><p>{t(problem)}</p><NodalumePrinciple kind={principleKinds[name]}/>
        <div className="nodalume-sources">{(references.find(item=>item.name===name)?.sources || []).map(([brand,href])=><ActionLink key={brand} href={href}>{t('Reference documentation')}: {brand}</ActionLink>)}</div>
      </div>
      <dl className="nodalume-dna-decisions"><div><dt>{t('Adapted principle')}</dt><dd>{t(principle)}</dd></div><div className="nodalume-dna-own"><dt>{t('Nodalume decision')}</dt><dd>{t(decision)}</dd></div><div className="nodalume-dna-scope"><dt>{t('Current scope')}</dt><dd>{t(status)}</dd></div></dl>
    </article>)}
  </div>;
}
const operations = [
  ['Environment configuration',"copy.compose-expresses-service-configuration-and-mounts-secret"],
  ['Dependencies & diagnosis',"copy.postgresql-health-gates-the-api-and-freeradius"],
  ['Persistence & recovery',"copy.postgresql-data-and-portal-media-have-separate"],
  ['Testing boundaries',"copy.eight-dependencyfree-product-unit-tests-were-reproduced"],
];
export function OperationalEngineering() {
  const { t } = useTranslation();
  return <dl className="nodalume-operational-decisions">{operations.map(([title,body])=><div key={title}><dt>{t(title)}</dt><dd>{t(body)}</dd></div>)}</dl>;
}
const requirements = [
  ['Execution platform',"copy.evaluate-process-lifecycle-health-checks-and-network"],
  ['Managed persistence',"copy.define-data-ownership-migration-backup-and-restoration"],
  ['Secrets',"copy.define-storage-distribution-rotation-and-access-boundaries"],
  ['Network connectivity',"copy.validate-the-nastoradius-path-transport-latency-and"],
  ['Media storage','Define upload, ownership, publication and coordinated recovery semantics for portal media.'],
  ['Observability',"copy.choose-actionable-health-error-and-accounting-signals"],
  ['Availability & scale',"copy.define-failure-domains-stateful-dependencies-and-measured"],
  ['Operating cost',"copy.measure-resource-usage-and-traffic-assumptions-before"],
];
export function FutureRequirements() {
  const { t } = useTranslation();
  return <details className="nodalume-future-requirements"><summary>{t('Questions before a cloud architecture')}</summary><dl>{requirements.map(([title,body])=><div key={title}><dt>{t(title)}</dt><dd>{t(body)}</dd></div>)}</dl></details>;
}
