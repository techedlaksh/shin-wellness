import assert from "node:assert/strict";
import { test } from "node:test";
import {
  handleSubscribe,
  SignupNotConfiguredError,
  type Signup,
} from "../lib/subscribe";
import { checkoutUrl, interests } from "../lib/offerings";
import { appendSignup } from "../lib/sheets";

function request(body: unknown, origin = "http://localhost:3000") {
  return new Request("http://localhost:3000/api/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json", origin },
    body: JSON.stringify(body),
  });
}
const valid = {
  email: "  Hello@Example.com ",
  interest: "playlist",
  location: "offering-dialog",
  website: "",
};

test("saves normalized email and each offering's interest and location", async () => {
  for (const interest of Object.keys(interests)) {
    const saved: Signup[] = [];
    const response = await handleSubscribe(
      request({ ...valid, interest }),
      async (value) => {
        saved.push(value);
      },
    );
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { ok: true });
    assert.deepEqual(saved, [
      { email: "hello@example.com", interest, location: "offering-dialog" },
    ]);
  }
});

test("does not report success until storage completes", async () => {
  let resolveSave!: () => void;
  const save = new Promise<void>((resolve) => {
    resolveSave = resolve;
  });
  let finished = false;
  const result = handleSubscribe(request(valid), () => save).then(
    (response) => {
      finished = true;
      return response;
    },
  );
  await new Promise((resolve) => setTimeout(resolve, 10));
  assert.equal(finished, false);
  resolveSave();
  assert.equal((await result).status, 200);
});

test("uses public Host for valid browser origins behind a bind-address proxy", async () => {
  const proxied = new Request("http://0.0.0.0:3100/api/subscribe", {
    method: "POST",
    headers: { host: "localhost:3100", origin: "http://localhost:3100" },
    body: JSON.stringify(valid),
  });
  assert.equal((await handleSubscribe(proxied, async () => {})).status, 200);
});

test("rejects invalid values and honeypot without contacting storage", async () => {
  for (const body of [
    null,
    [],
    { ...valid, email: "bad" },
    { ...valid, email: "x".repeat(250) + "@example.com" },
    { ...valid, interest: "unknown" },
    { ...valid, interest: "toString" },
    { ...valid, location: "unknown" },
    { ...valid, website: "spam" },
  ]) {
    const response = await handleSubscribe(request(body), async () => {
      assert.fail("Storage should not be called");
    });
    assert.equal(response.status, 400);
  }
});

test("rejects malformed, oversized, and cross-origin requests", async () => {
  const append = async () => {
    assert.fail("Storage should not be called");
  };
  assert.equal(
    (
      await handleSubscribe(
        new Request("http://localhost:3000/api/subscribe", {
          method: "POST",
          body: "{",
        }),
        append,
      )
    ).status,
    400,
  );
  assert.equal(
    (
      await handleSubscribe(
        request({ ...valid, email: "x".repeat(5000) }),
        append,
      )
    ).status,
    413,
  );
  assert.equal(
    (await handleSubscribe(request(valid, "https://elsewhere.example"), append))
      .status,
    403,
  );
});

test("missing configuration is honest and provider errors do not leak credentials", async () => {
  const missing = await handleSubscribe(request(valid), async () => {
    throw new SignupNotConfiguredError();
  });
  assert.equal(missing.status, 503);
  assert.match((await missing.json()).error, /opening soon/);
  const failed = await handleSubscribe(request(valid), async () => {
    throw new Error("PRIVATE KEY provider details");
  });
  assert.equal(failed.status, 502);
  assert.doesNotMatch(JSON.stringify(await failed.json()), /PRIVATE KEY/);
});

test("Sheets adapter refuses to write without required configuration", async () => {
  const original = process.env.GOOGLE_SHEETS_ID;
  delete process.env.GOOGLE_SHEETS_ID;
  try {
    await assert.rejects(
      appendSignup({
        email: "test@example.com",
        interest: "updates",
        location: "footer",
      }),
      SignupNotConfiguredError,
    );
  } finally {
    if (original !== undefined) process.env.GOOGLE_SHEETS_ID = original;
  }
});

test("checkout accepts configured HTTPS destinations and rejects unsafe or absent URLs", () => {
  assert.equal(
    checkoutUrl("https://buy.example.com/single"),
    "https://buy.example.com/single",
  );
  assert.equal(
    checkoutUrl("https://buy.example.com/pack"),
    "https://buy.example.com/pack",
  );
  for (const value of [
    undefined,
    "",
    "/checkout",
    "javascript:alert(1)",
    "http://example.com",
    "https://user:secret@example.com",
  ])
    assert.equal(checkoutUrl(value), null);
});
