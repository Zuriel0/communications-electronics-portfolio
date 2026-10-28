# Creative Systems — design foundation

## Direction

A folded canvas becomes a connected composition. The real Nodalume mark contributes a folded, continuous rhythm; the landing expands that rhythm into flat geometric planes and paths. It is a conceptual composition, not a product screenshot or network topology. The first viewport pairs monumental, left-aligned type with an open composition; subsequent scenes alternate reading, contrast and a reserved film frame. No SaaS card grid.

## Tokens

| Role           | Value / rule                                                                                                                                                                        |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Canvas         | #F7F7F4                                                                                                                                                                             |
| Surface        | #FFFFFF                                                                                                                                                                             |
| Ink            | #111111                                                                                                                                                                             |
| Electric       | #5E46FF                                                                                                                                                                             |
| Signal         | #C8FF5E; ink text only, sparse accent                                                                                                                                               |
| Muted          | #555550; body text on light surfaces                                                                                                                                                |
| Line           | #D8D8D0; decorative dividers, never sole interactive boundary                                                                                                                       |
| Display        | Self-hosted Syne variable 700–800; tracking −.04em, line height .97                                                                                                                 |
| Body           | Self-hosted DM Sans variable 400–700; line height 1.55, measure 60ch                                                                                                                |
| Type scale     | Hero desktop clamp(3.65rem, 5vw, 6rem); tablet 8.6vw capped at 5.5rem; mobile clamp(2.3rem, 11vw, 4.5rem); scene titles 2.35–8rem; body 1–1.25rem; small .75–.875rem                |
| Spacing        | .25, .5, .75, 1, 1.5, 2, 3, 4, 6, 8rem; sections clamp(5rem, 9vw, 10rem)                                                                                                            |
| Layout         | Max 1800px; responsive gutters clamp(1.25rem, 4.2vw, 5rem); hero 62/38 open overlap, story 1/2 columns                                                                              |
| Radius         | 0 for editorial regions, 6px for product frame; circles only mark nodes and small controls                                                                                          |
| Elevation      | Header menu only: 0 16px 32px #11111114; no decorative card shadows                                                                                                                 |
| Layers         | Base 0; composition 1; content 2; nav 20; mobile disclosure 30; skip link 50                                                                                                        |
| Duration       | CSS hover/focus 180–240ms; intro .9s; scroll catch-up .6s; ambient 5–8s                                                                                                             |
| Ease           | CSS cubic-bezier(.22,1,.36,1); GSAP power3.out; ambient sine.inOut; path travel none                                                                                                |
| Interaction    | 44px minimum targets, 3px contrasting focus outline with 4px offset, arrow travel 3px; no magnetic cursor                                                                           |
| Motion         | Separate intro / pointer / ambient / scroll layers. Native scroll, no pinning. Only hero ambient loops; suspended offscreen or hidden. Global motion control removes all GSAP work. |
| Reduced motion | Static complete composition, no GSAP import, no smooth scroll or icon displacement; OS change observed live                                                                         |
| Breakpoints    | 600px compact; 900px desktop composition; 1200px large. QA at 320, 375, 768, 1024, 1440, 1920px                                                                                     |

The philosophy scene deliberately exceeds Impeccable's generic 6rem display recommendation; the Hero scale was adjusted against the actual wide Syne lettering. All body copy remains readable; no gradient lettering, decorative eyebrows or invented metrics. Warm canvas and electric accents follow the explicit brief, not library defaults.

## Surface strategy

Mode: Persuade. Visitor path: creative premise → problem and philosophy → explicit reserved product film → current scope and future experience map → return to top. CTA labels describe real in-page navigation; no trial or unavailable signup.

## Identity decisions considered

Folded canvas (chosen) carries the mark and the product's composition mechanism. A node atlas overemphasizes infrastructure. A kinetic type-only poster weakens the connection idea. A fictitious editor is rejected as false evidence. The signature is a single connected plane that changes with scroll; editorial blocks remain calm and selectable.
