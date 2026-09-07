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
              scale="3.5"
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
          d="M134 630c2-178-9-337 57-441C243 106 334 61 446 78c103 16 157 94 155 203"
          fill="none"
          stroke="#b7c0ae"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="2 8"
        />
        <path
          d="M180 591C258 491 370 463 489 511c49 20 86 11 122-17"
          fill="none"
          stroke="#dfaa8d"
          strokeWidth="10"
          strokeLinecap="round"
          opacity=".48"
        />
        <path
          d="M249 115c71-59 203-71 291-6 83 61 74 168 4 223-65 51-172 68-260 31-104-43-116-181-35-248Z"
          fill="#e2e6d9"
          opacity=".86"
        />
        <path
          d="M401 56c27-20 69-11 87 15 17 24 10 59-14 76-27 19-65 8-81-19-14-24-10-54 8-72Z"
          fill="#e7b194"
        />
        <path
          d="M211 86h404v520H211Z"
          fill="#f7f3ea"
          opacity=".16"
          filter="url(#specimen-grain)"
        />

        <g filter="url(#specimen-line)" stroke="#34483f" strokeLinecap="round" strokeLinejoin="round">
          <path
            d="M477 661c-10-91-4-183-29-267-23-79-59-137-102-197"
            fill="none"
            strokeWidth="4.5"
          />
          <path d="M450 492c-49-34-100-46-156-35" fill="none" strokeWidth="2" />
          <path d="M443 401c41-49 88-73 143-71" fill="none" strokeWidth="2" />
          <path d="M411 324c-53-26-103-28-151-6" fill="none" strokeWidth="2" />
          <path d="M370 239c34-44 71-66 111-67" fill="none" strokeWidth="2" />

          <path
            d="M451 495c-60 19-127 8-170-40 40-48 117-55 170 40Z"
            fill="#a9b7a3"
            strokeWidth="2.2"
          />
          <path d="M447 492c-54-19-108-30-160-36M420 482c-18-18-38-29-60-36M388 474c-19-13-38-20-58-22" fill="none" strokeWidth="1" />

          <path
            d="M442 405c26-61 91-97 154-74 8 64-65 113-154 74Z"
            fill="#bcc6b2"
            strokeWidth="2.2"
          />
          <path d="M445 401c49-27 96-49 145-66M477 384c15-19 34-34 57-45M513 366c13-14 29-24 47-31" fill="none" strokeWidth="1" />

          <path
            d="M413 327c-83 17-158-8-208-72 62-45 154-17 208 72Z"
            fill="#8fa28f"
            strokeWidth="2.2"
          />
          <path d="M409 324c-66-24-131-46-196-65M373 312c-26-18-54-32-84-41M328 295c-25-14-51-24-78-29" fill="none" strokeWidth="1" />

          <path
            d="M372 243c14-53 61-89 116-73 12 54-39 101-116 73Z"
            fill="#c6cdbd"
            strokeWidth="2.2"
          />
          <path d="M375 239c36-25 70-46 106-65M398 226c12-15 28-28 45-38" fill="none" strokeWidth="1" />

          <path d="M347 200c-8-38-5-69 9-95" fill="none" strokeWidth="2" />
          <g fill="#e7b194" strokeWidth="1.8">
            <path d="M356 107c-30-7-44-26-35-47 23-9 43 8 35 47Z" />
            <path d="M357 106c-4-32 9-52 34-53 18 18 7 45-34 53Z" />
            <path d="M355 108c29-15 54-8 61 15-12 24-40 19-61-15Z" />
            <path d="M353 109c22 22 21 47 0 60-26-6-28-35 0-60Z" />
            <path d="M352 107c-24 20-49 18-59-5 9-24 38-23 59 5Z" />
          </g>
          <circle cx="354" cy="108" r="10" fill="#7b8e76" strokeWidth="1.5" />
          <path d="M351 105c-13-11-25-18-38-23M357 103c7-14 16-25 28-33M360 111c15 2 27 7 37 15M352 115c-5 13-6 25-3 36" fill="none" strokeWidth="1" />

          <path d="M480 571c36-25 70-30 102-16" fill="none" strokeWidth="1.6" />
          <path d="M579 555c-21-13-38-10-51 9 20 12 37 8 51-9Z" fill="#d6dccf" strokeWidth="1.4" />
        </g>

        <path
          d="M97 166c31-29 66-32 104-10M114 143c-8 28-3 50 16 65M557 424c28-26 56-28 84-6"
          fill="none"
          stroke="#7f8f7a"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <circle cx="96" cy="166" r="4" fill="#9b88ad" />
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
