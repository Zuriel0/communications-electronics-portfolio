import { useContext, useCallback } from 'react';
import { LanguageContext, MessagesContext } from './contexts';
import en from './locales/en';
import es from './locales/es';
import { translate } from './translate';
const common = { en, es };
export default function useTranslation() {
  const context = useContext(LanguageContext);
  const catalog = useContext(MessagesContext);
  const language = context?.language || 'en';
  const t = useCallback((message, values) => translate(message, language, catalog, common, values), [language, catalog]);
  return { ...context, language, t };
}
