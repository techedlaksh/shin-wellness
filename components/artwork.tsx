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

export function BotanicalArt() {
  return (
    <div className="botanical-art">
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
        </defs>
        <path d="M82 578V260a213 213 0 0 1 426 0v318Z" fill="#ddd8cd" />
        <g clipPath="url(#garden-arch)">
          <path fill="#e7e1d4" d="M0 0h550v600H0z" />
          <circle
            className="garden-sun"
            cx="381"
            cy="183"
            r="64"
            fill="#edb996"
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
            fill="#b9bda9"
          />
          <path
            d="M-20 486c87-103 180-111 288-50 111 62 185 6 307-45v240H-20Z"
            fill="#879584"
          />
          <path
            d="M-22 544c118-91 222-65 315-17 91 47 174-20 286-61v170H-22Z"
            fill="#5f7667"
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
            stroke="#efe3c8"
            strokeWidth="32"
            strokeLinecap="round"
          />
          <g className="garden-leaves">
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
          <path
            d="M0 0h550v600H0z"
            fill="#dfd8c5"
            opacity=".29"
            filter="url(#paper-grain)"
          />
        </g>
        <path d="M62 564V256a213 213 0 0 1 426 0v308" fill="none" stroke="#34483f" strokeWidth="1" opacity=".45" />
      </svg>
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
