# ANX-012.4 — Propuesta de automatización futura

**Propuesta únicamente.** No se añade un workflow activo, no se crean secretos ni permisos, y no se publica automáticamente cada cambio de `main`.

## Disparador y autorización

Usar `workflow_dispatch` con `tag`, SHA completo esperado y dominio esperado, o `release: published` para tags de versión aprobados. El evento de release tampoco debe saltarse la revisión del entorno protegido `production`. El job de preparación puede ejecutarse automáticamente; el job que escribe en `Zuriel0/page` requiere la autorización del propietario en ese entorno.

Validar formato del tag y que exista en el repositorio fuente. Resolver el tag anotado a su commit y compararlo con el SHA esperado; no usar el HEAD de main ni una coincidencia superficial de archivos. Para una release, contrastar además `tag_name`, repositorio y commit aprobado. Guardar tanto objeto de tag como commit resuelto en el registro de ejecución.

## Permisos mínimos

- Token del repositorio fuente: `contents: read`; actions fijadas a SHA revisados.
- Para escribir en el repositorio distinto `Zuriel0/page`, un GitHub App installation token de vida corta, instalación limitada a ese repositorio y permiso `contents: write`. El `GITHUB_TOKEN` del repositorio fuente no debe presumirse autorizado para escribir en otro repositorio.
- Credencial de la App guardada en el entorno protegido; no en el árbol, logs, artefacto público ni marcador. No proponer un PAT amplio como atajo.
- Evitar `persist-credentials` en checkouts de preparación y aislar el token de escritura al job de despliegue. Redactar logs y no ejecutar código de PR no confiable con secretos.
- Usar concurrencia `anxzu-production`, con `cancel-in-progress: false`; no interrumpir una publicación a mitad de la actualización.

## Flujo propuesto

1. Checkout limpio del tag exacto, comprobación de SHA y lockfile. Instalar con `npm ci`; ejecutar lint, build, pruebas, comprobación de chunks y audit. Si una validación falla, no dar acceso al job de publicación.
2. Empaquetar únicamente `dist` aprobado; excluir `.vite` y archivos privados. Generar inventario por SHA-256 y guardar build/manifiesto como artefacto de Actions. Conservar los documentos de rutas profundas, metadatos y base `/`. Comprobar que React Flow sigue diferido.
3. Ensayar por HTTP el paquete y sus rutas, imports, recursos, EN/ES y controles esenciales. Guardar los resultados del ensayo. El artefacto verificado es el mismo que se transfiere al job de publicación, sin reconstruirlo con secretos.
4. Tras aprobar el entorno, consultar configuración Pages, CNAME, HTTPS, remoto `main` y dominio. Si no coinciden `main:/` y `anxzu.com`, detenerse; no corregir DNS o settings silenciosamente.
5. Crear un backup remoto único desde el `main` observado. Confirmar su SHA con `ls-remote`; nunca sobrescribir un backup existente. Guardar el inventario anterior y ensayar una restauración local que preserve su árbol.
6. Abrir rama temporal desde ese SHA. Copiar solo el artefacto, preservar CNAME byte por byte, mantener `.nojekyll`, revisar archivos especiales y retirar únicamente assets antiguos identificados. Añadir marcador con tag, SHA fuente y digest, sin secretos. Enumerar el diff completo y preparar el commit `deploy: publish ANXZU <versión>`.
7. Reconsultar `main`. Si cambió, detenerse para reconciliar; no rebase automático de archivos generados. Publicar por fast-forward y push normal. Capturar el commit real de producción.
8. Esperar una ejecución Pages exitosa asociada **a ese commit**, con timeout razonable. No aceptar simplemente el último build de otro SHA ni el éxito del push.
9. Comprobar HTTPS y marcador del dominio con reintentos limitados por propagación. Contrastar por hash todos los recursos públicos y HTML de las tres rutas; comprobar redirección y recarga profunda. Complementar con QA EN/ES, Hero, seis diagramas, contacto sin envío y Lighthouse serial sobre la versión confirmada.
10. Publicar un resumen y artefactos de evidencia: tag/commit fuente, backup, diff, digest, commit de producción, ejecución Pages, HTTP y métricas con condiciones. Guardar documentación posterior en rama documental, sin mover el tag ni generar otra release.

## Recuperación

Separar propagación transitoria, fallo externo y regresión real del artefacto. Si faltan recursos críticos o quedan inutilizables sitio/rutas por la publicación, preparar un `git revert` del commit publicado en una rama de recuperación, comprobar árbol y servidor HTTP contra el respaldo y hacer push sin force únicamente si el remoto sigue siendo el esperado. Si hay cambios posteriores, pedir revisión de la reconciliación.

La autorización del entorno de producción debe explicar previamente si cubre este rollback automático ante un fallo crítico. Esperar Pages y verificar el dominio restaurado antes de marcar recuperación satisfactoria. Conservar evidencia tanto del intento fallido como de la recuperación. Un timeout o un fallo externo, sin diagnóstico, no demuestra que el artefacto requiera revertirse.

## Criterios para habilitarla posteriormente

Revisar los permisos reales de la App, protección del entorno, retención de artefactos y un ensayo completo en un destino de prueba autorizado. Probar error de hash, tag incorrecto, backup duplicado, cambio remoto concurrente, fallo de Pages y rollback; confirmar que ninguno produce force push o elimina respaldos. Someter entonces un workflow concreto a revisión. Esta propuesta no habilita despliegues ni cambia la configuración actual.
