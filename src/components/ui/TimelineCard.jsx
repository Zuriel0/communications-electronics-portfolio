import Text from "../../i18n/Text.jsx";
export default function TimelineCard({ period, title, organization, description }) {
  const [start, end] = period.split(' - ');
  return (
    <li className="timeline-item">
      <div className="timeline-dot" aria-hidden="true" />
      <p className="timeline-period"><span className="timeline-year"><Text>{start}</Text></span><Text>{' - '}</Text><span><Text>{end}</Text></span></p>
      <div className="timeline-copy">
        <h3><Text>{organization}</Text></h3>
        <p className="timeline-role"><Text>{title}</Text></p>
        <p className="timeline-description"><Text>{description}</Text></p>
      </div>
    </li>
  );
}
