# ANX-013.1 — Interaction design

## Dirección

Se aplicaron `frontend-design` y `ui-ux-pro-max`. Se conservan Inter y los tokens Obsidian/Pearl/Ice Blue de ANXZU. La identidad de Nodalume, la portada y los tres modelos ANX-013 continúan. El foco nuevo es una mesa de lectura de sistemas: vista, etapa, componente y explicación trazable.

```text
Vistas de ingeniería → elegir un límite técnico
Título + alcance → recorrido por etapas → pausa
Canvas direccional, zoom y Fit View
Selector de componente → explicación + archivo inspeccionado
Versión textual de relaciones
```

Las cinco vistas son botones nativos con `aria-pressed`, sin simular tabs incompletos. Cada selección conserva un hash público propio y monta solo la vista elegida. Los botones numerados representan una secuencia real de lectura; no cuentan transacciones del laboratorio. Los cambios de vista tienen una entrada de opacidad de 0.7 a 1 durante el token de hover, únicamente con movimiento permitido.

## Movimiento con propósito

- Una relación activa por recorrido; una señal Ice Blue recorre su geometría con CSS offset-path (1.6 s). La etapa de lectura avanza cada 2.4 s.
- Las relaciones condicionales siguen visibles y se distinguen con línea discontinua. No se reproducen ramas alternativas a la vez.
- El camino Start→Stop sin Interim queda estático. La solicitud administrativa de terminación es un componente independiente, sin flecha causal hacia Stop.
- En Compose, se iluminan dependencias de disponibilidad, no volúmenes como si fueran paquetes. Servicios independientes pueden arrancar en paralelo.
- Seleccionar etapa o componente pausa el movimiento. Un borde y una superficie identifican la selección, independientemente del color del recorrido.
- El inspector tiene actualización `aria-live=polite` solo al cambiar selección o idioma; no anuncia cada tick automático.
- No hay requestAnimationFrame por conexión, biblioteca nueva, scroll hijacking ni reproducción fuera del viewport.

Se reutiliza `observeDiagramPlayback`: observación de intersección, visibilidad de documento, un intervalo como máximo por diagrama elegible y limpieza al desmontar. La pausa manual sigue siendo autoritativa después de volver a la página. Reduced motion elimina el movimiento y deshabilita autoplay; etapas, selección y texto continúan disponibles.

## Lectura y acceso

Los nodos admiten selección con puntero; el selector HTML proporciona la misma inspección con teclado y táctil. Los botones de etapa miden 44 px; hay foco visible, pausa, zoom y Fit View existentes. La rueda desplaza la página. Cambiar EN/ES conserva etapa, componente seleccionado, pausa, zoom, ruta y hash de la vista actual.

Las etiquetas nuevas se ajustan en varias líneas sin cambiar los seis diagramas de proyectos anteriores ni los tres modelos originales de Nodalume. En móvil se amplía la separación vertical; las conexiones que saltan nodos usan un desvío lateral. El atajo Start→Stop tiene su etiqueta en la versión textual y explicación de Interim; en móvil se omite su rótulo sobre el canvas para evitar superposición. La relación se mantiene visible y estática.

El espacio del canvas y controles se reserva antes de cargar el módulo. El inspector puede crecer con texto extenso seleccionado por el usuario. Cambiar entre modelos reinicia su recorrido y encuadre de forma deliberada; cambiar idioma en un mismo modelo los conserva.

## Product Design DNA

| Referencia | Problema de interacción | Principio adaptado | Decisión propia | Alcance |
| --- | --- | --- | --- | --- |
| Elementor / Wix | Salir de una plantilla fija | Elementos visuales reutilizables | Árbol de documento versionado, contenedores acotados y bloques tipados | Contrato/operaciones implementados, sin aceptación integral nueva |
| Figma | Mantener selección y propiedades en contexto | Inspector contextual | Propiedades permitidas sobre identidad estable de bloque | Inspector y árbol revisados |
| Scratch / Zoho Flow | Comprender condiciones | Lógica visible y bloques comprensibles | Políticas legibles y límites seguros de ejecución | Constructor general conceptual |
| Postman | Entender entradas y resultados de operaciones | Contratos explícitos | Guardar, preview, publicar y restaurar con versiones | REST del editor real; builder genérico de acciones externas conceptual |

Se conservan enlaces a documentación oficial de cada referencia. No se replican sus interfaces ni se afirma afiliación. No hay capturas ficticias del producto: las evidencias visuales muestran el portafolio ejecutándose.

## Operación y futuro

La narrativa explica perfiles de entorno, dependencias, persistencia, diagnóstico y límites de prueba. Los requisitos cloud contemplan ejecución, PostgreSQL administrado, secretos, conectividad NAS/RADIUS, medios, observabilidad, disponibilidad, escala y coste. AWS sigue como opción por evaluar, sin diagrama definitivo o despliegue afirmado.

## Revisión visual

Las capturas y registros se enlazan en el reporte principal y validación de diagramas. El movimiento se evaluó en el navegador mediante cambios reales de offset y etapas; una imagen estática no se usa como prueba de fluidez. La API disponible no proporciona grabación de video; no se afirma un FPS medido.
