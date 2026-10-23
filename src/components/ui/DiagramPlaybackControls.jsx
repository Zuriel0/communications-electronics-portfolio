import { FiPause, FiPlay } from 'react-icons/fi';
import Button from './button';
import '../../style/engineering-flows.css';

export default function DiagramPlaybackControls({ playback, id, title, simulation = false }) {
  const { paused, reducedMotion, toggle } = playback;
  const action = paused ? 'Reanudar' : 'Pausar';
  const subject = simulation ? 'simulación' : 'conexiones';
  return (
    <div className="diagram-motion-controls" role="group" aria-label={`Animación: ${title}`}>
      <span className="diagram-motion-note">Recorrido ilustrativo</span>
      <Button className="diagram-motion-button" disabled={reducedMotion} aria-pressed={paused}
        aria-controls={id} aria-label={reducedMotion ? `Movimiento reducido: ${title}` : `${action} ${subject}: ${title}`} onClick={toggle}>
        {paused || reducedMotion ? <FiPlay size={16} aria-hidden="true" /> : <FiPause size={16} aria-hidden="true" />}
        {reducedMotion ? 'Movimiento reducido' : `${action} ${subject}`}
      </Button>
    </div>
  );
}
