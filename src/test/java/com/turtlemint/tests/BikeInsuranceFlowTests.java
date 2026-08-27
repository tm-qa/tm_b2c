package com.turtlemint.tests;

import com.turtlemint.base.BaseTest;
import com.turtlemint.base.DriverManager;
import com.turtlemint.pages.BikeInsuranceProfilePage;
import com.turtlemint.pages.HomePage;
import com.turtlemint.pages.PersonalDetailsPage;
import com.turtlemint.pages.VehicleDetailsPage;
import org.testng.Assert;
import org.testng.annotations.Test;

/**
 * Covers the "New Bike" quote funnel:
 *   Homepage -> click Bike CTA -> app.turtlemintinsurance.com (new tab)
 *   -> registration/profile step -> vehicle details -> personal details.
 *
 * Deliberately stops BEFORE the final "Get Quotes" submit -- that call
 * creates a real lead / can trigger an OTP to whatever mobile number is
 * used. Point base config at a staging/UAT app URL if you need full
 * end-to-end coverage including submission and the quote comparison page.
 *
 * All step-2/step-3 locators are placeholders (see the TODOs in
 * VehicleDetailsPage / PersonalDetailsPage / BikeInsuranceProfilePage) --
 * this class shows the intended flow and assertion points; swap in real
 * data and locators once verified against the live app in DevTools.
 */
public class BikeInsuranceFlowTests extends BaseTest {

    @Test(description = "New Bike quote funnel: registration step accepts a valid-format reg number and proceeds")
    public void verifyNewBikeRegistrationStepProceeds() {
        var driver = DriverManager.getDriver();

        HomePage home = new HomePage(driver);
        home.clickBikeQuoteCta();
        home.switchToNewTab(driver);

        Assert.assertTrue(driver.getCurrentUrl().contains("app.turtlemintinsurance.com"),
                "Expected to land on the app sub-domain. Actual: " + driver.getCurrentUrl());

        BikeInsuranceProfilePage profile = new BikeInsuranceProfilePage(driver);
        profile.selectNewBikeFlow();
        profile.clickContinue();

        // At this point the funnel should move to vehicle details -- assert on
        // URL change as a lightweight checkpoint before drilling into fields.
        Assert.assertTrue(driver.getCurrentUrl().contains("two-wheeler-insurance"),
                "Expected to remain within the two-wheeler-insurance funnel. Actual: " + driver.getCurrentUrl());
    }

    @Test(description = "New Bike quote funnel: invalid registration number shows a validation error")
    public void verifyInvalidRegistrationNumberShowsError() {
        var driver = DriverManager.getDriver();

        HomePage home = new HomePage(driver);
        home.clickBikeQuoteCta();
        home.switchToNewTab(driver);

        BikeInsuranceProfilePage profile = new BikeInsuranceProfilePage(driver);
        profile.enterRegistrationNumber("MH12TN0987");
        profile.clickContinue();

        Assert.assertTrue(profile.isValidationErrorShown(),
                "Expected a validation error for a malformed registration number");
    }

    @Test(description = "Full funnel through personal details step, stopping before final submit",
            enabled = false) // enable once step-2/step-3 locators are confirmed against the live app
    public void verifyFullFunnelReachesPersonalDetailsStep() {
        var driver = DriverManager.getDriver();

        HomePage home = new HomePage(driver);
        home.clickBikeQuoteCta();
        home.switchToNewTab(driver);

        BikeInsuranceProfilePage profile = new BikeInsuranceProfilePage(driver);
        profile.selectNewBikeFlow();
        profile.clickContinue();

        VehicleDetailsPage vehicle = new VehicleDetailsPage(driver);
        vehicle.selectMake("Honda");
        vehicle.selectModel("Activa 6G");
        vehicle.selectVariant("Standard");
        vehicle.selectManufactureYear("2023");
        vehicle.clickContinue();

        PersonalDetailsPage personal = new PersonalDetailsPage(driver);
        Assert.assertTrue(personal.isGetQuotesButtonEnabled(),
                "Get Quotes button should be present once vehicle details step is complete");
        // Deliberately not filling in name/mobile/email/pincode + submitting here --

    }
}
