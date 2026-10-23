# ANXZU — The Art of Engineering

Andres Zuriel Macias Rios’ engineering portfolio. React, Vite, React Router and React Flow power an editorial interface with a reversible immersive Hero, professional profile, two technical case studies and a Credentials & Continuous Learning scene.

## Local setup

Validated with Node 24.19.0 and npm 11.17.0. Install the committed dependency resolutions, then start the development server:

```sh
npm ci
npm run dev
```

To review the production build locally:

```sh
npm run build -- --manifest
npm run preview -- --host 127.0.0.1 --port 4173
```

## Validation

```sh
npm run lint
npm run build -- --manifest
node --test tests/*.test.js
node scripts/check-project-chunks.mjs
git diff --check
```

The chunk check ensures React Flow and graph-specific dependencies remain outside the initial Home import graph. Tests cover website behavior; they do not validate executable implementations of the projects described in the case studies. Previous Lighthouse results are local laboratory measurements, not production performance or FPS.

## Experience and routes

- `/`: Confluence Hero, profile, projects, capabilities, experience, credentials and contact.
- `/projects/concurrencia`: concurrent SSH log-monitor case with four original animated diagrams.
- `/projects/metodologia`: AI-assisted customization methodology with two original animated diagrams.

Existing public hashes remain compatible. Each diagram has pause/resume and zoom/Fit View controls; playback stops outside the viewport, while the document is hidden or with reduced motion. The Hero also provides pause and a static reduced-motion composition.

The immersive Hero is the default. Use `/?hero=classic` to review the preserved alternative. `VITE_HERO_VARIANT=classic npm run build` selects the classic default without removing the immersive implementation.

Inter is served locally under the license in `public/Inter-OFL.txt`. The real portrait original is preserved alongside responsive derivatives. Official Credly images and 18 public records are documented in the ANX-009 report; completed courses are distinguished from certification records. Public data verification is a dated snapshot, not an assertion of permanent validity.

## Content and evidence

Project narratives separate the owner’s account, documented design and qualified reported outcomes from independently verified implementation. The SSH scope remains six Web servers, two RADIUS available and one active, with independent supervision. The customization method preserves its six stages and human validation. No client, implementation code or test result is invented.

- [Changelog](CHANGELOG.md)
- [Release and integration report](docs/redesign/anx-011-release-report.md)
- [Technical evidence inventory](docs/redesign/anx-011-evidence-report.md)
- [Professional evidence register](docs/redesign/professional-evidence.md)
- [Design system](docs/redesign/design-system.md)

Phase reports and visual evidence are retained in `docs/redesign/`. Local agent tools, `.env` files, secrets, installed dependencies and build output are excluded from Git. Do not commit private keys or unauthorized client material.

## Hosting boundary

GitHub version publication does not authorize a manual hosting deployment. No deployment command is part of these npm scripts. The repository retains `public/.htaccess` and `public/_redirects` for the originally documented Apache/LiteSpeed and SPA-fallback use cases; verify the actual provider, redirects, MIME types, cache strategy and deep-route reloads in authorized staging before deployment.

ANX-011 found no GitHub Actions workflows, repository webhooks, GitHub Pages site or deployment records. An external hosting integration or polling configuration outside the repository cannot be ruled out. The release report records what was actually verified; a Git push is not evidence that anxzu.com was deployed.

## Known validation limits

Native Safari, physical touch devices, native zoom/screen readers, live reduced-motion changes, real hidden-tab checks and sustained energy/FPS measurements remain separate follow-up work. Review original project artifacts and professional context before expanding public claims. The GitHub release does not certify complete WCAG conformance or production Web Vitals.
