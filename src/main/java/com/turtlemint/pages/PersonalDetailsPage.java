package com.turtlemint.pages;

import com.turtlemint.utils.WaitUtils;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

/**
 * Step 3 of the funnel: lead-capture fields (name, mobile number, email,
 * pincode) required before Turtlemint will show quotes -- this is the point
 * where a real submission would trigger an actual OTP / advisor callback,
 * so automated tests should stop short of the final "Get Quotes" submit
 * unless running against a staging/UAT environment provided by Turtlemint.
 */
public class PersonalDetailsPage {

    private final WebDriver driver;
    private final WaitUtils wait;

    private final By nameInput = By.cssSelector("input[name*='name' i]:not([name*='username' i])");
    private final By mobileInput = By.cssSelector("input[name*='mobile' i], input[type='tel']");
    private final By emailInput = By.cssSelector("input[type='email'], input[name*='email' i]");
    private final By pincodeInput = By.cssSelector("input[name*='pincode' i], input[name*='pin' i]");
    private final By getQuotesButton = By.xpath("//button[contains(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),'get quote')]");
    private final By termsCheckbox = By.cssSelector("input[type='checkbox']");

    public PersonalDetailsPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WaitUtils(driver);
    }

    public void enterName(String name) {
        wait.waitForVisible(nameInput).sendKeys(name);
    }

    public void enterMobile(String mobile) {
        wait.waitForVisible(mobileInput).sendKeys(mobile);
    }

    public void enterEmail(String email) {
        wait.waitForVisible(emailInput).sendKeys(email);
    }

    public void enterPincode(String pincode) {
        wait.waitForVisible(pincodeInput).sendKeys(pincode);
    }

    public void acceptTerms() {
        if (!driver.findElements(termsCheckbox).isEmpty()) {
            wait.waitForClickable(termsCheckbox).click();
        }
    }

    /**
     * Deliberately NOT wired to actually submit in the sample flow below --
     * this would trigger a real lead in Turtlemint's system / send an OTP
     * to whatever mobile number is entered. Only call this against a
     * sandbox/staging environment.
     */
    public void submitGetQuotes() {
        wait.waitForClickable(getQuotesButton).click();
    }

    public boolean isGetQuotesButtonEnabled() {
        return wait.waitForVisible(getQuotesButton).isEnabled();
    }
}
