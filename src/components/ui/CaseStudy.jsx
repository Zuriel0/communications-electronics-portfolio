import { Component, Suspense, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { isDiagramDestination } from '../../utils/diagramLoading.js';
import Button from './button.jsx';
import { FiPause } from 'react-icons/fi';
import '../../style/engineering-flows.css';
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

// The editorial route commits without waiting for the graph runtime or its CSS.
// Keep the public target on the pending frame so deep navigation can wait for
// the actual diagram, rather than focusing a placeholder that is about to unmount.
export function DiagramLoadState({ id, error = false }) {
  return <div className="diagram-load-state">
    <div className="diagram-motion-controls" aria-hidden="true">
      <span className="diagram-motion-note"><Text>{"Illustrative flow"}</Text></span>
      <Button disabled className="diagram-motion-button"><FiPause size={16} aria-hidden="true" />
        <Text>{id === 'diagram-loadbalance' ? 'Pause simulation' : 'Pause connections'}</Text>
      </Button>
    </div>
    <div id={id} tabIndex={-1} className="diagram-load-frame"
      data-route-pending={error ? undefined : 'true'} data-route-error={error ? 'true' : undefined}>
      <p role={error ? 'alert' : 'status'}><Text>{error ? 'Unable to load this diagram.' : 'Loading interactive diagram…'}</Text></p>
      {error && <><p><Text>{"Check your connection and reload to try again. The case study remains available."}</Text></p>
        <Button onClick={() => window.location.reload()}><Text>{"Reload diagram"}</Text></Button></>}
    </div>
  </div>;
}

class DiagramBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    return this.state.failed ? <DiagramLoadState id={this.props.id} error /> : this.props.children;
  }
}

export function CaseFigure({ children, reading, diagramId, height, mobileHeight }) {
  const slot = useRef(null);
  const { hash } = useLocation();
  const [nearViewport, setNearViewport] = useState(() => isDiagramDestination(hash, diagramId));
  // A direct diagram link must load even before the router can scroll to it.
  const shouldLoad = nearViewport || isDiagramDestination(hash, diagramId);
  useEffect(() => {
    if (nearViewport) return;
    if (!('IntersectionObserver' in window)) {
      // Progressive fallback: an older browser still gets every diagram.
      const frame = requestAnimationFrame(() => setNearViewport(true));
      return () => cancelAnimationFrame(frame);
    }
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        setNearViewport(true);
        observer.disconnect();
      }
    }, { rootMargin: '400px 0px' });
    observer.observe(slot.current);
    return () => observer.disconnect();
  }, [nearViewport]);
  return (
    <div className="case-figure">
      <div ref={slot} className="diagram-slot" style={{ '--diagram-height': `${height}px`, '--diagram-mobile-height': `${mobileHeight}px` }}>
        <DiagramBoundary id={diagramId}>
          {shouldLoad ? <Suspense fallback={<DiagramLoadState id={diagramId} />}>{children}</Suspense> : <DiagramLoadState id={diagramId} />}
        </DiagramBoundary>
      </div>
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
