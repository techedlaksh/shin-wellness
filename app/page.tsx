import { Arrow, BotanicalArt, ResourceArt, Sprout } from "@/components/artwork";
import Image from "next/image";
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
          <a href="#coming-soon">In the works</a>
        </nav>
        <a className="button button-outline header-cta" href="#sessions">
          Book your reset
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
              <span className="mini-orbit">01</span>
              One-to-one care for physical reset and burnout prevention.
            </div>
          </div>
          <BotanicalArt />
        </section>
        <div className="values-strip">
          <div className="container values-inner">
            <span className="values-kicker">THE SHIN APPROACH</span>
            <span>Private, one-to-one sessions</span>
            <span>Choose your focus</span>
            <span>Begin with a single hour</span>
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
                a focused reset.
              </h2>
            </div>
            <p>
              Choose the support that fits today: one focused hour, or a week
              of daily continuity. Every session is private and shaped around
              what you need.
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
                A focused hour to release tension and find your next step.
              </p>
              <div className="price">
                $60<span>/ one session</span>
              </div>
              <div className="session-rule" />
              <ul className="benefits">
                <li>1:1 attention, centered around you</li>
                <li>Physical reset or burnout prevention</li>
                <li>Leave with one clear, practical next step</li>
              </ul>
              <PurchaseButton
                url={checkoutUrl(process.env.CHECKOUT_SINGLE_URL)}
              />
              <p className="card-footnote">Best for a focused reset.</p>
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
                Daily support for a change that needs steady attention.
              </p>
              <div className="price">
                $350<span>/ seven-day pack</span>
              </div>
              <div className="session-rule" />
              <ul className="benefits">
                <li>Seven personal sessions over seven days</li>
                <li>Build momentum with daily reflection</li>
                <li>Adapt the plan as real life unfolds</li>
              </ul>
              <PurchaseButton
                url={checkoutUrl(process.env.CHECKOUT_PACK_URL)}
                pack
              />
              <p className="card-footnote">Best for building continuity.</p>
            </article>
          </div>
          <p className="sessions-note">
            All prices in USD. Sessions are held online.
          </p>
        </section>

        <section
          className="experience-section"
          aria-labelledby="experience-title"
        >
          <div className="container experience-inner">
            <figure className="experience-image">
              <Image
                src="/session-presence.png"
                alt="A person seated quietly in warm window light"
                width={1023}
                height={1537}
                sizes="(max-width: 800px) calc(100vw - 36px), 48vw"
                loading="eager"
              />
              <figcaption>A private hour, held online.</figcaption>
            </figure>
            <div className="experience-copy">
              <span className="eyebrow">WHAT HAPPENS IN THE HOUR</span>
              <h2 id="experience-title">
                Arrive as you are. Leave with a way forward.
              </h2>
              <p className="experience-lede">
                No performance, no perfect routine. We begin with what feels
                most present and make the hour useful from there.
              </p>
              <ol className="experience-steps">
                <li>
                  <span>01</span>
                  <div>
                    <strong>Settle in</strong>
                    <p>Name what is taking up the most space right now.</p>
                  </div>
                </li>
                <li>
                  <span>02</span>
                  <div>
                    <strong>Choose the focus</strong>
                    <p>Work with the physical tension or burnout pattern at hand.</p>
                  </div>
                </li>
                <li>
                  <span>03</span>
                  <div>
                    <strong>Carry one thing forward</strong>
                    <p>Finish with a practical action that fits your actual week.</p>
                  </div>
                </li>
              </ol>
              <a className="text-link experience-link" href="#sessions">
                Choose your session <span>↑</span>
              </a>
            </div>
          </div>
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
                  Free for you.
                </h2>
              </div>
              <p>
                Two small resets for the spaces between sessions: something to
                listen to and something to keep in view.
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
                    A warm, unhurried mix for the commute home, a quiet morning,
                    or ten minutes with nowhere else to be.
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
                    A set of original phone wallpapers with reminders worth
                    seeing more than once.
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
                A short index of what comes next.
              </h2>
            </div>
            <div>
              <span className="upcoming-aside">NEXT, NOT NOW</span>
              <p>
                A considered preview of what comes after the sessions. Follow
                only the idea you would genuinely use.
              </p>
            </div>
          </div>
          <div className="upcoming-index" aria-label="Upcoming offerings">
            {upcoming.map((item) => (
              <article className="future-row" key={item.interest}>
                <span className="future-number">{item.number}</span>
                <div className="future-title">
                  <span className="eyebrow offering-detail">{item.detail}</span>
                  <h3>{item.title}</h3>
                </div>
                <p className="future-description">{item.description}</p>
                <InterestButton interest={item.interest}>
                  Keep me posted
                </InterestButton>
              </article>
            ))}
            <article className="future-row future-row-secondary">
              <span className="future-number">04</span>
              <div className="future-title">
                <span className="eyebrow offering-detail">
                  CURATED STAYS
                </span>
                <h3>Somewhere to simply be.</h3>
              </div>
              <p className="future-description">
                Restorative stays selected for setting, pace, and care.
              </p>
              <InterestButton interest="retreats">Daydream with us</InterestButton>
            </article>
            <article className="future-row future-row-secondary">
              <span className="future-number">05</span>
              <div className="future-title">
                <span className="eyebrow offering-detail">
                  TESTED &amp; KEPT
                </span>
                <h3>Useful things, passed along.</h3>
              </div>
              <p className="future-description">
                Objects and practices we have tried and kept.
              </p>
              <InterestButton interest="recommendations">
                Send me the edit
              </InterestButton>
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
                New session dates, original resources, and occasional field
                notes. Sent only when there is something worth sharing.
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
        <p>Space to reset, on your own terms.</p>
        <span>© {new Date().getFullYear()} Shin Wellness</span>
        <a className="back-top" href="#" aria-label="Back to top">
          ↑
        </a>
      </footer>
    </>
  );
}
