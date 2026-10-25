import Text from "../../i18n/Text.jsx";
import useTranslation from "../../i18n/useTranslation.js";
import { useState } from 'react';
import { FiArrowUpRight } from 'react-icons/fi';
import ActionLink from './ActionLink';
import { credentialStatus, formatCredentialDate } from '../../utils/credentialStatus';

export default function CredentialEntry({ credential, prominent = false }) {
  const { t, language } = useTranslation();
  const [imageError, setImageError] = useState(false);
  const status = credentialStatus(credential);
  return (
    <li className={`credential-entry${prominent ? ' credential-entry--prominent' : ''}`}>
      <div className="credential-artwork">
        <Text>{imageError ? <p className="credential-image-fallback"><Text>{"Official badge image unavailable"}</Text></p> : (
          <img src={credential.image} alt={t("Official badge: {0}",[credential.name])} width={340} height={340}
            loading="lazy" decoding="async" onError={() => setImageError(true)} />
        )}</Text>
      </div>
      <div className="credential-copy">
        <p className="credential-issuer"><Text>{credential.issuer}</Text></p>
        <h4 lang="en"><Text>{credential.name}</Text></h4>
        <dl className="credential-dates">
          <div><dt><Text>{"Issued"}</Text></dt><dd><time dateTime={credential.issuedOn}><Text>{formatCredentialDate(credential.issuedOn, language)}</Text></time></dd></div>
          <div>
            <dt><Text>{"Validity"}</Text></dt>
            <dd>
              {status === 'dated' ? <time dateTime={credential.expiresOn}>{t('Expires {0}.', [formatCredentialDate(credential.expiresOn, language, 'long')])}</time>
                : status === 'expired' ? <><Text>{"Expired."}</Text>{' '}<time dateTime={credential.expiresOn}>{formatCredentialDate(credential.expiresOn, language, 'long')}</time></>
                : <Text>{status === 'non-expiring' ? 'Does not expire.' : 'No expiration date specified.'}</Text>}
            </dd>
          </div>
        </dl>
        <Text>{status === 'expired' && <p className="credential-expired"><Text>{"Expired credential. Retained as a record of learning."}</Text></p>}</Text>
        <ActionLink href={credential.url} target="_blank" className="credential-verify"
          aria-label={t("Verify credential: {0} on Credly (opens in a new tab)",[credential.name])}><Text>{"Verify credential"}</Text>{' '}<FiArrowUpRight aria-hidden="true" focusable="false" />
        </ActionLink>
      </div>
    </li>
  );
}
