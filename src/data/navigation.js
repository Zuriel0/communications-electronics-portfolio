export const homeNavigation = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
];
export function projectNavigation(pathname) {
  const path = pathname.replace(/\/+$/, '');
  return [
    { href: '/', label: 'Home' },
    { href: path === '/projects/metodologia' ? '#metodologia' : '#introduce', label: 'Overview' },
    { href: '#problema', label: 'Challenge' },
    { href: '#solucion', label: path === '/projects/metodologia' ? 'Process' : 'Architecture' },
  ];
}
