import { lazy } from 'react';
import { MessagesContext } from '../../i18n/contexts';
import messages from '../../i18n/locales/nodalume';
import Text from '../../i18n/Text';
import useTranslation from '../../i18n/useTranslation';
import Navbar from '../../components/layout/navbar_project';
import ActionLink from '../../components/ui/ActionLink';
import { EvidenceLedger, SystemsExplorer, ProductDNA, OperationalEngineering, FutureRequirements, DiagramReading } from '../../components/ui/NodalumeEngineering';
import NodalumeMark from '../../components/ui/NodalumeMark';
import { CaseFigure } from '../../components/ui/CaseStudy';
import { nodalumeReadings } from '../../data/nodalumeReadings';
import '../../style/nodalume.css';

const NodalumeDiagram = lazy(() => import('../../components/ui/graphics/nodalume_flow.jsx'));
const sections = [
  ['nodalume-problem','Problem'],['nodalume-philosophy','Product philosophy'],
  ['nodalume-current','Current implementation'],['nodalume-architecture','Architecture'],['nodalume-systems','Engineering views'],
  ['nodalume-design','Design influences'],['nodalume-decisions','Engineering decisions'],
  ['nodalume-operations','Operations & cloud'],['nodalume-future','Future direction'],
];
const implementation = [
  ['Backend & administration','Registration and administration separate public-context validation, transactional access issuance and session-bound tenant authorization. The reviewed service and repository code makes those boundaries explicit.'],
  ['Persistence & tenancy','PostgreSQL stores access, tenant ownership, editor drafts and published revisions. Tenant-qualified predicates and composite foreign keys retain ownership across related records.'],
  ['Access, sessions & accounting','FreeRADIUS runs CHAP, SQL authorization and accounting. The issuer freezes tenant duration into access and RADIUS attributes; administrative termination is recorded as a request, separately from accounting closure.'],
];
const principles = [
  ['Creative flexibility','Separate the experience from rigid templates, so visual ideas can become useful portal interactions.'],
  ['Ownership & autonomy','Self-hosting puts deployment choices in the operator’s hands. It also makes updates, backups and security the operator’s responsibility.'],
  ['Extensibility','The visual editor has typed blocks, contextual properties and a versioned publication path. General visual automation and external API-action builders remain product concepts.'],
];
const influences = [
  { name:'Elementor / Wix', sources:[['Elementor','https://elementor.com/help/add-elements-to-a-page/'],['Wix','https://support.wix.com/en/article/wix-editor-adding-and-deleting-elements']] },
  { name:'Figma', sources:[['Figma','https://help.figma.com/hc/en-us/articles/360039832014-Design-prototype-and-explore-layer-properties-in-the-right-sidebar']] },
  { name:'Scratch / Zoho Flow', sources:[['Scratch','https://resources.scratch.mit.edu/www/guides/en/ScratchLearningResource_MyBlocks.pdf'],['Zoho Flow','https://www.zoho.com/flow/features/build-custom-workflows.html']] },
  { name:'Postman', sources:[['Postman','https://learning.postman.com/docs/getting-started/quick-start/']] },
];
const decisions = [
  ['Compose for a lab, not a scaling guarantee','Docker Compose keeps local service orchestration explicit and repeatable. It is practical for integration work, but does not establish high availability, automated recovery or a cloud deployment.'],
  ['Separate services, keep integration visible','Application logic, persistence and AAA have different responsibilities. Clear boundaries help reason about failures, but introduce configuration, connectivity and consistency work.'],
  ['Treat tenant context as a design constraint','Multitenancy makes ownership and access boundaries important at every application action. Isolation tests and a documented data model are needed before making strong security claims.'],
  ['Design flexibility needs safe execution','A visual builder can broaden creative freedom, while policy and API actions need validation and bounded permissions. The product direction must balance expression with predictable network access.'],
];
function Copy({ children, className }) { return <p className={className}><Text>{children}</Text></p>; }
function Section({ id, title, children, className='' }) {
  return <section id={id} tabIndex={-1} aria-labelledby={`${id}-title`} className={`nodalume-section ${className}`}>
    <div className="container"><h2 id={`${id}-title`}><Text>{title}</Text></h2>{children}</div>
  </section>;
}
function Diagram({ kind }) {
  const { language } = useTranslation();
  const model = nodalumeReadings.find(view=>view.kind===kind);
  return <div className="nodalume-diagram-story">
    <div className="nodalume-figure-heading"><h3>{model[language].title}</h3><span className="nodalume-status">{model[language].status}</span></div>
    <CaseFigure diagramId={model.id} height={560} mobileHeight={730} reading="copy.light-highlights-one-relationship-at-a-time">
      <NodalumeDiagram kind={kind} />
    </CaseFigure>
    <DiagramReading view={model}/>
  </div>;
}
function Content() {
  const { t } = useTranslation();
  return <><Navbar /><main id="main-content" tabIndex={-1} className="nodalume-page">
    <header id="nodalume-overview" tabIndex={-1} className="nodalume-hero container">
      <ActionLink href="/#projects" className="case-back">{t('Back to projects')}</ActionLink>
      <div className="nodalume-hero-composition">
        <div className="nodalume-identity"><Copy className="nodalume-subtitle">Self-hosted captive portal platform</Copy><h1>Nodalume</h1><Copy className="nodalume-statement">A portal. Your possibilities.</Copy></div>
        <NodalumeMark />
        <div className="nodalume-hero-copy"><Copy>copy.connecting-network-access-backend-services-and-the</Copy>
          <div className="nodalume-actions"><ActionLink href="#nodalume-architecture" className="nodalume-primary">{t('Explore the architecture')}</ActionLink><ActionLink href="#nodalume-philosophy">{t('Explore the product thinking')}</ActionLink></div>
        </div>
      </div>
      <div className="nodalume-scope"><span>{t('Current lab implementation')}</span><span>{t('Product design in progress')}</span><span>{t('Future direction')}</span></div>
      <nav className="nodalume-index" aria-label={t('Case study sections')}>{sections.map(([id,label])=><ActionLink key={id} href={`#${id}`}>{t(label)}</ActionLink>)}</nav>
    </header>
    <Section id="nodalume-problem" title="When the platform becomes the constraint.">
      <div className="nodalume-two-columns"><Copy>copy.the-starting-point-is-a-recurring-design</Copy><Copy>copy.nodalume-explores-a-different-boundary-keep-the</Copy></div>
    </Section>
    <Section id="nodalume-philosophy" title="Freedom to create. Responsibility to operate." className="nodalume-philosophy">
      <Copy className="nodalume-lead">copy.a-portal-should-be-a-starting-point</Copy>
      <div className="nodalume-principles">{principles.map(([title,text])=><article key={title}><h3>{t(title)}</h3><Copy>{text}</Copy></article>)}</div>
    </Section>
    <Section id="nodalume-current" title="Implementation with a traceable basis.">
      <span className="nodalume-status">{t('Source reviewed · isolated tests reproduced')}</span>
      <Copy className="nodalume-lead">copy.the-reviewed-source-snapshot-contains-five-compose</Copy>
      <dl className="nodalume-decisions">{implementation.map(([title,text])=><div key={title}><dt>{t(title)}</dt><dd>{t(text)}</dd></div>)}</dl>
      <aside className="nodalume-evidence-note"><h3>{t('Validation boundaries')}</h3><Copy>copy.source-files-were-reviewed-at-a-fixed</Copy></aside><EvidenceLedger />
    </Section>
    <Section id="nodalume-architecture" title="A system of responsibilities." className="nodalume-architecture">
      <Copy className="nodalume-lead">Explore the boundaries that make access possible.</Copy><Copy>copy.the-original-overview-remains-a-map-of</Copy><Diagram kind="platform" /><SystemsExplorer />
    </Section>
    <Section id="nodalume-design" title="References that shape the product.">
      <Copy>copy.these-product-references-inform-specific-choices-in</Copy>
      <ProductDNA references={influences} />
      <h3 className="nodalume-model-intro">{t('How the product model connects.')}</h3><Copy>copy.this-original-product-model-connects-visual-composition</Copy><Diagram kind="builder" />
    </Section>
    <Section id="nodalume-decisions" title="The choices behind the boundaries."><dl className="nodalume-decisions">{decisions.map(([title,text])=><div key={title}><dt>{t(title)}</dt><dd>{t(text)}</dd></div>)}</dl></Section>
    <Section id="nodalume-operations" title="Operate deliberately. Evolve with evidence.">
      <div className="nodalume-two-columns"><article><h3>{t('Today: local service orchestration')}</h3><Copy>copy.compose-declares-healthbased-dependencies-restricted-api-and</Copy></article><article><h3>{t('Future: cloud evaluation')}</h3><Copy>copy.aws-is-an-option-to-investigate-not</Copy></article></div>
      <OperationalEngineering /><Copy>copy.there-is-no-cloud-migration-autoscaling-policy</Copy>
    </Section>
    <Section id="nodalume-future" title="Requirements for the next environment.">
      <Copy>copy.the-next-design-questions-are-deployment-maturity</Copy><FutureRequirements /><Diagram kind="evolution" /><Copy>copy.future-evaluation-sequence-these-are-questions-to</Copy>
    </Section>
    <footer className="nodalume-closing container"><ActionLink href="/#projects">{t('Back to projects')}</ActionLink><ActionLink href="/projects/concurrencia">{t('Explore the SSH case study')}</ActionLink></footer>
  </main></>;
}
export default function Nodalume() { return <MessagesContext value={messages}><Content /></MessagesContext>; }
