export function Sprout({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 44"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M20 40c.5-7 .1-13.5-.5-19M19.7 29C9 29.2 4.5 22.5 5 13.2c8.8.1 15.8 5.8 14.7 15.8Zm-.1-7.4C20.2 11 26.7 5.8 35 5.2c1 9.4-4.3 16.1-15.4 16.4Z"
        stroke="currentColor"
        strokeWidth="1.35"
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
        d={diagonal ? "M6.5 17.5 17.7 6.3M8 6.3h9.7V16" : "M4.5 12h14m-5.5-5 5.5 5-5.5 5"}
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BotanicalArt() {
  return (
    <figure className="botanical-art">
      <svg
        className="botanical-canvas"
        viewBox="0 0 660 700"
        role="img"
        aria-labelledby="botanical-title"
      >
        <title id="botanical-title">
          A hand-drawn botanical growing through a sunlit arch and soft hills
        </title>
        <defs>
          <clipPath id="field-window">
            <path d="M143 634 128 251C126 117 222 50 363 55c141 5 232 102 225 236l-17 343Z" />
          </clipPath>
          <filter id="soft-grain" x="-15%" y="-15%" width="130%" height="130%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency=".55"
              numOctaves="4"
              seed="9"
            />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncA type="linear" slope=".08" />
            </feComponentTransfer>
          </filter>
        </defs>

        <path
          d="M161 648 146 266C142 132 232 67 365 70c134 3 217 94 208 228l-21 350Z"
          fill="#ded9ca"
          opacity=".65"
        />
        <g clipPath="url(#field-window)">
          <path fill="#e9e1d2" d="M92 27h535v638H92z" />
          <path
            d="M89 437c87-91 178-117 275-79 101 39 169 14 277-74v389H89Z"
            fill="#aab49d"
          />
          <path
            d="M66 543c96-112 210-121 314-52 99 66 175 55 288-25v230H66Z"
            fill="#718675"
          />
          <path
            d="M303 695c-19-79 28-129 83-172 70-56 47-104 10-137"
            fill="none"
            stroke="#f4ecd9"
            strokeWidth="34"
            strokeLinecap="round"
          />
          <circle cx="461" cy="191" r="71" fill="#e7b294" />
          <path fill="#f7f3ea" opacity=".22" filter="url(#soft-grain)" d="M80 25h560v665H80z" />
        </g>

        <g className="botanical-stem" fill="none" stroke="#34483f">
          <path
            d="M303 665c4-111-21-220-12-325 7-83 45-155 98-223"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path d="M295 495c-48-61-105-81-174-66" strokeWidth="2" />
          <path d="M292 442c52-46 106-58 160-35" strokeWidth="2" />
          <path d="M296 365c-50-53-98-63-151-38" strokeWidth="2" />
          <path d="M310 304c55-31 100-29 139 5" strokeWidth="2" />
          <path d="M332 240c-32-42-58-58-99-62" strokeWidth="2" />
          <path d="M356 178c39-12 67-4 88 18" strokeWidth="2" />
        </g>

        <g className="botanical-leaves" fill="#34483f">
          <path d="M292 502c-71-2-127-27-169-72 76-15 134 8 169 72Z" />
          <path d="M292 447c41-58 93-72 158-40-41 51-92 65-158 40Z" />
          <path d="M297 371c-68 4-119-11-152-44 59-29 111-14 152 44Z" />
          <path d="M310 309c42-39 88-39 139 0-46 35-92 35-139 0Z" />
          <path d="M334 244c-50-5-84-27-101-65 52-8 87 14 101 65Z" />
          <path d="M356 180c29-31 58-26 88 16-35 20-65 15-88-16Z" />
          <path d="M388 119c-12 39-7 76 15 111 26-39 21-78-15-111Z" />
        </g>

        <g fill="none" stroke="#73836f" strokeWidth="1.2" opacity=".72">
          <path d="M129 431c66 8 117 32 162 69M448 409c-66 8-109 21-155 36M149 328c57 6 100 20 147 41M445 309c-60-2-95 0-133 0M235 180c43 14 72 32 99 61M441 195c-31-9-55-14-84-14" />
        </g>

        <path
          className="loose-line"
          d="M86 130c43-18 62-7 70 33M537 502c32 19 47 46 42 81"
          fill="none"
          stroke="#8a947d"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="93" cy="126" r="4" fill="#9f91b2" />
        <circle cx="586" cy="579" r="5" fill="#d59b80" />
      </svg>

      <figcaption className="art-note">
        <span>less pressure.</span>
        <em>more presence.</em>
      </figcaption>
      <span className="art-caption">A softer way to come back to you</span>
    </figure>
  );
}

export function ResourceArt({ type }: { type: "books" | "wallpapers" }) {
  if (type === "books")
    return (
      <div className="resource-art books-art" aria-hidden="true">
        <div className="book-shadow" />
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
        <svg className="art-scribble" viewBox="0 0 120 80">
          <path d="M5 67c29-2 51-18 63-45M57 25c15 3 29-2 41-17M70 47c22 3 36-2 46-15" />
        </svg>
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
          <em>to grow slowly.</em>
        </span>
        <svg className="wallpaper-bloom" viewBox="0 0 80 80">
          <g fill="#6d7c60">
            <ellipse cx="40" cy="18" rx="11" ry="18" />
            <ellipse cx="62" cy="39" rx="18" ry="11" />
            <ellipse cx="40" cy="62" rx="11" ry="18" />
            <ellipse cx="18" cy="39" rx="18" ry="11" />
          </g>
          <circle cx="40" cy="40" r="9" fill="#f1dfc7" />
        </svg>
      </div>
      <svg className="wallpaper-line" viewBox="0 0 90 110">
        <path d="M4 103C21 78 39 53 73 8M36 60C17 57 10 47 8 34M53 39c19 0 28-8 33-21" />
      </svg>
    </div>
  );
}
