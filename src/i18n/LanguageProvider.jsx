import { useLayoutEffect, useMemo, useRef, useSyncExternalStore } from 'react';
import { LanguageContext } from './contexts';
import { languageStore } from './languageStore';

export default function LanguageProvider({ children, store = languageStore }) {
  const language = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getSnapshot);
  const anchor = useRef(null);
  useLayoutEffect(() => { store.restore(); }, [store]);
  useLayoutEffect(() => {
    document.documentElement.lang = language;
    const saved = anchor.current;
    if (saved?.element.isConnected) window.scrollBy({ top: saved.element.getBoundingClientRect().top - saved.top, behavior: 'instant' });
    anchor.current = null;
  }, [language]);
  const value = useMemo(() => ({
    language,
    setLanguage(next) {
      if (next === language) return;
      const element = document.elementFromPoint(window.innerWidth / 2, 110)?.closest('.diagram-frame[id],section[id],main[id]');
      anchor.current = element ? { element, top: element.getBoundingClientRect().top } : null;
      store.setLanguage(next);
    },
  }), [language, store]);
  return <LanguageContext value={value}>{children}</LanguageContext>;
}
