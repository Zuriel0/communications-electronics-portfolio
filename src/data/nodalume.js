// Public, abstract models derived from the owner-confirmed brief. No deployment identifiers.
// These are relationships and product questions, never packet traces or runtime telemetry.
export const nodalumeDiagrams = {
  platform: {
    id: 'diagram-nodalume-platform', title: 'Platform relationships', status: 'Current lab implementation',
    nodes: [
      { id: 'console', label: 'React console', detail: 'Administration context' },
      { id: 'backend', label: 'Node.js backend', detail: 'Application services' },
      { id: 'data', label: 'PostgreSQL', detail: 'Application persistence' },
      { id: 'radius', label: 'FreeRADIUS', detail: 'AAA & accounting' },
      { id: 'network', label: 'MikroTik', detail: 'Network integration' },
    ],
    edges: [
      { id: 'console-backend', source: 'console', target: 'backend', label: 'Administration' },
      { id: 'backend-data', source: 'backend', target: 'data', label: 'Persistence' },
      { id: 'backend-radius', source: 'backend', target: 'radius', label: 'RADIUS integration' },
      { id: 'radius-network', source: 'radius', target: 'network', label: 'AAA integration' },
    ],
  },
  builder: {
    id: 'diagram-nodalume-builder', title: 'Builder concept', status: 'Product design in progress',
    nodes: [
      { id: 'portal', label: 'Portal experience', detail: 'Product concept' },
      { id: 'page', label: 'Page composition', detail: 'Editing context & layout' },
      { id: 'blocks', label: 'Reusable blocks', detail: 'Visual building elements' },
      { id: 'logic', label: 'Policy logic', detail: 'Conditional behavior to design' },
      { id: 'actions', label: 'API actions', detail: 'Integration model to design' },
    ],
    edges: [
      { id: 'portal-page', source: 'portal', target: 'page', label: 'Contains' },
      { id: 'page-blocks', source: 'page', target: 'blocks', label: 'Composes' },
      { id: 'page-logic', source: 'page', target: 'logic', label: 'Defines behavior' },
      { id: 'logic-actions', source: 'logic', target: 'actions', label: 'Invokes conceptually' },
    ],
  },
  evolution: {
    id: 'diagram-nodalume-evolution', title: 'Evolution path', status: 'Future direction',
    nodes: [
      { id: 'lab', label: 'Local lab', detail: 'Reported Compose environment' },
      { id: 'baseline', label: 'Document & reproduce', detail: 'Define an operational baseline' },
      { id: 'state', label: 'Separate state', detail: 'Evaluate data & backup boundaries' },
      { id: 'cloud', label: 'Evaluate cloud', detail: 'Compute, connectivity & cost' },
      { id: 'operations', label: 'Validate operations', detail: 'Isolation, recovery & visibility' },
    ],
    edges: [
      { id: 'lab-baseline', source: 'lab', target: 'baseline', label: 'Establish baseline' },
      { id: 'baseline-state', source: 'baseline', target: 'state', label: 'Assess state' },
      { id: 'state-cloud', source: 'state', target: 'cloud', label: 'Explore options' },
      { id: 'cloud-operations', source: 'cloud', target: 'operations', label: 'Test assumptions' },
    ],
  },
};
