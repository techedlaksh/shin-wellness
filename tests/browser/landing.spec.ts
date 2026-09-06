import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("responsive layouts, navigation, reduced motion, and configured checkouts", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const [name, width, height] of [
    ["desktop", 1440, 1000],
    ["compact-desktop", 1000, 900],
    ["tablet", 768, 1024],
    ["mobile", 390, 844],
    ["small-mobile", 320, 740],
  ] as const) {
    await page.setViewportSize({ width, height });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "A little spaceto feel likeyourself again.",
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    expect(
      await page
        .locator(".hero-copy")
        .evaluate((element) => getComputedStyle(element).animationName),
    ).toBe("none");
    if (width > 900) {
      await expect(page.locator(".hero-copy > p")).toHaveCSS(
        "font-size",
        "18px",
      );
      await expect(page.locator(".hero-actions .button")).toHaveCSS(
        "font-size",
        "15px",
      );
    }
    await page.screenshot({ path: `.context/${name}.png`, fullPage: true });
    if (name === "desktop" || name === "mobile")
      await page.screenshot({ path: `.context/${name}-viewport.png` });
  }
  await expect(
    page.getByRole("link", {
      name: "Buy a single session (opens checkout in a new tab)",
    }),
  ).toHaveAttribute("href", "https://checkout.example.com/single");
  await expect(
    page.getByRole("link", {
      name: "Buy the 7-day pack (opens checkout in a new tab)",
    }),
  ).toHaveAttribute("href", "https://checkout.example.com/pack");
  await page.getByRole("link", { name: "Find your reset" }).click();
  await expect(page).toHaveURL(/#sessions$/);
  expect(errors).toEqual([]);
});

test("offering dialog traps focus, closes with Escape, and restores focus", async ({
  page,
}) => {
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Tell me when it drops" });
  await trigger.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText("the feel-good playlist");
  await expect(
    dialog.getByRole("button", { name: "Close signup" }),
  ).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(
    dialog.getByRole("textbox", { name: "Email address" }),
  ).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(
    dialog.getByRole("button", { name: "Keep me in the loop" }),
  ).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(
    dialog.getByRole("button", { name: "Close signup" }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
});

test("every offering sends its interest, blocks in-flight resubmission, and confirms saved state", async ({
  page,
}) => {
  const payloads: Record<string, string>[] = [];
  let finish!: () => void;
  await page.route("**/api/subscribe", async (route) => {
    payloads.push(route.request().postDataJSON());
    await new Promise<void>((resolve) => {
      finish = resolve;
    });
    await route.fulfill({ status: 200, json: { ok: true } });
  });
  await page.goto("/");
  const buttons = page.locator("button[aria-haspopup='dialog']");
  const interests = [
    "playlist",
    "wallpapers",
    "routine",
    "checkins",
    "coaching",
    "retreats",
    "recommendations",
  ];
  for (let i = 0; i < interests.length; i++) {
    await buttons.nth(i).click();
    const dialog = page.getByRole("dialog");
    await dialog
      .getByRole("textbox", { name: "Email address" })
      .fill("reader@example.com");
    await dialog.getByRole("button", { name: "Keep me in the loop" }).click();
    await expect.poll(() => payloads.length).toBe(i + 1);
    await expect(
      dialog.getByRole("button", { name: "Joining…" }),
    ).toBeDisabled();
    await dialog
      .locator("form")
      .evaluate((form) => (form as HTMLFormElement).requestSubmit());
    expect(payloads.length).toBe(i + 1);
    expect(payloads[i]).toEqual({
      email: "reader@example.com",
      website: "",
      interest: interests[i],
      location: "offering-dialog",
    });
    finish();
    await expect(dialog.getByRole("status")).toContainText(
      "You’re on the list.",
    );
    await dialog.getByRole("button", { name: "Close signup" }).click();
  }
});

test("signup preserves input on failure and allows a successful retry", async ({
  page,
}) => {
  let attempt = 0;
  await page.route("**/api/subscribe", (route) => {
    attempt++;
    return route.fulfill(
      attempt === 1
        ? {
            status: 502,
            json: {
              error:
                "We couldn’t save your email just now. Please try again in a moment.",
            },
          }
        : { status: 200, json: { ok: true } },
    );
  });
  await page.goto("/#stay-in-touch");
  const email = page.getByRole("textbox", { name: "Email address" });
  await email.fill("reader@example.com");
  await page.getByRole("button", { name: "Keep me in the loop" }).click();
  await expect(page.locator("form").getByRole("alert")).toContainText(
    "couldn’t save your email",
  );
  await expect(email).toHaveValue("reader@example.com");
  await page.getByRole("button", { name: "Keep me in the loop" }).click();
  await expect(page.getByRole("status")).toContainText("You’re on the list.");
  expect(attempt).toBe(2);
});

test("unconfigured real API never reports an email as saved", async ({
  page,
}) => {
  await page.goto("/#stay-in-touch");
  await page
    .getByRole("textbox", { name: "Email address" })
    .fill("reader@example.com");
  await page.getByRole("button", { name: "Keep me in the loop" }).click();
  await expect(page.locator("form").getByRole("alert")).toContainText(
    "email list is opening soon",
  );
  await expect(page.getByRole("status")).not.toBeVisible();
});

test("page and signup dialog pass automated accessibility checks", async ({
  page,
}) => {
  await page.goto("/");
  const pageResults = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(pageResults.violations).toEqual([]);
  await page.getByRole("button", { name: "Tell me when it drops" }).click();
  const dialogResults = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(dialogResults.violations).toEqual([]);
});
