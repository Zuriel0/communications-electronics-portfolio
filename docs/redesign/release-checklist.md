# ANXZU — Matriz de aceptación para publicación

Actualizada: 23 de octubre de 2026 · America/Mexico_City. Rama `codex/anx-001-redesign-audit`.

**Resultado: revisión local disponible; publicación bloqueada por instrucción del propietario.** No hay autorización de commit, push ni despliegue. Este documento no autoriza ninguna de esas acciones.

Estados: **Aprobado** = evidencia suficiente para el alcance indicado; **Pendiente** = comprobación o decisión concreta por completar; **Bloqueado** = acción expresamente impedida; **No evaluado** = no se obtuvo medición o ensayo. Un aprobado local no implica validación de producción ni conformidad WCAG completa.

## Matriz

| Condición | Estado | Evidencia y alcance | Próximo responsable / acción |
| --- | --- | --- | --- |
| Coherencia de las seis escenas | Aprobado | [Home escritorio](reports/anx-006-home-desktop.jpg) y [móvil](reports/anx-006-home-mobile.jpg); jerarquía, tokens y continuidad Pearl/Obsidian preservados | Propietario: revisión visual final |
| Biografía, identidad, dos proyectos, capacidades y experiencia conservados | Aprobado | SHA-256: 89 archivos intactos, 16 cambios, ninguna eliminación; [validación](reports/anx-006-validation.json) | Mantener alcance |
| Seis diagramas y datos técnicos | Aprobado | 46 nodos y todas las conexiones preservados por AST; Zoom In/Fit View con teclado en los seis | Mantener datos; detalle móvil requiere ampliar |
| Rueda y lectura de diagramas | Aprobado | ScrollY 2495→2855 sin cambiar zoom; captions separados del lienzo; [antes](reports/anx-006-diagram-before.jpg)/[después](reports/anx-006-diagram-after.jpg) | Sin cambios pendientes del caso reproducido |
| Encuadre inicial de Metodología | Aprobado | Dos gráficos completos en los seis anchos; [detalle móvil](reports/anx-006-method-fit-mobile.jpg) | Repetir con hardware táctil antes de publicación |
| Responsive 320/375/768/1024/1440/1920 | Aprobado | Matriz de 18 combinaciones sin overflow horizontal, un h1/main por ruta | Alcance: viewport en navegador integrado |
| Rutas originales, entrada directa y recarga en Preview | Aprobado | HTTP200 y head correcto de las tres rutas, con/sin barra final; casos profundos probados | Staging aún pendiente |
| Hashes y navegación de regreso | Aprobado | IDs home únicos, destinos existentes; #highLevel, #introduce, #solucion y regreso a #projects con foco | Conservar destinos |
| Menú y teclado | Aprobado | Skip link, Escape/restauración, Tab durante cierre, breakpoint escritorio y recorrido de CTA | Alcance: teclado del navegador integrado |
| Contraste de tokens y foco | Aprobado | Tests oscuros/claros y foco observado de 3 px; Lighthouse Accessibility100 | No equivale a todos los criterios WCAG |
| Semántica y enlaces | Aprobado | Alias aria corregido; idiomas en/es/es; alt del retrato, mailto y enlaces externos originales | No se envió correo ni mensajes |
| Suspense estable | Aprobado | Retraso local de 8 s: role=status, main812px, resolución del hash y dos gráficos | [Fallback](reports/anx-006-loading-mobile.jpg) |
| Error de carga y recuperación | Aprobado | 503 local intencional; role=alert, recarga con Enter recupera #solucion y diagramas | [Error](reports/anx-006-chunk-error-mobile.jpg); servidor de fallos detenido |
| React Flow fuera de portada | Aprobado | `check-project-chunks.mjs`: sin Flow/d3/zustand en carga inicial, dos rutas dinámicas | Vigilar futuras importaciones |
| Efectos y capitalización de imports | Aprobado | Cleanup revisado; 89 imports relativos en 55 archivos sin errores de capitalización | Sin perfil exhaustivo de memoria |
| Consola de rutas normales | Aprobado | Sin errores/warnings en vistas inspeccionadas; 18 auditorías sin runtimeError | Fallos 503 deliberados se excluyen |
| Lint, build, tests y diff | Aprobado | Lint/build pasan; 13/13 tests; chunks y diff check pasan | Repetir si cambia implementación |
| Performance≥90 y Accessibility≥95 | Aprobado | 18 Lighthouse finales: P97–100 y A100; [métricas](reports/anx-006-metrics.json) | Alcance: laboratorio local |
| LCP≤2,5 s y CLS≤.1 | Aprobado | 18 muestras: LCP máximo2473,63ms, CLS0 | Repetir en staging; poco margen en Concurrencia móvil |
| TBT | Aprobado | Mediana0ms salvo Concurrencia móvil1,5ms | Indicador de laboratorio, no INP |
| Fuente local y licencia | Aprobado | Mismo Inter48432bytes, preload y OFL distribuida; sin nueva dependencia | [Bundles](reports/anx-006-bundles.json) |
| Títulos/description/OG básicos/canonical | Aprobado | Head estático y React de las tres rutas, sin duplicaciones; dominio público verificado en lectura | Verificar host final y caché |
| Robots y sitemap | Aprobado | HTTP200, text/plain y text/xml; exactamente tres URLs de producción | Confirmar respuestas del alojamiento |
| Reduced motion real, incluida alternancia en sesión | Pendiente | CSS y unit tests existen; preferencia del navegador no emulada | QA/propietario: protocolo del [reporte](anx-006-report.md#protocolo-manual-de-reduced-motion-y-zoom) |
| Safari en macOS | Pendiente | No ejecutado: control nativo sin permisos/timeout | QA: Safari real, versión y resultados de tres rutas |
| Chrome con interfaz y zoom 200/400 % | Pendiente | Chrome155 headless sí ejecutado; zoom nativo no disponible | QA: zoom real, foco y reflujo; restaurar100 % |
| Fallback visual sin view-timelines en otro motor | Pendiente | Fallback Hero por unidad; bases estáticas revisadas; IAB sí soporta timelines | QA: motor sin soporte o entorno compatible documentado |
| Hardware táctil | Pendiente | Objetivos44px y viewport no prueban gestos reales | QA: pan/pinch, scroll nativo, menú y controles |
| Lector de pantalla y comprensión de diagramas | No evaluado | Texto HTML y nodos conservados, sin ensayo VoiceOver | QA: recorrido y descripción de relaciones, no solo controles |
| INP≤200 ms de campo | No evaluado | Sin dataset de usuarios reales | Instrumentación/analítica autorizada; no sustituir por TBT |
| Frames/FPS y vídeo de scroll | No evaluado | Se registran estados de timeline y screenshots, sin perfil continuo | QA: perfil real; no afirmar60FPS |
| Datos profesionales vigentes | Pendiente | “Actualidad”, “2022 - 2022” y reducción de horas conservadas | Propietario: confirmar o corregir con material verificable |
| og:image y preview social | Pendiente | Metadatos básicos completos; sin imagen nueva inventada | Propietario: elegir material real y validar preview |
| 404 y URLs desconocidas | Pendiente | Comportamiento previo sin pantalla404; noindex en cliente no cambia status HTTP | Definir política de servidor/producto sin inventar nuevas rutas |
| Rewrites, DirectorySlash, MIME, caché y deep links del alojamiento final | Pendiente | Solo Preview local comprobado; configuración de hosting preservada | QA/hosting: staging autorizado antes de publicar |
| Revisión visual del propietario | Pendiente | [Reporte y capturas](anx-006-report.md#evidencia-visual) disponibles | Propietario: revisar sin implicar despliegue |
| Commit, push y publicación | Bloqueado | Prohibición explícita del encargo ANX-006 | Requiere autorización nueva del propietario |
| Inicio automático de otra fase | Bloqueado | Fuera del alcance autorizado | No avanzar |

## Condiciones para una futura publicación autorizada

Resolver los pendientes de accesibilidad, navegador y alojamiento; confirmar contenido profesional y revisar las capturas con el propietario. Repetir las pruebas afectadas si se modifica el código. Mantener separados los resultados de laboratorio y datos de campo. La ausencia de FPS o INP no se reemplaza por una estimación.

El último intento de actualizar una captura fue rechazado por la revisión automática del navegador debido a límite de uso. Las capturas completas anteriores siguen disponibles; no se eludió ese control. La captura `anx-006-home-tablet-viewport.jpg` corresponde a tableta con ancho útil de 747 px; la evidencia de escritorio es la captura completa de 1425 px.
