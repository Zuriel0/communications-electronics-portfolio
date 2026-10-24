import Text from "../../i18n/Text.jsx";
export default function Technical_Cards({ icon: Icon, title, technologies }) {
  return (
    <li className="capability-entry">
      <h4><Icon size={20} aria-hidden="true" focusable="false" /><Text>{title}</Text></h4>
      <ul className="capability-technologies">
        <Text>{technologies.map(tech => <li key={tech}><Text>{tech}</Text></li>)}</Text>
      </ul>
    </li>
  );
}
