# Turtlemint Insurance – Selenium/TestNG/POM Automation Framework

Automates two areas of https://www.turtlemintinsurance.com/:

1. **Static content smoke suite** — homepage, mega-menu navigation, footer
   (`HomePageTests`, `NavigationTests`).
2. **Bike Insurance quote funnel** — the lead-gen flow that hands off to the
   `app.turtlemintinsurance.com` sub-app (`BikeInsuranceFlowTests`).

## Stack

- Java 17
- Selenium 4.23
- TestNG 7.10
- WebDriverManager (auto-downloads the matching chromedriver/geckodriver)
- Maven

## Project layout

```
src/main/java/com/turtlemint/
  base/     DriverManager (thread-safe driver), BaseTest (setup/teardown)
  pages/    Page Objects (one class per page/component)
  utils/    ConfigReader, WaitUtils

src/test/java/com/turtlemint/tests/   TestNG test classes
src/test/resources/config.properties  base URL, browser, timeouts
testng.xml                            suite definition
```

## Running

```bash
mvn clean test
```

Runs whatever `testng.xml` wires up. To target a single class:

```bash
mvn test -Dtest=HomePageTests
```

To run headless, set `headless=true` in `config.properties`.

## Important caveats before you run this against the live site

- **Homepage/nav/footer locators** were derived from a static fetch of the
  page's rendered markup (link text, `href` patterns, alt text) — these are
  reasonably durable but you should still confirm they match what's live
  today, since content pages get re-themed periodically.

- **Quote funnel locators are placeholders.** `app.turtlemintinsurance.com`
  is a client-rendered SPA — its DOM isn't visible to a static fetch, so
  `BikeInsuranceProfilePage`, `VehicleDetailsPage`, and `PersonalDetailsPage`
  use best-guess `id`/`name`/`role` selectors with `TODO` comments marking
  exactly what to verify. Open the funnel in Chrome DevTools, inspect the
  real registration-number input, dropdown widgets, and buttons, and swap
  the locators in before trusting these tests. Prefer `data-testid` or
  `aria-label` attributes if the app exposes them — they're far more stable
  than auto-generated class names in a React/Angular build.

- **`BikeInsuranceFlowTests.verifyFullFullFunnelReachesPersonalDetailsStep`
  is disabled by default** and none of the funnel tests submit the final
  "Get Quotes" form — submitting creates a real lead in Turtlemint's system
  and may trigger an OTP to whatever mobile number is used in test data.
  Only wire up and run a full submit against a staging/UAT environment, if
  Turtlemint provides one to you as a partner/tester — not against
  production.

## Extending

- Add a `ScreenshotUtils` + hook into `BaseTest.tearDown(ITestResult)` to
  capture screenshots on failure.
- Swap in Allure or ExtentReports for HTML reporting instead of the raw
  Surefire output.
- Add `CarInsuranceProfilePage` / `HealthInsuranceProfilePage` following the
  same pattern as the Bike funnel once you've confirmed their step
  structure — they likely differ (e.g. Health starts with gender/age
  instead of a registration number, per the homepage CTA hrefs).
# turtlemint-automation_b2C
