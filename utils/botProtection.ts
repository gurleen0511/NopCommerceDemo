import { type Page } from "@playwright/test";

const challengeText =
  /checking your browser|security verification|verify you are human|just a moment|attention required|cloudflare/i;

export async function assertNoBotProtection(page: Page) {
  if (!(await isBotProtectionPage(page))) {
    return;
  }

  throw new Error(
    [
      "The target site returned a bot-protection challenge instead of the nopCommerce storefront.",
      "Use NOPCOMMERCE_BASE_URL to point these tests at a controlled nopCommerce environment,",
      "or provide a legitimate Playwright storage state with PLAYWRIGHT_STORAGE_STATE after manually completing any allowed verification.",
    ].join(" "),
  );
}

export async function waitForStorefrontReady(page: Page) {
  const searchBox = page.locator("#small-searchterms");

  try {
    await searchBox.waitFor({ state: "visible", timeout: 15_000 });
  } catch (error) {
    await assertNoBotProtection(page);
    throw error;
  }

  await assertNoBotProtection(page);
}

async function isBotProtectionPage(page: Page) {
  const visibleChallengeLocator = page
    .locator(
      [
        "iframe[src*='challenges.cloudflare.com']",
        "iframe[src*='turnstile']",
        "input[name='cf-turnstile-response']",
        ".cf-turnstile",
        "#challenge-running",
      ].join(", "),
    )
    .first();

  if (await visibleChallengeLocator.isVisible().catch(() => false)) {
    return true;
  }

  const title = await page.title().catch(() => "");
  if (challengeText.test(title)) {
    return true;
  }

  return page.getByText(challengeText).first().isVisible().catch(() => false);
}
