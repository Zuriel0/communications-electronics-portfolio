export default function Surface({ as: Tag = 'div', theme, className = '', children, ...props }) {
  return <Tag {...props} data-theme={theme} className={`surface ${className}`.trim()}>{children}</Tag>;
}
