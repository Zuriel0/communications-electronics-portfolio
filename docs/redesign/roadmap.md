# ANXZU — Roadmap del rediseño

Fecha: 21 de octubre de 2026 · Rama: `codex/anx-001-redesign-audit`.

**ANX-001 y ANX-002 ejecutadas.** ANX-003–006 describen trabajo futuro. Este plan parte del [código auditado y sus hallazgos](audit.md). La implementación, decisiones y validación de ANX-002 están en [design-system.md](design-system.md).

## 1. Reglas de ejecución

- Conservar React, Vite y las tres URLs. Trabajar incrementalmente sobre la rama dedicada, sin publicar en producción.
- Mantener los cambios previos del usuario: `package-lock.json`, `.agents/` y `skills-lock.json`. Revisar `git diff` antes de cada commit; no usar restauraciones ni stage global.
- Una fase debe producir un resultado revisable con alcance, archivos, comprobaciones y riesgos. No borrar componentes/estilos antiguos hasta haber comprobado equivalencia en sus consumidores.
- Mantener contenido y funcionalidad mediante la matriz de preservación de `audit.md`, no solo semejanza visual. Corregir las acciones que actualmente no funcionan de forma explícita.
- No inventar proyectos, empleos, fechas, tecnologías ni métricas. Nodalume y Cloud quedan pendientes de evidencia. El nombre “The Art of Engineering” es dirección de marca, no un nuevo logro profesional.
- No instalar bibliotecas por anticipación. CSS, SVG y APIs nativas primero; cualquier Motion/GSAP debe tener necesidad concreta, tamaño medido y alternativa estática.
- Los números de fase/escena sirven para organizar el trabajo; no obligan a añadir numeración decorativa en la interfaz.

## 2. Arquitectura narrativa y equivalencia

| Escena | Fuente actual | Resultado propuesto | Condición de preservación |
| --- | --- | --- | --- |
| Hero | `hero.jsx`, navbar, icono AX | ANXZU como gesto tipográfico, nombre/profesión y CTA | `#hero`, CTA a proyectos/contacto y nombre completo accesibles |
| Conexión | `about.jsx`, retrato, contenido técnico de proyectos | Perfil integrado con SVG de redes, infraestructura y software | Biografía y retrato disponibles; `#about` conservado; cloud no se presenta como experiencia acreditada |
| Proyectos | `projects.js`, `projects.jsx`, tarjetas, dos páginas y seis diagramas | Monitor SSH protagonista, Metodología secundaria, visuales técnicos propios | Ambas URLs, detalle completo y controles de diagramas conservados |
| Capacidades | `skills.js`, `skills.jsx`, `Technical_Cards.jsx` | Pearl y jerarquía tipográfica por familias | Ocho categorías y todas las tecnologías accesibles; `#skills`; cuarta familia provisional Infrastructure |
| Experiencia | `timelineData.js`, `TimelineSection.jsx`, `TimelineCard.jsx` | Cronología refinada con énfasis en responsabilidades | Cuatro registros, fechas, empresas y contenido; `#experience`; sin educación inventada |
| Contacto | `contac.jsx`, campos, información y perfiles | Correo directo y perfiles con nombre; acción honesta si hay campos | `#contact`, destinos reales, labels y ausencia de falso éxito de envío |

Secuencia: ANX-001 → ANX-002 → ANX-003 → ANX-004 → ANX-005 → ANX-006. Accesibilidad y rendimiento se revisan en cada fase; ANX-006 reúne la validación final.

## 3. ANX-001 — Auditoría técnica y visual

**Estado:** completada; no implementación de UI.

**Alcance:** inspeccionar stack, todos los componentes/secciones/datos/estilos, rutas, assets, funcionalidad y problemas actuales; proponer dirección y arquitectura, riesgos y pruebas futuras.

**Archivos de entrega:**

- `docs/redesign/audit.md`.
- `docs/redesign/roadmap.md`.

**Pruebas ejecutadas:**

- `npm ls --depth=0`: versiones reales documentadas.
- `npm run build -- --outDir /tmp/anxzu-audit-build`: correcto; JS único 486,09 kB (150,42 kB gzip), CSS 36,78 kB (6,21 kB gzip), retrato 1653,47 kB.
- `npm run lint`: correcto.
- Navegador con build local: home en 1440, 1024, 768, 375 y 320 px; geometría y capturas inspeccionadas en vistas seleccionadas, menú/Escape, anclas, campos y nombres accesibles; entrada directa/recarga de las dos páginas de proyecto.
- Lighthouse, Web Vitals, reduced motion emulado, lector de pantalla y perfil FPS: no medidos; límites explícitos en auditoría.

**Aceptación:** ambos documentos existen; inventario y conservación trazables al código real; fallos reproducibles y propuestas separados; fases futuras con archivos/pruebas/criterios; archivos de aplicación y cambios previos intactos. No afirmar objetivos de calidad sin evidencia.

## 4. ANX-002 — Design system y arquitectura de componentes

**Estado:** implementada por instrucción del usuario. Tokens claros/oscuros, tipografía, layout fluido, componentes base, navegación accesible, contacto directo y motion foundations completados. Build, lint y cuatro pruebas de Node pasan; geometría comprobada en tres rutas × cinco anchos. Resultados y límites en [design-system.md](design-system.md). Las decisiones siguientes describen el alcance aplicado.

**Alcance:** convertir la dirección en tokens y estructura mínima, resolver cimientos de accesibilidad/box model y establecer contratos de datos, navegación y movimiento. Mantener la interfaz navegable durante la migración.

Decisiones a concretar al comenzar:

1. Conservar Inter como primera opción; comparar Geist solo si aporta una mejora visible. Determinar pesos, fallback y carga; una familia principal por defecto.
2. Tokens Obsidian/Graphite/Pearl/Silver/Ice Blue y alias semánticos de texto/foco/controles para superficies claras/oscuras. Validar combinaciones y estados; no usar Silver/Ice Blue como texto pequeño sobre Pearl.
3. Escala fluida de tipo, contenedor, gutters, espaciado, radios, capas y tiempos del brief. Prosa de 60–75ch y diseño fluido de 320 px en adelante.
4. Un header con enlaces por ruta; patrón disclosure para menú móvil salvo que haya una razón clara para usar modal. Escape, `aria-expanded`, `aria-controls`, label dinámico y retorno de foco. No atrapar foco en un disclosure normal.
5. Conservar IDs actuales o alias reales; reparar el enlace de introducción de Metodología y casing de TimelineCard. Definir navegación a hashes y cambios de ruta con foco/restauración previsibles.
6. Documentar política de idioma antes de reescribir copy; no añadir traducciones completas por suposición.
7. Precisar si “contenido sin JS” significa independencia de animaciones o lectura completa sin JS. Si exige lo segundo, evaluar prerender React/Vite antes de dar el requisito por satisfecho.

**Archivos candidatos:**

- Nuevos: `src/styles/tokens.css`, `src/styles/base.css`, `src/components/layout/SiteHeader.jsx`, `src/components/ui/ActionLink.jsx`, `src/data/navigation.js`; `Button.jsx` nativo solo si hay acciones que lo necesitan.
- Existentes: `src/index.css`, `src/main.jsx`, `src/pages/Home.jsx`, ambas páginas de proyecto, ambos navbars y `src/style/layout/navbar.css`, `src/components/sections/TimelineSection.jsx`, `src/components/utils/ScrollToTop.jsx`, `index.html` si se acuerda idioma/fuente.
- Documentación propuesta: `docs/redesign/design-system.md`, con decisiones y tabla de compatibilidad de tokens antiguos/nuevos.

**Pruebas:** build/lint; navegación entre las tres rutas y hashes; tabulación, Shift+Tab y Escape de menú; comparación de contraste de pares/estados; lectura de headings y landmarks; anchos 320/375/768/1024/1440 y puntos próximos al breakpoint; prueba de build sensible a mayúsculas cuando haya entorno disponible.

**Aceptación:** tokens centralizados y consumidos por las bases migradas; un `<main>` y jerarquía coherente por página; skip link y foco visibles/no ocultos por header; controles principales con objetivo 44 × 44; anclas y rutas conservadas; sin nuevas dependencias injustificadas; el código no depende de `opacity: 0` para mostrar contenido crítico. La compatibilidad del resto de estilos sigue documentada y las regresiones conocidas tienen responsable/fase.

## 5. ANX-003 — Hero y primera transición

**Alcance:** implementar Hero y Conexión con identidad ANXZU, biografía y retrato existentes, usando tipografía, espacio y un único SVG narrativo. Sustituir gradiente infinito por una entrada sobria y legible.

**Archivos candidatos:** `src/components/sections/hero.jsx`, `src/components/sections/about.jsx`, `src/pages/Home.jsx`, `src/style/hero.css`, `src/style/about.css`; nuevos `src/components/scenes/ConnectionScene.jsx`, `src/components/ui/ConnectionDiagram.jsx` y estilos de la escena. `src/hooks/useReducedMotion.js` solo si hace falta controlar animación JS.

**Movimiento:** CTA 180–240 ms, entrada 500–750 ms; scroll nativo. Prototipo SVG estático primero; un progreso sutil de conexión sobre scroll como mejora. No ocultar texto esperando observer; sin grandes desplazamientos en móvil. Si se anima SVG, medir técnica y trabajo de pintura antes de introducir GSAP.

**Pruebas:** build/lint; vista inicial a 320/375/768/1024/1440; teclado en CTA y navegación; errores de carga del retrato; reduced motion real o emulado cuando la herramienta lo permita; contenido si falla la mejora de animación; verificar que no se introduce React Flow en el hero. Revisar lectura con zoom y títulos largos.

**Aceptación:** ANXZU y la identidad profesional legibles desde el primer render; CTA funcionales; perfil conservado; SVG con equivalente textual; `#about` llega al perfil; sin solapamiento del header ni scroll horizontal; una sola animación protagonista, alternativa estática y cleanup; ningún proveedor cloud ni relación profesional inventada. Si no hay herramienta de medición LCP/FPS, registrar ese pendiente sin declarar cumplimiento.

## 6. ANX-004 — Narrativa y proyectos

**Alcance:** construir presentación editorial de los dos proyectos, visuales propios basados en diagramas, adaptar detalles al sistema visual y diferir carga de las rutas pesadas. Mantener las seis piezas de explicación técnica y sus controles.

**Archivos candidatos:** `src/data/projects.js`, `src/components/sections/projects.jsx`, `src/components/ui/projects_card.jsx`, `src/style/projects.css`, `src/App.jsx`, `src/pages/projects/Concurrencia.jsx`, `src/pages/projects/Metodologia.jsx`, `src/components/sections/introduce.jsx`, `src/components/sections/introduce_metodologia.jsx`, `src/style/introduce.css`, los seis archivos `src/components/ui/graphics/*.jsx`; nuevo `ProjectFeature.jsx` y visuales SVG puntuales si conviene. Nuevos derivados de imagen solo si se justifican, conservando originales.

**Trabajo específico:**

- Destacar monitor SSH por riqueza del caso existente, sin inventar resultados operativos. Mostrar Metodología con jerarquía propia.
- Sustituir falsos bloques de imagen con visuales fieles; distinguir diagramas simplificados de topología completa. No presentar React Flow como implementación del monitor Bash.
- `React.lazy`/`Suspense` por caso y recuperación ante carga fallida; comprobar chunks reales y que la portada no descargue React Flow anticipadamente.
- Hacer consistente la interacción de diagramas: scroll de página libre, zoom deliberado, controles accesibles, contenido textual equivalente, intervalos pausados/estáticos con reduced motion y limpieza al desmontar.
- Revisar repetición en Metodología sin borrar información útil; cualquier consolidación debe preservar propósito y explicaciones. La métrica de horas se mantiene con su procedencia y sin amplificarla.
- Nodalume queda fuera mientras no exista material adecuado.

**Pruebas:** build/lint; ambas tarjetas por teclado/puntero; rutas directas/recarga/back/forward y hashes; carga lenta/error de chunks; render y controles de los cuatro + dos diagramas; ausencia de captura involuntaria de rueda; viewport móvil y lectura de nodos al ampliar; reduced motion; comparación del bundle con la línea base.

**Aceptación:** dos proyectos localizables y casos íntegros; imágenes/esquemas no ficticios; rutas antiguas funcionan; no hay contenido oculto esperando scroll; los controles no requieren hover; equivalencia de seis diagramas acreditada; carga diferida produce separación verificable; ningún fallback desplaza contenido sin reserva; no se añadieron dependencias sin justificación y medición. Cualquier cambio de cifras requiere evidencia, no redacción publicitaria.

## 7. ANX-005 — Capacidades, experiencia y contacto

**Alcance:** completar la escena clara, cronología y cierre; conservar todo el contenido de habilidades/experiencia/contacto. Reorganizar ocho categorías en familias sin convertirlas en nuevas acreditaciones.

**Archivos candidatos:** `src/components/sections/skills.jsx`, `src/components/ui/Technical_Cards.jsx`, `src/data/skills.js`, `src/style/skills.css`, `src/components/sections/TimelineSection.jsx`, `src/components/ui/TimelineCard.jsx`, `src/data/timelineData.js`, `src/style/timelineseccion.css`, `src/components/sections/contac.jsx`, `src/components/ui/Contac_Info.jsx`, `src/components/ui/Contact_from.jsx`, `src/components/ui/social_log_crd.jsx`, `src/data/social_profiles.js`, `src/data/info_contac.js`, `src/style/contac.css`; nuevas unidades `CapabilityGroup.jsx`/`ExperienceEntry.jsx` según necesidad.

**Trabajo específico:**

- Capacidades sobre Pearl: familias Networking, Architecture, Software e Infrastructure como propuesta sustentada. Si se solicita Cloud como familia profesional, obtener primero contenido que lo respalde. Todas las ocho categorías originales siguen disponibles.
- Cronología en orden de datos, fechas y empresas exactas; evitar alternancia que dificulte móvil. Titular Experiencia si no hay educación aportada. Reconfirmar vigencia antes de actualizar “Actualidad”.
- Pasar `name` a perfiles, mantener `rel`, hacer visible y accionable el correo.
- Preferir correo directo como cierre. Si hay campos, definir “Preparar correo” con borrador `mailto` y limitaciones explícitas, o un servicio de envío real previamente acordado. No presentar apertura de cliente como mensaje enviado; no guardar credenciales en frontend.
- Para envío real: `<form>`, submit nativo, `name`/`autocomplete`, validación y mensajes asociados, estados de progreso/error/éxito accesibles y prevención de duplicados. El canal/servicio es una decisión de producto pendiente, no un requisito implícito de nueva infraestructura.

**Pruebas:** build/lint; inventario de ocho grupos y cuatro empleos frente a datos; contraste/foco en claro y oscuro; teclado/lectura/zoom; todos los destinos y nombres de contacto; inputs vacíos/email inválido y estados de error si hay formulario; revisión del URI de borrador sin enviar correo; pruebas con mocks o entorno de prueba para backend, sin contactar destinatarios reales.

**Aceptación:** no se pierden capacidades ni responsabilidades; el alto contraste conserva legibilidad y foco; cronología usable en móvil; contacto tiene una acción funcional y honesta; campos y enlaces tienen nombre; sin endpoint ni servicio inventado, falso éxito o envío real de prueba no autorizado. El rótulo Cloud no implica experiencia no respaldada.

## 8. ANX-006 — Rendimiento, accesibilidad y preparación para publicación

**Alcance:** cerrar defectos, medir el resultado con herramientas disponibles y preparar un candidato revisable. **Preparar no autoriza desplegar en producción.**

**Archivos candidatos:** ajustes acotados de fases anteriores; `index.html`, `vite.config.js` solo si se justifica, carga de rutas en `src/App.jsx`, fuente/retrato y estilos globales. Conservar `public/.htaccess` y `public/_redirects` hasta verificar proveedor. Documentación nueva propuesta: `docs/redesign/validation.md` y `docs/redesign/release-checklist.md`; informes/capturas en `docs/redesign/reports/` si se obtienen. `package.json`/lockfile solo si una herramienta necesaria lo requiere y su cambio está justificado; no actualizar por rutina.

### Protocolo de validación

| Área | Prueba | Evidencia/aceptación |
| --- | --- | --- |
| Integridad | Lint, build y revisión de diff; build en Linux/casing | Salida y versiones, sin fallos de rutas/imports ni cambios ajenos |
| Navegación | Tres rutas, entrada directa y refresh, hashes preservados, back/forward, URL desconocida | Matriz por ruta; respuesta y recuperación de navegación coherentes |
| Responsive | 320/375/390/768/1024/1440, ancho intermedio, horizontal y zoom 200/400 % | Sin scroll horizontal de página ni controles/textos cortados; diagramas con navegación interna deliberada y alternativa legible |
| Teclado | Tab/Shift+Tab, Enter/Space, Escape, skip link, menú, proyectos, contacto y zoom | Foco visible, orden lógico, sin trampas y no oculto por header; retorno de foco correcto |
| Semántica | Headings/landmarks, nombres, labels, errores, SVG y lenguaje | Revisión manual más scanner si está disponible; VoiceOver si hay acceso |
| Tacto | Objetivos de diseño 44 × 44 y separación; diagramas incluidos | Medidas DOM y prueba de uso; documentar excepciones de enlaces inline |
| Movimiento | Preferencia reducida al cargar y al cambiarla, sin observer/animación | Estado estático completo, sin loops ni captura de scroll; cleanup al cambiar ruta |
| Laboratorio | Lighthouse móvil/escritorio en build servido; tres ejecuciones por perfil, caché fría según protocolo fijo | Registrar versión, navegador, CPU/red, viewport, mediana y rango de cada ruta; conservar informes JSON/HTML |
| Carga y estabilidad | LCP/CLS en laboratorio y waterfall | LCP ≤ 2,5 s y CLS ≤ 0,1 en condiciones documentadas, sin atribuirlo automáticamente a campo |
| Respuesta | Interacciones de menú, navegación y diagramas perfiladas | Registrar latencias observadas; TBT es diagnóstico, no sustituto de INP |
| Campo | CrUX o RUM autorizado, si existe volumen/dato accesible | LCP/CLS/INP p75 separado móvil/escritorio; INP ≤ 200 ms. Si faltan datos, marcar pendiente |
| Fluidez | Perfil de rendimiento en dispositivo documentado, scroll y SVG/diagramas | Objetivo 60 FPS; registrar frames largos/tareas/coste, no inferir por percepción |
| Hosting | Staging del proveedor real, fallbacks SPA, MIME/caché/HTTPS | Tres rutas recargables, assets correctos y sin reglas contradictorias; sin despliegue de producción |

**Metas:** Lighthouse Performance ≥ 90 y Accessibility ≥ 95, LCP ≤ 2,5 s, CLS ≤ 0,1, INP ≤ 200 ms; 60 FPS como objetivo en dispositivos de prueba. Una puntuación Accessibility alta no sustituye revisión manual. Si una herramienta no está disponible, registrar limitación, método alternativo y trabajo pendiente; no marcar la métrica como aprobada.

Los primeros presupuestos se fijan tras separar rutas y optimizar retrato, usando la línea base real de ANX-001. Evitar video de hero, carga de React Flow en home y familias de fuente duplicadas; comparar gzip de chunks iniciales, bytes de imágenes y trabajo de render, no solo tamaño total de `dist`.

**Aceptación de preparación:** informes reales o pendientes explícitos, sin defectos críticos de teclado/contacto/navegación/contenido; bundle comparado con base; información/identidad verificada contra fuentes existentes; instrucciones de build, staging y reversión documentadas. Si faltan pruebas necesarias, etiquetar candidato pendiente de validación, no “listo para producción”. Publicación, push o PR no forman parte de ANX-001.

## 9. Control de migración y revisión

Cada fase futura debe entregar:

1. Problema resuelto y comportamiento resultante, con capturas locales cuando corresponda.
2. Lista acotada de archivos modificados y contenido conservado según la matriz.
3. Pruebas ejecutadas, resultados reales y limitaciones.
4. Comparación de rutas, hashes, carga inicial y accesibilidad con la base.
5. Riesgos pendientes con fase de resolución; ningún resultado inventado para cerrar un criterio.

Mantener commits por fase cuando se solicite registrar cambios; no arrastrar el lockfile previamente modificado. La reversión debe consistir en revertir el cambio de fase revisado, sin `reset --hard` ni borrar trabajo del usuario. El sitio en producción permanece intacto hasta una instrucción posterior explícita.

**Siguiente paso propuesto:** revisar los fundamentos de ANX-002 e iniciar ANX-003 cuando el usuario lo solicite. No se implementaron el hero cinematográfico ni las escenas narrativas de fases posteriores.
