import { useEffect, useId, useRef, useState } from 'react';
import ActionLink from '../ui/ActionLink';
import Button from '../ui/button';
import Container from '../ui/Container';
import '../../style/layout/navbar.css';

export default function Navigation({ links, home = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(() => typeof window !== 'undefined' && window.matchMedia('(min-width: 60rem)').matches);
  const trigger = useRef(null);
  const menuId = useId();
  function closeMenu(restoreFocus = false) {
    setIsOpen(false);
    if (restoreFocus) trigger.current?.focus();
  }
  useEffect(() => {
    const media = window.matchMedia('(min-width: 60rem)');
    const onResize = () => {
      setIsDesktop(media.matches);
      if (media.matches) {
        const wasTrigger = document.activeElement === trigger.current;
        setIsOpen(false);
        if (wasTrigger) document.querySelector('.navbar-logo')?.focus();
      } else if (document.activeElement?.closest('.navigation-links')) {
        trigger.current?.focus();
      }
    };
    media.addEventListener('change', onResize);
    return () => media.removeEventListener('change', onResize);
  }, []);
  return (
    <>
      <ActionLink href="#main-content" lang="en" className="skip-link">Skip to content</ActionLink>
      <header className="site-header" lang="en" onKeyDown={(event) => {
        if (event.key === 'Escape' && isOpen) { event.preventDefault(); closeMenu(true); }
      }} onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) closeMenu();
      }}>
        <Container as="nav" id="navbar" className="navigation" aria-label="Main navigation">
          <ActionLink href={home ? '#hero' : '/'} className="navbar-logo" onClick={() => closeMenu()}>
            <span className="navbar-mark">ANXZU</span>{' '}
            <span className="navbar-owner">Andres Zuriel Macias Rios</span>
          </ActionLink>
          <Button ref={trigger} className="menu-toggle" aria-label={isOpen ? 'Close menu' : 'Open menu'} aria-expanded={isOpen} aria-controls={menuId} onClick={() => {
            if (isOpen) closeMenu(true);
            else setIsOpen(true);
          }}><span className="menu-toggle-lines" aria-hidden="true"><span /><span /></span></Button>
          <ul id={menuId} inert={!isOpen && !isDesktop} className={`navigation-links ${isOpen ? 'navigation-links--open' : ''}`}>
            {links.map(({ href, label, lang }) => <li key={href}><ActionLink href={href} lang={lang} onClick={() => closeMenu()}>{label}</ActionLink></li>)}
          </ul>
        </Container>
      </header>
    </>
  );
}
