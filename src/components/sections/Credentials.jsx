import Text from "../../i18n/Text.jsx";
import useTranslation from "../../i18n/useTranslation.js";
import { FiArrowUpRight, FiPlus, FiBookOpen } from 'react-icons/fi';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import ActionLink from '../ui/ActionLink';
import CredentialEntry from '../ui/CredentialEntry';
import { credentials, credlyProfileUrl, credentialsCheckedOn, certificationPreparation } from '../../data/credentials';
import { formatCredentialDate } from '../../utils/credentialStatus';
import '../../style/credentials.css';

const certifications = credentials.filter(item => item.kind === 'certification');
const featured = certifications.filter(item => item.featured);
const additional = certifications.filter(item => !item.featured);
const courses = credentials.filter(item => item.kind === 'course');

export default function Credentials() {
  const { t, language } = useTranslation();
  return (
    <section id="credentials" tabIndex={-1} className="credentials-section" aria-labelledby="credentials-title">
      <Container>
        <div className="credentials-introduction">
          <SectionHeading title={t("Credentials & continuous learning")} id="credentials-title" />
          <div className="credentials-intro-copy">
            <p><Text>{"Engineering practice grows through deliberate learning. These issuer records document certifications and completed courses, each with its own scope and verification link."}</Text></p>
            <ActionLink href={credlyProfileUrl} target="_blank" className="credential-verify"
              aria-label={t("View public Credly profile (opens in a new tab)")}><Text>{"View public Credly profile"}</Text>{' '}<FiArrowUpRight aria-hidden="true" focusable="false" />
            </ActionLink>
            <p className="credentials-checked"><Text>{"Records checked"}</Text>{' '}<time dateTime={credentialsCheckedOn}><Text>{formatCredentialDate(credentialsCheckedOn, language)}</Text></time><Text>{"."}</Text></p>
          </div>
        </div>
        <div className="credentials-chapter" id="verified-credentials" tabIndex={-1}>
          <h3><Text>{"Verified Credentials"}</Text></h3>
          <ul className="credential-list credential-featured">
            <Text>{featured.map((credential, index) => <CredentialEntry key={credential.id} credential={credential} prominent={index === 0} />)}</Text>
          </ul>
          <details className="credentials-disclosure">
            <summary>{t('Explore {0} more verified credentials', [additional.length])}<FiPlus aria-hidden="true" focusable="false" /></summary>
            <ul className="credential-list credential-additional">
              <Text>{additional.map(credential => <CredentialEntry key={credential.id} credential={credential} />)}</Text>
            </ul>
          </details>
        </div>
        <div className="credentials-chapter" id="completed-courses" tabIndex={-1}>
          <div className="credentials-chapter-heading">
            <h3><Text>{"Completed Courses"}</Text></h3>
            <p><Text>{"Issued learning badges, presented separately from professional certifications."}</Text></p>
          </div>
          <ul className="credential-list credential-courses">
            <Text>{courses.map(credential => <CredentialEntry key={credential.id} credential={credential} />)}</Text>
          </ul>
        </div>
        <div className="credentials-learning credentials-preparing" id="learning-in-progress" tabIndex={-1}>
          <h3><Text>{"Currently Preparing"}</Text></h3>
          <Text>{certificationPreparation.map(item => <article className="preparation-entry" key={item.id}>
            <FiBookOpen className="preparation-symbol" aria-hidden="true" focusable="false" />
            <div>
              <p className="preparation-status"><Text>{"Certification in Preparation"}</Text>{' '}<span aria-hidden="true"><Text>{"/"}</Text></span>{' '}<Text>{"In preparation"}</Text></p>
              <h4 lang="en"><Text>{item.name}</Text></h4>
              <p><Text>{item.issuer}</Text> <span aria-hidden="true"><Text>{"·"}</Text></span> <Text>{item.examCode}</Text></p>
              <p><Text>{"Hands-on AWS networking labs support this preparation. This certification has not been earned."}</Text></p>
              <ActionLink href={item.url} target="_blank" className="credential-verify" aria-label={t("View certification details (opens in a new tab)")}><Text>{"View certification details"}</Text><FiArrowUpRight aria-hidden="true" focusable="false" /></ActionLink>
            </div>
          </article>)}</Text>
        </div>
      </Container>
    </section>
  );
}
