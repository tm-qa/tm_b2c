package com.turtlemint.tests;

import com.turtlemint.base.BaseTest;
import com.turtlemint.base.DriverManager;
import com.turtlemint.pages.NavigationComponent;
import org.testng.Assert;
import org.testng.annotations.Test;

public class NavigationTests extends BaseTest {

    @Test(description = "Car Insurance Companies link navigates to the correct listing page")
    public void verifyCarInsuranceCompaniesNavigation() {
        NavigationComponent nav = new NavigationComponent(DriverManager.getDriver());
        nav.navigateToCarInsuranceCompanies();

        Assert.assertTrue(DriverManager.getDriver().getCurrentUrl().contains("car-insurance-companies"),
                "Expected URL to contain 'car-insurance-companies'. Actual: "
                        + DriverManager.getDriver().getCurrentUrl());
    }

    @Test(description = "Bike Insurance Premium Calculator link navigates correctly")
    public void verifyBikePremiumCalculatorNavigation() {
        NavigationComponent nav = new NavigationComponent(DriverManager.getDriver());
        nav.navigateToBikePremiumCalculator();

        Assert.assertTrue(DriverManager.getDriver().getCurrentUrl().contains("bike-insurance-calculator"),
                "Expected URL to contain 'bike-insurance-calculator'. Actual: "
                        + DriverManager.getDriver().getCurrentUrl());
    }

    @Test(description = "Term Insurance link under Life menu navigates correctly")
    public void verifyTermInsuranceNavigation() {
        NavigationComponent nav = new NavigationComponent(DriverManager.getDriver());
        nav.navigateToTermInsurance();

        Assert.assertTrue(DriverManager.getDriver().getCurrentUrl().contains("term-insurance-plans"),
                "Expected URL to contain 'term-insurance-plans'. Actual: "
                        + DriverManager.getDriver().getCurrentUrl());
    }
}
