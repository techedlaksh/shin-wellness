import Image from "next/image";
import { Arrow, ResourceArt } from "@/components/artwork";
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
}[] = [
  {
    interest: "routine",
    number: "01",
    title: "Build emotional range in seven days.",
    description:
      "A practical PDF routine for noticing emotions without being run by them.",
    detail: "7-DAY PDF ROUTINE · $29",
  },
  {
    interest: "checkins",
    number: "02",
    title: "A weekly point of return.",
    description:
      "Four 30-minute check-ins to reflect, adjust, and decide what comes next.",
    detail: "4-WEEK PROGRAM · $99",
  },
  {
    interest: "coaching",
    number: "03",
    title: "Habits built for real life.",
    description:
      "Personal coaching with CBT-informed tools and a plan that can flex.",
    detail: "HABIT COACHING",
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
          <a href="#experience">How it works</a>
          <a href="#sessions">Sessions</a>
          <a href="#little-things">Resources</a>
        </nav>
        <a className="button button-outline header-cta" href="#sessions">
          Book one session
          <Arrow diagonal />
        </a>
      </header>

      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <Image
            className="hero-photo"
            src="/session-presence.png"
            alt="A person seated in a deep green chair beside a sunlit window"
            fill
            priority
            sizes="100vw"
          />
          <div className="hero-shade" aria-hidden="true" />
          <div className="hero-copy">
            <span className="eyebrow">PRIVATE ONLINE WELLBEING</span>
            <h1 id="hero-title">
              Untangle what’s
              <br />
              <em>weighing on you.</em>
            </h1>
            <p>
              One-to-one sessions for physical reset and burnout prevention.
              Bring what feels heavy; leave with one practical way forward.
            </p>
            <div className="hero-actions">
              <a className="button button-dark" href="#sessions">
                Book a focused hour
                <Arrow />
              </a>
              <a className="text-link" href="#experience">
                See how it works <span>↓</span>
              </a>
            </div>
            <div className="hero-footnote">
              Physical reset&nbsp;&nbsp;·&nbsp;&nbsp; Burnout prevention&nbsp;&nbsp;·&nbsp;&nbsp;
              Practical next steps
            </div>
          </div>
        </section>

        <div className="values-strip">
          <div className="container values-inner">
            <span className="values-kicker">THE SHIN APPROACH</span>
            <span>Private, one-to-one care</span>
            <span>Choose your focus</span>
            <span>Begin with a single hour</span>
          </div>
        </div>

        <section
          className="experience-section"
          id="experience"
          aria-labelledby="experience-title"
        >
          <div className="container experience-inner">
            <div className="experience-copy">
              <span className="eyebrow">WHAT HAPPENS IN THE HOUR</span>
              <h2 id="experience-title">
                Arrive as you are. Leave with a way forward.
              </h2>
              <p className="experience-lede">
                No performance, no perfect routine. We begin with what feels
                most present and make the time useful from there.
              </p>
            </div>
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
                  <p>Work with the tension or burnout pattern at hand.</p>
                </div>
              </li>
              <li>
                <span>03</span>
                <div>
                  <strong>Carry one thing forward</strong>
                  <p>Finish with an action that fits your actual week.</p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        <section
          className="sessions-section container section"
          id="sessions"
          aria-labelledby="sessions-title"
        >
          <div className="section-heading">
            <div>
              <span className="eyebrow">PERSONAL SESSIONS</span>
              <h2 id="sessions-title">Start with the support you need now.</h2>
            </div>
            <p>
              Choose one focused hour or a week of daily continuity. Every
              session is private and shaped around the issue in front of you.
            </p>
          </div>
          <div className="session-grid">
            <article className="session-card single-session">
              <div className="card-topline">
                <span className="pill">ONE FOCUSED HOUR</span>
              </div>
              <h3>The personal reset</h3>
              <p className="session-description">
                Release tension, clear the noise, and choose your next step.
              </p>
              <div className="price">
                $60<span>/ one session</span>
              </div>
              <div className="session-rule" />
              <ul className="benefits">
                <li>1:1 attention, centered around you</li>
                <li>Physical reset or burnout prevention</li>
                <li>One clear action to take with you</li>
              </ul>
              <PurchaseButton
                url={checkoutUrl(process.env.CHECKOUT_SINGLE_URL)}
              />
              <p className="card-footnote">Best for a focused reset.</p>
            </article>
            <article className="session-card pack-session">
              <div className="card-topline">
                <span className="pill">DAILY CONTINUITY</span>
              </div>
              <h3>Seven days of support</h3>
              <p className="session-description">
                Daily attention for a change that needs steady momentum.
              </p>
              <div className="price">
                $350<span>/ seven-day pack</span>
              </div>
              <div className="session-rule" />
              <ul className="benefits">
                <li>Seven personal sessions over seven days</li>
                <li>Daily reflection and course correction</li>
                <li>A plan that adapts as life unfolds</li>
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
          className="little-section section"
          id="little-things"
          aria-labelledby="little-title"
        >
          <div className="container">
            <div className="section-heading">
              <div>
                <span className="eyebrow">FREE RESOURCES</span>
                <h2 id="little-title">Useful in the spaces between.</h2>
              </div>
              <p>
                Original tools for the moments between sessions: one to listen
                to, one to keep in view.
              </p>
            </div>
            <div className="resource-grid">
              <article className="resource-card">
                <ResourceArt type="playlist" />
                <div className="resource-content">
                  <div className="resource-meta">
                    <span>FOR YOUR EARS</span>
                    <span>FREE · COMING SOON</span>
                  </div>
                  <h3>A soundtrack for changing pace.</h3>
                  <p>
                    An unhurried mix for the commute home, a quiet morning, or
                    ten minutes with nowhere else to be.
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
                    <span>FOR YOUR SCREEN</span>
                    <span>FREE · COMING SOON</span>
                  </div>
                  <h3>Reminders worth seeing twice.</h3>
                  <p>
                    A set of original phone wallpapers with words that still
                    mean something after the first glance.
                  </p>
                  <InterestButton interest="wallpapers">
                    Save me a copy
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
              <span className="eyebrow">ON THE HORIZON</span>
              <h2 id="upcoming-title">A short index of what comes next.</h2>
            </div>
            <p>
              Follow only the idea you would genuinely use. We will write when
              it is ready, not while it is merely being planned.
            </p>
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
                <span className="eyebrow offering-detail">CURATED STAYS</span>
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
                <span className="eyebrow offering-detail">TESTED &amp; KEPT</span>
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
              <span className="eyebrow">OCCASIONAL NOTES</span>
              <h2 id="newsletter-title">
                An inbox note
                <br />
                <em>worth opening.</em>
              </h2>
              <p>
                New session dates, original resources, and field notes. Sent
                only when there is something worth sharing.
              </p>
            </div>
            <div className="newsletter-form-wrap">
              <SignupForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer container">
        <a className="wordmark" href="#" aria-label="Shin Wellness home">
          shin<span className="wordmark-dot">✳</span>
          <span className="wordmark-sub">WELLNESS</span>
        </a>
        <p>Private online support, on your own terms.</p>
        <span>© {new Date().getFullYear()} Shin Wellness</span>
        <a className="back-top" href="#" aria-label="Back to top">
          ↑
        </a>
      </footer>
    </>
  );
}
