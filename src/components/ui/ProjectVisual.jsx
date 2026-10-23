const steps = ['Analysis', 'Constraints', 'Technical context', 'AI generation', 'Manual validation', 'Integration'];

export default function ProjectVisual({ projectId }) {
  if (projectId === 1) {
    return (
      <figure className="project-visual project-visual--monitor" aria-label="Simplified monitoring flow: Ubuntu connects via SSH to six web servers and one active RADIUS server, returning a centralized output.">
        <div className="monitor-map">
          <svg className="monitor-lines monitor-lines--desktop" viewBox="0 0 1000 700" preserveAspectRatio="none" fill="none" aria-hidden="true" focusable="false">
            <path d="M160 350H270Q300 350 330 320L440 210H500M160 350H270Q300 350 330 380L440 490H500M500 210H590L700 320Q730 350 760 350H840M500 490H590L700 380Q730 350 760 350H840" />
          </svg>
          <svg className="monitor-lines monitor-lines--mobile" viewBox="0 0 1000 700" preserveAspectRatio="none" fill="none" aria-hidden="true" focusable="false">
            <path d="M500 80V155L280 240V294M500 80V155L750 240V294M280 294V450L500 535V595M750 294V450L500 535V595" />
          </svg>
          <div className="monitor-endpoint monitor-origin"><span>Ubuntu</span><small>SSH</small></div>
          <div className="monitor-web"><p>Web ×6</p><div className="monitor-servers" aria-hidden="true">{Array.from({ length: 6 }, (_, i) => <span key={i}><i /><i /></span>)}</div></div>
          <div className="monitor-radius"><span className="monitor-radius-dot" aria-hidden="true" /><p>RADIUS ×1</p><small>Active server</small></div>
          <div className="monitor-endpoint monitor-output">Centralized output</div>
        </div>
        <figcaption>Parallel monitoring. One consolidated view.</figcaption>
      </figure>
    );
  }

  return (
    <figure className="project-visual project-visual--method" aria-label="Methodology: analysis, constraints, technical context, AI-assisted generation, manual validation and integration.">
      <ol className="method-steps">
        {steps.map((step, index) => <li key={step}><svg viewBox="0 0 40 40" fill="none" aria-hidden="true" focusable="false"><rect x="6" y="6" width="28" height="28" rx="6" /><path d={index === 5 ? 'M12 20L18 26L28 14' : 'M13 15H27M13 20H23M13 25H20'} /></svg><span>{step}</span></li>)}
      </ol>
      <figcaption>From technical context to a validated solution.</figcaption>
    </figure>
  );
}
