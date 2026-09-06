import { interests, locations, type Interest } from "./offerings";

export type Signup = {
  email: string;
  interest: Interest;
  location: (typeof locations)[number];
};
export type AppendSignup = (signup: Signup) => Promise<void>;

export async function handleSubscribe(
  request: Request,
  append: AppendSignup,
): Promise<Response> {
  const origin = request.headers.get("origin");
  if (origin) {
    // Next's internal request URL can use the bind address behind a proxy.
    // The browser-facing Host header is the correct comparison for Origin.
    const host = request.headers.get("host") ?? new URL(request.url).host;
    try {
      const source = new URL(origin);
      if (
        !["http:", "https:"].includes(source.protocol) ||
        source.host !== host
      )
        throw new Error("Foreign origin");
    } catch {
      return Response.json(
        { error: "Please sign up from the Shin Wellness website." },
        { status: 403 },
      );
    }
  }
  let body: unknown;
  try {
    const raw = await request.text();
    if (raw.length > 4096)
      return Response.json(
        { error: "Your submission is too long." },
        { status: 413 },
      );
    body = JSON.parse(raw);
  } catch {
    return Response.json(
      { error: "Please check your details and try again." },
      { status: 400 },
    );
  }
  if (!body || typeof body !== "object" || Array.isArray(body))
    return Response.json(
      { error: "Please check your details." },
      { status: 400 },
    );
  const data = body as Record<string, unknown>;
  if (data.website)
    return Response.json(
      { error: "We couldn’t accept this submission." },
      { status: 400 },
    );
  const email =
    typeof data.email === "string" ? data.email.trim().toLowerCase() : "";
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }
  if (
    typeof data.interest !== "string" ||
    !Object.hasOwn(interests, data.interest) ||
    !locations.includes(data.location as Signup["location"])
  ) {
    return Response.json(
      { error: "Please choose a valid signup option." },
      { status: 400 },
    );
  }
  try {
    await append({
      email,
      interest: data.interest as Interest,
      location: data.location as Signup["location"],
    });
    return Response.json({ ok: true });
  } catch (error) {
    if (error instanceof SignupNotConfiguredError)
      return Response.json(
        {
          error:
            "Our email list is opening soon. Please check back a little later.",
        },
        { status: 503 },
      );
    return Response.json(
      {
        error:
          "We couldn’t save your email just now. Please try again in a moment.",
      },
      { status: 502 },
    );
  }
}

export class SignupNotConfiguredError extends Error {}
