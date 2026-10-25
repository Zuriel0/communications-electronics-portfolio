import { lazy } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useTranslation from '../../i18n/useTranslation';
import Button from './button';
import ActionLink from './ActionLink';
import { CaseFigure } from './CaseStudy';
import { engineeringSystems } from '../../data/nodalumeEngineering';
import { engineeringViewForHash } from '../../utils/nodalumeWalkthrough';

const EngineeringDiagram = lazy(() => import('./graphics/nodalume_flow.jsx'));
const ledger = [
  ['Access issuance & CHAP','Implemented and validated','Eight original Nodalume unit tests reproduced offline: CHAP vectors, origin-bound handoff and temporary-access service behavior.'],
  ['Registration, sessions & tenancy','Implemented · further validation needed','Transaction boundaries, SQL policy snapshots, tenant guards and accounting queries inspected. Database integration tests exist and were reviewed; they were not rerun here.'],
  ['Visual editor & publication','Implemented · further validation needed','The document contract, contextual inspector, version checks and immutable publication path are present in source. Full product UI and database acceptance were not reproduced.'],
  ['Broader operational acceptance','In development','Release-candidate documents retain deployment-specific physical and assisted-operation limits. Current lab service state was not contacted.'],
  ['General visual logic & API-action builder','Design concept','The reviewed implementation establishes editor REST operations. A general visual automation engine or external API-action builder is not established by the inspected source.'],
  ['AWS deployment','Future direction','Execution, state, network access and operating cost remain requirements to evaluate before choosing a cloud topology.'],
];
export function EvidenceLedger() {
  const { t } = useTranslation();
  return <div className="nodalume-evidence-ledger">
    <h3>{t('Engineering evidence')}</h3>
    <p>{t('Source snapshot reviewed: 25c6897. Product-unit evidence is separate from the tests of this portfolio.')}</p>
    <dl>{ledger.map(([feature,status,scope])=><div key={feature}><dt>{t(feature)}</dt><dd><strong>{t(status)}</strong><p>{t(scope)}</p></dd></div>)}</dl>
  </div>;
}
export function SystemsExplorer() {
  const { t } = useTranslation();
  const { hash, pathname } = useLocation();
  const navigate = useNavigate();
  const model = engineeringViewForHash(engineeringSystems, hash);
  return <div id="nodalume-systems" tabIndex={-1} className="nodalume-systems" aria-labelledby="nodalume-systems-title">
    <h3 id="nodalume-systems-title">{t('Follow the implementation.')}</h3>
    <p>{t('Choose a system view. The animation walks source-backed relationships; it does not represent traffic from a running installation.')}</p>
    <div className="nodalume-system-selector" role="group" aria-label={t('Engineering views')}>
      {engineeringSystems.map(item=><Button key={item.id} aria-pressed={item.id===model.id} aria-controls="nodalume-system-view" onClick={()=>navigate({pathname,hash:`#${item.id}`})}>{t(item.title)}</Button>)}
    </div>
    <div id="nodalume-system-view" className="nodalume-system-view">
      <div className="nodalume-figure-heading"><h4>{t(model.title)}</h4><span className="nodalume-status">{t(model.status)}</span></div>
      <p>{t(model.summary)}</p>
      <CaseFigure key={model.id} diagramId={model.id} height={model.height} mobileHeight={model.mobileHeight} reading="Dashed connections are conditional or independent paths. The automatic walkthrough follows only its declared stages; all paths remain visible when paused.">
        <EngineeringDiagram model={model}/>
      </CaseFigure>
      <details className="nodalume-text-model"><summary>{t('Text version of this diagram')}</summary><ul>{model.edges.map(edge=><li key={edge.id}>{t(model.nodes.find(node=>node.id===edge.source).label)} — {t(edge.label)} — {t(model.nodes.find(node=>node.id===edge.target).label)}</li>)}</ul></details>
    </div>
  </div>;
}
const dna = [
  ['Elementor / Wix','Composing a portal beyond a fixed template','Reusable visual elements','Own decision: a versioned document tree with constrained sections, columns and typed blocks.','Implemented in the reviewed editor contract and tree operations.'],
  ['Figma','Keeping selection and properties in context','Contextual editing','Own decision: a block inspector applies allowed property changes to a stable selected block identity.','Implemented in the reviewed inspector and editor tree.'],
  ['Scratch / Zoho Flow','Making conditional behavior understandable','Visible logic and approachable building blocks','Own decision: keep policy reasoning legible while defining safe execution boundaries.','General visual automation remains a design concept in the inspected scope.'],
  ['Postman','Making API operations explicit','Inputs, requests and inspectable outcomes','Own decision: editor operations use explicit save, preview, publish and restore contracts with version checks.','Editor REST operations are implemented; a general external API-action builder remains conceptual.'],
];
export function ProductDNA({ references }) {
  const { t } = useTranslation();
  return <div className="nodalume-product-dna"><h3>{t('Product Design DNA')}</h3><p>{t('Each reference addresses an interaction problem. The implementation makes its own choices, with the current scope shown beside each principle.')}</p>
    {dna.map(([name,problem,principle,decision,status])=><article key={name}><div><h4>{t(name)}</h4><p>{t(problem)}</p></div><dl><div><dt>{t('Adapted principle')}</dt><dd>{t(principle)}</dd></div><div><dt>{t('Nodalume decision')}</dt><dd>{t(decision)}</dd></div><div><dt>{t('Current scope')}</dt><dd>{t(status)}</dd></div></dl><div className="nodalume-sources">{(references.find(item=>item.name===name)?.sources || []).map(([brand,href])=><ActionLink key={brand} href={href}>{t('Reference documentation')}: {brand}</ActionLink>)}</div></article>)}
  </div>;
}
const operations = [
  ['Environment configuration','Compose expresses service configuration and mounts. Secret values remain outside this case study; laboratory and installation profiles must be evaluated separately.'],
  ['Dependencies & diagnosis','PostgreSQL health gates the API and FreeRADIUS. API health gates the web services. Readiness, functional authentication and physical Internet access are separate checks.'],
  ['Persistence & recovery','PostgreSQL data and portal media have separate volumes. Migration history and coordinated restoration are operational concerns; recovery documents are evidence to inspect, not a restore performed in this phase.'],
  ['Testing boundaries','Eight dependency-free product unit tests were reproduced offline. Database test sources and the RADIUS and browser implementation were inspected. No active lab API, database, router or service was contacted.'],
];
export function OperationalEngineering() {
  const { t } = useTranslation();
  return <dl className="nodalume-operational-decisions">{operations.map(([title,body])=><div key={title}><dt>{t(title)}</dt><dd>{t(body)}</dd></div>)}</dl>;
}
const requirements = [
  ['Execution platform','Evaluate process lifecycle, health checks and network requirements before choosing a container execution service.'],
  ['Managed persistence','Define data ownership, migration, backup and restoration requirements before selecting managed PostgreSQL.'],
  ['Secrets','Define storage, distribution, rotation and access boundaries without embedding credentials in images or browser code.'],
  ['Network connectivity','Validate the NAS-to-RADIUS path, transport, latency and administrative access boundaries in the target environment.'],
  ['Media storage','Define upload, ownership, publication and coordinated recovery semantics for portal media.'],
  ['Observability','Choose actionable health, error and accounting signals, retention and sensitive-data handling requirements.'],
  ['Availability & scale','Define failure domains, stateful dependencies and measured demand before claiming high availability or autoscaling.'],
  ['Operating cost','Measure resource usage and traffic assumptions before estimating compute, storage, network and operational costs.'],
];
export function FutureRequirements() {
  const { t } = useTranslation();
  return <details className="nodalume-future-requirements"><summary>{t('Questions before a cloud architecture')}</summary><dl>{requirements.map(([title,body])=><div key={title}><dt>{t(title)}</dt><dd>{t(body)}</dd></div>)}</dl></details>;
}
