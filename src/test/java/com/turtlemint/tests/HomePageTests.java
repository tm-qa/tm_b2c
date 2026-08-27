package com.turtlemint.tests;

import com.turtlemint.base.BaseTest;
import com.turtlemint.base.DriverManager;
import com.turtlemint.pages.FooterPage;
import com.turtlemint.pages.HomePage;
import com.turtlemint.pages.NavigationComponent;
import org.testng.Assert;
import org.testng.annotations.Test;

import java.util.List;

public class HomePageTests extends BaseTest {

    @Test(description = "Homepage loads with correct title and visible logo")
    public void verifyHomePageLoads() {
        HomePage home = new HomePage(DriverManager.getDriver());
        Assert.assertTrue(home.isLogoDisplayed(), "Logo should be visible on load");
        Assert.assertTrue(home.getPageTitle().contains("Turtlemint"),
                "Page title should mention Turtlemint. Actual: " + home.getPageTitle());
    }

    @Test(description = "Trust-stats section (advisors/customers/policies) is present")
    public void verifyTrustStatsSectionPresent() {
        HomePage home = new HomePage(DriverManager.getDriver());
        Assert.assertTrue(home.getStatsBlockCount() > 0,
                "Expected at least one trust-stat block (advisors/customers/policies)");
    }

    @Test(description = "Find Nearby Advisor section is present")
    public void verifyFindAdvisorSectionExists() {
        HomePage home = new HomePage(DriverManager.getDriver());
        Assert.assertTrue(home.isFindAdvisorSectionPresent());
    }

    @Test(description = "Download app link points to the onelink.me app store router")
    public void verifyDownloadAppLinkIsValid() {
        HomePage home = new HomePage(DriverManager.getDriver());
        String href = home.getDownloadAppLinkHref();
        Assert.assertTrue(href.contains("onelink.me"),
                "Expected download link to route through onelink.me. Actual: " + href);
    }

    @Test(description = "Top nav exposes all four product lines")
    public void verifyTopLevelNavHasAllProductLines() {
        NavigationComponent nav = new NavigationComponent(DriverManager.getDriver());
        List<String> hrefs = nav.getAllTopLevelNavHrefs();

        Assert.assertTrue(hrefs.stream().anyMatch(h -> h.contains("/car-insurance/")), "Missing Car nav link");
        Assert.assertTrue(hrefs.stream().anyMatch(h -> h.contains("/bike-insurance/")), "Missing Bike nav link");
        Assert.assertTrue(hrefs.stream().anyMatch(h -> h.contains("/health-insurance/")), "Missing Health nav link");
        Assert.assertTrue(hrefs.stream().anyMatch(h -> h.contains("/life-insurance/")), "Missing Life nav link");
    }

    @Test(description = "Footer exposes legal/quick links and support contact")
    public void verifyFooterLinksPresent() {
        FooterPage footer = new FooterPage(DriverManager.getDriver());
        Assert.assertTrue(footer.isAboutUsLinkPresent(), "Footer should contain an About Us link");
        Assert.assertTrue(footer.getSocialLinkCount() >= 4,
                "Expected at least 4 social links (Twitter/Instagram/Facebook/LinkedIn)");

        String phoneHref = footer.getCustomerSupportPhoneHref();
        Assert.assertTrue(phoneHref.startsWith("tel:1800"),
                "Support phone should be a tel: link starting with 1800. Actual: " + phoneHref);

        String emailHref = footer.getCustomerSupportEmailHref();
        Assert.assertTrue(emailHref.contains("support@turtlemint.com"),
                "Support email should be support@turtlemint.com. Actual: " + emailHref);
    }

    @Test(description = "No footer link is broken (href present, not '#', not empty)")
    public void verifyNoDeadFooterLinks() {
        FooterPage footer = new FooterPage(DriverManager.getDriver());
        footer.getAllFooterLinks().forEach(link -> {
            String href = link.getAttribute("href");
            Assert.assertNotNull(href, "Footer link has no href: " + link.getText());
            Assert.assertFalse(href.trim().isEmpty() || href.trim().equals("#"),
                    "Footer link '" + link.getText() + "' has a dead href");
        });
    }
}
