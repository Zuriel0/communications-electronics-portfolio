# SSH implementation evidence

ANX-011 · 2026-10-23. Reference inventory; no changes to the public case study.

## Source boundaries

The owner explicitly confirms a completed project in ANX-010. The portfolio describes the owner developing/designing the tool. This establishes the owner’s account, not independent execution verification. Sources: `src/data/projects.js`, `src/components/sections/introduce.jsx`, original prose/diagrams archived in `reports/anx-010-source-inventory.json`, and [the A–K editorial draft](case-study-concurrencia.md).

The three Git branch trees and local project sources were inspected. No implementation repository, executable Bash monitor, real configuration sample, sanitized output or monitor test suite is present. Node scripts and `anx-008-cpu-method.py` test/profile the portfolio; they are not implementations of the monitor. The pre-existing stash changes only the npm lockfile and remains unapplied.

## Evidence matrix

| Claim | Declaration / presentation evidence | Executable code, configuration or test evidence | Status |
| --- | --- | --- | --- |
| Ubuntu, Bash and SSH | Original/current case, project data, architecture diagram | No monitor script or supported version record | Documented project account |
| MAC validation, normalization and matching | Logic diagram and original execution narrative | No actual parser, matching implementation or input/output fixture | Behavior described, algorithm unverified |
| Six Web servers | Narrative, logic and architecture models | No actual inventory/configuration | Preserve six; the load-balancer drawing has three representative destinations |
| Two RADIUS available, one active | Narrative and architecture | No selected-target configuration/run | Preserve selection; no automatic failover claim |
| Independent Web/RADIUS supervision | Business/logic/architecture diagrams | No lifecycle/process supervision implementation or run | Design documented; scheduling/cleanup not proven |
| Optional narrowing of Web searches | Logic policy and original narrative | No policy implementation or on/off observations | Search sessions only; not server shutdown |
| Central console with origin | Diagrams and narrative | No actual sanitized console log | Qualitative reported outcome; no timing benchmark |
| FreeRADIUS / NGINX | Existing log-path labels | No product/version/configuration/admin-role artifact | Pathname alone does not verify deployment or expertise |
| Four animated diagrams | Actual React components and ANX-008 controllers/tests | Executable React presentation code | Verified as portfolio functionality, not real network traffic |

The business path is conditional Web success → RADIUS authentication. Concurrent observation is a different concern; preparation does not become parallel simply because remote observers coexist. Illustrative edge timing is not evidence of process order, latency or throughput.

## Specific evidence requests

1. Sanitized source repository/revision and README; identify what the owner authored, adapted or reviewed and any collaborators.
2. Actual configuration schema/sample: target groups, active RADIUS choice, connection parameters, optional Web policy. Redact hostnames, accounts and secrets before inclusion.
3. An authorized actual run with non-client test identifiers showing MAC input, source-labelled matches, policy behavior and independent RADIUS observation.
4. Tests actually executed, dates, environment, input/expected/observed output. Clarify validation, disconnects, termination/cleanup and other coverage from evidence rather than presumed best practice.
5. For any future speed/reliability statement: raw observations, task boundaries, sample count and comparable environment. No metric is added in this phase.

Do not request private keys, production credentials or unauthorized client logs. A proposed test plan is not a passed test. Deployment ownership/employer context remains separate from authorship of a monitoring tool.

## Review links and limits

[ANX-011 evidence report](anx-011-evidence-report.md), [release report](anx-011-release-report.md), [professional register](professional-evidence.md). Existing screenshots demonstrate the case presentation, not implementation behavior. No additional original technical artifact was found or invented; this document records the gap for a future authorized editorial phase.
