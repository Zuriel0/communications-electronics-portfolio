export function translate(message, language, catalog, fallback, values = []) {
  if (typeof message !== 'string') return message;
  const template = catalog?.[language]?.[message] ?? fallback?.[language]?.[message]
    ?? catalog?.en?.[message] ?? fallback?.en?.[message] ?? message;
  return template.replace(/\{(\d+)\}/g, (match, index) => values[index] === undefined ? match : String(catalog?.[language]?.[values[index]] ?? fallback?.[language]?.[values[index]] ?? values[index]));
}
