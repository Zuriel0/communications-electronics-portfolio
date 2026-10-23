# ANX-011 — Git integration and official release report

2026-10-23 · ANXZU — The Art of Engineering.

## Repository, authorization and initial state

Repository: [Zuriel0/communications-electronics-portfolio](https://github.com/Zuriel0/communications-electronics-portfolio). Origin fetch/push: `https://github.com/Zuriel0/communications-electronics-portfolio.git`. The owner expressly authorizes commits, integration, push, an annotated version tag and a normal GitHub Release after validation. This does not authorize manual production deployment.

| Original ref | Initial SHA |
| --- | --- |
| `main`, `origin/main` | `b0d4e2bbc438aa53ea20d7d4f0c95a96aab5bf74` |
| `dark-theme`, `origin/dark-theme` | `5510d78c667d49107d8d595a1ae667d6ce221ee1` |
| `codex/anx-001-redesign-audit` | `5510d78c667d49107d8d595a1ae667d6ce221ee1`, with ANX-001–010 uncommitted |

Preflight ran status, branch/remote/log/tag inventories and `git fetch origin --prune --tags`. Local/remote original branch SHAs matched. No version tags or GitHub Releases existed. The repository is public and the authenticated account is Zuriel0 with administration/push permission. GitHub CLI was temporarily obtained from its official `cli/cli` release because it was not installed and the connected GitHub plugin has no Release creation tool. The owner completed GitHub device authentication; no token/password/device code is stored in repository documentation.

Initial stash `stash@{0}` (`095a457`) changes only package-lock.json and remains unapplied and intact. The pre-existing working-tree lockfile changes are preserved in the redesign commit; the stash is not treated as authorization to replace them.

## Backups and scope

Local backup refs: `backup/anx-011-main-before-20261023`, `backup/anx-011-dark-theme-before-20261023`, `backup/anx-011-redesign-before-20261023`. They retain the initial commits. An additional complete local snapshot of 426 tracked/untracked files was saved to `/tmp/anx011-working-tree-before.zip` before integration. [Initial inventory](reports/anx-011-preflight.json).

Local agent tooling, skills lock, installed packages, build output, private/runtime directories, environment files and private-key file types are excluded. No files are deleted to clean the checkout. Existing phase reports, screenshots and labelled candidate QA archives are intentional evidence and are retained. Heuristic scans of the 426 files and 55 archive members found no secret patterns or sensitive paths; [scan](reports/anx-011-sensitive-scan.json), [archives](reports/anx-011-archive-scan.json). These bounded scans are not a universal secret-detection guarantee.

## Integration strategy and conflicts

Important history finding: `main` and `dark-theme` have **unrelated roots**. Main was recreated at root commit `eaeb663`, followed by its README commit `b0d4e2b`. The old main tree lacks Router/Flow, contains generic project stubs with `#` destinations and older contact/responsibility text. It is not the more complete application merely because it is named main.

Dark-theme is already an ancestor of the redesign. The chosen integration branch is `codex/anx-011-release-integration`, created from fetched origin/main. A merge with `--allow-unrelated-histories --no-ff --no-commit` connects main to the committed redesign, automatically including dark-theme ancestry once. No global `-X ours`/`-X theirs`, reset, force push or history deletion is used.

There were **25 add/add conflicts**. [Every path and decision](reports/anx-011-merge-decisions.json) is recorded. Reviewed current source/data/configuration wins over older generic versions where required to preserve actual routes, owner content, contact links, accessible navigation, diagrams, tokens and metadata. Package.json retains Router and Flow; package-lock retains the already used resolutions, then receives the narrowly scoped security fix below. README is rewritten for the actual release and retains hosting guidance through the preserved configuration references. Gitignore combines LF formatting with local/private exclusions. Main-only original Vite/React assets and the empty contact stylesheet are retained as unused originals; they are not silently deleted.

Commits created before integration:

- `74a8250` — `feat: redesign ANXZU engineering portfolio (ANX-001–010)`; source and historical QA evidence.
- `b760c03` — `docs: inventory technical evidence and prepare v1.0.0 integration`; inventories, changelog, exclusions and whitespace normalization.

The merge and final documentation commit are discoverable without an unstable short-hash guess:

```sh
git log --format='%H %s' --ancestry-path b0d4e2b..v1.0.0
git show --no-patch --format='%H %P %s' v1.0.0^{commit}
git merge-base --is-ancestor b0d4e2b v1.0.0
git merge-base --is-ancestor 5510d78 v1.0.0
git merge-base --is-ancestor b760c03 v1.0.0
```

Only whitespace changes were made to highlevel_flow.jsx, skills.js and Concurrencia.jsx. Original source compares identically after trimming trailing line spaces. Generated historical HTML/CSV/log whitespace and OFL whitespace were also normalized when first staged; measurements, credential data, license wording, fonts and artwork remain unchanged. No graph model, edge, animation/controller, position, framing or runtime behavior was edited for this release. [Preservation and generated output comparison](reports/anx-011-preservation.json).

## Validation

| Check | Result / evidence |
| --- | --- |
| `npm ci` | Passed; [final clean install](reports/anx-011-npm-ci-final.txt) |
| `npm run lint` | Passed without lint warnings; [log](reports/anx-011-lint.txt) |
| `npm run build -- --manifest` | Passed, 300 modules; [log](reports/anx-011-build.txt) |
| `node --test tests/*.test.js` | **27/27 passed**; [log](reports/anx-011-tests.txt) |
| `node scripts/check-project-chunks.mjs` | Passed: Home excludes Flow/d3/zustand; two dynamic case routes retained; [log](reports/anx-011-chunks.txt) |
| `git diff --check` and staged diff check | Passed after whitespace normalization; no unresolved conflicts |
| `npm audit` | Final **0 vulnerabilities**; [JSON](reports/anx-011-audit-final.json) |

The first clean install detected a high-severity advisory in development-only Zod4.3.6, pulled by eslint-plugin-react-hooks. A targeted lock-only update changed **only `node_modules/zod` to4.6.7** within the existing allowed range. Package.json and runtime dependencies were not broadened. A second npm ci, lint/build/tests and audit validate the result. [Before audit](reports/anx-011-audit-before.json), [official advisory GHSA-mrhx-c7xc-m3w5](https://github.com/advisories/GHSA-mrhx-c7xc-m3w5). No exploitability claim is made for this static site. npm’s allow-scripts notices for esbuild/fsevents remain notices; no global approval/security policy was changed and build passes.

### Functional and visual checks

[Structured validation](reports/anx-011-validation.json) records the integrated build:

- Three routes × widths320/375/768/1024/1440: one h1/main, no duplicate IDs, clientWidth=scrollWidth, 0/4/2 Flow instances. The useful width is15px below the requested width in this browser due to its scrollbar.
- Default immersive Hero running; Pause/Resume toggles aria-pressed and data-motion-running, with3px keyboard focus. View Projects focuses `#projects` at about104px below the header and suspends the offscreen Hero. `?hero=classic` shows the preserved alternative, same name and CTA destinations.
- All six diagrams progress to a new phase automatically while visible; each is the sole playing figure in its tested view. Enter pauses and resumes each. Zoom In changes each scale; Fit View is exercised. No architecture/model/animation changes were needed.
- Credly18 entries, 18 unique individual badge URLs matching the data module, correct safe rel attributes and keyboard disclosure. Verification metadata remains the ANX-009 snapshot; this is not a claim of a new issuer-side revalidation.
- Skip link focuses main with3px outline; mobile menu Enter/Escape restores Open menu and expanded=false. Deep route/hash reloads for Concurrencia#highLevel and Metodología#introduce/#solucion focus their actual destinations near104px. Canonicals/descriptions remain correct.
- Both English cases, professional data and18 official badge assets remain intact. Mobile architecture overviews still require zoom for dense labels; HTML explanations remain available.
- Browser console inspection: no errors/warnings in the normal tested routes.

Integrated-build screenshots: [Home desktop](reports/anx-011-home-desktop.jpg), [Home mobile](reports/anx-011-home-mobile.jpg), [Credentials desktop](reports/anx-011-credentials-desktop.jpg). Detailed current case screenshots remain in [ANX-010](anx-010-report.md#evidencia-visual); source/output equality confirms they represent the same application presentation.

Reduced-motion startup was rechecked with Chrome headless using `--force-prefers-reduced-motion`, height1200, on Home and both case-diagram hashes. The actual captures show Motion reduced/Movimiento reducido and complete content. Accessibility100 on all three probes; these are separate local probes, not production results or a normal-motion performance comparison. [Home](reports/anx-011-reduced-home.json), [SSH](reports/anx-011-reduced-concurrencia.json), [methodology](reports/anx-011-reduced-metodologia.json). Live preference switching and a truly hidden native browser tab remain pending; controller unit tests cover those lifecycle states but are not passed off as native end-to-end evidence.

### Bundle and performance boundary

The generated JS, CSS and WOFF2 bytes/hashes are **identical to ANX-010**, despite the development-only security fix. [Final build manifest](reports/anx-011-build-final.json). Initial JS288593bytes, initial CSS42567bytes, shared case/Flow JS182432bytes and CSS21769bytes; case chunks41107/16489bytes. Two original main-only unused public/template assets are preserved without entering initial JS.

ANX-010 local mobile Lighthouse samples were P97/A100 with LCP2433/2468ms, CLS0 and TBT5.5/0ms. They are historical local measurements of this identical runtime output, not new normal-motion measurements or field results. No claim of production Lighthouse, INP, FPS, sustained CPU or energy is added. Dense diagrams and LCP near2.5s still justify physical-device/staging review.

## Technical evidence deliverables

[Evidence report](anx-011-evidence-report.md), [SSH implementation inventory](ssh-implementation-evidence.md), [AI customization inventory](ai-customization-evidence.md), [future cases](future-case-studies.md). Actual original project source/config/tests/timing methodology were not found. Owner-confirmed completion, portfolio declarations, executable website code and public credential records remain separate evidence classes. Public project texts/skills are not expanded automatically.

## Version, release and exact verification receipt

Selected **v1.0.0**: the first formal SemVer release; preflight had no tags/releases. This establishes the reviewed portfolio baseline while retaining all three public routes/hashes. The same number is used for an annotated Git tag and a normal, non-prerelease GitHub Release titled **ANXZU — The Art of Engineering**. [Changelog](../../CHANGELOG.md).

Canonical release: [v1.0.0](https://github.com/Zuriel0/communications-electronics-portfolio/releases/tag/v1.0.0). Immutable final-main target: [`v1.0.0^{commit}`](https://github.com/Zuriel0/communications-electronics-portfolio/commit/v1.0.0).

The literal final-main SHA, annotated tag object SHA, remote refs, actual release ID/URL/draft/prerelease status, created commits, push result and clean working-tree verification are recorded **after push/tag/release in the attached [release-verification.json](https://github.com/Zuriel0/communications-electronics-portfolio/releases/download/v1.0.0/release-verification.json)**. This post-publication receipt is part of the closing report. Keeping it as a release asset avoids the impossible requirement for a commit to contain its own final hash. Release notes repeat the literal target SHA. These links are intended targets while preparing; **the release is only complete once the receipt and remote verification actually exist**. The final task response must report the observed outcome, not infer success from this plan.

Local/remote verification commands:

```sh
git rev-parse main
git rev-parse v1.0.0^{commit}
git cat-file -t v1.0.0
git ls-remote origin refs/heads/main refs/tags/v1.0.0 'refs/tags/v1.0.0^{}'
git status --short
```

The annotated tag is created only after origin/main contains the validated commit, then pushed without force. The GitHub Release is published only after remote tag verification. Original dark-theme/redesign branches and backup refs are not deleted. If a protection/push/authentication check fails, the report/receipt must record a blocked result instead of success; protections are never bypassed.

## Hosting and remaining limitations

Authenticated preflight found: no repository webhooks (`[]`), no Actions workflows (`total_count=0`), no GitHub Pages site (404), no rulesets (`[]`), main not branch-protected (404) and no deployment records (`[]`). No repository-visible push/tag deployment mechanism was found. Hosting-side Git polling or external integrations not exposed by the repository cannot be ruled out. No hosting credentials, configuration, manual upload or production deployment command is used. A GitHub push/release is not proof anxzu.com changed; no production deployment is claimed.

Before a separately authorized hosting release: verify staging/rewrites/cache/MIME/deep links, Safari, physical devices, native zoom/screen readers, preference changes in session, real hidden-tab recovery and energy/FPS. Before deeper editorial claims: supply sanitized original implementation/configuration/tests, timing methodology, precise contribution and professional context. Current high-priority integration defects are resolved in the checks above; these limits remain explicit.

No later phase is started. The final publication and working-tree state are verified by the release receipt rather than asserted in advance.
