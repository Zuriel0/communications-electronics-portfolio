import { useLocation } from 'react-router-dom';
import Navigation from './Navigation';
import { projectNavigation } from '../../data/navigation';

export default function ProjectNavbar() {
  const { pathname } = useLocation();
  return <Navigation links={projectNavigation(pathname)} />;
}
