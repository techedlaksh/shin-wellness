import Image from "next/image";
import { Arrow, ResourceArt } from "@/components/artwork";
import {
  InterestButton,
  PurchaseButton,
  SignupForm,
} from "@/components/signup";
import { checkoutUrl, type Interest } from "@/lib/offerings";
import heroImage from "@/public/shin-reset-hero.png";

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
    title: "Emotional balance",
    description:
      "A gentle, 7-day routine to get to know your emotions and make space for them.",
    detail: "7-DAY PDF ROUTINE / $29",
  },
  {
    interest: "checkins",
    number: "02",
    title: "Weekly check-ins",
    description:
      "Four weekly, 30-minute conversations to reflect, reconnect, and find your next small step.",
    detail: "4-WEEK PROGRAM / $99",
  },
  {
    interest: "coaching",
    number: "03",
    title: "Habit coaching",
    description:
      "Personal coaching with CBT-informed tools to build habits that fit your real life.",
    detail: "PERSONAL COACHING",
  },
];

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
            alt="A woman gently stretching her shoulder in a sunlit room"
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
              <div className="hero-actions">
                <a className="button button-dark" href="#sessions">
                  Find your reset
                  <Arrow />
                </a>
                <a className="text-link" href="#seven-session-reset">
                  Explore seven sessions
                  <Arrow diagonal />
                </a>
              </div>
            </div>
            <p className="hero-note">
              <span>01</span>
              One-to-one care, at your pace.
            </p>
          </div>
        </section>

        <section
          className="offers-section"
          id="sessions"
          aria-labelledby="sessions-title"
        >
          <div className="container offers-heading">
            <span className="eyebrow">START WHERE YOU ARE</span>
            <h2 id="sessions-title">Choose the support that fits today.</h2>
            <p>
              No perfect routine required. Begin with one focused reset or give
              yourself seven days of consistent care.
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
          <div className="container journey-layout">
            <div className="journey-intro">
              <span className="eyebrow">INSIDE THE SEVEN-SESSION RESET</span>
              <h2 id="journey-title">
                Seven places to begin feeling at home in your body.
              </h2>
              <p>
                Each session brings a different focus. Together, they create a
                clear, supportive rhythm for the parts of you that need care.
              </p>
              <a className="text-link" href="#sessions">
                Choose the seven-day pack
                <Arrow diagonal />
              </a>
            </div>
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
        </section>

        <section
          className="little-section"
          id="little-things"
          aria-labelledby="little-title"
        >
          <div className="container little-heading">
            <span className="eyebrow">SMALL THINGS, LOVINGLY MADE</span>
            <h2 id="little-title">A little good for the in-between moments.</h2>
            <p>Free, thoughtful things for slower mornings and softer days.</p>
          </div>
          <div className="container resource-grid">
            <article className="resource-card">
              <ResourceArt type="playlist" />
              <div className="resource-content">
                <span className="resource-kicker">FOR YOUR EARS / FREE</span>
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
                <span className="resource-kicker">
                  FOR YOUR EVERYDAY / FREE
                </span>
                <h3>A little joy for your screen.</h3>
                <p>
                  Wallpapers with gentle reminders, for one small pause in the
                  middle of your day.
                </p>
                <InterestButton interest="wallpapers">
                  Save me a little joy
                </InterestButton>
              </div>
            </article>
          </div>
        </section>

        <section
          className="future-section"
          id="coming-soon"
          aria-labelledby="future-title"
        >
          <div className="container future-heading">
            <span className="eyebrow">WHAT IS GROWING</span>
            <h2 id="future-title">More support, in its own time.</h2>
            <p>
              The sessions are here now. These smaller ideas are being shaped
              with care for what comes next.
            </p>
          </div>
          <div className="container future-list">
            {upcoming.map((item) => (
              <article key={item.interest}>
                <span className="future-number">{item.number}</span>
                <div>
                  <span className="resource-kicker">{item.detail}</span>
                  <h3>{item.title}</h3>
                </div>
                <p>{item.description}</p>
                <InterestButton interest={item.interest}>
                  Keep me posted
                </InterestButton>
              </article>
            ))}
          </div>
          <div className="container future-extras">
            <article>
              <span className="resource-kicker">CURATED WELLNESS STAYS</span>
              <h3>Somewhere to simply be.</h3>
              <p>Wellness stays around the world, curated from Airbnb.</p>
              <InterestButton interest="retreats">
                Daydream with us
              </InterestButton>
            </article>
            <article>
              <span className="resource-kicker">TRIED, LOVED, SHARED</span>
              <h3>Good things, passed along.</h3>
              <p>Thoughtful wellness finds and recommendations.</p>
              <InterestButton interest="recommendations">
                Send me the good stuff
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
            <div>
              <span className="eyebrow">A NOTE FROM SHIN, NOW AND THEN</span>
              <h2 id="newsletter-title">A softer corner of your inbox.</h2>
              <p>
                Fresh offerings, small rituals, and good things in the making.
              </p>
            </div>
            <SignupForm />
          </div>
        </section>
      </main>

      <footer className="site-footer">
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
