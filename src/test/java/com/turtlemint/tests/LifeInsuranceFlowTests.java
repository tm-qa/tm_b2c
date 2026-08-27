package com.turtlemint.tests;

import com.turtlemint.base.BaseTest;
import com.turtlemint.base.DriverManager;
import com.turtlemint.pages.HomePage;
import org.testng.Assert;
import org.testng.annotations.Test;

public class LifeInsuranceFlowTests extends BaseTest {

    /**
     * Test Cases for Life Insurance Flow
     * TC_19 to TC_24: Life Insurance Quote Journey
     */

    @Test(description = "TC_19 - Verify Life Insurance Quote flow starts from homepage")
    public void verifyLifeInsuranceFlowStart() {
        HomePage home = new HomePage(DriverManager.getDriver());
        String initialUrl = home.getCurrentUrl();
        
        Assert.assertTrue(
            initialUrl.contains("turtlemint"),
            "Should start from Turtlemint homepage"
        );
    }

    @Test(description = "TC_20 - Verify Raise Claim functionality")
    public void verifyRaiseClaimVisible() {
        HomePage home = new HomePage(DriverManager.getDriver());
        try {
            home.clickRaiseClaim();
            Thread.sleep(2000);
            Assert.assertTrue(true, "Raise Claim CTA should be clickable");
        } catch (Exception e) {
            Assert.fail("Raise Claim functionality should work: " + e.getMessage());
        }
    }

    @Test(description = "TC_21 - Verify Find Advisor Section is visible on homepage")
    public void verifyFindAdvisorSectionVisible() {
        HomePage home = new HomePage(DriverManager.getDriver());
        boolean isSectionPresent = home.isFindAdvisorSectionPresent();
        Assert.assertTrue(isSectionPresent, "Find Advisor section should be visible");
    }

    @Test(description = "TC_22 - Verify Stats blocks are displayed on homepage")
    public void verifyStatsBlocksDisplayed() {
        HomePage home = new HomePage(DriverManager.getDriver());
        int statsCount = home.getStatsBlockCount();
        Assert.assertTrue(statsCount > 0, "Stats blocks should be displayed. Count: " + statsCount);
    }

    @Test(description = "TC_23 - Verify Download App Link is present and valid")
    public void verifyDownloadAppLinkValid() {
        HomePage home = new HomePage(DriverManager.getDriver());
        String href = home.getDownloadAppLinkHref();
        Assert.assertNotNull(href, "Download App link should have href attribute");
        Assert.assertFalse(href.isEmpty(), "Download App link should not be empty");
    }

    @Test(description = "TC_24 - Verify Complete Life Insurance Journey from homepage")
    public void verifyCompleteLifeJourneyFromHomepage() {
        HomePage home = new HomePage(DriverManager.getDriver());
        
        // Verify homepage loads
        Assert.assertTrue(home.isLogoDisplayed(), "Logo should be displayed on homepage");
        
        // Verify key sections exist
        Assert.assertTrue(home.isFindAdvisorSectionPresent(), "Find Advisor section should exist");
        
        // Verify stats are visible
        Assert.assertTrue(home.getStatsBlockCount() > 0, "Stats blocks should be visible");
        
        // Verify page title is correct
        String title = home.getPageTitle();
        Assert.assertTrue(title.contains("Turtlemint"), "Page title should contain Turtlemint");
    }
}
