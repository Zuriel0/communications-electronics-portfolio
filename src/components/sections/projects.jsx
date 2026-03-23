import { projects } from "../../data/projects";
import ProjectsCard from "../ui/projects_card";

function Projects() {
    return (
        <section className="projects-container">
            <div className="projects-cards-container">
                {projects.map((project) => (
                    <ProjectsCard key={project.id} image={project.image} title={project.title} description={project.description} competences={project.competences} link={project.link} />
                ))}
            </div>
        </section>
    );
}

export default Projects;