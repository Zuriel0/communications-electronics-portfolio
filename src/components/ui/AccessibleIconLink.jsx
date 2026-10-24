import useTranslation from "../../i18n/useTranslation.js";
import ActionLink from './ActionLink';

export default function AccessibleIconLink({ name, icon: Icon, href, ...props }) {
  const { t } = useTranslation();
  return <ActionLink {...props} href={href} className="icon-link" aria-label={t(name)}><Icon size={22} aria-hidden="true" focusable="false" /></ActionLink>;
}
