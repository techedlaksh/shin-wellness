"use client";

import { useEffect } from "react";

type SceneState = {
  currentX: number;
  currentY: number;
  targetX: number;
  targetY: number;
};

const neutralState = (): SceneState => ({
  currentX: 0.5,
  currentY: 0.5,
  targetX: 0.5,
  targetY: 0.5,
});

function writeNeutralDepth(scene: HTMLElement) {
  scene.dataset.depthActive = "false";
  scene.style.setProperty("--depth-x", "0px");
  scene.style.setProperty("--depth-y", "0px");
  scene.style.setProperty("--depth-opposite-x", "0px");
  scene.style.setProperty("--depth-opposite-y", "0px");
  scene.style.setProperty("--depth-scroll", "0px");
  scene.style.setProperty("--depth-scroll-opposite", "0px");
  scene.style.setProperty("--depth-tilt-x", "0deg");
  scene.style.setProperty("--depth-tilt-y", "0deg");
  scene.style.setProperty("--depth-light-x", "68%");
  scene.style.setProperty("--depth-light-y", "20%");
}

export function PageMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const reveals = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    const scenes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-depth-scene]"),
    );
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    );
    const motionAllowed = !reducedMotion.matches && finePointer.matches;

    if (!motionAllowed) {
      reveals.forEach((item) => item.classList.add("is-visible"));
      scenes.forEach(writeNeutralDepth);
      return;
    }

    root.classList.add("motion-ready");
    const states = new Map<HTMLElement, SceneState>(
      scenes.map((scene) => [scene, neutralState()]),
    );
    const visibleScenes = new Set<HTMLElement>();
    let animationFrame = 0;

    function writeDepth(scene: HTMLElement, state: SceneState) {
      const bounds = scene.getBoundingClientRect();
      const progress = Math.min(
        1,
        Math.max(
          0,
          (window.innerHeight - bounds.top) /
            (window.innerHeight + bounds.height),
        ),
      );
      const x = (state.currentX - 0.5) * 6;
      const y = (state.currentY - 0.5) * 6;
      const scroll = (0.5 - progress) * 8;
      const tiltX = (0.5 - state.currentY) * 1.2;
      const tiltY = (state.currentX - 0.5) * 1.2;

      scene.style.setProperty("--depth-x", `${x.toFixed(2)}px`);
      scene.style.setProperty("--depth-y", `${y.toFixed(2)}px`);
      scene.style.setProperty("--depth-opposite-x", `${(-x).toFixed(2)}px`);
      scene.style.setProperty("--depth-opposite-y", `${(-y).toFixed(2)}px`);
      scene.style.setProperty("--depth-scroll", `${scroll.toFixed(2)}px`);
      scene.style.setProperty(
        "--depth-scroll-opposite",
        `${(-scroll).toFixed(2)}px`,
      );
      scene.style.setProperty("--depth-tilt-x", `${tiltX.toFixed(3)}deg`);
      scene.style.setProperty("--depth-tilt-y", `${tiltY.toFixed(3)}deg`);
      scene.style.setProperty(
        "--depth-light-x",
        `${(state.currentX * 100).toFixed(1)}%`,
      );
      scene.style.setProperty(
        "--depth-light-y",
        `${(state.currentY * 100).toFixed(1)}%`,
      );
    }

    function tick() {
      animationFrame = 0;
      let settling = false;

      visibleScenes.forEach((scene) => {
        const state = states.get(scene);
        if (!state) return;
        state.currentX += (state.targetX - state.currentX) * 0.14;
        state.currentY += (state.targetY - state.currentY) * 0.14;
        if (
          Math.abs(state.targetX - state.currentX) > 0.002 ||
          Math.abs(state.targetY - state.currentY) > 0.002
        )
          settling = true;
        writeDepth(scene, state);
      });

      if (settling) animationFrame = requestAnimationFrame(tick);
    }

    function scheduleDepth() {
      if (!animationFrame) animationFrame = requestAnimationFrame(tick);
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12%", threshold: 0.12 },
    );

    const sceneObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const scene = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            visibleScenes.add(scene);
            scene.dataset.depthActive = "true";
          } else {
            visibleScenes.delete(scene);
            writeNeutralDepth(scene);
            const state = states.get(scene);
            if (state) Object.assign(state, neutralState());
          }
        });
        scheduleDepth();
      },
      { rootMargin: "16% 0px", threshold: 0.01 },
    );

    function handlePointerMove(event: PointerEvent) {
      const target = event.currentTarget as HTMLElement;
      const state = states.get(target);
      if (!state) return;
      const bounds = target.getBoundingClientRect();
      state.targetX = Math.min(
        1,
        Math.max(0, (event.clientX - bounds.left) / bounds.width),
      );
      state.targetY = Math.min(
        1,
        Math.max(0, (event.clientY - bounds.top) / bounds.height),
      );
      scheduleDepth();
    }

    function handlePointerLeave(event: PointerEvent) {
      const state = states.get(event.currentTarget as HTMLElement);
      if (!state) return;
      state.targetX = 0.5;
      state.targetY = 0.5;
      scheduleDepth();
    }

    const handleViewportChange = () => scheduleDepth();

    reveals.forEach((item) => revealObserver.observe(item));
    scenes.forEach((scene) => {
      sceneObserver.observe(scene);
      scene.addEventListener("pointermove", handlePointerMove, {
        passive: true,
      });
      scene.addEventListener("pointerleave", handlePointerLeave);
    });
    window.addEventListener("scroll", handleViewportChange, { passive: true });
    window.addEventListener("resize", handleViewportChange, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrame);
      revealObserver.disconnect();
      sceneObserver.disconnect();
      window.removeEventListener("scroll", handleViewportChange);
      window.removeEventListener("resize", handleViewportChange);
      scenes.forEach((scene) => {
        scene.removeEventListener("pointermove", handlePointerMove);
        scene.removeEventListener("pointerleave", handlePointerLeave);
      });
      root.classList.remove("motion-ready");
    };
  }, []);

  return null;
}
