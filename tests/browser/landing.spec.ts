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
      "Choose what yourbody needs today.",
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
  await page.getByRole("link", { name: "Explore the sessions" }).click();
  await expect(page).toHaveURL(/#sessions$/);
  expect(errors).toEqual([]);
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

test("page passes automated accessibility checks", async ({ page }) => {
  await page.goto("/");
  const pageResults = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(pageResults.violations).toEqual([]);
});
