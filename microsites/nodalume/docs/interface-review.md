# Revisión de acabado

Modo full; landing React/Vite completa, CSS propio y SVG geométrico, EN/ES. Revisión inline por el mismo ejecutor, usando las capturas reales y los criterios documentales de Impeccable y Make Interfaces Feel Better; no se presenta como revisión independiente ni como ejecución de sus motores.

## Cobertura

| Categoría   | Evidencia inspeccionada                                                                                        | Resultado                                                                         |
| ----------- | -------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Tipografía  | Hero, escena oscura, producto, mapa, footer; 12 combinaciones idioma/ancho                                     | Escala ajustada; ningún texto fuera del viewport final                            |
| Superficies | Canvas, contraste negro, frame y estado pendiente, footer violeta                                              | Ritmo editorial y placeholder explícito; sin grid de tarjetas                     |
| Animaciones | Matrices del cursor, recorrido de señal, scroll, viewport, 3 ciclos de cleanup, reduced motion, fallo de chunk | Funcionamiento observado; cambio real de visibilidad y revisión a 10 % pendientes |
| Iconos      | Flecha, expansión, menú, pausa, foco y targets                                                                 | SVG coherentes; controles de cabecera 44 px mínimo; estados por texto y ARIA      |
| Rendimiento | Manifest, bytes, Lighthouse final 3 + 3 y corrida reduced motion                                               | GSAP separado; métricas y límites documentados                                    |

## Hallazgos corregidos

| Severidad | Ubicación                            | Antes                                                                           | Después                                                      | Motivo                                                               |
| --------- | ------------------------------------ | ------------------------------------------------------------------------------- | ------------------------------------------------------------ | -------------------------------------------------------------------- |
| MEDIUM    | `src/styles.css:224` y `:235`        | Syne ancha hacía crecer la columna de texto y comprimía el SVG                  | Columnas minmax(0,…) y escala medida sobre el lettering real | Mantener dos protagonistas legibles en escritorio                    |
| MEDIUM    | `src/styles.css:955`                 | “connection” salía del espacio disponible a 320 px en EN                        | Mínimo del título móvil de cierre reducido a 2.6rem          | Evitar recorte de contenido real, sin ocultar overflow como solución |
| MEDIUM    | `src/styles.css:786`                 | Controles de idioma de 38 px de ancho                                           | 44 × 44 px y gap de cabecera ajustado                        | Objetivos táctiles utilizables a 320 px                              |
| MEDIUM    | `src/App.jsx:27`, `src/motion.js:34` | Entrada y scroll podían escribir el mismo transform                             | Wrappers separados para entrada, scroll y cursor             | Evitar competición y saltos en la coreografía                        |
| LOW       | `src/App.jsx`, ancla `#top`          | Volver al Hero podía dejar parte de la cabecera arriba del viewport             | Ancla en la raíz de la página, sin ID duplicado              | Retorno completo al inicio                                           |
| LOW       | `src/motion.js:30`                   | Opacidad .8 del texto secundario durante entrada reducía demasiado su contraste | .9 en párrafo/CTA                                            | Conservar contraste durante la transición                            |

## Alternativas consideradas y rechazadas

| Ubicación      | Candidato                                       | Razón                                                                                                                |
| -------------- | ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Hero           | WebGL/Three.js para los planos                  | La geometría y la profundidad necesaria se expresan con SVG + transforms; añadiría un motor sin necesidad demostrada |
| Narrativa      | Pinning prolongado                              | Dificultaría lectura y scroll nativo; el scrub del objeto ya aporta continuidad                                      |
| Producto       | UI sintética o control de reproducción simulado | Podría confundirse con evidencia real de una función o un video disponible                                           |
| Sistema visual | Tarjetas iguales para todo el mapa              | Reduciría la jerarquía editorial y la diferenciación solicitada                                                      |

## Verificación y veredicto

`npm ci`, lint y tests del micrositio, build con manifest, lint de ANXZU y `git diff --check` correctos. Menú mediante Tab/Enter/Escape, devolución del foco, navegación del CTA, details con Enter/Space y foco visible verificados. Tres ciclos de pausa/reanudación dejaron cero/cuatro triggers respectivamente. EN persiste tras recarga; el cambio de idioma conserva la pausa y el hash. Consola normal sin warnings ni errores. Las capturas de 320, 375, 768, 1024, 1440 y 1920 px no presentan texto fuera de viewport, IDs duplicados ni scroll horizontal.

**Approve para revisión local del propietario.** No quedan hallazgos HIGH/MEDIUM abiertos en el alcance observado. Límites junto al veredicto: no se verificaron dispositivos físicos, todos los motores de navegador, lector de pantalla real, FPS/CPU, inspección del movimiento a 10 % de velocidad o suspensión real al cambiar de pestaña convencional. Esta última se implementó y revisó en código; IAB no produjo un estado hidden al abrir otra pestaña. No es un veredicto de publicación.
