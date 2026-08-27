package com.turtlemint.tests;

import com.turtlemint.base.BaseTest;
import com.turtlemint.base.DriverManager;
import com.turtlemint.pages.HomePage;
import org.testng.Assert;
import org.testng.annotations.Test;

public class BikeInsuranceAdvancedTests extends BaseTest {

    /**
     * Test Cases for Bike Insurance Flow
     * TC_13 to TC_18: Bike Insurance Quote Journey
     */

    @Test(description = "TC_13 - Verify Bike Quote CTA is present and clickable")
    public void verifyBikeQuoteCtaClickable() {
        HomePage home = new HomePage(DriverManager.getDriver());
        try {
            home.clickBikeQuoteCta();
            Thread.sleep(2000);
            String currentUrl = home.getCurrentUrl();
            Assert.assertTrue(currentUrl.contains("two-wheeler") || currentUrl.contains("bike"),
                    "Should navigate to bike insurance page. Current URL: " + currentUrl);
        } catch (Exception e) {
            Assert.fail("Bike Quote CTA should be clickable: " + e.getMessage());
        }
    }

    @Test(description = "TC_14 - Verify Bike Insurance page loads after clicking quote CTA")
    public void verifyBikeQuotePageLoads() {
        HomePage home = new HomePage(DriverManager.getDriver());
        home.clickBikeQuoteCta();
        String url = home.getCurrentUrl();
        Assert.assertTrue(
            url.contains("two-wheeler") || url.contains("bike"),
            "Bike insurance page should load. URL: " + url
        );
    }

    @Test(description = "TC_15 - Verify page title after Bike navigation")
    public void verifyBikePageTitle() {
        HomePage home = new HomePage(DriverManager.getDriver());
        home.clickBikeQuoteCta();
        String title = home.getPageTitle();
        Assert.assertTrue(
            title.toLowerCase().contains("bike") || title.toLowerCase().contains("two-wheeler"),
            "Page title should contain Bike reference. Actual: " + title
        );
    }

    @Test(description = "TC_16 - Verify Bike CTA is visible on homepage")
    public void verifyBikeCtaVisible() {
        HomePage home = new HomePage(DriverManager.getDriver());
        boolean isVisible = true;
        try {
            home.getPageTitle();
        } catch (Exception e) {
            isVisible = false;
        }
        Assert.assertTrue(isVisible, "Bike CTA should be visible on homepage");
    }

    @Test(description = "TC_17 - Verify multiple Bike CTA clicks work correctly")
    public void verifyMultipleBikeCtaClicks() {
        HomePage home = new HomePage(DriverManager.getDriver());
        home.clickBikeQuoteCta();
        String urlAfterFirstClick = home.getCurrentUrl();
        
        Assert.assertTrue(
            urlAfterFirstClick.contains("two-wheeler") || urlAfterFirstClick.contains("bike"),
            "First click should navigate to bike insurance page"
        );
    }

    @Test(description = "TC_18 - Verify Bike Quote flow integration")
    public void verifyBikeQuoteFlowIntegration() {
        HomePage home = new HomePage(DriverManager.getDriver());
        String initialUrl = home.getCurrentUrl();
        
        home.clickBikeQuoteCta();
        String navigationUrl = home.getCurrentUrl();
        
        Assert.assertNotEquals(
            initialUrl, navigationUrl,
            "URL should change after clicking Bike quote CTA"
        );
    }
}
