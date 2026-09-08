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
    const atmosphere = page.getByTestId("session-atmosphere");
    await expect(atmosphere).toHaveAttribute("data-render-state", "static");
    await expect(atmosphere).toHaveAttribute("data-rendering", "paused");
    expect(
      await atmosphere.locator("canvas").evaluate((canvas) => {
        const element = canvas as HTMLCanvasElement;
        return element.width > 0 && element.height > 0;
      }),
    ).toBe(true);
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
  const staticAtmosphere = page.getByTestId("session-atmosphere");
  await page.waitForTimeout(250);
  const staticFrame = await staticAtmosphere.getAttribute("data-frame-count");
  await page.waitForTimeout(250);
  await expect(staticAtmosphere).toHaveAttribute(
    "data-frame-count",
    staticFrame ?? "1",
  );
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

  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = "auto";
  });

  const futurePanel = page.locator(".future-panel");
  await futurePanel.scrollIntoViewIfNeeded();
  await expect(futurePanel).toHaveClass(/is-visible/);
  await expect(futurePanel).toHaveCSS("opacity", "1");

  const sessionStage = page.locator(".session-stage");
  const atmosphere = page.getByTestId("session-atmosphere");
  const canvas = atmosphere.locator("canvas");
  await sessionStage.evaluate((element) =>
    element.scrollIntoView({ block: "center" }),
  );
  await expect(atmosphere).toHaveAttribute("data-render-state", "ready");
  await expect(atmosphere).toHaveAttribute("data-rendering", "active");

  for (const [time, delay] of [
    [0, 0],
    [200, 200],
    [500, 300],
    [1000, 500],
  ] as const) {
    if (delay) await page.waitForTimeout(delay);
    await sessionStage.screenshot({
      path: `.context/booking-motion-${time}.png`,
    });
  }

  const sceneMetrics = await sessionStage.evaluate((element) => {
    const bounds = element.getBoundingClientRect();
    return {
      top: bounds.top + window.scrollY,
      height: bounds.height,
      viewport: window.innerHeight,
    };
  });
  for (const progress of [0, 0.25, 0.5, 0.75, 1]) {
    const scrollY =
      sceneMetrics.top -
      (sceneMetrics.viewport -
        progress * (sceneMetrics.viewport + sceneMetrics.height));
    await page.evaluate((top) => window.scrollTo(0, top), scrollY);
    await page.waitForTimeout(180);
    await page.screenshot({
      path: `.context/booking-scroll-${Math.round(progress * 100)}.png`,
    });
  }

  await sessionStage.evaluate((element) =>
    element.scrollIntoView({ block: "center" }),
  );
  const sessionBounds = await sessionStage.boundingBox();
  expect(sessionBounds).not.toBeNull();
  if (sessionBounds) {
    const visibleTop = Math.max(2, sessionBounds.y);
    const visibleBottom = Math.min(
      sceneMetrics.viewport - 2,
      sessionBounds.y + sessionBounds.height,
    );
    const visibleY = visibleTop + (visibleBottom - visibleTop) * 0.5;
    await page.mouse.move(sessionBounds.x + sessionBounds.width / 2, visibleY);
    await page.waitForTimeout(260);
    await sessionStage.screenshot({ path: ".context/booking-pointer-center.png" });

    await page.mouse.move(
      sessionBounds.x + sessionBounds.width * 0.1,
      visibleTop + (visibleBottom - visibleTop) * 0.15,
    );
    await page.waitForTimeout(700);
    expect(
      parseFloat((await atmosphere.getAttribute("data-pointer-x")) ?? "1"),
    ).toBeLessThan(0.2);
    await sessionStage.screenshot({
      path: ".context/booking-pointer-top-left.png",
    });

    await page.mouse.move(
      sessionBounds.x + sessionBounds.width * 0.9,
      visibleTop + (visibleBottom - visibleTop) * 0.85,
    );
    await page.waitForTimeout(700);
    expect(
      parseFloat((await atmosphere.getAttribute("data-pointer-x")) ?? "0"),
    ).toBeGreaterThan(0.8);
    await sessionStage.screenshot({
      path: ".context/booking-pointer-bottom-right.png",
    });

    await page.mouse.move(0, 0);
    await expect
      .poll(async () =>
        Math.abs(
          parseFloat((await atmosphere.getAttribute("data-pointer-x")) ?? "0") -
            0.68,
        ),
      )
      .toBeLessThan(0.02);
    await sessionStage.screenshot({ path: ".context/booking-pointer-rest.png" });
  }

  const supportsContextLoss = await canvas.evaluate((element) => {
    const target = element as HTMLCanvasElement & {
      restoreWebgl?: () => void;
      shaderCanvas?: HTMLCanvasElement;
    };
    const gl = target.shaderCanvas?.getContext("webgl2");
    const extension = gl?.getExtension("WEBGL_lose_context");
    if (extension) target.restoreWebgl = () => extension.restoreContext();
    extension?.loseContext();
    return Boolean(extension);
  });
  if (supportsContextLoss) {
    await expect(atmosphere).toHaveAttribute("data-render-state", "lost");
    await canvas.evaluate((element) => {
      const target = element as HTMLCanvasElement & {
        restoreWebgl?: () => void;
      };
      target.restoreWebgl?.();
    });
    await expect(atmosphere).toHaveAttribute("data-render-state", "ready");
  }

  const resources = page.locator('[data-depth-scene="resources"]');
  await resources.scrollIntoViewIfNeeded();
  const resourceBounds = await resources.boundingBox();
  expect(resourceBounds).not.toBeNull();
  if (resourceBounds) {
    await page.mouse.move(
      resourceBounds.x + resourceBounds.width - 3,
      Math.min(
        sceneMetrics.viewport - 3,
        resourceBounds.y + resourceBounds.height - 3,
      ),
    );
    await page.waitForTimeout(550);
    await expect(resources).toHaveAttribute("data-depth-active", "true");
    expect(
      await resources.evaluate((element) =>
        parseFloat(
          (element as HTMLElement).style.getPropertyValue("--depth-x"),
        ),
      ),
    ).toBeGreaterThan(0.8);
    await page.screenshot({ path: ".context/resources-depth.png" });
  }

  await page.evaluate(() => window.scrollTo(0, 0));
  await expect(atmosphere).toHaveAttribute("data-rendering", "paused");
  await expect(resources).toHaveAttribute("data-depth-active", "false");
  await expect
    .poll(() =>
      resources.evaluate((element) =>
        (element as HTMLElement).style.getPropertyValue("--depth-x"),
      ),
    )
    .toBe("0px");
});

test("touch devices keep the depth composition static", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    baseURL: baseURL ?? "http://localhost:3100",
    hasTouch: true,
    isMobile: true,
    reducedMotion: "no-preference",
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto("/");
  const atmosphere = page.getByTestId("session-atmosphere");
  await expect(atmosphere).toHaveAttribute("data-render-state", "static");
  await expect(atmosphere).toHaveAttribute("data-rendering", "paused");
  await expect(page.locator('[data-depth-scene="resources"]')).toHaveAttribute(
    "data-depth-active",
    "false",
  );
  await context.close();
});

test("WebGL failure retains the static booking composition", async ({ page }) => {
  await page.addInitScript(() => {
    const getContext = HTMLCanvasElement.prototype.getContext;
    Object.defineProperty(HTMLCanvasElement.prototype, "getContext", {
      configurable: true,
      value(this: HTMLCanvasElement, contextId: string, ...args: unknown[]) {
        if (contextId === "webgl2") return null;
        return Reflect.apply(getContext, this, [contextId, ...args]);
      },
    });
  });
  await page.goto("/#sessions");
  await expect(page.getByTestId("session-atmosphere")).toHaveAttribute(
    "data-render-state",
    "fallback",
  );
  await expect(page.locator(".session-card")).toHaveCount(2);
  await expect(
    page.getByText("Buy a single session", { exact: true }),
  ).toBeVisible();
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
