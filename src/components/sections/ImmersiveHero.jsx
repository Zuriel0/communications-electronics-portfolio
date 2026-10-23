import { useEffect, useRef, useState } from 'react';
import { FiArrowUpRight, FiPause, FiPlay } from 'react-icons/fi';
import ActionLink from '../ui/ActionLink';
import Button from '../ui/button';
import Container from '../ui/Container';
import ConnectionSculpture from '../ui/ConnectionSculpture';
import useReducedMotion from '../../hooks/useReducedMotion';
import { startImmersiveHero } from './immersiveHeroMotion';
import '../../style/hero.css';
import '../../style/hero-immersive.css';

export default function ImmersiveHero() {
  const hero = useRef(null);
  const reducedMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const staticScene = reducedMotion || paused;

  useEffect(() => startImmersiveHero(hero.current, { staticScene }), [staticScene]);

  return (
    <section ref={hero} id="hero" tabIndex={-1} className="hero-style hero-immersive" aria-labelledby="hero-title" data-static={staticScene}>
      <ConnectionSculpture />
      <Container className="hero-content">
        <div className="hero-masthead">
          <div className="hero-identity">
            <p className="hero-concept">The Art of Engineering</p>
            <h1 id="hero-title" className="hero-title"><span className="hero-wordmark">ANXZU</span></h1>
          </div>
        </div>
        <div className="hero-presentation">
          <div className="hero-profile">
            <p className="hero-name">Andres Zuriel Macias Rios</p>
            <p className="hero-subtitle">Communications and Electronics Engineer</p>
            <p className="hero-subtitle-2">Designing technology, solving engineering problems, and building innovative systems.</p>
          </div>
          <div className="hero-button-container">
            <ActionLink href="#projects" className="action-link--primary hero-project-link">View Projects <FiArrowUpRight className="hero-cta-icon" size={20} aria-hidden="true" /></ActionLink>
            <ActionLink href="#contact" className="action-link--secondary">Contact</ActionLink>
          </div>
        </div>
        <div className="hero-motion-control">
          <Button className="hero-pause" disabled={reducedMotion} aria-pressed={paused} onClick={() => setPaused(value => !value)}>
            {staticScene ? <FiPlay size={16} aria-hidden="true" /> : <FiPause size={16} aria-hidden="true" />}
            {reducedMotion ? 'Motion reduced' : paused ? 'Resume motion' : 'Pause motion'}
          </Button>
        </div>
      </Container>
    </section>
  );
}
