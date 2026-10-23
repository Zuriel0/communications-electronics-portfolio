// Issuer dates are date-only. Keep them stable across the visitor's time zone.
export function credentialStatus(credential, today = new Date().toISOString().slice(0, 10)) {
  if (!credential.expiresOn) return 'expiry-not-listed';
  return credential.expiresOn < today ? 'expired' : 'dated';
}

export function formatCredentialDate(date) {
  return new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeZone: 'UTC' })
    .format(new Date(`${date}T00:00:00Z`));
}
