import { Social } from '../../data/social_profiles';
import { FiArrowUpRight, FiArrowUp } from 'react-icons/fi';
import ActionLink from '../ui/ActionLink';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import '../../style/contac.css';

export default function Contact() {
  const email = Social.find(social => social.link.startsWith('mailto:'));
  const profiles = Social.filter(social => !social.link.startsWith('mailto:'));
  return (
    <section id="contact" tabIndex={-1} className="contact-section" data-theme="dark" aria-labelledby="contact-title">
      <Container>
        <SectionHeading title="Let's connect." id="contact-title" className="contact-heading"><p>Have a project in mind or want to collaborate?</p></SectionHeading>
        <div className="contact-body">
          <div className="contact-email">
            <ActionLink href={email.link} aria-label={`Email ${email.link.slice(7)}`}>
              <span>{email.link.slice(7)}</span><FiArrowUpRight aria-hidden="true" focusable="false" />
            </ActionLink>
            <p>Opens your email app.</p>
          </div>
          <div className="contact-profiles">
            <nav aria-label="Social profiles">
              {profiles.map(({ id, name, link, icon: Icon }) => (
                <ActionLink key={id} href={link} target="_blank">
                  <Icon aria-hidden="true" focusable="false" />
                  {name === 'Github' ? 'GitHub' : name === 'Linkedin' ? 'LinkedIn' : name}
                  <FiArrowUpRight className="contact-profile-arrow" aria-hidden="true" focusable="false" />
                </ActionLink>
              ))}
            </nav>
            <p className="contact-location">Mexico</p>
          </div>
        </div>
        <footer className="contact-signature">
          <div><p className="contact-wordmark">ANXZU</p><p className="contact-art">The Art of Engineering</p></div>
          <ActionLink href="#hero">Back to top <FiArrowUp aria-hidden="true" focusable="false" /></ActionLink>
        </footer>
      </Container>
    </section>
  );
}
