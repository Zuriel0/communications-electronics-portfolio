import LanguageSelector from '../../i18n/LanguageSelector';
import Text from "../../i18n/Text.jsx";
import useTranslation from "../../i18n/useTranslation.js";
import { useEffect, useId, useRef, useState } from 'react';
import ActionLink from '../ui/ActionLink';
import Button from '../ui/button';
import Container from '../ui/Container';
import '../../style/layout/navbar.css';

export default function Navigation({ links, home = false }) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(() => typeof window !== 'undefined' && window.matchMedia('(min-width: 70rem)').matches);
  const trigger = useRef(null);
  const menuId = useId();
  function closeMenu(restoreFocus = false) {
    setIsOpen(false);
    if (restoreFocus) trigger.current?.focus();
  }
  useEffect(() => {
    const media = window.matchMedia('(min-width: 70rem)');
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
      <ActionLink href="#main-content"  className="skip-link"><Text>{"Skip to content"}</Text></ActionLink>
      <header className="site-header"  onKeyDown={(event) => {
        if (event.key === 'Escape' && isOpen) { event.preventDefault(); closeMenu(true); }
      }} onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) closeMenu();
      }}>
        <Container as="nav" id="navbar" className="navigation" aria-label={t("Main navigation")}>
          <ActionLink href={home ? '#hero' : '/'} className="navbar-logo" onClick={() => closeMenu()}>
            <span className="navbar-mark"><Text>{"ANXZU"}</Text></span><Text>{' '}</Text>
            <span className="navbar-owner"><Text>{"Andres Zuriel Macias Rios"}</Text></span>
          </ActionLink>
          <LanguageSelector />
          <Button ref={trigger} className="menu-toggle" aria-label={t(isOpen ? 'Close menu' : 'Open menu')} aria-expanded={isOpen} aria-controls={menuId} onClick={() => {
            if (isOpen) closeMenu(true);
            else setIsOpen(true);
          }}><span className="menu-toggle-lines" aria-hidden="true"><span /><span /></span></Button>
          <ul id={menuId} inert={!isOpen && !isDesktop} className={`navigation-links ${isOpen ? 'navigation-links--open' : ''}`}>
            <Text>{links.map(({ href, label, lang }) => <li key={href}><ActionLink href={href} lang={lang} onClick={() => closeMenu()}><Text>{label}</Text></ActionLink></li>)}</Text>
          </ul>
        </Container>
      </header>
    </>
  );
}
