# ANX-012.3 — Official ANXZU v1.1.0 Release

24 de octubre de 2026. **v1.1.0 — Bilingual Engineering Portfolio**.

Repositorio: [Zuriel0/communications-electronics-portfolio](https://github.com/Zuriel0/communications-electronics-portfolio). El encargo autoriza commits, integración en main, push, tag anotado y Release normal. No autoriza despliegue manual en producción. No se inicia ANX-013.

## Referencias e integración

| Referencia inicial | SHA |
| --- | --- |
| `main` / `origin/main` / `v1.0.0^{commit}` | `5e388c925ec2a705bb1a019711452c72aa51c1ea` |
| `codex/anx-012-professional-i18n` | `d6f51ce28fe2626c142b7e9ad555a6ece32eae51` |
| Rama de integración | `codex/anx-012-release-integration`, creada desde origin/main |

El árbol inicial estaba limpio. Se inspeccionaron remotos, ramas, tags y releases y se ejecutó `git fetch origin --prune --tags`. Main local/remoto continuaban en v1.0.0, sin modificaciones inesperadas. La comparación de historial devolvió **0 commits exclusivos de main / 6 exclusivos de ANX-012** y el merge-base es el propio main. [Preflight de Git](reports/anx-012-3/git-preflight.json).

Se incorpora ANX-012 mediante **fast-forward**, con `--ff-only`, conservando los seis commits originales. No hay conflictos ni resoluciones que puedan reintroducir código antiguo. Dark-theme ya estaba integrado en v1.0.0 y no se vuelve a fusionar. No se utiliza force push, reset destructivo, resolución global de conflictos ni eliminación de ramas.

Commits incluidos:

| Fase | SHA | Contenido |
| --- | --- | --- |
| ANX-012 | `9bf8301ae95a88f0451f7d3ca0cd7fd06ae2a061` | Perfil, capacidades, AWS e internacionalización |
| ANX-012 | `0c28be37844f0e6131ebf688ee7ecd4300697835` | Reporte y evidencias bilingües |
| ANX-012.1 | `c3f17690420886ed6bf3d052e0aa5c9cdf81c6e2` | Catálogos y redacción técnica |
| ANX-012.1 | `68e9d40fafe9aafcc0398fe8515bc59ba93462f5` | QA y comparación Lighthouse |
| ANX-012.2 | `d6653699c5e38a3809dc7372d44b319c2e57c2c4` | Diagramas diferidos y refinamiento editorial |
| ANX-012.2 | `d6f51ce28fe2626c142b7e9ad555a6ece32eae51` | Evidencias y mediciones finales |

El commit de publicación añade el Changelog y este reporte/evidencias. El código, dependencias y arquitectura de carga permanecen idénticos al candidato aprobado. Main recibe ese commit mediante fast-forward después de validar; se conserva la rama de desarrollo original.

## Validación del código integrado

| Comando | Resultado |
| --- | --- |
| `npm ci` | Correcto; [log](reports/anx-012-3/npm-ci.txt) |
| `npm run lint` | Correcto; [log](reports/anx-012-3/lint.txt) |
| `npm run build -- --manifest` | Correcto; [log](reports/anx-012-3/build.txt) |
| `node --test tests/*.test.js` | **39/39**; [log](reports/anx-012-3/tests.txt) |
| `node scripts/check-project-chunks.mjs` | Correcto; [log](reports/anx-012-3/chunks.txt) |
| `node scripts/check-bilingual-evidence.mjs` | Correcto; [log](reports/anx-012-3/browser-assertions.txt), evidencia aprobada compatible con el mismo entry |
| `git diff --check`, comprobación de diff integrado y staged | Correctos |
| `npm audit --json` | **0 vulnerabilidades** de cualquier severidad; [auditoría nueva](reports/anx-012-3/npm-audit.json) |

No se actualizan paquetes ni lockfile. El aviso de política de scripts esbuild/fsevents de npm se conserva; no se amplían permisos y el build funciona. La auditoría es una consulta actual de npm, no una reutilización del resultado de v1.0.0.

El verificador de chunks comprueba que Home y el cierre editorial de ambos proyectos excluyen React Flow/d3/zustand, y que las cuatro/dos entradas dinámicas mantienen sus gráficos. La suite conserva los 46 nodos / 37 conexiones de modelo, los controladores originales, las 18 credenciales con enlaces/fechas y AWS SAA-C03 como preparación separada.

Se repite un smoke test real sobre el build integrado: [seis gráficos](reports/anx-012-3/browser-graphs.json), [Hero, idioma, recarga, CTA y consola](reports/anx-012-3/browser-smoke.json). Cada gráfico se abre mediante hash y recarga profunda; inicia automáticamente, pausa por Enter, permite zoom, retiene pausa/zoom al cambiar EN/ES, ejecuta Fit View y se reanuda. Se serializan las observaciones de estado entre acciones dependientes de teclado. Los 36 paths visuales conservan la referencia opcional no dibujada ya documentada; no se añade ninguna transferencia al modelo de 37 edges.

Hero conserva su pausa al alternar idioma; el CTA lleva a `#projects` con foco; ES persiste al recargar. Se encuentran 18 enlaces individuales de Credly y ninguna sección de capacidades heredadas. No hay errores ni warnings de consola en esa sesión. [Captura integrada](reports/anx-012-3/integrated-home-es.png).

No se vuelve a presentar el QA histórico como una medición nueva: responsive, reduced motion real y estados exhaustivos de ANX-012.2 permanecen documentados en su reporte. Sus datos continúan siendo válidos como referencia del mismo runtime, además del smoke test actual.

## Rendimiento y preservación

Los **14 assets JS/CSS** del build integrado tienen los mismos nombres, tamaños y SHA-256 que ANX-012.2: [comparación exacta](reports/anx-012-3/build-preservation.json). No hay cambios a fuentes, código, modelos, metadatos, assets públicos, dependencias o arquitectura que requieran otra serie Lighthouse.

Referencias **históricas locales de ANX-012.2**, no mediciones de producción ni nuevas de esta fase:

| LCP móvil mediano | Home | Concurrencia | Metodología |
| --- | ---: | ---: | ---: |
| EN | 2027 ms | 2277 ms | 2277 ms |
| ES | 2027 ms | 2277 ms | 2275 ms |

Tres pasadas por ruta/perfil/versión en la comparación EN y tres pasadas móviles candidatas por ruta ES. Lighthouse 13.5.0 / Chrome 155 / Apple M4 Pro; móvil simulado 412×823, DPR 1,75, RTT 150 ms, throughput 1638,4 Kbps, CPU ×4. Performance móvil 99/98/98, Accessibility 100 y CLS 0. Configuraciones, rangos, TBT y limitaciones completas en [ANX-012.2](anx-012-2-report.md), y resumen de versión en [CHANGELOG](../../CHANGELOG.md).

Se conservan Confluence, selector/preferencia EN/ES, seis áreas profesionales, credenciales/fechas/políticas, preparación AWS, casos, rutas/hashes, HTML explicativo, SEO, pausa/zoom/Fit View, visibilidad y reduced motion. El inventario histórico se mantiene únicamente como evidencia interna; su disclosure público sigue ausente.

## Hosting e impacto del push

Se revisaron mediante autenticación administrativa las automatizaciones del repositorio de publicación: **0 webhooks, 0 workflows y ejecuciones Actions, 0 deployments, 0 environments, sin Pages ni rulesets; main no está protegida**. [Resultados de GitHub](reports/anx-012-3/github-preflight.json). No es necesario crear una PR ni se eluden comprobaciones de una rama protegida.

La verificación DNS/HTTP y de configuración identifica la producción en **otro repositorio: `Zuriel0/page`**. Su GitHub Pages legacy sirve `anxzu.com` desde `main:/`, con último build `efed3f2434b2ad184a864bd8b0d5d6ce87d42fdd` del 22 de octubre. Antes de publicar, el sitio devuelve HTTP 200, título `AnxZu` y `/assets/index-B8wHry4b.js`, distinto del entry v1.1.0 `/assets/index-BTWOikn6.js`. [Evidencia de hosting](reports/anx-012-3/hosting-preflight.json).

No se identifica un mecanismo que despliegue este repositorio en producción al hacer push. El push se limita a `communications-electronics-portfolio`; no se modifica `Zuriel0/page`, su configuración, su rama ni sus archivos. No se dispara un despliegue manual. La comprobación posterior del hosting queda en el recibo final. Una integración externa no expuesta no puede excluirse universalmente; no se observa una ruta de despliegue automática entre ambos repositorios.

**No se afirma que anxzu.com ejecute v1.1.0.** GitHub Release y despliegue del sitio son estados distintos, verificados por separado.

## Versión y comprobación remota final

- Versión: **v1.1.0**.
- Nombre: **v1.1.0 — Bilingual Engineering Portfolio**.
- [GitHub Release normal](https://github.com/Zuriel0/communications-electronics-portfolio/releases/tag/v1.1.0), sin prerelease.
- Tag **anotado**: `v1.1.0`; [commit definitivo](https://github.com/Zuriel0/communications-electronics-portfolio/commit/v1.1.0).
- Notas de versión: entrada v1.1.0 del Changelog, con SHA y enlaces de evidencia.
- SHA final literal, SHA del objeto tag, `origin/main`, ID/URL/estado efectivo del Release, commits creados y estado posterior del hosting: **[release-verification.json](https://github.com/Zuriel0/communications-electronics-portfolio/releases/download/v1.1.0/release-verification.json)**, adjunto después de comprobar las referencias remotas.

El recibo forma parte del reporte de cierre. Guarda la verificación posterior sin crear otro commit que desplazaría main más allá del tag: un commit no puede contener su propio hash. La publicación solo se considera finalizada cuando ese adjunto y las referencias comprobadas existen; no se infiere éxito de las URLs preparadas.

Secuencia: commit local validado → fast-forward de main → push sin force → comparación de SHA remoto → tag anotado en ese SHA → push del tag → comprobación de tag/peel → Release normal con notas → consulta remota y recibo. Si una operación falla, se registra como pendiente y no se declara publicación completa.

## Pendientes y límites

No se miden Web Vitals de campo, INP, FPS, energía ni CPU sostenida. Permanecen los límites de Safari/dispositivos físicos, lectores de pantalla nativos, preferencias del sistema en vivo, recuperación real de pestaña oculta y configuración/rendimiento de hosting, ya explicitados en ANX-012.2. La visión general de diagramas densos mantiene zoom para leer etiquetas pequeñas y una explicación HTML independiente.

No se inventan empleos, resultados, certificaciones ni políticas de vigencia. Los 18 registros mantienen la verificación documentada de Credly del 23 de octubre; esta fase no representa una nueva consulta de los emisores. La preparación AWS continúa fuera de los logros obtenidos. No se inicia ANX-013.
