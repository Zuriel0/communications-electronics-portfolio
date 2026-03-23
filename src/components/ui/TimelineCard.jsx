function TimelineCard({ period, title, organization, description, side }) {
  return (
    <div className={`timeline-item ${side}`}>
      <div className={`timeline-dot ${side}`} />

      <div className="timeline-card">
        <div className={`timeline-period-contend ${side}`}>
          <span className="timeline-period">{period}</span>
        </div>
        <h3 className="timeline-title">{title}</h3>
        <h4 className="timeline-organization">{organization}</h4>
        <p className="timeline-description">{description}</p>
      </div>
    </div>
  )
}

export default TimelineCard;