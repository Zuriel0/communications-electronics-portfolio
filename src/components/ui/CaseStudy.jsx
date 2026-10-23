import ActionLink from './ActionLink.jsx';
import '../../style/case-study.css';

export function CaseIntro({ id = 'introduce', alias, title, summary, contribution, facts, links }) {
  return (
    <header className="case-intro" id={id} tabIndex={-1}>
      <div className="container">
        <ActionLink href="/#projects" className="case-back">Back to projects</ActionLink>
        <div id={alias} tabIndex={alias ? -1 : undefined} role={alias ? 'group' : undefined} aria-labelledby={alias ? 'case-title' : undefined}>
          <h1 id="case-title">{title}</h1>
          <div className="case-brief">
            <div className="case-intro-copy">
              <p className="case-lead">{summary}</p>
              <p className="case-contribution">{contribution}</p>
            </div>
            <dl className="case-facts">{facts.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
          </div>
        </div>
        <nav className="case-index" aria-label="Case study sections">
          {links.map(([href, label]) => <ActionLink href={href} key={href}>{label}</ActionLink>)}
        </nav>
      </div>
    </header>
  );
}

export function CaseSection({ id, title, children, className = '' }) {
  return (
    <section id={id} tabIndex={-1} className={`case-section ${className}`} aria-labelledby={`${id}-title`}>
      <div className="container">
        <h2 id={`${id}-title`}>{title}</h2>
        {children}
      </div>
    </section>
  );
}

export function CaseFigure({ children, reading }) {
  return (
    <div className="case-figure">
      <div lang="es">{children}</div>
      <p className="case-figure-reading">{reading}</p>
    </div>
  );
}

export function CaseDecisions({ items }) {
  return <dl className="case-decisions">{items.map(([title, text]) => <div key={title}><dt>{title}</dt><dd>{text}</dd></div>)}</dl>;
}

export function CaseClosing({ href, title }) {
  return (
    <footer className="case-closing container">
      <ActionLink href="/#projects">Back to projects</ActionLink>
      <ActionLink href={href}>Explore {title}<span aria-hidden="true">↗</span></ActionLink>
    </footer>
  );
}
