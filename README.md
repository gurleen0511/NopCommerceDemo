# nopCommerce Playwright Automation Portfolio

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

The framework, page objects, and test coverage were implemented and validated with TypeScript checks and Playwright test discovery. Full live execution against `https://demo.nopcommerce.com` could not be completed reliably because the public demo site is protected by Cloudflare bot-detection challenges. Several legitimate Playwright approaches were attempted, including headed browser runs, storage state, a persistent browser profile, and browser-context hardening, but the site continued to block automated sessions.

For dependable execution, run this suite against a nopCommerce environment you control, or use a legitimately established storage state only where that access is permitted.

## Bot protection and test target

The most reliable solution is to run these tests against a nopCommerce instance that your team controls, then point the suite at it:

```bash
NOPCOMMERCE_BASE_URL=https://your-nopcommerce-test-site.example npm test
```

If you are allowed to access the public demo site after a browser verification, create a Playwright storage-state file outside source control and pass it to the run:

```bash
PLAYWRIGHT_STORAGE_STATE=.auth/nopcommerce.json npm test
```

For Cloudflare-sensitive runs, the suite can use headed Chrome with stealth hardening. You can also reuse a verified browser profile or route through a proxy whose geography and reputation match the test context:

```bash
PLAYWRIGHT_BROWSER_CHANNEL=chrome PLAYWRIGHT_HEADED=true PLAYWRIGHT_USER_DATA_DIR=cloudflare_profile npm test
PLAYWRIGHT_PROXY_SERVER=http://host:port npm test
```

Remove generated reports, browser profiles, and storage state:

```bash
npm run clean
```

When the public site returns a bot-protection challenge instead of the storefront, the tests now fail early with a clear message instead of timing out on missing page elements. Do not commit clearance cookies, browser profiles, or `.auth` storage files.

## Notes

The demo site is public and shared, so tests use generated emails where possible. Some full checkout/rental/date-picker flows are intentionally marked as optional because they are longer and more likely to become flaky.

Because the target site is publicly hosted behind bot protection, test execution can intermittently be blocked by a security verification page instead of the storefront. If that happens, use a controlled environment where the site is reachable without a challenge, or use storage state only when that access has been legitimately established.
