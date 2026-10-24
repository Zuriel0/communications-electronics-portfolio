import Text from "../../i18n/Text.jsx";
export default function SectionHeading({ as: Heading = 'h2', title, children, className = '', ...props }) {
  return <div className={`section-heading ${className}`.trim()}><Heading {...props}><Text>{title}</Text></Heading><Text>{children}</Text></div>;
}
