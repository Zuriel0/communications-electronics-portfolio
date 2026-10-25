# ANX-013 — Nodalume: inventario de evidencia

Fecha: 25 de octubre de 2026. Este inventario distingue confirmación del propietario, evidencia del portafolio y comprobación independiente del sistema Nodalume. No se inspeccionaron el repositorio remoto de Nodalume, secretos, infraestructura ni datos de clientes.

## Fuentes utilizadas

- Brief ANX-013 aportado por el propietario: posicionamiento, tecnologías, laboratorio, referencias de producto y separación entre implementación actual y futuro.
- [Reporte ANX-012](anx-012-report.md), en particular su alcance y limitaciones: Nodalume procede del brief confirmado por el propietario; la revisión anterior de infraestructura remota no se realizó.
- `src/data/capabilities.js` y `src/data/professionalProfile.js`: contexto de Nodalume como proyecto personal/laboratorio, consola React, backend, PostgreSQL, FreeRADIUS y MikroTik. No se convierten en evidencia de producción.
- Código y pruebas del portafolio: arquitectura React Router, catálogos EN/ES, figuras diferidas, reproducción por visibilidad, controles y seis modelos originales.
- Documentación oficial de las herramientas de referencia, enlazada en [influencias de diseño](anx-013-nodalume-design-influences.md). Respalda la descripción de esas herramientas, **no demuestra su implementación en Nodalume**.

## Matriz de afirmaciones públicas

| Afirmación | Respaldo disponible | Estado publicado | Límite |
| --- | --- | --- | --- |
| Plataforma de portal cautivo autohospedada | Brief ANX-013 y contexto ANX-012 | Implementación actual en laboratorio, declarada por el propietario | No SaaS comercial terminado |
| Node.js, consola React, PostgreSQL | Capacidades previas y brief | Componentes del alcance actual declarado | Sin contrato API, esquema o inventario de endpoints verificado |
| Docker Compose | Brief ANX-013 | Orquestación local declarada | No prueba de alta disponibilidad o despliegue cloud |
| FreeRADIUS e integración MikroTik | Contexto previo y brief | Integración de red/AAA declarada | Sin paquetes capturados, puertos, tiempos o topología privada |
| Control de sesiones y accounting | Contexto previo y brief | Responsabilidades del alcance declarado | Sin reconstruir una máquina de estados o secuencia protocolaria |
| Diseño multitenant | Contexto previo y brief | Diseño declarado | No garantiza aislamiento; faltan esquema y pruebas específicas |
| Builder visual, páginas/bloques | Intención de producto del brief | Diseño de producto en curso | No se inventan capturas, persistencia o drag-and-drop funcional |
| Lógica de políticas y acciones API | Intención de producto del brief | Modelo conceptual por diseñar/validar | No se afirman proveedores ni motor de ejecución disponibles |
| AWS, cómputo con contenedores y datos administrados | Dirección futura del brief; referencias oficiales | Evaluación futura | No despliegue AWS actual, autoscaling o SLA |
| `nodalume.anxzu.com` | Posibilidad futura explícita del brief | Dirección futura, texto sin CTA de producto | No se creó micrositio, DNS ni fecha de lanzamiento |
| Ruta y diagramas ANXZU | Implementación y QA de esta fase | Validados en el portafolio | No valida el runtime de Nodalume |

## Exclusiones deliberadas

No se publican direcciones de infraestructura, IPs, UUID de despliegue, credenciales, tokens, valores `.env`, clientes, métricas de producción, throughput, uptime, volúmenes de usuarios ni resultados operativos no documentados. No se añaden autenticaciones simuladas ni se presenta un diagrama como captura de red.

Se omiten diagramas detallados de paquetes de autenticación, ciclo de vida de sesiones, esquema tenant y topología de contenedores: el material actual no permite defender sus pasos, reglas, tablas o ubicación exacta. El mapa de relaciones cubre las responsabilidades conocidas sin inventar esos detalles.

## Evidencia adicional que permitiría ampliar el caso

Material saneado y expresamente compartido: README/estructura del sistema, manifiestos sin valores privados, contrato API, modelo de datos, pruebas de aislamiento, secuencias AAA verificadas, capturas reales del editor y un procedimiento reproducible de laboratorio. Son oportunidades posteriores, no requisitos que se afirmen completados aquí.
