import Text from "../../i18n/Text.jsx";
import useTranslation from "../../i18n/useTranslation.js";
import NodalumeMark from './NodalumeMark';
const steps = ['Analysis', 'Constraints', 'Technical context', 'AI generation', 'Manual validation', 'Integration'];

export default function ProjectVisual({ projectId }) {
  const { t } = useTranslation();
  if (projectId === 3) return <figure className="project-visual project-visual--nodalume" aria-label={t('Portal, services and network access: conceptual relationships in the Nodalume lab.')}><NodalumeMark /><figcaption>{t('A platform of connected responsibilities.')}</figcaption></figure>;
  if (projectId === 1) {
    return (
      <figure className="project-visual project-visual--monitor" aria-label={t("Simplified monitoring flow: Ubuntu connects via SSH to six web servers and one active RADIUS server, returning a centralized output.")}>
        <div className="monitor-map">
          <svg className="monitor-lines monitor-lines--desktop" viewBox="0 0 1000 700" preserveAspectRatio="none" fill="none" aria-hidden="true" focusable="false">
            <path d="M160 350H270Q300 350 330 320L440 210H500M160 350H270Q300 350 330 380L440 490H500M500 210H590L700 320Q730 350 760 350H840M500 490H590L700 380Q730 350 760 350H840" />
          </svg>
          <svg className="monitor-lines monitor-lines--mobile" viewBox="0 0 1000 700" preserveAspectRatio="none" fill="none" aria-hidden="true" focusable="false">
            <path d="M500 80V155L280 240V294M500 80V155L750 240V294M280 294V450L500 535V595M750 294V450L500 535V595" />
          </svg>
          <div className="monitor-endpoint monitor-origin"><span><Text>{"Ubuntu"}</Text></span><small><Text>{"SSH"}</Text></small></div>
          <div className="monitor-web"><p><Text>{"Web ×6"}</Text></p><div className="monitor-servers" aria-hidden="true"><Text>{Array.from({ length: 6 }, (_, i) => <span key={i}><i /><i /></span>)}</Text></div></div>
          <div className="monitor-radius"><span className="monitor-radius-dot" aria-hidden="true" /><p><Text>{"RADIUS ×1"}</Text></p><small><Text>{"Active server"}</Text></small></div>
          <div className="monitor-endpoint monitor-output"><Text>{"Centralized output"}</Text></div>
        </div>
        <figcaption><Text>{"Parallel monitoring. One consolidated view."}</Text></figcaption>
      </figure>
    );
  }

  return (
    <figure className="project-visual project-visual--method" aria-label={t("Methodology: analysis, constraints, technical context, AI-assisted generation, manual validation and integration.")}>
      <ol className="method-steps">
        <Text>{steps.map((step, index) => <li key={step}><svg viewBox="0 0 40 40" fill="none" aria-hidden="true" focusable="false"><rect x="6" y="6" width="28" height="28" rx="6" /><path d={index === 5 ? 'M12 20L18 26L28 14' : 'M13 15H27M13 20H23M13 25H20'} /></svg><span><Text>{step}</Text></span></li>)}</Text>
      </ol>
      <figcaption><Text>{"From technical context to a validated solution."}</Text></figcaption>
    </figure>
  );
}
