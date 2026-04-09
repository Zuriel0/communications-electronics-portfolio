import { useEffect, useRef } from "react";
import { skills } from "../../data/skills";
import Technical_Cards from "../ui/Technical_Cards";
import "../../style/skills.css";

function Skills() {
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
        <section id="skills" ref={sectionRef} className="skills-container reveal-section">
            <div className="skills-title">
                <h1>Habilidades</h1>
            </div>
            <div className="skills-cards-container">
                {skills.map((skill, index) => (
                    <Technical_Cards key={skill.id} index={index} icon={skill.icon} title={skill.title} technologies={skill.technologies} />
                ))}
            </div>
        </section>
    );
}

export default Skills;