# Concurrent Log Monitor via SSH — editorial draft

ANX-010 · 23 October 2026 · Internal content review; not a script specification or test report.

## Evidence and voice

- **Confirmed by owner (C):** this project is completed (ANX-010 brief). Completion is not independent verification of functionality.
- **Existing portfolio account (P):** original `introduce.jsx`, `projects.js` and the four original diagrams. These describe behavior; they do not prove executable implementation or measured outcomes. Original prose is archived in `reports/anx-010-source-inventory.json`.
- **Editorial interpretation (I):** explanations of why the documented boundaries matter, explicitly framed as design implications, not measured discoveries.
- **Evidence needed (E):** implementation repository, sanitized execution records, test procedure and contribution details. Specific markers below stay internal.

The original account says “Desarrollé una solución…” and “diseñé una herramienta”. First person is retained only for developing/designing the monitor. It does not establish sole authorship, deployment ownership, infrastructure construction or affiliation with an employer/client.

## A. Project Overview

I developed a command-line tool to search remote logs for a specific MAC address from Ubuntu. The documented design uses Bash and SSH to monitor six web servers and one active RADIUS server, bringing matches into a single console. Two RADIUS servers are available; configuration selects one for each run. [P; completed status C]

The scope of my contribution described here is the monitoring tool. The underlying load-balanced service and authentication infrastructure are the environment being observed, not infrastructure claimed as my own implementation. [P; attribution boundary]

## B. Technical Challenge

A load balancer chooses which web server handles a request. An operator looking for a MAC address cannot know the destination in advance. Reviewing servers one at a time fragments the search across multiple locations. The original account describes authentication following successful web processing, introducing a second domain to observe. [P]

The load-balancer diagram illustrates destination uncertainty with three representative servers. The documented monitoring scope is six web servers; the drawing is a simplification, not a different inventory. [P]

## C. Requirements & Constraints

- Local execution from Ubuntu using Bash and SSH. [P]
- Input validation and normalization of a MAC address before searching. [P]
- Six web servers observed concurrently; one configured RADIUS target from two available servers. [P]
- Identify server origin, source type and matching log line in centralized output. [P]
- Keep Web and RADIUS supervision independent. [P]
- Optionally retain monitoring of the matching web server and stop the other web searches, without stopping RADIUS supervision. This concerns monitoring sessions, not shutting down servers. [P; terminology clarified]
- Connection parameters, server selection and Web policy are external configuration. No configuration format is documented. [P/E]

## D. System Architecture

The operator starts the tool in an Ubuntu terminal. A local orchestrator reads external configuration, opens remote SSH sessions and consolidates matches. The remote side has a Web group and a RADIUS group with independent observation. Both feed the operator’s console. [P]

### Diagram-to-narrative map

| Component / public hash | What it explains | Interpretation boundary |
| --- | --- | --- |
| `flow_loadbalance` / `#diagram-loadbalance` | Load-balancer destination uncertainty | Three representative destinations; actual documented scope six Web. Illustrative rotating destination is not a live request trace. |
| `bussiness_flow` / `#diagram-business` | Sequential business path and independent observation | Successful Web operation precedes authentication; observers can run concurrently. Do not conflate business order with monitoring scheduling. |
| `logic_flow` / `#diagram-logic` | MAC input, SSH branches, matching, output and optional Web policy | Static policy reference is not another data transfer. Stopping other Web searches leaves RADIUS independent. |
| `highlevel_flow` / `#diagram-highlevel` | Local orchestration/configuration and remote log sources | Log path labels are documentation examples, not proof of a particular deployed product/version or administrator responsibility. |

The existing `/var/log/nginx/access.log` and `/var/log/freeradius/radius.log` labels remain unchanged. They do not independently verify NGINX/FreeRADIUS administration or deployment. No new technology claim is derived from them. [P/E]

## E. Execution Workflow

1. Receive, validate and normalize the MAC input. [P]
2. Read Web inventory, RADIUS selection, connection parameters and optional Web policy. [P]
3. Prepare search patterns and start concurrent remote monitoring. [P]
4. Observe six Web sources and the selected RADIUS source independently. [P]
5. Present matches with server identity, source type and the matching line. [P]
6. When enabled, narrow Web monitoring to a matching server; continue RADIUS monitoring independently. [P]

These are documented responsibilities, not executable pseudocode. Validation/configuration precede monitoring. Concurrent observation does not imply that every operation runs in parallel. Web-to-RADIUS business progression remains conditional and sequential. [P/I]

## F. Engineering Decisions

**Search across possible destinations.** Concurrent Web observation addresses uncertainty introduced by load balancing. The design avoids requiring an operator to guess the destination. No latency improvement is quantified. [P/I]

**Separate observation domains.** Web narrowing is scoped to Web monitoring. RADIUS visibility is retained so a Web match does not remove the authentication view. [P]

**Select rather than monitor both RADIUS targets.** External configuration identifies one active RADIUS target per run. A second available server supports a different operational choice; this account does not establish automatic failover. [P/I]

**Consolidate output with origin.** Combining matches is useful only if the operator can still identify the source. The documented console retains that context. [P/I]

## G. Implementation Details

Public-safe scope: Bash coordinates the documented workflow on Ubuntu; SSH provides remote access; external configuration describes targets and policies; MAC matching feeds a central console. React Flow belongs to this portfolio’s explanation layer, not the Bash monitor. [P]

**[E-CON-IMPLEMENTATION — internal]** Obtain a sanitized script/repository revision, configuration schema/sample, supported Ubuntu/Bash versions and an execution walkthrough. Verify actual process launch/supervision, matching/normalization logic, SSH authentication/host verification, permissions, timeout/reconnect behavior, handling of disconnects, log rotation, signal cleanup and output interleaving before describing them. None is established by an animation or architecture drawing. Do not fill this gap with invented commands, algorithms or logs.

## H. Testing & Validation

No monitor test artifacts are available. The portfolio’s lint/build/diagram tests validate this website only. Manual validation requirements below are an **evidence request**, not tests asserted as run.

**[E-CON-TESTS — internal]** Request dated test cases, environment/configuration and sanitized actual/expected observations for: valid/invalid MAC forms; matching and non-matching events across all six Web sources; each RADIUS selection; optional Web policy on/off; continued RADIUS observation after Web narrowing; interrupted SSH; stopping the tool and resource cleanup. Confirm which cases were actually executed and by whom. Do not present this proposed coverage as a passed suite.

## I. Results

The owner confirms a completed project. The existing account reports a single operational view replacing separate manual searches, with server attribution and independent Web/RADIUS monitoring. [C/P]

The earlier “faster diagnosis” language is qualitative and self-reported. The public case uses the concrete workflow change rather than a speed guarantee. No benchmark, event volume, reliability rate or production deployment is asserted.

**[E-CON-RESULTS — internal]** Sanitized output or a real recorded run would demonstrate the result. Comparative timing needs task definitions, sample count, environment and raw durations. Deployment status, employer/client association, collaborators and exact individual scope need owner confirmation before attribution.

## J. Skills Demonstrated

In the documented project account: Bash automation, Ubuntu terminal workflows, SSH-based remote observation, MAC-oriented troubleshooting, separating monitoring policy from business flow and architecture communication. These are project-context claims, not externally verified employment or certification. React Flow is observable in the presentation repository only. [P]

## K. Lessons Learned

Public editorial takeaway: observation order and business order describe different things. A successful Web step can precede RADIUS authentication while both domains are monitored concurrently. An optional policy should retain its documented scope so narrowing one view does not remove the other. [I grounded in P]

These are lessons **from the documented design**, not invented memories of incidents. **[E-CON-LESSONS — internal]** Ask for a concrete implementation difficulty, alternatives actually tried, the owner’s decision and observed consequence before adding a retrospective in first person.

## Presentation, verification and remaining review

Public content follows A–F, documented G, qualified I, J and design takeaway K. H remains internal until actual tests exist; no empty Testing section or provisional marker is shipped. Four diagrams remain byte-identical, including controls, animation, model and framing. All legacy hashes remain. English prose surrounds Spanish diagrams in explicitly Spanish language containers.

Code changes, route/keyboard/viewport checks, bundle measurements and screenshots: [ANX-010 report](anx-010-report.md). Website checks must never be described as monitor validation. Before publication, review contribution scope, original claims and the evidence requests above. The local case can be reviewed without those deeper artifacts; it cannot claim an independently verified implementation.
