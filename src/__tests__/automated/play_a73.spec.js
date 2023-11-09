const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

describe('Play A73', function() {
  jest.setTimeout(60000);
  let driver;
  let vars;

  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build();
    vars = {};
  });

  afterEach(async function() {
    await driver.quit();
  });

  it('Play A73', async function() {
    await driver.get("https://www.chesslablab.com:9443/");
    await driver.wait(until.elementLocated(By.css(".d2 > svg"))).click();
    await driver.sleep(1000);
    await driver.findElement(By.css(".d4")).click();
    await driver.sleep(1000);
    await driver.findElement(By.css(".g8 > svg")).click();
    await driver.sleep(1000);
    await driver.findElement(By.css(".f6")).click();
    await driver.sleep(1000);
    await driver.findElement(By.css(".c2 > svg")).click();
    await driver.sleep(1000);
    await driver.findElement(By.css(".c4")).click();
    await driver.sleep(1000);
    await driver.findElement(By.css(".c7 > svg")).click();
    await driver.sleep(1000);
    await driver.findElement(By.css(".c5")).click();
    await driver.sleep(1000);
    await driver.findElement(By.css(".d4 > svg")).click();
    await driver.sleep(1000);
    await driver.findElement(By.css(".d5")).click();
    await driver.sleep(1000);
    await driver.findElement(By.css(".e7 > svg")).click();
    await driver.sleep(1000);
    await driver.findElement(By.css(".e6")).click();
    await driver.sleep(1000);
    await driver.findElement(By.css(".b1 > svg")).click();
    await driver.sleep(1000);
    await driver.findElement(By.css(".c3")).click();
    await driver.sleep(1000);
    await driver.findElement(By.css(".e6 > svg")).click();
    await driver.sleep(1000);
    await driver.findElement(By.css(".d5")).click();
    await driver.sleep(1000);
    await driver.findElement(By.css(".c4 > svg")).click();
    await driver.sleep(1000);
    await driver.findElement(By.css(".d5")).click();
    await driver.sleep(1000);
    await driver.findElement(By.css(".d7 > svg")).click();
    await driver.sleep(1000);
    await driver.findElement(By.css(".d6")).click();
    await driver.sleep(1000);
    await driver.findElement(By.css(".e2 > svg")).click();
    await driver.sleep(1000);
    await driver.findElement(By.css(".e4")).click();
    await driver.sleep(1000);
    await driver.findElement(By.css(".g7 > svg")).click();
    await driver.sleep(1000);
    await driver.findElement(By.css(".g6")).click();
    await driver.sleep(1000);
    await driver.findElement(By.css(".g1 > svg")).click();
    await driver.sleep(1000);
    await driver.findElement(By.css(".f3")).click();
    await driver.sleep(1000);
    await driver.findElement(By.css(".f8 > svg")).click();
    await driver.sleep(1000);
    await driver.findElement(By.css(".g7")).click();
    await driver.sleep(1000);
    await driver.findElement(By.css(".f1 > svg")).click();
    await driver.sleep(1000);
    await driver.findElement(By.css(".e2")).click();
    await driver.sleep(1000);
    await driver.findElement(By.css(".e8 > svg")).click();
    await driver.sleep(1000);
    await driver.findElement(By.css(".g8")).click();
    await driver.sleep(1000);
    await driver.findElement(By.css(".e1 > svg")).click();
    await driver.sleep(1000);
    await driver.findElement(By.css(".g1")).click();
  });
});
