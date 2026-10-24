import Text from "../../i18n/Text.jsx";
export default function Surface({ as: Tag = 'div', theme, className = '', children, ...props }) {
  return <Tag {...props} data-theme={theme} className={`surface ${className}`.trim()}><Text>{children}</Text></Tag>;
}
