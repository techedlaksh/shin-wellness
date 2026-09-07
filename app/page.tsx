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
    description: "Attention to the neck and upper body.",
  },
  {
    number: "02",
    title: "Chest opening",
    description: "Space across the chest.",
  },
  {
    number: "03",
    title: "Lower back",
    description: "Focus on the lumbar area.",
  },
  {
    number: "04",
    title: "Hamstrings",
    description: "Attention to the backs of the legs.",
  },
  {
    number: "05",
    title: "Core strength",
    description: "Focus on core support.",
  },
  {
    number: "06",
    title: "Insomnia & rest",
    description: "Space to settle and rest.",
  },
  {
    number: "07",
    title: "Fatigue",
    description: "Support when energy feels low.",
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
          <div className="hero-media">
            <Image
              className="hero-image"
              src={heroImage}
              alt="A woman practicing a gentle seated neck stretch"
              fill
              priority
              placeholder="blur"
              sizes="100vw"
            />
          </div>
          <div className="container hero-inner">
            <div className="hero-copy">
              <h1 id="hero-title">Shin Wellness.</h1>
              <p className="hero-service">
                Physical reset.
                <br />
                Burnout prevention.
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
              <h2 id="focus-title">One-to-one attention.</h2>
              <p className="focus-intro">
                Each session centers on a physical focus or support for rest
                and fatigue.
              </p>
              <p className="focus-intro">
                Choose a single session, or move through seven areas over
                seven days.
              </p>
            </div>
          </div>
        </section>

        <section
          className="journey-section"
          id="seven-session-reset"
          aria-labelledby="journey-title"
        >
          <div className="container journey-inner">
            <div className="journey-heading">
              <h2 id="journey-title">
                Seven days.
                <br />
                A little more space.
              </h2>
              <p>
                One personal session each day, moving through seven areas of
                focus.
              </p>
            </div>
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
            </div>
          </div>
        </section>

        <section
          className="offers-section"
          id="sessions"
          aria-labelledby="sessions-title"
        >
          <div className="container offers-inner">
            <h2 id="sessions-title">Your sessions.</h2>
            <div className="offer-comparison">
              <article className="offer-choice">
                <h3>One session</h3>
                <div className="offer-price">$60 USD</div>
                <p>One-to-one support for your chosen focus.</p>
                <PurchaseButton
                  url={checkoutUrl(process.env.CHECKOUT_SINGLE_URL)}
                />
              </article>

              <article className="offer-choice">
                <h3>Seven-session pack</h3>
                <div className="offer-price">$350 USD</div>
                <p>Seven personal sessions over seven days.</p>
                <PurchaseButton
                  url={checkoutUrl(process.env.CHECKOUT_PACK_URL)}
                  pack
                />
              </article>
            </div>
            <p className="pricing-note">Secure checkout opens in a new tab.</p>
          </div>
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
          <div className="footer-newsletter">
            <h2>Notes from Shin.</h2>
            <p>Launch updates and new resources.</p>
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
