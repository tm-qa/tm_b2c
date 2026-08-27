package com.turtlemint.pages;

import com.turtlemint.utils.WaitUtils;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.Select;

/**
 * Step 2 of the funnel: vehicle make / model / variant / manufacture year /
 * previous insurer, typically shown as searchable dropdowns for a "New Bike"
 * flow, or auto-fetched (with a confirm step) when a valid registration
 * number was entered on step 1.
 *
 * TODO: confirm whether make/model/variant are native <select> elements or
 * custom JS dropdowns (common with React apps -- often a text input +
 * filtered list of <li> or <div role="option"> items rather than <select>).
 * The methods below assume custom dropdowns since that's the more common
 * pattern for this kind of UI; swap to Select(...) if they turn out native.
 */
public class VehicleDetailsPage {

    private final WebDriver driver;
    private final WaitUtils wait;

    private final By makeDropdownTrigger = By.cssSelector("[id*='make' i], [name*='make' i]");
    private final By modelDropdownTrigger = By.cssSelector("[id*='model' i], [name*='model' i]");
    private final By variantDropdownTrigger = By.cssSelector("[id*='variant' i], [name*='variant' i]");
    private final By manufactureYearDropdownTrigger = By.cssSelector("[id*='year' i], [name*='year' i]");
    private final By previousInsurerDropdownTrigger = By.cssSelector("[id*='insurer' i], [name*='insurer' i]");

    private final By continueButton = By.xpath("//button[contains(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),'continue')]");

    public VehicleDetailsPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WaitUtils(driver);
    }

    private void selectFromCustomDropdown(By trigger, String visibleText) {
        wait.waitForClickable(trigger).click();
        By option = By.xpath("//li[normalize-space(text())='" + visibleText
                + "'] | //div[@role='option' and normalize-space(text())='" + visibleText + "']");
        wait.waitForClickable(option).click();
    }

    public void selectMake(String make) {
        selectFromCustomDropdown(makeDropdownTrigger, make);
    }

    public void selectModel(String model) {
        selectFromCustomDropdown(modelDropdownTrigger, model);
    }

    public void selectVariant(String variant) {
        selectFromCustomDropdown(variantDropdownTrigger, variant);
    }

    public void selectManufactureYear(String year) {
        selectFromCustomDropdown(manufactureYearDropdownTrigger, year);
    }

    public void selectPreviousInsurer(String insurer) {
        selectFromCustomDropdown(previousInsurerDropdownTrigger, insurer);
    }

    /** Fallback for if these turn out to be native <select> elements instead. */
    public void selectMakeNative(String make) {
        new Select(driver.findElement(makeDropdownTrigger)).selectByVisibleText(make);
    }

    public void clickContinue() {
        wait.waitForClickable(continueButton).click();
    }
}
