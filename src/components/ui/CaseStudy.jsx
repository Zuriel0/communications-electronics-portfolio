import Text from "../../i18n/Text.jsx";
import useTranslation from "../../i18n/useTranslation.js";
import ActionLink from './ActionLink.jsx';
import '../../style/case-study.css';

export function CaseIntro({ id = 'introduce', alias, title, summary, contribution, facts, links }) {
  const { t } = useTranslation();
  return (
    <header className="case-intro" id={id} tabIndex={-1}>
      <div className="container">
        <ActionLink href="/#projects" className="case-back"><Text>{"Back to projects"}</Text></ActionLink>
        <div id={alias} tabIndex={alias ? -1 : undefined} role={alias ? 'group' : undefined} aria-labelledby={alias ? 'case-title' : undefined}>
          <h1 id="case-title"><Text>{title}</Text></h1>
          <div className="case-brief">
            <div className="case-intro-copy">
              <p className="case-lead"><Text>{summary}</Text></p>
              <p className="case-contribution"><Text>{contribution}</Text></p>
            </div>
            <dl className="case-facts"><Text>{facts.map(([label, value]) => <div key={label}><dt><Text>{label}</Text></dt><dd><Text>{value}</Text></dd></div>)}</Text></dl>
          </div>
        </div>
        <nav className="case-index" aria-label={t("Case study sections")}>
          <Text>{links.map(([href, label]) => <ActionLink href={href} key={href}><Text>{label}</Text></ActionLink>)}</Text>
        </nav>
      </div>
    </header>
  );
}

export function CaseSection({ id, title, children, className = '' }) {
  return (
    <section id={id} tabIndex={-1} className={`case-section ${className}`} aria-labelledby={`${id}-title`}>
      <div className="container">
        <h2 id={`${id}-title`}><Text>{title}</Text></h2>
        <Text>{children}</Text>
      </div>
    </section>
  );
}

export function CaseFigure({ children, reading }) {
  return (
    <div className="case-figure">
      <div ><Text>{children}</Text></div>
      <p className="case-figure-reading"><Text>{reading}</Text></p>
    </div>
  );
}

export function CaseDecisions({ items }) {
  return <dl className="case-decisions"><Text>{items.map(([title, text]) => <div key={title}><dt><Text>{title}</Text></dt><dd><Text>{text}</Text></dd></div>)}</Text></dl>;
}

export function CaseClosing({ href, title }) {
  return (
    <footer className="case-closing container">
      <ActionLink href="/#projects"><Text>{"Back to projects"}</Text></ActionLink>
      <ActionLink href={href}><Text>{"Explore"}</Text>{' '}<Text>{title}</Text><span aria-hidden="true"><Text>{"↗"}</Text></span></ActionLink>
    </footer>
  );
}
