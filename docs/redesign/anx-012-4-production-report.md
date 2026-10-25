# ANX-012.4 — Production Deployment, Verification & Rollback

**Resultado: GO. ANXZU v1.1.0 publicado y comprobado en [https://anxzu.com](https://anxzu.com).** Publicación: 24 de octubre de 2026 en México; 25 de octubre en los timestamps UTC de GitHub. No se modificó el código de la aplicación, su contenido ni el tag aprobado.

## Referencias y trazabilidad

| Elemento | Referencia verificada |
| --- | --- |
| Repositorio fuente | [Zuriel0/communications-electronics-portfolio](https://github.com/Zuriel0/communications-electronics-portfolio) |
| Fuente construida | Tag `v1.1.0`, commit **`d4b92df0c28415098862333e491d2552efe594d0`** |
| Objeto de tag anotado, sin cambios | `26a528ca3406bbf8c360706900288c7e1c3a4628` |
| Repositorio de publicación | [Zuriel0/page](https://github.com/Zuriel0/page) |
| `main` anterior de producción | **`efed3f2434b2ad184a864bd8b0d5d6ce87d42fdd`** |
| Respaldo remoto confirmado | [`backup/anxzu-pre-v1.1.0-20261024`](https://github.com/Zuriel0/page/tree/backup/anxzu-pre-v1.1.0-20261024), en el mismo `efed3f2…` |
| Commit publicado / `main` remoto final | **[`76138c5b1d8e82b651c1369ef468f023b58f67a6`](https://github.com/Zuriel0/page/commit/76138c5b1d8e82b651c1369ef468f023b58f67a6)** — `deploy: publish ANXZU v1.1.0` |
| GitHub Pages | [`pages-build-deployment`, ejecución 40153013134](https://github.com/Zuriel0/page/actions/runs/40153013134), `completed / success`, SHA `76138c5…` |
| Evidencia pública de la versión | [deployment.json](https://anxzu.com/deployment.json), fuente, tag, entry y digest del artefacto |
| Rama documental fuente | `codex/anx-012-production-report`, sin actualizar `main` ni el release |

El respaldo se publicó antes del push de producción. Se preparó la rama temporal `codex/anx-0124-deploy` desde el `main` remoto anterior, se revisó el diff y se confirmó nuevamente el SHA remoto antes de actualizar `main` mediante fast-forward. No hubo force push, reset destructivo, cambios de DNS ni un nuevo sitio.

[Estado remoto, API Pages, ejecución y DNS](reports/anx-012-4/deployment-status.json). La consulta final confirma que `main` del repositorio fuente y el tag siguen en `d4b92df…`, mientras `main` de publicación está en `76138c5…`. El checkout exacto del tag y el checkout de producción están limpios.

## Preflight y configuración preservada

GitHub Pages continúa en modo `legacy`, publicando **`main:/`** del repositorio `page`. Se conservó `CNAME` **byte por byte**: `anxzu.com`, sin salto final. El dominio raíz resuelve a las cuatro direcciones GitHub Pages `185.199.108–111.153`; `www.anxzu.com` conserva el CNAME `Zuriel0.github.io.`.

HTTPS responde con certificado válido. La API informa `https_enforced: false`, valor ya existente que esta fase no cambió; la validación y las mediciones se hicieron explícitamente por HTTPS. La propiedad `html_url` de la API conserva `http://anxzu.com/`; no se usa como prueba del certificado. No se atribuye a esta publicación una modificación de esa configuración.

La versión anterior tenía siete archivos, sin `.nojekyll`, `404.html`, robots, sitemap ni workflows propios. El nuevo artefacto incorpora `.nojekyll` vacío y conserva los archivos generados aprobados: metadatos, canonical, favicon, fuentes locales Inter, licencia, robots y sitemap. `base` de Vite es `/`, adecuada para el dominio raíz.

Las rutas de proyecto ya tienen documentos generados `projects/concurrencia/index.html` y `projects/metodologia/index.html`. GitHub Pages redirige la URL sin barra a su directorio con barra y sirve **HTTP 200**. Esto resuelve las tres rutas públicas por URL directa y recarga; no se añadió un fallback `404.html` ni se cambió React Router. `.htaccess` y `_redirects` se conservaron desde el build aprobado, pero sus reglas no son el mecanismo de rutas en GitHub Pages.

[Inventario anterior y configuración Vite](reports/anx-012-4/preflight.json). Este archivo es un registro retrospectivo de los hechos del preflight; el árbol anterior puede comprobarse independientemente en el respaldo remoto.

## Build exacto y ensayo del candidato

Se creó un worktree temporal limpio y detached del tag `v1.1.0`, se comprobó su SHA y se ejecutó:

| Comando | Resultado |
| --- | --- |
| `npm ci` | Correcto, sin cambiar manifiesto ni lockfile; [log](reports/anx-012-4/npm-ci.txt) |
| `npm run lint` | Correcto; [log](reports/anx-012-4/lint.txt) |
| `npm run build -- --manifest` | Correcto; [log](reports/anx-012-4/build.txt), [manifiesto Vite](reports/anx-012-4/vite-manifest.json) |
| `node --test tests/*.test.js` | **39/39 pasan**; [log](reports/anx-012-4/tests.txt) |
| `node scripts/check-project-chunks.mjs` | Correcto: seis diagramas diferidos, React Flow fuera de los cierres inicial/editoriales; [log](reports/anx-012-4/chunks.txt) |
| `npm audit --json` | **0 vulnerabilidades**; [resultado](reports/anx-012-4/npm-audit.json) |
| `git diff --check` | Correcto para la entrega documental |

Los **14 assets JS/CSS coinciden por nombre y SHA-256** con los aprobados en ANX-012.2/v1.1.0. No se actualizaron dependencias ni se recompiló una rama equivalente en lugar del tag. El manifiesto `.vite/manifest.json` queda en la documentación y no se publica como archivo del sitio.

Se revisaron rutas y referencias del candidato, y se buscaron archivos de desarrollo, mapas, `.env`, claves, `.git`, `.agents`, `node_modules` y fuentes privadas. No se encontraron en la carpeta publicable; es una inspección acotada, no una garantía universal de detección de secretos.

El candidato contiene **49 archivos**. Comparación lógica: **46 agregados, 2 modificados y 4 retirados**. Se modifican `index.html` y `_redirects`; se retiran únicamente los cuatro assets generados anteriores identificados en el [diff completo](reports/anx-012-4/deployment-diff.json). Git detecta además una similitud de rename del SVG; esto no cambia la lista lógica.

Se añadió `deployment.json` como metadato de publicación, sin cambiar funcionalidades. Su digest `50b5de9969fb10e0b5c6a8bf19fa7cccefcb1a96296e19d4489d28e8b75dbd0b` es SHA-256 del mapa JSON compacto ordenado `ruta → SHA256`, excluyendo el propio marcador para evitar una referencia circular. [Manifiesto de los 49 archivos](reports/anx-012-4/artifact-manifest.json).

Un servidor HTTP local del candidato comprobó los 49 archivos y las tres rutas. La inspección de navegador previa confirmó EN/ES, pausa, zoom, Fit View y los seis gráficos antes de publicar: [HTTP local](reports/anx-012-4/local-http.json), [QA del candidato](reports/anx-012-4/candidate-browser.json).

## Verificación del dominio público

GitHub Pages terminó el build con `status: built`, sin mensaje de error, y la ejecución Actions concluyó `success` sobre el commit publicado. Se esperó esa confirmación y se verificó el dominio; el push por sí solo no se consideró éxito.

**47 archivos públicos comprobados por HTTPS, HTTP 200 y SHA-256 idéntico al candidato**: HTML, todos los JS/CSS, fuente, retratos, badges, favicon, robots, sitemap, CNAME y marcador. Los dos archivos de configuración ocultos `.htaccess` y `.nojekyll` se comprueban en Git/candidato y no se solicitan como recursos públicos. Resultado: **0 recursos faltantes y 0 hashes mezclados** en este inventario. [Comprobaciones HTTP y cabeceras](reports/anx-012-4/public-http.json), [script reproducible](reports/anx-012-4/public-http-check.mjs).

| Comprobación funcional real | Resultado |
| --- | --- |
| Home, ambas rutas directas y recarga | Correctas; HTML aprobado, títulos y canonical conservados |
| Hero inmersivo y pausa por teclado | Correctos; pausa conservada al cambiar idioma |
| EN/ES sin recarga | Correcto; idioma, hash y pausa/zoom retenidos |
| Persistencia y CTA Proyectos | ES persiste tras recarga; `#projects` recibe foco |
| Capabilities, Credly y AWS | Seis áreas, 18 enlaces individuales Credly, AWS como preparación |
| Additional Technologies & Previous Capabilities | No aparece en la interfaz pública |
| Seis diagramas | Entrada directa por hash, autoplay, pausa, zoom, Fit View y reanudación correctos, escritorio y móvil |
| Carga diferida | Sin motor/gráficos en la carga editorial inicial; aparecen al navegar a las figuras |
| Contacto | Enlace `mailto:` original conservado; no se envió correo |
| Menú móvil y regreso | Apertura por Enter, cierre Escape devuelve foco al disparador; Contacto recibe foco, navegación interna al caso y regreso a Proyectos correctos |
| Responsive | 12 vistas reales: tres rutas × EN/ES × 375/1440 px, sin overflow |
| Consola | Sin errores ni warnings en las sesiones funcionales inspeccionadas |
| Reduced motion real | Hero y seis diagramas estáticos con la preferencia real de Chrome; controles coherentes |

[QA pública escritorio](reports/anx-012-4/public-browser.json), [móvil](reports/anx-012-4/public-browser-mobile.json), [matriz responsive](reports/anx-012-4/public-responsive.json), [menú, contacto y regreso](reports/anx-012-4/public-navigation.json), [receta de interacción por teclado](reports/anx-012-4/browser-check.mjs), [reduced motion](reports/anx-012-4/motion-check/results.json). Las acciones se ejecutaron sobre controles públicos, no cambiando el estado interno de React. El ancho solicitado se contrasta con `innerWidth`; la barra de desplazamiento reserva 15 px al documento.

### Capturas del dominio real

| Página | Escritorio, 1440 px | Móvil, 375 px |
| --- | --- | --- |
| Home ES | [Captura](reports/anx-012-4/public-home-1440.png) | [Captura](reports/anx-012-4/public-home-375.png) |
| Concurrencia ES | [Captura](reports/anx-012-4/public-concurrencia-1440.png) | [Captura](reports/anx-012-4/public-concurrencia-375.png) |
| Metodología ES | [Captura](reports/anx-012-4/public-metodologia-1440.png) | [Captura](reports/anx-012-4/public-metodologia-375.png) |

[Diagrama real en móvil](reports/anx-012-4/public-diagram-mobile.png). Se inspeccionaron visualmente las capturas de escritorio y móvil; conservan la composición aprobada, contenido y foco visible. Las capturas complementan las pruebas de interacción y no demuestran por sí mismas el movimiento.

## Rendimiento en producción

**18 navegaciones nuevas**: tres por ruta y perfil, Chrome fresco, seriales, sin build ni QA interactiva concurrentes. Lighthouse **13.5.0**, Chrome **155.0.0.0**, Node **24.19.0**, mismo equipo y perfiles que la referencia local ANX-012.2. Móvil: simulación 412×823, DPR 1,75, RTT 150 ms, throughput 1638,4 Kbps, CPU ×4; escritorio preset desktop. Idioma inicial EN. La QA funcional sí cubre EN/ES; no se atribuyen estas métricas a una serie ES inexistente.

| Perfil / ruta | Performance mediana (rango) | Accessibility | LCP mediano (rango), ms | CLS | TBT mediano, ms |
| --- | ---: | ---: | ---: | ---: | ---: |
| Móvil / Home | 100 (98–100) | 100 | 1511 (1506–1604) | 0 | 2,5 |
| Móvil / Concurrencia | 100 (98–100) | 100 | 1654 (1653–1730) | 0 | 0 |
| Móvil / Metodología | 99 (99–100) | 100 | 1652 (1652–1736) | 0 | 0 |
| Escritorio / Home | 100 (100–100) | 100 | 369 (362–370) | 0 | 0 |
| Escritorio / Concurrencia | 100 (100–100) | 100 | 370 (368–371) | 0 | 0 |
| Escritorio / Metodología | 100 (100–100) | 100 | 372 (370–374) | 0 | 0 |

TBT máximo observado: **50,5 ms**, primera pasada móvil Home; no se descartó. No hubo runtime errors ni audits de accesibilidad fallidos. Las **12 mediciones de proyectos** incluyen el warning esperado por la redirección de directorio sin barra a la URL con barra; los resultados se conservaron y miden esa entrada real. No son errores de la consola de la aplicación. Las seis mediciones Home no muestran ese warning.

| Referencia histórica local ANX-012.2 → dominio actual | Home | Concurrencia | Metodología |
| --- | ---: | ---: | ---: |
| Performance móvil | 99 → 100 | 98 → 100 | 98 → 99 |
| LCP móvil mediano, ms | 2027 → 1511 | 2277 → 1654 | 2277 → 1652 |
| LCP escritorio mediano, ms | 442 → 369 | 491 → 370 | 489 → 372 |

La referencia proviene del [reporte ANX-012.2](anx-012-2-report.md). **Son muestras de entornos distintos**, Preview local histórico frente a CDN público actual, con diferencias de transporte, compresión, caché, red y momento de ejecución. Aunque los valores públicos sean menores, no se infiere una mejora causal del código: los assets son idénticos. No son Web Vitals de campo, medición de INP, FPS ni CPU sostenida.

HTML, JS y CSS se sirven con **gzip**; la fuente WOFF2 y las imágenes ya comprimidas no añaden `Content-Encoding` en la muestra. Los recursos consultados presentan **`Cache-Control: max-age=600`**. Esa política es del hosting: `.htaccess` no impone cabeceras en Pages y esta fase no las cambió. Los hashes públicos del inventario actual son consistentes; esto no vacía cachés antiguas de todos los visitantes ni comprueba todos los nodos de CDN.

En la primera pasada móvil, los recursos críticos observados son el documento, `index-BTWOikn6.js` (~100,5 kB transferidos con cabeceras), CSS inicial (~8,8 kB) e Inter (~48,7 kB). Los proyectos añaden su módulo editorial y `CaseStudy` compartido (~14,3 kB transferidos). **React Flow y los seis módulos de figuras no se solicitan en esas cargas iniciales editoriales**; se comprobaron aparte por interacción. Tamaño transferido y tamaño descomprimido del bundle son magnitudes distintas.

[18 LHR comprimidos, configuración y ejecuciones](reports/anx-012-4/lighthouse/runs.json), [medianas y rangos](reports/anx-012-4/lighthouse/summary.json), [recursos, árbol crítico y latencia por ejecución](reports/anx-012-4/lighthouse/resource-audit.json). Se puede reproducir con el runner aprobado `scripts/lighthouse-readiness.mjs`, configurando `ANX_LH_VERSIONS=candidate` y `ANX_CANDIDATE_URL=https://anxzu.com`. La clave `candidate` identifica el sitio publicado en esta serie; no se ejecutó un baseline local adicional.

## Reversión probada y procedimiento operativo

**No fue necesario revertir producción**: no se observó una regresión grave del despliegue. No se declara una reversión pública que no ocurrió.

El ensayo aislado hizo `git revert` del commit de publicación sobre una rama local de prueba. Su árbol **`675d7177038f2e110a41d2e4e20ee8649a2250e9` coincide exactamente con el respaldo**. Se sirvieron localmente los siete archivos anteriores y se contrastaron sus SHA-256 contra Git, todos HTTP 200. El primer chequeo binario del retrato antiguo excedió el buffer de 1 MB del script Node; se corrigió el arnés a 10 MB y se repitió correctamente. La identidad del árbol Git ya había quedado confirmada antes del push. [Ensayo y hashes](reports/anx-012-4/rollback-rehearsal.json).

Para una reversión real, desde un clon limpio de `Zuriel0/page`, detenerse si los SHA remotos no son los esperados y revisar cualquier publicación posterior:

```sh
set -eu
test -z "$(git status --porcelain)"
git fetch origin
git switch main
git merge --ff-only origin/main
test "$(git rev-parse HEAD)" = 76138c5b1d8e82b651c1369ef468f023b58f67a6
test "$(git rev-parse origin/backup/anxzu-pre-v1.1.0-20261024)" = efed3f2434b2ad184a864bd8b0d5d6ce87d42fdd
git switch -c codex/anxzu-v1.1.0-rollback
git revert --no-edit 76138c5b1d8e82b651c1369ef468f023b58f67a6
git diff --exit-code origin/backup/anxzu-pre-v1.1.0-20261024 HEAD
git diff --check
```

Repetir el ensayo HTTP del contenido restaurado y revisar CNAME/recursos. Volver a consultar el remoto inmediatamente antes de publicar, comprobando que `main` sigue en `76138c5…`. Con el ensayo aprobado:

```sh
set -eu
test "$(git ls-remote origin refs/heads/main | cut -f1)" = 76138c5b1d8e82b651c1369ef468f023b58f67a6
git switch main
git merge --ff-only codex/anxzu-v1.1.0-rollback
git push origin main
```

El push normal rechazará cambios concurrentes. Esperar de nuevo el éxito de Pages y comprobar **el dominio público**: certificado, HTML anterior y sus siete archivos contra el respaldo, navegación y rutas originales. La restauración devuelve el comportamiento de la versión previa, no promete conservar las rutas nuevas de v1.1.0. El marcador v1.1.0 debe desaparecer al restaurar el árbol anterior. Registrar motivo, nuevo commit, ejecución Pages y resultado efectivo; hasta esa comprobación no declarar rollback exitoso. Si hubo commits posteriores, reconciliar o preparar una restauración revisada; no forzar ni ejecutar reset destructivo.

## Automatización y límites de cierre

Se entrega una [propuesta de automatización futura](anx-012-4-deployment-automation-proposal.md), sin activar workflows ni configurar secretos. Mantiene tag exacto, revisión humana de producción, backup remoto, permisos limitados al repositorio de publicación, verificación pública y reversión conservando historial.

Las comprobaciones cubren Chromium, dos anchos públicos y las rutas/recursos existentes; no constituyen certificación WCAG, prueba de lector de pantalla físico, Safari, hardware táctil ni monitorización continua. Los enlaces de contacto se inspeccionan sin enviar mensajes. No se alteraron datos Credly/AWS ni se comprobó nuevamente la vigencia externa de cada credencial: se publicó exactamente el contenido aprobado.

Pendientes operativos: revisar la propuesta de automatización, decidir en otra tarea si se cambia la configuración existente de imposición HTTPS y conservar el respaldo remoto. No quedan bloqueos de publicación observados. Se cumplen los doce criterios GO del brief; ANX-013 no se inició.
