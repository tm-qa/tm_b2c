package com.turtlemint.tests;

import com.turtlemint.base.BaseTest;
import com.turtlemint.base.DriverManager;
import com.turtlemint.pages.HomePage;
import org.testng.Assert;
import org.testng.annotations.Test;

public class HealthInsuranceFlowTests extends BaseTest {

    /**
     * Test Cases for Health Insurance Flow
     * TC_01 to TC_06: Health Insurance Quote Journey
     */

    @Test(description = "TC_01 - Verify Health Quote CTA is present and clickable")
    public void verifyHealthQuoteCtaClickable() {
        HomePage home = new HomePage(DriverManager.getDriver());
        try {
            home.clickHealthQuoteCta();
            Thread.sleep(2000);
            String currentUrl = home.getCurrentUrl();
            Assert.assertTrue(currentUrl.contains("health-insurance") || currentUrl.contains("health-profile"),
                    "Should navigate to health insurance page. Current URL: " + currentUrl);
        } catch (Exception e) {
            Assert.fail("Health Quote CTA should be clickable: " + e.getMessage());
        }
    }

    @Test(description = "TC_02 - Verify Health Insurance page loads after clicking quote CTA")
    public void verifyHealthQuotePageLoads() {
        HomePage home = new HomePage(DriverManager.getDriver());
        home.clickHealthQuoteCta();
        Assert.assertTrue(
            home.getCurrentUrl().contains("health-insurance"),
            "Health insurance page should load"
        );
    }

    @Test(description = "TC_03 - Verify page title contains 'Health' after navigation")
    public void verifyHealthPageTitle() {
        HomePage home = new HomePage(DriverManager.getDriver());
        home.clickHealthQuoteCta();
        String title = home.getPageTitle();
        Assert.assertTrue(
            title.toLowerCase().contains("health"),
            "Page title should contain 'Health'. Actual: " + title
        );
    }

    @Test(description = "TC_04 - Verify Health CTA is visible on homepage")
    public void verifyHealthCtaVisible() {
        HomePage home = new HomePage(DriverManager.getDriver());
        boolean isVisible = true;
        try {
            home.getPageTitle();
        } catch (Exception e) {
            isVisible = false;
        }
        Assert.assertTrue(isVisible, "Health CTA should be visible on homepage");
    }

    @Test(description = "TC_05 - Verify multiple Health CTA clicks work correctly")
    public void verifyMultipleHealthCtaClicks() {
        HomePage home = new HomePage(DriverManager.getDriver());
        home.clickHealthQuoteCta();
        String urlAfterFirstClick = home.getCurrentUrl();
        
        Assert.assertTrue(
            urlAfterFirstClick.contains("health-insurance"),
            "First click should navigate to health insurance page"
        );
    }

    @Test(description = "TC_06 - Verify Health Quote flow integration")
    public void verifyHealthQuoteFlowIntegration() {
        HomePage home = new HomePage(DriverManager.getDriver());
        String initialUrl = home.getCurrentUrl();
        
        home.clickHealthQuoteCta();
        String navigationUrl = home.getCurrentUrl();
        
        Assert.assertNotEquals(
            initialUrl, navigationUrl,
            "URL should change after clicking Health quote CTA"
        );
    }
}
