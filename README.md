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

The framework, page objects, and test coverage were implemented and validated with TypeScript checks and Playwright test discovery. Full live execution against `https://demo.nopcommerce.com` could not be completed reliably because the public demo site is protected by Cloudflare bot-detection challenges. Several legitimate Playwright approaches were attempted, including headed browser runs, storage state, a persistent browser profile, and browser-context hardening, but the site continued to block automated sessions.

For dependable execution, this suite should be run against a nopCommerce environment where automated testing is permitted and Cloudflare verification does not block the browser session.

Remove generated reports, browser profiles, and storage state:

```bash
npm run clean
```

## Notes

The demo site is public and shared, so tests use generated emails where possible. Some full checkout/rental/date-picker flows are intentionally marked as optional because they are longer and more likely to become flaky.
