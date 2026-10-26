# Plan de refinamiento — ANX-013.2

Base 85e81e5. Conservar Inter, Obsidian #090a0c, Graphite #1c1e23, Pearl #f5f5f7 e Ice Blue #81afff. Sin segunda paleta, nuevos servicios ni cambios al producto privado.

La portada y la introducción mantienen su composición y elemento LCP. La dirección visual concentra el carácter nuevo en la relación entre referencias y decisiones propias, con cuatro ilustraciones SVG de principios, sin fingir pantallas del producto. El resto conserva espacio y lectura editorial alineada a la izquierda.

```text
Referencia y principio visual   →   Decisión propia   →   Alcance verificado/conceptual
Selector de sistema            →   Etapa activa      →   Inspección contextual
Texto y relaciones disponibles antes de cargar el canvas
```

Evitar una cuadrícula de tarjetas intercambiables: cada referencia tiene una gramática distinta (composición, contexto, lógica, solicitud). Hover y foco iluminan esa relación. La selección del diagrama presenta una respuesta breve con opacidad; sin loops ambientales adicionales, pinning o animación que retrase texto.

Arquitectura: descripciones semánticas pequeñas con EN/ES listas para HTML; geometría, propiedades de inspección y traducciones exclusivas de gráficos se cargan con el canvas. Un generador y pruebas de equivalencia conservan las ocho vistas, evitando dos fuentes manuales de verdad. La narrativa y las versiones textuales siguen disponibles aunque el canvas falle.

Revisión contra el brief: se conserva todo el contenido y evidencia; se elimina carga crítica innecesaria. No se mueve la portada ni se altera el LCP para obtener una puntuación. El movimiento nuevo responde a interacción y mantiene reduced motion.
