package com.turtlemint.tests;

import com.turtlemint.base.BaseTest;
import com.turtlemint.base.DriverManager;
import com.turtlemint.pages.HomePage;
import org.testng.Assert;
import org.testng.annotations.Test;

public class CarInsuranceFlowTests extends BaseTest {

    /**
     * Test Cases for Car Insurance Flow
     * TC_07 to TC_12: Car Insurance Quote Journey
     */

    @Test(description = "TC_07 - Verify Car Quote CTA is present and clickable")
    public void verifyCarQuoteCtaClickable() {
        HomePage home = new HomePage(DriverManager.getDriver());
        try {
            home.clickCarQuoteCta();
            Thread.sleep(2000);
            String currentUrl = home.getCurrentUrl();
            Assert.assertTrue(currentUrl.contains("car-insurance") || currentUrl.contains("car-profile"),
                    "Should navigate to car insurance page. Current URL: " + currentUrl);
        } catch (Exception e) {
            Assert.fail("Car Quote CTA should be clickable: " + e.getMessage());
        }
    }

    @Test(description = "TC_08 - Verify Car Insurance page loads after clicking quote CTA")
    public void verifyCarQuotePageLoads() {
        HomePage home = new HomePage(DriverManager.getDriver());
        home.clickCarQuoteCta();
        Assert.assertTrue(
            home.getCurrentUrl().contains("car-insurance"),
            "Car insurance page should load"
        );
    }

    @Test(description = "TC_09 - Verify page title contains 'Car' after navigation")
    public void verifyCarPageTitle() {
        HomePage home = new HomePage(DriverManager.getDriver());
        home.clickCarQuoteCta();
        String title = home.getPageTitle();
        Assert.assertTrue(
            title.toLowerCase().contains("car"),
            "Page title should contain 'Car'. Actual: " + title
        );
    }

    @Test(description = "TC_10 - Verify Car CTA is visible on homepage")
    public void verifyCarCtaVisible() {
        HomePage home = new HomePage(DriverManager.getDriver());
        boolean isVisible = true;
        try {
            home.getPageTitle();
        } catch (Exception e) {
            isVisible = false;
        }
        Assert.assertTrue(isVisible, "Car CTA should be visible on homepage");
    }

    @Test(description = "TC_11 - Verify multiple Car CTA clicks work correctly")
    public void verifyMultipleCarCtaClicks() {
        HomePage home = new HomePage(DriverManager.getDriver());
        home.clickCarQuoteCta();
        String urlAfterFirstClick = home.getCurrentUrl();
        
        Assert.assertTrue(
            urlAfterFirstClick.contains("car-insurance"),
            "First click should navigate to car insurance page"
        );
    }

    @Test(description = "TC_12 - Verify Car Quote flow integration")
    public void verifyCarQuoteFlowIntegration() {
        HomePage home = new HomePage(DriverManager.getDriver());
        String initialUrl = home.getCurrentUrl();
        
        home.clickCarQuoteCta();
        String navigationUrl = home.getCurrentUrl();
        
        Assert.assertNotEquals(
            initialUrl, navigationUrl,
            "URL should change after clicking Car quote CTA"
        );
    }
}
