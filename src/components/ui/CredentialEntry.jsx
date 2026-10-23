import { useState } from 'react';
import { FiArrowUpRight } from 'react-icons/fi';
import ActionLink from './ActionLink';
import { credentialStatus, formatCredentialDate } from '../../utils/credentialStatus';

export default function CredentialEntry({ credential, prominent = false }) {
  const [imageError, setImageError] = useState(false);
  const status = credentialStatus(credential);
  return (
    <li className={`credential-entry${prominent ? ' credential-entry--prominent' : ''}`}>
      <div className="credential-artwork">
        {imageError ? <p className="credential-image-fallback">Official badge image unavailable</p> : (
          <img src={credential.image} alt={`Official badge: ${credential.name}`} width={340} height={340}
            loading="lazy" decoding="async" onError={() => setImageError(true)} />
        )}
      </div>
      <div className="credential-copy">
        <p className="credential-issuer">{credential.issuer}</p>
        <h4>{credential.name}</h4>
        <dl className="credential-dates">
          <div><dt>Issued</dt><dd><time dateTime={credential.issuedOn}>{formatCredentialDate(credential.issuedOn)}</time></dd></div>
          <div>
            <dt>{status === 'expired' ? 'Expired' : 'Expiry'}</dt>
            <dd>{credential.expiresOn ? <time dateTime={credential.expiresOn}>{formatCredentialDate(credential.expiresOn)}</time> : 'Not listed by issuer'}</dd>
          </div>
        </dl>
        {status === 'expired' && <p className="credential-expired">Expired credential. Retained as a record of learning.</p>}
        <ActionLink href={credential.url} target="_blank" className="credential-verify"
          aria-label={`Verify credential: ${credential.name} on Credly (opens in a new tab)`}>
          Verify credential <FiArrowUpRight aria-hidden="true" focusable="false" />
        </ActionLink>
      </div>
    </li>
  );
}
