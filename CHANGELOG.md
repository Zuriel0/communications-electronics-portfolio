# Changelog

## v1.1.0 — Bilingual Engineering Portfolio

Second formal release, consolidating ANX-012, ANX-012.1 and ANX-012.2.

### Added

- Complete English/Spanish language support with an accessible selector, persistent preference and route-specific metadata.
- Expanded professional capabilities organized into six areas, with explicit professional, project, laboratory, credential and learning contexts.
- AWS Certified Solutions Architect – Associate (SAA-C03) certification preparation, separate from earned credentials.
- Contextualized networking, cloud, backend and virtualization experience, including owner-confirmed vendor scope.

### Improved

- Credly expiration labels: localized dates, unspecified expiry, explicit issuer-confirmed non-expiring policies and expired records, preserving all 18 verified records and individual links.
- Technical Spanish and English copy across the portfolio, both case studies, six diagrams and accessible controls.
- Case-study loading performance: editorial content renders independently of the React Flow runtime.
- Responsive and accessible language controls; language changes retain route/hash, Hero pause and diagram pause/zoom.
- Independent deferred loading of engineering diagrams near the viewport, immediate loading for direct diagram hashes, stable geometry and accessible loading/error recovery.
- Bilingual catalog storage, removing repeated source-language values without adding an i18n dependency.

### Refined

- Removed legacy capabilities disclosure from the public interface.
- Consolidated relevant, evidenced technologies into six professional areas without duplicate entries.
- Preserved original technical evidence and the previous capability inventory internally.
- Preserved Confluence, all six original diagrams (46 nodes / 37 model connections), playback, Fit View, keyboard navigation and reduced motion.

### Performance

Historical **local ANX-012.2** Lighthouse medians; these are not new v1.1.0 production measurements:

| Mobile route | EN LCP | ES LCP | EN / ES Performance | Accessibility | CLS |
| --- | ---: | ---: | ---: | ---: | ---: |
| Home | 2027 ms | 2027 ms | 99 / 99 | 100 | 0 |
| Concurrencia | 2277 ms | 2277 ms | 98 / 98 | 100 | 0 |
| Metodología | 2277 ms | 2275 ms | 98 / 98 | 100 | 0 |

Lighthouse 13.5.0, Chrome 155, Apple M4 Pro, simulated mobile 412×823 / DPR 1.75 / RTT 150 ms / throughput 1638.4 Kbps / CPU ×4. Three runs per route/profile/version in the EN comparison (36 runs), plus three candidate mobile runs per route in Spanish (9). Desktop EN medians: Performance/Accessibility 100/100, LCP 442/491/489 ms, CLS 0 and TBT 0. Mobile EN TBT medians: 1/0/0 ms; ES: 0/0/0 ms.

Application entry: 316,193 bytes JS. Static editorial JS closures, including the entry: 369,511 bytes for Concurrencia and 367,134 for Metodología. Graph runtime and six diagram entries load separately when needed. Integration reproduces the same 14 JS/CSS asset hashes; no runtime/dependency change requires another Lighthouse series.

These lab figures are not field Web Vitals, INP, FPS, CPU/energy measurements or hosting guarantees. See `docs/redesign/anx-012-2-report.md` for fresh baseline comparisons, ranges, configurations and full evidence.

### Validation and release boundaries

- Clean install, lint, build/manifest, **39/39 Node tests**, graph chunk checks and whitespace checks pass; current `npm audit` reports **zero vulnerabilities**.
- Current integrated-build UI checks preserve all six graphs, language/pause/zoom controls, Hero pause, 18 credential links, deep-link reload and console cleanliness.
- No manual deployment to anxzu.com. The domain is served by the separate `Zuriel0/page` repository; this release updates `Zuriel0/communications-electronics-portfolio` only.
- Physical devices, Safari, native screen readers, live system preference changes, actual hidden-tab recovery and production performance remain separate validation boundaries. Dense diagram overviews retain zoom controls and explanatory HTML.

See `docs/redesign/anx-012-3-release-report.md` and the v1.1.0 Release verification receipt for exact local/remote/tag SHAs and publication status.

## v1.0.0 — ANXZU: The Art of Engineering

First formal release, consolidating ANX-001 through ANX-011. Earlier main/dark-theme history had no version tags or GitHub Releases at the preflight. Version 1.0.0 establishes the reviewed portfolio baseline; the three public routes and existing hashes remain compatible.

### Added and improved

- Complete editorial redesign using local Inter and the Obsidian/Pearl token system.
- Confluence immersive Hero with ambient motion, restrained cursor depth, native-scroll transformation and accessible pause. Classic Hero remains available through `?hero=classic` and build configuration.
- Six animated React Flow diagrams with automatic visible-only playback, individual pause, reduced-motion state and existing zoom/Fit View controls.
- Responsive profile, capabilities, professional experience and direct contact scenes.
- Professional data modules and Credentials & Continuous Learning scene with 18 public Credly records: 16 issuer-classified certification records and two completed courses, based on ANX-009 verification.
- Two technical case studies with original architecture/process, clear contribution boundaries and qualified reported outcomes.
- Accessible navigation, keyboard focus, skip links, language scopes and persistent-motion controls.
- Route-based React.lazy/Suspense code splitting, stable loading/error recovery, responsive portrait derivatives and local fonts. React Flow remains out of the initial Home chunk.
- Route-specific titles, descriptions, canonical/Open Graph metadata, robots and sitemap.
- Node regression tests, project chunk checks, phase reports, visual evidence and technical evidence inventories.

### Integration and validation

- Preserve the relevant main, dark-theme and redesign histories; retain original branches and local backup references.
- Preserve existing project routes/hashes, full professional identity, official badge assets, original portrait and six technical diagrams.
- Reproducible install, lint, build/manifest, Node tests, chunk checks and diff validation documented in `docs/redesign/anx-011-release-report.md`.
- Previous Lighthouse numbers are measurements of local laboratory builds, not production Web Vitals or FPS.
- Update the development-only Zod lockfile resolution from 4.3.6 to 4.6.7 after a high-severity npm advisory; the final clean install/audit reports zero vulnerabilities. No runtime dependency or output changes.

### Known limitations

- Safari, physical touch devices, native browser zoom/screen-reader checks, live reduced-motion changes, actual hidden-tab behavior and energy/FPS profiling need further native validation.
- Hosting/staging deployment and configuration are outside this GitHub release. No manual production deployment is performed.
- Original monitor/customization implementation artifacts, performed tests, timing methodology and some professional contexts remain editorial evidence gaps. No unverified capabilities or outcomes are added.

See `docs/redesign/anx-011-evidence-report.md` and `docs/redesign/anx-011-release-report.md` for sources, results and exact integration/release verification.
