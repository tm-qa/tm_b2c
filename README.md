# Turtlemint Insurance Playwright automation

This repository contains the Playwright + TypeScript implementation of the
Turtlemint marketing-site and insurance quote automation suite. Selenium,
TestNG, and Maven sources have been removed; Playwright fixtures, page objects,
and tests are now the single source of truth.

## Run

```bash
npm ci
npx playwright install
npm run typecheck
npm test
```

Set `BASE_URL`, `APP_BASE_URL`, `HEADLESS`, or `PINCODES` in `.env` to target a
different environment. Tests stop before submitting real quote leads. The
disabled bike funnel test can be enabled only in a safe staging environment.

## Layout

- `src/pages` – reusable Playwright page objects and components
- `src/fixtures` – typed Playwright fixtures
- `src/tests` – migrated and existing Playwright tests
- `playwright.config.ts` – browser projects, timeouts, and reporters
