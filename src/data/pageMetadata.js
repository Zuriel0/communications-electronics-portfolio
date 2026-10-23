export const productionOrigin = 'https://anxzu.com';

export const pageMetadata = {
  '/': {
    title: 'ANXZU — The Art of Engineering',
    description: 'Andres Zuriel Macias Rios, Communications and Electronics Engineer. Explore projects in networking, Linux infrastructure, software and technical pre-sales.',
    lang: 'en',
    locale: 'en_US',
  },
  '/projects/concurrencia': {
    title: 'Concurrent Log Monitor via SSH | ANXZU',
    description: 'Engineering case study: Ubuntu, Bash and SSH log monitoring across six web servers and one active RADIUS target, with MAC search and independent supervision.',
    lang: 'en',
    locale: 'en_US',
  },
  '/projects/metodologia': {
    title: 'AI-Assisted Customization Methodology | ANXZU',
    description: 'A six-stage engineering methodology for constrained platforms: native-interface analysis, technical context, AI-assisted generation and human validation.',
    lang: 'en',
    locale: 'en_US',
  },
};

export function getPageMetadata(pathname) {
  // React Router also accepts a trailing slash. Hashes do not identify new pages.
  const path = pathname.replace(/\/+$/, '') || '/';
  return pageMetadata[path]
    ? { ...pageMetadata[path], canonical: `${productionOrigin}${path}` }
    : { ...pageMetadata['/'], robots: 'noindex, follow' };
}
