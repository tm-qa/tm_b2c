package com.turtlemint.pages;

import com.turtlemint.utils.WaitUtils;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;

import java.util.List;

/**
 * Represents the top mega-menu shared across all marketing pages:
 * Car / Bike / Health / Life, each with a dropdown of sub-links
 * (companies, product types, blogs, etc).
 *
 * Modeled as a component (not a full page) since it's reused across
 * every page object -- inject it into any page that needs nav actions
 * instead of duplicating these locators.
 */
public class NavigationComponent {

    private final WebDriver driver;
    private final WaitUtils wait;
    private final Actions actions;

    private final By carMenu = By.cssSelector("a[href$='/car-insurance/']");
    private final By bikeMenu = By.cssSelector("a[href$='/bike-insurance/']");
    private final By healthMenu = By.cssSelector("a[href$='/health-insurance/']");
    private final By lifeMenu = By.cssSelector("a[href$='/life-insurance/']");

    private final By carInsuranceCompaniesLink = By.linkText("Car Insurance Companies");
    private final By compareCarInsuranceLink = By.linkText("Compare Car Insurance");
    private final By bikePremiumCalculatorLink = By.linkText("Bike Insurance Premium Calculator");
    private final By healthPremiumCalculatorLink = By.linkText("Premium Calculator");
    private final By termInsuranceLink = By.linkText("Term Insurance");

    public NavigationComponent(WebDriver driver) {
        this.driver = driver;
        this.wait = new WaitUtils(driver);
        this.actions = new Actions(driver);
    }

    public void hoverOverCarMenu() {
        WebElement el = wait.waitForVisible(carMenu);
        actions.moveToElement(el).perform();
    }

    public void hoverOverBikeMenu() {
        WebElement el = wait.waitForVisible(bikeMenu);
        actions.moveToElement(el).perform();
    }

    public void hoverOverHealthMenu() {
        WebElement el = wait.waitForVisible(healthMenu);
        actions.moveToElement(el).perform();
    }

    public void navigateToCarInsuranceCompanies() {
        hoverOverCarMenu();
        wait.waitForClickable(carInsuranceCompaniesLink).click();
    }

    public void navigateToCompareCarInsurance() {
        hoverOverCarMenu();
        wait.waitForClickable(compareCarInsuranceLink).click();
    }

    public void navigateToBikePremiumCalculator() {
        hoverOverBikeMenu();
        wait.waitForClickable(bikePremiumCalculatorLink).click();
    }

    public void navigateToHealthPremiumCalculator() {
        hoverOverHealthMenu();
        wait.waitForClickable(healthPremiumCalculatorLink).click();
    }

    public void navigateToTermInsurance() {
        WebElement el = wait.waitForVisible(lifeMenu);
        actions.moveToElement(el).perform();
        wait.waitForClickable(termInsuranceLink).click();
    }

    /** Returns every top-level nav link's href -- useful for a bulk link-validity smoke test. */
    public List<String> getAllTopLevelNavHrefs() {
        return driver.findElements(By.cssSelector("nav a, header a"))
                .stream()
                .map(e -> e.getAttribute("href"))
                .filter(href -> href != null && !href.isBlank())
                .distinct()
                .toList();
    }
}
