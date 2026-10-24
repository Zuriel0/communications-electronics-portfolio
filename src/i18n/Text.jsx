import useTranslation from './useTranslation';
// Text-only projection: no DOM wrapper, model mutation or component remount.
export default function Text({ children }) {
  const { t } = useTranslation();
  const render = value => typeof value === 'string' ? t(value) : Array.isArray(value) ? value.map(render) : value;
  return render(children);
}
