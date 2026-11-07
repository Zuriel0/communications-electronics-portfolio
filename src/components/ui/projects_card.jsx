import Text from "../../i18n/Text.jsx";
import useTranslation from "../../i18n/useTranslation.js";
import { MdArrowRightAlt, MdNorthEast } from 'react-icons/md';
import ActionLink from './ActionLink';
import ProjectVisual from './ProjectVisual';

export default function ProjectsCard({ id, title, description, competences, link, productUrl }) {
  const { t } = useTranslation();
  return (
    <article className={`project-story ${id === 1 ? 'project-story--featured' : 'project-story--complementary'}`} aria-labelledby={`project-title-${id}`}>
      <ProjectVisual projectId={id} />
      <div className="projects-card-content">
        <h3 id={`project-title-${id}`} className="project-card-title"><Text>{title}</Text></h3>
        <p className="project-card-description"><Text>{description}</Text></p>
        <div className="skill-tags"><Text>{competences.map(competence => <span key={competence} className="skill-tag"><Text>{competence}</Text></span>)}</Text></div>
        {productUrl && <ActionLink href={productUrl} className="project-product-link"><span><strong>{t('Explore Nodalume')}</strong><small>nodalume.anxzu.com</small></span><MdNorthEast size={24} aria-hidden="true" /></ActionLink>}
        <ActionLink href={link} className="button-project" aria-label={t("View Project: {0}",[title])}><Text>{"View Project"}</Text>{' '}<MdArrowRightAlt size={24} aria-hidden="true" /></ActionLink>
      </div>
    </article>
  );
}
