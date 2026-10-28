# Nodalume Web — repository separation

NDL-WEB-002, 2026-10-27. The isolated product microsite now lives in [Zuriel0/nodalume-web](https://github.com/Zuriel0/nodalume-web). Its published NDL-WEB-001 baseline is [nodalume.anxzu.com](https://nodalume.anxzu.com/), commit d4f833004cba3c24aa4a252fa075d6fca250617f, [workflow 40629182568](https://github.com/Zuriel0/nodalume-web/actions/runs/40629182568).

Before migration, the clean ANXZU working branch was codex/ndl-web-001-creative-systems at a5c396a5aef4cb9fb005828f7b00f596a20e8d0c. A backup branch codex/backup-ndl-web-001-20261027 and a verified local Git bundle preserve that state. No history, tags or branches were rewritten.

The new repository's initial root tree matches the original microsites/nodalume subtree exactly: faa0addb2dcfc408c05ed2edc39f8429bb7dab5f. Its 62 tracked files were verified against the migration inventory. Publication was verified through the custom domain with a trusted certificate, Enforce HTTPS, matching HTML and assets, EN/ES, navigation, manual pause and reduced motion before removing the original copy.

This separation removes only microsites/nodalume and restores the ESLint root configuration that predated it. Generated local node_modules/dist for that microsite were also removed after the verified migration. The public engineering case at /projects/nodalume is unrelated to the microsite package and remains intact, as do Home, Concurrencia, Metodologia, credentials, translations, SEO and all diagrams.

All official ANXZU checks passed: npm ci, lint, build with manifest, 53 tests, project chunk check, whitespace check and npm audit (zero vulnerabilities). An exported v1.2.1 baseline was built with the same installed lockfile/toolchain: all 53 production files match byte for byte. See [machine-readable evidence](reports/ndl-web-002/separation.json).

The pending documentation commit 6766c582f42611ace02fe46725307d2d16540afa is integrated with its history. There are no unrelated code changes to integrate. The resulting source main is not a production deployment: Zuriel0/page was not modified and its HEAD remains a256bf8cf9805fdf7db912d0d7816adedd247e6b. Public Home and Nodalume-case HTML hashes before and after publication match. No new ANXZU release or tag is created.

Creative evolution continues only in the independent repository's codex/ndl-web-002-creative-evolution branch. Source and deployment lifecycles are separate.
