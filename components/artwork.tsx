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
        d={
          diagonal
            ? "M6.5 17.5 17.7 6.3M8 6.3h9.7V16"
            : "M4.5 12h14m-5.5-5 5.5 5-5.5 5"
        }
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
    <figure className="botanical-art botanical-specimen">
      <svg
        className="botanical-canvas"
        viewBox="0 0 660 700"
        role="img"
        aria-labelledby="botanical-title"
      >
        <title id="botanical-title">
          A hand-drawn flowering vine with softly veined leaves
        </title>
        <defs>
          <filter id="specimen-line" x="-12%" y="-12%" width="124%" height="124%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency=".014"
              numOctaves="2"
              seed="17"
              result="line-noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="line-noise"
              scale="2.4"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
          <filter id="specimen-grain" x="-15%" y="-15%" width="130%" height="130%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency=".6"
              numOctaves="3"
              seed="8"
            />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncA type="linear" slope=".07" />
            </feComponentTransfer>
          </filter>
        </defs>

        <path
          d="M176 604C153 440 169 258 277 139c80-87 196-113 294-58 74 41 95 121 75 194"
          fill="none"
          stroke="#b7c0ae"
          strokeWidth="1.8"
          strokeLinecap="round"
          opacity=".52"
        />
        <path
          d="M164 606c83-65 176-73 242-22 31 24 50 53 68 88"
          fill="none"
          stroke="#dfaa8d"
          strokeWidth="2.4"
          strokeLinecap="round"
          opacity=".62"
        />
        <path
          d="M252 510c29-18 70-8 88 22 18 31 7 70-24 88-32 18-72 5-88-27-15-30-4-64 24-83Z"
          fill="#e7b194"
          opacity=".88"
        />
        <path
          d="M211 86h404v520H211Z"
          fill="#f7f3ea"
          opacity=".16"
          filter="url(#specimen-grain)"
        />

        <g
          filter="url(#specimen-line)"
          stroke="#34483f"
          strokeLinecap="round"
          strokeLinejoin="round"
          transform="rotate(-5 430 370)"
        >
          <path
            d="M481 674c-15-91-13-169-43-249-22-58-53-106-77-160-21-47-25-88-8-131"
            fill="none"
            stroke="#8b9c88"
            strokeWidth="1.2"
            opacity=".7"
          />
          <path
            d="M474 672c-9-73-8-163-40-246"
            fill="none"
            strokeWidth="5.4"
          />
          <path
            d="M434 426c-23-56-55-104-79-159"
            fill="none"
            strokeWidth="4"
          />
          <path
            d="M355 267c-20-47-22-91-4-133"
            fill="none"
            strokeWidth="2.8"
          />
          <path d="M434 426c47-54 99-77 158-68" fill="none" strokeWidth="2" />
          <path d="M406 356c-42-25-82-29-120-12" fill="none" strokeWidth="2" />
          <path d="M373 298c35-50 75-76 121-76" fill="none" strokeWidth="2" />
          <path d="M456 526c-34-17-61-40-80-70" fill="none" strokeWidth="1.8" />

          <path
            d="M378 458c-29 7-54-3-69-29 26-18 57-6 69 29Z"
            fill="#d6dccf"
            fillOpacity=".68"
            strokeWidth="1.8"
          />
          <path d="M374 455c-20-9-40-17-60-23M352 447c-10-7-21-12-33-15" fill="none" strokeWidth=".9" />

          <path
            d="M434 430c28-70 100-104 167-70 1 71-79 117-167 70Z"
            fill="#bcc6b2"
            fillOpacity=".76"
            strokeWidth="2.8"
          />
          <path d="M438 425c51-31 102-52 156-63M477 406c17-18 38-31 62-39M516 387c16-12 34-20 54-24" fill="none" strokeWidth="1" />

          <path
            d="M407 359c-56 8-105-8-142-49 43-35 107-14 142 49Z"
            fill="#8fa28f"
            fillOpacity=".48"
            strokeWidth="2.2"
          />
          <path d="M404 356c-45-18-89-32-133-43M376 347c-20-12-41-20-64-26M343 334c-18-8-37-14-57-17" fill="none" strokeWidth="1" />

          <path
            d="M374 300c14-58 66-95 124-76 8 60-48 107-124 76Z"
            fill="#c6cdbd"
            fillOpacity=".52"
            strokeWidth="2.2"
          />
          <path d="M378 296c39-29 77-52 115-69M402 281c14-17 31-30 50-40" fill="none" strokeWidth="1" />

          <path d="M352 143c-2-21 3-41 13-59" fill="none" strokeWidth="2" />
          <g strokeWidth="1.8">
            <path d="M361 87c-34 7-60-8-62-33 16-22 48-11 62 33Z" fill="#e7b194" fillOpacity=".66" />
            <path d="M365 84c-10-38 2-67 29-75 25 16 18 52-29 75Z" fill="#e7b194" fillOpacity=".84" />
            <path d="M368 88c34-25 69-19 81 8-10 31-48 33-81-8Z" fill="#d8cce3" fillOpacity=".76" />
            <path d="M365 92c18 22 18 45 0 59-22-8-23-35 0-59Z" fill="#c2ceb9" fillOpacity=".58" />
          </g>
          <circle cx="363" cy="87" r="9" fill="#7b8e76" strokeWidth="1.5" />
          <path d="M359 84c-13-8-25-13-37-15M367 81c5-14 13-26 24-36M371 89c15 0 29 4 41 11M360 95c-6 13-8 26-7 39" fill="none" strokeWidth="1" />
          <path d="M317 51c17 3 31 13 44 34M395 26c-8 19-18 38-29 57M434 96c-24-3-45-6-66-8M352 151c2-20 5-40 10-59" fill="none" strokeWidth=".75" opacity=".55" />
        </g>

        <g
          fill="none"
          stroke="#34483f"
          strokeWidth=".85"
          strokeLinecap="round"
          opacity=".5"
          transform="rotate(-5 430 370)"
        >
          <path d="M387 279c15-14 31-26 48-36M402 291c17-14 34-25 52-34M422 297c15-11 32-19 49-26" />
          <path d="M342 66c6 7 12 14 19 22M391 53c-9 11-17 22-25 33M402 103c-13-5-25-10-37-16M361 121c1-12 1-23 3-34" />
        </g>

      </svg>

      <figcaption className="art-note">
        <span>A softer way to come back to you.</span>
        <em>Less pressure. More presence.</em>
      </figcaption>
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
