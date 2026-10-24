// Store each translation once. Canonical phrases supply the source-language value.
// Explicit groups make the language of existing Spanish diagram labels unambiguous.
export function defineMessages({ fromEnglish = {}, fromSpanish = {}, spanishCorrections = {} }) {
  const en = {};
  const es = {};
  for (const [source, translation] of Object.entries(fromEnglish)) {
    en[source] = source;
    es[source] = translation;
  }
  for (const [source, translation] of Object.entries(fromSpanish)) {
    if (Object.hasOwn(en, source)) throw new Error(`Duplicate message: ${source}`);
    en[source] = translation;
    es[source] = source;
  }
  return { en, es: { ...es, ...spanishCorrections } };
}
