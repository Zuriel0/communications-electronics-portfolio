import Text from "../../i18n/Text.jsx";
import { Component, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import ProjectNavbar from './navbar_project';
import Container from '../ui/Container';
import ActionLink from '../ui/ActionLink';
import Button from '../ui/button';
import { projects } from '../../data/projects';
import '../../style/project-route.css';

export function ProjectRouteState({ error = false }) {
  const { pathname } = useLocation();
  const project = projects.find(item => item.link === pathname.replace(/\/+$/, ''));
  return (
    <>
      <ProjectNavbar />
      <main id="main-content" tabIndex={-1}  className="project-route-state" data-route-pending={error ? undefined : 'true'} data-route-error={error ? 'true' : undefined}>
        <Container narrow>
          <p className="project-route-status" role={error ? 'alert' : 'status'}><Text>{error ? 'Unable to load this project.' : 'Loading project…'}</Text></p>
          <h1><Text>{project?.title || 'Project'}</Text></h1>
          <p><Text>{error ? 'Check your connection and reload this page, or return to the projects.' : 'The case study and its interactive diagrams are opening.'}</Text></p>
          <Text>{error && <div className="project-route-actions"><Button onClick={() => window.location.reload()}><Text>{"Reload project"}</Text></Button><ActionLink href="/#projects"><Text>{"Back to projects"}</Text></ActionLink></div>}</Text>
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
  return <ProjectErrorBoundary key={pathname}><Suspense fallback={<ProjectRouteState />}><Text>{children}</Text></Suspense></ProjectErrorBoundary>;
}
