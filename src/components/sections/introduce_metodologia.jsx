import Text from "../../i18n/Text.jsx";
import useTranslation from "../../i18n/useTranslation.js";
import ProblemFlow from '../ui/graphics/metodologia_problem_flow.jsx';
import SolutionFlow from '../ui/graphics/metodologia_solution_flow.jsx';
import { CaseIntro, CaseSection, CaseFigure, CaseDecisions, CaseClosing } from '../ui/CaseStudy.jsx';

const stages = [
  ['Analysis', 'Study the native page to understand its structure, behavior and possible intervention points.'],
  ['Constraints', 'Identify visual and technical patterns, dependencies and integration limits that the customization must respect.'],
  ['Technical Context', 'Organize those patterns and restrictions into documented context that can guide a solution and support reuse.'],
  ['AI-Assisted Generation', 'Use that context to generate an initial implementation proposal with AI assistance. The proposal remains subject to human review.'],
  ['Manual Validation', 'Refine the proposal and manually validate the result against the native page and its constraints.'],
  ['Integration', 'Prepare the reviewed customization for incorporation while preserving the original base and behavior.'],
];

export default function IntroduceMetodologia() {
  const { t } = useTranslation();
  return (
    <article className="case-study" aria-labelledby="case-title">
      <CaseIntro
        id="metodologia" alias="introduce"
        title={t("AI-assisted customization methodology.")}
        summary="Customize the experience while preserving the base. A six-stage method for working with platforms whose original source code cannot be modified."
        contribution="I designed the methodology around native-interface analysis, reusable technical context and human validation. This case study presents the process and outcomes from my project account."
        facts={[
          ['Core constraint', 'Original source code remains unchanged'],
          ['Approach', 'External customization, guided by technical context'],
          ['AI’s role', 'Assists generation; human review precedes integration'],
          ['Project status', 'Completed'],
        ]}
        links={[
          ['#problema', 'Challenge'], ['#solucion', 'Process'], ['#decisions', 'Decisions'], ['#outcome', 'Reported outcome'],
        ]}
      />
      <CaseSection id="problema" title={t("A fixed foundation. A different experience.")}>
        <div className="case-split">
          <p><Text>{"The original platform’s source code could not be changed directly. Customization had to work through an external intervention while respecting the existing hierarchy, dependencies and behavior of the native interface."}</Text></p>
          <aside className="case-aside"><h3><Text>{"The repeated work"}</Text></h3><p><Text>{"Each new customization involved manual analysis, adaptation and repeated checks. The existing account describes a process that depended heavily on technical memory and made knowledge difficult to reuse."}</Text></p></aside>
        </div>
        <div className="case-diagram-context"><h3><Text>{"The restriction shapes the method."}</Text></h3><p><Text>{"The first diagram shows why understanding the existing page comes before proposing a change. It carries the same six-stage sequence as the solution: a constrained starting point leads to analysis, contextual generation, manual review and an integration-ready customization."}</Text></p></div>
        <CaseFigure reading="This is the constraint-led view of the method, not a separate algorithm. The endpoint is a customization ready to integrate; the illustration does not establish a production deployment."><ProblemFlow /></CaseFigure>
      </CaseSection>
      <CaseSection id="solucion" title={t("Six stages. One deliberate sequence.")}>
        <div className="case-prose"><p><Text>{"The method turns repeated analysis into explicit technical context. AI contributes an initial proposal within that context. Human refinement and validation remain between generation and integration."}</Text></p></div>
        <div className="case-process">
          <ol className="case-steps"><Text>{stages.map(([title, description]) => <li key={title}><h3><Text>{title}</Text></h3><p><Text>{description}</Text></p></li>)}</Text></ol>
          <CaseFigure reading="The solution view refines the same sequence from native-page analysis to a reviewed, integration-ready change. Generation is one stage; it does not replace constraint analysis or manual validation."><SolutionFlow /></CaseFigure>
        </div>
      </CaseSection>
      <CaseSection id="decisions" title={t("The context is part of the engineering.")}>
        <CaseDecisions items={[
          ['Understand before generating', 'The native page and its restrictions establish the boundaries of the change. Documenting that context gives the AI-assisted proposal a specific system to work within.'],
          ['Reuse knowledge, not just output', 'The account describes reusable patterns and technical documentation as a response to repeated analysis. The method makes that knowledge available beyond a single customization.'],
          ['Keep review in the sequence', 'The generated proposal is refined and validated manually before integration. AI assists implementation; responsibility for reviewing the change remains human.'],
        ]} />
      </CaseSection>
      <CaseSection id="implementation" title={t("An external layer, with a defined boundary.")}>
        <div className="case-split">
          <div className="case-prose"><p><Text>{"The documented approach combines external code intervention, native-interface analysis, contextual documentation and assisted generation. It preserves the original source rather than replacing the platform’s base implementation."}</Text></p><p><Text>{"Manual adjustment and validation are part of the method. The diagrams describe this workflow; they are not records of an executed validation suite."}</Text></p></div>
          <aside className="case-aside"><h3><Text>{"Contribution and scope"}</Text></h3><p><Text>{"My contribution described here is the methodology design. The case focuses on the engineering process without assigning it to a particular client, platform, programming language or AI provider."}</Text></p></aside>
        </div>
      </CaseSection>
      <CaseSection id="outcome" title={t("A reported change in the work required.")} className="case-outcome">
        <div className="case-prose"><p><Text>{"The existing project account reports less time per customization after adopting the methodology. The comparison is self-reported and is not a controlled benchmark."}</Text></p></div>
        <div className="case-split">
          <dl className="case-comparison"><div><dt><Text>{"Previous process"}</Text></dt><dd><Text>{"8–14 hours / project"}</Text></dd></div><div><dt><Text>{"With the methodology"}</Text></dt><dd><Text>{"1–2 hours / project"}</Text></dd></div></dl>
          <div><h3><Text>{"Read the figures in context"}</Text></h3><p className="case-note"><Text>{"These ranges describe the owner-reported experience. They do not establish a verified percentage saving, comparable task complexity or a guaranteed result for another project."}</Text></p></div>
        </div>
        <p className="case-note"><Text>{"The documented process outcome is a repeatable path from native-interface analysis to a manually reviewed customization ready for integration."}</Text></p>
      </CaseSection>
      <CaseSection id="takeaways" title={t("Generation is one part of the process.")}>
        <div className="case-split">
          <div><h3><Text>{"Skills demonstrated in the project"}</Text></h3><p className="case-note"><Text>{"Constraint analysis, native-interface analysis, technical documentation, AI-assisted generation, human review and integration planning."}</Text></p></div>
          <div><h3><Text>{"Design takeaway"}</Text></h3><p className="case-note"><Text>{"The six stages keep understanding the system and reviewing the change visible as engineering work. A generated proposal is an input to that process, rather than its conclusion."}</Text></p></div>
        </div>
      </CaseSection>
      <CaseClosing href="/projects/concurrencia" title={t("the concurrent log monitor")} />
    </article>
  );
}
