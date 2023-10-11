const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');

// Initialize the WebDriver instance and return it
const getDriver = () => {
  const options = new chrome.Options();
  options.addArguments('--headless'); // Run Chrome in headless mode (no GUI)
  options.addArguments('--disable-gpu'); // Disable GPU acceleration for headless mode

  const driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  return driver;
};

// Quit the WebDriver instance
const stopDriver = async (driver) => {
  if (driver) {
    await driver.quit();
  }
};

module.exports = { getDriver, stopDriver };
