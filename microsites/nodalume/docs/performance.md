# Rendimiento preliminar

Build local de NDL-WEB-001, 27 de octubre de 2026. Es la primera referencia de este micrositio; no hay un build anterior equivalente ni se compara con el portafolio o con el panel administrativo.

## Método

Vite production build y preview local estable en 4186. Lighthouse **13.6.0**, Headless Chrome **156.0.0.0**, Node **24.19.0**, macOS. Tres navegaciones por perfil, cada una en un Chrome temporal sin sesión de usuario. Configuración oficial móvil y `desktop-config` oficial, con throttling simulado. Los JSON conservan formFactor, screen emulation y throttling de cada ejecución. Un gatherer adicional lee únicamente el DOM y las peticiones de recursos del micrositio. No interacciona con Nodalume operativo.

| Perfil     | Performance (3) | Accessibility (3) | LCP mediana | LCP rango  | CLS (3)   | TBT (3)      |
| ---------- | --------------- | ----------------- | ----------- | ---------- | --------- | ------------ |
| Móvil      | 100 / 100 / 100 | 100 / 100 / 100   | 753 ms      | 752–753 ms | 0 / 0 / 0 | 0 / 0 / 0 ms |
| Escritorio | 100 / 100 / 100 | 100 / 100 / 100   | 202 ms      | 202–325 ms | 0 / 0 / 0 | 0 / 0 / 0 ms |

Sin warnings en las seis ejecuciones finales. La corrida adicional con `--force-prefers-reduced-motion` confirmó una página completa sin petición del chunk de movimiento y sin ScrollTriggers. Evidencia: [resumen](evidence/performance-summary.json), [JSON completos](evidence/lighthouse/summary.json) y [reduced motion](evidence/lighthouse/reduced-motion.json).

Son resultados de laboratorio sobre localhost, con fuentes y recursos locales y sin medio audiovisual. No son Web Vitals de campo, ni una garantía para móviles físicos, hosting remoto, condiciones térmicas o video futuro. No se declara 60 FPS ni mejora sobre un producto anterior. No se midió consumo de CPU ni fluidez mediante un profiler de frames.

## Distribución del build

| Asset                                              | Bytes de archivo | Gzip calculado con Node zlib |
| -------------------------------------------------- | ---------------: | ---------------------------: |
| Entry React + contenido EN/ES                      |          238,308 |                       73,958 |
| Módulo diferido GSAP + ScrollTrigger + coreografía |          116,097 |                       45,065 |
| CSS                                                |           13,787 |                        3,729 |
| Syne latin WOFF2                                   |           34,560 |                            — |
| DM Sans latin WOFF2                                |           36,980 |                            — |
| Marca plana SVG                                    |              353 |                            — |

[Manifest, tamaños y SHA-256](evidence/build.json). Los bytes gzip son una comparación de compresión del archivo, no el peso de transferencia de este servidor. Vite informa su propio cálculo de gzip por separado.

El entry no incluye GSAP ni React Flow. En movimiento normal el módulo se solicita después del montaje, durante la carga de la página; por tanto, **el JavaScript solicitado durante la carga completa suma 354,405 bytes sin comprimir**, no solo los 238,308 del entry. La división permite evitar el motor con reduced motion, no hace desaparecer su coste en la experiencia animada. No se incorpora React Flow ni ninguna dependencia del panel administrativo a este paquete.

Las dos traducciones son pequeñas y se mantienen en el entry para cambiar de idioma sin red adicional ni recarga. No hay justificación medida para introducir un proveedor i18n o más chunks de diccionario en esta fase.

## Reproducir

Desde `microsites/nodalume`, ejecutar `npm ci`, `npm run build` y `npm run preview` en una terminal. En otra:

```sh
npm install --prefix /private/tmp/ndl-web-audit lighthouse@13.6.0
node scripts/audit.mjs /private/tmp/ndl-web-audit/node_modules
```

El script usa Chrome local y reemplaza la evidencia Lighthouse. `NDL_CHROME_PATH` permite indicar otra instalación de Chrome. No usa Playwright, credenciales, auth state ni un perfil personal. La auditoría adicional no sustituye las comprobaciones de teclado y revisión visual.

## Próximas mediciones

Repetir sobre staging solo cuando exista autorización de despliegue. Medir poster/video reales, cache y compresión HTTP, móviles físicos, sesión prolongada, visibilidad real de pestaña y perfiles de frames/CPU. Definir presupuestos a partir de esta referencia y del medio aprobado, sin convertir la puntuación local en una promesa comercial.
