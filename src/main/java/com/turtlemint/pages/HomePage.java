package com.turtlemint.pages;

import com.turtlemint.utils.WaitUtils;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

/**
 * Represents https://www.turtlemintinsurance.com/ (the marketing homepage,
 * not the quote sub-app at app.turtlemintinsurance.com).
 *
 * NOTE: locators below were derived from a static fetch of the page markup.
 * Confirm ids/classes with browser DevTools before relying on them in CI --
 * WordPress themes often change markup on deploys.
 */
public class HomePage {

    private final WebDriver driver;
    private final WaitUtils wait;

    private final By logo = By.cssSelector("img[alt='Turtlemint Insurance']");
    private final By bikeQuoteCta = By.cssSelector("a[href*='two-wheeler-insurance/two-wheeler-profile']");
    private final By carQuoteCta = By.cssSelector("a[href*='car-insurance/car-profile']");
    private final By healthQuoteCta = By.cssSelector("a[href*='health-insurance/health-profile']");
    private final By termQuoteCta = By.cssSelector("a[href*='life-insurance/profile/term']");

    private final By findAdvisorHeading = By.xpath("//*[contains(text(),'Find Nearby Advisor')]");
    private final By downloadAppLink = By.linkText("Download Turtlemint App");
    private final By raiseClaimLink = By.linkText("Raise A Claim");

    private final By statsBlocks = By.xpath("//*[contains(text(),'TRAINED INSURANCE ADVISORS') or contains(text(),'HAPPY CUSTOMERS') or contains(text(),'POLICIES SOLD')]");






    


    public HomePage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WaitUtils(driver);
    }

    public boolean isLogoDisplayed() {
        return wait.waitForVisible(logo).isDisplayed();
    }

    public String getPageTitle() {
        return driver.getTitle();
    }

    public String getCurrentUrl() {
        return driver.getCurrentUrl();
    }

    public boolean isFindAdvisorSectionPresent() {
        return !driver.findElements(findAdvisorHeading).isEmpty();
    }

    public int getStatsBlockCount() {
        return driver.findElements(statsBlocks).size();
    }

    public void clickBikeQuoteCta() {
        WebElement el = wait.waitForClickable(bikeQuoteCta);
        el.click();
        // Some CTAs open the quote app in a new tab; switch to it if present.
        switchToNewTab(driver);
    }

    public void clickCarQuoteCta() {
        WebElement el = wait.waitForClickable(carQuoteCta);
        el.click();
        switchToNewTab(driver);
    }

    public void clickHealthQuoteCta() {
        WebElement el = wait.waitForClickable(healthQuoteCta);
        el.click();
        switchToNewTab(driver);
    }

    public void clickTermQuoteCta() {
        WebElement el = wait.waitForClickable(termQuoteCta);
        el.click();
        switchToNewTab(driver);
    }

    public void clickRaiseClaim() {
        wait.waitForClickable(raiseClaimLink).click();
    }

    public String getDownloadAppLinkHref() {
        return wait.waitForVisible(downloadAppLink).getAttribute("href");
    }

    /** Switches to the newly opened tab after clicking an external CTA (app.* subdomain). */
    public void switchToNewTab(WebDriver driverInstance) {
        String originalWindow = driverInstance.getWindowHandle();
        for (String handle : driverInstance.getWindowHandles()) {
            if (!handle.equals(originalWindow)) {
                driverInstance.switchTo().window(handle);
                return;
            }
        }
    }
}
