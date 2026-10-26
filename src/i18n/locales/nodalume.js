import {defineMessages} from '../catalog.js';
// Route-only copy. Long prose uses stable identifiers to avoid serializing its English text twice.
const labels=defineMessages({fromEnglish:{
  "Nodalume": "Nodalume",
  "A portal. Your possibilities.": "Un portal. Tus posibilidades.",
  "Self-hosted captive portal platform": "Plataforma de portal cautivo autohospedada",
  "Explore the architecture": "Explorar la arquitectura",
  "Explore the product thinking": "Explorar el diseño de producto",
  "Current lab implementation": "Implementación actual en laboratorio",
  "Product design in progress": "Diseño de producto en curso",
  "Future direction": "Evolución futura",
  "Architecture": "Arquitectura",
  "Design influences": "Referencias de diseño",
  "When the platform becomes the constraint.": "Cuando la plataforma se convierte en el límite.",
  "Freedom to create. Responsibility to operate.": "Libertad para crear. Responsabilidad para operar.",
  "A system of responsibilities.": "Un sistema de responsabilidades.",
  "Text version of this diagram": "Versión textual del diagrama",
  "PostgreSQL": "PostgreSQL",
  "FreeRADIUS": "FreeRADIUS",
  "MikroTik": "MikroTik",
  "References that shape the product.": "Referencias que dan forma al producto.",
  "Elementor / Wix": "Elementor / Wix",
  "Figma": "Figma",
  "Scratch / Zoho Flow": "Scratch / Zoho Flow",
  "Postman": "Postman",
  "Reference documentation": "Documentación de referencia",
  "The choices behind the boundaries.": "Las decisiones detrás de los límites.",
  "Operate deliberately. Evolve with evidence.": "Operar con criterio. Evolucionar con evidencia.",
  "Today: local service orchestration": "Hoy: orquestación local de servicios",
  "Future: cloud evaluation": "Futuro: evaluación cloud",
  "Explore the SSH case study": "Explorar el caso de monitoreo SSH",
  "Case study sections": "Secciones del caso de estudio",
  "Zoom In": "Acercar",
  "Zoom Out": "Alejar",
  "Fit View": "Ajustar vista",
  "Diagram controls": "Controles del diagrama",
  "Loading interactive diagram…": "Cargando diagrama interactivo…",
  "Unable to load this diagram.": "No se pudo cargar este diagrama.",
  "Check your connection and reload to try again. The case study remains available.": "Comprueba tu conexión y recarga para volver a intentarlo. El caso de estudio sigue disponible.",
  "Reload diagram": "Recargar diagrama",
  "Code-guided walkthrough. Selecting a stage or component pauses the motion.": "Recorrido guiado por el código. Seleccionar una etapa o un componente pausa el movimiento.",
  "Walkthrough stages": "Etapas del recorrido",
  "Stage {0}: {1}": "Etapa {0}: {1}",
  "Inspect a component": "Inspeccionar un componente",
  "Source inspected": "Código revisado",
  "Engineering evidence": "Evidencia de ingeniería",
  "Access issuance & CHAP": "Emisión de accesos y CHAP",
  "Implemented and validated": "Implementada y validada",
  "Registration, sessions & tenancy": "Registro, sesiones y tenancy",
  "Implemented · further validation needed": "Implementada · validación adicional pendiente",
  "Visual editor & publication": "Editor visual y publicación",
  "Broader operational acceptance": "Aceptación operativa ampliada",
  "In development": "En desarrollo",
  "General visual logic & API-action builder": "Lógica visual general y constructor de acciones API",
  "Design concept": "Diseño conceptual",
  "AWS deployment": "Despliegue AWS",
  "Follow the implementation.": "Recorre la implementación.",
  "Engineering views": "Vistas de ingeniería",
  "Product Design DNA": "ADN del diseño de producto",
  "Composing a portal beyond a fixed template": "Componer un portal más allá de una plantilla fija",
  "Reusable visual elements": "Elementos visuales reutilizables",
  "Own decision: a versioned document tree with constrained sections, columns and typed blocks.": "Decisión propia: un árbol de documento versionado con secciones, columnas y bloques tipados acotados.",
  "Implemented in the reviewed editor contract and tree operations.": "Implementado en el contrato del editor y las operaciones de árbol revisadas.",
  "Keeping selection and properties in context": "Mantener la selección y sus propiedades en contexto",
  "Contextual editing": "Edición contextual",
  "Implemented in the reviewed inspector and editor tree.": "Implementado en el inspector y el árbol de edición revisados.",
  "Making conditional behavior understandable": "Hacer comprensible el comportamiento condicional",
  "Visible logic and approachable building blocks": "Lógica visible y bloques comprensibles",
  "Own decision: keep policy reasoning legible while defining safe execution boundaries.": "Decisión propia: mantener legible el razonamiento de políticas mientras se definen límites seguros de ejecución.",
  "General visual automation remains a design concept in the inspected scope.": "La automatización visual general sigue como concepto de diseño en el alcance inspeccionado.",
  "Making API operations explicit": "Hacer explícitas las operaciones API",
  "Inputs, requests and inspectable outcomes": "Entradas, peticiones y resultados inspeccionables",
  "Editor REST operations are implemented; a general external API-action builder remains conceptual.": "Las operaciones REST del editor están implementadas; un constructor general de acciones API externas sigue siendo conceptual.",
  "Adapted principle": "Principio adaptado",
  "Nodalume decision": "Decisión de Nodalume",
  "Current scope": "Alcance actual",
  "Environment configuration": "Configuración de entornos",
  "Dependencies & diagnosis": "Dependencias y diagnóstico",
  "Persistence & recovery": "Persistencia y recuperación",
  "Testing boundaries": "Límites de las pruebas",
  "Questions before a cloud architecture": "Preguntas previas a una arquitectura cloud",
  "Execution platform": "Plataforma de ejecución",
  "Managed persistence": "Persistencia administrada",
  "Secrets": "Secretos",
  "Network connectivity": "Conectividad de red",
  "Media storage": "Almacenamiento de medios",
  "Define upload, ownership, publication and coordinated recovery semantics for portal media.": "Definir la carga, propiedad, publicación y recuperación coordinada de los medios del portal.",
  "Observability": "Observabilidad",
  "Availability & scale": "Disponibilidad y escala",
  "Operating cost": "Coste operativo",
  "Implementation with a traceable basis.": "Implementación con una base trazable.",
  "Source reviewed · isolated tests reproduced": "Código revisado · pruebas aisladas reproducidas",
  "Validation boundaries": "Límites de la validación",
  "Explore the boundaries that make access possible.": "Explora los límites que hacen posible el acceso.",
  "How the product model connects.": "Cómo se conecta el modelo de producto.",
  "Requirements for the next environment.": "Requisitos para el siguiente entorno."
}});
const prose={
  "copy.connecting-network-access-backend-services-and-the": {
    "en": "Connecting network access, backend services and the freedom to design the experience. A personal platform project developed in a lab environment.",
    "es": "Conectar el acceso a la red, los servicios backend y la libertad de diseñar la experiencia. Un proyecto personal de plataforma desarrollado en laboratorio."
  },
  "copy.the-starting-point-is-a-recurring-design": {
    "en": "The starting point is a recurring design constraint: a captive portal can provide network access while leaving little room to shape the experience. Changes may depend on provider intervention, predefined layouts or a narrow set of integrations.",
    "es": "El punto de partida es una restricción recurrente de diseño: un portal cautivo puede dar acceso a la red y dejar poco margen para definir la experiencia. Los cambios pueden depender del proveedor, de plantillas predefinidas o de un conjunto limitado de integraciones."
  },
  "copy.nodalume-explores-a-different-boundary-keep-the": {
    "en": "Nodalume explores a different boundary: keep the access and session responsibilities explicit, while giving the portal experience more room to evolve. This is the project’s motivation, not a claim about every commercial platform.",
    "es": "Nodalume explora otro límite: mantener explícitas las responsabilidades de acceso y sesión, mientras la experiencia del portal tiene más espacio para evolucionar. Es la motivación del proyecto, no una afirmación sobre todas las plataformas comerciales."
  },
  "copy.a-portal-should-be-a-starting-point": {
    "en": "A portal should be a starting point for an idea, not the limit of that idea. Nodalume’s product goal is to let users shape experiences, own their deployment and extend the platform without depending on a provider for every change.",
    "es": "Un portal debería ser el punto de partida de una idea, no su límite. El objetivo de producto de Nodalume es permitir que las personas diseñen experiencias, controlen su despliegue y amplíen la plataforma sin depender del proveedor para cada cambio."
  },
  "copy.light-highlights-one-relationship-at-a-time": {
    "en": "Light highlights one relationship at a time. It is a reading aid, not live telemetry or a runtime simulation. All relationships remain readable when paused.",
    "es": "La luz destaca una relación a la vez. Es una ayuda de lectura, no telemetría ni una simulación del sistema. Todas las relaciones siguen siendo legibles en pausa."
  },
  "copy.aws-is-an-option-to-investigate-not": {
    "en": "AWS is an option to investigate, not a deployed environment for Nodalume. Container compute such as Amazon ECS with AWS Fargate and managed PostgreSQL are possible evaluation candidates. Suitability depends on state, connectivity, RADIUS transport, secrets, backups, observability and cost.",
    "es": "AWS es una opción por investigar, no un entorno desplegado de Nodalume. El cómputo con contenedores, como Amazon ECS con AWS Fargate, y PostgreSQL administrado son candidatos de evaluación. Su idoneidad depende del estado, la conectividad, el transporte RADIUS, los secretos, los respaldos, la observabilidad y el coste."
  },
  "copy.there-is-no-cloud-migration-autoscaling-policy": {
    "en": "There is no cloud migration, autoscaling policy, availability target or production benchmark claimed in this case study. These questions connect application work with infrastructure thinking without relabeling the project as a completed DevOps practice.",
    "es": "Este caso no afirma una migración cloud, políticas de autoescalado, objetivos de disponibilidad ni benchmarks de producción. Estas preguntas conectan la aplicación con la infraestructura sin presentar el proyecto como una práctica DevOps consolidada."
  },
  "copy.the-next-design-questions-are-deployment-maturity": {
    "en": "The next design questions are deployment maturity, state separation, tenant isolation, operational visibility and broader integrations. A dedicated product experience at nodalume.anxzu.com is a later possibility; no product microsite or launch date is part of this phase.",
    "es": "Las siguientes preguntas de diseño son la madurez del despliegue, la separación del estado, el aislamiento de tenants, la visibilidad operativa y más integraciones. Una experiencia de producto en nodalume.anxzu.com es una posibilidad posterior; esta fase no incluye un micrositio ni una fecha de lanzamiento."
  },
  "copy.future-evaluation-sequence-these-are-questions-to": {
    "en": "Future evaluation sequence. These are questions to resolve, not an implemented cloud topology. No infrastructure resources are provisioned by this case study.",
    "es": "Secuencia futura de evaluación. Son preguntas por resolver, no una topología cloud implementada. Este caso de estudio no aprovisiona recursos de infraestructura."
  },
  "copy.source-snapshot-reviewed-25c6897-productunit-evidence-is": {
    "en": "Source snapshot reviewed: 25c6897. Product-unit evidence is separate from the tests of this portfolio.",
    "es": "Código revisado en el commit 25c6897. La evidencia unitaria del producto se distingue de las pruebas de este portafolio."
  },
  "copy.eight-original-nodalume-unit-tests-reproduced-offline": {
    "en": "Eight original Nodalume unit tests reproduced offline: CHAP vectors, origin-bound handoff and temporary-access service behavior.",
    "es": "Ocho pruebas unitarias originales de Nodalume reproducidas sin red: vectores CHAP, handoff ligado al origen y comportamiento del servicio de accesos temporales."
  },
  "copy.transaction-boundaries-sql-policy-snapshots-tenant-guards": {
    "en": "Transaction boundaries, SQL policy snapshots, tenant guards and accounting queries inspected. Database integration tests exist and were reviewed; they were not rerun here.",
    "es": "Se revisaron límites transaccionales, snapshots de políticas SQL, controles tenant y consultas de accounting. Existen pruebas de integración con base de datos y se revisaron; no se ejecutaron de nuevo aquí."
  },
  "copy.the-document-contract-contextual-inspector-version-checks": {
    "en": "The document contract, contextual inspector, version checks and immutable publication path are present in source. Full product UI and database acceptance were not reproduced.",
    "es": "El contrato de documento, el inspector contextual, los controles de versión y la publicación inmutable están en el código. No se reprodujo la aceptación completa de interfaz y base de datos del producto."
  },
  "copy.releasecandidate-documents-retain-deploymentspecific-physical-and-assistedoperation": {
    "en": "Release-candidate documents retain deployment-specific physical and assisted-operation limits. Current lab service state was not contacted.",
    "es": "Los documentos de las versiones candidatas conservan límites físicos y de operación asistida propios de cada despliegue. No se consultó el estado actual de los servicios del laboratorio."
  },
  "copy.the-reviewed-implementation-establishes-editor-rest-operations": {
    "en": "The reviewed implementation establishes editor REST operations. A general visual automation engine or external API-action builder is not established by the inspected source.",
    "es": "La implementación revisada acredita operaciones REST del editor. El código inspeccionado no establece un motor general de automatización visual ni un constructor de acciones API externas."
  },
  "copy.execution-state-network-access-and-operating-cost": {
    "en": "Execution, state, network access and operating cost remain requirements to evaluate before choosing a cloud topology.",
    "es": "La ejecución, el estado, el acceso de red y el coste operativo siguen siendo requisitos por evaluar antes de elegir una topología cloud."
  },
  "copy.choose-a-system-view-the-animation-walks": {
    "en": "Choose a system view. The animation walks source-backed relationships; it does not represent traffic from a running installation.",
    "es": "Elige una vista del sistema. La animación recorre relaciones respaldadas por código; no representa tráfico de una instalación en ejecución."
  },
  "copy.dashed-connections-are-conditional-or-independent-paths": {
    "en": "Dashed connections are conditional or independent paths. The automatic walkthrough follows only its declared stages; all paths remain visible when paused.",
    "es": "Las conexiones discontinuas son rutas condicionales o independientes. El recorrido automático sigue únicamente sus etapas declaradas; todas las rutas permanecen visibles en pausa."
  },
  "copy.each-reference-addresses-an-interaction-problem-the": {
    "en": "Each reference addresses an interaction problem. The implementation makes its own choices, with the current scope shown beside each principle.",
    "es": "Cada referencia responde a un problema de interacción. La implementación toma decisiones propias y muestra el alcance actual junto a cada principio."
  },
  "copy.own-decision-a-block-inspector-applies-allowed": {
    "en": "Own decision: a block inspector applies allowed property changes to a stable selected block identity.",
    "es": "Decisión propia: un inspector aplica cambios permitidos a las propiedades de un bloque seleccionado con identidad estable."
  },
  "copy.own-decision-editor-operations-use-explicit-save": {
    "en": "Own decision: editor operations use explicit save, preview, publish and restore contracts with version checks.",
    "es": "Decisión propia: las operaciones del editor usan contratos explícitos de guardado, preview, publicación y restauración con controles de versión."
  },
  "copy.compose-expresses-service-configuration-and-mounts-secret": {
    "en": "Compose expresses service configuration and mounts. Secret values remain outside this case study; laboratory and installation profiles must be evaluated separately.",
    "es": "Compose expresa la configuración de servicios y sus montajes. Los valores secretos quedan fuera de este caso; los perfiles de laboratorio e instalación deben evaluarse por separado."
  },
  "copy.postgresql-health-gates-the-api-and-freeradius": {
    "en": "PostgreSQL health gates the API and FreeRADIUS. API health gates the web services. Readiness, functional authentication and physical Internet access are separate checks.",
    "es": "La disponibilidad de PostgreSQL condiciona la API y FreeRADIUS. La disponibilidad de la API condiciona los servicios web. La disponibilidad, la autenticación funcional y el acceso físico a Internet son comprobaciones distintas."
  },
  "copy.postgresql-data-and-portal-media-have-separate": {
    "en": "PostgreSQL data and portal media have separate volumes. Migration history and coordinated restoration are operational concerns; recovery documents are evidence to inspect, not a restore performed in this phase.",
    "es": "Los datos PostgreSQL y los medios del portal tienen volúmenes separados. El historial de migraciones y la restauración coordinada son asuntos operativos; los documentos de recuperación son evidencia inspeccionada, no una restauración ejecutada en esta fase."
  },
  "copy.eight-dependencyfree-product-unit-tests-were-reproduced": {
    "en": "Eight dependency-free product unit tests were reproduced offline. Database test sources and the RADIUS and browser implementation were inspected. No active lab API, database, router or service was contacted.",
    "es": "Se reprodujeron sin red ocho pruebas unitarias del producto sin dependencias externas. Se inspeccionaron las pruebas de base de datos y la implementación RADIUS y del navegador. No se contactó ninguna API, base de datos, router o servicio activo del laboratorio."
  },
  "copy.evaluate-process-lifecycle-health-checks-and-network": {
    "en": "Evaluate process lifecycle, health checks and network requirements before choosing a container execution service.",
    "es": "Evaluar el ciclo de procesos, las comprobaciones de disponibilidad y los requisitos de red antes de elegir un servicio de ejecución de contenedores."
  },
  "copy.define-data-ownership-migration-backup-and-restoration": {
    "en": "Define data ownership, migration, backup and restoration requirements before selecting managed PostgreSQL.",
    "es": "Definir requisitos de propiedad de datos, migración, respaldo y restauración antes de seleccionar PostgreSQL administrado."
  },
  "copy.define-storage-distribution-rotation-and-access-boundaries": {
    "en": "Define storage, distribution, rotation and access boundaries without embedding credentials in images or browser code.",
    "es": "Definir almacenamiento, distribución, rotación y límites de acceso sin incrustar credenciales en imágenes ni código del navegador."
  },
  "copy.validate-the-nastoradius-path-transport-latency-and": {
    "en": "Validate the NAS-to-RADIUS path, transport, latency and administrative access boundaries in the target environment.",
    "es": "Validar la ruta NAS-RADIUS, el transporte, la latencia y los límites de acceso administrativo en el entorno de destino."
  },
  "copy.choose-actionable-health-error-and-accounting-signals": {
    "en": "Choose actionable health, error and accounting signals, retention and sensitive-data handling requirements.",
    "es": "Elegir señales útiles de disponibilidad, errores y accounting, así como requisitos de retención y tratamiento de datos sensibles."
  },
  "copy.define-failure-domains-stateful-dependencies-and-measured": {
    "en": "Define failure domains, stateful dependencies and measured demand before claiming high availability or autoscaling.",
    "es": "Definir dominios de fallo, dependencias con estado y demanda medida antes de afirmar alta disponibilidad o autoescalado."
  },
  "copy.measure-resource-usage-and-traffic-assumptions-before": {
    "en": "Measure resource usage and traffic assumptions before estimating compute, storage, network and operational costs.",
    "es": "Medir el uso de recursos y los supuestos de tráfico antes de estimar costes de cómputo, almacenamiento, red y operación."
  },
  "copy.the-reviewed-source-snapshot-contains-five-compose": {
    "en": "The reviewed source snapshot contains five Compose services: PostgreSQL, Node.js API, FreeRADIUS, the React administration console and the captive portal. Eight original unit tests were reproduced offline; further integration evidence is identified separately.",
    "es": "El código revisado contiene cinco servicios Compose: PostgreSQL, API Node.js, FreeRADIUS, consola administrativa React y portal cautivo. Se reprodujeron sin red ocho pruebas unitarias originales; la evidencia adicional de integración se identifica por separado."
  },
  "copy.source-files-were-reviewed-at-a-fixed": {
    "en": "Source files were reviewed at a fixed commit. Eight original Nodalume unit tests were reproduced offline for CHAP, origin checks and temporary-access service behavior. Database suites were inspected, not rerun; current lab services and physical Internet access were not tested.",
    "es": "Los archivos fuente se revisaron en un commit fijo. Se reprodujeron sin red ocho pruebas unitarias originales de Nodalume sobre CHAP, controles de origen y comportamiento del servicio de accesos temporales. Las suites de base de datos se inspeccionaron, sin volver a ejecutarlas; no se probaron los servicios actuales del laboratorio ni el acceso físico a Internet."
  },
  "copy.the-original-overview-remains-a-map-of": {
    "en": "The original overview remains a map of responsibilities. In the inspected implementation, the API issues access through SQL and FreeRADIUS reads the database. The source-backed views below separate actual dependencies and execution stages.",
    "es": "La vista original conserva su función como mapa de responsabilidades. En la implementación inspeccionada, la API emite accesos mediante SQL y FreeRADIUS lee la base de datos. Las vistas respaldadas por código que siguen separan dependencias reales y etapas de ejecución."
  },
  "copy.these-product-references-inform-specific-choices-in": {
    "en": "These product references inform specific choices in Nodalume. Source review distinguishes the implemented visual editor and REST operations from conceptual automation. Each reference is an inspiration, with no affiliation or endorsement.",
    "es": "Estas referencias de producto orientan decisiones concretas de Nodalume. La revisión del código distingue el editor visual y las operaciones REST implementadas de la automatización conceptual. Cada referencia es una inspiración, sin afiliación ni aval."
  },
  "copy.this-original-product-model-connects-visual-composition": {
    "en": "This original product model connects visual composition, policy logic and API actions. The source-backed editor view documents the implementation; general automation and external API-action composition remain conceptual.",
    "es": "Este modelo original de producto conecta composición visual, lógica de políticas y acciones API. La vista del editor respaldada por código documenta la implementación; la automatización general y la composición de acciones API externas siguen siendo conceptuales."
  },
  "copy.compose-declares-healthbased-dependencies-restricted-api-and": {
    "en": "Compose declares health-based dependencies, restricted API and web containers, service boundaries and separate volumes. The reviewed operational documentation covers installation, diagnosis, migrations and recovery. No lab service was started or changed in this phase.",
    "es": "Compose declara dependencias basadas en disponibilidad, contenedores API y web restringidos, límites de servicio y volúmenes separados. La documentación operativa revisada cubre instalación, diagnóstico, migraciones y recuperación. No se arrancó ni modificó ningún servicio del laboratorio en esta fase."
  }
};
export default Object.fromEntries(['en','es'].map(language=>[language,{...labels[language],...Object.fromEntries(Object.entries(prose).map(([key,value])=>[key,value[language]]))}]));
