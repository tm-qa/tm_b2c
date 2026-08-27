package com.turtlemint.pages;

import com.turtlemint.utils.WaitUtils;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import java.util.List;

/**
 * Represents the footer shared across marketing pages: quick links,
 * regulatory/legal links (IRDAI license, T&Cs, privacy), contact
 * numbers, and social icons.
 */
public class FooterPage {

    private final WebDriver driver;
    private final WaitUtils wait;

    private final By aboutUsLink = By.linkText("About Us");
    private final By blogLink = By.linkText("Blog");
    private final By claimLink = By.linkText("Claim");
    private final By privacyPolicyLink = By.linkText("Policy Statements");
    private final By termsLink = By.linkText("Terms & Conditions");
    private final By irdaLicenseLink = By.partialLinkText("IRDAI License");
    private final By customerSupportPhone = By.cssSelector("a[href^='tel:1800']");
    private final By customerSupportEmail = By.cssSelector("a[href^='mailto:support@turtlemint.com']");
    private final By socialLinks = By.cssSelector("footer a[href*='twitter.com'], footer a[href*='instagram.com'], footer a[href*='facebook.com'], footer a[href*='linkedin.com'], footer a[href*='youtube.com']");

    public FooterPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WaitUtils(driver);
    }

    private void scrollToFooter() {
        ((JavascriptExecutor) driver).executeScript("window.scrollTo(0, document.body.scrollHeight);");
    }

    public boolean isAboutUsLinkPresent() {
        scrollToFooter();
        return !driver.findElements(aboutUsLink).isEmpty();
    }

    public boolean isBlogLinkPresent() {
        scrollToFooter();
        return !driver.findElements(blogLink).isEmpty();
    }

    public boolean isClaimLinkPresent() {
        scrollToFooter();
        return !driver.findElements(claimLink).isEmpty();
    }

    public void clickBlog() {
        scrollToFooter();
        wait.waitForClickable(blogLink).click();
    }

    public void clickClaim() {
        scrollToFooter();
        wait.waitForClickable(claimLink).click();
    }

    public void clickPrivacyPolicy() {
        scrollToFooter();
        wait.waitForClickable(privacyPolicyLink).click();
    }

    public void clickTermsAndConditions() {
        scrollToFooter();
        wait.waitForClickable(termsLink).click();
    }

    public void clickIRDAILicense() {
        scrollToFooter();
        wait.waitForClickable(irdaLicenseLink).click();
    }

    public String getCustomerSupportPhoneHref() {
        scrollToFooter();
        return wait.waitForVisible(customerSupportPhone).getAttribute("href");
    }

    public String getCustomerSupportEmailHref() {
        scrollToFooter();
        return wait.waitForVisible(customerSupportEmail).getAttribute("href");
    }

    public int getSocialLinkCount() {
        scrollToFooter();
        return driver.findElements(socialLinks).size();
    }

    public List<WebElement> getAllFooterLinks() {
        scrollToFooter();
        return driver.findElements(By.cssSelector("footer a"));
    }
}
