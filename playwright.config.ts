import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/browser",
  fullyParallel: false,
  use: {
    baseURL: "http://localhost:3100",
    browserName: "chromium",
    reducedMotion: "reduce",
    screenshot: "only-on-failure",
  },
  webServer: {
    command: "npm run dev -- --port 3100",
    url: "http://localhost:3100",
    reuseExistingServer: false,
    env: {
      CHECKOUT_SINGLE_URL: "https://checkout.example.com/single",
      CHECKOUT_PACK_URL: "https://checkout.example.com/pack",
      GOOGLE_SHEETS_ID: "",
      GOOGLE_SERVICE_ACCOUNT_EMAIL: "",
      GOOGLE_PRIVATE_KEY: "",
    },
  },
});
