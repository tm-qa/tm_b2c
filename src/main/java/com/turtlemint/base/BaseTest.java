package com.turtlemint.base;

import com.turtlemint.utils.ConfigReader;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.testng.ITestResult;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Optional;
import org.testng.annotations.Parameters;


public class BaseTest {

    @Parameters("browser")
    @BeforeMethod
    public void setUp(@Optional("chrome") String browser) {
        DriverManager.initDriver(browser);
        WebDriver driver = DriverManager.getDriver();
        driver.get(ConfigReader.getBaseUrl());
        // Try to dismiss common marketing popups that interfere with clicks during tests.
        dismissPopups(driver);
    }

    private void dismissPopups(WebDriver driver) {
        try {
            // Give the page a short moment to render any popups
            Thread.sleep(800);
        } catch (InterruptedException ignored) {
        }

        try {
            // Close common popup elements if close buttons exist
            String[] closeSelectors = new String[]{
                    ".tm_popups .btn-close",
                    ".tm_popups .close",
                    ".tm-popups .btn-close",
                    ".wec-popup-content .close",
                    ".wec-popup .close",
                    ".modal .btn-close",
                    ".modal .close",
                    "button[aria-label='Close']"
            };
            for (String sel : closeSelectors) {
                // Use double-quoted selector string in JS to avoid breaking when selector contains single quotes
                String safeSel = sel.replace("\"", "\\\"");
                ((JavascriptExecutor) driver).executeScript(
                        "var els = document.querySelectorAll(\"" + safeSel + "\"); els.forEach(function(e){ try { if(e.offsetParent!==null) e.click(); } catch(err){} });");
            }

            // As a fallback, remove known popup containers and backdrops from the DOM to avoid click interception
            String cleanupScript = "document.querySelectorAll('#tm_popups_1, #tm_popups_2, .tm_popups, .wec-popup-content, .tm-modal, .wp-block-columns.wec-popup-content, .wec-popup').forEach(function(e){ if(e.remove) e.remove(); else e.style.display='none'; }); document.querySelectorAll('.modal-backdrop, .tm-modal-backdrop, .wec-backdrop').forEach(function(e){ if(e.remove) e.remove(); else e.style.display='none'; });";
            ((JavascriptExecutor) driver).executeScript(cleanupScript);
        } catch (Exception e) {
            // Don't fail setup if popup dismissal fails; tests will provide the failure details.
            System.err.println("Warning: popup dismissal failed: " + e.getMessage());
        }
    }

    @AfterMethod
    public void tearDown(ITestResult result) {
        // Hook point: on failure you'd capture a screenshot here before quitting.
        // Left minimal deliberately -- wire up a ScreenshotUtils class if/when
        // you add a reporting library (Allure/ExtentReports).
        DriverManager.quitDriver();
    }
}
