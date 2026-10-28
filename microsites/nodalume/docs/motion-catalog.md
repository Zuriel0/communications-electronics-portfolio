# Catálogo de movimiento

| Escena                | Implementación                                                                                  | Propósito y límites                                                                                                                 |
| --------------------- | ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Entrada del Hero      | Timeline con etiqueta `open`, texto .9 s, stagger .12 s, composición 1.3 s; power3.out          | Opacidad mínima .78 en título, .9 en párrafo/CTA; desplazamientos 12–22 px. Contenido visible por defecto.                          |
| Composición ambiental | Una timeline GSAP de 8 s; planos suben/bajan 13 unidades SVG y giran 1.5°                       | Hace perceptible la relación entre planos. Solo reproduce si el Hero está visible y el documento no está oculto.                    |
| Señal de conexión     | Un objeto de progreso en la misma timeline; una señal recorre una única trayectoria SVG         | Composición conceptual, no evidencia de transferencia o topología. Un update compartido, no un RAF por conexión.                    |
| Cursor                | Tres quickTo creados una vez; x ±10 px, y ±8 px, giro ±1.5°; interpolación .9–1.1 s             | Solo puntero fino con hover. Límites geométricos cacheados, sin medición de layout en cada movimiento. Móvil no depende del cursor. |
| Salida del Hero       | Dos ScrollTriggers con scrub .6 s; yPercent 16, giro 10°, escala .88 y opacidad del gráfico .65 | Continuidad hacia la escena oscura; no pinning, captura de rueda ni scroll artificial. No se transforma texto/CTA con el scroll.    |
| Filosofía             | Un ScrollTrigger tipográfico, x 16 a 0 y opacidad .72 a 1                                       | Revelado ligado al avance de lectura; texto siempre legible y seleccionable.                                                        |
| Espacio de película   | Un ScrollTrigger; entrada finita del pliegue, y 24, giro −3°, 1.2 s                             | Diferencia el ritmo de la escena; no reproduce un video ficticio ni un loop adicional. Pausa fuera de la escena.                    |
| Enlaces               | Snippet CSS learn-more-hover; 2 px y apertura de brazos de flecha; hover/focus                  | Confirmación pequeña de dirección, sin información exclusiva del hover.                                                             |
| Mapa de alcance       | Superficie del control circular y giro del icono; details nativo                                | Comunica apertura real del contenido, sin animar toda la lista ni ocultar texto imprescindible.                                     |

## Ciclo de vida

La entrada React importa `motion.js` después del montaje. El módulo incluye GSAP y ScrollTrigger; no se importa con reduced motion. Las capas de entrada, scroll, puntero y planos son independientes para evitar competir por el mismo transform.

Cada montaje crea un `gsap.context` acotado a la raíz. Al pausar, cambiar la preferencia del sistema o desmontar: `context.revert()`, desconexión de IntersectionObserver y ResizeObserver, cancelación del frame de refresh, retirada de listeners y restitución de la señal estática. Los callbacks tardíos de carga/fuentes comprueban si siguen vigentes. No se mata globalmente una animación de otro componente.

`visibilitychange` pausa la timeline ambiental y la entrada, suspende los triggers y conserva las animaciones interrumpidas para la vuelta. La reanudación ambiental exige además estar en viewport. El control manual elimina toda la capa de movimiento; no solo el loop. Tres ciclos de prueba conservaron 4 → 0 → 4 triggers, sin crecimiento. La cuenta de diagnóstico del DOM se obtiene de `ScrollTrigger.getAll()`.

## Fallback y verificación

La preferencia de movimiento reducido produce una composición estática completa y elimina smooth scroll y desplazamientos de iconos. La prueba de Lighthouse observó `reduced: true`, `triggers: 0`, control deshabilitado y ninguna petición del chunk de movimiento. Un servidor temporal devolvió 503 solo para ese chunk: la página quedó en `static-fallback`, con el CTA operativo.

Se observaron valores cambiantes de la señal y de la matriz del cursor mediante acciones reales; salida de viewport con ambiental pausado; foco, Escape y details mediante teclado. No se grabó video. No se midieron FPS, ni se realizó una inspección a 10 % de velocidad. El cambio real de visibilidad de pestaña no pudo reproducirse de forma fiable con IAB: sus documentos permanecieron visibles al abrir otra pestaña; esa parte se revisó en código y queda pendiente de comprobación manual en un navegador convencional. No se afirma que esa prueba haya pasado.
