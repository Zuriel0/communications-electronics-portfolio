import AccessibleIconLink from './AccessibleIconLink';

export default function SocialCard({ name, link, icon }) {
  return <AccessibleIconLink name={name} href={link} icon={icon} target={link.startsWith('mailto:') ? undefined : '_blank'} />;
}
