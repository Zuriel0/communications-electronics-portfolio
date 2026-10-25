// Sanitized explanatory models from a read-only pinned source review.
// No live traffic, lab identifiers or private source content.
export const engineeringSystems = [
  {
    "kind": "authentication",
    "id": "diagram-nodalume-authentication",
    "title": "Authentication & authorization",
    "status": "Source inspected · focused unit validation",
    "summary": "Follow the admitted registration path. Context checks can stop it before access issuance; the final RADIUS reply depends on authentication and policy.",
    "nodes": [
      {
        "id": "context",
        "label": "Verified presentation",
        "detail": "Network context & receipt",
        "explanation": "The presentation service requires a valid receipt and rechecks admission. Unavailable or unregistered access context fails closed.",
        "source": "portal-api/src/modules/portal-presentations/portal-presentation.service.js",
        "position": {
          "x": 0,
          "y": 0
        },
        "input": "left",
        "output": "right"
      },
      {
        "id": "registration",
        "label": "Registration transaction",
        "detail": "Identity, consent & answers",
        "explanation": "Registration validates published form inputs, creates or reuses the visitor and issues access inside one database transaction.",
        "source": "portal-api/src/modules/registrations/registration.service.js",
        "position": {
          "x": 400,
          "y": 0
        },
        "input": "left",
        "output": "right"
      },
      {
        "id": "access",
        "label": "Temporary access",
        "detail": "Tenant policy snapshot",
        "explanation": "The issuer persists access and RADIUS attributes using the tenant policy. The service retries username collisions at most three times.",
        "source": "portal-api/src/modules/temporary-accesses/temporary-access.service.js",
        "position": {
          "x": 800,
          "y": 0
        },
        "input": "left",
        "output": "bottom"
      },
      {
        "id": "handoff",
        "label": "HotSpot handoff",
        "detail": "Origin-bound CHAP POST",
        "explanation": "The browser checks the configured login origin, computes CHAP and submits a native POST. Offline tests reproduce the URL checks and single submission. CHAP is separate from transport encryption.",
        "source": "captive-portal/src/hotspot-login.js",
        "position": {
          "x": 800,
          "y": 230
        },
        "input": "top",
        "output": "left"
      },
      {
        "id": "radius",
        "label": "FreeRADIUS checks",
        "detail": "CHAP, SQL & expiration",
        "explanation": "The configured server invokes CHAP, SQL authorization and expiration checks. This source walkthrough does not contact a RADIUS server.",
        "source": "freeradius/config/sites-available/default",
        "position": {
          "x": 400,
          "y": 230
        },
        "input": "right",
        "output": "left"
      },
      {
        "id": "reply",
        "label": "RADIUS reply",
        "detail": "Accept or reject",
        "explanation": "Authentication produces a reply; receiving credentials alone does not establish Internet access. Physical acceptance remains a separate, deployment-specific validation.",
        "source": "freeradius/config/sites-available/default",
        "position": {
          "x": 0,
          "y": 230
        },
        "input": "right",
        "output": "left"
      }
    ],
    "edges": [
      {
        "id": "context-registration",
        "source": "context",
        "target": "registration",
        "label": "Recheck admission",
        "conditional": false
      },
      {
        "id": "registration-access",
        "source": "registration",
        "target": "access",
        "label": "Validate & issue",
        "conditional": false
      },
      {
        "id": "access-handoff",
        "source": "access",
        "target": "handoff",
        "label": "Return temporary access",
        "conditional": false
      },
      {
        "id": "handoff-radius",
        "source": "handoff",
        "target": "radius",
        "label": "NAS authentication",
        "conditional": false
      },
      {
        "id": "radius-reply",
        "source": "radius",
        "target": "reply",
        "label": "Evaluate credentials & policy",
        "conditional": false
      }
    ],
    "steps": [
      {
        "edge": "context-registration",
        "title": "Check admission"
      },
      {
        "edge": "registration-access",
        "title": "Commit registration and access"
      },
      {
        "edge": "access-handoff",
        "title": "Prepare the browser handoff"
      },
      {
        "edge": "handoff-radius",
        "title": "Follow HotSpot authentication"
      },
      {
        "edge": "radius-reply",
        "title": "Read the RADIUS decision"
      }
    ],
    "inspected": true,
    "height": 640,
    "mobileHeight": 1100
  },
  {
    "kind": "sessions",
    "id": "diagram-nodalume-sessions",
    "title": "Session lifecycle",
    "status": "Source inspected · integration suite reviewed",
    "summary": "Issuance, network accounting and administrative requests have distinct authority. Interim updates are optional; closure follows accounting evidence rather than an administrative request.",
    "nodes": [
      {
        "id": "policy",
        "label": "Tenant duration policy",
        "detail": "Applied at issuance",
        "explanation": "The SQL issuer snapshots the configured duration into the access expiration and Session-Timeout attribute. Later policy edits do not extend an existing access.",
        "source": "portal-api/src/db/migrations/013_tenant_session_timeout.up.sql",
        "position": {
          "x": 0,
          "y": 0
        },
        "input": "left",
        "output": "right"
      },
      {
        "id": "issued",
        "label": "Access issued",
        "detail": "Expiration persisted",
        "explanation": "Issuance establishes credentials and a time limit. Accounting begins only when the NAS supplies the corresponding event.",
        "source": "portal-api/src/modules/temporary-accesses/temporary-access.repository.js",
        "position": {
          "x": 400,
          "y": 0
        },
        "input": "left",
        "output": "right"
      },
      {
        "id": "start",
        "label": "Accounting Start",
        "detail": "Open session record",
        "explanation": "FreeRADIUS SQL inserts or updates the accounting record from the NAS event. Tenant queries correlate access and accounting within tenant scope.",
        "source": "freeradius/config/mods-config/sql/main/postgresql/queries.conf",
        "position": {
          "x": 800,
          "y": 0
        },
        "input": "left",
        "output": "bottom"
      },
      {
        "id": "interim",
        "label": "Interim update",
        "detail": "Usage & elapsed time",
        "explanation": "Interim events update usage and session time while the record remains open. A NAS can send Stop without an intervening update.",
        "source": "freeradius/config/mods-config/sql/main/postgresql/queries.conf",
        "position": {
          "x": 800,
          "y": 230
        },
        "input": "top",
        "output": "left"
      },
      {
        "id": "stop",
        "label": "Accounting Stop",
        "detail": "Recorded closure",
        "explanation": "Stop writes the accounting stop time. Missing accounting evidence must not be replaced by an invented closure time.",
        "source": "freeradius/config/mods-config/sql/main/postgresql/queries.conf",
        "position": {
          "x": 400,
          "y": 230
        },
        "input": "right",
        "output": "left"
      },
      {
        "id": "audit",
        "label": "Termination request",
        "detail": "Audit-only boundary",
        "explanation": "The administrative operation records a requested termination with tenant scope. The reviewed implementation does not send Disconnect or CoA and does not set the accounting stop time.",
        "source": "portal-api/src/modules/tenant-sessions/tenant-sessions.repository.js",
        "position": {
          "x": 0,
          "y": 230
        },
        "input": "right",
        "output": "left",
        "independent": true
      }
    ],
    "edges": [
      {
        "id": "policy-issued",
        "source": "policy",
        "target": "issued",
        "label": "Snapshot duration",
        "conditional": false
      },
      {
        "id": "issued-start",
        "source": "issued",
        "target": "start",
        "label": "When the NAS sends Start",
        "conditional": true
      },
      {
        "id": "start-interim",
        "source": "start",
        "target": "interim",
        "label": "Optional usage update",
        "conditional": true
      },
      {
        "id": "interim-stop",
        "source": "interim",
        "target": "stop",
        "label": "When Stop arrives",
        "conditional": true
      },
      {
        "id": "start-stop",
        "source": "start",
        "target": "stop",
        "label": "Stop without Interim",
        "conditional": true
      }
    ],
    "steps": [
      {
        "edge": "policy-issued",
        "title": "Freeze the access duration"
      },
      {
        "edge": "issued-start",
        "title": "Record a NAS Start event"
      },
      {
        "edge": "start-interim",
        "title": "Read an optional Interim event"
      },
      {
        "edge": "interim-stop",
        "title": "Record a NAS Stop event"
      }
    ],
    "inspected": true,
    "height": 640,
    "mobileHeight": 1100
  },
  {
    "kind": "tenancy",
    "id": "diagram-nodalume-tenancy",
    "title": "Multi-tenant boundaries",
    "status": "Source inspected · integration suite reviewed",
    "summary": "Tenant authorization starts with the authenticated session. Repository predicates and composite foreign keys retain that scope in queries and relationships.",
    "nodes": [
      {
        "id": "tenant-session",
        "label": "Tenant admin session",
        "detail": "Active tenant context",
        "explanation": "The active tenant and memberships come from the authenticated administrative session. A request-supplied tenant selector does not establish authorization.",
        "source": "portal-api/src/modules/admin-auth/admin-authorization.js",
        "position": {
          "x": 0,
          "y": 60
        },
        "input": "left",
        "output": "right"
      },
      {
        "id": "membership",
        "label": "Membership guard",
        "detail": "Require tenant_admin",
        "explanation": "The guard finds a tenant_admin membership matching the active tenant. A platform role alone is insufficient for this tenant guard.",
        "source": "portal-api/src/modules/admin-auth/admin-authorization.js",
        "position": {
          "x": 300,
          "y": 60
        },
        "input": "left",
        "output": "right"
      },
      {
        "id": "scope",
        "label": "Scoped repository",
        "detail": "Parameterized tenant predicates",
        "explanation": "Session and editor queries carry tenant identifiers from authorized context and retain tenant-qualified joins. Integration test sources exercise cross-tenant rejection.",
        "source": "portal-api/src/modules/tenant-sessions/tenant-sessions.repository.js",
        "position": {
          "x": 600,
          "y": 60
        },
        "input": "left",
        "output": "right"
      },
      {
        "id": "keys",
        "label": "Relational ownership",
        "detail": "Composite foreign keys",
        "explanation": "Portal, revision and deployment relationships include tenant ownership in their foreign keys. This is schema enforcement within shared PostgreSQL, not a database-per-tenant claim.",
        "source": "portal-api/src/db/migrations/014_portal_editor_model.up.sql",
        "position": {
          "x": 900,
          "y": 60
        },
        "input": "left",
        "output": "right"
      },
      {
        "id": "platform-role",
        "label": "Platform admin role",
        "detail": "Separate authorization guard",
        "explanation": "Platform administration uses its own role check. It is a separate route scope from tenant membership checks.",
        "source": "portal-api/src/modules/admin-auth/admin-authorization.js",
        "position": {
          "x": 300,
          "y": 310
        },
        "input": "left",
        "output": "right"
      },
      {
        "id": "platform-routes",
        "label": "Platform operations",
        "detail": "Platform route scope",
        "explanation": "Platform operations and tenant operations are modeled separately; the walkthrough follows the tenant path.",
        "source": "portal-api/src/modules/admin-auth/admin-authorization.js",
        "position": {
          "x": 600,
          "y": 310
        },
        "input": "left",
        "output": "right"
      }
    ],
    "edges": [
      {
        "id": "session-membership",
        "source": "tenant-session",
        "target": "membership",
        "label": "Authenticate & authorize",
        "conditional": false
      },
      {
        "id": "membership-scope",
        "source": "membership",
        "target": "scope",
        "label": "Use the authorized tenant",
        "conditional": false
      },
      {
        "id": "scope-keys",
        "source": "scope",
        "target": "keys",
        "label": "Retain ownership",
        "conditional": false
      },
      {
        "id": "platform-guard",
        "source": "platform-role",
        "target": "platform-routes",
        "label": "Separate platform scope",
        "conditional": false
      }
    ],
    "steps": [
      {
        "edge": "session-membership",
        "title": "Resolve membership"
      },
      {
        "edge": "membership-scope",
        "title": "Scope the query"
      },
      {
        "edge": "scope-keys",
        "title": "Preserve relational ownership"
      }
    ],
    "inspected": true,
    "height": 640,
    "mobileHeight": 1100
  },
  {
    "kind": "deployment",
    "id": "diagram-nodalume-deployment",
    "title": "Containerized services",
    "status": "Source inspected · integration suite reviewed",
    "summary": "Five Compose services with explicit readiness dependencies, plus database and media volumes. One dependency is highlighted at a time; independent services may become ready in parallel.",
    "nodes": [
      {
        "id": "postgres",
        "label": "PostgreSQL service",
        "detail": "Database health gate",
        "explanation": "The Compose database has a readiness check and a named data volume. The API and FreeRADIUS depend on database health.",
        "source": "compose.yaml",
        "position": {
          "x": 0,
          "y": 130
        },
        "input": "left",
        "output": "right"
      },
      {
        "id": "api",
        "label": "Portal API service",
        "detail": "Application boundary",
        "explanation": "The Node.js service exposes the internal application interface, uses a media volume and declares a health check before the two web frontends start.",
        "source": "compose.yaml",
        "position": {
          "x": 400,
          "y": 130
        },
        "input": "left",
        "output": "right"
      },
      {
        "id": "radius",
        "label": "FreeRADIUS service",
        "detail": "AAA boundary",
        "explanation": "The RADIUS service reads its mounted configuration and depends on PostgreSQL. Compose readiness alone is not a functional authentication test.",
        "source": "compose.yaml",
        "position": {
          "x": 400,
          "y": 390
        },
        "input": "left",
        "output": "right"
      },
      {
        "id": "console",
        "label": "Admin console service",
        "detail": "React assets & proxy",
        "explanation": "The console serves the administrative interface and proxies its API requests. Its Compose dependency is the healthy API.",
        "source": "compose.yaml",
        "position": {
          "x": 700,
          "y": 0
        },
        "input": "left",
        "output": "right"
      },
      {
        "id": "portal",
        "label": "Captive portal service",
        "detail": "Public assets & proxy",
        "explanation": "The public portal is a separate service with its own proxy boundary. Its runtime network settings are deliberately omitted from this view.",
        "source": "compose.yaml",
        "position": {
          "x": 700,
          "y": 240
        },
        "input": "left",
        "output": "right"
      },
      {
        "id": "database-volume",
        "label": "Database volume",
        "detail": "Persistent database state",
        "explanation": "Database files persist in a named volume. Backup and restoration require independent operational validation.",
        "source": "compose.yaml",
        "position": {
          "x": 0,
          "y": 390
        },
        "input": "left",
        "output": "right"
      },
      {
        "id": "media-volume",
        "label": "Media volume",
        "detail": "Persistent portal media",
        "explanation": "Portal media has separate persistent storage mounted by the API. File and database recovery need a consistent operational procedure.",
        "source": "compose.yaml",
        "position": {
          "x": 700,
          "y": 480
        },
        "input": "left",
        "output": "right"
      }
    ],
    "edges": [
      {
        "id": "db-api",
        "source": "postgres",
        "target": "api",
        "label": "Database healthy",
        "conditional": false
      },
      {
        "id": "db-radius",
        "source": "postgres",
        "target": "radius",
        "label": "Database healthy",
        "conditional": false
      },
      {
        "id": "api-console",
        "source": "api",
        "target": "console",
        "label": "API healthy",
        "conditional": false
      },
      {
        "id": "api-portal",
        "source": "api",
        "target": "portal",
        "label": "API healthy",
        "conditional": false
      },
      {
        "id": "db-storage",
        "source": "postgres",
        "target": "database-volume",
        "label": "Persist data",
        "conditional": false
      },
      {
        "id": "api-media",
        "source": "api",
        "target": "media-volume",
        "label": "Persist media",
        "conditional": false
      }
    ],
    "steps": [
      {
        "edge": "db-api",
        "title": "Read the API dependency"
      },
      {
        "edge": "db-radius",
        "title": "Read the AAA dependency"
      },
      {
        "edge": "api-console",
        "title": "Read the admin proxy dependency"
      },
      {
        "edge": "api-portal",
        "title": "Read the public proxy dependency"
      }
    ],
    "inspected": true,
    "height": 640,
    "mobileHeight": 1280
  },
  {
    "kind": "editor",
    "id": "diagram-nodalume-editor",
    "title": "Portal editor & publication",
    "status": "Source inspected · integration suite reviewed",
    "summary": "The implementation has a typed document tree, contextual properties, versioned drafts and immutable publication revisions. The public renderer reads a published revision rather than an editable draft.",
    "nodes": [
      {
        "id": "document",
        "label": "Versioned document",
        "detail": "Theme & block tree",
        "explanation": "The shared contract defines document versions, theme and blocks. Stable block identities allow the editor to find and select the same element.",
        "source": "portal-api/src/modules/portal-documents/portal-document.contract.js",
        "position": {
          "x": 0,
          "y": 0
        },
        "input": "left",
        "output": "right"
      },
      {
        "id": "containers",
        "label": "Sections & columns",
        "detail": "Bounded container hierarchy",
        "explanation": "Tree operations constrain container children and nesting. Columns contain sections; allowed layout variants depend on the document version.",
        "source": "admin-console/src/features/portal-editor/editor-tree.js",
        "position": {
          "x": 400,
          "y": 0
        },
        "input": "left",
        "output": "right"
      },
      {
        "id": "blocks",
        "label": "Content & form blocks",
        "detail": "Typed properties",
        "explanation": "The inspector edits the selected block through allowed properties. The contract includes content, forms and supported question blocks rather than arbitrary executable markup.",
        "source": "admin-console/src/features/portal-editor/EditorInspector.jsx",
        "position": {
          "x": 800,
          "y": 0
        },
        "input": "left",
        "output": "bottom"
      },
      {
        "id": "validation",
        "label": "Server validation",
        "detail": "Ownership & document checks",
        "explanation": "The editor service validates document shape and tenant-owned references before persistence or publication. Client-side editing does not replace server validation.",
        "source": "portal-api/src/modules/portal-documents/portal-document.service.js",
        "position": {
          "x": 800,
          "y": 230
        },
        "input": "top",
        "output": "left"
      },
      {
        "id": "draft",
        "label": "Versioned draft",
        "detail": "Optimistic concurrency",
        "explanation": "Mutations lock the tenant-owned portal and compare the expected draft version. A conflict preserves the need for an explicit reconciliation.",
        "source": "portal-api/src/modules/portal-documents/portal-document.service.js",
        "position": {
          "x": 400,
          "y": 230
        },
        "input": "right",
        "output": "left"
      },
      {
        "id": "revision",
        "label": "Published revision",
        "detail": "Append-only history",
        "explanation": "Publishing appends a revision, updates the public pointer and records audit within a transaction. Restoring creates another revision instead of rewriting history.",
        "source": "portal-api/src/modules/portal-documents/portal-document.service.js",
        "position": {
          "x": 0,
          "y": 230
        },
        "input": "right",
        "output": "bottom"
      },
      {
        "id": "renderer",
        "label": "Public renderer",
        "detail": "Published presentation",
        "explanation": "The presentation resolver uses the published document. A draft remains a private editing state until the publication checks succeed.",
        "source": "portal-api/src/modules/portal-presentations/portal-presentation.service.js",
        "position": {
          "x": 0,
          "y": 460
        },
        "input": "top",
        "output": "right"
      }
    ],
    "edges": [
      {
        "id": "document-containers",
        "source": "document",
        "target": "containers",
        "label": "Contains",
        "conditional": false
      },
      {
        "id": "containers-blocks",
        "source": "containers",
        "target": "blocks",
        "label": "Composes typed blocks",
        "conditional": false
      },
      {
        "id": "blocks-validation",
        "source": "blocks",
        "target": "validation",
        "label": "Validate the document",
        "conditional": false
      },
      {
        "id": "validation-draft",
        "source": "validation",
        "target": "draft",
        "label": "Save with expected version",
        "conditional": false
      },
      {
        "id": "draft-revision",
        "source": "draft",
        "target": "revision",
        "label": "Publish transactionally",
        "conditional": false
      },
      {
        "id": "revision-renderer",
        "source": "revision",
        "target": "renderer",
        "label": "Resolve the public revision",
        "conditional": false
      }
    ],
    "steps": [
      {
        "edge": "document-containers",
        "title": "Read the document hierarchy"
      },
      {
        "edge": "containers-blocks",
        "title": "Select a typed block"
      },
      {
        "edge": "blocks-validation",
        "title": "Validate on the server"
      },
      {
        "edge": "validation-draft",
        "title": "Save a versioned draft"
      },
      {
        "edge": "draft-revision",
        "title": "Append a published revision"
      },
      {
        "edge": "revision-renderer",
        "title": "Read the published presentation"
      }
    ],
    "inspected": true,
    "height": 640,
    "mobileHeight": 1280
  }
];
