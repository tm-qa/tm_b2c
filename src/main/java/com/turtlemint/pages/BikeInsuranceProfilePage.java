package com.turtlemint.pages;

import com.turtlemint.utils.WaitUtils;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

/**
 * Step 1 of the Bike Insurance quote funnel, on the
 * app.turtlemintinsurance.com sub-app (a separate SPA from the marketing
 * site). Landing URL pattern:
 *   https://app.turtlemintinsurance.com/two-wheeler-insurance/two-wheeler-profile/tw-registration-info
 *
 * IMPORTANT: This sub-app renders client-side (React/Angular-style), so
 * elements won't exist in the DOM until after JS execution -- always wait
 * for visibility/clickability here, never assume immediate presence.
 *
 * Locators below are best-effort placeholders based on common patterns for
 * this kind of registration-number-first insurance funnel (id/name
 * attributes, semantic button text). TODO: open the page with DevTools
 * open and swap in the real attributes before running against the live app.
 */
public class BikeInsuranceProfilePage {

    private final WebDriver driver;
    private final WaitUtils wait;

    // TODO: confirm actual attribute -- candidates: id="regNumber", name="registrationNumber", data-testid="reg-input"
    private final By registrationNumberInput = By.cssSelector("input[name*='registration' i], input[id*='registration' i]");

    // TODO: confirm -- likely a "don't know your registration number?" or "New Bike" toggle
    private final By newBikeToggle = By.xpath("//*[contains(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),'new bike') or contains(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),\"don't know\")]");

    private final By continueButton = By.xpath("//button[contains(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),'continue') or contains(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),'proceed')]");

    private final By validationError = By.cssSelector("[class*='error' i], [class*='invalid' i]");

    public BikeInsuranceProfilePage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WaitUtils(driver);
    }

    public void enterRegistrationNumber(String regNo) {
        wait.waitForVisible(registrationNumberInput).clear();
        driver.findElement(registrationNumberInput).sendKeys(regNo);
    }

    public void selectNewBikeFlow() {
        wait.waitForClickable(newBikeToggle).click();
    }

    public void clickContinue() {
        wait.waitForClickable(continueButton).click();
    }

    public boolean isValidationErrorShown() {
        return !driver.findElements(validationError).isEmpty();
    }

    public String getValidationErrorText() {
        return wait.waitForVisible(validationError).getText();
    }
}
