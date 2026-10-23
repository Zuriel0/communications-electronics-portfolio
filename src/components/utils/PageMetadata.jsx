import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getPageMetadata } from '../../data/pageMetadata';

export default function PageMetadata() {
  const { pathname } = useLocation();
  useEffect(() => {
    const page = getPageMetadata(pathname);
    const previous = { title: document.title, lang: document.documentElement.lang };
    document.title = page.title;
    document.documentElement.lang = page.lang;
    const values = [
      ['name', 'description', page.description],
      ['name', 'robots', page.robots || 'index, follow'],
      ['property', 'og:title', page.title],
      ['property', 'og:description', page.description],
      ['property', 'og:type', 'website'],
      ['property', 'og:locale', page.locale],
      ['property', 'og:url', page.canonical],
    ];
    const restore = values.map(([attribute, key, value]) => {
      const existing = document.head.querySelector(`meta[${attribute}="${key}"]`);
      const node = existing || document.createElement('meta');
      const content = node.getAttribute('content');
      if (value === undefined) {
        existing?.remove();
        return () => { if (existing) document.head.append(existing); };
      }
      node.setAttribute(attribute, key);
      node.setAttribute('content', value);
      if (!existing) document.head.append(node);
      return () => {
        if (!existing) node.remove();
        else if (content === null) node.removeAttribute('content');
        else node.setAttribute('content', content);
      };
    });
    const previousCanonical = document.head.querySelector('link[rel="canonical"]');
    const canonical = previousCanonical || document.createElement('link');
    const previousHref = canonical.getAttribute('href');
    if (page.canonical) {
      canonical.setAttribute('rel', 'canonical');
      canonical.setAttribute('href', page.canonical);
      if (!previousCanonical) document.head.append(canonical);
    } else previousCanonical?.remove();
    return () => {
      document.title = previous.title;
      document.documentElement.lang = previous.lang;
      restore.forEach(cleanup => cleanup());
      if (!previousCanonical) canonical.remove();
      else {
        if (previousHref === null) canonical.removeAttribute('href');
        else canonical.setAttribute('href', previousHref);
        if (!canonical.isConnected) document.head.append(canonical);
      }
    };
  }, [pathname]);
  return null;
}
