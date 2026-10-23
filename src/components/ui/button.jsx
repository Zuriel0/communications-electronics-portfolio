export default function Button({ children, className = '', type = 'button', ...props }) {
  return <button {...props} type={type} className={`button ${className}`.trim()}>{children}</button>;
}
