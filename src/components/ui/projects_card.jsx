import { MdArrowRightAlt } from 'react-icons/md';
import ActionLink from './ActionLink';
import ProjectVisual from './ProjectVisual';

export default function ProjectsCard({ id, title, description, competences, link }) {
  return (
    <article className={`project-story ${id === 1 ? 'project-story--featured' : 'project-story--complementary'}`} aria-labelledby={`project-title-${id}`}>
      <ProjectVisual projectId={id} />
      <div className="projects-card-content">
        <h3 id={`project-title-${id}`} className="project-card-title">{title}</h3>
        <p className="project-card-description">{description}</p>
        <div className="skill-tags">{competences.map(competence => <span key={competence} className="skill-tag">{competence}</span>)}</div>
        <ActionLink href={link} className="button-project" aria-label={`View Project: ${title}`}>View Project <MdArrowRightAlt size={24} aria-hidden="true" /></ActionLink>
      </div>
    </article>
  );
}
