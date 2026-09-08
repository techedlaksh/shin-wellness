export function Sprout({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 44"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M20 40V22M20 29C4 30 4 12 4 12s17-1 16 17ZM20 23C19 7 35 5 35 5s4 18-15 18Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg className="arrow" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h15m-6-6 6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ContourBloom({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 320 320"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="contour-bloom-fill" cx="0" cy="0" r="1">
          <stop stopColor="#e9b89f" stopOpacity=".72" />
          <stop offset=".56" stopColor="#ded5eb" stopOpacity=".46" />
          <stop offset="1" stopColor="#ded5eb" stopOpacity="0" />
        </radialGradient>
        <filter id="contour-warp" x="-30%" y="-30%" width="160%" height="160%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency=".012 .021"
            numOctaves="2"
            seed="17"
            result="contour-noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="contour-noise"
            scale="13"
          />
        </filter>
      </defs>
      <circle cx="160" cy="160" r="142" fill="url(#contour-bloom-fill)" />
      <g
        className="contour-bloom-lines"
        stroke="#78866f"
        strokeWidth="1"
        opacity=".44"
        filter="url(#contour-warp)"
      >
        <path d="M160 42c67 0 118 51 118 116 0 67-50 121-118 121S42 225 42 158C42 93 93 42 160 42Z" />
        <path d="M160 64c55 0 96 41 96 94 0 56-40 99-96 99s-96-43-96-99c0-53 41-94 96-94Z" />
        <path d="M160 87c42 0 73 30 73 71 0 43-30 77-73 77s-73-34-73-77c0-41 31-71 73-71Z" />
        <path d="M160 110c29 0 51 20 51 48 0 31-21 55-51 55s-51-24-51-55c0-28 22-48 51-48Z" />
      </g>
      <path
        className="contour-bloom-thread"
        d="M77 257c49-22 30-81 82-99 44-15 55-59 75-96"
        stroke="#f5efe2"
        strokeWidth="14"
        strokeLinecap="round"
        opacity=".72"
      />
    </svg>
  );
}

export function AmbientFlow({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 900 420"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="ambient-flow-line" x1="40" y1="40" x2="830" y2="360">
          <stop stopColor="#e9b89f" stopOpacity=".62" />
          <stop offset=".48" stopColor="#ded5eb" stopOpacity=".5" />
          <stop offset="1" stopColor="#c7d3ae" stopOpacity=".22" />
        </linearGradient>
        <radialGradient id="ambient-flow-orb">
          <stop stopColor="#ded5eb" stopOpacity=".24" />
          <stop offset="1" stopColor="#ded5eb" stopOpacity="0" />
        </radialGradient>
        <filter id="ambient-flow-warp" x="-20%" y="-30%" width="140%" height="160%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency=".006 .018"
            numOctaves="2"
            seed="9"
            result="flow-noise"
          />
          <feDisplacementMap in="SourceGraphic" in2="flow-noise" scale="24" />
        </filter>
      </defs>
      <ellipse cx="714" cy="198" rx="220" ry="202" fill="url(#ambient-flow-orb)" />
      <g
        className="ambient-flow-lines"
        stroke="url(#ambient-flow-line)"
        strokeLinecap="round"
        filter="url(#ambient-flow-warp)"
      >
        <path d="M-31 365C145 104 286 407 467 187 607 17 708 43 950 228" strokeWidth="2.2" />
        <path d="M-58 399C130 142 291 438 486 211 638 35 760 87 966 267" strokeWidth="1.1" opacity=".76" />
        <path d="M-14 319C143 72 272 362 449 153 590-13 701 4 929 185" strokeWidth=".8" opacity=".5" />
      </g>
      <circle className="ambient-flow-star" cx="747" cy="103" r="5" fill="#e9b89f" />
      <circle cx="747" cy="103" r="23" stroke="#ded5eb" strokeOpacity=".38" />
    </svg>
  );
}

export function BotanicalArt() {
  return (
    <div className="botanical-art">
      <div className="botanical-stage">
        <svg
          className="botanical-aura"
          viewBox="0 0 550 600"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="botanical-aura-fill">
              <stop stopColor="#ded5eb" stopOpacity=".86" />
              <stop offset=".48" stopColor="#e9b89f" stopOpacity=".42" />
              <stop offset="1" stopColor="#e9b89f" stopOpacity="0" />
            </radialGradient>
            <filter id="botanical-aura-warp" x="-30%" y="-30%" width="160%" height="160%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency=".009 .016"
                numOctaves="2"
                seed="23"
                result="aura-noise"
              />
              <feDisplacementMap in="SourceGraphic" in2="aura-noise" scale="28" />
            </filter>
          </defs>
          <path
            className="botanical-aura-blob"
            d="M94 388C20 225 123 37 298 33c168-4 275 124 231 279-48 170-174 278-306 233C146 519 123 452 94 388Z"
            fill="url(#botanical-aura-fill)"
            filter="url(#botanical-aura-warp)"
          />
          <ellipse
            className="botanical-aura-ring"
            cx="300"
            cy="292"
            rx="246"
            ry="229"
            stroke="#738066"
            strokeWidth="1"
            strokeDasharray="3 11"
            opacity=".48"
          />
        </svg>
        <span className="botanical-slab" aria-hidden="true" />
        <svg
          className="botanical-canvas"
          viewBox="0 0 550 600"
          role="img"
          aria-labelledby="botanical-title"
        >
        <title id="botanical-title">
          An expressive botanical stem following a sunlit path through soft
          hills
        </title>
        <defs>
          <clipPath id="garden-arch">
            <path d="M62 564V256a213 213 0 0 1 426 0v308Z" />
          </clipPath>
          <filter id="paper-grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency=".7"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncA type="linear" slope=".12" />
            </feComponentTransfer>
            <feBlend in="SourceGraphic" mode="multiply" />
          </filter>
          <filter id="ink-rough" x="-8%" y="-8%" width="116%" height="116%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency=".018 .08"
              numOctaves="2"
              seed="11"
              result="ink-noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="ink-noise"
              scale="3.5"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
          <pattern
            id="print-hatch"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(-7)"
          >
            <path d="M0 10 10 0" stroke="#34483f" strokeWidth=".7" opacity=".22" />
          </pattern>
          <linearGradient id="garden-sky" x1="108" y1="41" x2="442" y2="570">
            <stop stopColor="#f1ebdf" />
            <stop offset=".52" stopColor="#e5dfd1" />
            <stop offset="1" stopColor="#d6d9ca" />
          </linearGradient>
          <radialGradient id="garden-sun-volume" cx=".32" cy=".25" r=".78">
            <stop stopColor="#ffd8bb" />
            <stop offset=".46" stopColor="#efb48f" />
            <stop offset="1" stopColor="#d99778" />
          </radialGradient>
          <linearGradient id="garden-hill-one" x1="86" y1="332" x2="412" y2="568">
            <stop stopColor="#cdd0bf" />
            <stop offset="1" stopColor="#a3ad9d" />
          </linearGradient>
          <linearGradient id="garden-hill-two" x1="48" y1="415" x2="454" y2="597">
            <stop stopColor="#a5b09e" />
            <stop offset="1" stopColor="#718575" />
          </linearGradient>
          <linearGradient id="garden-hill-three" x1="50" y1="490" x2="460" y2="620">
            <stop stopColor="#708877" />
            <stop offset="1" stopColor="#405e50" />
          </linearGradient>
          <linearGradient id="garden-path-light" x1="340" y1="239" x2="277" y2="622">
            <stop stopColor="#fff4d9" />
            <stop offset="1" stopColor="#e6d6b6" />
          </linearGradient>
          <radialGradient id="garden-glow">
            <stop stopColor="#f4d8cc" stopOpacity=".8" />
            <stop offset=".48" stopColor="#ded5eb" stopOpacity=".34" />
            <stop offset="1" stopColor="#ded5eb" stopOpacity="0" />
          </radialGradient>
        </defs>
        <path d="M82 578V260a213 213 0 0 1 426 0v318Z" fill="#ddd8cd" />
        <g clipPath="url(#garden-arch)">
          <path fill="url(#garden-sky)" d="M0 0h550v600H0z" />
          <ellipse
            className="garden-light"
            cx="376"
            cy="212"
            rx="184"
            ry="174"
            fill="url(#garden-glow)"
            opacity=".28"
          />
          <circle
            className="garden-sun"
            cx="381"
            cy="183"
            r="64"
            fill="url(#garden-sun-volume)"
          />
          <ellipse
            cx="381"
            cy="183"
            rx="77"
            ry="73"
            fill="none"
            stroke="#d8a98f"
            strokeWidth="1.4"
            opacity=".65"
          />
          <path
            d="M-12 405C92 326 178 322 270 370c95 49 176-20 295-44v294H-12Z"
            fill="url(#garden-hill-one)"
          />
          <path
            d="M-20 486c87-103 180-111 288-50 111 62 185 6 307-45v240H-20Z"
            fill="url(#garden-hill-two)"
          />
          <path
            d="M-22 544c118-91 222-65 315-17 91 47 174-20 286-61v170H-22Z"
            fill="url(#garden-hill-three)"
          />
          <g fill="none" stroke="#657766" strokeWidth="1" opacity=".5">
            <path d="M-15 430c95-67 186-66 273-18 104 57 180 12 302-40" />
            <path d="M-18 463c91-69 181-73 282-18 103 56 181 7 300-38" />
            <path d="M-18 507c99-62 188-52 278-10 105 49 192 1 306-47" />
          </g>
          <path
            className="garden-path"
            d="M326 625c17-88-105-83-64-151 37-60 128-54 90-117-29-48-83-60-43-112"
            fill="none"
            stroke="url(#garden-path-light)"
            strokeWidth="32"
            strokeLinecap="round"
          />
          <g className="garden-leaves" filter="url(#ink-rough)">
            <path
              className="garden-stem"
              d="M170 580c-4-77 16-139 35-193 20-59 40-91 43-135 4-52 21-95 48-139"
              fill="none"
              stroke="#34483f"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <g fill="none" stroke="#34483f" strokeWidth="5" strokeLinecap="round">
              <path d="m181 486-65-54m91-47-79-57m121-78-78-57m124-78-66 52m19 86 82-32m-124 166 83-42" />
            </g>
            <g>
              <path
                d="M181 489c-55 0-95-28-108-78 56-2 94 23 108 78Z"
                fill="#41594d"
              />
              <path
                d="M205 389c-61 2-103-29-113-84 62 1 101 28 113 84Z"
                fill="#34483f"
              />
              <path
                d="M247 255c-57-2-94-34-101-87 57 4 92 33 101 87Z"
                fill="#506759"
              />
              <path
                d="M287 126c-5-49 19-89 65-110 12 50-12 90-65 110Z"
                fill="#34483f"
              />
              <path
                d="M246 257c10-53 52-83 103-79-8 54-47 84-103 79Z"
                fill="#3e574a"
              />
              <path
                d="M204 391c12-54 57-85 110-75-12 53-53 81-110 75Z"
                fill="#536b5b"
              />
              <path
                d="M294 117c-49 4-85-18-103-61 49-7 86 15 103 61Z"
                fill="#596f60"
              />
            </g>
            <g fill="none" stroke="#b5c0ae" strokeWidth="1.2" opacity=".72">
              <path d="m176 483-86-59m111-40-91-65m132-71-80-67m126-62 49-91m-87 221 82-59m-125 193 91-55m-19-216-78-50" />
            </g>
          </g>
          <path
            d="M449 606c-8-62-4-117 8-165 11-45 28-79 27-122"
            stroke="#d8ddbf"
            strokeWidth="3"
            fill="none"
          />
          <g fill="#d8ddbf">
            <path d="M459 450c-34-15-43-43-33-70 32 13 44 38 33 70Z" />
            <path d="M459 454c8-37 31-54 62-55-5 35-27 55-62 55Z" />
            <path d="M451 531c-36-12-50-38-43-68 35 10 49 34 43 68Z" />
            <path d="M451 532c6-36 29-58 60-60-3 36-24 57-60 60Z" />
          </g>
          <path d="M0 0h550v600H0z" fill="url(#print-hatch)" opacity=".18" />
          <path
            d="M0 0h550v600H0z"
            fill="#dfd8c5"
            opacity=".29"
            filter="url(#paper-grain)"
          />
        </g>
        <path
          d="M62 564V256c0-117 93-213 210-213 121 0 216 93 216 213v308"
          fill="none"
          stroke="#34483f"
          strokeWidth="1.2"
          opacity=".48"
          filter="url(#ink-rough)"
        />
        </svg>
        <span className="botanical-depth-tag" aria-hidden="true">
          breathe · notice · return
        </span>
      </div>
      <div className="art-note">
        <span>
          less pressure.
          <br />
          <em>more presence.</em>
        </span>
      </div>
      <a className="art-caption" href="#sessions">
        FOLLOW THE PATH · EXPLORE YOUR RESET <span>↓</span>
      </a>
    </div>
  );
}

export function ResourceArt({ type }: { type: "books" | "wallpapers" }) {
  if (type === "books")
    return (
      <div className="resource-art books-art" aria-hidden="true">
        <div className="book-stack">
          <div className="book book-back">
            <span>PAUSE · NOTICE · BEGIN AGAIN</span>
          </div>
          <div className="book book-middle">
            <span>WORDS FOR SOFTER DAYS</span>
          </div>
          <div className="book book-front">
            <span className="book-title">
              the soft
              <br />
              <em>shelf.</em>
            </span>
            <span className="book-caption">READ WITH SHIN WELLNESS</span>
            <Sprout className="book-sprout" />
          </div>
        </div>
        <span className="book-star">✦</span>
      </div>
    );
  return (
    <div className="resource-art wallpaper-art" aria-hidden="true">
      <div className="wallpaper-card wallpaper-back">
        <span>
          one little
          <br />
          thing
          <br />
          <em>at a time.</em>
        </span>
        <Sprout />
      </div>
      <div className="wallpaper-card wallpaper-front">
        <span>
          you&apos;re
          <br />
          allowed
          <br />
          <em>
            to grow
            <br />
            slowly.
          </em>
        </span>
        <div className="wallpaper-flower">✿</div>
      </div>
      <span className="wallpaper-star">✧</span>
    </div>
  );
}
