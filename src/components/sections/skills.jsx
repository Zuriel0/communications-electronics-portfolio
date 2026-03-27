import { skills } from "../../data/skills";
import Technical_Cards from "../ui/Technical_Cards";
import "../../style/skills.css";

function Skills() {
    return (
        <section id="skills" className="skills-container">
            <div className="skills-title">
                <h1>Habilidades</h1>
            </div>
            <div className="skills-cards-container">
                {skills.map((skill) => (
                    <Technical_Cards key={skill.id} icon={skill.icon} title={skill.title} technologies={skill.technologies} />
                ))}
            </div>
        </section>
    );
}

export default Skills;