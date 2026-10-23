import { projects } from '../../data/projects';
import ProjectsCard from '../ui/projects_card';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import '../../style/projects.css';

export default function Projects() {
  return (
    <section id="projects" tabIndex={-1} className="projects-container">
      <Container>
        <SectionHeading title="Featured Projects"><p>Here are some of my projects:</p></SectionHeading>
        <div className="projects-cards-container">
          {projects.map(project => <ProjectsCard key={project.id} {...project} />)}
        </div>
      </Container>
    </section>
  );
}
