import { lazy } from 'react';
import Text from "../../i18n/Text.jsx";
import useTranslation from "../../i18n/useTranslation.js";
const LoadBalancerTraceabilityDiagram = lazy(() => import('../ui/graphics/flow_loadbalance'));
const BusinessFlowDiagram = lazy(() => import('../ui/graphics/bussiness_flow'));
const LogicFlow = lazy(() => import('../ui/graphics/logic_flow'));
const HighLevelArchitecture = lazy(() => import('../ui/graphics/highlevel_flow'));
import { CaseIntro, CaseSection, CaseFigure, CaseDecisions, CaseClosing } from '../ui/CaseStudy.jsx';

export default function Introduce() {
  const { t } = useTranslation();
  return (
    <article className="case-study" aria-labelledby="case-title">
      <CaseIntro
        title={t("Concurrent log monitor via SSH.")}
        summary="One MAC address. Multiple possible destinations. A command-line tool that brings remote log searches into a single operational view."
        contribution="I developed the monitoring tool to search across web and authentication logs from Ubuntu. This case study describes the design and workflow from my project account."
        facts={[
          ['Environment', 'Ubuntu, Bash and SSH'],
          ['Monitoring scope', 'Six web servers; one active RADIUS server'],
          ['RADIUS selection', 'Two available servers, one selected per run'],
          ['Project status', 'Completed'],
        ]}
        links={[
          ['#problema', 'Challenge'], ['#solucion', 'Architecture'], ['#flowSystem', 'Workflow'],
          ['#decisions', 'Decisions'], ['#outcome', 'Outcome'],
        ]}
      />
      <CaseSection id="problema" title={t("Finding a request without knowing its destination.")}>
        <div className="case-split">
          <p><Text>{"A load balancer decides which web server handles an incoming request. When investigating a specific MAC address, the operator cannot know in advance which server holds the relevant event. Checking each machine separately divides the investigation across multiple log sources."}</Text></p>
          <aside className="case-aside"><h3><Text>{"The engineering challenge"}</Text></h3><p><Text>{"Observe every possible web destination while retaining visibility into authentication. A web match should identify the source without ending RADIUS supervision."}</Text></p></aside>
        </div>
        <CaseFigure diagramId="diagram-loadbalance" height={760} mobileHeight={550} reading="Read this as destination uncertainty: one request reaches one selected web server. The three drawn destinations are representative; the monitoring scope in this project is six web servers. The animation illustrates routing, not live traffic.">
          <LoadBalancerTraceabilityDiagram />
        </CaseFigure>
        <div className="case-diagram-context">
          <h3><Text>{"Business order and monitoring order are different."}</Text></h3>
          <p><Text>{"The documented business flow moves from a successful web operation to RADIUS authentication. Observation spans both domains concurrently, through independent Web and RADIUS monitoring groups. Starting both observers does not make the business transaction itself parallel."}</Text></p>
        </div>
        <CaseFigure diagramId="diagram-business" height={660} mobileHeight={550} reading="The solid business path is conditional: authentication follows successful web processing. The separate observation branches explain why RADIUS monitoring can remain active while Web monitoring changes.">
          <BusinessFlowDiagram />
        </CaseFigure>
      </CaseSection>
      <CaseSection id="solucion" title={t("Local orchestration. Distributed observation.")}>
        <div className="case-prose"><p><Text>{"The tool runs in an Ubuntu terminal. Bash coordinates the documented workflow, SSH provides remote access, and external configuration defines the targets, connection parameters and optional Web policy. Matches return to a central console with their source identity."}</Text></p></div>
        <ul className="case-requirements">
          <li><strong><Text>{"Input:"}</Text></strong>{' '}<Text>{"validate and normalize the MAC address before preparing the search."}</Text></li>
          <li><strong><Text>{"Coverage:"}</Text></strong>{' '}<Text>{"monitor six web servers concurrently and one configured RADIUS server from two available targets."}</Text></li>
          <li><strong><Text>{"Independence:"}</Text></strong>{' '}<Text>{"keep the Web and RADIUS observation groups separate."}</Text></li>
          <li><strong><Text>{"Output:"}</Text></strong>{' '}<Text>{"retain server origin, source type and the matching log line in one console."}</Text></li>
        </ul>
        <div id="highLevel" tabIndex={-1} role="group" aria-labelledby="architecture-detail-title" className="case-diagram-context">
          <h3 id="architecture-detail-title"><Text>{"The boundary between the tool and its environment."}</Text></h3>
          <p><Text>{"The local side contains the operator, configuration, orchestrator and console. The remote side contains the SSH connections and log sources being observed. The monitored service infrastructure is the project’s operating context."}</Text></p>
          <CaseFigure diagramId="diagram-highlevel" height={820} mobileHeight={550} reading="Follow the local orchestrator to the two remote observation groups, then back to the console. The log paths are labels from the documented architecture; they do not independently establish a deployed product, version or administration responsibility."><HighLevelArchitecture /></CaseFigure>
        </div>
      </CaseSection>
      <CaseSection id="flowSystem" title={t("From a MAC address to a traceable match.")}>
        <div className="case-split">
          <ol className="case-steps">
            <li><h3><Text>{"Prepare the search"}</Text></h3><p><Text>{"Receive, validate and normalize the MAC. Load the server inventory, active RADIUS target, connection parameters and Web policy."}</Text></p></li>
            <li><h3><Text>{"Observe the remote sources"}</Text></h3><p><Text>{"Prepare the search patterns and initiate concurrent SSH-based log monitoring across the Web group and selected RADIUS target."}</Text></p></li>
            <li><h3><Text>{"Keep the source attached"}</Text></h3><p><Text>{"Bring matching lines into the console with the server identity and source type, so centralization preserves their origin."}</Text></p></li>
            <li><h3><Text>{"Apply the optional Web policy"}</Text></h3><p><Text>{"Keep monitoring the web server that matched and stop the other web searches when this policy is enabled. RADIUS monitoring continues independently."}</Text></p></li>
          </ol>
          <aside className="case-aside"><h3><Text>{"A policy for searches"}</Text></h3><p><Text>{"Narrowing the Web group concerns monitoring sessions, not shutting down web servers. It does not change the authentication service or imply automatic RADIUS failover."}</Text></p><p><Text>{"Input and configuration precede observation. Concurrency describes remote monitoring, rather than every operation in the tool."}</Text></p></aside>
        </div>
        <CaseFigure diagramId="diagram-logic" height={690} mobileHeight={550} reading="The two SSH branches represent independent observation. Their matches converge on a shared output. The optional Web policy is a reference rule, not an extra data-transfer path; the illustrative animation is not an execution log."><LogicFlow /></CaseFigure>
      </CaseSection>
      <CaseSection id="decisions" title={t("Decisions that preserve visibility.")}>
        <CaseDecisions items={[
          ['Search the possible destinations', 'Concurrent Web observation addresses the uncertainty of load balancing. The operator does not need to choose the correct web server before starting the search.'],
          ['Keep observation domains independent', 'A match can narrow Web monitoring without removing the authentication view. The optional policy has a defined boundary: other Web searches, not RADIUS.'],
          ['Make the active target configurable', 'The documented design selects one RADIUS server for each run. Two available targets support a configurable choice; this is not a claim of automatic failover.'],
          ['Centralize without losing origin', 'A single console gathers the matches while retaining the server and source type. Consolidation remains useful because an event can still be traced to its source.'],
        ]} />
      </CaseSection>
      <CaseSection id="implementation" title={t("Implementation scope.")}>
        <div className="case-split">
          <div className="case-prose"><p><Text>{"The project account describes a Bash tool on Ubuntu, with remote log observation over SSH and externally defined server selection and policy. My contribution described here is the monitoring tool."}</Text></p><p><Text>{"The diagrams explain that design. They are presentation artifacts, rather than executable scripts or records of a test run."}</Text></p></div>
          <aside className="case-aside"><h3><Text>{"Technology in context"}</Text></h3><p><Text>{"Bash provides automation; Ubuntu is the local execution environment; SSH connects the local tool to remote sources. RADIUS identifies the authentication domain. React Flow powers this case study’s diagrams, rather than the command-line monitor."}</Text></p></aside>
        </div>
      </CaseSection>
      <CaseSection id="outcome" title={t("One operational view, with the source intact.")} className="case-outcome">
        <div className="case-prose"><p><Text>{"The reported outcome is a centralized search workflow in place of separate manual server checks: MAC-related matches, their source servers and the Web/RADIUS context can be reviewed together."}</Text></p><p><Text>{"This is a qualitative outcome from my project account, rather than a timed diagnostic benchmark or a measured reliability claim."}</Text></p></div>
        <div className="case-split">
          <div><h3><Text>{"Skills demonstrated in the project"}</Text></h3><p className="case-note"><Text>{"Shell automation, remote observation over SSH, MAC-oriented troubleshooting, monitoring policy design and technical architecture communication."}</Text></p></div>
          <div><h3><Text>{"Design takeaway"}</Text></h3><p className="case-note"><Text>{"Business sequence, concurrent observation and independent supervision describe different responsibilities. Making those boundaries explicit is central to reading this architecture correctly."}</Text></p></div>
        </div>
      </CaseSection>
      <CaseClosing href="/projects/metodologia" title={t("the customization methodology")} />
    </article>
  );
}
