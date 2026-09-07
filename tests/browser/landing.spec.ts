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
    expect(
      await page
        .getByTestId("hero-depth-stage")
        .evaluate((element) => getComputedStyle(element).transform),
    ).toBe("none");
    expect(
      await page.locator(".hero-image").evaluate((element) => {
        const image = element as HTMLImageElement;
        return image.complete && image.naturalWidth > 0 && image.naturalHeight > 0;
      }),
    ).toBe(true);
    await expect(page.locator("[data-reveal]").first()).toHaveCSS(
      "opacity",
      "1",
    );
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

test("hero depth follows the pointer and returns to rest with motion enabled", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const hero = page.locator(".hero");

  for (const [time, delay] of [
    [0, 0],
    [200, 200],
    [500, 300],
    [1000, 500],
  ] as const) {
    if (delay) await page.waitForTimeout(delay);
    await page.evaluate(() => window.scrollTo(0, 0));
    const frameBounds = await hero.boundingBox();
    expect(frameBounds).not.toBeNull();
    if (frameBounds)
      await page.screenshot({
        path: `.context/hero-motion-${time}.png`,
        clip: frameBounds,
        caret: "initial",
      });
  }

  await expect(page.locator(".hero-copy")).toHaveCSS("opacity", "1");

  const stage = page.getByTestId("hero-depth-stage");
  const bounds = await stage.boundingBox();
  expect(bounds).not.toBeNull();
  if (!bounds) return;

  await page.mouse.move(bounds.x + 2, bounds.y + 2);
  await page.waitForTimeout(360);
  const topLeft = await stage.evaluate((element) => ({
    tiltX: parseFloat(
      (element as HTMLElement).style.getPropertyValue("--tilt-x"),
    ),
    tiltY: parseFloat(
      (element as HTMLElement).style.getPropertyValue("--tilt-y"),
    ),
    transform: getComputedStyle(element).transform,
  }));
  expect(topLeft.tiltX).toBeGreaterThan(2.5);
  expect(topLeft.tiltY).toBeLessThan(-2.5);
  expect(topLeft.transform).not.toBe("none");
  await page.screenshot({ path: ".context/hero-depth-top-left.png" });

  await page.mouse.move(
    bounds.x + bounds.width - 2,
    bounds.y + bounds.height - 2,
  );
  await page.waitForTimeout(360);
  const bottomRight = await stage.evaluate((element) => ({
    tiltX: parseFloat(
      (element as HTMLElement).style.getPropertyValue("--tilt-x"),
    ),
    tiltY: parseFloat(
      (element as HTMLElement).style.getPropertyValue("--tilt-y"),
    ),
    transform: getComputedStyle(element).transform,
  }));
  expect(bottomRight.tiltX).toBeLessThan(-2.5);
  expect(bottomRight.tiltY).toBeGreaterThan(2.5);
  expect(bottomRight.transform).not.toBe(topLeft.transform);
  await page.screenshot({ path: ".context/hero-depth-bottom-right.png" });

  await page.mouse.move(0, 0);
  await page.waitForTimeout(360);
  await expect
    .poll(() =>
      stage.evaluate((element) => ({
        tiltX: (element as HTMLElement).style.getPropertyValue("--tilt-x"),
        tiltY: (element as HTMLElement).style.getPropertyValue("--tilt-y"),
      })),
    )
    .toEqual({ tiltX: "0deg", tiltY: "0deg" });
  await page.screenshot({ path: ".context/hero-depth-rest.png" });

  const futurePanel = page.locator(".future-panel");
  await futurePanel.scrollIntoViewIfNeeded();
  await expect(futurePanel).toHaveClass(/is-visible/);
  await expect(futurePanel).toHaveCSS("opacity", "1");
});

test("session cards explain the selectable focus and tailored seven-day sequence", async ({
  page,
}) => {
  await page.goto("/#sessions");
  const singleSession = page.locator(".single-session");
  const sevenDayPack = page.locator(".pack-session");

  await expect(singleSession).toContainText(
    "Choose the focus your body needs today",
  );
  await expect(singleSession).toContainText(
    "Choose one of seven session focuses",
  );
  await expect(sevenDayPack).toContainText(
    "Shin will shape their order around what you need",
  );
  await expect(sevenDayPack.locator(".session-focus-list > li")).toHaveCount(7);

  for (const focus of [
    "Neck & shoulders",
    "Chest opening",
    "Lower back (lumbar)",
    "Hamstrings",
    "Core strength",
    "Insomnia",
    "Fatigue",
  ]) {
    await expect(sevenDayPack.getByText(focus, { exact: true })).toBeVisible();
  }
});

test("offering dialog traps focus, closes with Escape, and restores focus", async ({
  page,
}) => {
  await page.goto("/");
  const trigger = page.getByRole("button", {
    name: "Send me the reading list",
  });
  await trigger.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await page.screenshot({ path: ".context/signup-dialog.png" });
  await expect(dialog).toContainText("the Shin Wellness reading list");
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
    "books",
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
  await page
    .getByRole("button", { name: "Send me the reading list" })
    .click();
  const dialogResults = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(dialogResults.violations).toEqual([]);
});
