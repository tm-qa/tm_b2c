package com.turtlemint.base;

import com.turtlemint.utils.ConfigReader;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;

import java.time.Duration;

/**
 * ThreadLocal-backed driver holder so the suite can run with
 * parallel="tests"/"methods" in testng.xml without threads clobbering
 * each other's WebDriver instance.
 */
public class DriverManager {


    private static final ThreadLocal<WebDriver> driverThreadLocal = new ThreadLocal<>();

    public static void initDriver(String browser) {
        WebDriver driver;
        boolean headless = ConfigReader.isHeadless();

        switch (browser.toLowerCase()) {
            case "firefox":
                WebDriverManager.firefoxdriver().setup();
                FirefoxOptions ffOptions = new FirefoxOptions();
                if (headless) ffOptions.addArguments("-headless");
                driver = new FirefoxDriver(ffOptions);
                break;

            case "chrome":
            default:
                WebDriverManager.chromedriver().setup();
                ChromeOptions options = new ChromeOptions();
                options.addArguments("--start-maximized");
                options.addArguments("--disable-notifications");
                options.addArguments("--remote-allow-origins=*");
                if (headless) {
                    options.addArguments("--headless=new");
                    options.addArguments("--window-size=1920,1080");
                }
                driver = new ChromeDriver(options);
                break;
        }

        driver.manage().timeouts().pageLoadTimeout(Duration.ofSeconds(45));
        driverThreadLocal.set(driver);
    }

    public static WebDriver getDriver() {
        WebDriver driver = driverThreadLocal.get();
        if (driver == null) {
            throw new IllegalStateException("Driver not initialized for this thread. Call initDriver() first.");
        }
        return driver;
    }

    public static void quitDriver() {
        WebDriver driver = driverThreadLocal.get();
        if (driver != null) {
            driver.quit();
            driverThreadLocal.remove();
        }
    }
}
