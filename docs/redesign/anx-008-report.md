# ANX-008 — Animated Engineering Flows

Fecha: 23 de octubre de 2026 · America/Mexico_City.

Estado: implementación y validación local completadas; pendiente de revisión del propietario. Rama `codex/anx-001-redesign-audit`. Sin publicación, push ni inicio de ANX-009.

## Alcance y decisiones

Se revisaron `audit.md`, reportes ANX-006/007, los seis gráficos, CSS de React Flow, lógica de reproducción y pruebas existentes. Se aplican `frontend-design` y `ui-ux-pro-max`: jerarquía, claridad de relaciones, controles de movimiento persistente y alternativa reducida. La recomendación genérica de limitar animaciones continuas cede ante la petición explícita de recuperar flujo y simulación automáticos; se restringen a las figuras visibles y se ofrece pausa individual.

El diseño conserva nodos, posiciones, superficies, tipografía y escala existentes. Ice Blue destaca la conexión que se está explicando; flechas nativas indican su dirección de origen a destino. Las etiquetas originales y el HTML siguen explicando el sistema cuando no hay movimiento. No se añade ninguna topología ni se presentan datos en vivo.

Se evaluaron primero los edges nativos y CSS. El prototipo con `stroke-dashoffset` tuvo un coste sostenido alto en la medición local. Se sustituyó por un **edge de presentación con BaseEdge, getSmoothStepPath y ViewportPortal de @xyflow/react**: la misma geometría SmoothStep, etiquetas y flechas estáticas, con una pequeña señal HTML que recorre exactamente ese path mediante CSS `offset-path`. No se instala ninguna biblioteca ni se crea un RAF por conexión.

Las señales Ice Blue tienen 6 px visuales, compensados por el zoom del viewport, y un halo discreto sin filtros. Recorren cada enlace en 1,6 s lineales; las etapas avanzan cada 1800 ms, conservando la cadencia original del balanceador. La duración normalizada ayuda a reconocer cada etapa; no codifica velocidad de red ni latencia. Las ramas de monitoreo independientes continúan mientras corresponde reproducir. El recorrido se identifica como **Recorrido ilustrativo**.

Los trazos originales y los nodos permanecen estáticos. El navegador recibe `will-change: transform` solo en las señales que están reproduciéndose. Si no soporta motion paths, conserva la figura completa con flechas y selección por etapas; la señal queda oculta. Reduced motion muestra el estado completo sin simulación automática.

## Implementación de cada diagrama

| Componente | Rutas animadas y condiciones | Diferencia respecto al estado anterior |
| --- | --- | --- |
| `flow_loadbalance` | `client-lb` y exactamente una de `lb-ws1/2/3`. Tres destinos alternos; solo el servidor elegido muestra Procesando solicitud | Recupera inicio automático al hacerse visible; pausa detiene simulación y conexiones. Conserva 1800 ms y el esquema original de tres destinos dibujados |
| `bussiness_flow` | `e1` → `e2` → `e3`, una transferencia de negocio por etapa; `m1` y `m2` se mantienen simultáneos e independientes | La condición “si web termina bien → RADIUS” conserva su label y su orden. Los observadores Web/RADIUS no dependen del paso de negocio |
| `logic_flow` | MAC→SSH; después SSH→Web y SSH→RADIUS en paralelo; retornos Web y RADIUS ilustrados por separado; salida centralizada | La política opcional `policy-detect` permanece como referencia estática, sin flecha de transferencia. No se sugiere que detener otros Web afecte RADIUS |
| `highlevel_flow` | Ejecución local; herramienta/configuración; apertura SSH; dos grupos paralelos; dos lecturas de logs; retornos ilustrados por separado; consola | Ocho etapas recorren solo conexiones existentes. Alternar los retornos es una presentación, no una condición de espera entre Web y RADIUS |
| `metodologia_problem_flow` | `a-b` → `b-c` → `c-d` → `d-e` → `e-f` | Un enlace por etapa recorre los seis pasos originales, sin saltos ni nueva información |
| `metodologia_solution_flow` | Misma secuencia dirigida de cinco enlaces entre seis pasos; descripciones propias preservadas | Conserva la distinción textual del flujo de solución y todos sus pasos |

El balanceador ya mostraba tres servidores como simplificación gráfica. No se cambia esa arquitectura original ni se amplía a una topología inventada. La explicación HTML, el diagrama lógico y la arquitectura de alto nivel siguen declarando **seis Web**, **dos RADIUS disponibles y uno activo**, con monitoreo RADIUS independiente. La comparación estructural incluye todos esos datos.

La animación es un recorrido explicativo, no una simulación de resultados, latencias o ejecución de solicitudes reales. Los caminos condicionales no se encienden todos a la vez. Los ramales que sí representan paralelismo conservan esa relación.

## Reproducción, pausa y accesibilidad

Los seis consumen `useDiagramPlayback`. Cada controlador usa un IntersectionObserver y, mientras corresponde reproducir, un solo intervalo. Se requiere al menos un 12 % visible, descontando los 80 px del header. Al salir se cancelan el intervalo y la animación CSS. Si dos figuras están realmente visibles, cada una puede reproducirse; las que quedan fuera permanecen detenidas.

`visibilitychange` suspende intervalo y CSS al ocultar documento. Solo se reanudan si la figura sigue visible, no hay pausa manual y la preferencia no es reducida. No se recuperan pasos “perdidos” durante la pausa. El cleanup elimina listener/observer e intervalo y protege contra callbacks tardíos. El fallback sin IntersectionObserver comprueba límites por eventos scroll/resize, sin un bucle de frames.

Cada figura tiene botón nativo anterior al lienzo: **Pausar conexiones / Reanudar conexiones**; el balanceador utiliza **Pausar simulación / Reanudar simulación** y afecta también a sus líneas. `aria-pressed` expresa la pausa elegida, `aria-controls` identifica la figura y el nombre accesible distingue los seis controles. Los botones tienen al menos 44 px y foco de 3 px. Se colocan fuera del frame para conservar el espacio de caption y canvas corregido en ANX-006.

La pausa manual persiste al desplazarse a otra parte del mismo proyecto y regresar. Un montaje nuevo de la ruta vuelve al inicio automático normal; no se guarda una preferencia permanente ni se añade almacenamiento. Los nuevos hashes `#diagram-loadbalance`, `#diagram-business`, `#diagram-logic`, `#diagram-highlevel`, `#diagram-methodology-problem` y `#diagram-methodology-solution` permiten revisar cada figura y dejan sitio para su control bajo el header. Todos los hashes anteriores siguen intactos.

Con reduced motion, la figura completa permanece estática, no se crea el intervalo y el control indica Movimiento reducido deshabilitado. El hook existente escucha cambios de preferencia; una pausa manual no se pierde al volver a movimiento normal. No se elimina información ni se exige animación para entender el flujo.

Se asignaron IDs nativos únicos `rf-*` a las seis instancias. La inspección encontró cuatro copias de IDs de marcadores, patrones y descripciones ARIA cuando los cuatro React Flow compartían el identificador predeterminado. Tras el ajuste, las dos páginas no presentan esos duplicados. Esto no cambia nodos ni encuadre.

## Integridad y alcance de archivos

El AST de las definiciones originales confirma **46 nodos y 37 conexiones idénticos**, incluidos labels, texto de los componentes de nodo, posiciones, estilos y handles. Las opciones originales de React Flow para encuadre, zoom, arrastre y scroll siguen iguales. La comparación excluye únicamente el nuevo ID de instancia, el registro de edgeTypes de presentación y el prop de edges decorados; no excluye posiciones. [Resultado estructural](reports/anx-008-integrity.json).

Se conservan fitViewOptions y minZoom de ANX-006. Los captions no se superponen al canvas. Los controles nuevos agregan espacio alrededor de la figura, sin reducir su lienzo interno. El movimiento solo decora los edges de presentación; no modifica las definiciones del modelo.

Archivos existentes modificados: los seis componentes gráficos y las reglas específicas de diagramas en `src/styles/base.css`, retirando el botón flotante anterior y su habilitación global de animaciones. Archivos nuevos: `src/hooks/useDiagramPlayback.js`, `src/utils/diagramVisibility.js`, `src/utils/engineeringFlows.js`, `src/components/ui/DiagramPlaybackControls.jsx`, `src/components/ui/EngineeringFlowEdge.jsx`, `src/components/ui/engineeringEdgeTypes.js`, `src/style/engineering-flows.css`, `tests/engineering-flows.test.js`, este reporte y evidencias.

Hero, perfil, capacidades, experiencia, contacto, datos profesionales, textos HTML de proyectos, assets, dependencias y documentos de fases previas permanecen fuera de los cambios. No se incorporan certificaciones ni contenido personal.

## Validación funcional y visual

Se inspeccionaron los seis gráficos con viewport de escritorio 1440 px y móvil 375 px, además de las dos rutas a 320, 375, 768, 1024, 1440 y 1920 px. La matriz registra ancho client/scroll iguales, un main y un h1 por página, cuatro gráficos en Concurrencia y dos en Metodología, controles de al menos 44 px y separación correcta entre caption y lienzo. La escala general conserva las correcciones ANX-006; en móvil los gráficos densos requieren Zoom In para leer detalles, con Fit View disponible para recuperar el conjunto.

La inspección dinámica comprueba cambio de destino en el balanceador, avance de la señal y de etapas, exclusión de otros gráficos fuera de vista, pausa/reanudación por teclado y estado estático al pausar todas las figuras. La pausa elegida se conserva después de salir y regresar al mismo gráfico. No se trata una captura estática como evidencia de continuidad temporal.

Los controles nativos Zoom In y Fit View funcionan en los seis; el zoom elegido se conserva al avanzar de etapa. La rueda sobre el lienzo desplaza la página sin cambiar el zoom del gráfico. Las rutas profundas se abren y recargan en Preview; la navegación de los proyectos y regreso a Home conserva sus enlaces.

La ocultación real de pestaña no está expuesta por el navegador controlado: ocultar el panel mantuvo `document.visibilityState === 'visible'`. No se inyectan eventos falsos para presentarlos como prueba real. Los tests verifican hidden→visible, repetición sin duplicados, pausa manual, reduced motion y cleanup; queda una revisión nativa de pestaña y preferencia en vivo. La preferencia reducida al arrancar se comprueba adicionalmente con Chrome headless real.

## Evidencia visual

Las imágenes muestran la figura en contexto y el control accesible anterior. Escritorio solicitado: 1440×1440 para incluir los lienzos altos completos; móvil: 375×1000. El renderer del navegador exporta el ancho útil descontando la barra de scroll. No se alteran ni reconstruyen las capturas.

| Figura | Escritorio | Móvil |
| --- | --- | --- |
| Balanceador | [Ver](reports/anx-008-loadbalance-desktop.jpg) | [Ver](reports/anx-008-loadbalance-mobile.jpg) |
| Negocio y observabilidad | [Ver](reports/anx-008-business-desktop.jpg) | [Ver](reports/anx-008-business-mobile.jpg) |
| Trazabilidad por MAC | [Ver](reports/anx-008-logic-desktop.jpg) | [Ver](reports/anx-008-logic-mobile.jpg) |
| Alto nivel | [Ver](reports/anx-008-highlevel-desktop.jpg) | [Ver](reports/anx-008-highlevel-mobile.jpg) |
| Metodología: problema | [Ver](reports/anx-008-methodology-problem-desktop.jpg) | [Ver](reports/anx-008-methodology-problem-mobile.jpg) |
| Metodología: solución | [Ver](reports/anx-008-methodology-solution-desktop.jpg) | [Ver](reports/anx-008-methodology-solution-mobile.jpg) |

El navegador no ofrece grabación ni perfil continuo de frames. La demostración real está en las rutas locales con los nuevos hashes de figura. Se guardan observaciones de estados progresivos y movimiento CSS; no se fabrica un vídeo a partir de capturas ni se afirma una tasa de FPS.

## Bundle y carga diferida

Comparación de bytes reales sin comprimir contra el build ANX-007 guardado al iniciar. No equivale a Web Vitals ni al tamaño transferido por un servidor. Las dependencias y el lockfile no cambian en esta fase.

| Asset | ANX-007, bytes | ANX-008, bytes | Diferencia |
| --- | ---: | ---: | ---: |
| JS inicial | 273859 | 273875 | +16 |
| CSS inicial | 37015 | 36746 | -269 |
| JS compartido proyectos | 176460 | 180584 | +4124 |
| CSS diferido React Flow/diagramas | 17425 | 18568 | +1143 |
| Concurrencia | 41301 | 42236 | +935 |
| Metodología | 13962 | 14793 | +831 |

El JS inicial crece 16 bytes por las referencias generadas a chunks y su CSS; el código de flujo permanece diferido. Las reglas antiguas del control flotante salen del CSS inicial; la nueva hoja se importa exclusivamente desde los gráficos de proyecto. `check-project-chunks` confirma que Home no importa React Flow, d3 ni zustand. Imágenes, fuente, rutas de carga diferida y Hero ANX-007 quedan idénticos.

[Comparación detallada](reports/anx-008-bundles.json), [baseline](reports/anx-008-build-before.json), [build final con SHA256](reports/anx-008-build-final.json).

## Pruebas ejecutadas

| Comprobación | Resultado |
| --- | --- |
| `npm run lint` | Pasa, sin warnings; [salida](reports/anx-008-lint.txt) |
| `npm run build` | Pasa; [salida](reports/anx-008-build.txt) |
| `node --test tests/*.test.js` | **26/26**, incluidos los 17 existentes; [salida](reports/anx-008-tests.txt) |
| `node scripts/check-project-chunks.mjs` | Pasa; [salida](reports/anx-008-chunks.txt) |
| `git diff --check` | Pasa |
| Imports y capitalización | 129 imports en 67 archivos, sin errores; [salida](reports/anx-008-imports.txt) |
| Integridad de modelos / encuadre | 46 nodos y 37 conexiones, definiciones y opciones originales iguales |
| Consola del navegador controlado | Sin errores ni warnings en los casos finales inspeccionados |

Los nueve tests nuevos cubren entrada/salida de viewport, hidden→visible sin intervalos duplicados, pausa manual y reduced motion, cancelación al cambiar a estático, fallback por eventos con limpieza, exclusividad del balanceador, independencia de monitoreo, secuencia de metodología y preservación de edges. Los modelos originales no se sustituyen por fixtures nuevos.

El registro [de validación](reports/anx-008-validation.json) incluye los doce casos visuales finales, matriz responsive, foco y pausa, tamaño de señal después de zoom y comparación SHA256 contra los 208 archivos existentes al iniciar: **201 intactos y solo siete modificados**, todos dentro del alcance. Una observación intermedia registró el fallback de carga antes de montar los gráficos; el caso de 320 px se volvió a medir después del montaje y se conserva separado de esa observación.

Las dos comprobaciones de Chrome con `--force-prefers-reduced-motion` muestran el control Movimiento reducido y la figura completa al arrancar. Lighthouse 13.5.0 / Chrome155 reporta A100 en ambas rutas: [Concurrencia](reports/anx-008-reduced-concurrencia.json), [Metodología](reports/anx-008-reduced-metodologia.json). Son probes de preferencia reducida a hashes concretos; no sustituyen una auditoría normal de rendimiento, una medición de FPS ni conformidad WCAG completa. No se comparan sus métricas de carga con las rutas superiores de ANX-006.

## CPU aproximada, suspensión y fluidez

Método: Chrome headless nuevo con perfil temporal por ejecución, ventana1440×1000, tres repeticiones alternas por estado. Tras 3 s de calentamiento se toman ocho muestras de aproximadamente 1 s del tiempo CPU acumulado del árbol de procesos mediante `ps`. Se suman navegador, renderer y auxiliares descendientes. **100 % significa un núcleo**, no toda la CPU del equipo. No se miden GPU, energía, batería, temperatura ni FPS.

| Estado | Mediana equivalente de un núcleo | Rango de las tres ejecuciones |
| --- | ---: | ---: |
| Build final, todas las figuras montadas estáticas | 1.33 % | 1.21–1.33 % |
| Build final, balanceador activo | 23.80 % | 23.57–23.95 % |
| Build final, negocio/observabilidad activo | 25.46 % | 25.26–25.93 % |

El estado estático se fuerza mediante la preferencia reducida del navegador para obtener una condición reproducible sin acciones durante las muestras. No se presenta como si se hubieran pulsado los controles dentro de ese proceso. La pausa manual de todos los gráficos de Concurrencia se comprobó por separado en el navegador controlado: cuatro `data-playing=false`, cuatro controles activados y cero señales corriendo. También se pausaron juntas las dos figuras de Metodología, con cero señales corriendo. Al regresar a Home no quedan gráficos ni señales montados. Cada control de los seis gráficos se probó además con Enter para pausar y reanudar.

En las muestras activas están montadas las cuatro figuras de Concurrencia; solo la nombrada queda visible. Las otras tres no reproducen. El Hero no está montado en esta ruta. La comprobación de chunks confirma que no se cargan los gráficos al visitar Home. No se suman ciclos de todos los diagramas durante la lectura de otras escenas.

El prototipo de trazos SVG dio 28.49 % en balanceador; la versión final da 23.80 %, una reducción observada de 16.5 %. El prototipo de trazos SVG dio 30.88 % en negocio; la versión final da 25.46 %, una reducción observada de 17.5 %. Las series se ejecutaron en momentos distintos y no constituyen atribución causal perfectamente aislada. Los ensayos preliminares de señales dieron valores más bajos que la repetición final: ~20–24 % sin la pista de composición y ~18–19 % con ella. Esta variación desaconseja prometer un ahorro universal por `will-change` o extrapolar a hardware móvil.

Se conservan los datos: [trazos iniciales](reports/anx-008-cpu-dashes.json), [señales preliminares](reports/anx-008-cpu-signals-unpromoted.json), [preflight con pista de composición](reports/anx-008-cpu-signals-promoted-preflight.json) y [serie del build final con hashes](reports/anx-008-cpu.json). El [script de método](reports/anx-008-cpu-method.py) documenta calentamiento, muestreo, flags y terminación de los procesos propios. Lighthouse se ejecutó por separado.

El coste sostenido activo sigue siendo relevante frente al estado estático; la mejora principal de ciclo de vida es eliminarlo fuera de viewport, con pausa manual, preferencia reducida o documento oculto. No hay un RAF por conexión ni intervalos simultáneos de gráficos fuera de vista. La reanudación por documento se verifica con tests de controlador; el panel del navegador mantiene visible el documento y no permite certificar un cambio real de pestaña. No se afirma 60 FPS ni fluidez de scroll medida sin un perfil de frames.

## Cierre y pendientes

Implementación y validación local completadas, disponible para revisión del propietario. Las seis figuras tienen movimiento automático contenido y control accesible; el balanceador recupera su simulación automática, conservando un único destino activo. Nodos, conexiones, posiciones, encuadre, etiquetas, textos profesionales, Hero y escenas anteriores se preservan. Dependencias añadidas: **ninguna**.

No se encontraron regresiones funcionales en los casos ensayados. Quedan estos límites de verificación antes de una futura publicación autorizada:

- En Chrome/Safari con interfaz: observar una figura activa, cambiar a otra pestaña y volver; repetir con pausa manual y con la figura fuera de vista. Solo debe volver a reproducir la figura visible sin pausa elegida.
- Cambiar la preferencia de movimiento durante la sesión: detener sin desmontar contenido y restaurar únicamente si la figura visible no tenía pausa manual. El controlador y la suscripción se cubren por pruebas; el cambio real del sistema queda pendiente.
- Revisar en dispositivo táctil y perfilar energía/frames con herramientas nativas. El coste headless aquí medido no describe batería, rendimiento móvil físico ni 60 FPS. En móvil se conserva el encuadre completo y se puede ampliar para leer los nodos densos.
- Continúan los pendientes editoriales/hosting de ANX-006; esta fase no los modifica ni los declara resueltos.

Evidencia de [pausa con foco](reports/anx-008-paused-desktop.jpg), [movimiento: estado A](reports/anx-008-motion-a.jpg) y [estado B](reports/anx-008-motion-b.jpg), [arranque reducido Concurrencia](reports/anx-008-reduced-concurrencia.jpg) y [Metodología](reports/anx-008-reduced-metodologia.jpg). Las dos observaciones de movimiento, separadas por unos119 ms, registran avance de offset-distance de ~7 puntos porcentuales en la misma conexión, con posiciones distintas. Sirven para confirmar movimiento real; no son una grabación ni una medición de FPS.

La reversión de ANX-008 consiste en restaurar los siete archivos preexistentes a su estado al inicio de esta fase y retirar sus nuevos imports/archivos de presentación. No se recomienda un reset global: la rama contiene trabajo previo de ANX-001 a ANX-007 sin commit que debe conservarse.

**Se detiene para revisión: sin publicación, commit, push ni inicio de ANX-009.**
