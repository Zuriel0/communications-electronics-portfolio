export const professionalProfile = {
  name: 'Andres Zuriel Macias Rios',
  title: 'Communications & Electronics Engineer',
  summary: [
    'With a background in computing, I connect technical requirements with practical solutions in networking, telecommunications and infrastructure. My professional experience spans technical presales, LAN-to-LAN connectivity, captive portals, network configuration, Linux-based services and databases, React automation, troubleshooting and technical support.',
    'I bring solution design, implementation and documentation into the same engineering process. My project work explores concurrent SSH monitoring and AI-assisted customization, with explicit constraints and human validation. Cloud is an area of focus alongside my documented infrastructure experience.',
  ],
  focusAreas: [
    { title: 'Networking & Telecommunications', context: 'Professional practice' },
    { title: 'Cloud & Infrastructure', context: 'Infrastructure practice; cloud development focus' },
    { title: 'Software & Automation', context: 'Professional practice and projects' },
    { title: 'Solutions Architecture & Presales', context: 'Professional practice' },
    { title: 'AI-Assisted Engineering', context: 'Engineering project methodology' },
  ],
  // No institution, degree dates or active coursework have been documented yet.
  education: [],
};

export const capabilityFamilies = [
  { title: 'Networking & Telecommunications', ids: [1, 2],
    context: 'Connectivity, segmentation and network operations.' },
  { title: 'Cloud & Infrastructure', ids: [4, 6],
    context: 'Professional infrastructure and support experience. Cloud remains a development focus.' },
  { title: 'Software & Automation', ids: [3, 5, 7],
    context: 'Internal React automation, web development and data systems.' },
  { title: 'Solutions Architecture & Presales', ids: [8],
    context: 'Requirements, sizing, site surveys and technical proposals.' },
  { title: 'AI-Assisted Engineering', ids: [],
    context: 'An engineering project methodology, grounded in constraints and human review.',
    approach: ['Analyze platform constraints', 'Document technical context', 'Generate and refine solutions with AI', 'Validate manually before integration'],
    evidence: { href: '/projects/metodologia', label: 'Explore the methodology' },
  },
];
