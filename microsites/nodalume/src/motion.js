import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function mountMotion(root) {
  const hero = root.querySelector(".hero");
  const pointer = root.querySelector(".composition-pointer");
  const paths = root.querySelector(".connection");
  const signal = root.querySelector(".signal");
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)");
  const disposers = [];
  let visible = false;
  let alive = true;
  let refreshFrame = 0;
  let ambient;
  let intro;
  let bounds;
  let hidden = false;
  let interrupted = [];

  // Scoped context is used instead of a React hook so the entire engine stays lazy-loaded.
  const context = gsap.context(() => {
    intro = gsap
      .timeline({ defaults: { duration: 0.9, ease: "power3.out" } })
      .addLabel("open")
      .from(".hero-line", { y: 22, opacity: 0.78, stagger: 0.12 }, "open")
      .from(
        ".hero-intro, .hero .button",
        { y: 12, opacity: 0.9, stagger: 0.1 },
        "open+=.15",
      )
      .from(
        ".composition-intro",
        { rotation: -6, scale: 0.93, duration: 1.3 },
        "open",
      );

    const length = paths.getTotalLength();
    const position = { progress: 0 };
    ambient = gsap
      .timeline({ repeat: -1, paused: true })
      .to(
        ".planes",
        {
          y: -13,
          rotation: 1.5,
          svgOrigin: "325 325",
          duration: 4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: 1,
        },
        0,
      )
      .to(
        position,
        {
          progress: 1,
          duration: 8,
          ease: "none",
          onUpdate: () => {
            const point = paths.getPointAtLength(position.progress * length);
            signal.setAttribute("cx", point.x);
            signal.setAttribute("cy", point.y);
          },
        },
        0,
      );

    gsap.to(".composition-pointer", {
      /* scroll and pointer never share a target transform */
      opacity: 0.65,
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: 0.6,
      },
    });
    gsap.to(".composition-scroll", {
      yPercent: 16,
      rotation: 10,
      scale: 0.88,
      ease: "none",
      overwrite: false,
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: 0.6,
        onEnter: () => intro.progress(1),
      },
    });
    gsap.from(".story-line", {
      x: 16,
      opacity: 0.72,
      stagger: 0.12,
      ease: "none",
      scrollTrigger: {
        trigger: ".philosophy",
        start: "top 85%",
        end: "top 20%",
        scrub: 0.6,
      },
    });
    gsap.from(".film-fold", {
      y: 24,
      rotation: -3,
      svgOrigin: "600 338",
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".film",
        start: "top 80%",
        toggleActions: "play pause resume pause",
      },
    });

    const x = gsap.quickTo(pointer, "x", { duration: 0.9, ease: "power3.out" });
    const y = gsap.quickTo(pointer, "y", { duration: 0.9, ease: "power3.out" });
    const rotation = gsap.quickTo(pointer, "rotation", {
      duration: 1.1,
      ease: "power3.out",
    });
    const enter = () => {
      bounds = hero.getBoundingClientRect();
    };
    const move = (event) => {
      if (!finePointer.matches || !bounds || document.hidden) return;
      const dx = Math.max(
        -0.5,
        Math.min(0.5, (event.clientX - bounds.left) / bounds.width - 0.5),
      );
      const dy = Math.max(
        -0.5,
        Math.min(0.5, (event.clientY - bounds.top) / bounds.height - 0.5),
      );
      x(dx * 20);
      y(dy * 16);
      rotation(dx * 3);
    };
    const leave = () => {
      x(0);
      y(0);
      rotation(0);
    };
    hero.addEventListener("pointerenter", enter);
    hero.addEventListener("pointermove", move);
    hero.addEventListener("pointerleave", leave);
    disposers.push(() => {
      hero.removeEventListener("pointerenter", enter);
      hero.removeEventListener("pointermove", move);
      hero.removeEventListener("pointerleave", leave);
    });
  }, root);

  const sync = () => {
    if (document.hidden && !hidden) {
      interrupted = context
        .getTweens()
        .filter((tween) => tween.isActive() && !tween.paused());
      interrupted.forEach((tween) => tween.pause());
      context
        .getTweens()
        .forEach((tween) => tween.scrollTrigger?.disable(false, true));
      intro.pause();
    } else if (!document.hidden && hidden) {
      context
        .getTweens()
        .forEach((tween) => tween.scrollTrigger?.enable(false, false));
      interrupted.forEach((tween) => tween.resume());
      interrupted = [];
    }
    hidden = document.hidden;
    const playing = visible && !document.hidden;
    if (playing) ambient.play();
    else ambient.pause();
    root.dataset.ambient = playing ? "playing" : "paused";
    if (!document.hidden && visible && intro.progress() < 1) intro.play();
  };
  const observer = new IntersectionObserver((entries) => {
    visible = entries[0].isIntersecting;
    if (!visible && intro.progress() < 1) intro.progress(1);
    sync();
  });
  observer.observe(hero);
  document.addEventListener("visibilitychange", sync);
  // Text is never split into injected spans. Resize handles locale and details changes.
  const resize = new ResizeObserver(() => {
    cancelAnimationFrame(refreshFrame);
    refreshFrame = requestAnimationFrame(() => {
      if (alive) {
        bounds = hero.getBoundingClientRect();
        ScrollTrigger.refresh();
      }
    });
  });
  resize.observe(root);
  root.dataset.motion = "active";
  root.dataset.triggers = String(ScrollTrigger.getAll().length);
  document.fonts.ready.then(() => {
    if (alive) ScrollTrigger.refresh();
  });

  return () => {
    alive = false;
    cancelAnimationFrame(refreshFrame);
    observer.disconnect();
    resize.disconnect();
    document.removeEventListener("visibilitychange", sync);
    disposers.forEach((dispose) => dispose());
    context.revert();
    signal.setAttribute("cx", "28");
    signal.setAttribute("cy", "438");
    root.dataset.triggers = String(ScrollTrigger.getAll().length);
    root.dataset.ambient = "paused";
  };
}
