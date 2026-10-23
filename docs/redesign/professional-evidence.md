# Professional evidence register

ANX-010 · 23 October 2026 · Internal inventory; does not add published skills or modify ANX-009 data.

## Classification

**C:** direct owner confirmation. **P:** existing portfolio declaration, not externally verified employment or executable proof. **O:** observable in this repository. **D:** public issuer record checked in ANX-009, not revalidated in ANX-010. **I:** editorial inference, not publishable as personal experience. **E:** context/artifact needed.

The complete previous 50-row inventory remains [ANX-009 skills](reports/anx-009-skills.csv). No prior capability is deleted because it has an incomplete context. This register adds the separation needed for technical storytelling; it does not promote pending technologies into the website.

## Declared professional experience

| Context | Supported declaration | Evidence | Status / remaining verification |
| --- | --- | --- | --- |
| DataWifi, 2025–Actualidad | Captive-portal requirements, preliminary solution design, multibrand controller configuration, demos, accounts in Mexico | `src/data/timelineData.js`, id1 | P. Confirm current employment/end date; multibrand does not identify a specific vendor. |
| Servnet, 2023–2025 | Presales area, services/architectures/docs, sizing, requirements and proposals for connectivity, IP telephony, security and networks | Same, id2 | P. No employer endorsement or new metrics. |
| End To End, 2022–2023 | Internal React automation, support, functional analysis and proposals | Same, id3 | P. Does not prove backend Node or cloud production. |
| M.T. de México, 2022–2022 | Debian NAS, SAMBA, Apache, MariaDB/PHP, VLAN/dynamic routing, users/privileges/RAID panel | Same, id4 | P. Months and contribution artifacts needed for precision. Year overlap alone does not prove inconsistency. |

Periods remain unchanged. RFP/SOW/site surveys and BGP/OSPF remain prior declarations in `skills.js`; confirm concrete deliverable, project context and role before adding depth. Institution/degree dates remain undocumented; keep the confirmed professional title without inventing an issuing institution.

## Implemented projects

| Project | Confirmed / documented | What is observable | Needed for deeper claims |
| --- | --- | --- | --- |
| Concurrent Log Monitor via SSH | C: completed. P: owner developed/designed tool; Ubuntu/Bash/SSH, MAC search, six Web, two RADIUS available/one active, independent supervision, centralized output, optional Web policy | O: case prose and four interactive presentation diagrams | E: actual script revision, configuration, sanitized execution/tests, exact contribution/collaboration and deployment context. No employer assigned. |
| AI-Assisted Customization Methodology | C: completed. P: owner designed six-stage method; source restrictions, external customization, context, assisted generation and human review; reported 8–14h→1–2h | O: case prose and two presentation diagrams | E: actual example/code/context, review record, integration status and timing method/raw sample. No product/client/model assumed. |
| ANXZU portfolio | O: React/JavaScript/Vite/Router/React Flow/CSS; Node scripts and Git repository | Source and build checks | Repo tooling does not prove backend Node, a production cloud role or implementation of the SSH monitor in React. |

## Performed labs

No performed lab is established by the inspected sources. This is an evidence gap, **not a claim that none were ever performed**. Request an owner description, date, topology/configuration, outputs and personal role; record lab vs production explicitly. Neither a learning focus nor a course credential establishes a particular lab implementation.

## Verified credentials and training

ANX-009 checked 18 public records: 17 Extreme Networks and one Cisco. Its conservative classification is 16 issuer-classified Certification records and two completed courses (Extreme Platform ONE Introduction – Solutions Design; Cisco Python Essentials 1). Three records list September2029 expiry; other records show no expiry date. Status is a snapshot at ANX-009 review, not a perpetual guarantee.

Sources: [ANX-009 exact names, dates, links and limits](anx-009-report.md#credly-fuentes-y-clasificación), [public source records](reports/anx-009-credly-sources.json), `src/data/credentials.js`, and [owner profile](https://www.credly.com/users/andres-zuriel-macias-rios). No new query or credential change in this phase. Courses are not CCNA/AWS certifications. ExtremeCloud is not AWS experience. No active learning enrollment is documented.

## Technologies needing complementary evidence

| Technology | Available context | Classification | Evidence needed before new public skill/experience claim |
| --- | --- | --- | --- |
| AWS VPC | No specific configuration or lab artifact | E | Owner role; lab/production distinction; sanitized network design/configuration and dated output |
| AWS EC2 | No instance or deployment artifact | E | Workload, role, lab/production scope and actual deployment record |
| AWS IAM | No policy or role example | E | Sanitized policy/role, task and environment context |
| AWS S3 | No application/storage artifact | E | Purpose, configuration, role and lab/production context |
| AWS NAT Gateway | No topology/configuration artifact | E | Actual route/network design, environment and owner contribution |
| Docker | No containerized application established | E | Dockerfile/compose or equivalent artifact and project/lab/production scope |
| Node.js | Build/QA scripts in this repo | O for tooling; E for backend | Actual service implementation, responsibility and operating context; do not convert build tooling into backend expertise |
| PostgreSQL | No specific database implementation | E | Schema/query or application artifact, role and environment; MariaDB is not PostgreSQL evidence |
| FreeRADIUS | `/var/log/freeradius/radius.log` label in existing high-level diagram only | P diagram label; E for implementation | Product/version, actual configuration or authorized run, environment and whether the owner monitored, administered or deployed it. A pathname is insufficient to verify any of these. Keep protocol-level RADIUS claim separate. |
| MikroTik | Unspecified multibrand controller work | E | Specific platform/task, role and sanctioned artifact; do not infer from multibrand |
| Fortinet | Unspecified multibrand/security work | E | Specific product/task, role and lab/production evidence |
| Aruba | Unspecified multibrand controller work | E | Specific controller/design, role and lab/production evidence |
| Ruckus | Unspecified multibrand controller work | E | Specific controller/design, role and lab/production evidence |
| Huawei | No specific product implementation | E | Product/task, role and actual project/lab/training evidence |

NGINX likewise appears in a log path, not verified administration. Git is observable in this repo; that does not establish its use in a specific employer’s delivery process. Python is supported as completed training; CCNA and Cisco networking deployment remain separate, unverified questions.

## Editorial decisions, validation and risks

No changes to `professionalProfile.js`, `skills.js`, `timelineData.js`, `credentials.js` or Credly UI/assets are needed. The two internal case drafts identify every unsupported essential section and its requested evidence. Public copy uses qualified owner-reported outcomes and design reasoning, without placeholder sections or invented testing results.

Source archive/preservation, website tests, screenshots, bundle impact and limitations are in [ANX-010 report](anx-010-report.md). Screenshots validate the website presentation, not work history or project implementation. Before publication review job dates, ownership/collaboration, confidentiality and result provenance. No external employment verification, new certification verification or AWS/lab validation was performed in this phase.
