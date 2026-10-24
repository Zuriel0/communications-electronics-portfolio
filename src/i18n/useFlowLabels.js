import { useMemo } from 'react';
import useTranslation from './useTranslation';
export default function useFlowLabels() {
  const { t } = useTranslation();
  return useMemo(() => ({
    'controls.zoomIn.ariaLabel': t('Zoom In'),
    'controls.zoomOut.ariaLabel': t('Zoom Out'),
    'controls.fitView.ariaLabel': t('Fit View'),
    'controls.interactive.ariaLabel': t('Toggle Interactivity'),
    'minimap.ariaLabel': t('Diagram overview'),
    'handle.ariaLabel': t('Connection handle'),
    'node.a11yDescription.default': t('Technical diagram node. Read its label and description.'),
    'node.a11yDescription.keyboardDisabled': t('Technical diagram node. Read its label and description.'),
    'edge.a11yDescription.default': t('Directed connection between diagram components.'),
    'controls.ariaLabel': t('Diagram controls'),
  }), [t]);
}
