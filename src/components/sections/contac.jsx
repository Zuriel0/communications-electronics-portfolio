import Text from "../../i18n/Text.jsx";
import useTranslation from "../../i18n/useTranslation.js";
import { Social } from '../../data/social_profiles';
import { FiArrowUpRight, FiArrowUp } from 'react-icons/fi';
import ActionLink from '../ui/ActionLink';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import '../../style/contac.css';

export default function Contact() {
  const { t } = useTranslation();
  const email = Social.find(social => social.link.startsWith('mailto:'));
  const profiles = Social.filter(social => !social.link.startsWith('mailto:'));
  return (
    <section id="contact" tabIndex={-1} className="contact-section" data-theme="dark" aria-labelledby="contact-title">
      <Container>
        <SectionHeading title={t("Let's connect.")} id="contact-title" className="contact-heading"><p><Text>{"Have a project in mind or want to collaborate?"}</Text></p></SectionHeading>
        <div className="contact-body">
          <div className="contact-email">
            <ActionLink href={email.link} aria-label={t("Email {0}",[email.link.slice(7)])}>
              <span><Text>{email.link.slice(7)}</Text></span><FiArrowUpRight aria-hidden="true" focusable="false" />
            </ActionLink>
            <p><Text>{"Opens your email app."}</Text></p>
          </div>
          <div className="contact-profiles">
            <nav aria-label={t("Social profiles")}>
              <Text>{profiles.map(({ id, name, link, icon: Icon }) => (
                <ActionLink key={id} href={link} target="_blank">
                  <Icon aria-hidden="true" focusable="false" />
                  <Text>{name === 'Github' ? 'GitHub' : name === 'Linkedin' ? 'LinkedIn' : name}</Text>
                  <FiArrowUpRight className="contact-profile-arrow" aria-hidden="true" focusable="false" />
                </ActionLink>
              ))}</Text>
            </nav>
            <p className="contact-location"><Text>{"Mexico"}</Text></p>
          </div>
        </div>
        <footer className="contact-signature">
          <div><p className="contact-wordmark"><Text>{"ANXZU"}</Text></p><p className="contact-art"><Text>{"The Art of Engineering"}</Text></p></div>
          <ActionLink href="#hero"><Text>{"Back to top"}</Text>{' '}<FiArrowUp aria-hidden="true" focusable="false" /></ActionLink>
        </footer>
      </Container>
    </section>
  );
}
