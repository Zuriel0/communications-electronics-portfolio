import { MdArrowRightAlt } from "react-icons/md";

function ProjectsCard({image, title, description, competences, link}) {
    return (
        <div className="projects-card">
            <div className="projects-card-image">
                <div className="projects-card-image-content">
                    <span className="projects-card-image-content-text">{image}</span>
                </div>
            </div>
            <div className="projects-card-content">
                <h2 className="project-card-title">{title}</h2>
                <p className="project-card-description">{description}</p>
                <div className="skill-tags">
                    {competences.map((competence) => (
                        <span key={competence} className="skill-tag">{competence}</span>
                    ))}
                </div>
            </div>
            <div className="projects-card-button">
                <span href={link} target="_blank" className="button-project">Ver Proyecto</span>
                <MdArrowRightAlt size={24}/>
            </div>

        </div>
    )
}

export default ProjectsCard;
