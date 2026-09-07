import Image from "next/image";
import { Arrow } from "@/components/artwork";
import {
  InterestButton,
  PurchaseButton,
  SignupForm,
} from "@/components/signup";
import { checkoutUrl } from "@/lib/offerings";

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
            sizes="(max-width: 600px) 100vw, 53vw"
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
              <h2 id="experience-title">What we do with the hour.</h2>
              <p className="experience-lede">
                Tell us what is stuck—physically or mentally. We spend the hour
                getting specific, trying what helps, and deciding what to do next.
              </p>
            </div>
            <ol className="experience-steps">
              <li>
                <span>01</span>
                <div>
                  <strong>Name the friction</strong>
                  <p>What hurts, loops, or keeps getting postponed?</p>
                </div>
              </li>
              <li>
                <span>02</span>
                <div>
                  <strong>Try the shift</strong>
                  <p>Work the tension or burnout pattern in real time.</p>
                </div>
              </li>
              <li>
                <span>03</span>
                <div>
                  <strong>Make it usable</strong>
                  <p>Leave with one action that fits your actual week.</p>
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
              <h2 id="sessions-title">One hour. One issue. A clearer next step.</h2>
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

        <section className="practice-section" aria-labelledby="practice-title">
          <div className="container practice-inner">
            <figure className="practice-portrait">
              <Image
                src="/practitioner-portrait.png"
                alt="A seated wellness practitioner looking attentively toward the camera"
                width={1122}
                height={1402}
                sizes="(max-width: 700px) calc(100vw - 36px), 42vw"
                loading="eager"
              />
            </figure>
            <div className="practice-copy">
              <span className="eyebrow">ONE PRACTITIONER, NOT A PLATFORM</span>
              <h2 id="practice-title">
                You won’t have to start from zero each time.
              </h2>
              <p>
                Shin is intentionally one-to-one. The person listening holds
                the thread, notices what changes, and helps make the next step
                fit the life you are actually living.
              </p>
              <a className="text-link" href="#sessions">
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
                <span className="eyebrow">FREE RESOURCES</span>
                <h2 id="little-title">Free resources for between sessions.</h2>
              </div>
              <p>
                Two free tools, made to be used rather than admired.
              </p>
            </div>
            <figure className="resource-photo">
              <Image
                src="/resource-still-life.png"
                alt="A forest-green record, headphones, and a phone on a sunlit stone table"
                width={1536}
                height={1024}
                sizes="(max-width: 600px) calc(100vw - 36px), calc(100vw - 96px)"
                loading="eager"
              />
              <figcaption>Listen or look—no streak to maintain.</figcaption>
            </figure>
            <div className="resource-grid">
              <article className="resource-card">
                <div className="resource-content">
                  <div className="resource-meta">
                    <span>FOR YOUR EARS</span>
                    <span>FREE · COMING SOON</span>
                  </div>
                  <h3>A 50-minute listening mix.</h3>
                  <p>
                    For the commute home, a quiet morning, or any stretch of
                    time that does not need optimizing.
                  </p>
                  <InterestButton interest="playlist">
                    Tell me when it drops
                  </InterestButton>
                </div>
              </article>
              <article className="resource-card">
                <div className="resource-content">
                  <div className="resource-meta">
                    <span>FOR YOUR SCREEN</span>
                    <span>FREE · COMING SOON</span>
                  </div>
                  <h3>Original phone wallpapers.</h3>
                  <p>
                    Original phone wallpapers without slogans, streaks, or
                    another habit to maintain.
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
          className="newsletter-section"
          id="stay-in-touch"
          aria-labelledby="newsletter-title"
        >
          <div className="container newsletter-inner">
            <div className="newsletter-copy">
              <span className="eyebrow">OCCASIONAL NOTES</span>
              <h2 id="newsletter-title">Occasional notes from Shin.</h2>
              <p>
                New session dates, original resources, and field notes—sent
                only when there is something worth your attention.
              </p>
            </div>
            <div className="newsletter-form-wrap">
              <a className="button button-light final-book" href="#sessions">
                Start with one focused hour
                <Arrow diagonal />
              </a>
              <details className="newsletter-details">
                <summary>Prefer updates? Join the email list</summary>
                <SignupForm />
              </details>
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
