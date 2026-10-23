# ANX-001 — Auditoría técnica y visual de ANXZU

Fecha: 21 de octubre de 2026 · Zona: America/Mexico_City.

**Estado: auditoría terminada. ANX-002 no iniciada.** Esta entrega contiene documentación, sin cambios en componentes, estilos, dependencias ni assets. No se publicó ni se envió nada a producción.

## 1. Alcance, evidencia y límites

Se inspeccionaron los 45 archivos de `src` (29 JSX, 9 CSS, 5 módulos de datos y 2 assets), las configuraciones, scripts, README y reglas de alojamiento. No se encontraron archivos `AGENTS.md` en la búsqueda del proyecto y su directorio padre. Se aplicaron las skills locales `frontend-design` y `ui-ux-pro-max`.

Base de trabajo: commit `5510d78` (`Actualizacion de tarjetas y recuperacion de data`), procedente de `dark-theme`. Rama creada para esta fase: `codex/anx-001-redesign-audit`.

El árbol ya tenía modificaciones en `package-lock.json`, y `.agents/` y `skills-lock.json` sin seguimiento. Se conservaron. Las versiones y mediciones siguientes corresponden a las dependencias instaladas del árbol de trabajo, no necesariamente a una instalación limpia del commit base. No se ejecutó `npm install` ni se actualizó el lockfile.

Método:

- Lectura de todos los componentes, páginas, datos y estilos; trazado de rutas, anclas, dependencias y acciones.
- Build de producción en `/tmp/anxzu-audit-build`, sin sobrescribir el `dist` existente, y ejecución de ESLint.
- Inspección visual y del árbol accesible en el navegador integrado sobre `http://127.0.0.1:4173`, servido con Vite Preview. Comprobaciones de geometría del DOM en distintos anchos, menú móvil, Escape y recarga directa de ambos proyectos.
- Consulta del sitio `https://anxzu.com` mediante la herramienta web: no fue accesible desde esa herramienta. Esto **no demuestra una caída del sitio**. No se verificó paridad entre producción y este checkout.
- Las observaciones visuales se basan en el build local. Las inferencias de rendimiento se distinguen de las mediciones.

No hay Lighthouse ejecutable ni dependencias de Lighthouse, axe, Playwright o Puppeteer en el proyecto. El navegador conectado permite inspeccionar la interfaz, pero no expone en esta sesión un informe Lighthouse, una emulación de reduced motion ni un perfil de frames. No se asignan puntuaciones ni tiempos de Web Vitals por estimación.

## 2. Resumen de hallazgos

La base es adecuada para un rediseño incremental: React y Vite, tres rutas claras, datos separados para proyectos/capacidades/experiencia y seis diagramas técnicos que aportan identidad. No hace falta cambiar el framework.

Las prioridades son corregir navegación y contacto, asegurar contenido visible sin depender de revelados, resolver anchos rígidos y ordenar el lenguaje visual. El aspecto actual es predominantemente oscuro, con tarjetas translúcidas repetidas, títulos con gradiente animado y poca distinción editorial entre proyectos. Esto se aparta de la sobriedad solicitada.

El contenido verificable dentro del repositorio es networking, infraestructura Linux, software, preventa técnica y dos casos de estudio. No hay material de Nodalume ni experiencia específica de cloud. La narrativa debe construirse con esa evidencia y señalar los vacíos antes de ampliarla.

## 3. Stack y dependencias reales

| Elemento | Declarado en `package.json` | Instalado al auditar | Papel |
| --- | --- | --- | --- |
| React / React DOM | `^19.2.0` / `^19.2.0` | `19.2.4` / `19.2.4` | UI renderizada en cliente |
| React Router DOM | `^7.13.2` | `7.18.4` | `BrowserRouter`, tres rutas y enlaces de proyecto |
| React Flow | `@xyflow/react ^12.10.2` | `12.10.2` | Seis diagramas con nodos, conexiones y controles |
| React Icons | `^5.6.0` | `5.6.0` | Iconos de capacidades, contacto y flechas |
| Vite | `^7.3.1` | `7.3.7` | Desarrollo, build y preview |
| Plugin React para Vite | `^5.1.1` | `5.1.4` | Transformación de JSX |
| ESLint / `@eslint/js` | `^9.39.1` | `9.39.4` | Análisis estático |
| Hooks / Refresh para ESLint | `^7.0.1` / `^0.4.24` | `7.0.1` / `0.4.26` | Reglas React |
| Tipos React / DOM | `^19.2.7` / `^19.2.3` | `19.2.14` / `19.2.3` | Tipos disponibles; código escrito en JS/JSX |
| globals | `^16.5.0` | `16.5.0` | Entorno navegador para ESLint |

Entorno observado: Node `v24.19.0`, npm `11.17.0`. Scripts: `dev`, `build`, `lint`, `preview`; no hay script de pruebas. No hay TypeScript, SSR, generador estático, backend, proveedor de formularios ni CI configurada en los archivos inspeccionados.

La animación actual usa CSS, `IntersectionObserver` y un intervalo. No están instalados Motion, GSAP, ScrollTrigger, Three.js ni Lenis.

`vite.config.js` conserva `base: '/'`. `public/.htaccess` y `public/_redirects` contienen fallback SPA para entornos distintos; conservarlos hasta verificar el alojamiento real. El README describe Hostinger/Apache/LiteSpeed como configuración actual, pero no se inspeccionó el servidor.

## 4. Inventario completo de interfaz

Las rutas de archivo de esta sección son relativas a la raíz del repositorio.

### Entrada, composición y navegación

| Archivo | Comportamiento actual | Tratamiento propuesto |
| --- | --- | --- |
| `src/main.jsx` | Importa CSS global y monta `App` dentro de `BrowserRouter`; importa `StrictMode` sin activarlo | Conservar entrada; evaluar Strict Mode en una fase posterior y comprobar limpieza de efectos |
| `src/App.jsx` | Importa anticipadamente las tres páginas; monta `ScrollToTop` | Mantener URLs; separar carga de casos de estudio |
| `src/pages/Home.jsx` | Navbar → Hero → About → Skills → Projects → Timeline → Contact | Reordenar en las seis escenas, conservando biografía y contenido |
| `src/pages/projects/Concurrencia.jsx` | Navbar de proyecto + `Introduce` | Mantener caso de estudio y sus cuatro diagramas |
| `src/pages/projects/Metodologia.jsx` | Navbar de proyecto + `IntroduceMetodologia` | Mantener caso y sus dos diagramas |
| `src/components/layout/navbar.jsx` | Nombre/AZ, cinco anclas, menú móvil y cambio de altura al hacer scroll | Navegación compartida con anclas estables, foco y cierre accesible |
| `src/components/layout/navbar_project.jsx` | Duplica estado/efectos del navbar; Home y tres anclas | Compartir estructura con enlaces específicos por proyecto |
| `src/components/utils/ScrollToTop.jsx` | `scrollTo(0, 0)` cuando cambia `pathname` | Preservar comportamiento básico y resolver explícitamente rutas con hash y restauración de foco |

Rutas que deben seguir funcionando: `/`, `/projects/concurrencia`, `/projects/metodologia`. No existe ruta de fallback para URLs desconocidas.

Anclas actuales de inicio: `#hero`, `#about`, `#skills`, `#projects`, `#experience`, `#contact`. Concurrencia añade `#introduce`, `#problema`, `#solucion`, `#highLevel`, `#flowSystem`. Metodología usa `#metodologia`, `#problema`, `#solucion`; su navbar apunta erróneamente a `#introduce`.

### Secciones

| Archivo en `src/components/sections/` | Contenido y función | Oportunidad |
| --- | --- | --- |
| `hero.jsx` | Nombre completo, profesión, frase de presentación, CTA a proyectos/contacto | ANXZU como título editorial con nombre y profesión legibles; una entrada discreta |
| `about.jsx` | Dos párrafos de perfil y retrato con fallback de cámara | Integrar perfil en Conexión; preservar retrato, biografía y alternativa de error |
| `skills.jsx` | Ocho grupos; observador de intersección al 15 %; encabezado `h1` adicional | Capacidades tipográficas, `h2` de sección y contenido visible por defecto |
| `projects.jsx` | Dos tarjetas desde datos; observador al 15 % | Jerarquía editorial y visuales de ingeniería derivados de los proyectos reales |
| `TimelineSection.jsx` | Cuatro registros de experiencia en alternancia izquierda/derecha | Cronología legible, una columna en móvil y orden semántico estable |
| `contac.jsx` | Información, redes, campos y enlace “Send Message” | Contacto minimalista con correo accionable y envío honesto |
| `introduce.jsx` | Introducción, problema, solución, arquitectura y flujo funcional de Concurrencia | Reducir repetición visual sin perder explicaciones ni reglas del sistema |
| `introduce_metodologia.jsx` | Resumen, problema, solución y dos flujos | Revisar repetición de párrafos/diagramas; mantener disponible toda la información |

### Primitivas y unidades de contenido

| Archivo en `src/components/ui/` | Estado |
| --- | --- |
| `button.jsx` | Siempre devuelve `<a>`; apropiado para enlaces, inadecuado para enviar un formulario. Separar enlaces y acciones nativas |
| `projects_card.jsx` | Imagen representada por texto sobre un fondo CSS; solo “View Project” es enlace, aunque toda la tarjeta muestra cursor interactivo. Título `h2` al mismo nivel que la sección |
| `Technical_Cards.jsx` | Icono, título en `div`, etiquetas y demora por índice; reutilizar contenido, revisar semántica y repetición |
| `TimelineCard.jsx` | Fecha, puesto `h3`, organización `h4` y descripción; cronología alterna y tarjetas |
| `Contac_Info.jsx` | Correo como texto y ubicación Mexico; convertir correo en enlace accesible |
| `Contact_from.jsx` | Tres campos con labels asociados, pero sin `<form>`, `name`, `required`, `autocomplete` ni manejador de envío |
| `social_log_crd.jsx` | Enlace externo con `noopener noreferrer`, recibe `name` para label/texto. El padre no pasa ese prop: los tres enlaces quedan sin nombre accesible |

### Los seis diagramas

Todos están en `src/components/ui/graphics/`, usan `ReactFlowProvider`, nodos personalizados, estilos inline y `Controls`. Se deshabilitan conexiones y arrastre de nodos. Los controles de zoom/encuadre siguen presentes. Deben mantenerse la atribución y la información técnica.

| Archivo | Información a conservar | Interacción y riesgo |
| --- | --- | --- |
| `flow_loadbalance.jsx` | Cliente → balanceador → servidores; dificultad de localizar una MAC | Rotación automática de servidor cada 1800 ms; tres servidores dibujados son una simplificación frente a seis declarados en el caso; rueda/arrastre deshabilitados |
| `bussiness_flow.jsx` | Negocio secuencial web → RADIUS y observabilidad paralela independiente | Conexiones animadas; zoom con rueda y pan en escritorio, desactivados en móvil |
| `logic_flow.jsx` | Validación MAC, SSH, Web ×6 y RADIUS ×1, coincidencias y salida; política web opcional | Conexiones animadas; misma variación escritorio/móvil |
| `highlevel_flow.jsx` | Orquestación Ubuntu, configuración, SSH, grupos remotos y logs | Diagrama ancho y denso; zoom/pan de escritorio; riesgo de texto pequeño al encuadrar en móvil |
| `metodologia_problem_flow.jsx` | Análisis → restricciones → contexto → IA → validación → integración | Seis pasos verticales; animación de conexiones; scroll de página permitido explícitamente |
| `metodologia_solution_flow.jsx` | Secuencia muy similar con descripciones refinadas | Casi duplica el diagrama anterior; distinguir propósito editorial antes de consolidar |

Los diagramas de Concurrencia tienen cabeceras absolutas cuyos contenedores no establecen siempre `position: relative`; revisar su referencia de posicionamiento. El intervalo se limpia al desmontar, pero no se pausa según visibilidad o preferencia de movimiento. Los listeners de resize se limpian, aunque hay lógica repetida en los seis archivos.

## 5. Contrato de preservación del contenido

“Respaldado por el repositorio” significa que el contenido ya existe, no que se hayan comprobado externamente empleos o resultados.

### Identidad y perfil

Conservar Andres Zuriel Macias Rios, la identidad ANXZU/AZ/AX, la profesión Communications and Electronics Engineer, el enfoque de ingeniería de comunicaciones/electrónica con orientación a computación, preventa, redes, infraestructura, frontend, soporte y documentación. Fuente: `hero.jsx`, `about.jsx` y el icono `src/assets/icons/AX.svg`.

El retrato `src/assets/images/anxzu.png` es el único asset raster: PNG de 1024 × 1536, **1 653 473 bytes** (aprox. 1,65 MB decimales). El marco actual es 448 × 560 y usa `object-fit: cover`: revisar recorte y `object-position`, no sustituir identidad por una imagen ficticia. No hay imágenes reales de proyectos ni vídeo en el repositorio.

### Proyectos

1. **Concurrent log monitor via SSH** → `/projects/concurrencia`. Ubuntu/Bash, SSH, búsqueda por MAC, seis servidores web y un RADIUS activo de dos disponibles; observación paralela, salida centralizada y política opcional que detiene otros nodos web sin afectar RADIUS. Conservar descripciones y diagramas. `React-flow` aparece en las competencias de la tarjeta, pero el repo acredita su uso para la presentación visual: no confundirlo con tecnología del script de consola.
2. **AI-assisted customization methodology** → `/projects/metodologia`. Personalización mediante intervención externa sin modificar código base, análisis de restricciones, contexto técnico, IA y validación manual. La tarjeta afirma reducción de 8–14 a 1–2 horas por proyecto. Preservar la afirmación como contenido existente, sin convertirla en porcentajes, garantía o resultado independiente verificado; falta metodología de medición para destacarla como KPI.

Fuentes: `src/data/projects.js`, `introduce.jsx`, `introduce_metodologia.jsx` y los seis diagramas. No hay repositorios de implementación de esos proyectos ni enlaces de demo configurados: no inventarlos.

**Nodalume:** no aparece en código, datos ni assets inspeccionados. No se propone como destacado hasta disponer de material y contexto adecuados.

### Capacidades: no perder las ocho categorías

| Categoría existente | Contenido existente |
| --- | --- |
| Communications | LAN-to-LAN, VLAN, BGP, OSPF |
| Networking | Captive Portals, Structured Cabling |
| Web Development | React, JavaScript, PHP, BASH |
| Infrastructure | Debian Linux, NAS, Apache |
| Databases | MariaDB, SQL Queries, PHP Integration |
| Cybersecurity | Perimeter Security, Troubleshooting, Technical Support |
| Platforms & Tools | WordPress, Shopify, Salesforce |
| Technical Pre-Sales | SOW, Site Surveys, RFP Support |

Fuente canónica: `src/data/skills.js`. El README enumera otras tecnologías, pero no basta para atribuir nuevos proyectos o dominio profesional. Para las familias del brief, Networking agruparía comunicaciones/redes; Architecture, infraestructura/seguridad/diseño de soluciones/preventa; Software, desarrollo/datos/plataformas. **Cloud no tiene evidencia específica**: proponer provisionalmente “Infrastructure” como cuarta familia o mantener Cloud pendiente de contenido, sin añadir AWS, Azure, GCP, certificaciones ni experiencia cloud por inferencia.

### Experiencia

| Periodo en datos | Puesto y organización | Contenido a conservar |
| --- | --- | --- |
| 2025 – Actualidad | Presales Engineer Sr., DataWifi | Requisitos de portales cautivos, diseño preliminar, controladores multimarcas, demos y cuentas estratégicas en México |
| 2023 – 2025 | Presales Engineer, Servnet | Creación del área de preventa, estandarización, dimensionamiento, rentabilidad, requerimientos y propuestas de conectividad/telefonía/seguridad/redes |
| 2022 – 2023 | Engineer, End To End | Automatización interna con React, soporte, análisis funcional y propuestas/cotizaciones |
| 2022 – 2022 | External Consultant in Storage Infrastructure and Data Management, M.T. de México | NAS Debian, SAMBA, Apache, MariaDB, PHP, VLAN, enrutamiento y panel de usuarios/privilegios/RAID |

Fuente: `src/data/timelineData.js`. Conservar fechas y responsabilidades. “Actualidad” es texto del dato, no verificación externa de empleo vigente. La sección se titula “Experience & Education”, pero no tiene registros de educación; ajustar el rótulo o aportar contenido después, sin inventar estudios ni fechas.

### Contacto y comportamiento

- Correo: `andres.macias@anxzu.com`; ubicación: Mexico.
- GitHub: `https://github.com/Zuriel0`.
- LinkedIn: `https://www.linkedin.com/in/andrés-zuriel-macías-ríos`.
- Enlace de correo: `mailto:andres.macias@anxzu.com`.
- Conservar los destinos de `src/data/social_profiles.js`, los enlaces internos, cierre del menú al navegar, comportamiento de regreso al inicio de ruta, controles y lectura de diagramas, fallback del retrato y labels de campos.
- El formulario **no tiene envío funcional**: “Send Message” es un enlace `href="#"` externo a los campos. Conservar esa apariencia sin corregirla perpetuaría un fallo. Recomendación inicial: correo directo como CTA y, si se conservan los campos, una acción explícita “Preparar correo” que abra un borrador con datos codificados, sin afirmar que se envió. Un envío real requiere definir servicio, contrato de respuesta y estados; no cabe inventar un backend.

`src/data/info_contac.js` solo contiene `{ id: 1 }` y no se importa en la UI. Documentar esta deuda antes de consolidar el contenido de contacto.

## 6. Hallazgos priorizados y verificables

P1: resolver antes de considerar el rediseño funcionalmente listo. P2: resolver durante la migración. P3: mantenimiento/pulido. No son puntuaciones Lighthouse.

| ID | Prioridad | Evidencia | Impacto y recomendación |
| --- | --- | --- | --- |
| A01 | P1 | `contac.jsx`, `Contact_from.jsx`, `button.jsx` | No hay envío ni validación de formulario; enlace a `#`. Definir acción honesta y probarla |
| A02 | P1 | `contac.jsx` no pasa `name` a `SocialCard`; DOM confirma tres labels ausentes | Enlaces solo de icono sin nombre accesible. Pasar el nombre y preservar destinos |
| A03 | P1 | `projects.css` y `skills.css`: tarjetas `opacity: 0` hasta `.visible`; observadores en secciones | Un fallo del observador o umbral impide ver contenido. Renderizar visible; motion como mejora progresiva |
| A04 | P1 | DOM a 1024 px: ancho útil 1009 px, documento 1186 px; CSS fija `72rem` y márgenes de `31rem` | Desbordamiento en tableta/escritorio pequeño. Contenedor fluido y gutters; validar entre breakpoints |
| A05 | P1 | `TimelineSection.jsx` importa `../ui/timelineCard`; archivo rastreado `TimelineCard.jsx` | El build local tolera el casing; riesgo de fallo en Linux. Corregir coincidencia exacta y validar en FS sensible a mayúsculas |
| A06 | P2 | Navbar compartido de proyectos enlaza `#introduce`; Metodología tiene `#metodologia`; confirmado en DOM | Ancla rota. Configuración de enlaces por ruta; preservar ambas anclas públicas con alias si se renombra |
| A07 | P2 | Menú móvil mantiene `aria-expanded="true"` tras Escape | Añadir Escape, `aria-controls`, label según estado y foco devuelto al disparador; elegir patrón disclosure o modal explícitamente |
| A08 | P2 | No hay `prefers-reduced-motion` en estilos/lógica propios; gradientes infinitos y edges animados | Implementar alternativa estática, detener intervalo/animaciones y desactivar smooth scroll según preferencia |
| A09 | P2 | `.navbar` tiene `width: 100%` + padding horizontal; no hay reset `box-sizing` global | Geometría de navbar 440 px sobre viewport de 375; documento a 320 desborda. Aplicar box model coherente y revisar cada sección |
| A10 | P2 | No hay `<main>`, enlace de salto ni `:focus-visible` propio; home tiene dos `h1` | Orden de headings/landmarks y foco consistente. No se observó eliminación global del outline nativo; no afirmar que todo el foco sea invisible |
| A11 | P2 | DOM: menú 36 × 28 px, enlaces sociales 24 × 20 px, zoom de diagramas 26 × 26 px | Aumentar controles a objetivo de diseño 44 × 44; evaluar espaciado real. No equiparar automáticamente 44 px con mínimo WCAG AA |
| A12 | P2 | Imports estáticos en `App.jsx`; un solo JS de 486,09 kB en build | La portada carga código de ambos casos y React Flow. Separar rutas con `lazy`/`Suspense` y estados de error/carga |
| A13 | P2 | Retrato PNG 1,65 MB, sin `loading` ni `width`/`height` intrínsecos en `<img>` | Carga anticipada bajo el hero. Evaluar AVIF/WebP, tamaños responsive y lazy; conservar marco reservado. No se midió su CLS |
| A14 | P2 | `index.html` en inglés, home mixta y detalles en español; título único, sin description/OG | Acordar idioma principal, marcar tramos/rutas y metadatos coherentes; no instalar i18n sin necesidad |
| A15 | P2 | Zoom con rueda y pan activos en tres diagramas de Concurrencia en escritorio | Posible captura inesperada del scroll local al pasar sobre diagramas. Probar y limitar interacción a activación deliberada; no hay scroll hijacking global observado |
| A16 | P2 | Texto duplicado y flujos casi iguales en Metodología; diagrama inicial dibuja tres servidores | Revisar claridad sin alterar hechos; indicar esquema simplificado y conservar seis servidores en explicación |
| A17 | P3 | `width: 10 0%`, `text-wrap: center`, keyframes duplicados; clase `.timeline-title` usada por sección y puesto | Declaraciones inválidas/cascada compartida; normalizar progresivamente y medir regresiones |
| A18 | P3 | Navbars duplican scroll/resize visual; `setTimeout` de 450 ms sin limpieza, estado bounce sin regla correspondiente | Simplificar efecto, evitar side effects dentro del updater y limpiar temporizadores |

Los campos ya tienen labels asociados; los enlaces sociales ya tienen `rel` seguro; los observadores y listeners principales tienen cleanup. Conservar estas buenas bases.

## 7. Auditoría visual y dirección propuesta

### Qué mejorar desde el diseño actual

- **Hero:** el nombre y profesión tienen claridad, pero el gradiente de fondo del texto se anima indefinidamente mediante `background-position`; no es una animación limitada a transform/opacity. Dar protagonismo tipográfico a ANXZU con contraste constante, nombre y especialidad a continuación. El aire debe servir la composición, no imponer `100dvh` a cada bloque de lectura.
- **Conexión/perfil:** About hoy ocupa una pantalla, texto ancho justificado y retrato separado. Integrar la biografía con un SVG sobrio de red → infraestructura → software. No mostrar proveedores cloud ni infraestructuras supuestamente operadas sin evidencia.
- **Proyectos:** hoy repiten dos tarjetas de igual peso y falso bloque de imagen textual. Destacar primero el monitor SSH por tener cuatro diagramas y un problema técnico concreto; presentar Metodología con una composición secundaria. Crear visuales SVG a partir de los flujos reales, rotulados como esquemas cuando corresponda, sin capturas ni consolas inventadas.
- **Capacidades:** ocho tarjetas casi idénticas compiten con los casos. Usar una escena Pearl con filas/familias tipográficas y detalle de las ocho categorías conservado en el mismo contenido o bloques expandibles accesibles.
- **Experiencia:** alternancia de tarjetas y fechas en pills añade ruido. Filas cronológicas con fecha, puesto, empresa y responsabilidad; una sola columna semántica. Evitar sumar años o porcentajes no aportados.
- **Contacto:** priorizar correo y perfiles con nombres. Una acción principal debe explicar lo que ocurre; reducir el peso visual de un formulario que aún no ofrece envío.

### Tokens preliminares para evaluar en ANX-002

No se implementan tokens ni componentes en esta fase.

| Rol | Propuesta | Uso |
| --- | --- | --- |
| Obsidian | `#090A0C` | Hero y fondo principal |
| Graphite | `#1C1E23` | Superficies técnicas puntuales |
| Pearl | `#F5F5F7` | Texto sobre oscuro y escena clara de capacidades |
| Silver | `#8C96A6` | Texto secundario sobre oscuro |
| Ice Blue | `#81AFFF` | Enlaces y foco sobre oscuro |
| Texto secundario sobre Pearl | Alias oscuro a definir/validar | No reutilizar Silver ni Ice Blue para texto pequeño en claro |

Cálculo estático sRGB de pares opacos: Silver/Obsidian ≈ 6,63:1; Ice Blue/Obsidian ≈ 8,97:1; Silver/Pearl ≈ 2,74:1 e Ice Blue/Pearl ≈ 2,03:1. Los dos últimos no sirven para texto normal con objetivo 4,5:1. El secundario actual `#86868b` sobre `#14171e` da ≈ 4,95:1: la auditoría no presupone que todo el texto gris actual falla. Transparencias, gradientes, hover y foco requieren medición del resultado renderizado.

Preferencia tipográfica propuesta: **conservar Inter**, ya declarada en CSS y Google Fonts, y evaluar Geist solo mediante comparación real de legibilidad y peso. No cargar ambas por defecto. El enlace actual solicita pesos 300/400/600/700; hay reglas 500, por lo que deberá revisarse la correspondencia de pesos. Proponer escala fluida con `clamp`, cuerpo de al menos 16 px, líneas de lectura de unas 60–75 unidades `ch`, alineación izquierda para prosa y títulos de hero centrados cuando la composición lo justifique.

Centralizar además separación, ancho de contenido, gutters, radios, foco, capas, easing y tiempos. Radios contenidos para controles; no aplicar el mismo borde, blur y sombra a todas las superficies.

### Contraste de propuestas antes de construir

Se compararon dos esquemas de jerarquía; son esquemas conceptuales, no composiciones finales:

```text
A. Secuencia de tarjetas uniforme       B. Secuencia editorial propuesta
[Hero]                                 [ANXZU + profesión + CTA]
[About / retrato]                       [Perfil + conexión SVG]
[8 tarjetas iguales]                    [Monitor SSH: visual protagonista]
[2 proyectos iguales]                   [Metodología: caso secundario]
[Timeline en tarjetas]                  [Capacidades Pearl / filas]
[Formulario]                            [Cronología / contacto directo]
```

Se elige B porque los proyectos explican la ingeniería antes del inventario de herramientas y cada escena tiene función propia. Se descarta el patrón uniforme A por repetir la estructura actual. Las seis escenas ordenan la narración; sus números son identificadores del brief, no una obligación de poner etiquetas “01–06” en la UI.

### Investigación aplicada de skills

Consultas ejecutadas, sin persistir archivos automáticos de design system:

```sh
python3 .agents/skills/ui-ux-pro-max/scripts/search.py 'engineering portfolio editorial minimal' --design-system -p 'ANXZU' -f markdown
python3 .agents/skills/ui-ux-pro-max/scripts/search.py 'reduced motion scroll' --domain ux -n 3
python3 .agents/skills/ui-ux-pro-max/scripts/search.py 'lazy loading routes' --stack react -n 3
```

La consulta de sistema devolvió Minimalism & Swiss Style, con buen ajuste de espacio, jerarquía y sencillez; sus audiencias sugeridas son más genéricas que este portafolio. Se adoptan esos principios, **no** su estructura genérica Hero/Features/CTA, colores alternativos ni Archivo/Space Grotesk: el brief y la base Inter tienen prioridad. Las consultas específicas devolvieron reduced motion, ausencia de scroll hijacking y carga diferida con `React.lazy`, pertinentes al código encontrado. Se aplicó también `frontend-design`: identidad basada en ingeniería y una sola decisión visual protagonista por escena, evitando tarjetas y revelados repetidos como plantilla.

## 8. Arquitectura propuesta sobre el código real

Mantener React, Vite, React Router, React Icons y React Flow. Extraer responsabilidades, sin migrar de plataforma ni renombrar todos los archivos de una vez.

```text
src/
  App.jsx                       # mismas URLs; carga diferida de casos
  index.css                     # base y puente temporal de tokens existentes
  styles/
    tokens.css                  # colores primitivos/semánticos, tipo, espacio, motion
    base.css                    # box model, foco, lectura, reduced motion
  components/
    layout/
      SiteHeader.jsx            # un header; enlaces recibidos según página
      SiteFooter.jsx            # cierre opcional, sin contenido inventado
    scenes/
      ConnectionScene.jsx       # perfil existente + diagrama SVG
    ui/
      ActionLink.jsx            # navegación
      Button.jsx                # acción nativa, si hay una acción real
      ConnectionDiagram.jsx     # SVG con alternativa textual
      ProjectFeature.jsx        # presentación editorial desde datos
      CapabilityGroup.jsx       # familias con las ocho categorías
      ExperienceEntry.jsx       # fila cronológica
      graphics/                 # conservar seis diagramas; adaptar gradualmente
  hooks/
    useReducedMotion.js         # solo si una animación JS lo necesita
  data/
    projects.js                 # ampliar de forma aditiva, no romper links
    skills.js
    timelineData.js
    social_profiles.js
    navigation.js              # anclas por página y alias documentados
  pages/                        # Home y dos páginas de proyecto existentes
```

Los nombres nuevos son propuestos. La implementación puede retener `hero.jsx`, `projects.jsx`, `skills.jsx`, `TimelineSection.jsx`, `contac.jsx` y `about.jsx` mientras los adapta; no hace falta reemplazar todo por un nuevo árbol.

Composición objetivo de `Home`: `SiteHeader` → `<main>` con Hero, Conexión, Proyectos, Capacidades, Experiencia, Contacto. About pasa a Conexión, pero conserva `#about` como destino real. Retener también `#skills` y los demás hashes existentes, aunque cambie el nombre visible. Los casos conservan navegación, contenido profundo y diagramas; un layout común puede añadirse después de comprobar que sus secciones no son idénticas.

Los datos siguen siendo la fuente canónica. Añadir campos de presentación opcionales (`visual`, `featured`, `alt`) manteniendo `id`, `title`, `description`, `competences` y `link`. No colocar estilos JSX dentro de los datos ni duplicar versiones ES/EN sin una estrategia de idioma. Mantener el contenido detallado en las páginas existentes hasta justificar una extracción.

Separar casos con `React.lazy` y `Suspense`, junto con fallback estable y estado de error; cargar React Flow con las rutas de detalle. Para diagramas bajo el pliegue, evaluar montaje diferido con dimensiones reservadas y resumen disponible. No usar React Flow para la conexión ambiental de la portada: SVG basta y evita añadir ese coste al inicio. Confirmar con el build que la separación realmente produce chunks independientes.

### Sistema de movimiento propuesto

| Interacción | Duración orientativa | Técnica inicial |
| --- | --- | --- |
| Botones/enlaces | 180–240 ms | CSS; color, opacity y transform cuando aporten feedback |
| Menú | 250–350 ms | CSS + estado React; controlar visibilidad y foco |
| Presentación de proyecto | 300–450 ms | Una respuesta discreta al hover/focus, sin falso cursor de tarjeta |
| Entrada/revelado editorial | 500–750 ms | CSS/IntersectionObserver solo como mejora sobre contenido visible |
| Conexión narrativa | Progreso de scroll, no duración fija | SVG; estático como base, mejora nativa si es viable |

Una sola animación protagonista por escena, transform/opacity preferentes, sin gradientes animados continuos, parallax amplio móvil ni sustitución del scroll nativo. SVG accesible con título/descripción o decorativo con explicación HTML equivalente.

Decisión de dependencias: empezar sin nuevas librerías. Evaluar Motion solo si aparece coordinación de entrada/salida o estados que CSS no resuelva con claridad. Evaluar GSAP + ScrollTrigger únicamente para una escena concreta cuyo prototipo demuestre necesidad, con cleanup, alternativa móvil/reduced motion y coste medido. No instalar ambas por anticipación, ni Three.js/Lenis.

El requisito “no ocultar contenido crítico hasta JavaScript” debe distinguir animación de renderizado: hoy toda la SPA requiere JS para mostrar contenido. Eliminar `opacity: 0` como bloqueo evita una segunda dependencia de animación, pero no hace la SPA usable sin JS. Si el brief exige contenido completo con JS deshabilitado, evaluar prerender de las tres rutas conservando Vite/React, como decisión de alcance explícita; `noscript` solo informativo no equivale a cumplir ese requisito.

## 9. Validación ejecutada y línea base

### Comandos

```sh
npm ls --depth=0
npm run build -- --outDir /tmp/anxzu-audit-build
npm run lint
npm run preview -- --host 127.0.0.1 --port 4173 --outDir /tmp/anxzu-audit-build
```

Build correcto: 250 módulos transformados, 1,11 s reportados por Vite en esta ejecución. ESLint terminó con código 0. El aviso sobre outDir externo informa que Vite no lo vacía automáticamente; no es un fallo del build. El `build.txt` del repo es un registro anterior incompleto y no se usa como evidencia actual.

| Artefacto generado | Tamaño informado por Vite | Gzip informado |
| --- | --- | --- |
| JS único | 486,09 kB | 150,42 kB |
| CSS único | 36,78 kB | 6,21 kB |
| Retrato PNG | 1653,47 kB | No informado |
| Icono SVG | 2,24 kB | 1,26 kB |
| HTML | 0,58 kB | 0,38 kB |

Son tamaños locales, no bytes transferidos medidos en producción. Tiempo de build, peso del bundle y carga de página son métricas diferentes.

### Comprobaciones de navegador

Geometría de la portada medida tras establecer el viewport; scrollbar vertical de 15 px en este navegador. Comparar `scrollWidth` con `clientWidth`, no solo con ancho solicitado.

| Viewport solicitado | `clientWidth` / `scrollWidth` | Resultado |
| --- | --- | --- |
| 1440 × 900 | 1425 / 1425 | Sin desbordamiento horizontal del documento en esa captura |
| 1024 × 768 | 1009 / 1186 | Desbordamiento confirmado |
| 768 × 1024 | 753 / 753 | Sin desbordamiento del documento en esa captura |
| 375 × 812 | 360 / 365 | Desbordamiento de 5 px; navbar con rectángulo de 440 px de ancho |
| 320 × 568 | 305 / 354 | Desbordamiento confirmado |

Las medidas no sustituyen pruebas en dispositivos físicos ni garantizan todos los tamaños intermedios. La inspección visual abarcó hero/escritorio, hero/móvil, tarjetas de capacidades/proyectos, contacto y entrada de Metodología. No se archivaron capturas como entregables en esta fase.

- Menú móvil: abre con botón, actualiza `aria-expanded` y cierra al seleccionar Projects. Escape no lo cierra. La etiqueta permanece “Abrir” estando abierto.
- CTA/enlaces de sección llevan a hashes existentes en home. “View Project” usa `Link` a los casos. El enlace defectuoso de Metodología se comprobó contra IDs del DOM.
- Entrada directa y recarga de ambos casos funcionan en **Vite Preview**. Hay cuatro instancias React Flow en Concurrencia y dos en Metodología. Esto no comprueba los rewrites del hosting real.
- Los controles de zoom aparecen en el árbol accesible con nombre; no se completó una prueba manual de cada control ni un recorrido exhaustivo por teclado/lector de pantalla.
- El árbol accesible confirma dos `h1` en home y enlaces sociales sin nombre. Los campos exponen sus labels.
- No se observaron mensajes de error/warning en la consulta de consola de la pestaña al recargar Concurrencia; es una observación puntual.
- Reduced motion: se constató ausencia de adaptación en el código propio, pero no se simuló la preferencia en el navegador conectado. Tabulación completa, zoom al 200/400 %, VoiceOver y foco no oculto quedan pendientes del protocolo del roadmap.

### Objetivos del brief: estado real

| Métrica | Objetivo | Resultado de ANX-001 |
| --- | --- | --- |
| Lighthouse Performance | ≥ 90 | No medido; Lighthouse no disponible |
| Lighthouse Accessibility | ≥ 95 | No medido; inspección semántica parcial, no puntuación |
| LCP | ≤ 2,5 s | No medido |
| CLS | ≤ 0,1 | No medido |
| INP | ≤ 200 ms | No medido; no hay datos de campo |
| Fluidez | Objetivo 60 FPS | No perfilado ni comprobado en dispositivo físico |

Para calificar Core Web Vitals se requiere distinguir laboratorio y campo, con percentil 75 por móvil/escritorio; no reemplazar INP por TBT. Referencia: [Web Vitals de Google](https://web.dev/articles/vitals).

## 10. Riesgos y requisitos de migración

| Riesgo | Requisito y mitigación | Fase |
| --- | --- | --- |
| Cambios previos mezclados con rediseño | No restaurar/stagear lockfile ni skills por accidente; revisar diff por fase y usar commits acotados | Todas |
| Fallo de build en Linux | Igualar casing del import de TimelineCard; validar en sistema sensible a mayúsculas antes de publicar | ANX-002 / ANX-006 |
| Anclas y URLs compartidas dejan de funcionar | Conservar tres rutas y hashes; introducir alias DOM reales si cambia un ID; probar entrada directa y back/forward | ANX-002 a ANX-006 |
| Pérdida de biografía, capacidades o explicación técnica | Matriz de contenido anterior como checklist de equivalencia, incluso al resumir portada | ANX-004 / ANX-005 |
| Cloud/Nodalume o logros inventados | No añadirlos sin evidencia; confirmar contenido, métricas de metodología y vigencia de “Actualidad” al editar copy | Antes de usarlos |
| Formulario sigue sugiriendo envío inexistente | Acordar correo/borrador o servicio real; definir texto y estados; no enviar mensajes durante pruebas sin autorización | ANX-005 |
| Reglas oscuras rompen escena Pearl | Tokens semánticos por contexto, no inversión automática; medir texto, controles y foco | ANX-002 / ANX-005 |
| CSS global/inline causa regresiones en detalles | Migrar estilos por sección; evitar keyframes globales duplicados; tokenizar gráficos gradualmente | ANX-002 a ANX-006 |
| Lazy loading muestra huecos, fallos o salta layout | Suspense y error boundary, reserva de dimensiones y recuperación accesible | ANX-004 / ANX-006 |
| Scroll/animación dificulta lectura o navegación | Scroll nativo, contenido visible, cleanup, alternativa estática, controles deliberados de diagramas | ANX-003 / ANX-004 |
| Retrato y fuente comprometen carga | Derivados optimizados sin borrar original, tamaños/reserva y estrategia de carga; verificar con herramientas | ANX-004 / ANX-006 |
| Idioma y metadatos incoherentes | Conservar idiomas actuales mientras se decide política; no traducir ni cambiar identidad de oficio | ANX-002 / ANX-006 |
| CSR no satisface lectura sin JS | Aclarar nivel exigido; evaluar prerender conservando stack si se exige contenido completo sin JS | ANX-002 |
| Preview local se confunde con validación de hosting | Probar staging del proveedor real, redirects, caché, MIME, HTTPS y rutas profundas sin publicar producción | ANX-006 |

## 11. Referencias de decisión

- [README del proyecto](../../README.md): contexto de implementación. Los requisitos ANX-001–006 proceden del brief “ANXZU — The Art of Engineering” aportado por el usuario, no del README.
- Skills leídas: `.agents/skills/frontend-design/SKILL.md` y `.agents/skills/ui-ux-pro-max/SKILL.md`; búsquedas locales descritas en §7.
- [React: lazy](https://react.dev/reference/react/lazy): diferir componentes y proveer `Suspense`; aplicable a los casos de estudio.
- [W3C: tamaño mínimo de objetivo, SC 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html): AA se basa en 24 × 24 CSS px o excepciones/espaciado. El objetivo de diseño aquí será 44 × 44, sin confundirlo con el mínimo normativo.
- [Google: Web Vitals](https://web.dev/articles/vitals): separar medición de laboratorio y campo antes de declarar cumplimiento.

La secuencia, archivos candidatos, pruebas y criterios de aceptación de cada fase están en [roadmap.md](roadmap.md). La próxima fase queda propuesta para revisión, sin implementación iniciada.
