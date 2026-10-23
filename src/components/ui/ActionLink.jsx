import { Link } from 'react-router-dom';

export default function ActionLink({ href, children, className = '', disabled = false, onClick, target, rel, ...props }) {
  const classes = `action-link ${className}`.trim();
  if (disabled) return <span {...props} className={classes} role="link" aria-disabled="true">{children}</span>;

  function handleClick(event) {
    onClick?.(event);
    if (!event.defaultPrevented && href?.startsWith('#') && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
      document.getElementById(decodeURIComponent(href.slice(1)))?.focus({ preventScroll: true });
    }
  }
  const safeRel = target === '_blank' ? ['noopener', 'noreferrer', rel].filter(Boolean).join(' ') : rel;
  if (href?.startsWith('/') && !href.startsWith('//')) {
    return <Link {...props} to={href} className={classes} onClick={onClick} target={target} rel={safeRel}>{children}</Link>;
  }
  return <a {...props} href={href} className={classes} onClick={handleClick} target={target} rel={safeRel}>{children}</a>;
}
