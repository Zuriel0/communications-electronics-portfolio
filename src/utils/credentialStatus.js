// Issuer dates are date-only. Keep them stable across the visitor's time zone.
export function credentialStatus(credential, today = new Date().toISOString().slice(0, 10)) {
  if (!credential.expiresOn) {
    // Missing metadata is never evidence of lifetime validity. Require an explicit,
    // traceable issuer statement before a record can use the non-expiring state.
    const evidence = credential.nonExpiringEvidence;
    return evidence?.confirmedByIssuer === true && /^https:\/\//.test(evidence.url || '') && evidence.statement?.trim()
      ? 'non-expiring' : 'expiry-not-listed';
  }
  return credential.expiresOn < today ? 'expired' : 'dated';
}

export function formatCredentialDate(date, language = 'en', dateStyle = 'medium') {
  return new Intl.DateTimeFormat(language, { dateStyle, timeZone: 'UTC' })
    .format(new Date(`${date}T00:00:00Z`));
}
