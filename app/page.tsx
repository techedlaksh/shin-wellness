import { Arrow, BotanicalArt, ResourceArt, Sprout } from "@/components/artwork";
import {
  InterestButton,
  PurchaseButton,
  SignupForm,
} from "@/components/signup";
import { checkoutUrl, type Interest } from "@/lib/offerings";

const upcoming: {
  interest: Interest;
  number: string;
  title: string;
  description: string;
  detail: string;
  icon: string;
}[] = [
  {
    interest: "routine",
    number: "01",
    title: "A little more emotional balance.",
    description:
      "A gentle, 7-day routine to get to know your emotions and make space for them.",
    detail: "7-DAY PDF ROUTINE · $29",
    icon: "☷",
  },
  {
    interest: "checkins",
    number: "02",
    title: "A steady hand, week by week.",
    description:
      "Weekly 30-minute check-ins. A space to reflect, reconnect, and find your next small step.",
    detail: "4-WEEK PROGRAM · $99",
    icon: "◷",
  },
  {
    interest: "coaching",
    number: "03",
    title: "Small habits. Meaningful shifts.",
    description:
      "Personal coaching with CBT-informed tools to build habits that fit your real life.",
    detail: "HABIT COACHING",
    icon: "↗",
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

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header container">
        <a className="wordmark" href="#" aria-label="Shin Wellness home">
          shin<span className="wordmark-dot">✳</span>
          <span className="wordmark-sub">WELLNESS</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#sessions">Sessions</a>
          <a href="#little-things">Free resources</a>
          <a href="#coming-soon">Coming soon</a>
        </nav>
        <a className="button button-outline header-cta" href="#sessions">
          Book a session
          <Arrow diagonal />
        </a>
      </header>
      <main id="main">
        <section className="hero container" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="tiny-flower">✳</span> WELLBEING, AT YOUR OWN PACE
            </div>
            <h1 id="hero-title">
              A little space
              <br />
              to feel like
              <br />
              <em>yourself again.</em>
            </h1>
            <p>
              You don’t have to have it all together.
              <br className="desktop-break" /> Just a little room to pause,
              reset, and come back to you.
            </p>
            <div className="hero-actions">
              <a className="button button-dark" href="#sessions">
                Find your reset
                <Arrow />
              </a>
              <a className="text-link" href="#stay-in-touch">
                Let’s stay in touch<span>↗</span>
              </a>
            </div>
            <div className="hero-footnote">
              <span className="mini-orbit">✧</span> Small steps. Soft landings.
              A little more you.
            </div>
          </div>
          <BotanicalArt />
        </section>
        <div className="values-strip">
          <div className="container values-inner">
            <span>Less doing. More being.</span>
            <span className="strip-star">✳</span>
            <span>Care that meets you where you are.</span>
            <span className="strip-star">✳</span>
            <span>Your pace is a good pace.</span>
          </div>
        </div>

        <section
          className="sessions-section container section"
          id="sessions"
          aria-labelledby="sessions-title"
        >
          <div className="section-heading">
            <div>
              <span className="eyebrow">01 / A SPACE JUST FOR YOU</span>
              <h2 id="sessions-title">
                Let’s start with
                <br />
                <em>a little reset.</em>
              </h2>
            </div>
            <p>
              Choose one focus for a personal reset, or move through all seven
              across a week. Your focus and schedule are confirmed after
              checkout.
            </p>
          </div>
          <div className="session-grid">
            <article className="session-card single-session">
              <div className="card-topline">
                <span className="pill">A MOMENT TO RECENTER</span>
                <Sprout className="session-symbol" />
              </div>
              <h3>The personal reset</h3>
              <p className="session-description">
                One focused session, shaped around what your body needs that
                day.
              </p>
              <div className="price">
                $60<span>/ one session</span>
              </div>
              <div className="session-rule" />
              <ul className="benefits">
                <li>1:1 attention, centered around you</li>
                <li>Choose one focus from the shared menu</li>
                <li>Begin with the support that feels most useful</li>
              </ul>
              <PurchaseButton
                url={checkoutUrl(process.env.CHECKOUT_SINGLE_URL)}
              />
              <p className="card-footnote">A gentle place to begin.</p>
            </article>
            <article className="session-card pack-session">
              <div className="card-topline">
                <span className="pill">A LITTLE MORE CONTINUITY</span>
                <span className="pack-symbol" aria-hidden="true">
                  ✳
                </span>
              </div>
              <h3>Seven days, for you</h3>
              <p className="session-description">
                Seven sessions. Every focus, thoughtfully ordered around you.
              </p>
              <div className="price">
                $350<span>/ seven-day pack</span>
              </div>
              <div className="session-rule" />
              <ul className="benefits">
                <li>All seven focuses, with one explored each day</li>
                <li>A sequence tailored by Shin around what you need</li>
                <li>Daily continuity, without pressure to rush</li>
              </ul>
              <PurchaseButton
                url={checkoutUrl(process.env.CHECKOUT_PACK_URL)}
                pack
              />
              <p className="card-footnote">One small commitment to yourself.</p>
            </article>
          </div>
          <div className="focus-menu">
            <div className="focus-menu-intro">
              <span className="eyebrow">THE SHARED FOCUS MENU</span>
              <h3>
                One menu.
                <br />
                Two ways in.
              </h3>
              <p>
                This is a guide, not a quiz. Choose one focus after booking a
                personal reset, or explore the full sequence over seven days.
              </p>
              <span className="focus-menu-note">
                PERSONAL RESET · CHOOSE ONE AFTER BOOKING
                <br />
                SEVEN DAYS · EXPLORE ALL SEVEN
              </span>
            </div>
            <ol className="session-focus-list" role="list">
              {sessionFocuses.map((focus) => (
                <li key={focus.title}>
                  <div>
                    <strong>{focus.title}</strong>
                    <span>{focus.description}</span>
                  </div>
                </li>
              ))}
            </ol>
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
          <div className="container">
            <div className="section-heading resource-heading">
              <div>
                <span className="eyebrow">
                  02 / FREE RESOURCES · COMING SOON
                </span>
                <h2 id="little-title">Small things for slower days.</h2>
              </div>
              <p>
                A reading list and illustrated phone reminders, both free when
                they launch. Leave your email and we’ll tell you when.
              </p>
            </div>
            <div className="resource-spread">
              <article className="resource-story resource-story-books">
                <ResourceArt type="books" />
                <div className="resource-content">
                  <span className="resource-index">01 / THE SOFT SHELF</span>
                  <span className="resource-availability">
                    READING LIST · FREE AT LAUNCH
                  </span>
                  <h3>A few good pages for slowing down.</h3>
                  <p>
                    Thoughtful book recommendations for gentler habits, steadier
                    days, and coming back to yourself.
                  </p>
                  <InterestButton interest="books">
                    Notify me when it’s ready
                  </InterestButton>
                </div>
              </article>
              <article className="resource-story resource-story-wallpapers">
                <ResourceArt type="wallpapers" />
                <div className="resource-content">
                  <span className="resource-index">02 / SMALL REMINDERS</span>
                  <span className="resource-availability">
                    PHONE WALLPAPERS · FREE AT LAUNCH
                  </span>
                  <h3>A softer note for your screen.</h3>
                  <p>
                    Illustrated reminders for the screen you see every day,
                    made to bring the pace down a notch.
                  </p>
                  <InterestButton interest="wallpapers">
                    Notify me when they’re ready
                  </InterestButton>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section
          className="upcoming-section section container"
          id="coming-soon"
          aria-labelledby="upcoming-title"
        >
          <div className="section-heading">
            <div>
              <span className="eyebrow">
                03 / GOOD THINGS TAKE A LITTLE TIME
              </span>
              <h2 id="upcoming-title">What’s taking shape next.</h2>
            </div>
            <div>
              <span className="coming-pill upcoming-badge">
                <span /> GROWING WITH CARE
              </span>
              <p>
                Thoughtful tools and experiences are taking shape. Join the list
                for whatever speaks to you.
              </p>
            </div>
          </div>
          <div className="upcoming-grid">
            {upcoming.map((item) => (
              <article className="upcoming-card" key={item.interest}>
                <div className="upcoming-card-top">
                  <span className="offering-icon" aria-hidden="true">
                    {item.icon}
                  </span>
                  <span className="upcoming-number">
                    {item.number} / COMING SOON
                  </span>
                </div>
                <span className="eyebrow offering-detail">{item.detail}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <InterestButton interest={item.interest}>
                  Keep me posted
                </InterestButton>
              </article>
            ))}
          </div>
          <div className="explore-grid">
            <article className="explore-card retreat-card">
              <div className="mini-landscape" aria-hidden="true">
                <span className="landscape-sun" />
                <span className="landscape-hill hill-one" />
                <span className="landscape-hill hill-two" />
              </div>
              <div>
                <span className="eyebrow">
                  A CHANGE OF SCENERY · COMING SOON
                </span>
                <h3>Somewhere to simply be.</h3>
                <p>Wellness stays around the world, curated from Airbnb.</p>
                <InterestButton interest="retreats">
                  Daydream with us
                </InterestButton>
              </div>
            </article>
            <article className="explore-card finds-card">
              <div className="finds-illustration" aria-hidden="true">
                <Sprout />
                <span>
                  little
                  <br />
                  <em>good things.</em>
                </span>
              </div>
              <div>
                <span className="eyebrow">
                  TRIED, LOVED, SHARED · COMING SOON
                </span>
                <h3>Good things, passed along.</h3>
                <p>Thoughtful wellness finds and recommendations.</p>
                <InterestButton interest="recommendations">
                  Send me the good stuff
                </InterestButton>
              </div>
            </article>
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
                Make room for a little
                <br />
                <em>more wellbeing.</em>
              </h2>
              <p>
                Fresh offerings, small rituals, and good things in the making.
                <br />A softer corner of your inbox.
              </p>
            </div>
            <div className="newsletter-form-wrap">
              <Sprout className="newsletter-sprout" />
              <SignupForm />
            </div>
          </div>
          <span className="newsletter-decoration" aria-hidden="true">
            ✳
          </span>
        </section>
      </main>
      <footer className="site-footer container">
        <a className="wordmark" href="#" aria-label="Shin Wellness home">
          shin<span className="wordmark-dot">✳</span>
          <span className="wordmark-sub">WELLNESS</span>
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
