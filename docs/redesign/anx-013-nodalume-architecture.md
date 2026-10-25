# ANX-013 — Arquitectura y estrategia de diagramas

Los modelos públicos están en `src/data/nodalume.js`. El único módulo React Flow nuevo es `src/components/ui/graphics/nodalume_flow.jsx`, compartido por las tres figuras. Las coordenadas son una composición editorial creada para el portafolio, sin corresponder a una topología física ni a ubicaciones de infraestructura.

## Relaciones de la plataforma actual

`#diagram-nodalume-platform`: cinco nodos y cuatro relaciones.

| Origen conceptual | Relación | Destino conceptual |
| --- | --- | --- |
| Consola React | Administración | Backend Node.js |
| Backend Node.js | Persistencia | PostgreSQL |
| Backend Node.js | Integración RADIUS | FreeRADIUS |
| FreeRADIUS | Integración AAA | MikroTik |

Es una síntesis del alcance declarado por el propietario. Las relaciones no establecen dirección de paquetes, acceso directo a tablas, un transporte de API concreto ni una secuencia de autenticación. Se omiten flechas de tráfico. MikroTik se identifica como integración de red; no se dibuja dentro de un contenedor Docker. El texto separa accounting —registro de uso— de la decisión de acceso.

## Modelo de composición del producto

`#diagram-nodalume-builder`: cinco nodos y cuatro relaciones. Experiencia de portal → composición de páginas → bloques reutilizables; la composición define comportamiento mediante lógica de políticas, vinculada conceptualmente a acciones API.

El estado público es **diseño de producto en curso**. No representa un esquema de base de datos, un editor existente, una ejecución simultánea de ramas condicionales ni un motor de automatización terminado. Las referencias de diseño explican por qué separar composición, contexto de edición, lógica y acciones.

## Camino de evolución

`#diagram-nodalume-evolution`: cinco nodos y cuatro relaciones, dispuestos en secuencia horizontal en escritorio. Laboratorio local → documentar/reproducir → evaluar separación de estado → evaluar opciones cloud → validar operación.

El estado público es **evolución futura**. Los nodos son preguntas y etapas de evaluación, no recursos aprovisionados. No se dibuja una VPC, un clúster AWS o una política de autoscaling como si estuvieran implementados.

## Lectura, movimiento y controles

La señal luminosa recorre una relación a la vez. Es una ayuda de lectura y no telemetría, simulación de paquetes ni verificación del runtime. Las relaciones completas, etiquetas y versión textual siguen disponibles al pausar. Se conservan los cálculos SmoothStep y la señal CSS del edge compartido existente, sin modificarlo.

- Una señal CSS activa, periodo de 1,6 s; selección de relación cada 2,4 s.
- Un observador y como máximo un intervalo por diagrama visible, mediante `observeDiagramPlayback`, ya probado en ANX-008/012.
- Pausa manual, viewport y visibilidad de documento determinan la reproducción; cleanup al desmontar o cambiar la preferencia.
- Reduced motion muestra el mapa completo estático, sin intervalo ni señal móvil; el control indica esa preferencia.
- Zoom, Fit View, rueda que desplaza la página y objetivos táctiles existentes. El arrastre se desactiva en la disposición vertical para facilitar scroll táctil.
- Etiquetas, controles, estados y explicación HTML EN/ES. El idioma no cambia keys, IDs ni la instancia del grafo: pausa y zoom permanecen.
- Menos de 960 px: disposición vertical y espacio reservado de 730 px; escritorio: 560 px. Solo el cambio de disposición remonta el canvas para ajustar su encuadre, no el cambio de idioma.

## Carga y preservación

React.lazy separa `/projects/nodalume`. Su catálogo y narrativa no se importan en Home. `CaseFigure` conserva el placeholder, el boundary de error y la carga al acercarse al viewport; los hashes directos de figuras fuerzan la carga necesaria. El contenido editorial no espera al runtime React Flow.

Rollup comparte el modelo entre la página y su módulo de gráficos, por lo que el chunk de página puede no tener `facadeModuleId`. El verificador identifica el módulo real de la página, exige que el entry lo importe dinámicamente y recorre sus imports estáticos para rechazar React Flow/d3/zustand anticipados. No se omite la comprobación por ese detalle del empaquetado.

Los seis componentes y modelos anteriores, sus posiciones, controladores y animaciones permanecen sin cambios. Las pruebas de preservación comprueban sus 46 nodos y 37 edges originales.
