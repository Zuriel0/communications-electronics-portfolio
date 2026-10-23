import { useEffect, useState } from 'react';
import useReducedMotion from './useReducedMotion';
import { observeDiagramPlayback } from '../utils/diagramVisibility';
import { flowStepCount } from '../utils/engineeringFlows';

export default function useDiagramPlayback(frame, kind, initialStep = 0) {
  const reducedMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [step, setStep] = useState(initialStep);
  const steps = flowStepCount(kind);
  useEffect(() => observeDiagramPlayback(frame.current, {
    paused, reducedMotion, onPlaying: setPlaying,
    onStep: () => setStep(previous => (previous + 1) % steps),
  }), [frame, paused, reducedMotion, steps]);
  return { step, paused, reducedMotion, playing: playing && !paused && !reducedMotion,
    toggle: () => setPaused(value => !value) };
}
