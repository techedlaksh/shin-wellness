import Image from "next/image";
import { Arrow } from "@/components/artwork";
import {
  PurchaseButton,
  SignupForm,
} from "@/components/signup";
import { checkoutUrl } from "@/lib/offerings";

const sessionThemes = [
  {
    title: "Neck & shoulders",
    description:
      "Gentle movement for neck and shoulder tension, with space to explore a more open posture.",
  },
  {
    title: "Chest opening",
    description:
      "Explore chest-opening movement and make time for comfortable, unhurried breathing.",
  },
  {
    title: "Lower back",
    description:
      "Gentle movement focused on ease and mobility around the lower back.",
  },
  {
    title: "Hamstring flexibility",
    description:
      "Explore hamstring flexibility, especially if you spend much of the day sitting.",
  },
  {
    title: "Core strength",
    description:
      "A focused practice for core strength, balance, and a steadier sense of support.",
  },
  {
    title: "Rest & relaxation",
    description:
      "A slower session to help you settle, unwind, and feel more grounded.",
  },
  {
    title: "Energy & clarity",
    description:
      "A gentle reset for days when you feel tired or mentally foggy.",
  },
] as const;

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
          <a href="#practice">Meet Shin</a>
        </nav>
        <a className="button button-outline header-cta" href="#book">
          Book one session
          <Arrow diagonal />
        </a>
      </header>

      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <Image
            className="hero-photo"
            src="/session-active.png"
            alt="A person working through shoulder tension beside a laptop during an online session"
            fill
            priority
            sizes="(max-width: 600px) 100vw, 53vw"
          />
          <div className="hero-shade" aria-hidden="true" />
          <div className="hero-copy">
            <span className="eyebrow">PRIVATE GUIDED MOVEMENT</span>
            <h1 id="hero-title">
              Choose what your
              <br />
              <em>body needs today.</em>
            </h1>
            <p>
              One-to-one sessions for tension, mobility, strength, rest, and
              energy. Pick one focus and begin there.
            </p>
            <div className="hero-actions">
              <a className="button button-dark" href="#sessions">
                Explore the sessions
                <Arrow />
              </a>
              <a className="text-link" href="#experience">
                See how it works <span>↓</span>
              </a>
            </div>
            <div className="hero-footnote">
              Movement&nbsp;&nbsp;·&nbsp;&nbsp; Breath&nbsp;&nbsp;·&nbsp;&nbsp; Rest
            </div>
          </div>
        </section>

        <div className="values-strip">
          <div className="container values-inner">
            <span className="values-kicker">THE SHIN APPROACH</span>
            <span>Private, one-to-one care</span>
            <span>Seven focused themes</span>
            <span>Choose session by session</span>
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
              <h2 id="experience-title">Choose. Practise. Notice.</h2>
              <p className="experience-lede">
                Each session starts with what you need that day. Shin guides
                the practice, adapts it with you, and makes room to notice what
                feels different.
              </p>
            </div>
            <div className="experience-body">
              <figure className="process-photo">
                <Image
                  src="/process-note.png"
                  alt="A practitioner writing a next step on a session note card"
                  width={1122}
                  height={1402}
                  sizes="(max-width: 700px) calc(100vw - 36px), 36vw"
                />
              </figure>
              <ol className="experience-steps">
                <li>
                  <span>01</span>
                  <div>
                    <strong>Choose a focus</strong>
                    <p>Start with one of the seven themes—or repeat what helped.</p>
                  </div>
                </li>
                <li>
                  <span>02</span>
                  <div>
                    <strong>Practise with Shin</strong>
                    <p>Move at a pace that feels attentive, supported, and yours.</p>
                  </div>
                </li>
                <li>
                  <span>03</span>
                  <div>
                    <strong>Notice how you feel</strong>
                    <p>Pause, check in, and decide what your body needs next.</p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </section>

        <section
          className="focus-section"
          id="sessions"
          aria-labelledby="focus-title"
        >
          <div className="container focus-inner">
            <div className="focus-intro">
              <span className="eyebrow">SEVEN SESSION THEMES</span>
              <h2 id="focus-title">Choose what you need today.</h2>
              <p>
                Each theme offers a different focus. Start with the one that
                feels most relevant, change focus next time, or return to the
                same practice.
              </p>
            </div>
            <div className="focus-list">
              {sessionThemes.map((session) => (
                <article className="focus-item" key={session.title}>
                  <h3>{session.title}</h3>
                  <p>{session.description}</p>
                </article>
              ))}
            </div>
            <p className="focus-note">
              These are flexible themes, not a required sequence. You choose
              the focus session by session.
            </p>
          </div>
        </section>

        <section
          className="sessions-section container section"
          id="book"
          aria-labelledby="booking-title"
        >
          <div className="section-heading">
            <div>
              <span className="eyebrow">PERSONAL SESSIONS</span>
              <h2 id="booking-title">Choose your pace.</h2>
            </div>
            <p>
              Begin with one focused hour or choose a week of daily practice.
              Your theme can change from one session to the next.
            </p>
          </div>
          <div className="session-grid">
            <article className="session-card single-session">
              <div className="session-heading-row">
                <div>
                  <span className="offer-kicker">START HERE</span>
                  <h3>One focused hour</h3>
                  <p className="session-description">
                    Choose one of the seven themes for a private guided practice.
                  </p>
                </div>
                <div className="price">
                  $60<span>one session</span>
                </div>
              </div>
              <ul className="benefits">
                <li>One-to-one attention with Shin</li>
                <li>A focus chosen around what you need today</li>
                <li>Movement adapted to your pace</li>
              </ul>
              <PurchaseButton
                url={checkoutUrl(process.env.CHECKOUT_SINGLE_URL)}
              />
              <p className="card-footnote">Best for a focused reset.</p>
            </article>
            <article className="session-card pack-session">
              <div className="session-heading-row">
                <div>
                  <span className="offer-kicker">CONTINUE THE WORK</span>
                  <h3>Seven-day continuation</h3>
                  <p className="session-description">
                    Seven private sessions with room to repeat or change focus each day.
                  </p>
                </div>
                <div className="price">
                  $350<span>seven-day pack</span>
                </div>
              </div>
              <ul className="benefits">
                <li>Seven personal sessions over seven days</li>
                <li>Choose from any of the seven themes</li>
                <li>Repeat the practices that feel useful</li>
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
          className="practice-section"
          id="practice"
          aria-labelledby="practice-title"
        >
          <div className="container practice-inner">
            <figure className="practice-portrait">
              <Image
                className="practice-wide"
                src="/practitioner-wide.png"
                alt="A seated wellness practitioner looking attentively toward the camera"
                width={1536}
                height={1024}
                sizes="100vw"
                loading="eager"
              />
              <Image
                className="practice-mobile"
                src="/practitioner-portrait.png"
                alt=""
                width={1122}
                height={1402}
                sizes="100vw"
                loading="eager"
              />
            </figure>
            <div className="practice-copy">
              <span className="eyebrow">FOUNDER &amp; PRACTITIONER</span>
              <h2 id="practice-title">Meet Shin.</h2>
              <p>
                Shin guides one-to-one movement sessions shaped around how your
                body feels that day. Together, you choose a focus and move
                through it with care and close attention.
              </p>
              <p className="practice-proof">
                Every session is led by Shin—no hand-offs, no rotating practitioner.
              </p>
              <a className="text-link" href="#book">
                Book a private hour <span>↑</span>
              </a>
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
              <h2 id="newsletter-title">Session dates + field notes.</h2>
              <p>
                Gentle practices, new availability, and the occasional useful
                note. Sent only when there is something worth opening.
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
        <p>Private guided movement, one focus at a time.</p>
        <span>© {new Date().getFullYear()} Shin Wellness</span>
        <a className="back-top" href="#" aria-label="Back to top">
          ↑
        </a>
      </footer>
    </>
  );
}
