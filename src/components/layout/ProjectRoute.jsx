import { Component, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import ProjectNavbar from './navbar_project';
import Container from '../ui/Container';
import ActionLink from '../ui/ActionLink';
import Button from '../ui/button';
import { projects } from '../../data/projects';
import '../../style/project-route.css';

function ProjectRouteState({ error = false }) {
  const { pathname } = useLocation();
  const project = projects.find(item => item.link === pathname.replace(/\/+$/, ''));
  return (
    <>
      <ProjectNavbar />
      <main id="main-content" tabIndex={-1} lang="en" className="project-route-state" data-route-pending={error ? undefined : 'true'} data-route-error={error ? 'true' : undefined}>
        <Container narrow>
          <p className="project-route-status" role={error ? 'alert' : 'status'}>{error ? 'Unable to load this project.' : 'Loading project…'}</p>
          <h1>{project?.title || 'Project'}</h1>
          <p>{error ? 'Check your connection and reload this page, or return to the projects.' : 'The case study and its interactive diagrams are opening.'}</p>
          {error && <div className="project-route-actions"><Button onClick={() => window.location.reload()}>Reload project</Button><ActionLink href="/#projects">Back to projects</ActionLink></div>}
        </Container>
      </main>
    </>
  );
}

class ProjectErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    return this.state.hasError ? <ProjectRouteState error /> : this.props.children;
  }
}

export default function ProjectRoute({ children }) {
  const { pathname } = useLocation();
  return <ProjectErrorBoundary key={pathname}><Suspense fallback={<ProjectRouteState />}>{children}</Suspense></ProjectErrorBoundary>;
}
