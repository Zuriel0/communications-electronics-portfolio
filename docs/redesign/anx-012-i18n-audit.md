# ANX-012 — Auditoría de internacionalización

Fecha: 23 de octubre de 2026. EN predeterminado, ES adicional. Misma SPA y mismas tres rutas públicas.

## Arquitectura

- `LanguageProvider` usa React Context y `useSyncExternalStore`. El store empieza en EN sin leer almacenamiento durante render. Un layout effect restaura la preferencia antes de pintar; se manejan lecturas/escrituras fallidas con memoria de sesión.
- `anxzu.language` guarda exclusivamente `en` o `es`. Valores desconocidos se ignoran. El proveedor vive por encima de las rutas y no tiene una key dependiente del idioma.
- Dos diccionarios compartidos (`locales/en.js`, `es.js`) y dos de proyectos (`projects.en.js`, `projects.es.js`). `ProjectMessages` se importa desde las rutas diferidas: el contenido extenso de los casos y React Flow no entran en la portada.
- Las frases canónicas de origen actúan como identificadores estables. `t` resuelve catálogo de proyecto → compartido → EN → frase legible de origen. Las sustituciones `{0}`, `{1}` localizan también un título proporcionado como parámetro. No hay keys opacas visibles como `home.title`.
- `Text` es una proyección de texto sin elemento DOM: localiza valores string, deja los elementos React intactos y no modifica los datos. Permite mantener una sola biografía, inventario y modelo de nodos, además de conservar nombres oficiales y comandos.
- El selector es un grupo EN | ES dentro del header, con botones nativos, `aria-pressed`, nombres accesibles y endónimos con `lang` correspondiente. Ambos objetivos miden al menos 44×44 px. La navegación disclosure pasa a 70rem para acomodar el selector y la longitud de ES; Escape, foco y `inert` se conservan.
- Cambiar idioma no recarga ni navega. Se conserva el hash; el proveedor intenta compensar el desplazamiento del elemento/escena visible tras el cambio de longitud. Es una compensación aproximada, no una promesa de idéntico reflow de cada párrafo.
- Las fechas de credenciales usan `Intl.DateTimeFormat(language)` con UTC para no desplazar fechas de solo día. Los nombres oficiales de credenciales siguen en inglés y se marcan `lang="en"`.

No se añade biblioteca de traducción ni dependencia de animación.

## Cobertura y pruebas del diccionario

[Resultado verificable](reports/anx-012/translation-coverage.json): **238 claves compartidas y 284 claves de proyectos**, con paridad EN/ES y de posiciones de sustitución. El extractor de fuentes identifica **573 mensajes** de UI/contenido/modelos: **495** resueltos por diccionario y **78** nombres propios, tecnologías, rutas de logs u otros identificadores preservados explícitamente. Cero candidatos pendientes según este extractor.

El extractor no constituye un análisis lingüístico universal: se complementa con render real de las tres páginas en ambos idiomas, estados de carga/error y revisión de la página en navegador. Las 522 claves incluyen además plantillas y textos de controles/metadatos que no aparecen como hoja estática del extractor. La allowlist de invariantes vive en `tests/fixtures/invariant-messages.json`; no es una excepción genérica para frases sin traducir.

Se cubren navegación, Hero inmersivo y variante anterior, perfil, conexión conceptual, showcases, capacidades nuevas y originales, experiencia, credenciales, preparación AWS, contacto, footer, casos completos, índices, lecturas de figuras, decisiones, resultados, carga/error/recarga, pausa de movimiento, simulación y conexiones, reduced motion, zoom y Fit View bajo control de la aplicación. También se localizaron los módulos conservados de contacto que no están montados.

Los controles `summary` nativos conservan el estado expandido/contraído semántico. Sus etiquetas de contenido se traducen; no se simula un estado mediante texto o iconografía decorativa.

## React Flow: texto sin cambiar el sistema

- Se preservan los seis arrays `initialNodes`/`initialEdges`, incluidos sus textos canónicos originales. La prueba compara sus AST normalizados con hashes obtenidos de los modelos anteriores a la edición: **46 nodos / 37 conexiones**, con mismos IDs, handles, coordenadas, jerarquía y relaciones.
- Las hojas de los componentes de nodo consumen `Text`; `EngineeringFlowEdge` localiza el label visible mediante `t(label)`.
- `useFlowLabels` configura controles y descripciones admitidos por la versión instalada de `@xyflow/react`. `useFlowEdges` crea copias solo de presentación con `ariaLabel` localizado, manteniendo referencias de datos, IDs y endpoints.
- No hay `key={language}`, sustitución de modelos, `setNodes` por idioma, recreación del proveedor Flow ni nuevas dependencias del controlador de reproducción.
- Hooks/controladores de playback, visibilidad, reduced motion y Hero conservan sus hashes de v1.0.0.

[Comprobación real de los seis diagramas](evidence/anx-012/six-diagrams-language.json): cada uno inició automáticamente al entrar; después de pausa y alternancia EN/ES mantuvo fase/conexiones activas y transform del viewport. [Balanceador con reproducción y zoom](evidence/anx-012/playback-language.json): siguió activo al cambiar EN→ES; pausado y ampliado, el cambio ES→EN mantuvo `aria-pressed=true`, el hash y `translate(54.3402px, -45px) scale(0.810997)`.

El enlace de atribución interno de React Flow conserva el nombre fijo inglés **“React Flow attribution”** de la biblioteca; su API no ofrece una clave de traducción para ese atributo. Se preserva la atribución. Los controles y descripciones configurables sí se traducen. Los IDs técnicos se mantienen en las etiquetas de conexión.

## Navegación y metadatos

`PageMetadata` actualiza `document.title`, descripción, Open Graph y locale (`en_US` / `es_MX`); el proveedor y metadatos mantienen `document.documentElement.lang`. Cada ruta conserva su canonical de `https://anxzu.com`; no se crean rutas `/es/`, hreflang ni canonicals ficticios.

El HTML estático generado sigue presentando EN para bots sin JavaScript, como idioma predeterminado. El selector no crea indexación independiente en ES. Para eso harían falta rutas localizadas reales y/o prerender con una decisión SEO propia de una fase futura.

[Teclado, recarga, metadatos y consola](evidence/anx-012/navigation-metadata-console.json): selección ES conservada después de recargar, menú abierto con Enter y cerrado mediante Escape con foco de vuelta al disparador; canonical original, locale ES y descripción traducida; sin advertencias ni errores registrados en esa sesión.

## Matriz responsive

[36 combinaciones](evidence/anx-012/responsive-matrix.json): 320, 375, 768, 1024, 1440 y 1920 px × Home / Concurrencia / Metodología × EN / ES. Se verificaron título e idioma, ancho del documento, geometría de encabezados/contenido, selector y presencia de cuatro/dos diagramas por caso. Sin overflow horizontal inesperado. El navegador reserva 15 px para scrollbar: por ejemplo, el viewport solicitado de 375 corresponde a 360 px de documento.

Se inspeccionaron capturas de perfil, capacidades, preparación AWS, introducciones y balanceador. El umbral adicional de 1120 px también se revisó para descartar solapamiento del header en ES. La matriz geométrica no equivale a una inspección visual individual de todos los píxeles de las 36 vistas.

## Accesibilidad y límites

- Botones nativos con Enter/Espacio, selección anunciada y foco visible mediante tokens existentes; sin trampas de foco ni navegación por cambio de idioma.
- Se conservan el contraste del sistema y las pruebas de presupuestos en superficies claras/oscuras. El nuevo texto y selector consumen esos mismos tokens.
- Reduced motion y pausa de pestaña/viewport se comprueban mediante la suite existente de controladores sin cambios. No se alteró la preferencia del sistema del propietario para una prueba manual adicional.
- Se revisó el árbol de accesibilidad del navegador. No se realizó una sesión con lector de pantalla real; no se atribuye una certificación WCAG a estas comprobaciones.
- No se sincroniza automáticamente la preferencia entre pestañas ya abiertas; se restaura en cada montaje y persiste durante la navegación en esta SPA.
- La documentación indica la excepción de atribución de la biblioteca y la limitación de SEO estático. Las traducciones ES pueden cambiar alturas y saltos de línea; el anclaje de scroll conserva la escena de forma aproximada.
