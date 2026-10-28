# Evaluación de skills y herramientas

Revisión: 27 de octubre de 2026. Se consultaron las fuentes originales mediante clones públicos de lectura en una carpeta temporal. No se ejecutaron instaladores remotos, hooks ni binarios descargados por esas skills. No estaban instaladas en el catálogo local; sus instrucciones y referencias se aplicaron desde las copias revisadas. No se añade una colección de skills al bundle ni al repositorio.

| Fuente                                                                                    | Revisión fijada                            | Licencia revisada                                     | Aplicación                                                                                      |
| ----------------------------------------------------------------------------------------- | ------------------------------------------ | ----------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| [Impeccable](https://github.com/pbakaus/impeccable)                                       | `d34c87e1a00989ae8dbdd7f6b30b70f23319e860` | Apache-2.0                                            | Dirección, contexto de producto, jerarquía, craft floor y crítica visual                        |
| [Transitions.dev](https://github.com/Jakubantalik/transitions.dev)                        | `6a7d68260d624eb66661cc3af17e0989476f48ae` | Licencia propia para transiciones/skills; tooling MIT | Snippet gratuito `24-learn-more-hover`, variables y reduced motion; extensión de foco accesible |
| [GSAP Skills](https://github.com/greensock/gsap-skills)                                   | `aed9cfd3277740755f6bfc1155c7aa645403b760` | MIT para las skills                                   | Core, Timeline, ScrollTrigger, React y Performance: contexto, capas, quickTo, cleanup y pausa   |
| [Make Interfaces Feel Better](https://github.com/jakubkrehel/make-interfaces-feel-better) | `35545ea1512ad59fa463e6b1f95ca9c052981fe6` | MIT                                                   | Revisión de tipografía, superficies, iconografía, movimiento y rendimiento                      |

## Instalación y límites

- Impeccable documenta `npx impeccable install` y un launcher `scripts/impeccable context`. Se revisó el launcher: puede descargar un motor ejecutable en la primera ejecución. Se eligió su fallback documental y se anunció que el contexto automático no se ejecutó. No se presenta este trabajo como una ejecución de su motor, detector o pipeline de comps. La dirección detallada del brief se conserva; no se añade una aprobación de concepto adicional.
- El helper local de instalación de skills admite `install-skill-from-github.py --repo ... --path ... --ref ... --dest ...`. Se revisó, pero no fue necesario instalar ni ejecutar las herramientas de autoría para aplicar la documentación disponible. No hay hooks globales ni cambios en la configuración del agente.
- Transitions permite incorporar snippets en un sitio propio; no autoriza redistribuir la colección como producto competidor. Solo se incorpora el snippet utilizado, con procedencia en CSS. No se usan recursos de pago, marca, diseño del sitio ni el agente remoto.
- La licencia MIT de las skills GSAP **no es** la licencia del runtime. GSAP 3.15.0 declara [Standard No Charge](https://gsap.com/community/standard-license/). Esta implementación anima exclusivamente la landing; no integra GSAP en el editor visual ni ofrece un constructor de animaciones. Cualquier futura incorporación al producto requiere una revisión distinta de ese alcance.
- `frontend-design` y `ui-ux-pro-max` se aplicaron desde las skills locales del repositorio. Dos consultas de design system no ofrecieron una combinación verificada que respetara esta dirección; no se persistieron sus paletas o tipografías. Se utilizó el brief y, como fallback, sus reglas generales de contraste, teclado, objetivos táctiles y responsive.

## Dependencias elegidas

React/React DOM 19.3.1, Vite 8.3.5, plugin React 6.1.2 y GSAP 3.15.0, con versiones fijadas y lockfile propio. Se revisaron los manifiestos antes de instalar desde npm. No se instala Motion, Three.js, Lenis ni una segunda biblioteca de animación. `@gsap/react` fue evaluado; se usa el patrón oficial alternativo `gsap.context()` + `revert()` desde un módulo diferido para mantener el motor completo fuera del entry.

Lighthouse 13.6.0 y Prettier 3.9.10 se ejecutaron desde una instalación temporal de auditoría, fuera del paquete. No son dependencias de producción. Las fuentes son self-hosted y sus licencias OFL acompañan los archivos.
