export const copy = {
  es: {
    language: "Idioma",
    menu: "Menú",
    close: "Cerrar menú",
    nav: ["La idea", "El producto", "El horizonte"],
    skip: "Saltar al contenido",
    discover: "Explorar Nodalume",
    see: "Conocer el enfoque",
    headline: ["Tu portal.", "A tu manera."],
    intro:
      "Un espacio para dar forma a portales cautivos con identidad propia. Diseño visual, personalización y experiencias conectadas.",
    concept: "Una composición de posibilidades.",
    conceptNote: "Exploración visual del concepto Creative Systems.",
    pause: "Pausar movimiento",
    resume: "Activar movimiento",
    reduced: "Movimiento reducido",
    scroll: "Sigue la conexión",
    lab: "Producto en desarrollo",
    philosophy: ["La plantilla", "no debería ser", "tu frontera."],
    philosophyIntro: "Una conexión también puede tener identidad.",
    philosophyBody:
      "El acceso a una red suele empezar en una pantalla que todas las marcas comparten. Nodalume explora otra posibilidad: dar espacio a la identidad de cada proyecto y conectar su diseño con una experiencia pensada de principio a fin.",
    principle: "Componer. Conectar. Hacerlo propio.",
    productTitle: "Del lienzo a la experiencia.",
    productBody:
      "El Portal Builder reúne un editor visual, propiedades de elementos, vistas de escritorio y móvil, y un espacio de lógica. Este es el punto de partida que estamos desarrollando.",
    filmTitle: "Aquí comienza el recorrido.",
    filmBody:
      "Un espacio reservado para la demostración real del Portal Builder.",
    filmStatus: "Video pendiente",
    filmCaption:
      "Composición conceptual. No es una captura ni una simulación del producto.",
    scopeCta: "Ver el alcance actual",
    mapTitle: "Un sistema abierto a lo que sigue.",
    mapBody:
      "La visión es amplia. El alcance actual, concreto. Este mapa separa lo que existe de lo que todavía estamos explorando.",
    map: [
      {
        id: "builder",
        title: "Un lienzo propio",
        status: "Implementación actual",
        kind: "current",
        short: "Diseño visual y personalización.",
        detail:
          "El editor permite seleccionar elementos, consultar propiedades y alternar las vistas de escritorio y móvil. La demostración pública todavía está pendiente de preparación.",
      },
      {
        id: "connections",
        title: "Experiencias conectadas",
        status: "Implementación parcial",
        kind: "partial",
        short: "Una lógica que se puede ver.",
        detail:
          "Existe un espacio visual con nodos y conexiones. La interfaz no implica que el motor general de ejecución ni las acciones externas estén finalizados. Su alcance requiere validación adicional.",
      },
      {
        id: "creative-system",
        title: "Creative Systems",
        status: "Concepto",
        kind: "concept",
        short: "Libertad creativa con estructura.",
        detail:
          "Una dirección de producto para relacionar identidad, composición e interacción. Los gráficos de este micrositio expresan esa idea; no documentan una topología ni una capacidad operativa.",
      },
      {
        id: "future",
        title: "Más allá del primer portal",
        status: "Visión futura",
        kind: "future",
        short: "Un horizonte, no una promesa de entrega.",
        detail:
          "Las próximas secciones podrán profundizar en arquitectura, recorridos y despliegue cuando exista evidencia verificable. No se anuncia una oferta comercial ni infraestructura cloud en producción.",
      },
    ],
    footerTitle: "Todo empieza con una conexión.",
    top: "Volver al inicio",
    footerNote: "Creative Systems. Una exploración de producto en desarrollo.",
    meta: "Nodalume Creative Systems. Diseño visual, personalización y experiencias conectadas para portales cautivos.",
  },
  en: {
    language: "Language",
    menu: "Menu",
    close: "Close menu",
    nav: ["The idea", "The product", "The horizon"],
    skip: "Skip to content",
    discover: "Explore Nodalume",
    see: "Discover the approach",
    headline: ["Your portal.", "Your way."],
    intro:
      "A space to shape captive portals with an identity of their own. Visual design, customization and connected experiences.",
    concept: "A composition of possibilities.",
    conceptNote: "A visual exploration of Creative Systems.",
    pause: "Pause motion",
    resume: "Enable motion",
    reduced: "Reduced motion",
    scroll: "Follow the connection",
    lab: "Product in development",
    philosophy: ["A template", "shouldn’t be", "your limit."],
    philosophyIntro: "A connection can have an identity, too.",
    philosophyBody:
      "Access to a network often starts with a screen that every brand shares. Nodalume explores another possibility: making room for each project’s identity and connecting its design with a considered end-to-end experience.",
    principle: "Compose. Connect. Make it yours.",
    productTitle: "From canvas to experience.",
    productBody:
      "The Portal Builder brings together a visual editor, element properties, desktop and mobile views, and a logic workspace. This is the starting point we’re developing.",
    filmTitle: "The walkthrough starts here.",
    filmBody: "A space reserved for the real Portal Builder demonstration.",
    filmStatus: "Video coming later",
    filmCaption:
      "Conceptual composition. Not a product screenshot or simulation.",
    scopeCta: "See the current scope",
    mapTitle: "A system open to what comes next.",
    mapBody:
      "The vision is broad. The current scope is specific. This map separates what exists from what we’re still exploring.",
    map: [
      {
        id: "builder",
        title: "A canvas of your own",
        status: "Current implementation",
        kind: "current",
        short: "Visual design and customization.",
        detail:
          "The editor supports selecting elements, inspecting properties and switching between desktop and mobile views. A public demonstration still needs to be prepared.",
      },
      {
        id: "connections",
        title: "Connected experiences",
        status: "Partial implementation",
        kind: "partial",
        short: "Logic you can see.",
        detail:
          "A visual workspace with nodes and connections exists. Its interface does not mean the general execution engine or external actions are complete. Their scope requires further validation.",
      },
      {
        id: "creative-system",
        title: "Creative Systems",
        status: "Concept",
        kind: "concept",
        short: "Creative freedom with structure.",
        detail:
          "A product direction connecting identity, composition and interaction. This microsite’s graphics express that idea; they do not document a topology or operational capability.",
      },
      {
        id: "future",
        title: "Beyond the first portal",
        status: "Future vision",
        kind: "future",
        short: "A horizon, not a delivery promise.",
        detail:
          "Future sections may explore architecture, journeys and deployment when verifiable evidence is available. No commercial offering or production cloud infrastructure is being announced.",
      },
    ],
    footerTitle: "It all starts with a connection.",
    top: "Back to the beginning",
    footerNote: "Creative Systems. A product exploration in development.",
    meta: "Nodalume Creative Systems. Visual design, customization and connected experiences for captive portals.",
  },
};

export function initialLanguage() {
  try {
    const saved = localStorage.getItem("nodalume-site:lang");
    return saved === "en" || saved === "es" ? saved : "es";
  } catch {
    return "es";
  }
}
