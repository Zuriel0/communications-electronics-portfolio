export const professionalProfile = {
  name: 'Andres Zuriel Macias Rios',
  title: 'Communications & Electronics Engineer',
  summary: [
    'I design, implement, integrate and validate technical solutions across networking, telecommunications, Linux infrastructure and software. My professional experience connects requirements gathering and technical presales with solution design, configuration, troubleshooting and documentation.',
    'My project work brings these disciplines together: Nodalume combines a captive-portal backend, databases, RADIUS and a React console in a laboratory environment; ANXZU and my AI-assisted customization methodology extend that practice into interface development, automation and human-reviewed delivery. Hands-on AWS networking labs support my preparation for AWS Certified Solutions Architect – Associate.',
  ],
  focusAreas: [
    { title: 'Networking & Telecommunications', context: 'Professional Experience' },
    { title: 'AWS & Cloud Architecture', context: 'Hands-On Labs' },
    { title: 'Backend Engineering & Databases', context: 'Personal Projects' },
    { title: 'Infrastructure, Linux & Virtualization', context: 'Professional Experience and Hands-On Labs' },
    { title: 'Software Development & AI-Assisted Engineering', context: 'Professional Experience and Personal Projects' },
    { title: 'Solutions Architecture & Technical Presales', context: 'Professional Experience' },
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
