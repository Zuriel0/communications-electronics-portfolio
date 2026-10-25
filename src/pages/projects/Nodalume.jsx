import { lazy } from 'react';
import { MessagesContext } from '../../i18n/contexts';
import messages from '../../i18n/locales/nodalume';
import Text from '../../i18n/Text';
import useTranslation from '../../i18n/useTranslation';
import Navbar from '../../components/layout/navbar_project';
import ActionLink from '../../components/ui/ActionLink';
import NodalumeMark from '../../components/ui/NodalumeMark';
import { CaseFigure } from '../../components/ui/CaseStudy';
import { nodalumeDiagrams } from '../../data/nodalume';
import '../../style/nodalume.css';

const NodalumeDiagram = lazy(() => import('../../components/ui/graphics/nodalume_flow.jsx'));
const sections = [
  ['nodalume-problem','Problem'],['nodalume-philosophy','Product philosophy'],
  ['nodalume-current','Current implementation'],['nodalume-architecture','Architecture'],
  ['nodalume-design','Design influences'],['nodalume-decisions','Engineering decisions'],
  ['nodalume-operations','Operations & cloud'],['nodalume-future','Future direction'],
];
const implementation = [
  ['Backend & administration','Node.js services and a React console connect application management with the network access domain. No public API contract or endpoint inventory is claimed here.'],
  ['Persistence & tenancy','PostgreSQL and multitenant application design are reported. Isolation mechanisms, schema details and production-scale tenant guarantees are not established by the available material.'],
  ['Access, sessions & accounting','FreeRADIUS and MikroTik integration support the lab’s access and session work. Accounting records usage; it is a distinct responsibility from deciding access. Packet sequences and session timing are not reconstructed without evidence.'],
];
const principles = [
  ['Creative flexibility','Separate the experience from rigid templates, so visual ideas can become useful portal interactions.'],
  ['Ownership & autonomy','Self-hosting puts deployment choices in the operator’s hands. It also makes updates, backups and security the operator’s responsibility.'],
  ['Extensibility','Treat visual composition, policy logic and integrations as related responsibilities with clear boundaries. The editor’s broader capabilities remain design work.'],
];
const influences = [
  { name:'Elementor / Wix', topic:'Visual composition', text:'Pages assembled from reusable elements suggest a portal builder that gives users control over layout and content. The intended decision is composition over a fixed template.', sources:[['Elementor','https://elementor.com/help/add-elements-to-a-page/'],['Wix','https://support.wix.com/en/article/wix-editor-adding-and-deleting-elements']] },
  { name:'Figma', topic:'Editing context', text:'A clear canvas, selection context and property panels suggest keeping the thing being edited close to its settings. This is an interaction principle, not a reproduction of Figma.', sources:[['Figma','https://help.figma.com/hc/en-us/articles/360039832014-Design-prototype-and-explore-layer-properties-in-the-right-sidebar']] },
  { name:'Scratch / Zoho Flow', topic:'Approachable logic', text:'Blocks and visible decision paths suggest an approachable way to describe policy-driven behavior. A future logic editor would still need validation, branching rules and safe execution boundaries.', sources:[['Scratch','https://resources.scratch.mit.edu/www/guides/en/ScratchLearningResource_MyBlocks.pdf'],['Zoho Flow','https://www.zoho.com/flow/features/build-custom-workflows.html']] },
  { name:'Postman', topic:'Explicit API actions', text:'Requests, inputs and responses suggest treating integrations as explicit actions with inspectable outcomes. Supported providers, secret handling and an execution engine remain to be evidenced or designed.', sources:[['Postman','https://learning.postman.com/docs/getting-started/quick-start/']] },
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
  const { t } = useTranslation();
  const model = nodalumeDiagrams[kind];
  return <div className="nodalume-diagram-story">
    <div className="nodalume-figure-heading"><h3>{t(model.title)}</h3><span className="nodalume-status">{t(model.status)}</span></div>
    <CaseFigure diagramId={model.id} height={560} mobileHeight={730} reading="Light highlights one relationship at a time. It is a reading aid, not live telemetry or a runtime simulation. All relationships remain readable when paused.">
      <NodalumeDiagram kind={kind} />
    </CaseFigure>
    <details className="nodalume-text-model"><summary>{t('Text version of this diagram')}</summary><ul>
      {model.edges.map(edge => <li key={edge.id}>{t(model.nodes.find(node=>node.id===edge.source).label)} — {t(edge.label)} — {t(model.nodes.find(node=>node.id===edge.target).label)}</li>)}
    </ul></details>
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
        <div className="nodalume-hero-copy"><Copy>Connecting network access, backend services and the freedom to design the experience. A personal platform project developed in a lab environment.</Copy>
          <div className="nodalume-actions"><ActionLink href="#nodalume-architecture" className="nodalume-primary">{t('Explore the architecture')}</ActionLink><ActionLink href="#nodalume-philosophy">{t('Explore the product thinking')}</ActionLink></div>
        </div>
      </div>
      <div className="nodalume-scope"><span>{t('Current lab implementation')}</span><span>{t('Product design in progress')}</span><span>{t('Future direction')}</span></div>
      <nav className="nodalume-index" aria-label={t('Case study sections')}>{sections.map(([id,label])=><ActionLink key={id} href={`#${id}`}>{t(label)}</ActionLink>)}</nav>
    </header>
    <Section id="nodalume-problem" title="When the platform becomes the constraint.">
      <div className="nodalume-two-columns"><Copy>The starting point is a recurring design constraint: a captive portal can provide network access while leaving little room to shape the experience. Changes may depend on provider intervention, predefined layouts or a narrow set of integrations.</Copy><Copy>Nodalume explores a different boundary: keep the access and session responsibilities explicit, while giving the portal experience more room to evolve. This is the project’s motivation, not a claim about every commercial platform.</Copy></div>
    </Section>
    <Section id="nodalume-philosophy" title="Freedom to create. Responsibility to operate." className="nodalume-philosophy">
      <Copy className="nodalume-lead">A portal should be a starting point for an idea, not the limit of that idea. Nodalume’s product goal is to let users shape experiences, own their deployment and extend the platform without depending on a provider for every change.</Copy>
      <div className="nodalume-principles">{principles.map(([title,text])=><article key={title}><h3>{t(title)}</h3><Copy>{text}</Copy></article>)}</div>
    </Section>
    <Section id="nodalume-current" title="What exists today. What still needs evidence.">
      <span className="nodalume-status">{t('Implemented · owner-reported lab')}</span>
      <Copy className="nodalume-lead">The owner reports a self-hosted lab using Node.js backend services, a React administration console, PostgreSQL, FreeRADIUS and MikroTik integration, with Docker Compose for local service orchestration. Session control, RADIUS accounting and multitenant design are part of that reported scope.</Copy>
      <dl className="nodalume-decisions">{implementation.map(([title,text])=><div key={title}><dt>{t(title)}</dt><dd>{t(text)}</dd></div>)}</dl>
      <aside className="nodalume-evidence-note"><h3>{t('Validated in this case study')}</h3><Copy>The portfolio route, bilingual content and illustrative diagrams are tested here. The Nodalume runtime and infrastructure were not independently inspected in this phase; no customer deployment, throughput or uptime result is asserted.</Copy></aside>
    </Section>
    <Section id="nodalume-architecture" title="A system of responsibilities." className="nodalume-architecture">
      <Copy className="nodalume-lead">Read the relationships, not a packet capture.</Copy><Copy>The map connects the components in the owner-reported scope. It shows conceptual integration boundaries, not container placement, protocol direction, database tables or measured traffic. MikroTik is a network integration, not a container in the Compose stack.</Copy><Diagram kind="platform" />
    </Section>
    <Section id="nodalume-design" title="References that shape the product.">
      <Copy>These are design influences, not affiliations, endorsements or copied interfaces. They inform a direction for Nodalume; they do not prove that a comparable editor or automation engine is already implemented.</Copy>
      <div className="nodalume-influences">{influences.map(item=><article key={item.name}><div><h3>{t(item.name)}</h3><Copy>{item.topic}</Copy></div><div><Copy>{item.text}</Copy><div className="nodalume-sources">{item.sources.map(([name,href])=><ActionLink key={name} href={href}>{t('Reference documentation')}: {name}</ActionLink>)}</div></div></article>)}</div>
      <h3 className="nodalume-model-intro">{t('A composition model, not an editor screenshot.')}</h3><Copy>This proposed model separates pages, reusable blocks, policy logic and API actions. The connecting lines express a product concept. They do not assert a stored schema, working drag-and-drop editor or implemented automation engine.</Copy><Diagram kind="builder" />
    </Section>
    <Section id="nodalume-decisions" title="The choices behind the boundaries."><dl className="nodalume-decisions">{decisions.map(([title,text])=><div key={title}><dt>{t(title)}</dt><dd>{t(text)}</dd></div>)}</dl></Section>
    <Section id="nodalume-operations" title="Operate deliberately. Evolve with evidence.">
      <div className="nodalume-two-columns"><article><h3>{t('Today: local service orchestration')}</h3><Copy>The current lab provides a place to integrate services and examine session behavior. Reproducible setup, documented service boundaries and configuration discipline are foundations to strengthen, not proof of an established production operations practice.</Copy></article><article><h3>{t('Future: cloud evaluation')}</h3><Copy>AWS is an option to investigate, not a deployed environment for Nodalume. Container compute such as Amazon ECS with AWS Fargate and managed PostgreSQL are possible evaluation candidates. Suitability depends on state, connectivity, RADIUS transport, secrets, backups, observability and cost.</Copy></article></div>
      <Copy>There is no cloud migration, autoscaling policy, availability target or production benchmark claimed in this case study. These questions connect application work with infrastructure thinking without relabeling the project as a completed DevOps practice.</Copy>
    </Section>
    <Section id="nodalume-future" title="A direction to test, not a delivery promise.">
      <Copy>The next design questions are deployment maturity, state separation, tenant isolation, operational visibility and broader integrations. A dedicated product experience at nodalume.anxzu.com is a later possibility; no product microsite or launch date is part of this phase.</Copy><Diagram kind="evolution" /><Copy>Future evaluation sequence. These are questions to resolve, not an implemented cloud topology. No infrastructure resources are provisioned by this case study.</Copy>
    </Section>
    <footer className="nodalume-closing container"><ActionLink href="/#projects">{t('Back to projects')}</ActionLink><ActionLink href="/projects/concurrencia">{t('Explore the SSH case study')}</ActionLink></footer>
  </main></>;
}
export default function Nodalume() { return <MessagesContext value={messages}><Content /></MessagesContext>; }
