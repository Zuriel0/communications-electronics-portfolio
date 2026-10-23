import { timelineData } from '../../data/timelineData';
import TimelineCard from '../ui/TimelineCard';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import '../../style/timelineseccion.css';

export default function TimelineSection() {
  return (
    <section id="experience" tabIndex={-1} className="timeline-section" data-theme="light" aria-labelledby="experience-title">
      <Container>
        <SectionHeading title="Professional experience" id="experience-title" className="experience-heading" />
        <ol className="timeline">
          {timelineData.map(item => <TimelineCard key={item.id} {...item} />)}
        </ol>
      </Container>
    </section>
  );
}
