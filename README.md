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

## 📝 QA Documentation & Strategy
To demonstrate industry-standard QA practices, full project planning artifacts are included in this repository. These documents showcase the analytical thinking that preceded the automation code:

* 📄 **[Download Full Test Plan](./docs/TestPlan_nopCommerceDemo.pdf)** – Outlines the scope, test environment configurations, risks, and automation strategy for the NopCommerce platform.
* 📊 **[Download Test Suite Matrix](./docs/Test%20Suite%20demo.nopCommerce%20-%20Sheet1.pdf)** – A comprehensive traceability matrix mapping critical e-commerce modules, test descriptions, priorities, and core verification steps.
  
## Tech stack

- Playwright Test
- TypeScript
- Node.js
- GitHub Actions

## Project structure

```text
pages/                         # Page Object Model files
utils/                         # Test data, fixtures, and execution helpers
tests/auth/                    # Registration, login, and logout automation
tests/search/                  # Product search and filtering automation
tests/cart/                    # Cart and product option selection automation
tests/checkout/                # Checkout validation automation
docs/                          # QA Artifacts (Test Plan, Test Suite PDFs)
├── Test_Plan.pdf
└── Test_Suite.pdf
docs/manual-to-automation-mapping.md
.github/workflows/playwright.yml

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

To make the browser sessions closely mimic a real human user, the following advanced configurations were added to the framework:

Stealth Integration: playwright-extra with puppeteer-extra-plugin-stealth.
Context Hardening: Overriding navigator.webdriver, window.chrome.runtime, and screen dimensions.
Chromium Launch Flags: Hardening with --disable-blink-features=AutomationControlled.
Realistic Footprints: Custom desktop user agents, device viewports, locales, and human-like typing/mouse movement helpers.
Session Management: Support for PLAYWRIGHT_STORAGE_STATE, persistent profiles (PLAYWRIGHT_USER_DATA_DIR), and optional proxies.

These attempts did not reliably bypass the protection on the public demo site. That is a project limitation: the suite is best treated as a Playwright/TypeScript practice portfolio unless it is pointed at a controlled nopCommerce environment where automated testing is permitted and Cloudflare verification does not block the browser session.

## Notes

The demo site is public and shared, so tests use generated emails where possible. Some full checkout/rental/date-picker flows are intentionally marked as optional because they are longer and more likely to become flaky.
