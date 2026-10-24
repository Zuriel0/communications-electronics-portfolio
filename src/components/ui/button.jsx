import Text from "../../i18n/Text.jsx";
export default function Button({ children, className = '', type = 'button', ...props }) {
  return <button {...props} type={type} className={`button ${className}`.trim()}><Text>{children}</Text></button>;
}
