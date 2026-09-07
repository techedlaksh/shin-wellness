"use client";

import Image from "next/image";
import accentArt from "@/public/images/shin-botanical-accents.png";
import heroArt from "@/public/images/shin-hero-diorama.png";

export function HeroVisual() {
  return (
    <div className="hero-visual">
      <div className="hero-visual-stage">
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
        <Image
          className="hero-floating-accent"
          src={accentArt}
          alt=""
          placeholder="blur"
          sizes="(max-width: 600px) 46vw, 270px"
          aria-hidden="true"
        />
      </div>
      <div className="art-note">
        <span className="note-sun">☼</span>
        <span>
          less pressure.
          <br />
          <em>more presence.</em>
        </span>
      </div>
      <span className="art-caption">A SOFTER WAY TO COME BACK TO YOU</span>
    </div>
  );
}
