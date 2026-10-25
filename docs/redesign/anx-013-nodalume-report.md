# ANX-013 — Nodalume Technical Case Study

Implementado para revisión el **25 de octubre de 2026**, en `codex/anx-013-nodalume-technical`. Base de aplicación: v1.1.0 / `d4b92df0c28415098862333e491d2552efe594d0`; la rama parte de la entrega documental ANX-012.4 (`63221c6`). **Sin despliegue, push, merge a main, tag, release ni inicio de ANX-014.**

## Resultado y narrativa

Nueva ruta **`/projects/nodalume`**, accesible desde el tercer proyecto de Home. Presenta el problema de flexibilidad del portal cautivo, filosofía de producto, alcance actual de laboratorio, arquitectura conceptual, referencias de diseño, tradeoffs y preguntas de operación/evolución cloud. Incluye contenido, navegación, controles y etiquetas EN/ES dentro del sistema de idioma existente.

La portada tiene identidad propia: título Nodalume de gran escala, un mensaje de autonomía creativa y una estructura SVG de capas y conexiones. No es una captura ficticia del producto. Dos CTA llevan a arquitectura y filosofía; el índice permite recorrer las ocho secciones posteriores a la portada. El navbar tiene destinos específicos de Nodalume y conserva el menú accesible.

La historia distingue cuatro clases de afirmación:

| Clase | Presentación pública |
| --- | --- |
| Implementado | Laboratorio declarado por el propietario: servicios backend, consola React, PostgreSQL, Docker Compose, FreeRADIUS, integración MikroTik, sesiones, accounting y diseño multitenant |
| Validado aquí | Implementación del caso en ANXZU: ruta, contenido bilingüe, navegación y diagramas |
| En curso | Diseño conceptual del builder, contexto de edición, políticas y acciones API |
| Futuro | Evaluar madurez de despliegue, separación del estado, cloud, aislamiento y operación |

**No se presenta el laboratorio como SaaS comercial terminado ni como infraestructura auditada en esta fase.** El alcance procede del brief y de los materiales confirmados de ANX-012; no se leyó el repositorio remoto de Nodalume. No se inventan topología real, tráfico, contratos API, datos, métricas, clientes ni features del editor. [Inventario de evidencia y límites](anx-013-nodalume-evidence.md).

## Dirección visual y decisiones de diseño

Se aplicaron `frontend-design` y `ui-ux-pro-max`. Las búsquedas de sistema de diseño devolvieron recomendaciones genéricas de funnel/testimonios y grids; no eran adecuadas a un caso técnico sin métricas comerciales. Se mantuvieron los tokens y se eligió una narrativa de responsabilidades, composición y evolución, con espacio editorial y figuras amplias.

Paleta existente: Obsidian `#090a0c`, Graphite `#1c1e23`, Pearl `#f5f5f7`, Silver `#8c96a6`, Ice Blue `#81afff`. Inter conserva su papel de interfaz y tipografía editorial; no se añaden fuentes, otra paleta ni dependencias.

```text
Nodalume / mensaje de producto     estructura de capas SVG
posicionamiento + CTA              identidad conceptual
alcance actual / diseño / futuro
índice de lectura

problema → filosofía → implementación declarada
mapa amplio de relaciones del sistema
referencias de producto → modelo del builder
decisiones → operación → evolución futura
```

La alineación es izquierda, con líneas de lectura limitadas. Principios y tradeoffs usan divisores y columnas, sin una cuadrícula uniforme de tarjetas. El protagonismo visual se concentra en las relaciones del sistema; las superficies y glows son discretos. En móvil se apilan la identidad, el SVG y los CTA. En los gráficos se usa disposición vertical también en tableta para no reducir excesivamente las etiquetas.

Se revisaron capturas y se corrigió el encuadre de tableta antes de cerrar el build. Los colores de contenido y controles proceden de tokens cuyos contrastes se validan en las pruebas existentes; Lighthouse también comprueba contraste en las vistas auditadas. No se atribuye esto a una certificación completa de accesibilidad.

## Diagramas y movimiento

Tres modelos nuevos, **15 nodos y 12 relaciones** en total, con un solo módulo React Flow diferido:

| Figura | Hash público | Estado y propósito |
| --- | --- | --- |
| Relaciones de plataforma | `#diagram-nodalume-platform` | Alcance actual declarado; integra responsabilidades de consola, backend, persistencia, AAA y red |
| Concepto del builder | `#diagram-nodalume-builder` | Diseño en curso; páginas, bloques, políticas y acciones API |
| Camino de evolución | `#diagram-nodalume-evolution` | Futuro; secuencia de preguntas de infraestructura y operación |

La señal móvil destaca una relación a la vez, con periodo CSS de 1,6 s y selección cada 2,4 s. No usa flechas de paquetes ni pretende mostrar telemetría. Cada figura conserva explicación HTML y una versión textual desplegable. Los diagramas detallados de autenticación, sesiones, esquema tenant y topología real se omiten porque falta evidencia suficiente para sus pasos y ubicación. [Arquitectura y estrategia completa](anx-013-nodalume-architecture.md).

Se reutilizan el edge SVG/CSS y `observeDiagramPlayback` existentes sin alterarlos: pausa/reanudación manual, suspensión por viewport/pestaña, cleanup y reduced motion. No se añade requestAnimationFrame por conexión ni una biblioteca de movimiento. El mapa completo sigue visible en estático. La entrada del título es un desplazamiento corto de 8 px, solo con movimiento permitido; el SVG de la portada no añade un loop ambiental nuevo.

El idioma no remonta el grafo, reinicia su pausa ni cambia el zoom. Solo el cambio de disposición de escritorio a vertical vuelve a encuadrar el canvas. Los seis gráficos anteriores, sus modelos, posiciones y controladores siguen idénticos en fuente.

## Referencias de producto y futuro

La sección pública conecta Elementor/Wix con composición visual; Figma con contexto de edición; Scratch/Zoho Flow con lógica comprensible; Postman con acciones API explícitas. Son influencias atribuidas con enlaces oficiales, sin afiliación, aval o copia. [Decisiones y fuentes](anx-013-nodalume-design-influences.md).

AWS se presenta como opción por evaluar. ECS con Fargate y PostgreSQL administrado son candidatos, sin afirmar despliegue, selección final, escalabilidad o SLA. `nodalume.anxzu.com` solo se menciona como posibilidad posterior; no se crea micrositio ni DNS. [Preguntas operativas y dirección futura](anx-013-nodalume-future-direction.md).

## Arquitectura de carga y tamaño

`React.lazy` añade la ruta sin traer su catálogo ni React Flow a Home. Se reutilizan `ProjectRoute`, Suspense, fallback accesible, recuperación de errores y `CaseFigure`. La narrativa aparece antes de cargar las figuras; los hashes directos fuerzan únicamente el destino necesario. El build genera el HTML de `/projects/nodalume/index.html` con metadatos propios, y Preview sirve la ruta con o sin barra final. Sitemap incorpora la cuarta ruta.

El verificador recorre módulos e imports reales en lugar de depender exclusivamente de `facadeModuleId`, que Rollup puede omitir en el chunk compartido de página/modelo. Sigue exigiendo entrada dinámica y ausencia del motor en los cierres editoriales de **los tres proyectos**.

| JavaScript inicial | v1.1.0 | ANX-013 | Diferencia |
| --- | ---: | ---: | ---: |
| Bytes generados | 316.193 | 319.727 | +3.534, aproximadamente 1,1 % |
| Gzip local nivel 9 | 99.520 | 100.533 | +1.013 |

El crecimiento inicial corresponde a la tercera ficha, SVG ligero, ruta y metadatos/traducciones comunes. El contenido extenso y el catálogo de Nodalume permanecen diferidos. [Inventario antes/después](reports/anx-013/bundles.json), [baseline](reports/anx-013/baseline-bundles.json), [manifiesto final](reports/anx-013/vite-manifest.json), [verificación de chunks](reports/anx-013/chunks.txt). Los tamaños generados/gzip local no son bytes reales de red ni Web Vitals.

## Rendimiento medido

**18 navegaciones Lighthouse nuevas**: Home baseline y candidato, tres por perfil; Nodalume candidato, otras tres por perfil. Baseline: checkout limpio exacto de v1.1.0 servido en Preview 4186; candidato final estable en 4173. Orden alternado del baseline/candidato en la segunda repetición, Chrome fresco y ejecuciones seriales. Sin builds ni QA interactiva de navegador durante las series finales. Se repitió la serie completa después de corregir las etiquetas ES de controles y carga; no es un entorno de CPU totalmente aislado.

Lighthouse 13.5.0, Chrome 155.0.0.0, Node 24.19.0. Móvil simulado: 412×823, DPR 1,75, RTT 150 ms, throughput 1638,4 Kbps y CPU ×4; escritorio preset desktop. Métricas con idioma inicial EN; el contenido ES tiene validación funcional aparte.

| Página / perfil | Performance mediana | Accessibility | LCP mediano (rango), ms | CLS | TBT mediano, ms |
| --- | ---: | ---: | ---: | ---: | ---: |
| Home v1.1.0 / móvil | 99 | 100 | 2033 (2030–2034) | 0 | 0,5 |
| Home ANX-013 / móvil | 99 | 100 | 2028 (2027–2028) | 0 | 0 |
| Home v1.1.0 / escritorio | 100 | 100 | 443 (442–443) | 0 | 0 |
| Home ANX-013 / escritorio | 100 | 100 | 442 (442–442) | 0 | 0 |
| Nodalume / móvil | 98 | 100 | 2283 (2277–2286) | 0 | 0 |
| Nodalume / escritorio | 100 | 100 | 491 (491–492) | 0 | 0 |

Home no muestra regresión apreciable en esta muestra; diferencias de pocos milisegundos no se interpretan como mejora. Nodalume es una ruta nueva, sin baseline previo equivalente. No hubo warnings ni runtime errors en las 18 navegaciones, ni audits de accesibilidad fallidos. Los logs de red confirman **cero peticiones iniciales al runtime Flow** en las cargas editoriales candidatas. [Serie Home](reports/anx-013/lighthouse-home/summary.json), [serie Nodalume](reports/anx-013/lighthouse-nodalume/summary.json), [recursos observados](reports/anx-013/network-audit.json). Los LHR completos comprimidos y cada configuración están junto a esos resúmenes.

Son pruebas de laboratorio local con simulación, no mediciones del dominio público, Web Vitals de campo, INP, FPS o CPU sostenida. No se publicaron cambios para obtenerlas.

## Pruebas y QA

| Validación | Resultado y evidencia |
| --- | --- |
| `npm ci` | Correcto, 0 vulnerabilidades reportadas; [log](reports/anx-013/npm-ci.txt), manifiesto/lockfile sin cambios |
| `npm run lint` | Correcto; [log](reports/anx-013/lint.txt) |
| `npm run build -- --manifest` | Correcto; [log](reports/anx-013/build.txt) |
| `node --test tests/*.test.js` | **43/43**; [log](reports/anx-013/tests.txt) |
| `node scripts/check-project-chunks.mjs` | Correcto: Home y los tres cierres editoriales sin motor Flow |
| `git diff --check` | Correcto, incluidos archivos nuevos al preparar el commit |
| Rutas HTTP | Las cuatro rutas y Nodalume con barra final responden 200 con head/canonical correctos; [evidencia](reports/anx-013/http.json) |
| EN/ES y responsive | **48 vistas**: cuatro rutas × dos idiomas × 320, 375, 768, 1024, 1440 y 1920 px; sin overflow, un h1, metadatos por idioma y entry final comprobados; [matriz](evidence/anx-013/responsive.json) |
| Tres gráficos nuevos | Movimiento constatado mediante cambios reales de `offset-distance`, pausa, zoom, EN/ES, hash, Fit View, reanudación y salida del viewport; [escritorio](evidence/anx-013/functional-desktop.json), [móvil](evidence/anx-013/functional-mobile.json) |
| Seis gráficos anteriores y Home | **12 escenarios de gráfico** en 375/1440; pausa/zoom/idioma conservados, Hero operativo, 18 Credly, seis áreas y AWS en preparación; [regresión](evidence/anx-013/original-diagrams.json) |
| Navegación y teclado | Acceso desde Home, menú móvil Enter/Escape con foco restaurado, CTA de arquitectura con foco en destino; [registro](evidence/anx-013/navigation.json) |
| Reduced motion real | Hero y tres figuras nuevas estáticas en Chrome con preferencia real, Accessibility 100; [cuatro navegaciones](reports/anx-013/motion-check/results.json) |
| Consola | Sin errores ni warnings en las sesiones de QA guardadas |

Se añadieron pruebas de ruta/metadata/hash, relaciones válidas y estados de los tres modelos, traducción de sus labels y render SSR real EN/ES con tres placeholders y contenido completo antes de Flow. El extractor de cobertura incluye la nueva copia editorial `<Copy>`. Se actualizan las expectativas a cuatro rutas sin relajar la preservación de los modelos originales ni de credenciales, perfil y controladores.

El primer ensayo móvil reutilizó una receta anterior que pulsaba el Hero inmediatamente después de recargar y falló en su aserción de pausa. Se añadió sincronización explícita del estado del botón al arnés y se repitió correctamente; no se modificó el Hero. El verificador de chunks también detectó el `facadeModuleId` ausente del nuevo chunk compartido: se corrigió su identificación por módulos, manteniendo las aserciones de aislamiento. La revisión final del árbol accesible detectó además controles de zoom y estados de carga de Nodalume en inglés bajo ES: su catálogo independiente no heredaba las cadenas del catálogo de los casos anteriores. Se incorporaron únicamente las cadenas genéricas necesarias al catálogo de la ruta, sin cargar el catálogo completo de los otros proyectos. Se añadieron aserciones SSR de los tres placeholders y del nombre accesible del índice, cobertura de controles/recuperación y comprobación real de «Acercar / Alejar / Ajustar vista». Se reconstruyó y repitió QA y rendimiento sobre la corrección. Los hallazgos no se ocultaron ni se resolvieron desactivando pruebas.

Recetas: [Nodalume](reports/anx-013/browser-qa.mjs), [regresión](reports/anx-013/regression-qa.mjs). El runner Lighthouse admite ahora `ANX_LH_ROUTES=home` o `nodalume`; los valores predeterminados de fases anteriores se conservan.

## Evidencia visual

Capturas reales del build local, sin generar screenshots de producto ni datos ficticios. Las imágenes del navegador integrado son JPEG; su compresión, especialmente en escritorio, limita el detalle fino. No sustituyen las pruebas de interacción ni afirman fluidez medida.

| Vista | Escritorio | Móvil |
| --- | --- | --- |
| Portada EN | [1440](evidence/anx-013/hero-en-1440.jpg) | [375](evidence/anx-013/hero-en-375.jpg) |
| Portada ES | [1440](evidence/anx-013/hero-es-1440.jpg) | [375](evidence/anx-013/hero-es-375.jpg) |
| Plataforma ES | [Grafo](evidence/anx-013/platform-es-1440.jpg), [contexto](evidence/anx-013/architecture-context-es-1440.jpg) | [Grafo](evidence/anx-013/platform-es-375.jpg), [tableta 768](evidence/anx-013/platform-es-768.jpg) |
| Builder ES | [Grafo](evidence/anx-013/builder-es-1440.jpg) | [Grafo](evidence/anx-013/builder-es-375.jpg) |
| Evolución ES | [Grafo](evidence/anx-013/evolution-es-1440.jpg), [contexto](evidence/anx-013/future-es-1440.jpg) | [Grafo](evidence/anx-013/evolution-es-375.jpg) |
| Referencias de diseño | [1440](evidence/anx-013/design-es-1440.jpg) | [375](evidence/anx-013/design-es-375.jpg) |

## Archivos y límites de entrega

- Nueva página y estilo: `src/pages/projects/Nodalume.jsx`, `src/style/nodalume.css`.
- Identidad y modelos: `NodalumeMark.jsx`, `graphics/nodalume_flow.jsx`, `src/data/nodalume.js`, catálogo `locales/nodalume.js`.
- Integración: App, proyectos, ProjectVisual, CSS de ficha, navegación, pageMetadata, catálogo común, sitemap y generador de head estático.
- Verificación: comprobador de chunks, runner Lighthouse, tests de Nodalume/metadatos/i18n y extractor de mensajes.
- Cinco documentos de ANX-013, logs, LHR, recetas y capturas en sus carpetas de evidencia/reportes.

Sin cambios a Hero, perfil, capacidades, credenciales, fuentes/tokens, dependencias, los seis componentes originales de gráficos, sus controladores o los textos de los dos casos previos. No se inicia el micrositio de producto ni se configura un despliegue.

La suspensión por pestaña y limpieza se apoyan en el observador compartido y sus pruebas existentes; no se afirma un ensayo físico de cambio de pestaña en todos los navegadores. No se midieron FPS/CPU sostenida ni se grabó vídeo. Falta evidencia independiente del runtime de Nodalume para ampliar diagramas de autenticación, sesiones y tenancy. Tampoco se probaron Safari, hardware táctil o lector de pantalla físico.

**Entrega para revisión del propietario.** La siguiente decisión de contenido es aportar evidencia saneada del proyecto real para ampliar el alcance implementado, manteniendo la separación respecto a los conceptos de producto y cloud. Esta fase no autoriza publicación ni inicia otra fase.
