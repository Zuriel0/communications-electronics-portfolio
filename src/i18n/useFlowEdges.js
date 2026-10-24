import { useMemo } from 'react';
import useTranslation from './useTranslation';
// Presentation-only copies. IDs, endpoints, labels, flow data and the controlled models stay intact.
export default function useFlowEdges(edges) {
  const { t } = useTranslation();
  return useMemo(() => edges.map(edge => ({
    ...edge, ariaLabel: t('Connection from {0} to {1}', [edge.source, edge.target]),
  })), [edges, t]);
}
