import { timelineData } from "../../data/timelineData";
import TimelineCard from "../ui/timelineCard";
import "../../style/timelineseccion.css";

function TimelineSection() {
    return (
        <section id="experience" className="timeline-section">
            <div className="timeline-title">
                <h2>Experience & Education</h2>
            </div>
            <div className="timeline-wrapper">

                <div className="timeline">
                {timelineData.map((item, index) => (
                    <TimelineCard
                    key={item.id}
                    period={item.period}
                    title={item.title}
                    organization={item.organization}
                    description={item.description}
                    side={index % 2 === 0 ? 'left' : 'right'}
                    />
                ))}
                </div>
            </div>
        </section>
    )
}

export default TimelineSection