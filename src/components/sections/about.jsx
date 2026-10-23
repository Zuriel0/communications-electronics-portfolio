import { useState } from 'react';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import ConnectionDiagram from '../ui/ConnectionDiagram';
import portrait480 from '../../assets/images/portrait/anxzu-480.jpg';
import portrait768 from '../../assets/images/portrait/anxzu-768.jpg';
import portrait1024 from '../../assets/images/portrait/anxzu-1024.jpg';
import { FiCamera } from 'react-icons/fi';
import { professionalProfile } from '../../data/professionalProfile';
import '../../style/about.css';

export default function About() {
  const [imageError, setImageError] = useState(false);
  return (
    <section id="about" tabIndex={-1} className="section-about" aria-labelledby="about-title">
      <Container>
        <SectionHeading title="About Me" id="about-title" className="about-heading" />
        <div className="about-layout">
          <figure className="about-portrait">
            <div className="about-image-container">
              {!imageError ? <img src={portrait768} srcSet={`${portrait480} 480w, ${portrait768} 768w, ${portrait1024} 1024w`} sizes="(min-width: 960px) 420px, (min-width: 640px) 400px, calc(100vw - 40px)" alt="Andres Zuriel Macias Rios" className="profile-image" width={1024} height={1536} loading="lazy" decoding="async" onError={() => setImageError(true)} /> : <FiCamera size={64} role="img" aria-label="Profile image unavailable" />}
            </div>
            <figcaption>Andres Zuriel Macias Rios</figcaption>
          </figure>
          <div className="about-text-container">
            <h3 className="about-profession">{professionalProfile.title}</h3>
            {professionalProfile.summary.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
            <dl className="professional-focus">
              {professionalProfile.focusAreas.map(area => <div key={area.title}><dt>{area.title}</dt><dd>{area.context}</dd></div>)}
            </dl>
          </div>
        </div>
        <ConnectionDiagram />
      </Container>
    </section>
  );
}
