# Trazabilidad interna de capacidades — ANX-012.2

Revisión del inventario original de **8 categorías / 25 entradas**. Este documento no forma parte de la interfaz pública. Se conserva `src/data/skills.js` intacto como evidencia del inventario recibido; sus títulos, iconos y textos ya no se importan en Home. No se crea otra sección pública para reemplazarlo.

| Entrada original | Disposición pública en las seis áreas | Contexto y sustento |
| --- | --- | --- |
| LAN-to-LAN | Solo inventario interno | Declaración original; sin escenario específico documentado para ampliar su alcance |
| VLAN | Networking: VLAN and Network Segmentation | Experiencia profesional; implementación NAS en el historial y confirmación Cisco del propietario |
| BGP | Networking: BGP and Routing Fundamentals | Alcance ya publicado en ANX-012; no se añade despliegue, proveedor o dominio nuevo |
| OSPF | Solo inventario interno | Declaración original; falta contexto específico de aplicación |
| Captive Portals | Networking | Experiencia profesional confirmada; Fortinet/Cisco con alcance explícito |
| Structured Cabling | Solo inventario interno | Declaración original; sin alcance concreto adicional documentado |
| React | Software | Experiencia profesional en proyectos internos, conservada del historial |
| JavaScript | Software | Proyectos personales ANXZU/Nodalume, sin nuevo puesto atribuido |
| PHP | Backend | Experiencia profesional en NAS Debian, descrita en el historial |
| BASH | Software: Bash | Proyecto del monitor concurrente documentado; normalización del nombre |
| Debian Linux | Infrastructure | Experiencia profesional conservada |
| NAS | Infrastructure | Solución profesional de almacenamiento descrita en el historial |
| Apache | Infrastructure | Integración profesional en la misma solución NAS |
| MariaDB | Backend | Integración profesional en la solución NAS |
| SQL Queries | Backend | Consultas del inventario original con contexto del sistema MariaDB; SQL en PostgreSQL sigue separado por contexto de proyecto |
| PHP Integration | Backend, nota de integración PHP | Se integra con PHP en la misma aplicación; no se duplica como otra habilidad |
| Perimeter Security | Solo nombre histórico interno | La seguridad de redes general ya publicada se conserva; no se añade experiencia avanzada en firewall ni un despliegue nuevo |
| Troubleshooting | Networking / Infrastructure | Diagnóstico de redes y conectividad de VM ya publicado, sin otra entrada genérica duplicada |
| Technical Support | Solutions Architecture & Technical Presales | Soporte técnico profesional descrito en End To End y en las funciones de preventa |
| WordPress | Solo inventario interno | Sin proyecto o función concreta documentada para esta presentación |
| Shopify | Solo inventario interno | Mismo criterio |
| Salesforce | Solo inventario interno | Mismo criterio |
| SOW | Presales | Experiencia profesional e inventario previo, conservados |
| Site Surveys | Presales | Experiencia profesional e inventario previo, conservados |
| RFP Support | Presales: RFP Analysis | Se integra con el análisis RFP ya publicado; no se duplica |

**Siete nombres quedan solo internos**: LAN-to-LAN, OSPF, Structured Cabling, Perimeter Security, WordPress, Shopify y Salesforce. No se afirma que sean incorrectos: se omiten de la presentación resumida por falta de contexto específico o menor relevancia. No se eliminan del archivo fuente original ni de Git.

También se integra **SAMBA**, que ya figura explícitamente en la experiencia profesional NAS; no proviene de una inferencia sobre el servidor. Se elimina la repetición literal de Node.js entre backend/software y Docker Compose entre backend/infraestructura. Su contexto original de proyecto/laboratorio sigue explícito.

Fuentes internas: `src/data/skills.js`, `src/data/timelineData.js`, `src/data/capabilities.js`, casos de estudio y brief/respuestas del propietario de ANX-012. No se inspeccionaron repositorios remotos ni se incorporó información de clientes, producción AWS o nuevas credenciales.
