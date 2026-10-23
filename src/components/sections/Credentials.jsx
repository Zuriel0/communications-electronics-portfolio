import { FiArrowUpRight, FiPlus } from 'react-icons/fi';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import ActionLink from '../ui/ActionLink';
import CredentialEntry from '../ui/CredentialEntry';
import { credentials, credlyProfileUrl, credentialsCheckedOn, learningInProgress } from '../../data/credentials';
import { formatCredentialDate } from '../../utils/credentialStatus';
import '../../style/credentials.css';

const certifications = credentials.filter(item => item.kind === 'certification');
const featured = certifications.filter(item => item.featured);
const additional = certifications.filter(item => !item.featured);
const courses = credentials.filter(item => item.kind === 'course');

export default function Credentials() {
  return (
    <section id="credentials" tabIndex={-1} className="credentials-section" aria-labelledby="credentials-title">
      <Container>
        <div className="credentials-introduction">
          <SectionHeading title="Credentials & continuous learning" id="credentials-title" />
          <div className="credentials-intro-copy">
            <p>Engineering practice grows through deliberate learning. These issuer records document certifications and completed courses, each with its own scope and verification link.</p>
            <ActionLink href={credlyProfileUrl} target="_blank" className="credential-verify"
              aria-label="View public Credly profile (opens in a new tab)">
              View public Credly profile <FiArrowUpRight aria-hidden="true" focusable="false" />
            </ActionLink>
            <p className="credentials-checked">Records checked <time dateTime={credentialsCheckedOn}>{formatCredentialDate(credentialsCheckedOn)}</time>.</p>
          </div>
        </div>
        <div className="credentials-chapter" id="verified-credentials" tabIndex={-1}>
          <h3>Verified Credentials</h3>
          <ul className="credential-list credential-featured">
            {featured.map((credential, index) => <CredentialEntry key={credential.id} credential={credential} prominent={index === 0} />)}
          </ul>
          <details className="credentials-disclosure">
            <summary>Explore {additional.length} more verified credentials <FiPlus aria-hidden="true" focusable="false" /></summary>
            <ul className="credential-list credential-additional">
              {additional.map(credential => <CredentialEntry key={credential.id} credential={credential} />)}
            </ul>
          </details>
        </div>
        <div className="credentials-chapter" id="completed-courses" tabIndex={-1}>
          <div className="credentials-chapter-heading">
            <h3>Completed Courses</h3>
            <p>Issued learning badges, presented separately from professional certifications.</p>
          </div>
          <ul className="credential-list credential-courses">
            {courses.map(credential => <CredentialEntry key={credential.id} credential={credential} />)}
          </ul>
        </div>
        <div className="credentials-learning" id="learning-in-progress" tabIndex={-1}>
          <h3>Learning in Progress</h3>
          {learningInProgress.length ? <ul>{learningInProgress.map(item => <li key={item.id}>{item.name}</li>)}</ul> : <p>No in-progress courses or laboratories are currently listed.</p>}
        </div>
      </Container>
    </section>
  );
}
