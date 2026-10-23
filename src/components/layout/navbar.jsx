import Navigation from './Navigation';
import { homeNavigation } from '../../data/navigation';

export default function Navbar() {
  return <Navigation links={homeNavigation} home />;
}
