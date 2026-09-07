import Image from "next/image";
import { Arrow, ResourceArt } from "@/components/artwork";
import {
  InterestButton,
  PurchaseButton,
  SignupForm,
} from "@/components/signup";
import { checkoutUrl } from "@/lib/offerings";
import heroImage from "@/public/shin-reset-practice-v3.png";
import journeyImage from "@/public/seven-session-practice-v2.png";

const sessionTopics = [
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

      <header className="site-header">
        <div className="container header-inner">
          <a className="wordmark" href="#" aria-label="Shin Wellness home">
            shin<span aria-hidden="true">*</span>
            <small>WELLNESS</small>
          </a>
          <nav aria-label="Main navigation">
            <a href="#sessions">Sessions</a>
            <a href="#seven-session-reset">Seven-session reset</a>
            <a href="#little-things">Free resources</a>
          </nav>
          <a className="button button-header" href="#sessions">
            Book a session
            <Arrow diagonal />
          </a>
        </div>
      </header>

      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <Image
            className="hero-image"
            src={heroImage}
            alt="A woman practicing a gentle seated neck stretch"
            fill
            priority
            placeholder="blur"
            sizes="100vw"
          />
          <div className="container hero-inner">
            <div className="hero-copy">
              <span className="eyebrow">ONE-TO-ONE WELLNESS SESSIONS</span>
              <h1 id="hero-title">
                Shin
                <br />
                Wellness.
              </h1>
              <p className="hero-service">
                Physical reset.
                <br />
                Burnout prevention.
              </p>
              <p className="hero-summary">
                Start with one session, or choose seven sessions over seven
                days.
              </p>
              <a className="button button-dark" href="#focus">
                Explore sessions
                <Arrow />
              </a>
            </div>
          </div>
        </section>

        <section
          className="focus-section"
          id="focus"
          aria-labelledby="focus-title"
        >
          <div className="container focus-inner">
            <figure className="focus-photo">
              <Image
                src={journeyImage}
                alt="A woman practicing a supported hamstring stretch"
                placeholder="blur"
                sizes="(max-width: 800px) 100vw, 55vw"
              />
            </figure>
            <div className="focus-copy">
              <span className="section-label">One-to-one sessions</span>
              <h2 id="focus-title">
                One-to-one attention. Space for what you need.
              </h2>
              <p className="focus-intro">
                Each session centers on a physical focus or support for rest
                and fatigue.
              </p>
              <div className="focus-areas">
                <article>
                  <h3>Physical reset</h3>
                  <p>
                    Neck and shoulders, chest opening, lower back, hamstrings,
                    and core strength.
                  </p>
                </article>
                <article>
                  <h3>Burnout prevention</h3>
                  <p>Insomnia and rest, fatigue, and time to recenter.</p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section
          className="journey-section"
          id="seven-session-reset"
          aria-labelledby="journey-title"
        >
          <div className="container journey-heading">
            <span className="section-label">
              Seven sessions / seven days / $350 USD
            </span>
            <h2 id="journey-title">Seven sessions. Seven areas of focus.</h2>
            <p>
              Work through every area in sequence, with one personal session
              each day.
            </p>
          </div>
          <div className="container journey-program">
            <ol className="journey-list">
              {sessionTopics.map((topic) => (
                <li key={topic.number}>
                  <span className="journey-number">{topic.number}</span>
                  <h3>{topic.title}</h3>
                  <p>{topic.description}</p>
                </li>
              ))}
            </ol>
            <a className="text-link journey-cta" href="#sessions">
              View session options
              <Arrow diagonal />
            </a>
          </div>
        </section>

        <section
          className="offers-section"
          id="sessions"
          aria-labelledby="sessions-title"
        >
          <div className="container offers-heading">
            <span className="pricing-mark" aria-hidden="true" />
            <h2 id="sessions-title">Choose your sessions.</h2>
            <p>
              Begin with one focused session or book the complete seven-day
              sequence.
            </p>
          </div>

          <div className="offer-comparison">
            <article className="offer-choice offer-single">
              <div className="offer-inner">
                <div className="offer-topline">
                  <span>Focused support</span>
                  <span>01 / 02</span>
                </div>
                <h3>One session</h3>
                <p className="offer-lead">
                  Choose physical reset or burnout prevention.
                </p>
                <div className="offer-price">
                  $60 <span>USD / session</span>
                </div>
                <ul className="benefits">
                  <li>One-to-one attention centered on your focus</li>
                  <li>One dedicated session</li>
                </ul>
                <PurchaseButton
                  url={checkoutUrl(process.env.CHECKOUT_SINGLE_URL)}
                />
              </div>
            </article>

            <article className="offer-choice offer-pack">
              <div className="offer-inner">
                <div className="offer-topline">
                  <span>Complete sequence</span>
                  <span>02 / 02</span>
                </div>
                <h3>Seven-session pack</h3>
                <p className="offer-lead">
                  Seven personal sessions over seven days.
                </p>
                <div className="offer-price">
                  $350 <span>USD / seven sessions</span>
                </div>
                <ul className="benefits">
                  <li>All seven areas of focus</li>
                  <li>One session each day</li>
                </ul>
                <PurchaseButton
                  url={checkoutUrl(process.env.CHECKOUT_PACK_URL)}
                  pack
                />
              </div>
            </article>
          </div>
          <p className="pricing-note">Secure checkout opens in a new tab.</p>
        </section>

        <section
          className="little-section"
          id="little-things"
          aria-labelledby="little-title"
        >
          <div className="container little-heading">
            <h2 id="little-title">Between sessions.</h2>
          </div>
          <div className="container resource-grid">
            <article className="resource-card">
              <ResourceArt type="playlist" />
              <div className="resource-content">
                <span className="resource-kicker">Playlist / free</span>
                <h3>The slow down club playlist.</h3>
                <p>
                  For deep breaths, slow mornings, and finding your own rhythm.
                </p>
                <InterestButton interest="playlist">
                  Tell me when it drops
                </InterestButton>
              </div>
            </article>
            <article className="resource-card">
              <ResourceArt type="wallpapers" />
              <div className="resource-content">
                <span className="resource-kicker">Wallpapers / free</span>
                <h3>Wallpapers for your screen.</h3>
                <p>Visual reminders to pause during the day.</p>
                <InterestButton interest="wallpapers">
                  Save me a little joy
                </InterestButton>
              </div>
            </article>
          </div>
        </section>

      </main>

      <footer className="site-footer" id="stay-in-touch">
        <div className="container closing-main">
          <div className="closing-booking">
            <h2>Choose one session or the full sequence.</h2>
            <p>$60 for one session. $350 for seven.</p>
            <a className="text-link" href="#sessions">
              Choose your sessions
              <Arrow diagonal />
            </a>
          </div>
          <div className="footer-newsletter">
            <div>
              <span className="eyebrow">NOTES FROM SHIN</span>
              <h2>Launch updates and new resources.</h2>
            </div>
            <SignupForm />
          </div>
        </div>
        <div className="container footer-inner">
          <a className="wordmark" href="#" aria-label="Shin Wellness home">
            shin<span aria-hidden="true">*</span>
            <small>WELLNESS</small>
          </a>
          <p>A little more present. A little more you.</p>
          <span>© {new Date().getFullYear()} Shin Wellness</span>
          <a className="back-top" href="#" aria-label="Back to top">
            ↑
          </a>
        </div>
      </footer>
    </>
  );
}
