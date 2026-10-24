export const languageKey = 'anxzu.language';
export const supportedLanguages = ['en', 'es'];
export function createLanguageStore(storage = () => globalThis.localStorage) {
  let language = 'en';
  const listeners = new Set();
  const emit = () => listeners.forEach(listener => listener());
  return {
    getSnapshot: () => language,
    subscribe(listener) { listeners.add(listener); return () => listeners.delete(listener); },
    restore() {
      try { const saved = storage()?.getItem(languageKey); if (supportedLanguages.includes(saved) && saved !== language) { language = saved; emit(); } } catch { /* In-memory state remains usable. */ }
    },
    setLanguage(next) {
      if (!supportedLanguages.includes(next) || next === language) return;
      language = next;
      try { storage()?.setItem(languageKey, next); } catch { /* Persist in memory for this session. */ }
      emit();
    },
  };
}
export const languageStore = createLanguageStore();
