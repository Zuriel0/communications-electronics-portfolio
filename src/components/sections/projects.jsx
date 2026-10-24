import Text from "../../i18n/Text.jsx";
import useTranslation from "../../i18n/useTranslation.js";
import { projects } from '../../data/projects';
import ProjectsCard from '../ui/projects_card';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import '../../style/projects.css';

export default function Projects() {
  const { t } = useTranslation();
  return (
    <section id="projects" tabIndex={-1} className="projects-container">
      <Container>
        <SectionHeading title={t("Featured Projects")}><p><Text>{"Here are some of my projects:"}</Text></p></SectionHeading>
        <div className="projects-cards-container">
          <Text>{projects.map(project => <ProjectsCard key={project.id} {...project} />)}</Text>
        </div>
      </Container>
    </section>
  );
}
