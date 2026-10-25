# ANX-013 — Operación y evolución futura

## Punto de partida declarado

Laboratorio autohospedado, servicios backend, persistencia PostgreSQL, integración AAA y orquestación local Docker Compose. Este contexto permite hablar de límites de servicio y consideraciones de operación. No demuestra por sí solo una práctica DevOps madura, producción comercial ni operación cloud.

## Preguntas antes de migrar

| Área | Decisión por estudiar | Evidencia que haría falta |
| --- | --- | --- |
| Reproducibilidad | Documentar instalación, dependencias y configuración saneada | Despliegue repetible y recuperación ensayada |
| Persistencia | Separar cómputo y estado; respaldos y restauración | Modelo de datos, migraciones y pruebas de restore |
| Tenancy | Alcance de autorización y aislamiento | Pruebas entre tenants y revisión de controles |
| Conectividad AAA | Conservar semántica y transporte RADIUS al cambiar entorno | Flujo real, restricciones y pruebas de conectividad |
| Cómputo | Comparar contenedores autogestionados con servicios administrados | Requisitos de proceso, red, estado y costes |
| Operación | Visibilidad, actualización y recuperación | Logs saneados, alertas y ensayos de fallos |
| Producto | Builder, políticas y acciones API | Prototipo verificable, contratos y límites de ejecución |

Amazon ECS con AWS Fargate y PostgreSQL administrado son **candidatos de evaluación**, no una selección arquitectónica cerrada ni servicios desplegados de Nodalume. [Opciones oficiales de arquitectura ECS](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-configuration.html) y [separación de contenedores](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/container-considerations.html) ayudan a formular las preguntas, sin demostrar idoneidad para este proyecto.

No se inventan SLA, políticas de autoscaling, métricas de ahorro, capacidad o disponibilidad. Ningún diagrama provisiona infraestructura. La preparación AWS SAA-C03 del perfil sigue siendo preparación y no se cambia en esta fase.

## Experiencia de producto posterior

`nodalume.anxzu.com` aparece únicamente como posibilidad futura en el texto del caso. No se crea micrositio, repo de producto, subdominio, DNS ni nueva publicación. No hay fechas comprometidas ni promesas de funcionalidades comerciales. ANX-013 termina con la revisión del caso técnico dentro de ANXZU; no inicia ANX-014.
