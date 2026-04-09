import { useEffect, useRef } from "react";
import { projects } from "../../data/projects";
import ProjectsCard from "../ui/projects_card";
import "../../style/projects.css";

function Projects() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            },
            { threshold: 0.15 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section id="projects" ref={sectionRef} className="projects-container reveal-section">
            <div className="projects-head">
                <h2 className="projects-title">Featured Projects</h2>
                <p className="projects-text">Here are some of my projects:</p>
            </div>
            <div className="projects-cards-container">
                {projects.map((project, index) => (
                    <ProjectsCard key={project.id} index={index} image={project.image} title={project.title} description={project.description} competences={project.competences} link={project.link} />
                ))}
            </div>
        </section>
    );
}

export default Projects;