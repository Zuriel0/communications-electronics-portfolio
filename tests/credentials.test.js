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
