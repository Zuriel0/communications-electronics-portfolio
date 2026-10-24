import useTranslation from './useTranslation';
export default function LanguageSelector() {
  const { language, setLanguage, t } = useTranslation();
  return <div className="language-selector" role="group" aria-label={t('Interface language')}>
    <button type="button" lang="en" aria-label={t('EN — English')} aria-pressed={language === 'en'} onClick={() => setLanguage('en')}>EN</button>
    <span aria-hidden="true">|</span>
    <button type="button" lang="es" aria-label={t('ES — Español')} aria-pressed={language === 'es'} onClick={() => setLanguage('es')}>ES</button>
  </div>;
}
