import { projects } from "../../data/projects";
import ProjectsCard from "../ui/projects_card";
import "../../style/projects.css";

function Projects() {
    return (
        <section className="projects-container">
            <div className="projects-head">
                <h2 className="projects-title">Featured Projects</h2>
                <p className="projects-text">Here are some of my projects:</p>
            </div>
            <div className="projects-cards-container">
                {projects.map((project) => (
                    <ProjectsCard key={project.id} image={project.image} title={project.title} description={project.description} competences={project.competences} link={project.link} />
                ))}
            </div>
        </section>
    );
}

export default Projects;