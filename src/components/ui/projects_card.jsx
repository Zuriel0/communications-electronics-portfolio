import { MdArrowRightAlt } from "react-icons/md";
import { Link } from "react-router-dom";

function ProjectsCard({index, image, title, description, competences, link}) {
    return (
        <div className="projects-card" style={{ animationDelay: `${index * 0.15}s` }}>
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
                <Link to={link} className="button-project">View Project
                    <MdArrowRightAlt size={24}/>
                </Link>
            </div>

        </div>
    )
}

export default ProjectsCard;
