import Image from "next/image";
import { Arrow, ResourceArt } from "@/components/artwork";
import {
  InterestButton,
  PurchaseButton,
  SignupForm,
} from "@/components/signup";
import { checkoutUrl } from "@/lib/offerings";
import heroImage from "@/public/shin-reset-hero-v2.png";
import journeyImage from "@/public/seven-session-reset.png";

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
            alt="A woman resting comfortably beside a sunlit window"
            fill
            priority
            placeholder="blur"
            sizes="100vw"
          />
          <div className="container hero-inner">
            <div className="hero-copy">
              <span className="eyebrow">PERSONAL SUPPORT FOR BODY AND MIND</span>
              <h1 id="hero-title">
                Shin
                <br />
                Wellness.
              </h1>
              <p>
                A little space to pause, reset, and feel more like yourself
                again.
              </p>
              <a className="button button-dark" href="#sessions">
                Choose your session
                <Arrow />
              </a>
            </div>
          </div>
        </section>

        <section
          className="offers-section"
          id="sessions"
          aria-labelledby="sessions-title"
        >
          <div className="container offers-heading">
            <span className="eyebrow">START WHERE YOU ARE</span>
            <h2 id="sessions-title">Choose your reset.</h2>
            <p>
              Begin with one focused session or give yourself seven days of
              consistent care.
            </p>
          </div>

          <div className="offer-comparison">
            <article className="offer-choice offer-single">
              <div className="offer-inner">
                <div className="offer-topline">
                  <span>ONE FOCUSED SESSION</span>
                  <span>01 / 02</span>
                </div>
                <h3>The personal reset</h3>
                <p className="offer-lead">Your space to exhale and recenter.</p>
                <div className="offer-price">
                  $60 <span>/ one session</span>
                </div>
                <ul className="benefits">
                  <li>One-to-one attention, centered around you</li>
                  <li>Choose physical reset or burnout prevention</li>
                  <li>A focused place to pause and reconnect</li>
                </ul>
                <PurchaseButton
                  url={checkoutUrl(process.env.CHECKOUT_SINGLE_URL)}
                />
                <p className="offer-footnote">A gentle place to begin.</p>
              </div>
            </article>

            <article className="offer-choice offer-pack">
              <div className="offer-inner">
                <div className="offer-topline">
                  <span>SEVEN DAYS OF CONTINUITY</span>
                  <span>02 / 02</span>
                </div>
                <h3>Seven days, for you</h3>
                <p className="offer-lead">
                  Make a little room for yourself, every day.
                </p>
                <div className="offer-price">
                  $350 <span>/ seven-session pack</span>
                </div>
                <ul className="benefits">
                  <li>Seven personal sessions over seven days</li>
                  <li>A steady rhythm for slowing down and resetting</li>
                  <li>Support that makes room for everyday life</li>
                </ul>
                <PurchaseButton
                  url={checkoutUrl(process.env.CHECKOUT_PACK_URL)}
                  pack
                />
                <p className="offer-footnote">
                  One small commitment to yourself.
                </p>
              </div>
            </article>
          </div>
          <p className="pricing-note">All prices in USD.</p>
        </section>

        <section
          className="journey-section"
          id="seven-session-reset"
          aria-labelledby="journey-title"
        >
          <div className="container journey-heading">
            <span className="eyebrow">INSIDE THE SEVEN-SESSION RESET</span>
            <h2 id="journey-title">Your seven-session reset.</h2>
            <p>
              Seven focused sessions create a supportive rhythm for the parts
              of you that need care.
            </p>
          </div>

          <div className="container journey-layout">
            <figure className="journey-photo">
              <Image
                src={journeyImage}
                alt="A woman seated comfortably in a calm, sunlit room"
                placeholder="blur"
                sizes="(max-width: 700px) 100vw, 42vw"
              />
              <figcaption>
                <span>SEVEN DAYS</span>
                A little room to return to yourself.
              </figcaption>
            </figure>

            <div className="journey-program">
              <ol className="journey-list">
                {sessionTopics.map((topic) => (
                  <li key={topic.number}>
                    <span className="journey-number">{topic.number}</span>
                    <h3>{topic.title}</h3>
                    <p>{topic.description}</p>
                  </li>
                ))}
              </ol>
              <a className="button button-dark journey-cta" href="#sessions">
                Choose the seven-day pack
                <Arrow diagonal />
              </a>
            </div>
          </div>
        </section>

        <section
          className="little-section"
          id="little-things"
          aria-labelledby="little-title"
        >
          <div className="container little-heading">
            <span className="eyebrow">FOR THE IN-BETWEEN</span>
            <h2 id="little-title">Small things for softer days.</h2>
          </div>
          <div className="container resource-grid">
            <article className="resource-card">
              <ResourceArt type="playlist" />
              <div className="resource-content">
                <span className="resource-kicker">PLAYLIST / FREE</span>
                <h3>A soundtrack for slowing down.</h3>
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
                <span className="resource-kicker">WALLPAPERS / FREE</span>
                <h3>A little joy for your screen.</h3>
                <p>Gentle reminders for one small pause in your day.</p>
                <InterestButton interest="wallpapers">
                  Save me a little joy
                </InterestButton>
              </div>
            </article>
          </div>
        </section>

        <section className="closing-section" aria-labelledby="closing-title">
          <div className="container closing-inner">
            <span>READY WHEN YOU ARE</span>
            <h2 id="closing-title">Make time for your reset.</h2>
            <a className="button button-light" href="#sessions">
              Choose your session
              <Arrow />
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer" id="stay-in-touch">
        <div className="container footer-newsletter">
          <div>
            <span className="eyebrow">A NOTE FROM SHIN, NOW AND THEN</span>
            <h2>A softer corner of your inbox.</h2>
          </div>
          <SignupForm />
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
