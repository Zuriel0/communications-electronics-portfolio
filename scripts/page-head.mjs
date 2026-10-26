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

// A direct Nodalume request already identifies its editorial route. Fetch its
// static closure in parallel with React, while leaving every graph dynamic.
export function preloadNodalumeEditorial(html, bundle) {
  const route=Object.values(bundle).find(item=>item.type==='chunk' && Object.keys(item.modules).some(id=>id.endsWith('/pages/projects/Nodalume.jsx')));
  if(!route) throw new Error('The Nodalume editorial chunk is required.');
  const visited=new Set(),css=new Set(),scripts=[];
  function visit(chunk) {
    if(visited.has(chunk.fileName))return;
    visited.add(chunk.fileName);
    for(const file of chunk.imports)if(bundle[file]?.type==='chunk')visit(bundle[file]);
    for(const file of chunk.viteMetadata?.importedCss || [])css.add(file);
    scripts.push(chunk.fileName);
  }
  visit(route);
  const links=[...scripts.filter(file=>!html.includes(`src="/${file}"`)).map(file=>`<link rel="modulepreload" crossorigin href="/${file}" />`),...Array.from(css).filter(file=>!html.includes(`href="/${file}"`)).map(file=>`<link rel="stylesheet" crossorigin href="/${file}" />`)];
  return html.replace('</head>',`    ${links.join('\n    ')}\n  </head>`);
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
          const html=renderPageHead(String(index.source), route);
          this.emitFile({ type: 'asset', fileName: `${route.slice(1)}/index.html`, source: route==='/projects/nodalume' ? preloadNodalumeEditorial(html,bundle) : html });
        }
      },
    },
  };
}
