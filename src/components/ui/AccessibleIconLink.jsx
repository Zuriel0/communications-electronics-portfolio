import ActionLink from './ActionLink';

export default function AccessibleIconLink({ name, icon: Icon, href, ...props }) {
  return <ActionLink {...props} href={href} className="icon-link" aria-label={name}><Icon size={22} aria-hidden="true" focusable="false" /></ActionLink>;
}
