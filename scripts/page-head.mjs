import { getPageMetadata, pageMetadata } from '../src/data/pageMetadata.js';

const escapeAttribute = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

// Keep the static HTML useful to social crawlers that do not execute React.
export function renderPageHead(html, pathname) {
  const page = getPageMetadata(pathname);
  const meta = [
    `<meta name="description" content="${escapeAttribute(page.description)}" />`,
    `<meta property="og:title" content="${escapeAttribute(page.title)}" />`,
    `<meta property="og:description" content="${escapeAttribute(page.description)}" />`,
    '<meta property="og:type" content="website" />',
    `<meta property="og:locale" content="${page.locale}" />`,
    `<meta property="og:url" content="${page.canonical}" />`,
    `<link rel="canonical" href="${page.canonical}" />`,
  ];
  return html
    .replace(/<html\s+lang="[^"]*"/, `<html lang="${page.lang}"`)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeAttribute(page.title)}</title>`)
    .replace(/\s*<meta (?:name="description"|property="og:[^"]+")[^>]*>/g, '')
    .replace(/\s*<link rel="canonical"[^>]*>/g, '')
    .replace('</head>', `    ${meta.join('\n    ')}\n  </head>`);
}

export function routeMetadataPlugin() {
  return {
    name: 'anxzu-route-metadata',
    configurePreviewServer(server) {
      server.middlewares.use((request, _response, next) => {
        const url = new URL(request.url || '/', 'http://localhost');
        const path = url.pathname.replace(/\/+$/, '');
        if (path.startsWith('/projects/') && Object.hasOwn(pageMetadata, path)) {
          request.url = `${path}/index.html${url.search}`;
        }
        next();
      });
    },
    generateBundle: {
      order: 'post',
      handler(_options, bundle) {
        const index = bundle['index.html'];
        if (!index || index.type !== 'asset') throw new Error('Built index.html is required for route metadata.');
        index.source = renderPageHead(String(index.source), '/');
        for (const route of Object.keys(pageMetadata).filter(path => path.startsWith('/projects/'))) {
          this.emitFile({ type: 'asset', fileName: `${route.slice(1)}/index.html`, source: renderPageHead(String(index.source), route) });
        }
      },
    },
  };
}
