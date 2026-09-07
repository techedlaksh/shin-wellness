"use client";

import { useEffect, useId, useRef, useState } from "react";
import { interests, type Interest } from "@/lib/offerings";
import { Arrow, Sprout } from "./artwork";

export function SignupForm({
  interest = "updates",
  location = "footer",
}: {
  interest?: Interest;
  location?: "footer" | "offering-dialog";
}) {
  const id = useId();
  const busy = useRef(false);
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current) return;
    busy.current = true;
    setState("loading");
    setMessage("");
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.get("email"),
          website: form.get("website"),
          interest,
          location,
        }),
        signal: AbortSignal.timeout(20000),
      });
      const result = await response.json();
      if (!response.ok || result.ok !== true)
        throw new Error(
          result.error || "We couldn’t save your email. Please try again.",
        );
      setState("success");
    } catch (error) {
      setState("error");
      setMessage(
        error instanceof Error &&
          error.name !== "TimeoutError" &&
          error.name !== "TypeError"
          ? error.message
          : "We couldn’t connect just now. Please try again in a moment.",
      );
    } finally {
      busy.current = false;
    }
  }

  if (state === "success")
    return (
      <div className="signup-success" role="status">
        <span>✓</span>
        <div>
          <strong>You’re on the list.</strong>
          <p>
            A little goodness will find its way to your inbox when we launch.
          </p>
        </div>
      </div>
    );
  return (
    <form
      className="signup-form"
      onSubmit={submit}
      aria-busy={state === "loading"}
    >
      <label className="sr-only" htmlFor={`${id}-email`}>
        Email address
      </label>
      <div className="signup-input-row">
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Your email address"
          required
          maxLength={254}
          aria-describedby={`${id}-note${message ? ` ${id}-error` : ""}`}
        />
        <button
          className="button button-light"
          type="submit"
          disabled={state === "loading"}
        >
          {state === "loading" ? "Joining…" : "Keep me in the loop"}
          <Arrow />
        </button>
      </div>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor={`${id}-website`}>Website</label>
        <input
          id={`${id}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <p className="signup-note" id={`${id}-note`}>
        {interest === "updates"
          ? "Join for launch updates and new resources."
          : `Join for launch updates about ${interests[interest]}.`}
      </p>
      {message && (
        <p className="form-error" id={`${id}-error`} role="alert">
          {message}
        </p>
      )}
    </form>
  );
}

export function InterestButton({
  interest,
  children = "Let me know",
  className = "text-button",
}: {
  interest: Interest;
  children?: React.ReactNode;
  className?: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const descriptionId = useId();
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current?.showModal();
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);
  function close() {
    dialog.current?.close();
  }
  function trapFocus(event: React.KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== "Tab") return;
    const controls = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([tabindex="-1"]), a[href]',
      ),
    );
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  }
  return (
    <>
      <button
        ref={trigger}
        type="button"
        className={className}
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
      >
        {children}
        <Arrow diagonal />
      </button>
      {open && (
        <dialog
          ref={dialog}
          className="signup-dialog"
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          onKeyDown={trapFocus}
          onClose={() => {
            setOpen(false);
            trigger.current?.focus();
          }}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              const rect = event.currentTarget.getBoundingClientRect();
              if (
                event.clientX < rect.left ||
                event.clientX > rect.right ||
                event.clientY < rect.top ||
                event.clientY > rect.bottom
              )
                close();
            }
          }}
        >
          <button
            type="button"
            className="dialog-close"
            aria-label="Close signup"
            onClick={close}
            autoFocus
          >
            ×
          </button>
          <Sprout className="dialog-sprout" />
          <span className="eyebrow">A LITTLE SOMETHING TO LOOK FORWARD TO</span>
          <h2 id={titleId}>
            Good things
            <br />
            <em>are growing.</em>
          </h2>
          <p id={descriptionId}>
            Be the first to hear when {interests[interest]} is ready. Leave your
            email and we’ll keep you in the loop.
          </p>
          <SignupForm interest={interest} location="offering-dialog" />
        </dialog>
      )}
    </>
  );
}

export function PurchaseButton({
  url,
  pack = false,
}: {
  url: string | null;
  pack?: boolean;
}) {
  const [unavailable, setUnavailable] = useState(false);
  const id = useId();
  const label = pack ? "Book seven sessions" : "Book one session";
  return (
    <div className="purchase-action">
      {url ? (
        <a
          className="button button-dark"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${label} (opens checkout in a new tab)`}
        >
          {label}
          <Arrow diagonal />
        </a>
      ) : (
        <button
          className="button button-dark"
          type="button"
          onClick={() => setUnavailable(true)}
          aria-describedby={unavailable ? id : undefined}
        >
          {label}
          <Arrow diagonal />
        </button>
      )}
      {unavailable && (
        <p className="purchase-message" id={id} role="status">
          Booking is opening soon. <a href="#stay-in-touch">Join the list</a> to
          hear when sessions are available.
        </p>
      )}
    </div>
  );
}
