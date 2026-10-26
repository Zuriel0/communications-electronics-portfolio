# ANX-013.3 evidence — NO-GO v1.2.0

These receipts record an attempted publication and the verified rollback, not an approved Nodalume production release.

- `git-preflight.json` and `github-preflight.json`: initial state, rules and integration inputs.
- `build-preservation.json`, `tag-build-verification.json`: immutable v1.2.0 build reproduction.
- `public-http.json` and `deployment-status.json`: resources and Pages succeeded before language QA failed; HTTP success is not editorial acceptance.
- `public-qa-failure.json/.jpg`: Spanish page containing untranslated editorial arrays.
- `rollback-actual.json`, `rollback-deployment-status.json`, `rollback-public-http.json`, `rollback-browser.json`: v1.1.0 recovery verified remotely and in the browser.
- `integrated-browser.json`: original candidate control checks; these missed the editorial-array defect.
- `correction-*`: unpublished corrected branch checks (53 tests, complete restored copy in both languages at six widths, eight Nodalume plus six original diagrams). These are not v1.2.0 tag results.
- `npm-audit.json`: zero vulnerabilities at release preflight.

All timestamps and hashes belong to the recorded attempt. Absolute temporary paths in command output identify the original local measurement environment, not portable dependencies. No private Nodalume runtime or service was queried. Public Lighthouse was stopped after the QA failure; there are no new production Lighthouse results in this evidence set.
