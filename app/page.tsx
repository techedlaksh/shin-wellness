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

const sessionTopics: {
  number: string;
  title: string;
  description: string;
}[] = [
  {
    number: "01",
    title: "Neck & shoulders",
    description:
      "Gently open rounded shoulders and release tension through the neck and upper body.",
  },
  {
    number: "02",
    title: "Chest opening",
    description:
      "Create more space across the chest so breathing can feel easier and deeper.",
  },
  {
    number: "03",
    title: "Lower back (lumbar)",
    description:
      "Create gentle space through the sacrum and lower back to help ease discomfort.",
  },
  {
    number: "04",
    title: "Hamstrings",
    description:
      "Improve flexibility in hamstrings shortened by long periods of sitting.",
  },
  {
    number: "05",
    title: "Core strength",
    description:
      "Build steady core support so you can feel more balanced and energized.",
  },
  {
    number: "06",
    title: "Insomnia & rest",
    description:
      "Settle into a more grounded, relaxed state that can support better sleep.",
  },
  {
    number: "07",
    title: "Fatigue",
    description:
      "Feel a renewed sense of mental clarity when fatigue sets in.",
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
              When life feels a bit too full, you deserve a space that’s just
              yours. Personal support to help you slow down and find your
              footing.
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
                One session. Your space to exhale.
              </p>
              <div className="price">
                $60<span>/ one session</span>
              </div>
              <div className="session-rule" />
              <ul className="benefits">
                <li>1:1 attention, centered around you</li>
                <li>Choose physical reset or burnout prevention</li>
                <li>A little space to pause and reconnect</li>
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
                Make a little room for yourself, every day.
              </p>
              <div className="price">
                $350<span>/ seven-day pack</span>
              </div>
              <div className="session-rule" />
              <ul className="benefits">
                <li>Seven personal sessions over seven days</li>
                <li>A consistent space to slow down and reset</li>
                <li>Support that makes room for your everyday life</li>
              </ul>
              <PurchaseButton
                url={checkoutUrl(process.env.CHECKOUT_PACK_URL)}
                pack
              />
              <p className="card-footnote">One small commitment to yourself.</p>
            </article>
          </div>
          <p className="sessions-note">
            All prices in USD. A softer start is still a start.
          </p>
          <section
            className="session-journey"
            aria-labelledby="session-journey-title"
          >
            <div className="session-journey-intro">
              <div>
                <span className="eyebrow">
                  INSIDE YOUR SEVEN-SESSION RESET
                </span>
                <h3 id="session-journey-title">
                  Seven sessions. Seven ways to feel more at home in your body.
                </h3>
              </div>
              <p>
                Each session brings a different focus, with room to move through
                them in the rhythm that works for you.
              </p>
            </div>
            <ol className="session-journey-grid">
              {sessionTopics.map((topic) => (
                <li className="session-topic" key={topic.number}>
                  <span className="session-topic-number" aria-hidden="true">
                    {topic.number}
                  </span>
                  <h4>{topic.title}</h4>
                  <p>{topic.description}</p>
                </li>
              ))}
            </ol>
          </section>
        </section>

        <section
          className="little-section section"
          id="little-things"
          aria-labelledby="little-title"
        >
          <div className="container">
            <div className="section-heading">
              <div>
                <span className="eyebrow">
                  02 / LITTLE THINGS, LOVINGLY MADE
                </span>
                <h2 id="little-title">
                  Good for your day.
                  <br />
                  <em>Free for you.</em>
                </h2>
              </div>
              <p>
                Sometimes it’s a song. Sometimes it’s a tiny reminder on your
                screen. Small pockets of good, coming your way.
              </p>
            </div>
            <div className="resource-grid">
              <article className="resource-card">
                <ResourceArt type="playlist" />
                <div className="resource-content">
                  <div className="resource-meta">
                    <span>FOR YOUR EARS</span>
                    <span className="coming-pill">COMING SOON · FREE</span>
                  </div>
                  <h3>A soundtrack for slowing down.</h3>
                  <p>
                    A feel-good playlist for deep breaths, slow mornings, and
                    finding your own rhythm.
                  </p>
                  <InterestButton interest="playlist">
                    Tell me when it drops
                  </InterestButton>
                </div>
              </article>
              <article className="resource-card">
                <ResourceArt type="wallpapers" />
                <div className="resource-content">
                  <div className="resource-meta">
                    <span>FOR YOUR EVERYDAY</span>
                    <span className="coming-pill">COMING SOON · FREE</span>
                  </div>
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
              <h2 id="upcoming-title">
                More ways to
                <br />
                <em>come back to you.</em>
              </h2>
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
