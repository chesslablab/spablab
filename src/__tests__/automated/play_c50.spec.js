const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

describe('Play C50', function() {
  jest.setTimeout(30000);
  let driver;
  let vars;

  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build();
    vars = {};
  });

  afterEach(async function() {
    await driver.quit();
  });

  it('Play C50', async function() {
    await driver.get("https://reactchess.net:9443/");
    await driver.wait(until.elementLocated(By.css(".e2 > svg"))).click();
    await driver.sleep(1000);
    await driver.findElement(By.css(".e4")).click()
    await driver.sleep(1000);
    await driver.findElement(By.css(".e7 > svg")).click()
    await driver.sleep(1000);
    await driver.findElement(By.css(".e5")).click()
    await driver.sleep(1000);
    await driver.findElement(By.css(".g1 > svg")).click()
    await driver.sleep(1000);
    await driver.findElement(By.css(".f3")).click()
    await driver.sleep(1000);
    await driver.findElement(By.css(".b8 > svg")).click()
    await driver.sleep(1000);
    await driver.findElement(By.css(".c6")).click()
    await driver.sleep(1000);
    await driver.findElement(By.css(".f1 > svg")).click()
    await driver.sleep(1000);
    await driver.findElement(By.css(".c4")).click()
  });
});
