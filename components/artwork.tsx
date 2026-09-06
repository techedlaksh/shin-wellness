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
          A sunlit garden of flowing leaves and soft hills, framed by an arch
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
        <path d="M79 578V260a213 213 0 0 1 426 0v318Z" fill="#e5dfd3" />
        <g clipPath="url(#garden-arch)">
          <path fill="#ddd9c7" d="M0 0h550v600H0z" />
          <circle cx="352" cy="190" r="72" fill="#edb996" />
          <path
            d="M0 378c156-163 239-122 328-28S504 300 560 325v290H0Z"
            fill="#aeb4a0"
          />
          <path
            d="M-10 463c79-152 191-161 329-81s179 24 247-10v256H-10Z"
            fill="#829381"
          />
          <path
            d="M-17 510c141-164 273-48 372-70s136-52 207-5v190H-17Z"
            fill="#5b7363"
          />
          <path
            d="M218 620c64-95 175-102 133-152s-108-76-83-114"
            fill="none"
            stroke="#e8d9b9"
            strokeWidth="39"
          />
          <path
            d="M302 603C217 477 207 345 183 216"
            fill="none"
            stroke="#34483f"
            strokeWidth="7"
          />
          <g fill="#34483f">
            <path d="M189 257c-76-1-106-76-91-114 58 9 91 47 91 114Z" />
            <path d="M190 268c-17-69 17-106 63-133 20 61 0 117-63 133Z" />
            <path d="M213 348c-75-7-133-53-135-99 75-6 121 37 135 99Z" />
            <path d="M211 348c-2-76 48-120 91-124 6 70-26 107-91 124Z" />
            <path d="M242 444c-99-2-134-54-145-109 83 4 123 53 145 109Z" />
            <path d="M237 432c-5-83 39-131 90-150 26 70-29 132-90 150Z" />
            <path d="M280 533c-97 9-161-40-177-96 85-11 144 31 177 96Z" />
            <path d="M267 505c-9-75 36-134 89-150 13 84-29 122-89 150Z" />
          </g>
          <g stroke="#86947e" strokeWidth="1" fill="none" opacity=".65">
            <path d="m110 165 78 88m49-94-44 99M96 268l111 73m75-97-66 95m-99 18 116 79m74-129-66 116M124 454l143 71m73-145-68 118" />
          </g>
          <path
            d="M425 600c17-91-6-144 4-212s31-87 28-139"
            stroke="#d9dbb7"
            strokeWidth="4"
            fill="none"
          />
          <g fill="#d9dbb7">
            <ellipse
              cx="436"
              cy="291"
              rx="12"
              ry="31"
              transform="rotate(-33 436 291)"
            />
            <ellipse
              cx="468"
              cy="322"
              rx="13"
              ry="31"
              transform="rotate(31 468 322)"
            />
            <ellipse
              cx="419"
              cy="358"
              rx="12"
              ry="33"
              transform="rotate(-34 419 358)"
            />
            <ellipse
              cx="449"
              cy="394"
              rx="12"
              ry="34"
              transform="rotate(31 449 394)"
            />
            <ellipse
              cx="413"
              cy="438"
              rx="13"
              ry="35"
              transform="rotate(-30 413 438)"
            />
            <ellipse
              cx="449"
              cy="475"
              rx="13"
              ry="35"
              transform="rotate(31 449 475)"
            />
          </g>
          <path
            d="M0 0h550v600H0z"
            fill="#dfd8c5"
            opacity=".22"
            filter="url(#paper-grain)"
          />
        </g>
        <path
          d="M36 102h28m-14-14v28m441 298h30m-15-15v30"
          stroke="#62725b"
          strokeWidth="1.3"
        />
        <circle cx="25" cy="339" r="4" fill="#b5abcb" />
        <circle cx="507" cy="108" r="5" fill="#d9a589" />
      </svg>
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

export function ResourceArt({ type }: { type: "playlist" | "wallpapers" }) {
  if (type === "playlist")
    return (
      <div className="resource-art playlist-art" aria-hidden="true">
        <div className="record-sleeve">
          <span>
            the slow
            <br />
            <em>down club.</em>
          </span>
          <span className="sleeve-caption">A SHIN WELLNESS PLAYLIST</span>
          <div className="sleeve-flower">✳</div>
        </div>
        <div className="vinyl">
          <div className="vinyl-label">
            <Sprout />
          </div>
        </div>
        <span className="music-note">♪</span>
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
