import Text from "../../i18n/Text.jsx";
export default function Container({ as: Tag = 'div', narrow = false, className = '', children, ...props }) {
  return <Tag {...props} className={`container ${narrow ? 'container--narrow' : ''} ${className}`.trim()}><Text>{children}</Text></Tag>;
}
