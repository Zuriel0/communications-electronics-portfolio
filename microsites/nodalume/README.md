# Nodalume Creative Systems

Independent local microsite, NDL-WEB-001. No backend, authentication, product API or ANXZU build integration.

```sh
cd microsites/nodalume
npm ci
npm run dev
```

Local address: http://127.0.0.1:4186/. Stop a running dev server before starting `npm run preview` on the same port.

```sh
npm run lint
npm test
npm run build
npm run preview
```

See [DESIGN.md](DESIGN.md), [PRODUCT.md](PRODUCT.md) and [docs/ndl-web-001-report.md](docs/ndl-web-001-report.md). Package and lockfile are local to this directory; it can be extracted into a separate repository. `private: true`, no deployment scripts, and noindex are intentional review-stage defaults. They are not access controls.

Animations are dynamically imported. The motion button unmounts the animation layer and reverts its GSAP context. A reduced-motion system preference prevents importing that layer. If its chunk fails, the page stays readable and navigable. The React application itself still requires JavaScript.

No real product media is included. The film frame is explicitly conceptual. Public product claims, footage, buyer positioning and deployment require a later review.
