# nopCommerce Demo store Playwright Automation

This project converts high-value manual test cases for `https://demo.nopcommerce.com` into Playwright end-to-end automated tests.

## What this demonstrates

- Manual to automation test selection
- Playwright with TypeScript
- Page Object Model structure
- Positive, negative, and boundary-style UI tests
- Cart and checkout validation coverage
- HTML test reports
- GitHub Actions CI setup

## Tech stack

- Playwright Test
- TypeScript
- Node.js
- GitHub Actions

## Project structure

```text
pages/                         Page objects
utils/                         Test data and helpers
tests/auth/                    Registration, login, logout tests
tests/search/                  Search tests
tests/cart/                    Cart and product option tests
tests/checkout/                Checkout validation tests
docs/manual-to-automation-mapping.md
.github/workflows/playwright.yml
```

## Install

```bash
npm install
npx playwright install
```

## Run tests

```bash
npm run typecheck
npm test
```

Run headed:

```bash
npm run test:headed
```

Open HTML report:

```bash
npm run report
```

## Testing status

The framework, page objects, and test coverage were implemented and validated with TypeScript checks and Playwright test discovery. Full live execution against `https://demo.nopcommerce.com` could not be completed reliably because the public demo site is protected by Cloudflare bot-detection challenges.

The following legitimate Playwright approaches were added or tried to make the browser session look closer to a normal user session:

- Headed browser execution through `npm run test:headed`.
- Optional real browser channel selection with `PLAYWRIGHT_BROWSER_CHANNEL`.
- Optional saved authentication/session state with `PLAYWRIGHT_STORAGE_STATE`.
- Optional persistent browser profile support with `PLAYWRIGHT_USER_DATA_DIR`.
- Optional proxy configuration with `PLAYWRIGHT_PROXY_SERVER`, `PLAYWRIGHT_PROXY_USERNAME`, and `PLAYWRIGHT_PROXY_PASSWORD`.
- A realistic desktop user agent and browser headers in `playwright.config.ts`.
- Desktop viewport, locale, timezone, color scheme, and device settings in `playwright.config.ts`.
- Chromium launch hardening with `--disable-blink-features=AutomationControlled`.
- `playwright-extra` with `puppeteer-extra-plugin-stealth`.
- Browser-context hardening for `navigator.webdriver`, `window.chrome.runtime`, and screen dimensions.
- Human-like pauses, mouse movement, and sequential typing helpers.
- Bot-protection detection that fails fast when Cloudflare or verification pages are returned instead of the storefront.

These attempts did not reliably bypass the protection on the public demo site. That is a project limitation: the suite is best treated as a Playwright/TypeScript practice portfolio unless it is pointed at a controlled nopCommerce environment where automated testing is permitted and Cloudflare verification does not block the browser session.

Remove generated reports, browser profiles, and storage state:

```bash
npm run clean
```

## Notes

The demo site is public and shared, so tests use generated emails where possible. Some full checkout/rental/date-picker flows are intentionally marked as optional because they are longer and more likely to become flaky.
