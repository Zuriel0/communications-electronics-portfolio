# ANX-013.3 — v1.2.1 production evidence

This directory records the explicitly authorized corrected replacement for withdrawn v1.2.0. The parent directory preserves the failed attempt and verified v1.1.0 rollback.

- `preflight.json`, `source-publication.json`, `backup.json`: remote refs, rules, exact source tag/Release correspondence and new independent production backup.
- `npm-ci.txt`, `lint.txt`, `build.txt`, `tests.txt`, `chunks.txt`, `diff-check.txt`, `audit.txt`: final integrated checks (53 tests, zero vulnerabilities).
- `tag-*`: clean immutable-tag build/test reproduction and equality of 19 JS/CSS assets.
- `artifact-manifest.json`, `deployment-marker.json`, `deployment-diff.json`, `production-diff.txt`: reviewed deployment bytes and preservation checks. The ZIP is attached to the GitHub Release rather than duplicated here.
- `local-http.json`, `public-http.json`: SHA-256 checks of resource bodies and all four direct routes, including slash redirects. Public dot configuration files are intentionally excluded from HTTP checks; they are present in Git and the artifact.
- `deployment-status.json`, `pages-progress.json`, `domain-verification.json`: actual Pages workflow success, trusted HTTPS, DNS and public deployment marker.
- `rollback-rehearsal.json`: isolated pre-push revert recreates the remote v1.1.0 backup tree. No rollback was needed for v1.2.1.
- `public-copy.json`, `public-responsive.json`, `public-*desktop.json`, `public-*mobile.json`, `public-previous.json`, `public-menu-and-readings.json`: real browser observations of complete restored EN/ES copy, 48 responsive route/language cases, 14 diagrams, mobile controls, semantic alternatives and focus/persistence.
- `motion-check/results.json` and compressed reports: 15 read-only audits against real public routes with the browser media preference forced to reduced motion; the preference itself is verified. A100 for each audit.
- `lighthouse/`: fresh normal-motion public Home/Nodalume mobile/desktop measurements, three serial runs per profile, full compressed Lighthouse JSON, configurations, ranges and medians. These are lab measurements on production URLs, not field metrics.
- `bundle-sizes.json`: raw/gzip level 9 file calculations, independent of Lighthouse scores.
- Public desktop/mobile screenshots show the corrected release. Static images do not prove motion; the browser receipts record observed signal movement and control state.

The browser helpers were executed with documented cua_repl APIs. Lighthouse extension scripts use read-only diagnostics. Temporary absolute paths in historical command output identify the original local environment; set them to your local Lighthouse installation and output directory when reproducing. No app dependency was added.
