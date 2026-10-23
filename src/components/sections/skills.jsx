import { skills } from '../../data/skills';
import { capabilityFamilies } from '../../data/professionalProfile';
import Technical_Cards from '../ui/Technical_Cards';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import ActionLink from '../ui/ActionLink';
import { FiArrowDown } from 'react-icons/fi';
import '../../style/skills.css';

export default function Skills() {
  return (
    <section id="skills" tabIndex={-1} className="skills-container" data-theme="light" aria-labelledby="skills-title">
      <Container>
        <SectionHeading title="Capabilities" id="skills-title" className="capabilities-heading" />
        <div className="capability-families">
          {capabilityFamilies.map(family => (
            <div className="capability-family" key={family.title}>
              <div className="capability-family-heading"><h3>{family.title}</h3><p>{family.context}</p></div>
              {family.ids.length ? <ul className="capability-entries">
                {family.ids.map(id => <Technical_Cards key={id} {...skills.find(skill => skill.id === id)} />)}
              </ul> : <div className="capability-approach"><h4>Constraint-led development</h4><ul>{family.approach.map(step => <li key={step}>{step}</li>)}</ul><ActionLink href={family.evidence.href}>{family.evidence.label}</ActionLink></div>}
            </div>
          ))}
        </div>
        <div className="capabilities-next">
          <ActionLink href="#credentials">View credentials <FiArrowDown aria-hidden="true" focusable="false" /></ActionLink>
          <ActionLink href="#experience">View experience <FiArrowDown aria-hidden="true" focusable="false" /></ActionLink>
        </div>
      </Container>
    </section>
  );
}
