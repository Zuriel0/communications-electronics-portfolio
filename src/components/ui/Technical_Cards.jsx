export default function Technical_Cards({ icon: Icon, title, technologies }) {
  return (
    <li className="capability-entry">
      <h4><Icon size={20} aria-hidden="true" focusable="false" />{title}</h4>
      <ul className="capability-technologies">
        {technologies.map(tech => <li key={tech}>{tech}</li>)}
      </ul>
    </li>
  );
}
