"use client";

import Image from "next/image";
import type { PointerEvent } from "react";
import heroArt from "@/public/images/shin-hero-diorama.png";

export function HeroVisual() {
  function setDepth(event: PointerEvent<HTMLDivElement>) {
    const stage = event.currentTarget;
    const bounds = stage.getBoundingClientRect();
    const x = Math.min(
      1,
      Math.max(0, (event.clientX - bounds.left) / bounds.width),
    );
    const y = Math.min(
      1,
      Math.max(0, (event.clientY - bounds.top) / bounds.height),
    );

    stage.style.setProperty("--tilt-x", `${(0.5 - y) * 6}deg`);
    stage.style.setProperty("--tilt-y", `${(x - 0.5) * 6}deg`);
    stage.style.setProperty("--shift-x", `${(x - 0.5) * 10}px`);
    stage.style.setProperty("--shift-y", `${(y - 0.5) * 10}px`);
    stage.style.setProperty("--light-x", `${x * 100}%`);
    stage.style.setProperty("--light-y", `${y * 100}%`);
  }

  function resetDepth(event: PointerEvent<HTMLDivElement>) {
    const stage = event.currentTarget;

    stage.style.setProperty("--tilt-x", "0deg");
    stage.style.setProperty("--tilt-y", "0deg");
    stage.style.setProperty("--shift-x", "0px");
    stage.style.setProperty("--shift-y", "0px");
    stage.style.setProperty("--light-x", "70%");
    stage.style.setProperty("--light-y", "22%");
  }

  return (
    <div className="hero-visual">
      <div
        className="hero-visual-stage"
        data-testid="hero-depth-stage"
        onPointerMove={setDepth}
        onPointerLeave={resetDepth}
      >
        <div className="hero-image-shell">
          <Image
            className="hero-image"
            src={heroArt}
            alt="A tactile sunlit garden with sculpted leaves, soft hills, and a winding path framed by an arch"
            placeholder="blur"
            preload
            sizes="(max-width: 600px) calc(100vw - 40px), (max-width: 900px) 48vw, 600px"
          />
          <span className="hero-image-light" aria-hidden="true" />
        </div>
      </div>
      <span className="art-caption">A SOFTER WAY TO COME BACK TO YOU</span>
    </div>
  );
}
