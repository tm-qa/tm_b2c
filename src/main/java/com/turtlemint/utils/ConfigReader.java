package com.turtlemint.utils;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

/**
 * Loads test configuration from src/test/resources/config.properties.
 * Kept as a simple singleton-style static loader since config is read-only
 * and shared across the whole suite.
 */
public class ConfigReader {

    private static final Properties properties = new Properties();
    private static final String CONFIG_PATH = "src/test/resources/config.properties";

    static {
        try (FileInputStream fis = new FileInputStream(CONFIG_PATH)) {
            properties.load(fis);
        } catch (IOException e) {
            throw new RuntimeException("Could not load config.properties at " + CONFIG_PATH, e);
        }
    }

    private ConfigReader() {
    }

    public static String get(String key) {
        String systemValue = System.getProperty(key);
        if (systemValue != null && !systemValue.trim().isEmpty()) {
            return systemValue;
        }

        String value = properties.getProperty(key);
        if (value == null) {
            throw new RuntimeException("Missing config key: " + key);
        }
        return value;
    }

    public static String getBaseUrl() {
        return get("base.url");
    }

    public static String getAppBaseUrl() {
        return get("app.base.url");
    }

    public static String getBrowser() {
        return get("browser");
    }

    public static int getExplicitWaitSeconds() {
        return Integer.parseInt(get("explicit.wait.seconds"));
    }

    public static boolean isHeadless() {
        return Boolean.parseBoolean(get("headless"));
    }
}
