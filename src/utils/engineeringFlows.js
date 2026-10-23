// Only existing directed connections participate; optional policy is a reference.
const sequences = {
  balance: [['client-lb', 'lb-ws1'], ['client-lb', 'lb-ws2'], ['client-lb', 'lb-ws3']],
  business: [['e1'], ['e2'], ['e3']],
  logic: [['mac-ssh'], ['ssh-web', 'ssh-radius'], ['web-detect'], ['radius-detect'], ['detect-console']],
  architecture: [
    ['user-terminal'], ['terminal-orchestrator', 'config-orchestrator'],
    ['orchestrator-ssh'], ['ssh-web', 'ssh-radius'], ['web-logs', 'radius-logs'],
    ['weblogs-orchestrator'], ['radiuslogs-orchestrator'], ['orchestrator-console'],
  ],
  methodology: [['a-b'], ['b-c'], ['c-d'], ['d-e'], ['e-f']],
};

export const flowStepCount = kind => sequences[kind].length;

export function activeFlowEdges(kind, step) {
  const sequence = sequences[kind];
  const active = sequence[((step % sequence.length) + sequence.length) % sequence.length];
  // Observability is independent of the sequential business workflow.
  return kind === 'business' ? [...active, 'm1', 'm2'] : active;
}

export function decorateFlowEdges(edges, kind, step) {
  const active = new Set(activeFlowEdges(kind, step));
  return edges.map(edge => ({
    ...edge,
    animated: false,
    className: `${edge.className || ''}${active.has(edge.id) ? ' diagram-edge--flow' : ''}`.trim(),
    // The optional Web policy is explanatory, not a data-transfer edge.
    ...(edge.id === 'policy-detect' ? {} : {
      type: 'engineering',
      data: { ...edge.data, flowActive: active.has(edge.id) },
      markerEnd: { type: 'arrowclosed', width: 14, height: 14, color: 'var(--accent)' },
    }),
  }));
}
