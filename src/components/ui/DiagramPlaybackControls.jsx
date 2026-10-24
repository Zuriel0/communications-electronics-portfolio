import useTranslation from '../../i18n/useTranslation';
import { FiPause, FiPlay } from 'react-icons/fi';
import Button from './button';
import '../../style/engineering-flows.css';

export default function DiagramPlaybackControls({ playback, id, title, simulation = false }) {
  const { t } = useTranslation();
  const { paused, reducedMotion, toggle } = playback;
  const label = reducedMotion ? t('Reduced motion') : simulation
    ? t(paused ? 'Resume simulation' : 'Pause simulation')
    : t(paused ? 'Resume connections' : 'Pause connections');
  return (
    <div className="diagram-motion-controls" role="group" aria-label={t('Animation: {0}', [t(title)])}>
      <span className="diagram-motion-note">{t('Illustrative flow')}</span>
      <Button className="diagram-motion-button" disabled={reducedMotion} aria-pressed={paused}
        aria-controls={id} aria-label={t('{0}: {1}', [label, t(title)])} onClick={toggle}>
        {paused || reducedMotion ? <FiPlay size={16} aria-hidden="true" /> : <FiPause size={16} aria-hidden="true" />}
        {label}
      </Button>
    </div>
  );
}
