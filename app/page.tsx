import { Arrow, BotanicalArt, ResourceArt, Sprout } from "@/components/artwork";
import {
  InterestButton,
  PurchaseButton,
  SignupForm,
} from "@/components/signup";
import { checkoutUrl, type Interest } from "@/lib/offerings";

const upcoming: {
  interest: Interest;
  title: string;
  description: string;
  detail: string;
}[] = [
  {
    interest: "routine",
    title: "A little more emotional balance.",
    description:
      "A gentle, 7-day routine to get to know your emotions and make space for them.",
    detail: "7-DAY PDF ROUTINE · $29",
  },
  {
    interest: "checkins",
    title: "A steady hand, week by week.",
    description:
      "Weekly 30-minute check-ins. A space to reflect, reconnect, and find your next small step.",
    detail: "4-WEEK PROGRAM · $99",
  },
  {
    interest: "coaching",
    title: "Small habits. Meaningful shifts.",
    description:
      "Personal coaching with CBT-informed tools to build habits that fit your real life.",
    detail: "HABIT COACHING",
  },
];

const sessionFocuses = [
  {
    title: "Neck & shoulders",
    description:
      "A gradual opening practice for rounded shoulders and everyday upper-body tension.",
  },
  {
    title: "Chest opening",
    description:
      "Create more room across the chest to support easier, deeper breathing.",
  },
  {
    title: "Lower back (lumbar)",
    description:
      "Gently create space between the sacrum and lower back to support comfort and ease.",
  },
  {
    title: "Hamstrings",
    description:
      "Build flexibility in hamstrings that can tighten during long periods of sitting.",
  },
  {
    title: "Core strength",
    description:
      "Develop steady core support to encourage balance and everyday energy.",
  },
  {
    title: "Insomnia",
    description:
      "A grounding, relaxing practice designed to help the body settle before rest.",
  },
  {
    title: "Fatigue",
    description:
      "A gently energizing practice intended to support focus and mental clarity.",
  },
];

function Wordmark() {
  return (
    <span className="wordmark-lockup">
      <span className="wordmark-name">
        shin<span className="wordmark-mark" aria-hidden="true" />
      </span>
      <span className="wordmark-sub">WELLNESS</span>
    </span>
  );
}

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className="site-header container">
        <a className="wordmark" href="#" aria-label="Shin Wellness home">
          <Wordmark />
        </a>
        <nav aria-label="Main navigation">
          <a href="#sessions">Your reset</a>
          <a href="#little-things">The little things</a>
          <a href="#coming-soon">What’s growing</a>
        </nav>
        <a className="button button-outline header-cta" href="#sessions">
          Book a session
          <Arrow diagonal />
        </a>
      </header>

      <main id="main">
        <section className="hero container" aria-labelledby="hero-title">
          <div className="hero-copy">
            <span className="eyebrow hero-eyebrow">
              <span className="eyebrow-rule" aria-hidden="true" />
              WELLBEING, AT YOUR OWN PACE
            </span>
            <h1 id="hero-title">
              A little space
              <br />
              to feel like
              <br />
              <em>yourself again.</em>
            </h1>
            <p>
              You don’t have to have it all together. Just a little room to
              pause, reset, and come back to you.
            </p>
            <div className="hero-actions">
              <a className="button button-dark" href="#sessions">
                Find your reset
                <Arrow />
              </a>
              <a className="text-link" href="#stay-in-touch">
                Let’s stay in touch
                <Arrow diagonal />
              </a>
            </div>
            <span className="hero-footnote">Small steps. Soft landings.</span>
          </div>
          <BotanicalArt />
        </section>

        <aside className="values-strip" aria-label="Our approach">
          <div className="container values-inner">
            <span>Less doing. More being.</span>
            <i aria-hidden="true" />
            <span>Care that meets you where you are.</span>
            <i aria-hidden="true" />
            <span>Your pace is a good pace.</span>
          </div>
        </aside>

        <section
          className="sessions-section section"
          id="sessions"
          aria-labelledby="sessions-title"
        >
          <div className="container section-intro sessions-intro">
            <div>
              <span className="eyebrow">A SPACE JUST FOR YOU</span>
              <h2 id="sessions-title">
                Let’s start with <em>a little reset.</em>
              </h2>
            </div>
            <p>
              When life feels a bit too full, you deserve a space that’s just
              yours. Personal support to help you slow down and find your
              footing.
            </p>
          </div>

          <div className="container session-suite">
            <div className="session-grid">
              <article className="session-card single-session">
                <div className="card-topline">
                  <span className="offer-kicker">A moment to recenter</span>
                  <Sprout className="session-symbol" />
                </div>
                <div className="offer-copy">
                  <h3>The personal reset</h3>
                  <p className="session-description">
                    One session. Choose the focus your body needs today.
                  </p>
                </div>
                <div className="price">
                  $60<span>/ one session</span>
                </div>
                <ul className="benefits">
                  <li>1:1 attention, centered around you</li>
                  <li>Choose one of seven session focuses</li>
                  <li>A little space to pause and reconnect</li>
                </ul>
                <PurchaseButton
                  url={checkoutUrl(process.env.CHECKOUT_SINGLE_URL)}
                />
                <p className="card-footnote">A gentle place to begin.</p>
              </article>

              <article className="session-card pack-session">
                <div className="card-topline">
                  <span className="offer-kicker">A little more continuity</span>
                  <span className="seven-mark" aria-hidden="true">
                    7
                  </span>
                </div>
                <div className="offer-copy">
                  <h3>Seven days, for you</h3>
                  <p className="session-description">
                    Every focus, thoughtfully ordered around you.
                  </p>
                </div>
                <div className="price">
                  $350<span>/ seven-day pack</span>
                </div>
                <p className="pack-summary">
                  All seven focuses are included. Shin will shape their order
                  around what you need, with one focus explored each day.
                </p>
                <div className="week-sequence">
                  <span>Inside one day</span>
                  <strong>Arrive. Listen. Move. Settle.</strong>
                  <p>One guided focus, shaped around what you need.</p>
                </div>
                <PurchaseButton
                  url={checkoutUrl(process.env.CHECKOUT_PACK_URL)}
                  pack
                />
                <p className="card-footnote">
                  One small commitment to yourself.
                </p>
              </article>
            </div>

            <div className="focus-index">
              <div className="focus-index-intro">
                <span className="eyebrow">SEVEN WAYS TO RESET</span>
                <h3>Meet your body where it is.</h3>
                <p>
                  Choose one focus for a personal reset, or explore all seven
                  across the pack. Open any focus to learn a little more.
                </p>
              </div>
              <ol className="session-focus-list" role="list">
                {sessionFocuses.map((focus, index) => (
                  <li key={focus.title}>
                    <span className="focus-number" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <details>
                      <summary>
                        <strong>{focus.title}</strong>
                      </summary>
                      <p>{focus.description}</p>
                    </details>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <p className="sessions-note">
            All prices in USD. A softer start is still a start.
          </p>
        </section>

        <section
          className="little-section section"
          id="little-things"
          aria-labelledby="little-title"
        >
          <div className="container resource-intro">
            <span className="eyebrow">LITTLE THINGS, LOVINGLY MADE</span>
            <h2 id="little-title">
              Good for your day. <em>Free for you.</em>
            </h2>
            <p>
              Sometimes it’s a book. Sometimes it’s a tiny reminder on your
              screen. Small pockets of good, coming your way.
            </p>
          </div>

          <div className="container resource-stage">
            <article className="resource-card resource-books">
              <ResourceArt type="books" />
              <div className="resource-content">
                <span className="resource-label">For your nightstand</span>
                <span className="resource-status">Coming soon · free</span>
                <h3>A few good pages for slowing down.</h3>
                <p>
                  Thoughtful book recommendations for gentler habits, steadier
                  days, and coming back to yourself.
                </p>
                <InterestButton interest="books">
                  Send me the reading list
                </InterestButton>
              </div>
            </article>

            <article className="resource-card resource-wallpapers">
              <ResourceArt type="wallpapers" />
              <div className="resource-content">
                <span className="resource-label">For your everyday</span>
                <span className="resource-status">Coming soon · free</span>
                <h3>A little joy for your screen.</h3>
                <p>
                  Cute wallpapers with gentle reminders. Because even your
                  phone could use a softer side.
                </p>
                <InterestButton interest="wallpapers">
                  Save me a little joy
                </InterestButton>
              </div>
            </article>
          </div>
        </section>

        <section
          className="upcoming-section section"
          id="coming-soon"
          aria-labelledby="upcoming-title"
        >
          <div className="container making-layout">
            <div className="making-intro">
              <span className="eyebrow">IN THE MAKING</span>
              <h2 id="upcoming-title">
                More ways to <em>come back to you.</em>
              </h2>
              <p>
                Thoughtful tools and experiences are taking shape. Join the
                list for whatever speaks to you.
              </p>
              <span className="growing-note">
                <span aria-hidden="true" /> Growing with care
              </span>
            </div>

            <div className="making-journal">
              <article className="upcoming-card featured-future">
                <div className="upcoming-copy">
                  <span className="offering-detail">{upcoming[0].detail}</span>
                  <h3>{upcoming[0].title}</h3>
                  <p>{upcoming[0].description}</p>
                </div>
                <InterestButton interest={upcoming[0].interest}>
                  Keep me posted
                </InterestButton>
              </article>

              <details className="future-index">
                <summary>
                  <span className="future-index-copy">
                    <small>Also in the making</small>
                    <strong>Four more thoughtful things.</strong>
                  </span>
                  <span className="future-index-action" aria-hidden="true">
                    Open the studio notes <i>+</i>
                  </span>
                </summary>

                <div className="future-list">
                  {upcoming.slice(1).map((item) => (
                    <article
                      className="upcoming-card future-row"
                      key={item.interest}
                    >
                      <div className="upcoming-copy">
                        <span className="offering-detail">{item.detail}</span>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                      </div>
                      <InterestButton interest={item.interest}>
                        Keep me posted
                      </InterestButton>
                    </article>
                  ))}

                  <article className="explore-card retreat-card future-row future-side-note">
                    <div className="mini-landscape" aria-hidden="true">
                      <span className="landscape-sun" />
                      <span className="landscape-hill hill-one" />
                      <span className="landscape-hill hill-two" />
                    </div>
                    <div>
                      <span className="explore-label">
                        A change of scenery · coming soon
                      </span>
                      <h3>Somewhere to simply be.</h3>
                      <p>
                        Wellness stays around the world, curated from Airbnb.
                      </p>
                      <InterestButton interest="retreats">
                        Daydream with us
                      </InterestButton>
                    </div>
                  </article>

                  <article className="explore-card finds-card future-row future-side-note">
                    <div className="finds-illustration" aria-hidden="true">
                      <Sprout />
                      <span>
                        little <em>good things.</em>
                      </span>
                    </div>
                    <div>
                      <span className="explore-label">
                        Tried, loved, shared · coming soon
                      </span>
                      <h3>Good things, passed along.</h3>
                      <p>Thoughtful wellness finds and recommendations.</p>
                      <InterestButton interest="recommendations">
                        Send me the good stuff
                      </InterestButton>
                    </div>
                  </article>
                </div>
              </details>
            </div>
          </div>
        </section>

        <section
          className="newsletter-section"
          id="stay-in-touch"
          aria-labelledby="newsletter-title"
        >
          <div className="container newsletter-inner">
            <div className="newsletter-copy">
              <span className="eyebrow">A NOTE FROM SHIN, NOW AND THEN</span>
              <h2 id="newsletter-title">
                Make room for a little <em>more wellbeing.</em>
              </h2>
              <p>
                Fresh offerings, small rituals, and good things in the making.
                A softer corner of your inbox.
              </p>
            </div>
            <div className="newsletter-form-wrap">
              <Sprout className="newsletter-sprout" />
              <SignupForm />
            </div>
          </div>
          <svg
            className="newsletter-drawing"
            viewBox="0 0 180 180"
            aria-hidden="true"
          >
            <path d="M156 178C143 112 105 65 26 17M119 113c5-26 18-40 39-48M91 82C64 82 47 70 35 48" />
          </svg>
        </section>
      </main>

      <footer className="site-footer container">
        <a className="wordmark" href="#" aria-label="Shin Wellness home">
          <Wordmark />
        </a>
        <p>A little more present. A little more you.</p>
        <span>© {new Date().getFullYear()} Shin Wellness</span>
        <a className="back-top" href="#" aria-label="Back to top">
          ↑
        </a>
      </footer>
    </>
  );
}
