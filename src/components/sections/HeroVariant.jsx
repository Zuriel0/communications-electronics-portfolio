import { useLocation } from 'react-router-dom';
import ClassicHero from './hero';
import ImmersiveHero from './ImmersiveHero';

// Explicit URLs and a build-time switch keep the ANX-003 Hero easy to restore.
export default function HeroVariant() {
  const { search } = useLocation();
  const requested = new URLSearchParams(search).get('hero');
  const variant = requested === 'classic' || requested === 'immersive'
    ? requested : (import.meta.env.VITE_HERO_VARIANT || 'immersive');
  return variant === 'immersive' ? <ImmersiveHero /> : <ClassicHero />;
}
