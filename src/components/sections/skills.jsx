import Text from "../../i18n/Text.jsx";
import useTranslation from "../../i18n/useTranslation.js";
import { skills } from '../../data/skills';
import { capabilityAreas, evidenceContexts } from '../../data/capabilities';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import TechnicalCards from '../ui/Technical_Cards';
import ActionLink from '../ui/ActionLink';
import { FiArrowDown } from 'react-icons/fi';
import '../../style/skills.css';

export default function Skills() {
  const { t } = useTranslation();
  return <section id="skills" tabIndex={-1} className="skills-container" data-theme="light" aria-labelledby="skills-title">
    <Container>
      <SectionHeading title={t("Professional capabilities")} id="skills-title" className="capabilities-heading">
        <p><Text>{"Design, implement, integrate and validate. Each area identifies the context behind the work."}</Text></p>
      </SectionHeading>
      <div className="capability-families">
        <Text>{capabilityAreas.map(area => <div className="capability-family" key={area.id}>
          <div className="capability-family-heading"><h3><Text>{area.title}</Text></h3><p><Text>{area.summary}</Text></p></div>
          <div className="capability-detail">
            <Text>{area.groups.map(group => <div className="capability-context" key={group.context}>
              <h4><Text>{evidenceContexts[group.context]}</Text></h4>
              <ul className="capability-technologies"><Text>{group.items.map(item => <li key={item}><Text>{item}</Text></li>)}</Text></ul>
              <Text>{group.note && <p><Text>{group.note}</Text></p>}</Text>
            </div>)}</Text>
            <Text>{area.link && <ActionLink href={area.link.href}><Text>{area.link.label}</Text></ActionLink>}</Text>
          </div>
        </div>)}</Text>
      </div>
      <details className="capability-additional">
        <summary><Text>{"Additional technologies & previous capabilities"}</Text></summary>
        <p><Text>{"The original capability inventory remains available with its existing context."}</Text></p>
        <ul className="capability-entries"><Text>{skills.map(skill => <TechnicalCards key={skill.id} {...skill} />)}</Text></ul>
      </details>
      <div className="capabilities-next">
        <ActionLink href="#credentials"><Text>{"View credentials"}</Text>{' '}<FiArrowDown aria-hidden="true" focusable="false" /></ActionLink>
        <ActionLink href="#experience"><Text>{"View experience"}</Text>{' '}<FiArrowDown aria-hidden="true" focusable="false" /></ActionLink>
      </div>
    </Container>
  </section>;
}
