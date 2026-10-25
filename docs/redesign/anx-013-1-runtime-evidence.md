# ANX-013.1 — Runtime & source evidence

Fecha: 2026-10-25. Revisión de producto por lectura; sin cambios en Nodalume ni servicios activos.

## Repositorio y procedencia

- Portafolio: `Zuriel0/communications-electronics-portfolio`, rama `codex/anx-013-nodalume-technical`, base `0796386`.
- Producto: repositorio privado autorizado `Zuriel0/Nodalume`, obtenido mediante el conector GitHub en modo lectura, snapshot fijo `25c6897e5bf1878c3660e19dac397bda08f31f9a`.
- No se clonó el repositorio completo ni se usó SSH, API del laboratorio, PostgreSQL, FreeRADIUS, router o infraestructura activa. No se arrancó Compose.
- Los nombres de reportes históricos DOCX disponibles localmente se inventariaron; no se atribuyen afirmaciones a sus contenidos. No se abrieron respaldos de router, exports ni archivos de entorno.
- La instrucción de navegación del AGENTS del producto se atendió mediante GRAPH_REPORT y verificación de código. Graphify no está instalado localmente y su grafo corresponde a un commit anterior; se utilizó solo como índice. No se modificó el producto, por lo que no corresponde actualizar su grafo.
- El README y documentos de releases describen momentos distintos. Ninguno permite asumir que el snapshot inspeccionado coincide con el laboratorio hoy.

[Índice completo y hashes de blobs](reports/anx-013-1/source-index.json). Se publican resúmenes propios y rutas de trazabilidad; no código privado, configuración sensible, IP, recibos, IDs de tenants, datos de clientes ni secretos.

## Matriz de evidencia

| Función / componente | Clasificación | Fuente primaria | Prueba disponible | Límite y presentación segura |
| --- | --- | --- | --- | --- |
| Utilidades CHAP y entrega web | Implementada y validada, alcance unitario | `captive-portal/src/chap-md5.js`, `hotspot-login.js` | 5 pruebas originales reproducidas: vectores, origen permitido y POST nativo | DOM doble de prueba; no autenticación física. CHAP no acredita cifrado del transporte. |
| Servicio de accesos temporales | Implementada y validada, alcance unitario | `temporary-access.service.js` | 3 pruebas originales reproducidas: emisión con repositorio simulado, colisiones, límite y errores | No se ejecutó SQL; no prueba entropía criptográfica ni concurrencia real. La etiqueta pública acompaña siempre su alcance de ocho pruebas unitarias. |
| Registro y presentación verificada | Implementada, sin validación suficiente de integración | `registration.service.js`, `public-context.service.js`, `portal-presentation.service.js`, migración 027 | Código transaccional y controles revisados | Contexto inválido/no disponible falla cerrado. No afirmar acceso físico actual ni éxito end-to-end. |
| Duración de acceso | Implementada, sin validación suficiente de integración | Migración 013, repositorio de accesos | SQL de snapshot de política inspeccionado; documentación de timeout | Expiración y Session-Timeout se fijan al emitir. No afirmar que editar una política modifica accesos emitidos. |
| AAA y accounting | Implementada, sin validación suficiente de integración | `sites-available/default`, `queries.conf` | Configuración CHAP/SQL/expiration y Start/Interim/Stop revisadas | No se contactó RADIUS ni NAS. No asumir correlación por Class: la variante revisada está comentada. |
| Consulta y terminación de sesiones | Implementada, sin validación suficiente de integración | `tenant-sessions.repository.js`, `phase8-accounting.db.test.js` | Test de integración revisado, no ejecutado | Terminar registra una solicitud auditada; no envía Disconnect/CoA ni marca Accounting Stop. Interim es opcional. |
| Autorización tenant | Implementada, sin validación suficiente de integración | `admin-authorization.js`, repositorios, migraciones 014/027 | Suite phase7 de aislamiento revisada, no ejecutada | Sesión, pertenencia, predicados y FK compuestas. No afirmar aislamiento productivo completo, RLS o DB por tenant. |
| Editor, borrador y publicación | Implementada, sin validación suficiente de integración | Contrato, árbol, inspector, servicio y documentos V2 | Contratos y operaciones revisados, sin aceptación UI/DB completa | Bloques tipados, propiedades contextuales, expectedVersion, revisiones inmutables y renderer publicado. No sigue siendo solo concepto. |
| Compose | Implementada, sin validación funcional actual | `compose.yaml` | Dependencias/healthchecks, restricciones y volúmenes inspeccionados | Cinco servicios. Healthcheck no equivale a AAA ni Internet funcionales. No se realizó backup/restore. |
| Aceptación operativa ampliada | En desarrollo | `docs/releases/1.4.0-rc.1.md`, `docs/v1.4.2/entrega.md` | Evidencia histórica documentada y restricciones de aceptación | El documento reciente conserva límites físicos y de operación asistida; no demuestra operación desatendida ni multi-AP general. |
| Constructor general de lógica y acciones API externas | Diseño conceptual en el alcance inspeccionado | Contrato/editor/API revisados, modelo ANX-013 | No hay ejecución general establecida por esta revisión | Se distinguen las operaciones REST reales del editor de un motor genérico no demostrado. No afirmar que no pueda existir fuera del alcance revisado. |
| AWS, HA, escalado y micrositio | Futuro | Requisitos editoriales del caso | Sin despliegue/pruebas | Preguntas de evaluación; ninguna topología definitiva ni recursos provisionados. |

## Arquitectura que sí puede explicarse

El navegador valida el destino HotSpot y prepara CHAP; el NAS participa en la autenticación RADIUS. La API valida el contexto público, registra y emite acceso mediante una transacción SQL. FreeRADIUS consulta PostgreSQL para autorización y accounting: no se inventa una llamada directa API→servidor RADIUS. La duración del tenant se convierte en atributos del acceso. Start y Stop proceden del NAS; una solicitud administrativa auditada tiene otra autoridad.

La sesión administrativa determina tenant activo y pertenencia. Los repositorios conservan predicados de tenant y el esquema refuerza relaciones mediante claves compuestas. La publicación añade una revisión, actualiza el puntero público y registra auditoría en una transacción; restaurar crea historia adicional. El renderer público usa la revisión publicada.

Compose separa PostgreSQL, API Node, FreeRADIUS, consola React/Nginx y portal público/Nginx. PostgreSQL saludable condiciona API/FreeRADIUS; API saludable condiciona los dos frontends. Hay almacenamiento separado para datos y medios. El diagrama representa dependencias y persistencia, no tráfico real ni orden serial obligatorio.

## Validación unitaria del producto reproducida

Se reconstruyó un directorio temporal privado, con seis archivos originales del snapshot y un manifiesto mínimo ESM, sin instalar dependencias del producto. Se comprobaron sus hashes Git blob exactos antes de ejecutar. No se incluyen esos archivos privados en el portafolio.

```text
env -i PATH=/usr/bin:/bin <Node.js v24.19.0> --test \
  portal-api/tests/unit/temporary-access.service.test.js \
  captive-portal/tests/hotspot-login.test.js \
  captive-portal/tests/chap-md5.test.js
```

**8/8 pasan**, en entorno mínimo con dobles de prueba y dominios sintéticos. [Salida original del runner](reports/anx-013-1/nodalume-unit-tests.txt). Los seis blobs verificados están en `offlineUnitValidation.files` del índice. No hubo sockets, solicitudes HTTP, DB, router ni servidor AAA. No se reejecutaron las suites DB ni la aceptación física.

Las **47 pruebas del portafolio** comprueban traducciones, integridad de modelos, navegación y control de reproducción. Son evidencia del caso de estudio, nunca validación del runtime de Nodalume.

## Archivos inspeccionados

La columna de líneas indica el alcance leído; GRAPH_REPORT se limitó a su introducción de 110 líneas.

| Ruta en el producto | Git blob (prefijo) | Líneas |
| --- | --- | ---: |
| `AGENTS.md` | `b62b1c1d0c2b` | 14 |
| `README.md` | `8bf190d8777d` | 620 |
| `graphify-out/GRAPH_REPORT.md` | `b7b8bc9c6228` | 110 |
| `compose.yaml` | `6e4206c65f4a` | 196 |
| `docs/v2/modelo-editor.md` | `34d1c8d00cd8` | 158 |
| `docs/v2/api-editor.md` | `a14b98de244b` | 146 |
| `docs/v2/ciclo-editorial.md` | `714f8175a101` | 153 |
| `docs/v2/cierre.md` | `6c24a11303a1` | 193 |
| `docs/deployment/tenant-session-timeout.md` | `c72af1c233d6` | 140 |
| `docs/deployment/phase9-accounting-attribution.md` | `cd4a14e2418b` | 85 |
| `docs/releases/1.4.0-rc.1.md` | `a4ef4016ce43` | 62 |
| `docs/v1.4.2/entrega.md` | `b708d1a39e64` | 26 |
| `portal-api/src/modules/registrations/registration.service.js` | `43bb66e8d3c1` | 154 |
| `portal-api/src/modules/public-context/public-context.service.js` | `5fc38fdbb1f4` | 21 |
| `portal-api/src/modules/temporary-accesses/temporary-access.service.js` | `6d5cc32edf44` | 51 |
| `portal-api/src/modules/temporary-accesses/temporary-access.repository.js` | `f35bdd280c89` | 55 |
| `portal-api/src/modules/tenant-sessions/tenant-sessions.repository.js` | `97e2136301d3` | 82 |
| `portal-api/src/modules/admin-auth/admin-authorization.js` | `ce76a0110611` | 44 |
| `portal-api/src/db/migrations/013_tenant_session_timeout.up.sql` | `75e29db61f2e` | 193 |
| `portal-api/src/db/migrations/014_portal_editor_model.up.sql` | `56fc3003d417` | 203 |
| `portal-api/src/db/migrations/027_verified_presentations.up.sql` | `65b427c275b5` | 80 |
| `portal-api/src/modules/portal-documents/portal-document.contract.js` | `3d90d02c797d` | 670 |
| `portal-api/src/modules/portal-documents/portal-document.service.js` | `9fcdfe0ad4ca` | 319 |
| `portal-api/src/modules/portal-presentations/portal-presentation.service.js` | `409236434647` | 185 |
| `captive-portal/src/registration-flow.js` | `8bef3f3d90a7` | 181 |
| `captive-portal/src/hotspot-login.js` | `ffb31c900558` | 81 |
| `captive-portal/src/chap-md5.js` | `e8f8dbab4004` | 105 |
| `admin-console/src/features/portal-editor/editor-tree.js` | `042124fa9651` | 645 |
| `admin-console/src/features/portal-editor/EditorInspector.jsx` | `9361222010a4` | 707 |
| `admin-console/src/features/portal-editor/EditorPublishing.jsx` | `49bb194f3ca0` | 179 |
| `portal-api/tests/unit/temporary-access.service.test.js` | `a7e1978b551e` | 115 |
| `captive-portal/tests/hotspot-login.test.js` | `a03f994d06dc` | 102 |
| `captive-portal/tests/chap-md5.test.js` | `a9d2841a862f` | 33 |
| `portal-api/tests/integration/phase7-multitenant.db.test.js` | `3a81016f5a72` | 642 |
| `portal-api/tests/integration/phase8-accounting.db.test.js` | `dbf7d39a8490` | 479 |
| `freeradius/config/sites-available/default` | `a364e06f3823` | 1235 |
| `freeradius/config/mods-config/sql/main/postgresql/queries.conf` | `a2c5e56b5d82` | 735 |
