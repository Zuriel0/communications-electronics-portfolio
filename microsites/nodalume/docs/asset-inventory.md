# Inventario de assets

No se usa ningún video, captura de aplicación, contenido de un tenant, retrato, imagen generada ni material privado de demostración.

## Procedencia

- `nodalume-mark-original.svg`: isotipo real, leído del módulo de marca del frontend autorizado de Nodalume (`admin-console/src/assets/nodalume-mark.svg`), revisión `41f8ceaa1ef9a4ef7bdc4647c1d02d5cae418a6c`. Se conserva sin editar. Es material de marca aportado por el proyecto; no se le atribuye una licencia externa.
- `nodalume-mark.svg`: derivado monocromático Electric; misma geometría, sustitución de rellenos y retirada del gradiente. Utilizado en navegación, footer y favicon. El original no se sobrescribe.
- [Syne](https://github.com/google/fonts/tree/main/ofl/syne) variable 700–800 y [DM Sans](https://github.com/google/fonts/tree/main/ofl/dmsans) variable 400–700: subconjuntos latin WOFF2 oficiales, con caracteres EN/ES, servidos desde el propio sitio. Descargados de Google Fonts; OFL y copyright junto a los archivos. No hay solicitudes a Google Fonts en runtime. En los textos OFL se normalizaron únicamente los finales de línea y espacios finales, conservando su contenido íntegro.
- `Composition`, `FilmComposition` y conector editorial en `src/App.jsx`: geometría SVG original escrita para esta landing. Los dos primeros se presentan expresamente como composiciones conceptuales, no como producto real ni arquitectura operativa.
- Iconos: SVG de trazo propio y currentColor; el comportamiento CSS de la flecha procede del snippet gratuito documentado de Transitions.dev.
- Evidencias: capturas reales del build local realizadas con CUA/IAB; resultados de Lighthouse local sin autenticación. Los JPEG no son assets de marketing ni se importan al build.

## Archivos públicos

| Archivo                            |  Bytes | SHA-256                                                            |
| ---------------------------------- | -----: | ------------------------------------------------------------------ |
| `brand/nodalume-mark-original.svg` |    615 | `ad96c3cbfbd172337aed055b0492e973996ccbe3a6ac25543359eceee33983d6` |
| `brand/nodalume-mark.svg`          |    353 | `0bd12d3e54844d43537bc9c11ae32f5c40ffe660a7ee56bd5d36cf384beff5bf` |
| `fonts/DM-Sans-OFL.txt`            |  4,388 | `7ec15e79c59bc14b86436a17e5eb7926b46cbcaeb08e1a7e6c110b415e6eb2a2` |
| `fonts/Syne-OFL.txt`               |  4,401 | `781b0eb8f40ad213428b43bfb53fd0ac4711c09f7b4e0b43b62a8efa29f91410` |
| `fonts/dm-sans-latin.woff2`        | 36,980 | `468d56b6b25b05b70190b6c233d773f6f1770e8579827ce022a57f03fa8002fb` |
| `fonts/syne-latin.woff2`           | 34,560 | `cfff412005eed2f0152d1c110c78ac564642b943e64322fbd687083177d6fa70` |

## Reserva audiovisual

El frame reserva 16:9 en escritorio y una composición editorial 4:5 en móvil. No contiene un reproductor falso, un botón de play ni resultados inventados. Una futura película debe contar con autorización específica, revisión de marcas y datos, poster propio, controles, transcripción y medición de peso. No se ha reutilizado la prueba privada de grabación anterior.
