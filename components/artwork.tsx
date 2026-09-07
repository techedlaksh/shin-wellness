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
    </div>
  );
}
