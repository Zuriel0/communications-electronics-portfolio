export default function TimelineCard({ period, title, organization, description }) {
  const [start, end] = period.split(' - ');
  return (
    <li className="timeline-item">
      <div className="timeline-dot" aria-hidden="true" />
      <p className="timeline-period"><span className="timeline-year">{start}</span>{' - '}<span lang={end === 'Actualidad' ? 'es' : undefined}>{end}</span></p>
      <div className="timeline-copy">
        <h3>{organization}</h3>
        <p className="timeline-role">{title}</p>
        <p className="timeline-description">{description}</p>
      </div>
    </li>
  );
}
