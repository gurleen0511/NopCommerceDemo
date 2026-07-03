import { defineConfig, devices } from "@playwright/test";

declare const process: {
  env: Record<string, string | undefined>;
};

const storageState = process.env.PLAYWRIGHT_STORAGE_STATE || undefined;
const baseURL =
  process.env.NOPCOMMERCE_BASE_URL || "https://demo.nopcommerce.com";
const browserChannel = process.env.PLAYWRIGHT_BROWSER_CHANNEL || undefined;
const headless = process.env.PLAYWRIGHT_HEADED === "true" ? false : true;
const proxy = process.env.PLAYWRIGHT_PROXY_SERVER
  ? {
      server: process.env.PLAYWRIGHT_PROXY_SERVER,
      username: process.env.PLAYWRIGHT_PROXY_USERNAME,
      password: process.env.PLAYWRIGHT_PROXY_PASSWORD,
    }
  : undefined;
const userAgent =
  process.env.PLAYWRIGHT_USER_AGENT ||
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36";

export default defineConfig({
  testDir: "./tests",
  timeout: 45_000,
  expect: { timeout: 10_000 },
  fullyParallel: false,
  retries: 0,
  workers: 1,
  reporter: [["html"], ["list"]],

  use: {
    baseURL,
    trace: "on",
    screenshot: "only-on-failure",
    headless,
    channel: browserChannel,
    viewport: { width: 1280, height: 720 },
    deviceScaleFactor: 1,
    isMobile: false,
    hasTouch: false,
    colorScheme: "light",
    locale: "en-US",
    timezoneId: "America/Vancouver",
    userAgent,
    extraHTTPHeaders: {
      "Accept-Language": "en-US,en;q=0.9",
      "sec-ch-ua":
        '"Google Chrome";v="149", "Chromium";v="149", "Not_A Brand";v="99"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"macOS"',
    },
    storageState,
    launchOptions: {
      args: [
        "--disable-blink-features=AutomationControlled",
        "--disable-dev-shm-usage",
      ],
      proxy,
    },
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],
});
