import { test as base } from "@playwright/test";
import { chromium } from "playwright-extra";
import stealthPlugin from "puppeteer-extra-plugin-stealth";

import { HomePage } from "../pages/HomePage";

chromium.use(stealthPlugin());

declare const process: {
  env: Record<string, string | undefined>;
};

interface Fixtures {
  home: HomePage;
}

type BrowserContext = Awaited<
  ReturnType<typeof chromium.launchPersistentContext>
>;

async function hardenContext(context: BrowserContext) {
  await context.addInitScript(() => {
    Object.defineProperty(navigator, "webdriver", {
      get: () => undefined,
    });

    const browserWindow = window as typeof window & {
      chrome?: { runtime?: object };
    };
    browserWindow.chrome ??= { runtime: {} };

    Object.defineProperty(window.screen, "width", { get: () => 1280 });
    Object.defineProperty(window.screen, "height", { get: () => 720 });
    Object.defineProperty(window.screen, "availWidth", { get: () => 1280 });
    Object.defineProperty(window.screen, "availHeight", { get: () => 720 });
  });
}

export const test = base.extend<Fixtures>({
  browser: [
    async ({ browserName, channel, headless, launchOptions }, use) => {
      if (browserName !== "chromium") {
        throw new Error(
          `Stealth plugin setup only supports Chromium projects. Received "${browserName}".`,
        );
      }

      const browser = await chromium.launch({
        ...launchOptions,
        channel,
        headless,
      });

      await use(browser);
      await browser.close();
    },
    { scope: "worker" },
  ],
  context: async (
    { browserName, channel, contextOptions, headless, launchOptions },
    use,
  ) => {
    if (browserName !== "chromium") {
      throw new Error(
        `Stealth context setup only supports Chromium projects. Received "${browserName}".`,
      );
    }

    const userDataDir = process.env.PLAYWRIGHT_USER_DATA_DIR;

    if (userDataDir) {
      const context = await chromium.launchPersistentContext(userDataDir, {
        ...contextOptions,
        ...launchOptions,
        channel,
        headless,
      });

      await hardenContext(context);
      await use(context);
      await context.close();
      return;
    }

    const browser = await chromium.launch({
      ...launchOptions,
      channel,
      headless,
    });
    const context = await browser.newContext(contextOptions);

    await hardenContext(context);
    await use(context);
    await context.close();
    await browser.close();
  },
  home: async ({ page }, use) => {
    const home = new HomePage(page);
    await use(home);
  },
});
