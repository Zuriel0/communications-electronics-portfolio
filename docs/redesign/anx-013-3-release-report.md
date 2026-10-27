# ANX-013.3 — Official v1.2.1 Release & Production Verification

26 de octubre de 2026. **Resultado final: GO para v1.2.1. Nodalume publicado y verificado en [anxzu.com/projects/nodalume](https://anxzu.com/projects/nodalume/).**

El propietario autorizó explícitamente la versión sustituta v1.2.1 después de la retirada y el rollback de v1.2.0. Se conserva el tag anterior inmutable, su estado NO-GO y toda la evidencia del incidente. No se volvió a publicar el artefacto con traducciones incompletas. La sección histórica al final registra el estado anterior a esta autorización; sus referencias a producción restaurada corresponden a ese momento.

## Publicación corregida

| Referencia | Resultado |
| --- | --- |
| main fuente, commit del tag y target del Release | `a2a6b1e725ccfc9c6c08ddf6ee7882be2703ac58` |
| Tag anotado v1.2.1 | `67bc1d0da321a0e5487e14be0b824e06408a3f0d` |
| Fuente inicial de esta continuación | `18100cb867f942dc73728974c8e50d9ab9d63804` |
| Corrección | `90e905871f2654f624e0b3bb1ef90424f6a1536c` |
| Preparación v1.2.1 | `a2a6b1e725ccfc9c6c08ddf6ee7882be2703ac58` |
| Producción antes de v1.2.1 | `bd41427bdac1d7572120b54414b5171ea0a95129` |
| Producción v1.2.1 | `a256bf8cf9805fdf7db912d0d7816adedd247e6b` |
| Respaldo remoto nuevo | `Zuriel0/page:backup/anxzu-v1.1.0-before-v1.2.1-20261026` → `bd41427bdac1d7572120b54414b5171ea0a95129` |
| Entry público | `/assets/index-DT8od2Cy.js` |
| Digest del artefacto | `4e467a47ea95d52f0188a2137a32add65784b2ae9a6fc83cb1201e139da03f8c` |

[GitHub Release v1.2.1](https://github.com/Zuriel0/communications-electronics-portfolio/releases/tag/v1.2.1) publicado como versión estable. [Pages](https://github.com/Zuriel0/page/actions/runs/40433964102) terminó correctamente para el commit exacto de producción. Los respaldos ANX-012.4 y anterior a v1.2.0 permanecen intactos. El respaldo nuevo también se comprobó remotamente.

La integración fue fast-forward con pushes normales. Se consultaron nuevamente reglas/protección, refs y deployment.json; no había requisitos de PR ni cambios remotos inesperados. No se usó force push ni se movió un tag publicado. La documentación final se guarda posteriormente en la rama ANX-013, de modo que main, tag y target del Release siguen apuntando al mismo commit del código desplegado.

## Validación final de código y artefacto

- `npm ci`, `npm run lint`, `npm run build -- --manifest`, `node --test tests/*.test.js`, `node scripts/check-project-chunks.mjs`, `git diff --check` y `npm audit`: correctos. **53/53 pruebas; cero vulnerabilidades.**
- Instalación, build y las 53 pruebas también se ejecutaron en un archivo limpio del tag v1.2.1. Se verificó el commit del archivo Git y la igualdad de los **19 assets JS/CSS** con el árbol integrado.
- Artefacto Pages de 67 archivos: 18 adiciones, cinco modificaciones, cero eliminaciones frente al estado restaurado. Se conservaron 12 assets anteriores por compatibilidad con documentos en caché, CNAME sin cambios de bytes, .nojekyll, fuentes/licencia, robots, sitemap y los cuatro documentos HTML.
- `deployment.json` identifica v1.2.1, repositorio, tag, commit, entry y digest. El digest es SHA-256 del mapa compacto ordenado ruta→SHA-256, excluyendo el propio marcador para evitar autorreferencia.
- Los 67 archivos y siete formas de ruta pasaron la comprobación local. En HTTPS público se verificaron **65 archivos servibles y siete formas de ruta** contra el manifiesto. Los dos archivos de configuración con punto inicial se verificaron en Git/artefacto, no como recursos públicos.
- Canonical, título único, descripción y Open Graph están presentes en los cuatro documentos. Las URLs de proyecto sin barra final redirigen a la forma con barra conservando la navegación y los hashes.

## QA público EN/ES e interacción

Las comprobaciones se ejecutaron contra el dominio real después del workflow de Pages:

- Home, Concurrencia, Metodología y Nodalume: **48 comprobaciones** (EN/ES × seis anchos × cuatro rutas), a 320, 375, 768, 1024, 1440 y 1920 px, sin overflow horizontal.
- Las 26 entradas restauradas del catálogo Nodalume aparecen en el texto renderizado en ambos idiomas a los seis anchos. El entry coincide con el artefacto corregido, descartando una mezcla con v1.2.0.
- **14 diagramas revisados en escritorio**: ocho Nodalume y seis anteriores. Reproducción automática visible, movimiento observado, pausa/reanudación por teclado, zoom, Fit View y conservación de pausa/zoom/hash al cambiar idioma correctos. Las cinco vistas de ingeniería conservan selección de etapas y componentes; seleccionar manualmente pausa el recorrido.
- **Ocho vistas Nodalume revisadas también a 375 px**, con los mismos controles. Los diagramas fuera de la escena activa dejan de reproducirse en las comprobaciones realizadas.
- Menú móvil abre por teclado; Escape lo cierra y devuelve el foco al disparador. Preferencia ES, hash profundo y foco sobreviven a recarga. El Hero conserva su pausa al cambiar idioma.
- Las ocho alternativas textuales contienen todas las relaciones originales EN/ES, independientemente de la carga del canvas; su apertura por teclado funciona.
- Home conserva seis áreas, 18 enlaces individuales de Credly, contacto `mailto:andres.macias@anxzu.com` y AWS SAA-C03 explícitamente en preparación. Los casos anteriores mantienen sus rutas y controles.
- No se registraron errores ni warnings de consola durante estas comprobaciones.

**Reduced motion público:** 15 auditorías independientes (Home + cada uno de los 14 diagramas) con Chrome `--force-prefers-reduced-motion`. Se verificó el media query real, Hero estático, diagramas completos sin reproducción, señales pausadas, controles automáticos desactivados y ausencia de transformaciones/animaciones contextuales. Las 15 pasan, con Accessibility 100 en cada auditoría. Esto no acredita una prueba de cambio dinámico de la preferencia del sistema operativo ni una sesión manual de lector de pantalla.

## Lighthouse público de v1.2.1

Tres ejecuciones por ruta/perfil, 12 en total; Home y Nodalume públicos, inglés, movimiento normal, Chrome nuevo por ejecución, medición serial, Lighthouse 13.5.0. Chrome 156 headless. Móvil simulado 412×823, DPR 1.75, RTT 150 ms, 1638.4 Kbps y CPU ×4; escritorio con el preset estándar de Lighthouse; configuraciones, user agent, advertencias, rangos y JSON completos comprimidos se conservan en la evidencia. No hubo rediseño ni cambios de contenido para favorecer la puntuación.

Medianas:

| Ruta | Perfil | n | Performance | Accessibility | LCP ms | CLS | TBT ms |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| home | mobile | 3 | 100 | 100 | 1517 | 0.0000 | 1.5 |
| nodalume | mobile | 3 | 99 | 100 | 1670 | 0.0000 | 0.0 |
| home | desktop | 3 | 100 | 100 | 368 | 0.0000 | 0.0 |
| nodalume | desktop | 3 | 100 | 100 | 374 | 0.0000 | 0.0 |

En las 12 trazas se comprobó la solicitud del entry corregido `/assets/index-DT8od2Cy.js`. La única advertencia de Lighthouse fue la redirección esperada de `/projects/nodalume` a `/projects/nodalume/`; ambas formas se verificaron con sus bytes y canonical correctos. Los rangos completos por métrica están en `lighthouse/summary.json`.

Estas son **mediciones de laboratorio sobre URLs de producción**, no Web Vitals de usuarios reales, INP, FPS, CPU/energía o garantías de alojamiento. No hay una serie pública válida de v1.2.0 para comparar: se retiró al fallar el QA. Los valores ANX-013.2 del changelog siguen siendo mediciones locales históricas; no se usan para afirmar una mejora pública de v1.2.1.

Distribución del build del tag, bytes sin comprimir / gzip nivel 9 local:

| Asset | Bytes | Gzip |
| --- | ---: | ---: |
| Entry inicial | 319,735 | 100,247 |
| Editorial Nodalume | 55,961 | 17,345 |
| Módulo diferido de diagramas Nodalume | 45,736 | 12,664 |
| Runtime compartido de gráficos | 180,277 | 58,901 |

React Flow permanece fuera de Home y de los chunks editoriales iniciales. Los tamaños gzip son cálculos del archivo, no tiempos de transferencia ni Web Vitals. Los 55,961 bytes de narrativa incluyen las traducciones restauradas; no se elimina contenido para reproducir el tamaño incorrecto anterior.

## Dominio, recuperación y límites

Certificado y hostname HTTPS validados; DNS A de GitHub Pages y CNAME de www correctos. No se cambió DNS ni se configuró un subdominio. La API conserva el ajuste previo `https_enforced: false`; se verificó acceso HTTPS con certificado válido, sin atribuirle una redirección HTTP forzada que no se haya comprobado.

Se ensayó `git revert --no-commit` del commit nuevo en un clon aislado **antes del push**: produjo exactamente el árbol `b53e1632efc7fcbc5e17c24e92c4d129582d2cc2` del respaldo v1.1.0. No fue necesario ejecutar ese rollback en producción para v1.2.1. Si surge un fallo crítico: consultar HEAD remoto, revertir `a256bf8` conservando historial, verificar árbol contra el respaldo, hacer push normal y repetir confirmación Pages, marcador, hashes y revisión pública. Si hay cambios posteriores de otras personas, revisar el diff antes de revertir; no sobrescribirlos automáticamente.

No se contactó ni modificó el repositorio privado, el laboratorio activo, base de datos, RADIUS ni routers de Nodalume. El caso continúa distinguiendo implementación, evidencia unitaria aislada, conceptos y futuro. No presenta AWS como desplegado ni influencias como afiliaciones. No se inició ANX-014.

Límites: pruebas en Chromium de escritorio y emulación responsive, sin dispositivos físicos/Safari ni lector de pantalla nativo; sin nueva aceptación integral del producto Nodalume ni rendimiento de campo. No se cambió la lógica de visibilidad de pestañas: queda cubierta por las pruebas existentes; esta fase no añade una comprobación manual nueva de ocultar/mostrar pestaña.

## Evidencia y cierre

![Nodalume publicado, escritorio ES](reports/anx-013-3/v1.2.1/public-nodalume-desktop.jpg)

![Nodalume publicado, móvil ES](reports/anx-013-3/v1.2.1/public-nodalume-mobile.jpg)

[Manifiesto y recibos v1.2.1](reports/anx-013-3/v1.2.1/README.md) incluyen el preflight, respaldo, build del tag, resultados UI, hashes públicos, reduced motion, Lighthouse completo y verificación final. El Release contiene el ZIP Pages, manifiesto y recibo final sin sobrescribir sus assets originales.

**GO v1.2.1. Publicación, Pages, dominio, QA bilingüe y mediciones públicas completados.** v1.2.0 permanece retirado/NO-GO, con su historial intacto. No quedan tareas de publicación autorizadas pendientes.

---

## Archivo: intento v1.2.0 y recuperación

**Estado histórico anterior a la autorización de v1.2.1.** Las referencias siguientes a «producción actual», corrección sin desplegar o autorización pendiente describen ese momento, no el estado final resumido arriba.


Fecha: 26 de octubre de 2026. **Resultado: NO-GO para v1.2.0. Producción restaurada y verificada en v1.1.0.**

La publicación del código y el despliegue de Pages se completaron, pero la inspección pública en español detectó una regresión editorial. Se ejecutó el rollback autorizado antes de continuar con mediciones de rendimiento. No se presenta esta versión como una entrega aprobada. La corrección está validada en la rama ANX-013; una publicación sustituta necesita una decisión de versión porque el tag ya publicado permanece inmutable.

## Referencias y trazabilidad

| Referencia | SHA / estado |
| --- | --- |
| Fuente inicial ANX-013 | `7958d3790bf17edaea6fbab3d8bfbe87a2a260e0` |
| main inicial / v1.1.0 fuente | `d4b92df0c28415098862333e491d2552efe594d0` |
| main integrado / commit del tag v1.2.0 / Release | `e1235dc29a030e4bbdc1bc4919bc3b876e353fce` |
| Objeto de tag anotado v1.2.0 | `b1fc9ce8634f1631ab974e0333f833f4c6ac0cea` |
| Producción anterior v1.1.0 | `76138c5b1d8e82b651c1369ef468f023b58f67a6` |
| Respaldo remoto nuevo | `Zuriel0/page:backup/anxzu-v1.1.0-before-v1.2.0-20261026` → `76138c5b1d8e82b651c1369ef468f023b58f67a6` |
| Despliegue v1.2.0 retirado | `90cb00bb6ea9ac2ae6545d96d61afbd91a41cb56` |
| Rollback / producción actual | `bd41427bdac1d7572120b54414b5171ea0a95129` |
| Árbol restaurado, idéntico al respaldo | `b53e1632efc7fcbc5e17c24e92c4d129582d2cc2` |
| Corrección local, rama ANX-013 | `90e905871f2654f624e0b3bb1ef90424f6a1536c` |

[Release v1.2.0](https://github.com/Zuriel0/communications-electronics-portfolio/releases/tag/v1.2.0): marcado **prerelease, NO-GO y no latest**. El tag y sus assets originales no se sobrescribieron. La rama main fuente continúa en el commit etiquetado; el código corregido se conserva aparte para revisión.

[Pages del intento](https://github.com/Zuriel0/page/actions/runs/40355864892) y [Pages del rollback](https://github.com/Zuriel0/page/actions/runs/40357085590) terminaron correctamente. Un workflow exitoso no equivale a aceptación funcional o editorial.

## Preflight e integración

Se consultaron refs remotas, permisos, protección de main, rulesets, releases, configuración Pages, dominio y marcador público. No había PR ni verificaciones obligatorias configuradas. Se integró mediante fast-forward y se utilizaron pushes normales. No hubo force push ni reescritura de tags.

Los siete commits integrados fueron `63221c6` (reporte del despliegue anterior), `70e128a` (caso Nodalume), `0796386` (localización de controles), `85e81e5` (evidencia técnica), `82a1be4` (rendimiento e interacción), `7958d37` (reporte ANX-013.2) y `e1235dc` (preparación del Release). La lista completa está en [git-preflight.json](reports/anx-013-3/git-preflight.json).

Se preservó el respaldo ANX-012.4 `backup/anxzu-pre-v1.1.0-20261024` en `efed3f2434b2ad184a864bd8b0d5d6ce87d42fdd`. El nuevo respaldo es independiente.

## Contenido y alcance

El caso mantiene su condición de proyecto personal en laboratorio. Distingue implementación inspeccionada, ocho pruebas unitarias reproducidas en ANX-013.1, desarrollo, conceptos y evolución futura; esas pruebas no acreditan aceptación del laboratorio físico, base activa ni RADIUS. AWS continúa como requisitos de evolución, no despliegue actual. Elementor/Wix, Figma, Scratch/Zoho Flow y Postman son referencias de interacción, sin afiliación.

Las ocho vistas conservan sus alternativas textuales EN/ES y sus modelos. Se preservaron Confluence, los seis diagramas anteriores, las seis áreas profesionales, las 18 credenciales, el contacto y AWS SAA-C03 como preparación. No se consultó ni modificó el repositorio privado, servicios o arquitectura funcional del producto Nodalume en esta fase. No se configuró ningún subdominio ni se inició ANX-014.

## Artefacto y publicación retirada

Se compiló desde un archivo Git del tag inmutable y se comprobó el SHA. Los 19 assets JS/CSS reprodujeron los hashes de ANX-013.2. El artefacto contenía 67 archivos, incluyendo 12 assets anteriores conservados para compatibilidad de caché. El diff lógico fue 18 adiciones, cinco modificaciones y cero eliminaciones; CNAME y .nojekyll se conservaron, junto con fuentes/licencias, robots, sitemap y documentos de las cuatro rutas.

El marcador v1.2.0 usaba entry `/assets/index-C8kQlsRn.js` y digest `d98ce8fd990bf5ef2c6061a23e6c9797bc485e5b59630241702e52a766ab32b2`. La verificación HTTPS contrastó 65 archivos públicamente servibles y siete formas de ruta con sus bytes esperados. Esto confirmó integridad de entrega, pero no la traducción del contenido.

## Fallo detectado y recuperación

La inspección real de `/projects/nodalume` con ES seleccionado mostró 25 mensajes editoriales en inglés: navegación interna y arrays de principios, implementación y decisiones. La optimización de ANX-013.2 había omitido esos arrays al extraer mensajes; la cobertura permitía coincidencias en catálogos ajenos y la prueba de renderizado comprobaba solo parte del texto. El fallo pertenece al código publicado, no a una caché ni a Pages. El GO anterior de ANX-013.2 queda invalidado para publicación bilingüe.

Se comprobó nuevamente el HEAD remoto y se revirtió el despliegue conservando el historial. El árbol del rollback coincide exactamente con el respaldo v1.1.0. Pages confirmó el nuevo commit; 47 archivos públicos y cinco formas de ruta recuperaron los bytes esperados. El navegador confirmó Home y los seis diagramas: pausa/reanudación, zoom/Fit View, cambio EN/ES, persistencia, Hero pausado, seis áreas, 18 credenciales y contacto, sin errores/warnings de consola. El entry activo volvió a `/assets/index-BTWOikn6.js` y deployment.json a v1.1.0.

[anxzu.com](https://anxzu.com) sirve la versión anterior. **La nueva página Nodalume no está disponible en producción tras el rollback.**

## Corrección validada, aún sin desplegar

Commit `90e9058`, en `codex/anx-013-nodalume-technical`:

- Restaurar las 25 traducciones omitidas desde el contenido original de ANX-013.1 y explicitar una entrada adicional de «Volver a proyectos» que antes usaba el catálogo común. No se inventó texto técnico.
- Incorporar los cuatro arrays al extractor y exigir que el propio catálogo de Nodalume contenga sus mensajes.
- Añadir fixture de 26 entradas con procedencia y valores originales EN/ES; comprobar las 131 entradas conservadas sin cambios y el renderizado real de las 26 restauradas en ambos idiomas.
- Mantener módulos de diagramas, posiciones, CSS, animaciones y dependencias sin cambios.

Las 53 pruebas pasan. La comprobación del texto renderizado encontró las 26 entradas en cada idioma a 320, 375, 768, 1024, 1440 y 1920 px, sin overflow horizontal. En navegador se revisaron los ocho diagramas Nodalume y los seis anteriores, reproducción visible, pausa manual, etapas, inspección de componentes, zoom/Fit View y conservación de estado al cambiar idioma. No se observaron errores/warnings. Estas comprobaciones corresponden al **candidato corregido local**, no al tag v1.2.0 retirado.

## Validaciones

| Comprobación | Tag integrado v1.2.0 | Corrección local |
| --- | --- | --- |
| npm ci | Correcto; árbol integrado y archivo del tag | Mismas dependencias, sin cambios |
| npm run lint | Correcto | Correcto |
| npm run build -- --manifest | Correcto | Correcto |
| node --test tests/*.test.js | 51/51, cobertura insuficiente del caso descrito | 53/53, nueva cobertura falla antes de la corrección |
| node scripts/check-project-chunks.mjs | Correcto | Correcto; React Flow fuera de Home y narrativa inicial |
| git diff --check | Correcto | Correcto |
| npm audit | Cero vulnerabilidades | Sin cambios de manifiesto/lockfile |
| UI 14 diagramas | Controles correctos; texto editorial incompleto | Correcto; EN/ES completo para las entradas restauradas |
| QA público | **Falla editorial ES → NO-GO** | No publicado |
| Rollback público | Pages + hashes + UI confirmados | No aplica |

## Dominio y rendimiento

Se verificaron certificado y hostname con validación TLS, registros A de GitHub Pages y CNAME de www. No hubo cambios DNS. La API Pages conserva su ajuste previo `https_enforced: false`; el acceso HTTPS probado usa un certificado válido. No se interpreta ese ajuste como una verificación de redirección HTTP forzada.

**No hay métricas Lighthouse públicas nuevas para v1.2.0.** La serie Home/Nodalume móvil/escritorio se detuvo antes de ejecutarse al fallar el QA funcional. Medir una ruta retirada o una versión corregida sin desplegar no cumpliría la solicitud de medición pública del Release.

Los resultados 98/100 y LCP móvil 2119 ms pertenecen al laboratorio local histórico ANX-013.2, con tres mediciones por perfil. No son métricas de producción ni validación del texto bilingüe. No se declaran mejoras de Web Vitals de campo, FPS ni consumo de CPU de esta publicación.

La corrección restaura contenido necesario: el chunk editorial Nodalume pasa de 51,676 bytes del tag a 55961 bytes en el build local. Esto no es una regresión aceptable de contenido que deba eliminarse para favorecer métricas. La separación del runtime de React Flow permanece validada.

## Archivos de la corrección y documentación

- `src/i18n/locales/nodalume.js`: mensajes restaurados.
- `src/pages/projects/Nodalume.jsx`: referencias de catálogo para los párrafos editoriales.
- `tests/helpers/uiMessages.mjs`: extracción de arrays.
- `tests/nodalume-loading.test.js`, `tests/nodalume.test.js` y `tests/fixtures/nodalume-restored-editorial.json`: cobertura de catálogo propio, conservación de valores y renderizado.
- `CHANGELOG.md`: aviso de retirada, sin modificar retrospectivamente el tag.
- Este reporte y `docs/redesign/reports/anx-013-3/`: recibos y capturas.

## Evidencia visual

Fallo público antes de revertir (ES seleccionado y tarjetas en inglés):

![Regresión editorial pública](reports/anx-013-3/public-qa-failure.jpg)

Corrección local en escritorio y móvil, todavía sin publicar:

![Corrección ES escritorio](reports/anx-013-3/correction-es-desktop.jpg)

![Corrección ES móvil](reports/anx-013-3/correction-es-mobile.jpg)

La portada pública restaurada también quedó capturada:

![Home restaurada v1.1.0](reports/anx-013-3/rollback-home-desktop.jpg)

Los recibos verificables y su interpretación están en [evidencia ANX-013.3](reports/anx-013-3/README.md). Los archivos iniciales conservan el estado anterior al hallazgo; no deben leerse como aprobación final.

## Decisión y pendientes

**NO-GO v1.2.0. Rollback completado y verificado.** La corrección está lista para revisión, no publicada. El tag v1.2.0 se conserva inmutable tal como exige el brief. Se solicitó autorización para una versión sustituta v1.2.1; no se crea automáticamente un nuevo tag, Release ni despliegue por silencio del propietario.

Si se autoriza: repetir preflight remoto, validar el árbol/tag corregido, respaldar producción actual, publicar con push normal y verificar nuevamente las cuatro rutas, ambas lenguas, 14 diagramas, reduced motion y Lighthouse público Home/Nodalume (tres mediciones por perfil). La validación pública de la versión corregida y esa serie de rendimiento permanecen pendientes. No se declara finalizado el objetivo de publicar Nodalume.
