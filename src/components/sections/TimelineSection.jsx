import Text from "../../i18n/Text.jsx";
import useTranslation from "../../i18n/useTranslation.js";
import { timelineData } from '../../data/timelineData';
import TimelineCard from '../ui/TimelineCard';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import '../../style/timelineseccion.css';

export default function TimelineSection() {
  const { t } = useTranslation();
  return (
    <section id="experience" tabIndex={-1} className="timeline-section" data-theme="light" aria-labelledby="experience-title">
      <Container>
        <SectionHeading title={t("Professional experience")} id="experience-title" className="experience-heading" />
        <ol className="timeline">
          <Text>{timelineData.map(item => <TimelineCard key={item.id} {...item} />)}</Text>
        </ol>
      </Container>
    </section>
  );
}
