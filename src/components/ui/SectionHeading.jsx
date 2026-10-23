export default function SectionHeading({ as: Heading = 'h2', title, children, className = '', ...props }) {
  return <div className={`section-heading ${className}`.trim()}><Heading {...props}>{title}</Heading>{children}</div>;
}
