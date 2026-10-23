import { useEffect, useRef } from 'react';
import { FiArrowUpRight } from 'react-icons/fi';
import ActionLink from '../ui/ActionLink';
import Container from '../ui/Container';
import useReducedMotion from '../../hooks/useReducedMotion';
import { startHeroTransition } from './heroMotion';
import '../../style/hero.css';

export default function Hero() {
  const hero = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    return startHeroTransition(hero.current, { reducedMotion });
  }, [reducedMotion]);

  return (
    <section ref={hero} id="hero" tabIndex={-1} className="hero-style" aria-labelledby="hero-title">
      <Container className="hero-content">
        <div className="hero-masthead">
          <div className="hero-identity">
            <p className="hero-concept">The Art of Engineering</p>
            <h1 id="hero-title" className="hero-title"><span className="hero-wordmark">ANXZU</span></h1>
          </div>
          <div className="hero-connections" aria-hidden="true">
            <svg className="hero-circuit" viewBox="0 0 600 260" fill="none" focusable="false">
              <g className="hero-circuit-routes" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 38H166C190 38 194 54 210 70L254 114C264 124 274 130 294 130H580" />
                <path d="M20 222H166C190 222 194 206 210 190L254 146C264 136 274 130 294 130" />
                <path d="M80 80H144L224 130H294" />
                <path d="M80 180H144L224 130" />
              </g>
              <path className="hero-circuit-signal" d="M20 130H580" strokeWidth="2" strokeLinecap="round" />
              <g className="hero-circuit-terminals" strokeWidth="1.5">
                <circle cx="20" cy="38" r="4" />
                <circle cx="20" cy="222" r="4" />
                <circle cx="80" cy="80" r="4" />
                <circle cx="80" cy="180" r="4" />
              </g>
              <circle className="hero-circuit-junction" cx="294" cy="130" r="6" />
              <circle className="hero-circuit-output" cx="580" cy="130" r="4" />
            </svg>
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
      </Container>
    </section>
  );
}
