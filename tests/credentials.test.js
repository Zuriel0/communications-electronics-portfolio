import assert from 'node:assert/strict';
import { test } from 'node:test';
import { credentialStatus, formatCredentialDate } from '../src/utils/credentialStatus.js';

test('credential dates distinguish an unspecified expiry from a current or expired date', () => {
  assert.equal(credentialStatus({ expiresOn: null }, '2026-10-23'), 'expiry-not-listed');
  assert.equal(credentialStatus({ expiresOn: '2029-09-09' }, '2026-10-23'), 'dated');
  assert.equal(credentialStatus({ expiresOn: '2029-09-09' }, '2029-09-09'), 'dated');
  assert.equal(credentialStatus({ expiresOn: '2029-09-09' }, '2029-09-10'), 'expired');
  assert.equal(formatCredentialDate('2026-10-16'), 'Oct 16, 2026');
});

// Explicit issuer evidence is required; a missing date alone never means perpetual.
test('four validity states require evidence and preserve real localized dates', () => {
  const issuer = {confirmedByIssuer:true, url:'https://issuer.example/credential-policy', statement:'This credential does not expire.'};
  assert.equal(credentialStatus({expiresOn:null,nonExpiringEvidence:issuer}), 'non-expiring');
  for (const nonExpiringEvidence of [undefined,{}, {...issuer,confirmedByIssuer:false}, {...issuer,url:''}, {...issuer,statement:''}]) {
    assert.equal(credentialStatus({expiresOn:null,nonExpiringEvidence}), 'expiry-not-listed');
  }
  // A supplied date takes precedence over any conflicting policy statement.
  assert.equal(credentialStatus({expiresOn:'2029-09-09',nonExpiringEvidence:issuer},'2026-10-24'),'dated');
  assert.equal(credentialStatus({expiresOn:'2023-04-26',nonExpiringEvidence:issuer},'2026-10-24'),'expired');
  assert.equal(formatCredentialDate('2029-09-09','en','long'),'September 9, 2029');
  assert.equal(formatCredentialDate('2029-09-09','es','long'),'9 de septiembre de 2029');
});
